---
name: carriers
description: "Use when managing shipping or freight carrier master data — DHL, UPS, FedEx, postal, maritime, air-cargo — with per-tenant accounts, INCOTERMS-tagged service levels, hazmat flags, API credentials references, and effective-date lifecycle. The carrier master that normalises free-text carrier strings in shipments."
atomPath: carriers
coordinate: "carriers · 2/share · 8c1247f4"
contentUuid: "75e15073-3acb-55e9-b346-68cb397fbda2"
diamondUuid: "ffd6455b-3b50-8d4c-a9e1-186c28a89dd8"
uuid: "8c1247f4-83b5-8335-9dd4-8a1312d74726"
horo: 2
typography:
  partition: carriers
  bondDegree: 28
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
  computationUuid: "8e18bcf6-c4c2-856b-a467-ae105b63ee7f"
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
      stageUuid: "fca6a597-7a5b-8b25-8466-30cd44c9e593"
    - stage: seal
      stageUuid: "a09653a1-5898-8d8b-bb67-3d529e2ad5b8"
    - stage: uuid
      stageUuid: "702f2387-1357-8d52-8d0e-b04c49d82833"
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
