import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['github'], ['blob']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  // 1. Test timeout: Time for a single test (30s default)
  timeout: 40 * 1000, 

  // 2. Expect timeout: Time for assertions (5s default)
  expect: {
    timeout: 6 * 1000,
  },

  // 3. Global timeout: Time for the entire test run (None by default)
  globalTimeout: 20 * 60 * 1000, 

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    // 4. Action timeout: For clicks, typing, etc. (None by default)
    actionTimeout: 15 * 1000,

    // 5. Navigation timeout: For page.goto(), etc. (None by default)
    navigationTimeout: 30 * 1000,

  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project - Storage state, authentication, etc.
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        // Use prepared auth state.
        // storageState: 'playwright/.auth/user.json', // <-- Don't forget to add to .gitignore or your password goes to the repo
      },
      // dependencies: ['setup'],

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
