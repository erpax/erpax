/**
 * proof — realtime double-entry accounting of what the corpus CLAIMS against what it PROVES.
 *
 * Gravity pulls toward realtime accounting of all: the fold concentrates matter ([[gravity]]: DRY is mass),
 * and every mass must be accounted, in both directions, computed at read never stored ([[accounting]]). This
 * atom accounts the corpus's own EPISTEMIC state as a ledger:
 *
 *   a CLAIM (`@invariant`/`@standard`/`@compliance`/`@audit`) is a DEBIT — an obligation the corpus takes on.
 *   a PROOF (a `test.ts` beside the claim) is the CREDIT — the settlement of that obligation.
 *
 * The ledger BALANCES iff every claim is credited by a proof. The residual — debits not matched by a credit —
 * IS the unproven surface ([[rules]]/refutable · [[rules]]/audience · [[coverage]] measure the same gap; this
 * is its double-entry view). Zero residual is the gravitational floor: every claim settled, coverage at 100%,
 * the fold at its densest — which is [[law]]'s `zero entropy ⇒ infinite tamper-cost` seen from the ledger.
 *
 * REALTIME: computed on read from the tree, never stored. A claim added without a proof unbalances the ledger
 * the instant it lands — the gravity is felt at the write, not in a nightly reconciliation.
 *
 * HONEST BOUNDARY — a credit proves a test EXISTS, never that it is CORRECT (a test can assert a lie —
 * [[rules]]/refutable's boundary, inherited). A balanced ledger is the FLOOR of trust: nothing unsettled, not
 * everything-settled-true. Double-entry catches the missing entry; it does not audit the entry's truth.
 *
 * @standard IAS 1 — a balanced set of accounts; every debit has its credit
 * @standard ISO-19011:2018 §6.4 — evidence: a claim is settled by a traceable proof
 *
 * Composes [[accounting]] · [[gravity]] · [[syntax]] · [[rules]]/refutable · [[law]].
 */
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { commentsOf } from '@/syntax'

/** Canonical atom path. */
export const atomPath = 'proof' as const

const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$|catalogue\.ts$/
const IS_TEST = /(?:^|[/.])test\.tsx?$/
const CLAIM = /@(?:invariant|standard|compliance|audit)\b/g
const proofBeside = (file: string): boolean =>
  ['test.ts', 'test.tsx', 'index.test.ts'].some((n) => existsSync(join(dirname(file), n)))

/** The corpus's epistemic ledger: claims taken on (debits) against proofs settled (credits). */
export interface ProofLedger {
  /** Total claims made — the debits, the obligations. */
  readonly claims: number
  /** Claims with a proof beside them — the credits, the settlements. */
  readonly proven: number
  /** Debits with no credit — the unproven surface. */
  readonly residual: number
  /** proven / claims — 1 is the gravitational floor: every claim settled. */
  readonly balance: number
  /** The unsettled files, so the residual is traceable, not just counted. */
  readonly unsettled: readonly string[]
}

/**
 * Account the whole corpus in realtime — read the tree, post each claim and its proof, return the balance.
 *
 * @invariant residual === claims − proven — double-entry: every unmatched debit is a residual, exactly
 * @invariant balance === 1 ⇔ residual === 0 — the ledger balances iff every claim is credited
 */
export function proofLedger(cwd: string = process.cwd()): ProofLedger {
  let claims = 0
  let proven = 0
  const unsettled: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (!/\.tsx?$/.test(e.name) || GENERATED.test(p) || IS_TEST.test(p)) continue
      let text: string
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      const n = (commentsOf(p, text).join('\n').match(CLAIM) ?? []).length
      if (n === 0) continue
      claims += n
      if (proofBeside(p)) proven += n
      else unsettled.push(relative(cwd, p).replace(/\\/g, '/'))
    }
  }
  walk(join(cwd, 'src'))
  const residual = claims - proven
  return { claims, proven, residual, balance: claims === 0 ? 1 : proven / claims, unsettled }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const l = proofLedger()
  console.log('proof — the corpus accounts its claims against its proofs (realtime):\n')
  console.log(`  DEBITS  (claims taken on)      ${l.claims}`)
  console.log(`  CREDITS (proofs settled)       ${l.proven}`)
  console.log(`  RESIDUAL (unproven surface)    ${l.residual}`)
  console.log(`  BALANCE                        ${(100 * l.balance).toFixed(1)}%  ${l.residual === 0 ? '· settled — the gravitational floor' : '· gravity pulls toward 100%'}`)
}

/** @index-cross.foldback child=accounting/proof parent=accounting — this cross folds back into its parent. */
