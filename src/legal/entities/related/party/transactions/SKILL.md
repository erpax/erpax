---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: "legal/entities/related/party/transactions"
coordinate: "legal/entities/related/party/transactions · 7/descent · de3d289a"
contentUuid: "42f12678-4b6c-5d32-9f5e-fff20d28678c"
diamondUuid: "6ba8e898-dc0f-81a4-b7fe-bea09f775929"
uuid: "de3d289a-6bf9-89fd-815f-b20839e904e1"
horo: 7
typography:
  partition: legal
  bondDegree: 54
standards:
  - "IAS-24 related-party-disclosures"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
signatures:
  computationUuid: "99c9f62b-ecf1-8e40-a840-abcb39b1ffeb"
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
      stageUuid: "5af465be-6c2b-847a-b799-420d675479a9"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "e7b30213-d500-87ec-abb2-56cc39ff19e6"
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
