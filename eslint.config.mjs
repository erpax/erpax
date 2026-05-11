import { defineConfig, globalIgnores } from 'eslint/config'
import nextTs from 'eslint-config-next/typescript'
import nextVitals from 'eslint-config-next/core-web-vitals'
import payloadEslintPlugin from '@payloadcms/eslint-plugin'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      payload: payloadEslintPlugin,
    },
    rules: {
      'payload/no-jsx-import-statements': 'warn',
      'payload/no-relative-monorepo-imports': 'warn',
      'payload/no-imports-from-exports-dir': 'warn',
      'payload/no-imports-from-self': 'warn',
      'payload/proper-payload-logger-usage': 'warn',
      'payload/no-non-retryable-assertions': 'off',
      'payload/no-flaky-assertions': 'off',
      'payload/no-wait-function': 'off',
    },
  },
  {
    files: [
      'src/collections/**/*.{ts,tsx}',
      'src/access/**/*.{ts,tsx}',
      'src/payload.config.ts',
      'src/plugins/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/endpoints/**/*.{ts,tsx}',
      'src/ecommerce/**/*.{ts,tsx}',
      'src/utilities/permissions/**/*.{ts,tsx}',
      'src/utilities/scopes/**/*.{ts,tsx}',
    ],
    rules: {
      'payload/no-jsx-import-statements': 'error',
      'payload/no-relative-monorepo-imports': 'error',
      'payload/no-imports-from-exports-dir': 'error',
      'payload/no-imports-from-self': 'error',
      'payload/proper-payload-logger-usage': 'error',
    },
  },
  {
    files: ['tests/e2e/**/*.{ts,tsx}'],
    rules: {
      'payload/no-non-retryable-assertions': 'warn',
      'payload/no-flaky-assertions': 'warn',
      'payload/no-wait-function': 'warn',
    },
  },
  {
    files: [
      'src/components/providers/**/*.{ts,tsx}',
      'src/components/Header/**/*.{ts,tsx}',
      // Data-loading effects (fetch on mount/deps; setLoading/setData is the canonical pattern).
      'src/components/admin/**/*.{ts,tsx}',
      'src/components/analytics/**/*.{ts,tsx}',
      'src/components/pages/**/*.{ts,tsx}',
      'src/components/widgets/**/*.{ts,tsx}',
      'src/components/Dashboard.{ts,tsx}',
    ],
    rules: {
      // Payload website template theme / header sync (React 19 compiler hook noise)
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Payload `migrate:create` emits `up`/`down` with `{ db, payload, req }`; only `db` is always used.
  // Do not hand-edit generated migrations for ESLint — keep CLI output conventional.
  {
    files: ['src/migrations/*_*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.claude/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/payload-types.ts',
    'src/payload-generated-schema.ts',
    // Playwright + auto-generated test artefacts — minified third-party bundles
    // shipped inside trace viewers. Never hand-authored; lint rules don't apply.
    'tests/evidence/_report/**',
    'tests/**/playwright-report/**',
    'tests/**/test-results/**',
    'playwright-report/**',
    'test-results/**',
  ]),
])

export default eslintConfig
