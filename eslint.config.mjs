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
      // dissolved out of src/components/ to top-level single-word folders
      'src/providers/**/*.{ts,tsx}',
      'src/header/**/*.{ts,tsx}',
      // Data-loading effects (fetch on mount/deps; setLoading/setData is the canonical pattern).
      'src/admin/**/*.{ts,tsx}',
      'src/analytics/**/*.{ts,tsx}',
      'src/page/**/*.{ts,tsx}',
      'src/widget/**/*.{ts,tsx}',
      'src/dashboard/**/*.{ts,tsx}',
      'src/css/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/ui/**/*.{ts,tsx}',
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
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/migrations/*_*.ts', '**/*.generated.ts', 'src/payload-types.ts'],
    rules: {
      'id-length': [
        'warn',
        {
          min: 2,
          max: 48,
          exceptions: [
            '_',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'id', 'ok', 'eb', 'fn', 'ts', 'ui', 'ms', 'db', 'cp', 'dr', 'cr',
          ],
          properties: 'never',
        },
      ],
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'LineComment[value=/\\bTODO\\b(?!\\s*\\([A-Z0-9][A-Z0-9_-]*\\))/i]',
          message: 'TODO requires ticket: TODO(TICKET-123)',
        },
        {
          selector: 'BlockComment[value=/\\bTODO\\b(?!\\s*\\([A-Z0-9][A-Z0-9_-]*\\))/i]',
          message: 'TODO requires ticket: TODO(TICKET-123)',
        },
      ],
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
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/test.ts', '**/test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.claude/**',
    '.claude.bak/**',
    '.vitepress/dist/**',
    '.vitepress/cache/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/payload-types.ts',
    'src/payload-generated-schema.ts',
    // Generated corpus caches — derived from the tree, never hand-authored (same class as the
    // payload-types/schema above). Vitepress computes from src directly; these feed the
    // seed/router/analytics at build time. Lint rules don't apply to generated output, and the
    // 70MB skill-index OOMs eslint. (Removing them entirely is a rewire-refactor, tracked separately.)
    'src/skill/router/skills.index.ts',
    'src/translations/catalogue.ts',
    'src/standards/catalogue.ts',
    '**/*.generated.ts',
    '**/translations.ts',
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
