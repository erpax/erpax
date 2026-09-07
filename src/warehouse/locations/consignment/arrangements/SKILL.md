---
name: arrangements
description: "Use when managing goods shipped to a consignee for onward sale where control transfers only at consignee sale — master IFRS-15 §B77-B78 / ASC 606-10-55-79 agreement covering consignee, term, control-transfer trigger, return rights, INCOTERM, and max-value cap. The consignment master-agreement collection."
atomPath: "warehouse/locations/consignment/arrangements"
coordinate: "warehouse/locations/consignment/arrangements · 4/weave · 807f8610"
contentUuid: "d6eaa5e8-6ada-5c62-8313-baa6a0f17dbb"
diamondUuid: "21cb4d70-0f72-8a49-a234-1010d7ae7382"
uuid: "807f8610-f1c2-884a-9df3-e87aa3b17755"
horo: 4
typography:
  partition: warehouse
  bondDegree: 32
standards:
  - "EN-16931:2017 §BG-15 deliver-to-information"
  - "EN-16931:2017 §BG-15 deliver-to-information`"
  - "IFRS IAS-2 §6 inventory-held-at-other-location"
  - "IFRS IFRS-15 §38 point-in-time-control-transfer"
  - "IFRS IFRS-15 §B77-B78 consignment-arrangements"
  - "INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)"
  - "INCOTERMS-2020"
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "SOX §404 internal-controls revenue-deferral TOM-AR-04"
  - "US-GAAP ASC-606-10-55-79 consignment-indicators"
  - "US-GAAP ASC-606-10-55-80 consignment-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "19da6142-90a0-8ad8-93ca-7a870340296c"
  stages:
    - stage: path
      stageUuid: "2832901f-7209-8dd6-a06c-1b54315cc475"
    - stage: trinity
      stageUuid: "f4fbfb37-8283-8a05-b0e3-246eab669835"
    - stage: boundary
      stageUuid: "7b89993a-df9c-8452-9ec7-21fa64c5e8a6"
    - stage: links
      stageUuid: "8c257b5a-2a37-8305-816b-51f8211aa49f"
    - stage: horo
      stageUuid: "7ffdab8c-67ba-8e87-91fd-cf4ac7518afa"
    - stage: seal
      stageUuid: "ecefbd6a-8b2d-8825-8205-6bcea0997fc2"
    - stage: uuid
      stageUuid: "f3121c92-f647-887a-85c5-66b5f7117a7d"
version: 2
---
## Overview

Consignment Arrangements — IFRS-15 §B77-B78 / ASC 606-10-55-79 master. When entity A (consignor / tenant) ships goods to entity B (consignee) for storage and onward sale, control does **not** transfer until the consignee sells to an end-customer. Per IFRS-15 §B78 the consignor recognises inventory at the consignee's location AND keeps revenue deferred until the §B77 indicators (control passed, no return-right, etc.) resolve.

## Composition

- [[warehouse/locations/consignment/arrangements/consignment/inventories]] — per-SKU running balance at the consignee's location
- [[warehouse/locations/consignment/arrangements/consignment/sales]] — sale events that trigger IFRS-15 §38 point-in-time revenue recognition
- [[accounting]] — [[transaction]] accounting records, [[entry]] generation, [[balance]] tracking
- [[proof]] — evidence attestation and audit trail anchors
- [[identity]] — consignee party identification and relationship tracking

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 §BG-15 deliver-to-information`
- `@standard ISO-3166-1:2020 country-codes`
- `@standard ISO-4217:2015 currency-codes`


- EN-16931:2017 §BG-15 deliver-to-information
- INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)
- ISO-3166-1:2020 country-codes
- ISO-4217:2015 currency-codes
- IFRS IFRS-15 §B77-B78 consignment-arrangements
- IFRS IFRS-15 §38 point-in-time-control-transfer
- US-GAAP ASC-606-10-55-79 consignment-indicators
- US-GAAP ASC-606-10-55-80 consignment-control
- IFRS IAS-2 §6 inventory-held-at-other-location
- ISO-19011:2018 audit-trail consignment-arrangement-evidence
- SOX §404 internal-controls revenue-deferral TOM-AR-04
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: control does not transfer until the consignee sells onward — the consignor keeps the inventory on its books and defers revenue until the §B77 indicators resolve at the [[warehouse/locations/consignment/arrangements/consignment/sales|sale event]].**
