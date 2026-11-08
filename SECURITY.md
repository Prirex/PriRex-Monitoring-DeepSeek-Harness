# Security Policy

## Supported Versions

Security fixes are shipped for the latest release line only.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Please **do not** open a public issue for security problems.

Report privately via **GitHub Security Advisories**:
<https://github.com/Prirex/PriRex-Monitoring-DeepSeek-Harness/security/advisories/new>

That channel is private between you and the maintainer, so no public issue is created. If you
cannot use GitHub, open a regular issue containing **no exploit details** and ask for a private
channel — the report will be moved to an advisory.

Please include:

- affected version (`package.json` → `version`),
- operating system and Node.js version,
- a minimal reproduction (request, protocol message, or config),
- the impact you expect (data exposure, DoS, code execution, …).

## What to Expect

| Stage                        | Target                    |
| ---------------------------- | ------------------------- |
| Acknowledgement of the report | within 72 hours           |
| Initial assessment / triage   | within 7 days             |
| Fix or mitigation plan        | within 30 days            |
| Public disclosure             | coordinated with reporter |

You will be credited in the release notes unless you ask to stay anonymous.

## Attack Surface

Worth knowing before you audit:

- **Host half (`index.js`)** runs inside the DeepSeek Harness host process. It samples hardware
  through `systeminformation` and spawns `nvidia-smi` with a fixed argument vector — no shell, no
  user input reaches the command line.
- **Two local HTTP routes** are registered on the DSH web server:
  `/api/prirex-monitor/telemetry` (JSON) and `/api/prirex-monitor/stream` (SSE). Both accept only
  `GET`/`HEAD` (`405` otherwise), reject `Origin` values whose host differs from `Host`, and reject
  requests with `Sec-Fetch-Site: cross-site` (`403`). Responses are `no-store` and
  `referrer-policy: no-referrer`.
- **No outbound traffic.** The plugin never contacts the network; all numbers are produced locally.
- **Data exposed to the page** is limited to hardware telemetry and token counters of the local
  session. There is no filesystem access, no shell, and no writing of files.
