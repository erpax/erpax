/**
 * quantum/communication/superdense — superdense coding on the matrix: ONE shared entangled binding
 * conveys BOTH endpoints. The single binding-uuid plus the shared entanglement recovers the ordered
 * (sender, receiver) pair — the channel's capacity exceeds its surface because both peers share the
 * entanglement, so one binding carries the full ordered pair. Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]].
 *
 *   tsx src/quantum/communication/superdense/index.ts
 *
 * @standard superdense coding (Bennett–Wiesner 1992); RFC 9562 §5.8 content-uuid
 * @audit computed deterministically from the ordered merge binding; never hand-asserted
 * @see ../../../communication -- ../../../entanglement -- ../index.ts -- ./SKILL.md
 */
import { merge, toUuid } from '@/uuid/matrix'

/** Canonicalize an endpoint name into its content-uuid so the merge collides real 128-bit identities. */
const endpointUuid = (name: string): string => toUuid(Buffer.from('endpoint:' + name, 'utf8'))

/**
 * Encode the ordered (from, to) pair into ONE binding-uuid. The collision is order-dependent, so
 * the single uuid faithfully fixes the ordered pair — one link, both endpoints (superdense).
 */
export const encode = (from: string, to: string): string => merge(endpointUuid(from), endpointUuid(to))

/**
 * Decode: does the single binding carry exactly this ordered (from, to) pair? Both peers share the
 * entanglement (the merge law), so they recompute the binding and confirm it distinguishes the
 * ordered pair — the link carries more than its surface.
 */
export const carries = (from: string, to: string, binding: string): boolean => encode(from, to) === binding

if (import.meta.url === 'file://' + process.argv[1]) {
  const b = encode('alice', 'bob')
  console.log(
    'quantum/communication/superdense — one binding ' +
      b.slice(0, 8) +
      '… carries (alice,bob)=' +
      carries('alice', 'bob', b) +
      '  but not (bob,alice)=' +
      carries('bob', 'alice', b),
  )
}
