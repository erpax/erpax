/**
 * outward/eu CLI lane — `erpax outward eu` (and `--write` to record).
 *
 * A LANE, never a gate: it reaches the public network, so nothing in the push path
 * may depend on it. Read-only, unauthenticated, no credential and no tenant data
 * leaves — four GETs to public EU endpoints, and only the ADDRESSES are stored.
 *
 * Exit code is the verdict on the WORLD, not on the network: non-zero only when an
 * answer MOVED. An unreachable authority exits 0 — someone else's server being down
 * is not erpax's failure, and a lane that reddens for it gets ignored ([[outward]]).
 */
import { checkEu, writeBook, RECEIPTS_REL } from './index'
import { contractOnline } from './contract'

const write = process.argv.includes('--write')

// `--contract` runs the SAME checks the release gate runs offline, against the LIVE
// hosts. A disagreement between the two is the finding: the fixture says what erpax
// was built for, the live answer says what the world now sends.
if (process.argv.includes('--contract')) {
  const checks = await contractOnline()
  for (const c of checks) console.log(`  ${c.holds ? '✓' : '✗'} ${c.rail.padEnd(10)} ${c.detail}`)
  const broken = checks.filter((c) => !c.holds)
  console.log(broken.length ? `\n✗ ${broken.length} contract break(s) — the offline fixtures are now stale` : '\n✓ live responses satisfy the same contract the gate checks offline')
  process.exit(broken.length ? 1 : 0)
}

const { verdict, book, prior } = await checkEu()

console.log(verdict.summary)
for (const r of verdict.rows) {
  const mark = { fresh: '+', unchanged: '·', moved: '!', unreachable: '?' }[r.state]
  const was = r.state === 'moved' ? ` (was ${prior[r.name]?.slice(0, 8)})` : ''
  console.log(`  ${mark} ${r.name.padEnd(10)} ${r.host.padEnd(28)} ${r.address.slice(0, 8) || '—'} ${r.state}${was}${r.note ? ` — ${r.note}` : ''}`)
}

if (write) {
  writeBook(book)
  console.log(`\n✓ wrote ${RECEIPTS_REL} — ${Object.keys(book).length} receipt(s)`)
} else if (verdict.rows.some((r) => r.state === 'fresh' || r.state === 'moved')) {
  console.log(`\n(dry-run) — \`erpax outward eu --write\` to record these addresses.`)
}

// Only a MOVED answer is news; unreachable is not a failure.
process.exit(verdict.holds ? 0 : 1)
