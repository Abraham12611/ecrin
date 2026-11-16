import { defineConfig } from '@playwright/test';

// Channel "chrome" is used because the demo stream is H.264, which bundled Chromium cannot decode.
// Start the app first: `npm run build && npm run preview`, then `npm run test:e2e`.
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  use: {
    baseURL: process.env.E2E_URL ?? 'http://127.0.0.1:4173',
    channel: 'chrome',
    viewport: { width: 1280, height: 900 },
  },
});
