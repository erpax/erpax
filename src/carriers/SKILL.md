---
name: carriers
description: "Use when managing shipping or freight carrier master data — DHL, UPS, FedEx, postal, maritime, air-cargo — with per-tenant accounts, INCOTERMS-tagged service levels, hazmat flags, API credentials references, and effective-date lifecycle. The carrier master that normalises free-text carrier strings in shipments."
atomPath: carriers
coordinate: "carriers · 2/share · 8b69d5cf"
contentUuid: "60de2eec-d46c-501e-87f8-05f2bf56a61c"
diamondUuid: "7fe2d0c0-2424-83dd-b04f-0c7ad61f66ec"
uuid: "8b69d5cf-ad05-8be9-9f97-08aaa108117b"
horo: 2
bonds:
  in:
    - access
    - api
    - events
    - fields
    - hooks
    - identity
    - law
    - pickup
    - standard
    - trading
  out:
    - access
    - api
    - events
    - fields
    - hooks
    - identity
    - law
    - pickup
    - standard
    - trading
typography:
  partition: carriers
  bondDegree: 30
  neighbors: []
standards:
  - "EU-Taxonomy-2020/852"
  - "IATA DGR dangerous-goods-regulations"
  - "IMDG-Code maritime-dangerous-goods"
  - "INCOTERMS 2020 international-commercial-terms"
  - "INCOTERMS-2020"
  - "ISO-8601-1:2019 date-time effective-from"
  - "ISO-8601-1:2019 date-time effective-from`"
  - "SOX §404 internal-controls carrier-master TOM-LOG-01"
  - "UPU-S10 universal-postal-union shipment-identifier"
  - "UPU-S42"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - identity
    - law
    - standard
  matrix:
    - access
    - api
    - events
    - fields
    - hooks
    - identity
    - law
    - pickup
    - standard
    - trading
  backlinks:
    - access
    - api
    - events
    - fields
    - hooks
    - identity
    - law
    - pickup
    - standard
    - trading
signatures:
  computationUuid: "56801833-e0eb-8ddb-beaf-18ffef2db251"
  stages:
    - stage: path
      stageUuid: "7308a306-7dcc-8c72-9d4c-fe5462ab0bbe"
    - stage: trinity
      stageUuid: "4f3586bd-30e3-821d-92e2-1fe4f2770428"
    - stage: boundary
      stageUuid: "9ba8bfc8-1f5d-81d5-a3c4-c32d39f9b356"
    - stage: links
      stageUuid: "8d74b8d1-50c2-849d-81a5-e40b720d45ae"
    - stage: horo
      stageUuid: "00e557f4-4e43-8ad4-8ed7-3947e67b4d17"
    - stage: seal
      stageUuid: "a09653a1-5898-8d8b-bb67-3d529e2ad5b8"
    - stage: uuid
      stageUuid: "de26526a-61c0-8d54-bc28-5f213f310bb3"
version: 2
---
# carriers

Carriers — shipping/freight carrier master per tenant.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time effective-from`

- ISO-8601-1:2019 date-time effective-from
- INCOTERMS 2020 international-commercial-terms
- IATA DGR dangerous-goods-regulations
- IMDG-Code maritime-dangerous-goods
- UPU-S10 universal-postal-union shipment-identifier
- ISO-19011:2018 audit-trail carrier-master
- SOX §404 internal-controls carrier-master TOM-LOG-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §8.24 use-of-cryptography api-credentials-encryption

Composes: [[standard]] · [[fields]] · [[hooks]] · [[access]] · [[identity]].

**Law — [[law]]: the carrier master is the one normalized [[identity]] for every shipping/freight carrier per tenant — INCOTERMS service levels, hazmat flags, credential refs, effective-date lifecycle — so free-text carrier strings in shipments resolve to a single source.**
