/**
 * rules/hold — a suspicion verdict may not be consumed without consulting the hold. See SKILL.md.
 *
 * @standard EU 2015/849 Art. 33(1) — refrain from carrying out a SUSPECTED transaction
 * @compliance FATF Recommendation 20 — suspicious transaction reporting
 */
import { corpusFiles, textOf } from '@/syntax/cache'
import { boundNames } from '@/syntax'

export const atomPath = 'rules/hold' as const

/**
 * The verdict, and the obligation that travels with it. DECLARED — the directive pairs them, not a
 * theorem. PRIVATE: these are this corpus's identifiers, and no statute fixes them, so citing one
 * to make [[matrix]] green would be the laundering `lawful-statutory` exists to refuse.
 */
const VERDICT = 'reportOwed'
const OBLIGATION = 'holdBeforeExecuting'

/** The atom that DEFINES the pair, and the proofs that exercise it, are not consumers. */
const defines = (rel: string): boolean => rel === 'aml/index.ts' || /(^|\/)test\.tsx?$/.test(rel)

export interface HoldViolation {
  readonly file: string
  readonly reason: string
}

/**
 * A file that reads the verdict and never names the obligation — PARSED, so a mention inside a
 * comment or a string is not a use.
 */
export function unheldVerdicts(cwd: string = process.cwd()): readonly HoldViolation[] {
  const out: HoldViolation[] = []
  for (const file of corpusFiles(cwd, 'source')) {
    const rel = file.slice(file.indexOf('/src/') + 5)
    if (defines(rel)) continue
    const text = textOf(file)
    if (!text.includes(VERDICT)) continue
    const names = new Set(boundNames(file, text))
    if (!names.has(VERDICT)) continue
    if (names.has(OBLIGATION)) continue
    out.push({
      file: rel,
      reason: `reads ${VERDICT} and never consults ${OBLIGATION} — a suspicion computed and executed anyway is the failure Art. 33(1) names`,
    })
  }
  return out
}

/** Fail closed. Zero is a THEOREM: there is no acceptable number of unheld suspicions. */
export function assertHoldConsulted(cwd: string = process.cwd()): void {
  const v = unheldVerdicts(cwd)
  if (v.length === 0) return
  throw new Error(
    `✖ EU 2015/849 Art. 33(1): ${v.length} file(s) read the suspicion verdict without the hold:\n` +
      v.map((x) => `  ${x.file} — ${x.reason}`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = unheldVerdicts()
  console.log(`rules/hold — ${v.length} unheld suspicion verdict(s)`)
  for (const x of v) console.log(`  ${x.file}`)
  if (v.length > 0) process.exitCode = 1
}
