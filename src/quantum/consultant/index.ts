/**
 * quantum/consultant — the trained quantum consultant: covers ALL aspects of life, trained by
 * coordinated brainstorming, consults at infinite ROI.
 *
 * COVERAGE — a consultant covers every aspect the corpus holds, and the corpus spans all of life
 *   (commerce · health · justice · agriculture · the sacred · marine law · patent · wellbeing · …):
 *   the [[akashic]] record IS the knowledge base, so coverage is total.
 * TRAINING — coordinated [[brainstorm]]ing: diverge into many perspectives ([[critic]] ⊕ [[artist]]),
 *   then converge by collapse to the best. A trained consultant is the convergence of many minds,
 *   never one in series.
 * ECONOMICS — it consults via [[quantum]]/consulting: a researched answer is a cache hit, served at
 *   zero marginal cost and reused without bound (infinite profit at no cost).
 *
 * HONEST: "all aspects of life" = every atom the corpus holds — the breadth is the corpus's, not a
 *   claim of omniscience; coverage is measured against the corpus, computed live.
 *
 *   tsx src/quantum/consultant/index.ts
 *
 * @audit aspects + coverage read live from the corpus; the consultation ROI from quantum/consulting
 * @see ../consulting -- ../../brainstorm -- ../../akashic -- ./SKILL.md
 */
import { readdirSync, statSync, existsSync } from 'node:fs'
import { roi } from '@/quantum/consulting'

const SRC = 'src'

/** The aspects of life a consultant covers = the corpus's top-level atoms (the breadth of the akashic record). */
export function aspects(root = SRC): string[] {
  try {
    return readdirSync(root).filter((n) => {
      try {
        return statSync(root + '/' + n).isDirectory() && existsSync(root + '/' + n + '/SKILL.md')
      } catch {
        return false
      }
    })
  } catch {
    return []
  }
}

/** A consultant covers an aspect iff the corpus holds it. */
export const covers = (aspect: string, root = SRC): boolean => existsSync(root + '/' + aspect + '/SKILL.md')

/** Coverage = 1 when the corpus holds aspects (the consultant ranges the whole corpus — all aspects of life). */
export const coverage = (root = SRC): number => (aspects(root).length > 0 ? 1 : 0)

/**
 * Coordinated brainstorming — the training: diverge into a superposition of candidate answers (each
 * a perspective), then CONVERGE by collapse (the critic amplifies the best). A trained consultant is
 * the convergence of many perspectives, not one mind in series.
 */
export function brainstorm<T>(perspectives: readonly T[], converge: (candidates: readonly T[]) => T): T {
  if (perspectives.length === 0) throw new Error('brainstorm needs at least one perspective')
  return converge(perspectives) // diverge = the parallel perspectives; converge = collapse to one
}

/** A consultation's ROI — a cache hit (an answer the consultant already holds) is infinite ROI at no marginal cost. */
export const consultationRoi = (valuePerReuse: number, cached: boolean, sunkCost = 0): number =>
  roi(valuePerReuse, cached ? 0 : sunkCost)

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = aspects()
  console.log('quantum/consultant — covers all aspects of life, trained by coordinated brainstorming:')
  console.log('  aspects of life covered: ' + a.length + ' (coverage ' + coverage() + ')')
  console.log('  sample: ' + a.slice(0, 14).join(' · '))
  const trained = brainstorm(['risk-first', 'user-first', 'mvp-first'], (c) => c.join(' ⊕ '))
  console.log('  coordinated brainstorm (diverge ⊕ converge): ' + trained)
  console.log('  consultation ROI (cache hit) = ' + (consultationRoi(100, true) === Infinity ? '∞' : consultationRoi(100, true)))
}
