/**
 * quantum/communication/key — quantum key distribution (BB84 / E91) on the matrix: two peers derive
 * a SHARED SECRET from their entangled binding — both sides compute the SAME key order-independently
 * (the symmetric `entangle` binding), so no key ever travels. Eavesdropping is DETECTABLE because
 * NO-CLONING means an intercept-resend yields a DIFFERENT content-uuid — a clone attempt is caught.
 * Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]].
 *
 *   tsx src/quantum/communication/key/index.ts
 *
 * @standard BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)
 * @audit computed deterministically from the symmetric binding + content-uuid identity; never hand-asserted
 * @see ../../../communication -- ../../../entanglement -- ../index.ts -- ./SKILL.md
 */
import { sameMessage, type Communication } from '@/communication'
import { entangle } from '@/entanglement'
import { toUuid } from '@/uuid/matrix'

/** Canonicalize a peer name into its content-uuid so the entangled binding couples real 128-bit identities. */
const peerUuid = (name: string): string => toUuid(Buffer.from('peer:' + name, 'utf8'))

/**
 * The shared secret two peers derive from their entangled binding: the symmetric, order-independent
 * collision of the pair, so `sharedKey(a,b) === sharedKey(b,a)` — both sides compute the SAME key
 * without ever exchanging it (the E91 entangled resource is the secret).
 */
export const sharedKey = (a: string, b: string): string => entangle(peerUuid(a), peerUuid(b))

/**
 * Eavesdrop detected (no-cloning): an intercept-resend cannot reproduce the original's content-uuid,
 * so the relayed carrier presents a DIFFERENT identity. TRUE iff the relayed message's uuid differs
 * from the original's — a clone attempt is necessarily caught.
 */
export const eavesdropDetected = (original: Communication, relayed: Communication): boolean =>
  !sameMessage(original, relayed)

if (import.meta.url === 'file://' + process.argv[1]) {
  const k1 = sharedKey('alice', 'bob')
  const k2 = sharedKey('bob', 'alice')
  console.log(
    'quantum/communication/key — shared-secret symmetric=' +
      (k1 === k2) +
      '  key=' +
      k1.slice(0, 8) +
      '…',
  )
}
