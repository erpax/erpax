/**
 * diamond CLI lane — moved out of the barrel so importing the diamond API
 * carries no top-level execution (the main-block was a side effect that pinned
 * the whole diamond→readme subtree into every bundle; see uuid/matrix/gate.ts).
 *
 *   tsx src/diamond/gate.ts [atomPath]        — derive + verify one diamond
 *   tsx src/diamond/gate.ts --audit-files     — diamond-files audit (fail-closed)
 */
import { computeDiamond, verifyDiamond } from './index'
import { diamondFileViolations, diamondFilesGuardian } from './files'
import { ALLOWED_DIAMOND_FILES } from './membership'
import { diamondUuid } from './projection'

if (process.argv.includes('--audit-files')) {
  const violations = diamondFileViolations()
  const verdict = diamondFilesGuardian(violations.length)
  const byReason = new Map<string, number>()
  for (const v of violations) byReason.set(v.reason, (byReason.get(v.reason) ?? 0) + 1)
  console.log(`diamond/files — ${violations.length} violation(s) across atom folders`)
  console.log(
    '  allowed vocabulary:',
    [...ALLOWED_DIAMOND_FILES.vocabulary].sort().join(' · '),
  )
  console.log('  allowed code:', [...ALLOWED_DIAMOND_FILES.code].sort().join(' · '))
  console.log(
    '  by reason:',
    [...byReason.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `${k}:${n}`)
      .join(' '),
  )
  for (const v of violations.slice(0, 20)) {
    console.log(`   ${v.atomPath} → ${v.file} (${v.reason})`)
  }
  if (violations.length > 20) console.log(`   … ${violations.length - 20} more`)
  console.log((verdict.sealed ? '✓ ' : '✗ ') + verdict.guardians[0]!.reason)
  process.exit(verdict.sealed ? 0 : 1)
}
const target = process.argv[2] ?? 'diamond'
const { model, stages, computationUuid: compUuid } = computeDiamond({ kind: 'path', path: target })
const v = verifyDiamond(model)
console.log(`diamond — ${model.kind} @ ${model.atomPath}`)
console.log(`  uuid: ${diamondUuid(model)}`)
console.log(`  computation: ${compUuid} (${stages.length} stages)`)
console.log(`  trinity: ${model.trinity.form}·${model.trinity.code}·${model.trinity.proof}`)
console.log(`  sealed: ${v.sealed}${v.impurities.length ? ' — ' + v.impurities.join('; ') : ''}`)
