/**
 * reverse — a reversal is the mirror of an existing entry, never a new computation.
 *
 * @see ./SKILL.md
 */

/** One posting line. `glAccount` is opaque here: reversal never touches which account was hit. */
export interface ReversibleLine {
  readonly glAccount: string
  readonly debit?: number
  readonly credit?: number
}

export interface Reversal {
  readonly lines: readonly ReversibleLine[]
  /** The entry this mirrors. A reversal with no origin is an adjustment wearing the word. */
  readonly reversesEntryId: string
  /** The posting date of the reversal — distinct from the origin's, as SAF-T §3 requires. */
  readonly postingDate: string
}

const amount = (n: number | undefined): number => (n === undefined || n === 0 ? 0 : n)

/** Swap each side, keeping the account and the amount. Amounts are PRESERVED, never recomputed. */
export function reverseLines(lines: readonly ReversibleLine[]): ReversibleLine[] {
  return lines.map((l) => {
    const d = amount(l.debit)
    const c = amount(l.credit)
    const out: { glAccount: string; debit?: number; credit?: number } = { glAccount: l.glAccount }
    if (c !== 0) out.debit = c
    if (d !== 0) out.credit = d
    return out
  })
}

/** The reversal, with its origin and its own posting date — both required by SAF-T §3. */
export function reverseEntry(
  entryId: string,
  lines: readonly ReversibleLine[],
  postingDate: string,
): Reversal {
  return { lines: reverseLines(lines), reversesEntryId: entryId, postingDate }
}

/** Σdebit − Σcredit over a set of lines. Zero is balanced. */
export function variance(lines: readonly ReversibleLine[]): number {
  return lines.reduce((s, l) => s + amount(l.debit) - amount(l.credit), 0)
}

/** The property the operation exists for — checked by SUMMING both, not by trusting the swap. */
export function netsToZero(origin: readonly ReversibleLine[], reversal: readonly ReversibleLine[]): boolean {
  return variance([...origin, ...reversal]) === 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const origin: ReversibleLine[] = [
    { glAccount: '4000', debit: 1000 },
    { glAccount: '2100', credit: 1000 },
  ]
  const r = reverseEntry('JE-1', origin, '2026-09-06')
  console.log('origin  ', JSON.stringify(origin))
  console.log('reversal', JSON.stringify(r.lines))
  console.log('origin balanced:', variance(origin) === 0, '· pair nets to zero:', netsToZero(origin, r.lines))
}
