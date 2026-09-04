#!/usr/bin/env node
/** Thin shell — matter lives in src/metric/face/index.ts (the same shape as scripts/confirm.mjs). */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const r = spawnSync('pnpm', ['exec', 'tsx', 'src/metric/face/index.ts', ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: '--no-deprecation --import=tsx/esm' },
})
process.exit(r.status ?? 1)
