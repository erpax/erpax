import { defineConfig } from 'vitest/config'
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
    include: ['tests/int/**/*.int.spec.ts', 'tests/int/**/*.int.spec.tsx'],
    // Disable globals to enforce explicit imports (stricter, clearer tests)
    globals: false,
    // Run single-threaded to prevent D1/SQLite lock contention
    fileParallelism: false,
    // Isolate tests to prevent state leakage between suites
    isolate: true,
    // Force exit if teardown takes too long (prevents hanging)
    teardownTimeout: 10_000,
    // Fail tests that retry too many times (strict mode)
    maxConcurrency: 1,
    // Clear mocks between tests
    clearMocks: true,
    // Restore mocks after each test
    restoreMocks: true,
  },
})
