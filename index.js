// PriRex Monitor — Host half.
// Polls sensors every ~0.5s, accumulates token usage from committed session
// events, and serves the snapshot two ways: a JSON route the Client page can
// poll, and an SSE stream that pushes each fresh sample in real time.
//
// GPU numbers are read from nvidia-smi because systeminformation does not
// expose utilization, fan speed, or PCIe link width on Windows. When
// nvidia-smi is absent (AMD/Intel), the module falls back to systeminformation.

import si from 'systeminformation';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const ROUTE = '/api/prirex-monitor/telemetry';
const STREAM_ROUTE = '/api/prirex-monitor/stream';

const DEFAULT_CONFIG = {
  refreshMs: 500,
  overheatC: 80,
  ratesUsdPerMillion: { input: 0.27, output: 1.1 }, // DeepSeek base tariffs
};

const NVIDIA_FIELDS = [
  'name',
  'utilization.gpu',
  'fan.speed',
  'memory.used',
  'memory.total',
  'power.draw',
  'power.limit',
  'temperature.gpu',
  'clocks.sm',
  'pcie.link.gen.current',
  'pcie.link.width.current',
];

function deepMerge(base, extra) {
  const out = { ...base };
  if (extra && typeof extra === 'object') {
    for (const [k, v] of Object.entries(extra)) {
      out[k] = v && typeof v === 'object' && !Array.isArray(v) ? deepMerge(base[k], v) : v;
    }
  }
  return out;
}

const finite = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// systeminformation reports controller memory in MB on Windows and bytes on
// some other providers; normalize both to GB.
function toGB(value) {
  const v = finite(value);
  if (v === null || v <= 0) return null;
  return v > 1048576 ? v / 1073741824 : v / 1024;
}

function pickTemp(t) {
  if (!t) return null;
  if (finite(t.max) !== null && t.max > 0) return t.max;
  if (finite(t.main) !== null && t.main > 0) return t.main;
  return null;
}

function writeJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'referrer-policy': 'no-referrer',
  });
  res.end(payload);
}

function guard(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    res.end();
    return false;
  }
  const host = req.headers.host;
  if (typeof host !== 'string') {
    res.writeHead(403);
    res.end();
    return false;
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    res.writeHead(403);
    res.end();
    return false;
  }
  const origin = req.headers.origin;
  if (origin !== undefined) {
    try {
      if (new URL(origin).host !== host) {
        res.writeHead(403);
        res.end();
        return false;
      }
    } catch {
      res.writeHead(403);
      res.end();
      return false;
    }
  }
  return true;
}

