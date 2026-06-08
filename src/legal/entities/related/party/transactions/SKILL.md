---
name: transactions
description: "Use when recording or disclosing transactions between a legal entity and its key management, directors, shareholders, controlled entities or joint ventures — arm's-length evidence, board-approval workflow, IAS-24/ASC-850 disclosure reference, linked audit evidence. The related-party disclosure register."
atomPath: legal/entities/related/party/transactions
coordinate: legal/entities/related/party/transactions · 2/share · 60e916b2
contentUuid: "d53acb1d-c84d-51df-a97d-ec7c72843b6b"
diamondUuid: "8dbd36f4-aa75-8129-affe-35976d020344"
uuid: "60e916b2-59ae-879f-ac0f-790f43da00a1"
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
  computationUuid: "cb1a5737-b68a-833f-b33a-6dfa5bde09de"
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
      stageUuid: "4ddee568-804d-8b74-825b-e230305dbcf6"
    - stage: seal
      stageUuid: "05695998-7e01-8912-be2f-5109317f4a59"
    - stage: uuid
      stageUuid: "3f69ba77-bbdd-8672-9971-b5624d736ec4"
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
