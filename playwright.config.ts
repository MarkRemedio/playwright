/* eslint-env node */
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// until we want to setup in prod testing use emulator
if (!process.env.CI) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: require.resolve("./global.setup"),
  // globalTeardown: require.resolve("./global.teardown"),
  testDir: "./tests",
  // timeout: 5 * 60 * 1000,
  globalTimeout: undefined,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: process.env.CI ? "blob" : "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL:
      process.env.BASE_URL || process.env.CI
        ? "https://wombat-development.web.app"
        : "http://127.0.0.1:5002",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /*  Email and password for the different roles */
    reademail: process.env.READEMAIL,
    readpassword: process.env.READPASSWORD,
    email: process.env.ADMINEMAIL,
    password: process.env.ADMINPASSWORD,
    workeremail: process.env.WORKEREMAIL,
    workerpassword: process.env.WORKERPASSWORD,
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "setup",
    //   testMatch: /global\.setup\.ts/,
    // },
    {
      name: "e2e chromium",
      // dependencies: ["setup"],
      testIgnore: ["**/*.setup.ts"],
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
      },
    },
    // {
    //   name: "e2e firefox",
    //   // dependencies: ["setup"],
    //   testIgnore: ["**/*.setup.ts"],
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     headless: true,
    //   },
    // },
    // {
    //   name: "e2e safari",
    //   // dependencies: ["setup"],
    //   testIgnore: ["**/*.setup.ts"],
    //   use: {
    //     ...devices["Desktop Safari"],
    //     headless: true,
    //   },
    // },

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
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