export function apply(ctx, config) {
  const cfg = deepMerge(DEFAULT_CONFIG, config);

  const snapshot = {
    ok: true,
    ts: Date.now(),
    speedTps: null,
    running: false,
    energyWh: 0,
    cpu: null,
    gpu: null,
    ram: null,
    disk: null,
    context: null,
    tokens: { input: 0, output: 0, cacheRead: 0, total: 0, costUsd: 0 },
    recent: [],
    cfg: { overheatC: cfg.overheatC },
  };

  // Connected SSE listeners; each fresh tick is pushed to all of them so the
  // Client page updates in real time instead of polling.
  const sseClients = new Set();

  function pushStream() {
    if (sseClients.size === 0) return;
    const payload = 'data: ' + JSON.stringify(snapshot) + '\n\n';
    for (const res of sseClients) {
      try {
        res.write(payload);
      } catch {
        // dead socket; the 'close' listener drops it
      }
    }
  }

  // ---------- static hardware identity ----------
  const cpuStatic = { name: 'CPU', cores: null, threads: null };
  si.cpu()
    .then((c) => {
      cpuStatic.name = [c.manufacturer, c.brand].filter(Boolean).join(' ').trim() || 'CPU';
      cpuStatic.cores = finite(c.physicalCores);
      cpuStatic.threads = finite(c.cores);
    })
    .catch(() => {});

  // ---------- nvidia-smi GPU probe ----------
  let nvidiaDisabledUntil = 0;

  async function queryNvidia() {
    if (Date.now() < nvidiaDisabledUntil) return null;
    try {
      const { stdout } = await execFileAsync(
        'nvidia-smi',
        ['--query-gpu=' + NVIDIA_FIELDS.join(','), '--format=csv,noheader,nounits'],
        { timeout: 2500, windowsHide: true, maxBuffer: 1024 * 64 },
      );
      const line = String(stdout).trim().split(/\r?\n/)[0];
      if (!line) return null;
      const parts = line.split(',').map((s) => s.trim());
      const gen = parts[9];
      const width = parts[10];
      return {
        name: parts[0] || 'GPU',
        util: numberOrNull(parts[1]),
        fanPct: numberOrNull(parts[2]),
        memUsedGB: toGB(numberOrNull(parts[3])),
        memTotalGB: toGB(numberOrNull(parts[4])),
        powerW: numberOrNull(parts[5]),
        powerLimitW: numberOrNull(parts[6]),
        tempC: numberOrNull(parts[7]),
        clockMHz: numberOrNull(parts[8]),
        pcie: gen && width && /^\d+$/.test(gen) && /^\d+$/.test(width) ? 'Gen' + gen + ' x' + width : null,
      };
    } catch {
      // No NVIDIA tool on this machine, or it timed out; retry in a minute.
      nvidiaDisabledUntil = Date.now() + 60_000;
      return null;
    }
  }

  async function queryGraphicsFallback() {
    try {
      const gfx = await si.graphics();
      const controllers = gfx && Array.isArray(gfx.controllers) ? gfx.controllers : [];
      const ctrl =
        controllers.find((c) => c && (finite(c.utilizationGpu) !== null || finite(c.temperatureGpu) !== null)) ||
        controllers[0] ||
        null;
      if (!ctrl) return null;
      return {
        name: ctrl.name || ctrl.model || 'GPU',
        util: finite(ctrl.utilizationGpu),
        fanPct: finite(ctrl.fanSpeed),
        memUsedGB: toGB(finite(ctrl.memoryUsed)),
        memTotalGB: toGB(finite(ctrl.memoryTotal)) ?? toGB(finite(ctrl.vram)),
        powerW: finite(ctrl.powerDraw),
        powerLimitW: finite(ctrl.powerLimit),
        tempC: finite(ctrl.temperatureGpu),
        clockMHz: finite(ctrl.clockCore),
        pcie: null,
      };
    } catch {
      return null;
    }
  }

  // ---------- token / context / recent-request accumulation ----------
  const sessions = new Map(); // sessionId -> { input, output, cacheRead }
  let lastUsage = null;
  let contextWindow = null;

  const onSessionEvent = (session, event) => {
    try {
      if (!event || typeof event !== 'object') return;
      if (event.type === 'request/context' && event.data && Number.isFinite(event.data.contextWindow)) {
        contextWindow = event.data.contextWindow;
        return;
      }
      if (event.type !== 'assistant/message' || !event.data) return;
      const sid = session && session.id ? String(session.id) : 'default';
      let s = sessions.get(sid);
      if (!s) {
        s = { input: 0, output: 0, cacheRead: 0 };
        sessions.set(sid, s);
      }
      const usage = event.data.usage;
      if (!usage) return;
      const inTok = Number(usage.inputTokens) || 0;
      const outTok = Number(usage.outputTokens) || 0;
      const cacheRead = Number(usage.cacheReadTokens) || 0;
      s.input += inTok;
      s.output += outTok;
      s.cacheRead += cacheRead;
      lastUsage = { input: inTok + cacheRead, output: outTok, cacheRead };
      const model = event.data.message && event.data.message.source ? event.data.message.source.model || '' : '';
      snapshot.recent.unshift({
        time: Number.isFinite(event.time) ? event.time : Date.now(),
        model,
        input: inTok + cacheRead,
        cacheRead,
        output: outTok,
        status: event.data.interrupted ? 'interrupted' : 'completed',
      });
      if (snapshot.recent.length > 8) snapshot.recent.length = 8;
    } catch {
      // telemetry must never disturb session commits
    }
  };

  try {
    const off = ctx.on('session/event', onSessionEvent);
    if (typeof off === 'function') ctx.effect(() => off, 'prirex-monitor: session events');
  } catch {
    // no session service in this composition; hardware telemetry still works
  }

  // ---------- disk capacity ----------
  // fsStats()/disksIO() answer null on Windows, so read throughput is unavailable
  // there; free space comes from fsSize() and works on every platform.
  let diskSpace = null;

  async function refreshDiskSpace() {
    try {
      const parts = await si.fsSize();
      const list = Array.isArray(parts) ? parts.filter((p) => p && Number.isFinite(p.size)) : [];
      if (!list.length) return;
      const system = list.find((p) => /^C:/i.test(String(p.mount || ''))) || list[0];
      if (system && Number.isFinite(system.size) && Number.isFinite(system.available)) {
        diskSpace = {
          mount: system.mount || null,
          totalGB: system.size / 1073741824,
          freeGB: system.available / 1073741824,
        };
      }
    } catch {
      // keep the previous reading
    }
  }

  refreshDiskSpace();
  const diskSpaceTimer = setInterval(refreshDiskSpace, 15_000);
  try {
    ctx.effect(() => () => clearInterval(diskSpaceTimer), 'prirex-monitor: disk capacity');
  } catch {
    // interval is cleared on process teardown anyway
  }

  // ---------- polling loop ----------
  let lastTick = 0;
  let lastTotal = 0;
  let lastTokenAt = 0;
  let polling = false;

  const tick = async () => {
    if (polling) return;
    polling = true;
    try {
      const [load, mem, gpuProbe, temp, disk] = await Promise.allSettled([
        si.currentLoad(),
        si.mem(),
        queryNvidia(),
        si.cpuTemperature(),
        si.fsStats(),
      ]);
      const now = Date.now();
      const dt = lastTick ? (now - lastTick) / 1000 : 0;

      const loadValue = load.status === 'fulfilled' ? load.value : null;
      if (loadValue) {
        snapshot.cpu = {
          name: cpuStatic.name,
          usage: finite(loadValue.currentLoad),
          tempC: temp.status === 'fulfilled' ? pickTemp(temp.value) : null,
          cores: cpuStatic.cores,
          threads: cpuStatic.threads,
        };
      }

      const memValue = mem.status === 'fulfilled' ? mem.value : null;
      if (memValue && memValue.total > 0) {
        snapshot.ram = {
          usedGB: memValue.used / 1073741824,
          totalGB: memValue.total / 1073741824,
          percent: (memValue.used / memValue.total) * 100,
        };
      }

      let gpu = gpuProbe.status === 'fulfilled' ? gpuProbe.value : null;
      if (!gpu) gpu = await queryGraphicsFallback();
      if (gpu) {
        snapshot.gpu = gpu;
        if (finite(gpu.powerW) !== null && gpu.powerW > 0 && dt > 0) {
          // Wh since the host half started (rectangular integration per sample)
          snapshot.energyWh += (gpu.powerW * dt) / 3600;
        }
      } else {
        snapshot.gpu = null;
      }

      const diskValue = disk.status === 'fulfilled' ? disk.value : null;
      snapshot.disk = {
        readBps: diskValue ? finite(diskValue.rx_sec) : null,
        freeGB: diskSpace ? diskSpace.freeGB : null,
        totalGB: diskSpace ? diskSpace.totalGB : null,
        mount: diskSpace ? diskSpace.mount : null,
      };

      let tin = 0;
      let tout = 0;
      let tcr = 0;
      for (const s of sessions.values()) {
        tin += s.input;
        tout += s.output;
        tcr += s.cacheRead;
      }
      const total = tin + tout;
      snapshot.tokens = {
        input: Math.round(tin),
        output: Math.round(tout),
        cacheRead: Math.round(tcr),
        total: Math.round(total),
        costUsd: Number(
          ((tin / 1e6) * cfg.ratesUsdPerMillion.input + (tout / 1e6) * cfg.ratesUsdPerMillion.output).toFixed(4),
        ),
      };
      if (dt > 0 && total >= lastTotal) {
        snapshot.speedTps = total > lastTotal ? Math.round((total - lastTotal) / dt) : 0;
      }
      if (total > lastTotal) lastTokenAt = now;
      snapshot.running = now - lastTokenAt < 5000;
      lastTotal = total;

      if (lastUsage !== null && contextWindow !== null && contextWindow > 0) {
        snapshot.context = { used: lastUsage.input, window: contextWindow };
      }

      snapshot.ts = now;
      lastTick = now;
      pushStream();
    } catch {
      // keep the last snapshot; the route still answers
    } finally {
      polling = false;
    }
  };

  const timer = setInterval(tick, Math.max(200, cfg.refreshMs));
  tick();
  try {
    ctx.effect(() => () => clearInterval(timer), 'prirex-monitor: polling loop');
  } catch {
    // no context effect support; interval is cleared on process teardown anyway
  }

  // ---------- local HTTP routes for the Client page ----------
  ctx.inject(['webServer'], (sctx) => {
    try {
      sctx.effect(
        () =>
          sctx.webServer.register({
            kind: 'exact',
            path: ROUTE,
            handler: (req, res) => {
              if (!guard(req, res)) return;
              writeJson(res, 200, snapshot);
            },
          }),
        'prirex-monitor: telemetry route',
      );
    } catch {
      // without webServer the page shows its unavailable state
    }

    try {
      sctx.effect(
        () =>
          sctx.webServer.register({
            kind: 'exact',
            path: STREAM_ROUTE,
            handler: (req, res) => {
              if (!guard(req, res)) return;
              res.writeHead(200, {
                'content-type': 'text/event-stream; charset=utf-8',
                'cache-control': 'no-store',
                connection: 'keep-alive',
              });
              // retry hint so the browser reconnects after a host restart.
              res.write('retry: 2000\n\n');
              sseClients.add(res);
              req.on('close', () => sseClients.delete(res));
              pushStream();
            },
          }),
        'prirex-monitor: telemetry stream route',
      );
    } catch {
      // without the stream route clients fall back to polling ROUTE
    }
  });
}
