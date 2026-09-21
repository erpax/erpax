/**
 * aml — whether a REPORT IS OWED. Never whether money was laundered. That distinction is the whole atom. See SKILL.md.
 *
 * @standard EU 2015/849 Art. 33 — report to the FIU promptly, before executing where possible
 * @standard FATF Recommendation 20 — suspicious transaction reporting
 * @standard EU 2015/847 — information accompanying transfers of funds
 */
import { exactAbs } from '@/algebra'

export const atomPath = 'aml' as const

/** What the movement obliges: a suspicion report, a threshold declaration, or nothing. */
export type ReportKind = 'suspicious' | 'threshold' | 'none'

/** One movement of value, as the ledger recorded it. */
export interface Movement {
  /** Amount in euro; negative is treated as its magnitude (direction is not a risk signal here). */
  readonly amount: number
  /** Epoch milliseconds — the window test is over real time, never over row order. */
  readonly at: number
  /** The counterparty appears on a sanctions list someone else maintains. */
  readonly sanctioned?: boolean
  /** An analyst has recorded a suspicion. A human finding is an input, never an output. */
  readonly flagged?: boolean
}

/** How close below a threshold counts as deliberate. See SKILL.md. */
export const STRUCTURING_BAND = 0.9

/** Within the band below a threshold, and not over it. */
export function justBelow(value: number, threshold: number): boolean {
  const a = exactAbs(value)
  return a < threshold && a >= threshold * STRUCTURING_BAND
}

/** 24 hours — the window structuring is measured over unless a caller states another. */
export const STRUCTURING_WINDOW_MS = 24 * 60 * 60 * 1000

/** Two or more movements sitting just below the threshold inside one window, which together clear it. See SKILL.md. */
export function structuring(
  movements: readonly Movement[],
  threshold: number,
  windowMs: number = STRUCTURING_WINDOW_MS,
): boolean {
  const near = movements.filter((m) => justBelow(m.amount, threshold)).sort((a, b) => a.at - b.at)
  if (near.length < 2) return false
  for (let i = 0; i < near.length; i++) {
    let sum = 0
    for (let j = i; j < near.length; j++) {
      const first = near[i]
      const current = near[j]
      if (first === undefined || current === undefined) continue
      if (current.at - first.at > windowMs) break
      sum += exactAbs(current.amount)
      if (j > i && sum >= threshold) return true
    }
  }
  return false
}

/** The facts a reporting decision is taken on. */
export interface ReportFacts {
  readonly movements: readonly Movement[]
  /** The declaration threshold in euro that applies to this institution and product. */
  readonly threshold: number
  readonly windowMs?: number
}

/** What is owed. ORDER IS THE LAW: a sanctions hit or a recorded suspicion obliges a SUSPICION report even when the amount is trivial (Art. See SKILL.md. */
export function reportOwed(facts: ReportFacts): ReportKind {
  const { movements, threshold } = facts
  if (movements.some((m) => m.sanctioned === true || m.flagged === true)) return 'suspicious'
  if (structuring(movements, threshold, facts.windowMs)) return 'suspicious'
  if (movements.some((m) => exactAbs(m.amount) >= threshold)) return 'threshold'
  return 'none'
}

/**
 * A suspicion report is owed PROMPTLY and, where possible, before the transaction is executed.
 *
 * @standard EU 2015/849 Art. 33(1) — reporting obligation, no permitted delay
 */
export const SUSPICION_DELAY_MS = 0

/** A suspicion report may not wait for a batch. True when the movement must be held. */
export function holdBeforeExecuting(kind: ReportKind): boolean {
  return kind === 'suspicious'
}

/** The whole union, so the check below is a theorem. PRIVATE — no statute fixes it. See SKILL.md. */
const REPORT_KINDS: readonly ReportKind[] = ['suspicious', 'threshold', 'none']

/**
 * Art. 33 as a fail-closed check: SUSPICION holds the movement, and the delay is zero. NOT "every
 * report holds" — a threshold declaration obliges a REPORT, never a stop. See SKILL.md.
 *
 * @standard EU 2015/849 Art. 33(1) — report promptly; refrain from executing a SUSPECTED transaction
 */
export function assertSuspicionHolds(): void {
  if (SUSPICION_DELAY_MS !== 0) {
    throw new Error(
      `✖ EU 2015/849 Art. 33: a suspicion report may not wait — SUSPICION_DELAY_MS is ${SUSPICION_DELAY_MS}.`,
    )
  }
  const leaks = REPORT_KINDS.filter((kind) => kind === 'suspicious' && !holdBeforeExecuting(kind))
  if (leaks.length > 0) {
    throw new Error(
      '✖ EU 2015/849 Art. 33(1): a SUSPICIOUS verdict does not hold the movement — ' +
        'a report filed after a suspected transaction executes is the failure the article names.',
    )
  }
}
