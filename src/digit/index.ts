/**
 * digit — the digit-space DUAL of word. `tsx src/digit/index.ts` prints the trace ledger.
 *
 * @see ./SKILL.md
 * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
 * @audit the digit address is computed from the live matrix, never hand-maintained
 */
import { uuid } from '@/integrity'
import { UUID_MATRIX_NODES, nodeOf } from '@/uuid/matrix'

/** Digital root of a content-uuid's hex digits → 1..9; the integer form is `digitalRoot` in @/horo. */
export function digitalRootOfUuid(uuid: string): number {
  // Nibbles off the char codes — 6.6×, and why packing loses here, measured in [[quantum]]/hexbit.
  let n = 0
  for (let i = 0; i < uuid.length; i++) {
    const c = uuid.charCodeAt(i)
    if (c >= 48 && c <= 57) n += c - 48
    else if (c >= 97 && c <= 102) n += c - 87
    else if (c >= 65 && c <= 70) n += c - 55
  }
  return n === 0 ? 0 : ((n - 1) % 9) + 1
}

/** The structural digit: the atom's horo position on the sequence ring (1..9). */
export const digitOf = (atom: string): number | undefined => nodeOf(atom)?.horo

/** The DIGIT address dual to the WORD address: `<horo>/<digital-root(uuid)>`. */
export function digitAddress(atom: string): string | undefined {
  const n = nodeOf(atom)
  return n ? n.horo + '/' + digitalRootOfUuid(n.uuid) : undefined
}

/** The computed trace ledger: every atom folded into its `<d>/<d>` digit cell. */
export function digitTrace(): Map<string, string[]> {
  const trace = new Map<string, string[]>()
  for (const n of UUID_MATRIX_NODES) {
    const cell = n.horo + '/' + digitalRootOfUuid(n.uuid)
    const arr = trace.get(cell) ?? []
    arr.push(n.atom)
    trace.set(cell, arr)
  }
  return trace
}

/** Off-sequence atoms: horo outside 1..9 -- no valid ring position (anomalies). */
export function offSequence(): string[] {
  return UUID_MATRIX_NODES.filter((n) => !(n.horo >= 1 && n.horo <= 9)).map((n) => n.atom)
}

// The numeric-token facet: a content-addressed digit in parsed [[text]], not an atom-space dual.

export type DigitTokenKind = 'digit'

/** Content-address of one numeric prose token — uuid(jcs({ kind: 'digit', value })). */
export const digitTokenUuid = (value: string): string => uuid({ kind: 'digit' as const, value })

/** One numeric token diamond — kind, digit sequence, and its content-uuid. */
export const digitDiamond = (value: string) =>
  ({ kind: 'digit' as const, value, tokenUuid: digitTokenUuid(value) }) as const

if (import.meta.url === 'file://' + process.argv[1]) {
  const trace = digitTrace()
  const cells = [...trace.entries()].sort((a, b) => b[1].length - a[1].length)
  const total = cells.reduce((s, [, a]) => s + a.length, 0)
  console.log('digit: ' + total + ' atoms folded into ' + trace.size + ' of 81 digit cells (1..9 x 1..9)')
  console.log('  off-sequence (anomalies): ' + offSequence().length)
  console.log('  densest cells: ' + cells.slice(0, 8).map(([c, a]) => c + ':' + a.length).join('  '))
}
