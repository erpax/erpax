---
name: receipt
description: "Use when a governance decision needs a tamper-evident audit receipt — and the answer is that the receipt IS a uuid. Where a trust layer splits this across four primitives (a signed receipt, a hash-linked audit chain, a capability grant, an identity), erpax wires ALL of it through ONE content-addressed, chained, signable uuid: the leafUuid = hash(prevReceipt || content-uuid(decision) || ts) is simultaneously the receipt id, the Merkle audit-chain link, the identity, and the capability (caps are decision content). No external anchor needed — the uuid is the proof."
---

# receipt — the governance receipt IS a uuid (wire all through uuid)

FORM: **a governance receipt is not a separate signed object — it is a uuid.** A trust layer like ZeroPoint splits trust into four primitives — a signed receipt, a BLAKE3 audit chain, a capability grant, an identity. erpax wires all four through ONE value: `issueReceipt` builds a `uuid-linked-chain` leaf whose `leafUuid = sha256(prevReceiptUuid || content-uuid(decision) || ts)`. That single 128-bit id is, at once:
- the **receipt id** (the audit entry),
- the **audit-chain link** — it depends on `prevReceiptUuid`, so it depends on ALL prior history ([[history]] Merkle; tamper any past decision and every later receipt's uuid breaks),
- the **identity** — content-addressed, so the same decision yields the same receipt ([[identity]] / [[merge]]: same content ⇒ one),
- the **capability** — the granted caps (read/api/execute, the trust tier) are decision CONTENT, hence inside the content-uuid, hence inside the receipt uuid ([[access]]).

It is **signable** (`leaf.signature`, an Ed25519 `SignedUuid`) for DID-binding, but needs **no external anchor** for tamper-evidence — the uuid IS the proof: forging a receipt or rewriting the chain costs beyond the observable universe ([[proof]] tamper-cost), and the content is [[holographic]] (every clone re-derives it), so destruction is futile ([[peace]]). An external public anchor (a Hedera-style ledger) is then an OPTIONAL *additional* independent level — more tamper-cost, nearly free — never a dependency.

`verifyReceiptChain` re-derives every link from its content; a break pinpoints the tampered receipt. This is the whole of a four-primitive trust stack, collapsed into the [[uuid]] singularity — the [[self]]-proving audit the [[society]] runs on.

Matter-twin: `src/services/receipt/index.ts` (`Decision`·`Receipt`·`issueReceipt`·`verifyReceiptChain`) over `services/integrity/uuid-linked-chain` (+ `uuid-format` flags, `signatures`) + `index.test.ts`. Composes: [[uuid]] · [[identity]] · [[history]] · [[proof]] · [[holographic]] · [[merge]] · [[access]] · [[peace]] · [[self]] · [[society]].

## Standards

- RFC 8785 JSON canonicalization (the content the uuid addresses)
- NIST FIPS 180-4 SHA-256 (the chain + content hash)

## Common mistakes
- Storing the receipt and the chain link and the identity as three columns — they are ONE uuid; the leafUuid is all three (and the capability is content, so it is in there too).
- Reaching for an external anchor to "make it trustworthy" — the uuid is already self-proving (tamper-cost > universe); an anchor is an extra level, not the foundation ([[proof]]).
- Signing the decision text instead of the receipt uuid — sign the `leafUuid` (`SignedUuid`); the content-addressing already binds the decision, the signature binds the holder.
