import { computedBaseline } from '@/law/folder'
import { liveViolationCounts } from '@/law/folder/live-counts'

/**
 * rules/slack — a ceiling above its live value is an under-claim, and under-claims are the
 * involution of over-claims.
 *
 * @see ./SKILL.md
 */

export interface AxisSlack {
  readonly axis: string
  readonly live: number
  readonly ceiling: number
  /** ceiling − live. Positive means the gate permits worse than what is true. */
  readonly slack: number
}

export interface ClaimBalance {
  /** live > ceiling — the corpus is worse than it claims. The familiar failure. */
  readonly over: readonly AxisSlack[]
  /** ceiling > live — the corpus is BETTER than it claims, and may decay back unwatched. */
  readonly under: readonly AxisSlack[]
  /** ceiling === live — the claim is exact. */
  readonly exact: number
}

/**
 * Every ratcheted axis, split by the direction its claim errs in.
 *
 * An axis that cannot be measured or has no committed ceiling is omitted rather than guessed at:
 * "could not ask" is not "in balance".
 */
export function claimBalance(cwd: string = process.cwd()): ClaimBalance {
  const live = liveViolationCounts(cwd) as unknown as Record<string, number>
  const over: AxisSlack[] = []
  const under: AxisSlack[] = []
  let exact = 0
  for (const axis of Object.keys(live)) {
    const l = Number(live[axis])
    if (!Number.isFinite(l)) continue
    let ceiling: number
    try {
      ceiling = computedBaseline(axis as never, cwd)
    } catch {
      continue
    }
    const row = { axis, live: l, ceiling, slack: ceiling - l }
    if (l > ceiling) over.push(row)
    else if (ceiling > l) under.push(row)
    else exact++
  }
  return {
    over: over.sort((a, b) => a.slack - b.slack),
    under: under.sort((a, b) => b.slack - a.slack),
    exact,
  }
}

/** Total unheld headroom across every axis — the corpus's aggregate under-claim. */
export const totalSlack = (b: ClaimBalance): number => b.under.reduce((n, a) => n + a.slack, 0)

/** Fails closed on an under-claim, exactly as the corpus fails closed on an over-claim. @see ./SKILL.md */
export function assertNoSlack(cwd: string = process.cwd(), tolerance = 0): void {
  const b = claimBalance(cwd)
  const open = b.under.filter((a) => a.slack > tolerance)
  if (open.length === 0) return
  throw new Error(
    `✖ rules/slack — ${open.length} axis/axes claim worse than the truth (total ${totalSlack(b)}):\n` +
      open.map((a) => `  ${a.axis.padEnd(26)} live ${a.live} · ceiling ${a.ceiling} · ${a.slack} unheld`).join('\n') +
      '\n  close it: tsx src/law/folder/emit-ratchet.ts (down-only)',
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const b = claimBalance()
  console.log(`rules/slack — ${b.over.length} over · ${b.under.length} under · ${b.exact} exact\n`)
  for (const a of b.over) console.log(`  OVER   ${a.axis.padEnd(26)} live ${a.live} > ceiling ${a.ceiling}`)
  for (const a of b.under) console.log(`  UNDER  ${a.axis.padEnd(26)} live ${a.live} < ceiling ${a.ceiling} · ${a.slack} unheld`)
  console.log(`\ntotal unheld headroom: ${totalSlack(b)}`)
}
