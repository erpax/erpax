---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: "legal/entities/related/party/transactions"
coordinate: "legal/entities/related/party/transactions · 1/base · f3599b14"
contentUuid: "e4c4c1eb-a1d0-5494-b671-3ca73113099a"
diamondUuid: "d1acea7e-4b56-88fd-932a-6fa3bf80efbd"
uuid: "f3599b14-7559-8686-af1f-a65143d6c60d"
horo: 1
typography:
  partition: legal
  bondDegree: 54
standards:
  - "IAS-24 related-party-disclosures"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
signatures:
  computationUuid: "db6b3346-531d-8816-8097-e525167530c6"
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
      stageUuid: "bc40d8e4-2084-89ef-a480-096f07108b92"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "430255d7-4e92-8921-b768-23029120a2e5"
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
