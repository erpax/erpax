/**
 * legacy-shim — deprecation one-liner for old pnpm script names → erpax.
 *
 * package.json legacy entries point here; npm_lifecycle_event is the lookup key.
 */
import { spawnSync } from 'node:child_process'
import { LEGACY_ALIASES } from '../src/cli/registry'

const event = process.env.npm_lifecycle_event
if (!event) {
  console.error('legacy-shim: npm_lifecycle_event missing — invoke via pnpm <script>')
  process.exit(1)
}

const modern = LEGACY_ALIASES[event]
if (!modern) {
  console.error(`legacy-shim: no erpax mapping for "${event}" — run pnpm erpax aliases`)
  process.exit(1)
}

console.error(`Deprecated: pnpm ${event} → use pnpm ${modern}`)
const extra = process.argv.slice(2)
const cmd = extra.length ? `pnpm ${modern} ${extra.map((a) => JSON.stringify(a)).join(' ')}` : `pnpm ${modern}`
const r = spawnSync(cmd, { shell: true, stdio: 'inherit', cwd: process.cwd() })
process.exit(r.status ?? 1)
