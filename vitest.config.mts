import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

/**
 * Vitest Configuration - Strict Payload Compliance
 *
 * Configuration follows Payload CMS testing best practices:
 * - Single-threaded execution for SQLite/D1 consistency
 * - Proper test isolation with globals: false
 * - Explicit teardown timeout to prevent hanging
 * - Node environment for backend integration tests
 *
 * @see https://payloadcms.com/docs/test/overview
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'payload-integration',
    environment: 'node',
    environmentMatchGlobs: [['**/tests/int/components/**', 'jsdom']],
    setupFiles: ['./vitest.setup.ts'],
    include: [
      // CCCCC-prep (2026-05-11): every spec is now co-located next to
      // its source file as `<Name>.test.ts`. The legacy `tests/int/**`
      // + `tests/standards/**` globs have been retired — those trees
      // are empty (moved to tests/_attic/ for the local deletion pass).
      // Playwright `*.e2e.spec.ts` lives in tests/e2e/ and runs through
      // playwright.config, NOT vitest.
      // The architecture's test slot: one `test.ts` per folder (a bare `test.ts`
      // is NOT matched by `*.test.ts`, so it needs its own glob). The `*.test.ts`
      // globs stay for folders not yet merged-by-extension to `test.ts`.
      'src/**/test.ts',
      'src/**/test.tsx',
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
    ],
    // The `src/skills` self-symlink (the .claude→src merge: src/skills → .) aliases
    // the WHOLE tree, so every test is discovered twice — once via src/skills/… —
    // and the duplicate payload-integration run collides on the shared D1 store
    // (e.g. "books a balanced JE" finds the prior run's JE → fails). Exclude the
    // alias so each test runs exactly once. Keep vitest's own defaults.
    exclude: [...configDefaults.exclude, 'src/skills/**'],
    // Disable globals to enforce explicit imports (stricter, clearer tests)
    globals: false,
    // Run single-threaded to prevent D1/SQLite lock contention
    fileParallelism: false,
    // Isolate tests to prevent state leakage between suites
    isolate: true,
    // Force exit if teardown takes too long (prevents hanging)
    teardownTimeout: 10_000,
    // Payload-integration tests boot a real Payload + D1 store per file (~35s cold);
    // the 5s/10s defaults time out before boot completes. Raise both so a genuine
    // integration test has room to run (a real hang still fails, just later).
    testTimeout: 60_000,
    hookTimeout: 60_000,
    // Fail tests that retry too many times (strict mode)
    maxConcurrency: 1,
    // Clear mocks between tests
    clearMocks: true,
    // Restore mocks after each test
    restoreMocks: true,
  },
})
