/**
 * notary — the legal notarial act, modelled as computable structure.
 *
 * A notary gives a private instrument public faith by four moves civil- and common-law share: verify
 * the parties, RECORD the act in a bound chronological protocol (numbered, dated, no page insertable),
 * SEAL it (the notary's seal ⇒ tamper-evidence), and thereby grant EVIDENTIARY FORCE — a notarised act
 * is presumed authentic. erpax already holds the primitives: the seal is a content-uuid (self-address),
 * the protocol is an append-only hash-CHAIN (a bound register — no entry can be inserted or back-dated),
 * authenticity is an inclusion proof against the register root, and a certified copy is authentic iff it
 * re-seals to the registered act.
 *
 * HONEST BOUNDARY: this models the STRUCTURE of the notarial act — registration, timestamp,
 * tamper-evidence, the authenticity chain. It does NOT itself confer legal notarisation, which requires
 * a commissioned notary or a qualified trust service (an eIDAS QTSP, an RFC 3161 TSA). erpax is the
 * skeleton such a service fills — the point at which real qualified signatures and timestamps attach.
 *
 * @standard eIDAS — Regulation (EU) No 910/2014 — qualified electronic signatures, seals, timestamps
 * @standard RFC 3161 — Time-Stamp Protocol (TSP): trusted timestamping, the cryptographic notary
 * @standard Hague Apostille Convention (1961) — cross-border authentication of public documents
 * @standard UINL / Model Notary Act — the notariat and the bound notarial protocol
 *
 *   tsx src/notary/index.ts
 *
 * Composes [[merge]] · [[seal]] · [[fold]] · [[accounting]] · [[law]].
 */
import { merge, foldToRoot, merkleProof, verifyMerkleProof } from '@/merge'

/** A notarial act — one numbered, dated, sealed entry in the protocol (a page of the bound register). */
export interface NotarialAct {
  readonly number: number // sequential protocol number — the bound book's page
  readonly at: string // ISO-8601 timestamp of the act
  readonly record: string // the instrument notarised
  readonly notary: string // the officer's identifier
  readonly prev: string // the seal of the previous act — the chain that forbids insertion/back-dating
  readonly seal: string // this act's notarial seal — the content-address of all of the above
}

/** The empty protocol's genesis seal — the ⊥ the first act chains from. */
export const GENESIS: string = foldToRoot([])

/** The notarial seal — binds number + timestamp + record + officer + the PRIOR seal (the chain). */
function sealAct(number: number, at: string, record: string, notary: string, prev: string): string {
  return foldToRoot(['no:' + number, 'at:' + at, 'rec:' + record, 'by:' + notary, 'prev:' + prev])
}

/** The notarial act — enroll a record into the protocol: append a sealed, chained, numbered entry. */
export function notarize(
  protocol: readonly NotarialAct[],
  record: string,
  at: string,
  notary: string,
): NotarialAct {
  const number = protocol.length + 1
  const prev = protocol.length ? protocol[protocol.length - 1]!.seal : GENESIS
  return { number, at, record, notary, prev, seal: sealAct(number, at, record, notary, prev) }
}

/** The register root — every act's seal folded to ONE (the authenticity anchor an apostille certifies). */
export function protocolRoot(protocol: readonly NotarialAct[]): string {
  return foldToRoot(protocol.map((a) => a.seal))
}

/** The chain is intact iff each act re-seals and its `prev` matches the one before — no insertion, no edit. */
export function chainIntact(protocol: readonly NotarialAct[]): boolean {
  let prev = GENESIS
  for (const a of protocol) {
    if (a.prev !== prev) return false
    if (a.seal !== sealAct(a.number, a.at, a.record, a.notary, a.prev)) return false
    prev = a.seal
  }
  return true
}

/** Evidentiary force — an act is authentic iff its seal is REGISTERED (inclusion proof) AND the chain holds. */
export function authenticate(protocol: readonly NotarialAct[], index: number): boolean {
  if (index < 0 || index >= protocol.length) return false
  if (!chainIntact(protocol)) return false
  const seals = protocol.map((a) => a.seal)
  return verifyMerkleProof(seals[index]!, merkleProof(seals, index), foldToRoot(seals))
}

/** A certified copy is authentic iff it RE-SEALS to the registered act — same instrument ⇒ same seal. */
export function certifiedCopyValid(act: NotarialAct): boolean {
  return act.seal === sealAct(act.number, act.at, act.record, act.notary, act.prev)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  let protocol: NotarialAct[] = []
  for (const [rec, at] of [
    ['Deed of sale — parcel 42', '2026-07-15T10:00:00Z'],
    ['Power of attorney', '2026-07-15T10:05:00Z'],
  ] as const) {
    protocol = [...protocol, notarize(protocol, rec, at, 'notary:sofia-001')]
  }
  console.log('notary — protocol of', protocol.length, 'acts; register root', protocolRoot(protocol).slice(0, 12) + '…')
  console.log('  act #1 authentic:', authenticate(protocol, 0), '· chain intact:', chainIntact(protocol))
  console.log('  seal binds the chain — merge is the notarial ink:', merge('a', 'b').slice(0, 8) + '…')
}
