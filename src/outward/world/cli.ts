/**
 * outward/world CLI lane — `erpax outward world` (add `--online` for the live hosts).
 *
 * A LANE, never a gate: nothing in the push path may depend on the network. The
 * offline half is what the release gate runs (via test.ts); this exists so a human
 * can ask whether the world still agrees ([[outward]]).
 */
import { worldContractOffline, worldContractOnline } from './index'

const online = process.argv.includes('--online')
const checks = online ? await worldContractOnline() : worldContractOffline()

for (const c of checks) console.log(`  ${c.holds ? '✓' : '✗'} ${c.rail.padEnd(12)} ${c.detail}`)

const broken = checks.filter((c) => !c.holds)
console.log(
  broken.length
    ? `\n✗ ${broken.length} contract break(s) — ${online ? 'the captures are now stale' : 'the parser disagrees with its own capture'}`
    : `\n✓ all ${checks.length} world rails satisfy the contract (${online ? 'live' : 'offline'})`,
)
process.exit(broken.length ? 1 : 0)
