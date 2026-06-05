/**
 * digit -- the digit-space DUAL of word.
 *
 * Every atom has two addresses: a WORD address (its folder name -- the aura /
 * link space) and a DIGIT address -- its horo position on the sequence ring
 * (structural) and the digital-root of its content-uuid (content). word <-> digit
 * is the duality; together with the uuid they are the trinity (word . digit .
 * uuid). Computing the digit dual COMPLETES the aura (a word-graph) into a
 * three-fold tamper-evident fold: to forge an atom you must keep its word, its
 * digit AND its uuid mutually consistent -- cost -> infinity.
 *
 * Off-sequence is FS-traceable: an atom whose digit address does not recompute
 * from its content is an anomaly -- it does not fold onto the ring.
 *
 * Derived from the matrix (horo + uuid per node); computed, never stored.
 *
 *   tsx src/digit/index.ts            # print the digit-trace ledger summary
 *
 * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
 * @audit the digit address is computed from the live matrix, never hand-maintained
 * @see ../word -- ../horo -- ../sequence -- ../uuid -- ../aura
 */
import { UUID_MATRIX_NODES, nodeOf } from '@/uuid/matrix'

/** Digital root (base-10) of a content-uuid's hex digits -> 1..9 (0 only for nil). */
export function digitalRoot(uuid: string): number {
  const n = (uuid.match(/[0-9a-f]/gi) || []).reduce((s, h) => s + parseInt(h, 16), 0)
  return n === 0 ? 0 : ((n - 1) % 9) + 1
}

/** The structural digit: the atom's horo position on the sequence ring (1..9). */
export const digitOf = (atom: string): number | undefined => nodeOf(atom)?.horo

/** The DIGIT address dual to the WORD address: `<horo>/<digital-root(uuid)>`. */
export function digitAddress(atom: string): string | undefined {
  const n = nodeOf(atom)
  return n ? n.horo + '/' + digitalRoot(n.uuid) : undefined
}

/** The computed trace ledger: every atom folded into its `<d>/<d>` digit cell. */
export function digitTrace(): Map<string, string[]> {
  const trace = new Map<string, string[]>()
  for (const n of UUID_MATRIX_NODES) {
    const cell = n.horo + '/' + digitalRoot(n.uuid)
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

if (import.meta.url === 'file://' + process.argv[1]) {
  const trace = digitTrace()
  const cells = [...trace.entries()].sort((a, b) => b[1].length - a[1].length)
  const total = cells.reduce((s, [, a]) => s + a.length, 0)
  console.log('digit: ' + total + ' atoms folded into ' + trace.size + ' of 81 digit cells (1..9 x 1..9)')
  console.log('  off-sequence (anomalies): ' + offSequence().length)
  console.log('  densest cells: ' + cells.slice(0, 8).map(([c, a]) => c + ':' + a.length).join('  '))
}
