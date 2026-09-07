---
name: exchange
description: "Use when reasoning about exchange — FORM: **a cross-domain exchange is gated, sanitized, and receipted — the requester gets the data AND the proof of how it was obtained.** Party (one domain, its own identity) asks p"
atomPath: exchange
coordinate: "exchange · 8/crest · a8cdf3d2"
contentUuid: "5810715f-d07d-522a-a821-0a7cf497a7b9"
diamondUuid: "3bb27a6e-9ff0-8354-8424-848eeeebfbc5"
uuid: "a8cdf3d2-1e26-8aba-99b8-ddf2febf8ba1"
horo: 8
typography:
  partition: exchange
  bondDegree: 43
standards:
  - "EU-2016/679"
  - "GDPR Art.5(1)(c) data-minimisation (release only the granted fields)"
  - "GDPR Art.5(1)(c) data-minimisation (release only the granted fields)`"
  - "ISO-27001"
  - "ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)"
  - "ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)`"
  - "ISO/IEC-27001:2022"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "68b5db9a-3d22-8252-b2a5-952186e12a20"
  stages:
    - stage: path
      stageUuid: "991b5f8f-298a-8f09-8315-f7dfb61efe52"
    - stage: trinity
      stageUuid: "c91b71d6-6270-8462-afdd-d42eb77e37ac"
    - stage: boundary
      stageUuid: "c530d049-32a2-8a75-9ecd-fc109d1d2880"
    - stage: links
      stageUuid: "7ee5a9a7-e172-840f-8783-4dd0724a9c93"
    - stage: horo
      stageUuid: "15ae946c-8ec0-8b4c-9eb8-a37aa4b45e71"
    - stage: seal
      stageUuid: "6c9ba44c-525d-852c-bc20-becc2a651f3d"
    - stage: uuid
      stageUuid: "60f2fe89-7c8f-85ed-9ae5-a94197ca94d0"
version: 2
---
# exchange — governed cross-domain data exchange with provenance

FORM: **a cross-domain exchange is gated, sanitized, and receipted — the requester gets the data AND the proof of how it was obtained.** Party `from` (one domain, its own [[identity]]) asks party `to` (another domain) for `fields` under a `capability`; the holder's `ExchangeGrant` gates it (the capability must match) and SANITIZES the release to `releasableFields` (other parties' data never leaves — strip, don't trust); `exchange` then emits a [[receipt]] recording the decision, chained as a provenance entry. The requester receives `released` (requested ∩ releasable) plus a verifiable receipt — exactly what was accessed, by whom, under what authority.

**No shared infrastructure, no shared trust root.** Each party content-addresses its own decisions and chains its own [[receipt]]s; the parties are edges of the [[connections]] graph ([[give]]/[[take]] across a B2B/B2G/C2C link), and the [[sandbox]] grant is the holder's policy toward the requester. Cross-domain governance falls out of three native primitives — [[connections]] (who may ask whom), [[sandbox]] (what is permitted + sanitized), [[receipt]] (the provenance) — so two organisations that share NOTHING but a content-addressed protocol can still exchange data with full, mutual, verifiable provenance ([[federation]]: the provenance chains [[merge]] without coordination).

Matter-twin: `src/services/exchange/index.ts` (`Party`·`ExchangeRequest`·`ExchangeGrant`·`exchange`) over `services/receipt` + `index.test.ts`. Composes: [[receipt]] · [[connections]] · [[sandbox]] · [[federation]] · [[identity]] · [[give]] · [[take]] · [[merge]] · [[society]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)`
- `@standard GDPR Art.5(1)(c) data-minimisation (release only the granted fields)`


- ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)
- GDPR Art.5(1)(c) data-minimisation (release only the granted fields)

## Common mistakes
- Releasing the requested fields and filtering later — SANITIZE at the boundary (`released = requested ∩ releasable`); data not granted never crosses the domain edge.
- Trusting a shared central ledger for provenance — each party receipts its own side ([[receipt]]); the proof is content-addressed and merges, no central root needed.
- An exchange without a receipt — then there is no provenance; `exchange` gates AND receipts in one step (no receipt, no proof).

**Law — [[law]]: a cross-domain exchange is gated by the holder's grant, SANITIZED at the boundary (`released = requested ∩ releasable` — ungranted data never crosses), and [[receipt]]ed — so the requester gets the data AND the provenance proving what was accessed, by whom, under what authority; each party content-addresses and receipts its own side, the provenance [[merge]]s with no shared trust root ([[federation]]).**
