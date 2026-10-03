import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import 'dotenv/config'

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 * Two project shapes:
 *   - `chromium` — default project. Trace on first retry, no video by default.
 *   - `erp-workflows-multimedia` — runs only `tests/e2e/erp-workflows/*`
 *     with full video + screenshots + traces always on so the captured
 *     artifacts can be reviewed as a UX evidence pack (see `public/evidence/`
 *     layout in `tests/helpers/evidence.ts`). The multimedia project runs
 *     serially so videos aren't interleaved with parallel test output.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'public/evidence/_report', open: 'never' }],
    ['list'],
  ],
  /* Centralised output dir so videos / traces / screenshots live under public/evidence/ */
  outputDir: 'public/evidence/test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL — local dev default; post-deploy smoke sets PLAYWRIGHT_BASE_URL. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
      testIgnore: ['**/erp-workflows/**', '**/categories/**', '**/standards/**'],
    },
    {
      // Multimedia evidence project — captures every step as video +
      // screenshot. Three folder layouts feed it:
      //   - erp-workflows/  — process walk-throughs (O2C / P2P / R2R)
      //   - categories/     — per-UI-category orchestrators (admin-data,
      //                       public-content, cross-cutting, compliance-evidence)
      //   - standards/      — per-standard UI walk-throughs grouped by family
      //                       (iso-3166-1, ifrs, compliance, audit)
      //
      // Together they form the standards × categories matrix the project
      // uses to prove backend behavior end-to-end through the UI.
      // Run with `pnpm test:e2e:matrix` (alias for --project=erp-workflows-multimedia).
      name: 'erp-workflows-multimedia',
      testMatch: [
        '**/erp-workflows/**/*.e2e.spec.ts',
        '**/categories/**/*.e2e.spec.ts',
        '**/standards/**/*.e2e.spec.ts',
      ],
      fullyParallel: false,
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        video: { mode: 'on', size: { width: 1280, height: 720 } },
        screenshot: 'on',
        trace: 'on',
        // Slow each action down so the recordings stay watchable as
        // walk-through evidence rather than a blur of automated clicks.
        actionTimeout: 15_000,
        launchOptions: { slowMo: 150 },
      },
    },
  ],
  webServer: process.env.SKIP_E2E_WEBSERVER
    ? undefined
    : {
        command: 'pnpm dev',
        // CI must start the dev server with webServer.env (e.g. PAYLOAD_DEV_PUSH). Locally, reuse
        // only when you know `pnpm dev` already matches this env.
        reuseExistingServer: !process.env.CI,
        url: 'http://localhost:3000',
        // 180s was not enough, and this job has therefore failed on EVERY pull request while main
        // stayed green — it is gated `if: github.event_name == 'pull_request'`, so a push to main
        // skips it and only a PR ever runs it. The logs show no output for the last 2m20s before
        // the timeout, and it is the FIRST COMPILE, not the boot: `next dev` reports
        // `✓ Ready in 441ms` locally and stays under a second on a cold `.wrangler` D1 too (the
        // schema push is lazy, so a fresh runner database is not the cost). What is slow is the
        // graph the first request drags in — `/admin` compiles in 33s on a warm developer machine,
        // and a 2-core runner with no cache is several times slower, before middleware is even
        // counted. 600s leaves real headroom under the job's own `timeout-minutes: 45`.
        //
        // This raises a ceiling rather than removing a cost, and the cost is worth naming: the
        // first-request graph runs `agent` → `agents/mcp/tool-defs` → every tool atom, which is the
        // 225-file tangle [[rules]]/cycle measures, showing up as build time. Cutting that edge is
        // the real fix and it is not this change.
        timeout: 600_000,
        gracefulShutdown: {
          signal: 'SIGTERM',
          timeout: 5_000,
        },
        env: {
          ...process.env,
          // THE ENVIRONMENT DECIDES, and it could not before. This read `PAYLOAD_DEV_PUSH: 'false'`
          // AFTER spreading process.env, so it overwrote whatever CI set and the lane ran against a
          // database with no tables — `D1_ERROR: no such table: header`, on the first page opened,
          // on every pull request. Its comment claimed parity with the integration lane; that lane
          // sets 'true' and pushes the schema from the live config, so the comment asserted the
          // opposite of what it did. A claim of parity with a sibling is worth checking against the
          // sibling ([[rules]]/domain, one lane over).
          //
          // Local default stays 'false': an interactive Drizzle push on a drifted dev database
          // would hang the webServer until its 180s timeout. A CI runner's D1 is fresh, so there is
          // no drift to prompt about.
          PAYLOAD_DEV_PUSH: process.env.PAYLOAD_DEV_PUSH ?? 'false',
        },
      },
})
