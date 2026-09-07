---
name: quotes
description: "Use when capturing or evaluating vendor RFQ responses — quote lines, pricing, INCOTERMS, lead time, award decision and rationale for OECD BEPS Action 13 and SOX §404 arm's-length evidence. The per-vendor RFQ response and competitive-bid award record."
atomPath: "vendors/vendor/quotes"
coordinate: "vendors/vendor/quotes · 5/round · 373974d8"
contentUuid: "0eaa44f1-00cb-5fa2-bdeb-6ba8868de74a"
diamondUuid: "ecbc3b4d-037a-8ad3-a69b-3a9cddafc28a"
uuid: "373974d8-0f4c-8b57-ab56-9506c7e45059"
horo: 5
typography:
  partition: vendors
  bondDegree: 33
standards:
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes"
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "ISO-9001"
  - "OECD BEPS Action 13 transfer-pricing-evidence"
  - "SOX §404 internal-controls vendor-selection"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f086171e-dbd5-813c-95ac-e6fbb352cbae"
  stages:
    - stage: path
      stageUuid: "b2d1a970-616d-85ed-bf0e-818237217dc1"
    - stage: trinity
      stageUuid: "b713d802-2f29-8c5f-a0fd-72a881c64b38"
    - stage: boundary
      stageUuid: "936f195f-929a-8263-9f81-ddf1b06bcba6"
    - stage: links
      stageUuid: "6e0ab57d-123e-8717-89e7-f5fd8df3852a"
    - stage: horo
      stageUuid: "d04138dd-73cb-816c-b7d8-82577fd9514f"
    - stage: seal
      stageUuid: "b6a560dd-dcc3-838e-9d9a-8f24fed4f2aa"
    - stage: uuid
      stageUuid: "ec8faced-4178-81a3-9e51-04785466d7f7"
version: 2
---
# vendor-quotes

Vendor Quotes / RFQs — supplier RFQ responses (BEPS Action 13 evidence).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO 9001:2015 §8.4 control-of-externally-provided-processes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-evidence
- SOX §404 internal-controls vendor-selection
- ISO 9001:2015 §8.4 control-of-externally-provided-processes
- ISO-19011:2018 audit-trail rfq-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[cost/centers/purchase/requisitions]] · [[Vendors]] · [[Items]] · [[items/purchase/orders]].

**Law — [[law]]: a vendor-quote is one supplier's RFQ response with its award decision and rationale — the competitive-bid record that stands as arm's-length transfer-pricing evidence (BEPS Action 13 / SOX §404).**
