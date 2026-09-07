---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: "legal/entities/related/party/transactions"
coordinate: "legal/entities/related/party/transactions · 4/weave · 89df63f1"
contentUuid: "ebe839e9-6b60-5eac-86dc-37c7733e4f18"
diamondUuid: "b3a61bd7-5cd0-840f-9646-5a0d67df573c"
uuid: "89df63f1-b59b-8075-a518-d270e2240438"
horo: 4
typography:
  partition: legal
  bondDegree: 54
standards:
  - "IAS-24 related-party-disclosures"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
signatures:
  computationUuid: "a0ee6b69-dd4e-80f6-b1e3-fa8213cabab4"
  stages:
    - stage: path
      stageUuid: "ffca0fe6-40fd-8223-91a1-59977a5d78e8"
    - stage: trinity
      stageUuid: "34a2a1cf-a877-8478-b6e2-dd3fb2cc5c0e"
    - stage: boundary
      stageUuid: "314fd4c7-edb4-878d-bf52-a8449afef75d"
    - stage: links
      stageUuid: "3fe4ec39-c8e7-874b-81af-1bf4efa02973"
    - stage: horo
      stageUuid: "b7fcc76b-9ce4-879d-a42c-b77e29b57832"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "3be18ea5-cbdc-847f-b3c1-2678d1c80da3"
version: 2
---
# related-party-transactions

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IAS-24 related-party-disclosures
- US-GAAP ASC-850 related-party-disclosures
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[media/audit/evidences]].
