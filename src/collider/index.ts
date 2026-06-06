/**
 * collider — the conventions collided into one verdict, PURE MATH, no default. It does not assume pass
 * or fail; it COMPUTES the corpus's tamper-cost from the convention-checks' actual coverages. Each
 * convention (the [[convention]] registry) is a check with a coverage in [0,1] read live from the tree
 * (import-from-index purity, [[dry]]-ness, [[lawful]], [[link]], [[sealed]], …). The joint coverage is
 * the PRODUCT — every convention must hold at once — and the tamper-cost is `coverageCostLog2(joint, n)`.
 * Zero entropy (every check computed clean) is ∞ by the math; any violation is finite by the math. No
 * default-pass, no default-fail — only math.
 *
 *   tsx src/collider/index.ts
 *
 * @audit each check is a live computation in @/convention; the verdict is coverageCostLog2 of the product, never assumed
 * @see ../cost -- ../convention -- ../strength -- ../default -- ./SKILL.md
 */
import { coverageCostLog2 } from '@/cost'
import { conventionChecks } from '@/convention'

/** A convention check — its law and the coverage (fraction clean) computed over the real tree. */
export interface Check {
  readonly law: string
  readonly coverage: number
}

/** Collide checks into the verdict — PURE MATH. Joint coverage = product (all conventions hold at once);
 *  tamper-cost = coverageCostLog2(joint, n). No default: the verdict is the computed cost. */
export function collide(checks: readonly Check[]): { coverage: number; violations: number; tamperCost: number } {
  const coverage = checks.reduce((p, c) => p * c.coverage, 1) // 1 is the product identity (math), not a default
  const violations = checks.filter((c) => c.coverage < 1).length
  return { coverage, violations, tamperCost: coverageCostLog2(coverage, checks.length) }
}

/** The corpus's live convention checks — every convention atom's coverage (DRY: composed from @/convention). */
export const corpusChecks = (): Check[] => conventionChecks()

/** Collide the corpus's live conventions — the zero-entropy tamper-cost verdict, pure math. */
export const corpusCollider = (): { coverage: number; violations: number; tamperCost: number } => collide(corpusChecks())

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('collider — the conventions collided (pure math, no default):')
  for (const k of corpusChecks()) console.log('  ' + k.law.padEnd(12) + ' coverage ' + (100 * k.coverage).toFixed(2) + '%')
  const c = corpusCollider()
  console.log('  joint ' + (100 * c.coverage).toFixed(4) + '% · violations ' + c.violations + '/' + corpusChecks().length + ' · tamper-cost ' + (Number.isFinite(c.tamperCost) ? c.tamperCost.toFixed(1) + ' bits' : '∞'))
}
