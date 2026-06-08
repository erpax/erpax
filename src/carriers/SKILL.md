---
name: carriers
description: "Use when managing shipping or freight carrier master data — DHL, UPS, FedEx, postal, maritime, air-cargo — with per-tenant accounts, INCOTERMS-tagged service levels, hazmat flags, API credentials references, and effective-date lifecycle. The carrier master that normalises free-text carrier strings in shipments."
atomPath: carriers
coordinate: carriers · 7/descent · 2b3a89ff
contentUuid: "163e2f60-a22e-5cf3-bbc1-1af70456fcbf"
diamondUuid: "bc8c3ba7-b0d9-82ae-86fd-ac4f2582ef42"
uuid: "2b3a89ff-e298-850a-8a6b-93a733f13104"
horo: 7
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
  - "ISO-19011:2018 audit-trail carrier-master"
  - "ISO-8601-1:2019 date-time effective-from"
  - "SOX §404 internal-controls carrier-master TOM-LOG-01"
  - "UPU-S10 universal-postal-union shipment-identifier"
  - "UPU-S42"
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
  computationUuid: "f7a8a11d-9ef3-89db-96b3-f8cb991833f3"
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
      stageUuid: "52ae5acf-6103-8dc0-81da-025519b7ad9d"
    - stage: seal
      stageUuid: "2e3b7431-7e9a-86af-b007-e7a625122c3b"
    - stage: uuid
      stageUuid: "91175ac2-b4d4-8dd5-929e-ae07876d2393"
version: 2
---
# carriers

Carriers — shipping/freight carrier master per tenant.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
