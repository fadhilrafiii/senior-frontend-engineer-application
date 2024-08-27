import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e-testing',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* For other browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Local test */
  // webServer: {
  //   command: 'yarn dev',
  //   url: 'http://127.0.0.1:5173',
  // },
});
