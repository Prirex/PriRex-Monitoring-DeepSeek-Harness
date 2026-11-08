// Smoke test: evaluates client.js in a stubbed module-loader environment and
// checks the registration contract (module id, slots, entry keys).
import fs from 'node:fs';

const MODULE_ID = 'prirex-monitoring-deepseek-harness';

const src = fs.readFileSync(new URL('../client.js', import.meta.url), 'utf8');

let loadedSpec = null;
globalThis.window = { __ModuleLoader__: { load(spec) { loadedSpec = spec; } } };

try {
  eval(src);
} catch (err) {
  console.log('EVAL THREW:', err && err.stack);
  process.exit(2);
}
console.log('eval done; loadedSpec =', JSON.stringify(loadedSpec));
if (!loadedSpec || loadedSpec.id !== MODULE_ID) throw new Error('BAD SPEC: ' + JSON.stringify(loadedSpec));
console.log('1) module load spec OK:', loadedSpec.id);

class FakeComponent {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(next) { this.state = { ...this.state, ...next }; }
  forceUpdate() {}
}
const fakeReact = {
  Component: FakeComponent,
  createElement: (type, props, ...children) => ({ type: typeof type === 'string' ? type : '(fn)', props: props || {}, children }),
  useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
  useEffect: () => {},
  useRef: (init) => ({ current: init }),
  useCallback: (fn) => fn,
  useMemo: (fn) => fn(),
  createRef: () => ({ current: null }),
};

const descriptor = loadedSpec.factory(() => fakeReact);
if (!descriptor.inject || !descriptor.inject.includes('slots')) throw new Error('inject missing slots');
console.log('2) descriptor OK, inject:', JSON.stringify(descriptor.inject));

const registrations = [];
const ctxStub = {
  get: () => undefined,
  on: () => {},
  provide: () => {},
  effect: (fn) => { fn(); return () => {}; },
  slots: {
    inject: (key, cb) => { cb(); },
    register: (opts, Comp) => { registrations.push({ opts, Comp }); return () => {}; },
  },
};

descriptor.apply(ctxStub);
console.log('3) apply OK, registrations:', JSON.stringify(registrations.map((r) => r.opts)));

const panellist = registrations.find((r) => r.opts.name === 'sidebar.panellist');
const main = registrations.find((r) => r.opts.name === 'main');
if (!panellist) throw new Error('no sidebar.panellist entry');
if (!panellist.opts.id || panellist.opts.label !== 'Монитор') throw new Error('bad panellist: ' + JSON.stringify(panellist.opts));
if (typeof panellist.Comp !== 'function') throw new Error('panellist component not a function');
if (!main) throw new Error('no main entry');
if (main.opts.key !== 'prirex-monitor') throw new Error('bad main key: ' + JSON.stringify(main.opts));
console.log('4) panellist id/label + main key OK; icon renders:', !!panellist.Comp({}));
console.log('SMOKE TEST PASSED');
