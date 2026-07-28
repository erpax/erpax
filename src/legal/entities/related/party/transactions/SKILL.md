---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: "legal/entities/related/party/transactions"
coordinate: "legal/entities/related/party/transactions · 2/share · 64bbb466"
contentUuid: "bd8cdb1c-c55e-5074-8a9a-1c1debc73560"
diamondUuid: "285acdc8-a796-8f36-b921-76eb42e5b51f"
uuid: "64bbb466-ebd0-816f-8b4d-23955ea5b1d3"
horo: 2
bonds:
  in:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - party
    - proof
    - rates
    - standard
    - transaction
    - trinity
  out:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
typography:
  partition: legal
  bondDegree: 54
  neighbors: []
standards:
  - "IAS-24 related-party-disclosures"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
neighbors:
  wikilink:
    - evidences
  matrix:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  backlinks:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
signatures:
  computationUuid: "eb223597-f1df-808f-a872-05e02b005be4"
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
      stageUuid: "a781e409-4720-8bb6-9faf-b0e50062689a"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "39b64361-7cc9-82c9-bddc-5ef3eb999947"
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
