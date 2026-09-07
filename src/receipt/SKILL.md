---
name: receipt
description: "Use when a governance decision needs a tamper-evident audit receipt — and the answer is that the receipt IS a uuid. Where a trust layer splits this across four primitives (a signed receipt, a hash-linked audit chain, a capability grant, an identity), erpax wires ALL of it through ONE content-addressed, chained, signable uuid: the leafUuid = hash(prevReceipt || content-uuid(decision) || ts) is simultaneously the receipt id, the Merkle audit-chain link, the identity, and the capability (caps are decision content). No external anchor needed — the uuid is the proof."
atomPath: receipt
coordinate: "receipt · 5/round · fb18e688"
contentUuid: "4b1bb2cb-a017-58e4-9991-17e969bac1d3"
diamondUuid: "72156de1-f37c-8477-9e0b-0ab5243fa7cb"
uuid: "fb18e688-a0da-89b1-b264-e620dc74d9ff"
horo: 5
typography:
  partition: receipt
  bondDegree: 118
standards:
  - "NIST FIPS 180-4 SHA-256 (the chain + content hash)"
  - "NIST FIPS 180-4 SHA-256 (the chain + content hash)`"
  - RFC 8785 JSON canonicalization (the content the uuid addresses)
  - "RFC 8785 JSON canonicalization (the content the uuid addresses)`"
  - "RFC-8785"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ff74777a-4bcd-8b06-bd64-e1055d815e32"
  stages:
    - stage: path
      stageUuid: "cc04b1dd-4046-8298-8ca3-851b589e3a1e"
    - stage: trinity
      stageUuid: "02fe77d6-72eb-8e78-8f0d-7ca41bfef34d"
    - stage: boundary
      stageUuid: "1d716547-fa33-8859-b900-29513b2ce85f"
    - stage: links
      stageUuid: "55a3e16a-f012-8c23-a8ce-1ed45e07edb3"
    - stage: horo
      stageUuid: "43c77a1d-a507-88ce-833d-b90ad0e4bcd3"
    - stage: seal
      stageUuid: "e574e02d-5a5b-820d-9947-9a350d7b26bb"
    - stage: uuid
      stageUuid: "3953b5dd-4ed1-8394-90ec-496db7674489"
version: 2
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 8785 JSON canonicalization (the content the uuid addresses)`
- `@standard NIST FIPS 180-4 SHA-256 (the chain + content hash)`


- RFC 8785 JSON canonicalization (the content the uuid addresses)
- NIST FIPS 180-4 SHA-256 (the chain + content hash)

## Common mistakes
- Storing the receipt and the chain link and the identity as three columns — they are ONE uuid; the leafUuid is all three (and the capability is content, so it is in there too).
- Reaching for an external anchor to "make it trustworthy" — the uuid is already self-proving (tamper-cost > universe); an anchor is an extra level, not the foundation ([[proof]]).
- Signing the decision text instead of the receipt uuid — sign the `leafUuid` (`SignedUuid`); the content-addressing already binds the decision, the signature binds the holder.
