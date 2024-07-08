import { defineConfig, devices } from '@playwright/test';
import { join } from 'path';
import { config } from 'dotenv';

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
  ],

  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  use: {
    headless: !!process.env.CI,

    ignoreHTTPSErrors: true,

    actionTimeout: 5_000,

    baseURL: process.env.BASE_URL || 'https://store.cpanel.net',

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
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
