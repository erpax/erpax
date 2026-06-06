/**
 * communication — conveying a message from a sender to a receiver over a [[channel]]. In erpax the
 * [[message]] IS its content-[[uuid]] (self-decoding, no payload), so a communication is the transfer
 * of a uuid: same content ⇒ same message ([[merge]]), and a tampered message has a different uuid
 * (tamper-evident by architecture). Composes [[message]] · [[send]] · [[channel]] · [[uuid]].
 *
 *   tsx src/communication/index.ts
 *
 * @standard the message-uuid (self-decoding); RFC 9562 §5.8 content-uuid
 * @see ../message -- ../send -- ../channel -- ../chat -- ../quantum/communication -- ./SKILL.md
 */
export interface Communication {
  readonly from: string
  readonly to: string
  /** the message's content-uuid (the message itself, self-decoding) */
  readonly uuid: string
}

/** Bind sender, receiver, and the message content-uuid into a communication. */
export const communicate = (from: string, to: string, contentUuid: string): Communication => ({ from, to, uuid: contentUuid })

/** Two communications carry the same message iff they share the content-uuid. */
export const sameMessage = (a: Communication, b: Communication): boolean => a.uuid === b.uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const m = communicate('alice', 'bob', '0fa7a355-0000-8000-8000-000000000000')
  console.log('communication — message = content-uuid: ' + m.from + '→' + m.to + ' ' + m.uuid.slice(0, 8) + '…')
}
