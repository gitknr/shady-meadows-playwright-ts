import { defineConfig, devices } from '@playwright/test';
import * as path from 'node:path';

const authFile = path.join(__dirname, 'playwright/.auth/user.json');

const isCI = !!process.env.CI;
const ciRetries = isCI ? 2 : 0;
const ciWorkers = isCI ? 1 : undefined;

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail on CI if test.only is committed
  forbidOnly: isCI,

  // Retry only on CI
  retries: ciRetries,

  // Use a single worker on CI
  workers: ciWorkers,

  // Reporter
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com/',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    timezoneId: 'America/Chicago',

    // Force en-US so number formatting uses period decimal
    locale: 'en-US',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
  ],
});
