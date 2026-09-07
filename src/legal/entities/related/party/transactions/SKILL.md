---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: "legal/entities/related/party/transactions"
coordinate: "legal/entities/related/party/transactions · 2/share · 9ec49913"
contentUuid: "18fa9256-719f-526d-b3a0-52417a1fcc00"
diamondUuid: "920b0fc6-a261-8663-a216-0dd54f185db7"
uuid: "9ec49913-d95b-8d07-841e-77f16fd9d643"
horo: 2
typography:
  partition: legal
  bondDegree: 54
standards:
  - "IAS-24 related-party-disclosures"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
signatures:
  computationUuid: "bb656d66-c03c-8186-baf6-78b6f66fbe16"
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
      stageUuid: "04afba95-0593-8514-a0a1-9d58260effd7"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "4deebe22-c0da-83f4-b13c-c463c61d4675"
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
