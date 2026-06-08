/**
 * Targeted improve — wordDiamond top50 vocabulary trinity stubs (max 7 fixes).
 */
import { accountCodeOf } from '../src/accounting/index.ts'
import { wordDiamondViolations, wordDiamondFixSuggestion } from '../src/law/folder/word.ts'
import { resetImproveReceiptChain, prioritizeViolations, improveInRealtime } from '../src/monitor/violations/improve.ts'
import { jcsCanonicalize, uuid } from '../src/integrity/index.ts'
import { maxWorkTamperPolicy } from '../src/wave/policy.ts'
import { recordEfficiencyPass, formatEfficiencySummary } from '../src/apply/efficiency.ts'

const cwd = process.cwd()
const maxFixes = Number(process.argv.find((a) => a.startsWith('--max='))?.slice(6) ?? maxWorkTamperPolicy().maxFixesPerCycle)
const scannedAt = new Date().toISOString()

const audit = wordDiamondViolations(cwd)
const candidates = audit.top50.filter(
  (v) => v.kind === 'vocabulary-only' || v.kind === 'incomplete',
)

const events = candidates.map((v) => ({
  id: uuid(jcsCanonicalize({ source: 'word-incomplete-diamond', word: v.word, atomPath: v.atomPath })),
  source: 'word-incomplete-diamond',
  atomPath: v.atomPath ?? v.word,
  accountCode: accountCodeOf(v.atomPath ?? v.word),
  detail: `${v.word} — ${v.reason} · fix: ${wordDiamondFixSuggestion(v, cwd)}`,
  severity: 'warning',
  scannedAt,
}))

resetImproveReceiptChain()
const prioritized = prioritizeViolations(events)
const applied = []
for (const violation of prioritized) {
  if (applied.length >= maxFixes) break
  const result = improveInRealtime(violation, { cwd, actor: 'p0-improve-top50' })
  if (result.applied) applied.push(result)
}

console.log(`improve-top50 — ${applied.length} fixed / ${candidates.length} candidates (max ${maxFixes})`)
for (const r of applied) {
  console.log(`  ✓ [${r.action}] ${r.atomPath}`)
}

const { snapshot, ratchet } = recordEfficiencyPass('improve:watch', {
  cwd,
  violationCount: audit.uselessWords,
})
console.log(formatEfficiencySummary(snapshot, ratchet))
console.log(
  JSON.stringify({
    uselessWordsBefore: audit.uselessWords,
    completePctBefore: audit.completePct,
    fixed: applied.map((r) => r.atomPath),
  }),
)
