---
name: carriers
description: "Use when managing shipping or freight carrier master data — DHL, UPS, FedEx, postal, maritime, air-cargo — with per-tenant accounts, INCOTERMS-tagged service levels, hazmat flags, API credentials references, and effective-date lifecycle. The carrier master that normalises free-text carrier strings in shipments."
atomPath: carriers
coordinate: "carriers · 1/base · 1e613214"
contentUuid: "4f360cb9-2373-59f8-83a4-f3c423a35a1b"
diamondUuid: "cf15e63a-c0a6-8809-9b15-0d6271fbea83"
uuid: "1e613214-641d-8409-9e2e-afce1a2e8c74"
horo: 1
typography:
  partition: carriers
  bondDegree: 30
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
signatures:
  computationUuid: "a481a587-c32c-8257-b8d8-a8817c6a78f6"
  stages:
    - stage: path
      stageUuid: "7308a306-7dcc-8c72-9d4c-fe5462ab0bbe"
    - stage: trinity
      stageUuid: "4f3586bd-30e3-821d-92e2-1fe4f2770428"
    - stage: boundary
      stageUuid: "9ba8bfc8-1f5d-81d5-a3c4-c32d39f9b356"
    - stage: links
      stageUuid: "3aa569c2-8661-84ad-a155-9e943b0cac94"
    - stage: horo
      stageUuid: "ff1e59d2-51f4-8055-8a89-0936d9fa768c"
    - stage: seal
      stageUuid: "a09653a1-5898-8d8b-bb67-3d529e2ad5b8"
    - stage: uuid
      stageUuid: "645653bc-c67a-8463-b16c-e1ef05fa6da2"
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

Composes: [[standard]] · [[field]] · [[hooks]] · [[access]] · [[identity]].

**Law — [[law]]: the carrier master is the one normalized [[identity]] for every shipping/freight carrier per tenant — INCOTERMS service levels, hazmat flags, credential refs, effective-date lifecycle — so free-text carrier strings in shipments resolve to a single source.**
