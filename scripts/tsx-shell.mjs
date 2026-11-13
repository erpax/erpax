/**
 * The one way this repo spawns a tsx entry from a `.mjs` shell.
 *
 * Three shells (confirm, check-skill-frontmatter, emit-metrics) each wrote the same spawn, and each
 * went through `pnpm exec`. Measured 2026-09-07: `pnpm exec tsx -e ''` is 1,559ms against 410ms for
 * the binary directly — pnpm resolves the workspace, reads the lockfile and re-execs, ~1.15s of
 * pure layer. check-skill-frontmatter was 5,159ms and is 1,384ms without it.
 *
 * confirm.mjs is the sharper case: it is the PostToolUse hook, so that layer was paid on EVERY
 * edit, not once per push.
 *
 * `pnpm exec` remains the fallback, for a checkout where node_modules/.bin is not populated the
 * way this one is — the shell must still work, just not by default.
 *
 * @standard ISO/IEC 25010:2023 §5.6 maintainability — one truth, one address
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

/** Run a tsx entry relative to the repo root, inheriting stdio, and exit with its status. */
export function runTsx(entry, args = process.argv.slice(2)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  const env = { ...process.env, NODE_OPTIONS: '--no-deprecation --import=tsx/esm' }
  const local = join(root, 'node_modules', '.bin', 'tsx')
  const r = existsSync(local)
    ? spawnSync(local, [entry, ...args], { cwd: root, stdio: 'inherit', env })
    : spawnSync('pnpm', ['exec', 'tsx', entry, ...args], { cwd: root, stdio: 'inherit', env })
  process.exit(r.status ?? 1)
}
