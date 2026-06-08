#!/usr/bin/env node
/** Thin shell — matter lives in src/plugins/emit.ts */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const r = spawnSync(
  'pnpm',
  ['exec', 'tsx', 'src/plugins/emit.ts', ...process.argv.slice(2)],
  { cwd: root, stdio: 'inherit', env: { ...process.env, NODE_OPTIONS: '--no-deprecation --import=tsx/esm' } },
)
process.exit(r.status ?? 1)
