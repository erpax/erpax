/**
 * entry — the universal double-entry: ALL is accounted for, in ALL directions.
 *
 * Every value movement — whatever it is, whichever way it points, between whatever
 * entities — reduces to a BALANCED pair: debit one side, credit the other, with
 * `Σ(credit − debit) = 0`. That is why accounting is the agnostic substrate the whole
 * mesh rides on ("all based on debit/credit"):
 *   - the REVERSE is inherent — a debit IS a credit from the other vantage
 *     ([[perspective]] `viewTransferFrom`: payer gives/credits, payee takes/debits);
 *     `reverse` is the unmount/undo skill, free from the structure.
 *   - DIRECTION is a viewpoint, not a type — `toDoubleEntry` is agnostic to who the
 *     `accountable` parties are (each line points OUT at ANY entity — the polymorphic
 *     accountability that makes accounting self-sufficient; nothing points in).
 *   - MOUNTING erpax N times CONSOLIDATES — N ledgers union into one and every
 *     intercompany pair already nets to zero (ASC 810-10-45 elimination), so the
 *     accounting equation holds across mounts with no coordination ([[merge]]).
 *
 * When every flow is accounted for in all directions, the wiring is complete: there
 * is no edge the ledger does not close (`accountedFor`).
 *
 * Pure; composes services/perspective + the [[give]]/[[take]] duality + the
 * [[accounting]] balance invariant + [[balance]] conservation.
 *
 * @standard IFRS/IAS — 2026 Issued: double-entry (Σdebit = Σcredit)
 * @standard FASB ASC 810-10-45: intercompany balances eliminate to net zero on consolidation
 * @standard ISO 20022: debtor/creditor are the two signs of ONE transfer
 */
import { isConserved } from '@/perspective'

/** A value flow from any entity to any entity, any direction. */
export interface Flow {
  readonly payer: string
  readonly payee: string
  readonly amount: number
}

/** One posting: a polymorphic-accountable side of a balanced entry (`accountable` points OUT at ANY entity). */
export interface Line {
  readonly accountable: string
  readonly debit: number
  readonly credit: number
}

export interface Entry {
  readonly lines: ReadonlyArray<Line>
}

/** Turn ANY flow into a balanced double-entry: the payer credits (gives), the payee debits (takes). */
export function toDoubleEntry(flow: Flow): Entry {
  const amt = Math.abs(flow.amount)
  return {
    lines: [
      { accountable: flow.payer, debit: 0, credit: amt },
      { accountable: flow.payee, debit: amt, credit: 0 },
    ],
  }
}

/** The net of an entry: Σ(credit − debit). Balanced ⇔ 0 — the harmony invariant. */
export const net = (entry: Entry): number => entry.lines.reduce((s, l) => s + l.credit - l.debit, 0)

/** Is the entry balanced (Σdebit = Σcredit)? */
export const isBalanced = (entry: Entry): boolean => net(entry) === 0

/** The REVERSE entry — debit↔credit swapped. The reverse skill: undo is the dual of do (reverse∘reverse = id). */
export function reverse(entry: Entry): Entry {
  return { lines: entry.lines.map((l) => ({ accountable: l.accountable, debit: l.credit, credit: l.debit })) }
}

/** Consolidate N ledgers (N plugin mounts) into one book — lines union; balanced iff every part was. */
export function consolidate(entries: ReadonlyArray<Entry>): Entry {
  return { lines: entries.flatMap((e) => e.lines) }
}

/** Net balance per accountable entity across a book — each entity's debit−credit position. */
export function accountableBalances(entry: Entry): Record<string, number> {
  const bal: Record<string, number> = {}
  for (const l of entry.lines) bal[l.accountable] = (bal[l.accountable] ?? 0) + l.debit - l.credit
  return bal
}

/**
 * ALL accounted for in ALL directions ⇒ the wiring is complete: every flow is a valid,
 * conserved transfer that reduces to a balanced double-entry, and the consolidated
 * book nets to zero. A malformed flow (non-finite amount) is NOT accountable ⇒ false.
 */
export function accountedFor(flows: ReadonlyArray<Flow>): boolean {
  if (!flows.every(isConserved)) return false
  return isBalanced(consolidate(flows.map(toDoubleEntry)))
}
