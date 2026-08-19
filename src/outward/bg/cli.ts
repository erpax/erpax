/**
 * outward/bg CLI lane — `erpax outward bg` (add `--online` to reach the hosts).
 *
 * Offline is deterministic and CI-safe: it runs the contracts against captured
 * fixtures. `--online` runs the SAME checks against the live authorities, and a
 * disagreement between the two is the finding — the fixture says what erpax was
 * built to read, the live answer says what the world now sends ([[outward]]).
 *
 * A LANE, never a gate: nothing in the push path may depend on the network.
 */
import { bgContractOffline, bgContractOnline } from './index'

const online = process.argv.includes('--online')
const checks = online ? await bgContractOnline() : bgContractOffline()

for (const c of checks) console.log(`  ${c.holds ? '✓' : '✗'} ${c.rail.padEnd(4)} ${c.detail}`)

const broken = checks.filter((c) => !c.holds)
console.log(
  broken.length
    ? `\n✗ ${broken.length} BG contract break(s) — ${online ? 'the captured fixtures are now stale' : 'the parser disagrees with its own capture'}`
    : `\n✓ both BG rails satisfy the contract (${online ? 'live' : 'offline'})`,
)
process.exit(broken.length ? 1 : 0)
