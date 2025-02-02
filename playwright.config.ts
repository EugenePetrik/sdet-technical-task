import { config } from 'dotenv';
import { join } from 'path';
import { CONFIG } from './config/env';
import { defineConfig, devices } from '@playwright/test';

config();

export default defineConfig({
  testDir: join(process.cwd(), 'src', 'tests'),

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  maxFailures: process.env.CI ? 5 : 10,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 2 : 1,

  reporter: [
    ['list', { printSteps: false }],
    ['html', { open: 'never' }],
    [join(process.cwd(), 'src', 'utils', 'reporters', 'CustomReporterConfig.ts')],
  ],

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  use: {
    headless: !!process.env.CI,

    ignoreHTTPSErrors: true,

    actionTimeout: 15_000,

    baseURL: CONFIG.BASE_URL,

    trace: {
      mode: 'retain-on-failure',
    },

    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grep: [new RegExp('@e2e')],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: [new RegExp('@e2e')],
    },
  ],
});
