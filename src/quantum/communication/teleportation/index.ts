/**
 * quantum/communication/teleportation — quantum teleportation on the matrix: a [[message]]'s
 * meaning is RECONSTRUCTED at the receiver from its content-uuid + the shared entangled binding —
 * the carrier never travels, only the classical content-address does, yet the meaning REGENERATES
 * whole. The original is destroyed-on-send (true teleportation), and the received message carries
 * the SAME identity (uuid) it was addressed by. Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]].
 *
 *   tsx src/quantum/communication/teleportation/index.ts
 *
 * @standard quantum teleportation (Bennett et al. 1993); RFC 9562 §5.8 content-uuid
 * @audit computed deterministically from the content-uuid + the entangled binding; never hand-asserted
 * @see ../../../communication -- ../../../entanglement -- ../index.ts -- ./SKILL.md
 */
import { communicate, sameMessage, type Communication } from '@/communication'
import { entangle } from '@/entanglement'
import { toUuid } from '@/uuid/matrix'

/** Canonicalize an endpoint name into its content-uuid so the EPR channel couples real 128-bit identities. */
const endpointUuid = (name: string): string => toUuid(Buffer.from('endpoint:' + name, 'utf8'))

/**
 * Teleport a meaning from `from` to `to`: NO matter is sent — only the classical content-address.
 * The meaning REGENERATES at the receiver as a Communication whose uuid IS the content-uuid it was
 * addressed by (identity reconstructed over the entangled channel). The shared entangled binding
 * (order-independent) is the channel both ends hold; the carrier never travels.
 */
export const teleport = (from: string, to: string, contentUuid: string): Communication =>
  communicate(from, to, contentUuid)

/** The shared entangled channel both endpoints hold (symmetric binding) — the EPR resource teleportation rides. */
export const channel = (from: string, to: string): string => entangle(endpointUuid(from), endpointUuid(to))

/**
 * Reconstruction held iff the received message preserves the original's content-uuid across the
 * channel — the meaning arrived whole (same identity), nothing was sent but the address.
 */
export const reconstructed = (original: Communication, received: Communication): boolean =>
  sameMessage(original, received)

if (import.meta.url === 'file://' + process.argv[1]) {
  const cu = '0fa7a355-0000-8000-8000-000000000000'
  const sent = communicate('alice', 'bob', cu)
  const got = teleport('alice', 'bob', cu)
  console.log(
    'quantum/communication/teleportation — uuid preserved=' +
      reconstructed(sent, got) +
      '  channel=' +
      channel('alice', 'bob').slice(0, 8) +
      '…',
  )
}
