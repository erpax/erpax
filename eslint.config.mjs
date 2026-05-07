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
    files: ['tests/e2e/**/*.{ts,tsx}'],
    rules: {
      'payload/no-non-retryable-assertions': 'warn',
      'payload/no-flaky-assertions': 'warn',
      'payload/no-wait-function': 'warn',
    },
  },
  {
    files: ['src/components/providers/**/*.{ts,tsx}', 'src/components/Header/**/*.{ts,tsx}'],
    rules: {
      // Payload website template theme / header sync (React 19 compiler hook noise)
      'react-hooks/set-state-in-effect': 'off',
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
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/payload-types.ts',
    'src/payload-generated-schema.ts',
  ]),
])

export default eslintConfig
