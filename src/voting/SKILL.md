---
name: voting
description: "Use when the society casts and tallies collective choice — ballots, votes, and rating series — where every gameable violation (double-voting, stuffing, post-cast tampering, aggregate fudging, anonymity collision, cross-tenant pollution) is made a uuid-mismatch any third party can detect without trusting the platform."
atomPath: voting
coordinate: "voting · 8/crest · 72636e2a"
contentUuid: "2a66085a-20bb-5bea-9622-34c2d1003dfc"
diamondUuid: "f434138c-c51d-82ab-ad7b-1865f8bb7fb1"
uuid: "72636e2a-6d74-8de8-b447-f98b0852283b"
horo: 8
typography:
  partition: voting
  bondDegree: 30
standards:
  - "ISO/IEC 25010:2023 §5.6 security — non-repudiation"
  - "ISO/IEC 25010:2023 §5.6 security — non-repudiation`"
  - "RFC 4122 §4.3 + RFC 8785 (content-derived uuids)"
  - "RFC 4122 §4.3 + RFC 8785 (content-derived uuids)`"
  - "RFC-4122"
  - W3C DID Core v1.0 (voter identity)
  - "W3C DID Core v1.0 (voter identity)`"
  - "W3C VC Data Model 2.0 (votes/ratings as verifiable claims)"
  - "W3C VC Data Model 2.0 (votes/ratings as verifiable claims)`"
  - "W3C-DID-1.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3a293506-644a-819e-8d79-31521fb6b0ec"
  stages:
    - stage: path
      stageUuid: "9debe9bf-638e-8ad6-93a1-babceae3d7f9"
    - stage: trinity
      stageUuid: "f3d02d40-6317-8f23-b46a-ef1e9ec35bc0"
    - stage: boundary
      stageUuid: "4ba139d4-ca90-83b3-8f70-400cdb2aa74e"
    - stage: links
      stageUuid: "2830f216-7973-88b1-9c00-92409ef13f45"
    - stage: horo
      stageUuid: "b4740db2-8a5e-8983-bf75-f576300811fe"
    - stage: seal
      stageUuid: "4edfd136-7ee9-8e9f-bdd6-b995a1c173ee"
    - stage: uuid
      stageUuid: "9444f618-a1be-86e4-abf2-5ec90990b5c2"
version: 2
---
# voting — the unforgeable cast and the honest tally

FORM: **a vote is its own content-uuid, so every way to game a ballot becomes a mismatch a stranger can catch.** Voting and rating systems are notoriously gameable; erpax does not *trust* a tally and audit it after — it derives the vote's id from the vote's content ([[identity]]), and each fraud class collapses into a recomputable disagreement ([[proof]]). Pure, no I/O ⇒ testable.

- **cast** — a vote's uuid is derived from `(ballot, tenant, voterPseudoDid, subject, period, value)`; a second identical cast collides with the first (double-vote guard), and any post-cast mutation breaks the uuid. `castVote`, `createBallot`.
- **pseudonymise** — the voter's master DID is hashed with the ballot period into a per-period pseudo-DID; cross-period correlation requires breaking SHA-256, so the cast is private yet still singular. `derivePseudoDid`.
- **tally** — the aggregate's uuid is derived from the SORTED set of contributing leaf uuids; anyone holding the leaves recomputes the average, so the platform cannot fudge it. `computeAggregate`, `exportBallotBundle`.

Two conservation laws close the pass. **Law 30** — `verifyAggregate`: every published aggregate's uuid must equal the recompute from its leaves, and each leaf must still verify ([[tamper/cost]]). **Law 31** — `checkNoDoubleVoting`: no two votes within a ballot may share `(ballot, voterPseudoDid, subject)`. Cross-tenant pollution is foreclosed by construction — the tenant is part of the vote content, so a cross-tenant vote is a different id ([[merge]]: same content ⇒ same id is also the duplicate detector).

This is the consent mechanism of the [[society]] — narrower than the polity's [[governance]] tally: it is the durable rating/ballot trail high-stakes choices ride on (credit, ESG), the same one-law-at-every-scale ([[fractal]]) that [[anti/corruption]] puts on the ledger. The ballot bundle is content-addressed and exportable, so a published result is a verifiable claim no one need believe on faith ([[history]]). The two sides are [[duality]]: the private cast and the public, recomputable tally.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C VC Data Model 2.0 (votes/ratings as verifiable claims)`
- `@standard W3C DID Core v1.0 (voter identity)`
- `@standard RFC 4122 §4.3 + RFC 8785 (content-derived uuids)`
- `@standard ISO/IEC 25010:2023 §5.6 security — non-repudiation`


- **W3C VC Data Model 2.0 / DID Core v1.0** — votes and ratings as verifiable claims; the voter identified by DID.
- **RFC 4122 §4.3 + RFC 8785 (JCS)** — content-derived, canonicalised uuids; the recompute is deterministic.
- **ISO/IEC 25010:2023 §5.6 security — non-repudiation** — the signature covers the uuid, which covers the intent.
- **ISO 19011:2018 §6.4.6** — every vote and rating audit-trailed.
