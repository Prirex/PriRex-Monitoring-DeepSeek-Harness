// PriRex Monitor — Client half.
// A dedicated page (sidebar panel + full central panel), not a floating widget.
// Built with React.createElement only (no JSX); styling through host theme tokens.

window.__ModuleLoader__.load({
  id: 'prirex-monitoring-deepseek-harness',
  factory(require) {
    const React = require('react');
    const e = React.createElement;

    const POLL_MS = 2000; // fallback interval if the SSE stream is unavailable
    const ROUTE = '/api/prirex-monitor/telemetry';
    const STREAM_ROUTE = '/api/prirex-monitor/stream';
    const VERSION = 'v1.0.0'; // project version shown on the brand card
    const GITHUB_URL = 'https://github.com/Prirex/PriRex-Monitoring-DeepSeek-Harness';
    const LOGO_SVG = `<svg viewBox="0 0 512 342">
<path d="M0 0 C-2.46 7.92 -5.67 15.42 -9 23 C-5.08 20.52 -1.89 18.04 1.25 14.62 C8.51 7.23 17.05 2.82 27 0 C27.99 0 28.98 0 30 0 C28.4 4.14 25.35 6.67 22.19 9.62 C17.07 14.54 13.55 19.29 11 26 C11.78 25.42 11.78 25.42 12.58 24.83 C21.68 18.39 33.59 13.26 45 14 C41.73 17.94 38.42 21.56 34.69 25.06 C23.33 36.32 16.06 50.72 15.94 66.81 C15.58 77.58 11.52 87.48 7.83 97.48 C6.52 101.44 5.89 105.27 5.68 109.43 C5.64 110.22 5.6 111.02 5.56 111.84 C5.52 112.65 5.48 113.47 5.44 114.31 C5.37 115.57 5.37 115.57 5.31 116.85 C5.2 118.9 5.1 120.95 5 123 C5.76 123.2 6.52 123.41 7.3 123.62 C8.29 123.89 9.29 124.16 10.31 124.44 C11.3 124.7 12.28 124.97 13.3 125.25 C15.22 125.78 17.11 126.37 19 127 C19 126.34 19 125.68 19 125 C24.48 125.34 28.01 128.55 32 132 C32.64 132.54 33.27 133.09 33.93 133.65 C40.65 140.25 42.69 149.66 43.22 158.84 C43 162 43 162 41 164 C41.72 164.09 42.45 164.18 43.19 164.27 C66.72 167.27 94.15 171.19 110 191 C114.45 197.33 115.82 203.37 115 211 C112.93 219.66 108.46 224.47 101.12 229.21 C90.2 235.27 77.23 236.19 65 236 C67.01 242.53 68.98 247.75 73.83 252.66 C75 254 75 254 75 256 C75.6 256.25 76.2 256.5 76.81 256.75 C79.29 258.17 80.36 259.69 82 262 C77.33 269.13 72.61 273.17 64.69 276.31 C55.85 277.96 47.86 277.72 40 273 C32.45 266.98 29.67 258.55 28.54 249.21 C28.04 242.47 27.97 235.76 28 229 C27.02 229.63 26.04 230.26 25.03 230.91 C18.09 235.32 11.12 239.62 3.88 243.5 C3.27 243.83 2.67 244.15 2.05 244.49 C-6.31 248.89 -13.61 249.92 -23 249 C-26.86 247.59 -28.71 245.43 -31 242 C-31 235.45 -28.34 231.59 -24 227 C-20.47 223.81 -16.77 220.9 -13 218 C-11.85 217.1 -10.69 216.21 -9.54 215.31 C-5.05 211.84 -0.55 208.4 4 205 C-2.35 204.49 -5.87 204.87 -11 209 C-11.61 209.4 -12.22 209.79 -12.85 210.2 C-16.66 212.68 -18.82 214.4 -20 219 C-21.98 218.01 -21.98 218.01 -24 217 C-24.43 213.38 -24.1 212.15 -22 209.06 C-19.72 205.57 -19.31 204.08 -20 200 C-22.12 196.55 -24.83 194.32 -27.94 191.81 C-31.97 188.41 -33.92 184.84 -35.99 180.04 C-36.83 177.84 -36.83 177.84 -39 177 C-40.76 177.4 -42.51 177.87 -44.25 178.38 C-56.59 181.59 -69.34 181.14 -82 181 C-81.01 180.01 -80.02 179.02 -79 178 C-79.88 177.66 -80.77 177.32 -81.68 176.97 C-90.98 173.21 -100.29 168.76 -107 161 C-107 160.34 -107 159.68 -107 159 C-105.06 159.02 -105.06 159.02 -103.09 159.04 C-101.37 159.04 -99.65 159.05 -97.94 159.06 C-97.09 159.07 -96.24 159.08 -95.37 159.09 C-90.46 159.11 -85.84 158.83 -81 158 C-81.51 157.66 -82.01 157.32 -82.53 156.98 C-83.51 156.31 -83.51 156.31 -84.5 155.62 C-85.47 154.96 -85.47 154.96 -86.47 154.29 C-87.23 153.65 -87.23 153.65 -88 153 C-88 152.34 -88 151.68 -88 151 C-86.92 151.16 -85.83 151.33 -84.72 151.5 C-79.31 152.17 -73.94 152.11 -68.5 152.06 C-66.98 152.06 -66.98 152.06 -65.43 152.05 C-62.95 152.04 -60.48 152.02 -58 152 C-58 151.34 -58 150.68 -58 150 C-58.55 149.83 -59.1 149.67 -59.67 149.5 C-65.31 147.73 -70.36 145.47 -75.5 142.56 C-76.27 142.13 -77.04 141.69 -77.83 141.25 C-91.51 133.39 -103.88 124.19 -115 113 C-115.82 112.18 -116.64 111.36 -117.48 110.52 C-132.88 94.27 -145.35 69.98 -146.12 47.38 C-146.08 46.59 -146.04 45.81 -146 45 C-145.34 45 -144.68 45 -144 45 C-143.4 46.34 -143.4 46.34 -142.79 47.71 C-138.52 56.9 -133.64 65.24 -125 71 C-125.29 69.74 -125.58 68.48 -125.88 67.19 C-129.5 50.75 -129.97 36.44 -126 20 C-125.34 20 -124.68 20 -124 20 C-123.66 21.05 -123.32 22.11 -122.97 23.19 C-120.43 30.84 -117.67 38.19 -113.88 45.31 C-113.55 45.93 -113.23 46.54 -112.89 47.18 C-110.99 50.64 -108.94 53.36 -106 56 C-106.02 55.44 -106.04 54.88 -106.06 54.31 C-106.54 39.69 -105.95 27.2 -99 14 C-98.34 14 -97.68 14 -97 14 C-96.84 15.26 -96.68 16.52 -96.52 17.81 C-93.51 40.4 -87.85 59.47 -69.81 74.75 C-64.13 79.01 -57.58 81.45 -51 84 C-50.85 83.47 -50.71 82.93 -50.56 82.39 C-46.48 67.61 -42.15 54.6 -32.04 42.75 C-29.54 39.37 -27.76 35.84 -25.94 32.06 C-21.33 22.52 -16.03 14.02 -9.31 5.81 C-8.85 5.23 -8.38 4.66 -7.91 4.06 C-4.47 0 -4.47 0 0 0 Z M16.5 157.5 C14 159 14 159 10 159 C9.33 160.43 8.66 161.87 8 163.31 C7.44 164.51 7.44 164.51 6.88 165.74 C5.82 168.06 5.82 168.06 6 171 C5.34 171 4.68 171 4 171 C4.96 178.32 6.8 187.74 11.31 193.75 C13.56 195.42 15.21 195.73 18 196 C20.29 195.02 20.29 195.02 22.39 193.36 C23.18 192.78 23.97 192.21 24.79 191.61 C25.6 191 26.41 190.38 27.25 189.75 C28.08 189.15 28.91 188.55 29.76 187.93 C34.4 184.76 34.4 184.76 37 180 C36.34 179.48 35.68 178.97 35 178.44 C33 176 33 176 32.56 172.44 C33 169 33 169 34.5 167.06 C35.24 166.54 35.24 166.54 36 166 C35.34 166 34.68 166 34 166 C34 164.68 34 163.36 34 162 C33.46 161.73 32.91 161.47 32.36 161.2 C31.64 160.84 30.92 160.49 30.19 160.12 C29.48 159.78 28.77 159.43 28.04 159.07 C26 158 26 158 23 156 C19.09 155.66 19.09 155.66 16.5 157.5 Z M-14 179 C-13.92 179.8 -13.83 180.59 -13.75 181.41 C-13.22 186.88 -13 191.57 -14 197 C-13.34 197.66 -12.68 198.32 -12 199 C-10.01 199.02 -10.01 199.02 -7.88 198.62 C-6.6 198.42 -5.32 198.21 -4 198 C-3.67 197.01 -3.34 196.02 -3 195 C-0.94 193.81 -0.94 193.81 1 193 C-0.44 189.41 -2.11 188 -5.38 186 C-8.69 183.96 -11.33 181.83 -14 179 Z M44 214 C42.64 215.65 41.3 217.31 40 219 C49.89 220.89 60.28 219.72 68.94 214.31 C73.66 210.79 78.34 206.32 81 201 C81.53 195.71 81.53 195.71 79.69 191 C70.83 185.75 50.01 208.12 44 214 Z M-2 197 C2 198 2 198 2 198 Z M6 199 C6.99 199.5 6.99 199.5 8 200 C8 200.66 8 201.32 8 202 C8.66 202 9.32 202 10 202 C9.67 201.01 9.34 200.02 9 199 C8.01 199 7.02 199 6 199 Z " fill="var(--dsw-alias-label-primary)" transform="translate(277,0)"/>
<path d="M0 0 C7.08 5.96 13.11 12.51 14.24 22.01 C14.49 29.13 12.97 35.55 8.23 41.05 C-3.9 52.23 -20.1 54.25 -36 54 C-33.99 60.53 -32.02 65.75 -27.17 70.66 C-26 72 -26 72 -26 74 C-25.4 74.25 -24.8 74.5 -24.19 74.75 C-21.71 76.17 -20.64 77.69 -19 80 C-23.67 87.13 -28.39 91.17 -36.31 94.31 C-45.15 95.96 -53.14 95.72 -61 91 C-68.55 84.98 -71.33 76.55 -72.46 67.21 C-72.96 60.47 -73.03 53.76 -73 47 C-73.98 47.63 -74.96 48.26 -75.97 48.91 C-82.91 53.32 -89.88 57.62 -97.12 61.5 C-97.73 61.83 -98.33 62.15 -98.95 62.49 C-107.31 66.89 -114.61 67.92 -124 67 C-127.86 65.59 -129.71 63.43 -132 60 C-132 53.45 -129.34 49.59 -125 45 C-121.47 41.81 -117.76 38.9 -114 36 C-112.92 35.15 -111.83 34.3 -110.75 33.45 C-107.53 30.93 -104.27 28.46 -101 26 C-100.04 25.27 -99.08 24.53 -98.09 23.78 C-97.22 23.13 -96.34 22.48 -95.44 21.81 C-94.67 21.24 -93.91 20.67 -93.12 20.08 C-91 19 -91 19 -88.79 19.26 C-87 20 -87 20 -86 21 C-85.5 20.01 -85.5 20.01 -85 19 C-82 20 -82 20 -81 22 C-81.55 18.63 -82.05 16.92 -84 14 C-83.54 13.66 -83.07 13.31 -82.59 12.96 C-80.48 11.39 -78.36 9.82 -76.25 8.25 C-75.52 7.71 -74.79 7.17 -74.04 6.62 C-70.45 3.94 -67.05 1.31 -64 -2 C-64.64 -2.29 -65.28 -2.58 -65.94 -2.88 C-68 -4 -68 -4 -69 -6 C-69.31 -9.44 -69.31 -9.44 -69 -13 C-55.47 -27.5 -12.67 -8.58 0 0 Z M-57 32 C-58.36 33.65 -59.7 35.31 -61 37 C-51.11 38.89 -40.72 37.72 -32.06 32.31 C-27.34 28.79 -22.66 24.32 -20 19 C-19.47 13.71 -19.47 13.71 -21.31 9 C-30.17 3.75 -50.99 26.12 -57 32 Z " fill="#FE0008" transform="translate(378,182)"/>
<path d="M0 0 C6.43 5.99 10 13.3 10.36 22.1 C10.57 32.99 8.18 41.06 0.71 49.34 C-9.09 58.23 -20.31 59.71 -32.97 59.53 C-34.13 59.52 -35.29 59.51 -36.49 59.5 C-39.34 59.48 -42.19 59.44 -45.04 59.4 C-44.83 62.3 -44.6 65.19 -44.35 68.09 C-44.27 69.31 -44.27 69.31 -44.19 70.56 C-43.78 74.87 -43.45 76.9 -40.63 80.33 C-39.78 81.02 -38.92 81.7 -38.04 82.4 C-35.16 84.84 -35.16 84.84 -33.04 87.4 C-32.85 90.46 -32.85 90.46 -34.04 93.4 C-41.71 100.14 -51.3 99.75 -60.96 99.72 C-62.96 99.71 -64.97 99.74 -66.97 99.76 C-75.67 99.77 -83.06 99.48 -90.1 94.03 C-92.04 91.4 -92.04 91.4 -92.66 88.84 C-91.57 84.57 -87.94 82.98 -84.39 80.69 C-81.77 78.58 -81.77 78.58 -81.43 75.38 C-81.44 74.2 -81.46 73.02 -81.47 71.8 C-81.47 71.14 -81.47 70.49 -81.47 69.82 C-81.47 67.66 -81.51 65.51 -81.55 63.36 C-81.56 61.86 -81.56 60.36 -81.57 58.87 C-81.59 54.93 -81.64 51 -81.69 47.07 C-81.74 43.05 -81.77 39.04 -81.79 35.02 C-81.84 27.15 -81.93 19.28 -82.04 11.4 C-86 9.42 -89.96 7.44 -94.04 5.4 C-94.38 -0.59 -94.38 -0.59 -94.04 -3.6 C-91 -6.94 -87.75 -7.56 -83.3 -7.79 C-81.75 -7.82 -80.19 -7.85 -78.63 -7.88 C-77.8 -7.9 -76.97 -7.92 -76.11 -7.93 C-73.44 -7.99 -70.77 -8.05 -68.1 -8.1 C-53.3 -8.35 -53.3 -8.35 -38.54 -9.37 C-24.9 -10.6 -11.07 -8.69 0 0 Z M-45.04 10.4 C-45.14 12.37 -45.17 14.33 -45.17 16.3 C-45.17 17.5 -45.17 18.7 -45.17 19.94 C-45.17 21.21 -45.16 22.47 -45.16 23.78 C-45.16 25.04 -45.17 26.29 -45.17 27.59 C-45.17 28.79 -45.17 30 -45.17 31.24 C-45.17 32.35 -45.17 33.46 -45.16 34.6 C-45.16 37.49 -45.16 37.49 -44.04 40.4 C-38.38 41.67 -35.01 41.5 -30.04 38.4 C-26.28 33.78 -25.39 28.7 -25.64 22.87 C-26.41 18.02 -28.27 14.06 -31.85 10.7 C-34.51 9.12 -36.16 9.06 -39.22 9.15 C-40.1 9.17 -40.98 9.18 -41.89 9.2 C-44.02 9.17 -44.02 9.17 -45.04 10.4 Z " fill="var(--dsw-alias-label-primary)" transform="translate(94.03515625,242.59765625)"/>
<path d="M0 0 C1.53 -0.01 1.53 -0.01 3.1 -0.03 C10.18 0 16.37 0.45 22.69 3.94 C24.62 6.25 24.62 6.25 24.5 9.69 C23.99 11.78 23.45 13.86 22.88 15.94 C22.37 18.37 22.37 18.37 24.06 20.56 C24.58 21.12 25.09 21.68 25.62 22.25 C27.62 21.67 27.62 21.67 29.62 20.25 C31.11 17.37 31.11 17.37 31.62 14.25 C30.63 12.76 30.63 12.76 29.62 11.25 C29.19 8.31 29.19 8.31 29.62 5.25 C33.45 1.32 36.5 0.38 41.83 0.05 C54.06 -0.11 54.06 -0.11 59.62 3.25 C61.06 6.12 61.01 8.07 60.62 11.25 C58.22 13.65 55.78 15.17 52.81 16.81 C47.86 20.02 44.89 25.47 41.62 30.25 C41.15 30.87 40.68 31.49 40.19 32.12 C38.44 34.46 37.57 35.7 37.88 38.66 C38.65 41.33 39.58 43.06 41.17 45.32 C41.69 46.05 42.2 46.78 42.73 47.54 C43.28 48.29 43.82 49.04 44.38 49.81 C45.16 50.94 45.16 50.94 45.97 52.1 C49.48 57.03 52.73 61.03 58.44 63.44 C60.62 65.25 60.62 65.25 61.08 67.33 C61.24 70.85 61.32 73.35 59.12 76.19 C52.99 78.79 47.05 79.56 40.47 79.59 C39.72 79.59 38.98 79.6 38.21 79.61 C36.64 79.62 35.07 79.62 33.51 79.62 C31.13 79.62 28.76 79.66 26.38 79.7 C12.06 79.8 12.06 79.8 5.62 75.25 C4.19 72.38 4.24 70.43 4.62 67.25 C7.12 64.88 7.12 64.88 9.62 63.25 C9.09 58.74 7.26 55.9 4.62 52.25 C0.67 53.52 -0.76 55.93 -2.62 59.44 C-3.63 61.87 -3.81 63.66 -3.38 66.25 C-2.71 67.24 -2.06 68.23 -1.38 69.25 C-0.88 72.19 -0.88 72.19 -1.38 75.25 C-6.5 79.93 -11.22 79.83 -17.94 79.69 C-18.87 79.69 -19.8 79.7 -20.76 79.71 C-26.26 79.66 -30.29 79.33 -34.38 75.25 C-34.52 72.58 -34.42 69.93 -34.38 67.25 C-33.36 66.8 -33.36 66.8 -32.33 66.33 C-30.99 65.7 -30.99 65.7 -29.62 65.06 C-28.74 64.66 -27.86 64.25 -26.95 63.83 C-21.09 60.24 -17.72 53.42 -14.06 47.75 C-13.5 46.91 -12.94 46.07 -12.36 45.2 C-11.83 44.38 -11.3 43.56 -10.76 42.72 C-10.04 41.61 -10.04 41.61 -9.3 40.48 C-8.11 37.61 -8.42 36.18 -9.38 33.25 C-10.9 30.67 -12.86 28.46 -14.81 26.19 C-15.61 25.25 -15.61 25.25 -16.43 24.29 C-20.29 19.98 -23.73 17.43 -29.41 15.93 C-31.38 15.25 -31.38 15.25 -33.38 12.25 C-33.38 8.4 -32.89 6.78 -30.19 4 C-21.48 -0.87 -9.66 0.06 0 0 Z " fill="var(--dsw-alias-label-primary)" transform="translate(451.375,262.75)"/>
<path d="M0 0 C6.95 4.94 12.84 11.96 14.55 20.49 C14.95 25.41 15.11 29.86 13.48 34.55 C9.98 38.06 5.23 38.59 0.45 38.72 C-1.04 38.72 -2.53 38.71 -4.01 38.69 C-4.8 38.68 -5.59 38.68 -6.4 38.68 C-8.9 38.67 -11.39 38.64 -13.89 38.62 C-15.59 38.61 -17.3 38.6 -19 38.59 C-23.15 38.57 -27.3 38.53 -31.45 38.49 C-30.87 39.78 -30.27 41.06 -29.66 42.34 C-29.33 43.05 -28.99 43.77 -28.65 44.5 C-26.01 48.89 -21.77 50.16 -17.02 51.37 C-11.05 51.58 -6.45 50.1 -1.27 47.37 C4.18 44.56 4.18 44.56 7.55 45.49 C10.72 48.84 11.51 50.81 11.73 55.43 C10.74 60.55 7.63 63.47 3.55 66.49 C0.31 68.42 -2.97 70.06 -6.45 71.49 C-7.73 72.04 -7.73 72.04 -9.03 72.61 C-14.08 73.91 -19 73.86 -24.2 73.87 C-25.24 73.89 -26.27 73.92 -27.34 73.94 C-38.56 73.98 -47.39 70.33 -55.45 62.49 C-64.39 52.01 -66.52 42.02 -65.66 28.5 C-64.55 17.76 -58.22 9.41 -50.14 2.68 C-35.94 -7.8 -15.08 -9.27 0 0 Z M-29.33 11.55 C-32.14 14.83 -32.14 14.83 -31.45 21.49 C-26.5 21.49 -21.55 21.49 -16.45 21.49 C-15.36 16.05 -15.68 15.01 -18.45 10.49 C-22.63 8.4 -25.59 8.88 -29.33 11.55 Z " fill="var(--dsw-alias-label-primary)" transform="translate(401.453125,268.5078125)"/>
<path d="M0 0 C0.51 2.38 0.51 2.38 0.69 5.12 C0.79 6.49 0.79 6.49 0.89 7.88 C0.94 8.93 0.94 8.93 1 10 C3.68 7.94 6.11 5.89 8.44 3.44 C12.38 -0.31 15.45 -1.83 20.88 -2.44 C26.81 -2.19 31.4 0.31 35.44 4.56 C38.89 9.95 38.58 15.8 38 22 C36.1 27.82 32 31.29 26.81 34.25 C21.69 35.62 16.48 36.42 11.71 33.69 C10.37 32.64 9.06 31.55 7.79 30.41 C5.85 28.88 4.41 28.42 2 28 C-0.66 37.15 1.24 47.67 2 57 C2.61 57.17 3.23 57.34 3.86 57.52 C10.34 59.46 10.34 59.46 13.12 61.75 C14.47 65.22 14.01 67.46 13 71 C8.88 75.35 4.24 76.83 -1.66 77.27 C-3.01 77.29 -4.36 77.3 -5.71 77.3 C-6.43 77.31 -7.16 77.31 -7.9 77.31 C-9.43 77.32 -10.96 77.32 -12.48 77.32 C-14.8 77.31 -17.11 77.34 -19.42 77.36 C-36.99 77.44 -36.99 77.44 -43.62 71.75 C-45 69 -45 69 -45.19 65.56 C-43.78 61.35 -42.13 59.97 -38.59 57.46 C-35.97 55.06 -36.03 52.49 -35.84 49.02 C-35.79 45.33 -35.76 41.63 -35.75 37.94 C-35.72 36 -35.72 36 -35.69 34.02 C-35.68 32.79 -35.68 31.55 -35.67 30.28 C-35.66 29.15 -35.65 28.01 -35.64 26.85 C-35.76 24 -35.76 24 -37.39 22.15 C-38.99 20.89 -38.99 20.89 -41.12 20.25 C-43 19 -43 19 -44.06 15.75 C-44 11.92 -43.57 10.16 -40.88 7.41 C-32.17 0.89 -9.77 -6.51 0 0 Z " fill="var(--dsw-alias-label-primary)" transform="translate(151,265)"/>
<path d="M0 0 C1.81 2.38 1.74 3.84 1.75 6.81 C1.76 7.84 1.77 8.86 1.78 9.91 C1.77 11.01 1.77 12.12 1.77 13.25 C1.78 14.39 1.79 15.52 1.8 16.69 C1.84 20.33 1.85 23.97 1.86 27.61 C1.88 32.39 1.91 37.16 1.96 41.94 C1.95 43.04 1.95 44.13 1.95 45.26 C2 50.83 2.12 55.04 5.36 59.8 C6.72 61 6.72 61 8.11 62.23 C10.36 64.8 10.36 64.8 10.49 68.36 C9.14 72.48 8.07 73.62 4.36 75.8 C-2.36 78.05 -8.52 78.13 -15.54 78.11 C-17.57 78.11 -19.59 78.13 -21.61 78.16 C-36.92 78.16 -36.92 78.16 -42.64 72.98 C-44.08 69.83 -44.31 68.24 -43.64 64.8 C-41.97 62.84 -40.21 61.18 -38.27 59.51 C-33.73 54.74 -35.37 45.88 -35.33 39.8 C-35.3 38.51 -35.27 37.23 -35.24 35.9 C-35.23 34.67 -35.22 33.44 -35.21 32.17 C-35.2 31.04 -35.18 29.92 -35.17 28.76 C-35.74 25.12 -36.83 24.09 -39.64 21.8 C-42.45 19.36 -42.45 19.36 -44.64 16.8 C-44.72 13.51 -44.04 12.25 -41.88 9.8 C-34.99 3.65 -8.28 -6.09 0 0 Z " fill="var(--dsw-alias-label-primary)" transform="translate(234.6375732421875,264.2046356201172)"/>
<path d="M0 0 C2.08 1.63 2.89 2.47 3.43 5.09 C3.44 6.22 3.44 6.22 3.44 7.38 C3.46 8.13 3.48 8.88 3.5 9.65 C2.79 12.98 1.37 14.58 -1 17 C-3.8 18.55 -3.8 18.55 -6.88 19.75 C-7.88 20.16 -8.89 20.56 -9.93 20.98 C-17.67 23.55 -26.79 24.48 -34.56 21.75 C-37.11 19.92 -38.6 18.8 -40 16 C-40.65 11.62 -40.38 9.62 -38.06 5.81 C-28.8 -3.97 -11.63 -5.41 0 0 Z " fill="var(--dsw-alias-label-primary)" transform="translate(232,237)"/>
</svg>`;

    // Set in apply(); the page header uses it to return to the Conversation.
    let closePanel = null;

    // ------------------------------------------------------------------ helpers
    const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

    function fmtNum(v, digits) {
      if (!isNum(v)) return '—';
      const d = digits === undefined ? 0 : digits;
      return v.toFixed(d).replace('.', ',');
    }

    function fmtBps(v) {
      if (!isNum(v) || v <= 0) return '—';
      const units = ['Б/с', 'КБ/с', 'МБ/с', 'ГБ/с'];
      let n = v;
      let i = 0;
      while (n >= 1024 && i < units.length - 1) {
        n /= 1024;
        i += 1;
      }
      return (i === 0 ? Math.round(n) : n.toFixed(1).replace('.', ',')) + ' ' + units[i];
    }

    function fmtTime(ms) {
      try {
        return new Date(ms).toLocaleTimeString('ru-RU', { hour12: false });
      } catch {
        return '—';
      }
    }

    function fmtTokens(v) {
      if (!isNum(v)) return '—';
      if (v >= 1e6) return (v / 1e6).toFixed(2).replace('.', ',') + 'M';
      if (v >= 1e3) return (v / 1e3).toFixed(1).replace('.', ',') + 'K';
      return String(Math.round(v));
    }

    // ------------------------------------------------------------------- icons
    function CardIcon({ kind }) {
      const s = {
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
      };
      const dot = { fill: 'currentColor', stroke: 'none' };
      let shapes;

      switch (kind) {
        case 'speed':
          shapes = [
            e('path', { key: 'a', d: 'M4.7 14.6a7.5 7.5 0 1 1 14.6 0', ...s }),
            e('path', { key: 'b', d: 'M12 14.6l3.6-3.6', ...s }),
            e('circle', { key: 'c', cx: 12, cy: 14.6, r: 1.25, ...dot }),
          ];
          break;
        case 'gpu':
          shapes = [
            e('rect', { key: 'a', x: 3, y: 6.5, width: 18, height: 11, rx: 2, ...s }),
            e('rect', { key: 'b', x: 6.6, y: 9.8, width: 4.4, height: 4.4, rx: 0.8, ...s }),
            e('path', { key: 'c', d: 'M14.6 10h3M14.6 12h3M14.6 14h3', ...s }),
          ];
          break;
        case 'vram':
          shapes = [
            e('path', { key: 'a', d: 'M12 3.8l7.6 3.6L12 11 4.4 7.4 12 3.8z', ...s }),
            e('path', { key: 'b', d: 'M4.4 12L12 15.6 19.6 12', ...s }),
            e('path', { key: 'c', d: 'M4.4 16.4L12 20l7.6-3.6', ...s }),
          ];
          break;
        case 'temp':
          shapes = [
            e('path', { key: 'a', d: 'M10.2 13.6V6.2a1.8 1.8 0 1 1 3.6 0v7.4a3.6 3.6 0 1 1-3.6 0z', ...s }),
            e('path', { key: 'b', d: 'M12 9.4v5.2', ...s }),
            e('circle', { key: 'c', cx: 12, cy: 16.8, r: 1.15, ...dot }),
          ];
          break;
        case 'power':
          shapes = [e('path', { key: 'a', d: 'M13.2 3.6L5.6 13.2h4.4l-1 7.2 7.6-10h-4.4l1-6.8z', ...s })];
          break;
        case 'pcie':
          shapes = [
            e('path', { key: 'a', d: 'M9.2 7.4H6a2.2 2.2 0 0 0-2.2 2.2v4.8A2.2 2.2 0 0 0 6 16.6h3.2', ...s }),
            e('path', { key: 'b', d: 'M14.8 7.4H18a2.2 2.2 0 0 1 2.2 2.2v4.8a2.2 2.2 0 0 1-2.2 2.2h-3.2', ...s }),
            e('path', { key: 'c', d: 'M9 12h6', ...s }),
          ];
          break;
        case 'cpu':
          shapes = [
            e('rect', { key: 'a', x: 7, y: 7, width: 10, height: 10, rx: 1.8, ...s }),
            e('rect', { key: 'b', x: 10.4, y: 10.4, width: 3.2, height: 3.2, rx: 0.6, ...s }),
            e('path', { key: 'c', d: 'M10 3v2.4M14 3v2.4M10 18.6V21M14 18.6V21M3 10h2.4M3 14h2.4M18.6 10H21M18.6 14H21', ...s }),
          ];
          break;
        case 'brand':
          shapes = [
            e('path', { key: 'a', d: 'M4.6 10.9V7.2A2.2 2.2 0 0 1 6.8 5h3.7l8.9 8.9-6.9 6.9z', ...s }),
            e('circle', { key: 'b', cx: 8.4, cy: 8.4, r: 1.2, fill: 'currentColor', stroke: 'none' }),
          ];
          break;
        case 'disk':
        default:
          shapes = [
            e('ellipse', { key: 'a', cx: 12, cy: 6.2, rx: 7, ry: 2.6, ...s }),
            e('path', { key: 'b', d: 'M5 6.2v11.6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6.2', ...s }),
            e('path', { key: 'c', d: 'M5 12.2c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6', ...s }),
          ];
          break;
      }

      return e(
        'svg',
        { width: 15, height: 15, viewBox: '0 0 24 24', 'aria-hidden': 'true', style: { display: 'block' } },
        shapes,
      );
    }

    function PanelIcon({ size, active }) {
      const edge = isNum(size) ? size : 22;
      const s = {
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
      };
      return e(
        'svg',
        {
          width: edge,
          height: edge,
          viewBox: '0 0 24 24',
          'aria-hidden': 'true',
          style: { display: 'block', opacity: active ? 1 : 0.88 },
        },
        [
          e('rect', { key: 'r', x: 3.2, y: 4.4, width: 17.6, height: 12.4, rx: 2.4, ...s }),
          e('path', { key: 'p', d: 'M6.6 13.4l3-3.9 2.4 3.3 2-2.4 3.4 2.9', ...s }),
          e('path', { key: 'f', d: 'M9.2 20.4h5.6M12 16.9v3.5', ...s }),
        ],
      );
    }

    // ---------------------------------------------------------------- sparkline
    function Sparkline({ values, warn }) {
      const list = Array.isArray(values) ? values.slice(-40) : [];
      if (list.length < 2) return e('div', { className: 'pm-spark-empty', 'aria-hidden': 'true' });

      const W = 220;
      const H = 32;
      const P = 2.5;
      const top = Math.max(1, ...list);
      const step = (W - P * 2) / (list.length - 1);

      const points = list.map((v, i) => {
        const x = P + i * step;
        const y = H - P - (Math.max(0, Math.min(top, v)) / top) * (H - P * 2);
        return x.toFixed(1) + ',' + y.toFixed(1);
      });

      const line = points.join(' ');
      const area = line + ' ' + (W - P).toFixed(1) + ',' + (H - P) + ' ' + P + ',' + (H - P);

      return e(
        'svg',
        {
          className: 'pm-spark' + (warn ? ' pm-spark-warn' : ''),
          viewBox: '0 0 ' + W + ' ' + H,
          preserveAspectRatio: 'none',
          'aria-hidden': 'true',
        },
        [
          e('polygon', { key: 'a', points: area, fill: 'currentColor', opacity: '0.10' }),
          e('polyline', {
            key: 'l',
            points: line,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '1.8',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
        ],
      );
    }

    // -------------------------------------------------------------- metric card
    function MetricCard({ kind, label, value, sub, measured, spark, warn }) {
      return e('div', { className: 'pm-card' }, [
        e('div', { key: 't', className: 'pm-card-tag' }, measured ? 'Измерено' : 'Недоступно'),
        e('div', { key: 'h', className: 'pm-card-head' }, [
          e(CardIcon, { key: 'i', kind }),
          e('span', { key: 'l' }, label),
        ]),
        e('div', { key: 'v', className: 'pm-card-value' }, value),
        e('div', { key: 's', className: 'pm-card-sub' }, sub),
        spark && measured
          ? e(Sparkline, { key: 'sp', values: spark, warn })
          : e('div', { key: 'e', className: 'pm-spark-empty', 'aria-hidden': 'true' }),
      ]);
    }

    // -------------------------------------------------------------- brand card
    function BrandCard() {
      return e('div', { className: 'pm-card pm-brand' }, [
        e('div', { key: 'h', className: 'pm-card-head' }, [
          e(CardIcon, { key: 'i', kind: 'brand' }),
          e('span', { key: 'l' }, 'Версия проекта'),
        ]),
        e('div', { key: 'v', className: 'pm-card-value pm-version' }, VERSION),
        e('div', { key: 's', className: 'pm-card-sub' }, 'Разработано PriRex'),
        e('a', { key: 'logo', className: 'pm-logo', href: GITHUB_URL, target: '_blank', rel: 'noopener noreferrer' }, [
          e('span', { key: 's', dangerouslySetInnerHTML: { __html: LOGO_SVG } }),
        ]),
      ]);
    }

    // -------------------------------------------------------------- telemetry hook
    function useTelemetry() {
      const [data, setData] = React.useState(null);
      const [offline, setOffline] = React.useState(false);

      React.useEffect(() => {
        let alive = true;
        let source = null;
        let timer = null;

        // Fallback path: plain polling of the JSON route.
        const load = async () => {
          try {
            const res = await fetch(ROUTE, { cache: 'no-store', credentials: 'same-origin' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const json = await res.json();
            if (!alive) return;
            if (json && typeof json === 'object') {
              setData(json);
              setOffline(false);
            }
          } catch {
            if (alive) setOffline(true);
          }
        };

        const startPolling = () => {
          if (!alive || timer !== null) return;
          load();
          timer = setInterval(load, POLL_MS);
        };

        // Primary path: SSE stream — every fresh sample arrives as an event.
        try {
          source = new EventSource(STREAM_ROUTE, { withCredentials: true });
          source.onmessage = (ev) => {
            if (!alive || !ev || typeof ev.data !== 'string') return;
            let json;
            try {
              json = JSON.parse(ev.data);
            } catch {
              return;
            }
            if (json && typeof json === 'object') {
              setData(json);
              setOffline(false);
            }
          };
          source.onerror = () => {
            // Stream unavailable (older host, or server hiccup): fall back to polling.
            try {
              source.close();
            } catch {}
            source = null;
            startPolling();
          };
        } catch {
          startPolling();
        }

        return () => {
          alive = false;
          if (source) {
            try {
              source.close();
            } catch {}
          }
          if (timer !== null) clearInterval(timer);
        };
      }, []);

      return { data, offline };
    }

    // -------------------------------------------------------------- page styles
    const CSS = `
.pm-page { box-sizing: border-box; height: 100%; min-height: 100%; overflow: auto; padding: 22px 26px 40px; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; font-size: 13px; }
.pm-page *, .pm-page *::before, .pm-page *::after { box-sizing: border-box; }
.pm-head { display: flex; align-items: center; gap: 10px; margin: 2px 0 14px; }
.pm-title { margin: 0; font-size: 19px; line-height: 1.2; font-weight: 650; letter-spacing: -0.01em; }
.pm-badge { display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 10px; border-radius: 999px; font-size: 11.5px; font-weight: 600; background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 13%, transparent); color: var(--dsw-alias-state-success-primary); }
.pm-badge.pm-badge-idle { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent); color: var(--dsw-alias-label-secondary); }
.pm-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }
.pm-close { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; margin-left: auto; padding: 0; border: none; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-secondary); font-size: 18px; line-height: 1; cursor: pointer; }
.pm-close:hover { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 12%, transparent); color: var(--dsw-alias-label-primary); }
.pm-status-card { display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 46px; margin-bottom: 14px; padding: 12px 18px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); }
.pm-status-text { color: var(--dsw-alias-label-primary); font-size: 13px; }
.pm-status-meta { font-size: 11.5px; color: var(--dsw-alias-label-secondary); white-space: nowrap; opacity: 0.9; }
.pm-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(198px, 1fr)); gap: 12px; margin-bottom: 12px; }
.pm-card { position: relative; display: flex; flex-direction: column; gap: 5px; min-height: 138px; padding: 13px 15px 9px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); }
.pm-card-tag { position: absolute; top: 12px; right: 13px; font-size: 10px; letter-spacing: 0.02em; color: var(--dsw-alias-label-secondary); opacity: 0.85; }
.pm-card-head { display: flex; align-items: center; gap: 7px; padding-right: 66px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.pm-card-head svg { flex: none; opacity: 0.9; }
.pm-card-value { font-size: 27px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.pm-card-sub { min-height: 15px; font-size: 11px; line-height: 1.35; color: var(--dsw-alias-label-secondary); }
.pm-version { letter-spacing: -0.01em; }
.pm-logo { margin-top: auto; padding-bottom: 2px; display: flex; justify-content: center; align-items: flex-end; min-height: 36px; text-decoration: none; cursor: pointer; }
.pm-logo svg { width: 96px; max-width: 100%; height: auto; display: block; opacity: 0.95; transition: opacity .12s ease, transform .12s ease; }
.pm-logo:hover svg { opacity: 1; transform: scale(1.03); }
.pm-spark { display: block; width: 100%; height: 30px; margin-top: auto; color: var(--dsw-alias-state-success-primary); }
.pm-spark.pm-spark-warn { color: var(--dsw-alias-state-warn-primary); }
.pm-spark-empty { height: 20px; margin-top: auto; border-bottom: 1px dashed var(--dsw-alias-border-l1); }
.pm-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 14px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); }
.pm-stat { min-width: 0; padding: 11px 18px; }
.pm-stat + .pm-stat { border-left: 1px solid var(--dsw-alias-border-l1); }
.pm-stat-label { margin-bottom: 3px; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.pm-stat-value { font-size: 15px; font-weight: 650; font-variant-numeric: tabular-nums; }
.pm-foot { display: grid; grid-template-columns: minmax(230px, 0.85fr) minmax(0, 2.1fr); gap: 12px; }
.pm-panel { min-width: 0; padding: 14px 17px 16px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 12px; background: var(--dsw-alias-bg-layer-1); }
.pm-panel-title { margin: 0 0 10px; font-size: 13px; font-weight: 650; }
.pm-ring-wrap { display: flex; flex-direction: column; align-items: center; padding: 8px 0 10px; }
.pm-ring { display: flex; align-items: center; justify-content: center; width: 92px; height: 92px; border-radius: 50%; background: color-mix(in srgb, var(--dsw-alias-border-l1) 75%, transparent); }
.pm-ring-inner { display: flex; align-items: center; justify-content: center; width: 74px; height: 74px; border-radius: 50%; background: var(--dsw-alias-bg-layer-1); font-size: 15px; font-weight: 650; font-variant-numeric: tabular-nums; }
.pm-note { max-width: 170px; margin: 0 auto; text-align: center; font-size: 11px; line-height: 1.45; color: var(--dsw-alias-label-secondary); }
.pm-table-wrap { overflow-x: auto; }
.pm-table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
.pm-table th { padding: 0 10px 8px 0; border-bottom: 1px solid var(--dsw-alias-border-l1); text-align: left; font-size: 9.5px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
.pm-table td { padding: 8px 10px 6px 0; border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent); color: var(--dsw-alias-label-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }
.pm-table tr:last-child td { border-bottom: none; }
.pm-empty-row td { padding-top: 12px; color: var(--dsw-alias-label-secondary); }
.pm-error { padding: 24px; color: var(--dsw-alias-state-error-primary); font-family: 'Cascadia Mono', Consolas, monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap; }
@media (max-width: 900px) { .pm-foot { grid-template-columns: 1fr; } }
`;

    // ------------------------------------------------------------------- page
    const EMPTY_HISTORY = { gpu: [], cpu: [], power: [], temp: [], disk: [], speed: [] };

    const HEADERS = [
      'Время',
      'Статус',
      'Запрос',
      'Ввод',
      'Из кэша',
      'Вывод',
      'Кэш, %',
    ];

    function MonitorPage(props) {
      const { data, offline } = useTelemetry();
      const [history, setHistory] = React.useState(EMPTY_HISTORY);

      const running = !!(data && data.running);

      React.useEffect(() => {
        if (!data) return;
        setHistory((prev) => {
          const add = (arr, v) => (isNum(v) ? arr.concat([v]).slice(-40) : arr);
          return {
            gpu: add(prev.gpu, data.gpu && data.gpu.util),
            cpu: add(prev.cpu, data.cpu && data.cpu.usage),
            power: add(prev.power, data.gpu && data.gpu.powerW),
            temp: add(prev.temp, data.gpu && data.gpu.tempC),
            disk: add(prev.disk, data.disk && data.disk.readBps),
            speed: add(prev.speed, data.speedTps),
          };
        });
      }, [data]);

      const gpu = (data && data.gpu) || {};
      const cpu = (data && data.cpu) || {};
      const disk = (data && data.disk) || {};
      const recent = (data && Array.isArray(data.recent) && data.recent) || [];
      // The host sends the configured threshold; 80 °C matches its default.
      const overheatLimit = isNum(data && data.cfg && data.cfg.overheatC) ? data.cfg.overheatC : 80;
      const context = data && data.context;
      const contextPct =
        context && isNum(context.used) && isNum(context.window) && context.window > 0
          ? Math.max(0, Math.min(100, (context.used / context.window) * 100))
          : null;

      const gpuName = typeof gpu.name === 'string' && gpu.name ? gpu.name : 'GPU';
      const vramValue =
        isNum(gpu.memUsedGB) && isNum(gpu.memTotalGB)
          ? fmtNum(gpu.memUsedGB, 1) + ' / ' + fmtNum(gpu.memTotalGB, 0) + ' GB'
          : '—';
      const cpuName = [cpu.name, isNum(cpu.cores) ? cpu.cores + ' cores' : null, isNum(cpu.threads) ? cpu.threads + ' threads' : null]
        .filter(Boolean)
        .join(' · ');

      const cards = [
        {
          kind: 'speed',
          label: 'Скорость',
          value: isNum(data && data.speedTps) && data.speedTps > 0 ? fmtNum(data.speedTps) + ' tok/s' : '—',
          sub: 'Генерация / Обработка',
          measured: isNum(data && data.speedTps) && data.speedTps > 0,
          spark: history.speed,
        },
        {
          kind: 'gpu',
          label: 'Загрузка GPU',
          value: isNum(gpu.util) ? fmtNum(gpu.util) + '%' : '—',
          sub: gpuName,
          measured: isNum(gpu.util),
          spark: history.gpu,
        },
        {
          kind: 'vram',
          label: 'VRAM',
          value: vramValue,
          sub: 'Память GPU',
          measured: isNum(gpu.memUsedGB) && isNum(gpu.memTotalGB),
          spark: [],
        },
        {
          kind: 'temp',
          label: 'Темп. GPU',
          value: isNum(gpu.tempC) ? fmtNum(gpu.tempC) + ' °C' : '—',
          sub: gpuName,
          measured: isNum(gpu.tempC),
          spark: history.temp,
          warn: isNum(gpu.tempC) && gpu.tempC >= overheatLimit,
        },
        {
          kind: 'power',
          label: 'Мощность',
          value: isNum(gpu.powerW) ? fmtNum(gpu.powerW) + ' W' : '—',
          sub: isNum(gpu.powerLimitW) ? 'на лимите ' + fmtNum(gpu.powerLimitW) + ' Вт' : 'Лимит неизвестен',
          measured: isNum(gpu.powerW),
          spark: history.power,
        },
        {
          kind: 'pcie',
          label: 'PCIe',
          value: typeof gpu.pcie === 'string' && gpu.pcie ? gpu.pcie : '—',
          sub: 'Данные о передаче на GPU недоступны',
          measured: typeof gpu.pcie === 'string' && !!gpu.pcie,
          spark: [],
        },
        {
          kind: 'cpu',
          label: 'CPU',
          value: isNum(cpu.usage) ? fmtNum(cpu.usage) + '%' : '—',
          sub: cpuName || 'CPU',
          measured: isNum(cpu.usage),
          spark: history.cpu,
        },
        {
          kind: 'disk',
          label: 'Чтение диска',
          value: fmtBps(disk.readBps),
          sub: 'Скорость чтения',
          measured: isNum(disk.readBps),
          spark: history.disk,
        },
      ];

      const stats = [
        { label: 'Энергия с запуска', value: isNum(data && data.energyWh) ? fmtNum(data.energyWh, 1) + ' Wh' : '—' },
        { label: 'Вентилятор GPU', value: isNum(gpu.fanPct) ? fmtNum(gpu.fanPct) + '%' : '—' },
        { label: 'Частота GPU', value: isNum(gpu.clockMHz) ? fmtNum(gpu.clockMHz) + ' MHz' : '—' },
      ];

      return e('div', { className: 'pm-page' }, [
        e('style', { key: 'css' }, CSS),

        e('div', { key: 'head', className: 'pm-head' }, [
          e('h1', { key: 't', className: 'pm-title' }, 'Состояние модели'),
          e(
            'span',
            { key: 'b', className: 'pm-badge' + (running ? '' : ' pm-badge-idle') },
            [e('span', { key: 'd', className: 'pm-dot' }), running ? 'Генерация' : 'Ожидание'],
          ),
          closePanel
            ? e(
                'button',
                {
                  key: 'x',
                  type: 'button',
                  className: 'pm-close',
                  'aria-label': 'Закрыть',
                  title: 'Закрыть',
                  onClick: () => {
                    try {
                      closePanel();
                    } catch {
                      /* the panel service may be gone during teardown */
                    }
                  },
                },
                '×',
              )
            : null,
        ]),

        e('div', { key: 'status', className: 'pm-status-card' }, [
          e('span', { key: 's', className: 'pm-status-text' }, running ? 'Модель генерирует ответ…' : 'Ожидание запроса'),
          e(
            'span',
            { key: 'm', className: 'pm-status-meta' },
            offline ? 'нет связи с телефометрией хоста' : data && data.ts ? 'обновлено в ' + fmtTime(data.ts) : 'нет данных',
          ),
        ]),

        e(
          'div',
          { key: 'grid', className: 'pm-grid' },
          [
            ...cards.map((card) =>
              e(MetricCard, {
                key: card.kind,
                kind: card.kind,
                label: card.label,
                value: card.value,
                sub: card.sub,
                measured: card.measured,
                spark: card.spark,
                warn: card.warn,
              }),
            ),
            e(BrandCard, { key: 'brand' }),
          ],
        ),

        e(
          'div',
          { key: 'stats', className: 'pm-stats' },
          stats.map((item, i) =>
            e('div', { key: i, className: 'pm-stat' }, [
              e('div', { key: 'l', className: 'pm-stat-label' }, item.label),
              e('div', { key: 'v', className: 'pm-stat-value' }, item.value),
            ]),
          ),
        ),

        e('div', { key: 'foot', className: 'pm-foot' }, [
          e('div', { key: 'ctx', className: 'pm-panel' }, [
            e('h2', { key: 't', className: 'pm-panel-title' }, 'Заполнение контекста'),
            e('div', { key: 'r', className: 'pm-ring-wrap' }, [
              e(
                'div',
                {
                  key: 'ring',
                  className: 'pm-ring',
                  style: {
                    background:
                      'conic-gradient(var(--dsw-alias-state-success-primary) ' +
                      (contextPct === null ? 0 : contextPct) +
                      '%, color-mix(in srgb, var(--dsw-alias-border-l1) 75%, transparent) 0)',
                  },
                },
                e('div', { className: 'pm-ring-inner' }, contextPct === null ? '—' : Math.round(contextPct) + '%'),
              ),
              e(
                'p',
                { key: 'n', className: 'pm-note' },
                contextPct === null ? 'Нет записанных данных об использовании запросов' : 'использовано ' + fmtTokens(context.used) + ' из ' + fmtTokens(context.window) + ' токенов',
              ),
            ]),
          ]),

          e('div', { key: 'req', className: 'pm-panel' }, [
            e('h2', { key: 't', className: 'pm-panel-title' }, 'Недавние запросы'),
            e('div', { key: 'w', className: 'pm-table-wrap' }, [
              e('table', { key: 'table', className: 'pm-table' }, [
                e(
                  'thead',
                  { key: 'h' },
                  e(
                    'tr',
                    null,
                    HEADERS.map((h, i) => e('th', { key: i }, h)),
                  ),
                ),
                e(
                  'tbody',
                  { key: 'b' },
                  recent.length === 0
                    ? e('tr', { className: 'pm-empty-row' }, [
                        e('td', { key: 'e', colSpan: HEADERS.length }, 'Запросов пока нет'),
                      ])
                    : recent.map((row, i) =>
                        e('tr', { key: i }, [
                          e('td', { key: 't' }, fmtTime(row.time)),
                          e('td', { key: 's' }, row.status === 'interrupted' ? 'Прервано' : 'Готово'),
                          e('td', { key: 'm' }, row.model || '—'),
                          e('td', { key: 'i' }, isNum(row.input) ? fmtTokens(row.input) : '—'),
                          e('td', { key: 'r' }, isNum(row.cacheRead) && row.cacheRead > 0 ? fmtTokens(row.cacheRead) : '—'),
                          e('td', { key: 'o' }, isNum(row.output) ? fmtTokens(row.output) : '—'),
                          e('td', { key: 'c' }, isNum(row.cacheRead) && isNum(row.input) && row.input > 0
                            ? Math.round((row.cacheRead / row.input) * 100) + '%'
                            : '—'),
                        ]),
                      ),
                ),
              ]),
            ]),
          ]),
        ]),
      ]);
    }

    // ------------------------------------------------------- crash containment
    // The page renders inside a slot whose error boundary removes the entry on a
    // crash. Keep a local boundary so a failure shows its message on the page and
    // the panel stays selectable.
    class PageBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
      }

      static getDerivedStateFromError(error) {
        return { error };
      }

      componentDidCatch(error) {
        try {
          console.error('[prirex-monitor] page crashed:', error);
        } catch {
          /* logging must never throw */
        }
      }

      render() {
        if (this.state.error) {
          return e('div', { className: 'pm-page' }, [
            e('style', { key: 'css' }, CSS),
            e(
              'div',
              { key: 'err', className: 'pm-error' },
              'Ошибка страницы монитора:\n' +
                String((this.state.error && this.state.error.stack) || this.state.error),
            ),
          ]);
        }
        return e(MonitorPage, this.props);
      }
    }

    // ------------------------------------------------------------------ entry
    return {
      inject: ['slots'],
      apply(ctx) {
        try {
          const layout = typeof ctx.get === 'function' ? ctx.get('layout') : null;
          if (layout && typeof layout.selectPanel === 'function') {
            closePanel = () => layout.selectPanel(null);
          }
        } catch {
          closePanel = null;
        }

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            { name: 'sidebar.panellist', id: 'prirex-monitor', order: 20, label: 'Монитор' },
            PanelIcon,
          ),
        );

        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: 'prirex-monitor' }, PageBoundary),
        );
      },
    };
  },
});
