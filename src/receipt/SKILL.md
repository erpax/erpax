---
name: receipt
description: "Use when a governance decision needs a tamper-evident audit receipt — and the answer is that the receipt IS a uuid. Where a trust layer splits this across four primitives (a signed receipt, a hash-linked audit chain, a capability grant, an identity), erpax wires ALL of it through ONE content-addressed, chained, signable uuid: the leafUuid = hash(prevReceipt || content-uuid(decision) || ts) is simultaneously the receipt id, the Merkle audit-chain link, the identity, and the capability (caps are decision content). No external anchor needed — the uuid is the proof."
atomPath: receipt
coordinate: receipt · 4/weave · 6887c98b
contentUuid: "47fed68a-c9ed-5708-883f-a7a6bd05a09d"
diamondUuid: "d8890219-9466-8fe2-9c9c-f7f487c26ae7"
uuid: "6887c98b-9ca0-8899-b6f4-6dfc65c3970e"
horo: 4
bonds:
  in:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
  out:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
typography:
  partition: receipt
  bondDegree: 100
  neighbors: []
standards:
  - "NIST FIPS 180-4 SHA-256 (the chain + content hash)"
  - "NIST-FIPS-180-4"
  - RFC 8785 JSON canonicalization (the content the uuid addresses)
  - "RFC-8785"
bindings: []
neighbors:
  wikilink:
    - access
    - history
    - holographic
    - identity
    - merge
    - peace
    - proof
    - self
    - society
    - uuid
  matrix:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
  backlinks:
    - access
    - agent
    - bindings
    - blood
    - comms
    - exchange
    - history
    - holographic
    - identity
    - industry
    - log
    - mcp
    - merge
    - peace
    - proof
    - quantum
    - realtime
    - request
    - research
    - sandbox
    - sanitization
    - security
    - self
    - society
    - team
    - trading
    - uuid
    - vein
    - wave
signatures:
  computationUuid: "f80c018f-3c79-8706-979b-bcdc0e4ac8e9"
  stages:
    - stage: path
      stageUuid: "cc04b1dd-4046-8298-8ca3-851b589e3a1e"
    - stage: trinity
      stageUuid: "02fe77d6-72eb-8e78-8f0d-7ca41bfef34d"
    - stage: boundary
      stageUuid: "a4a970a3-96e3-8f78-bb6c-683d602048aa"
    - stage: links
      stageUuid: "55a3e16a-f012-8c23-a8ce-1ed45e07edb3"
    - stage: horo
      stageUuid: "b447265a-4f3f-89ae-8bf1-3bf0faa2005d"
    - stage: seal
      stageUuid: "db1f6d6a-5c6a-8d9c-8702-58a22d5ef494"
    - stage: uuid
      stageUuid: "b5dc60c6-0fb1-8238-82a2-b7ddf7570e16"
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

- RFC 8785 JSON canonicalization (the content the uuid addresses)
- NIST FIPS 180-4 SHA-256 (the chain + content hash)

## Common mistakes
- Storing the receipt and the chain link and the identity as three columns — they are ONE uuid; the leafUuid is all three (and the capability is content, so it is in there too).
- Reaching for an external anchor to "make it trustworthy" — the uuid is already self-proving (tamper-cost > universe); an anchor is an extra level, not the foundation ([[proof]]).
- Signing the decision text instead of the receipt uuid — sign the `leafUuid` (`SignedUuid`); the content-addressing already binds the decision, the signature binds the holder.
