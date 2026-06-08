---
name: quotes
description: "Use when capturing or evaluating vendor RFQ responses — quote lines, pricing, INCOTERMS, lead time, award decision and rationale for OECD BEPS Action 13 and SOX §404 arm's-length evidence. The per-vendor RFQ response and competitive-bid award record."
atomPath: vendors/vendor/quotes
coordinate: vendors/vendor/quotes · 8/crest · b868e63d
contentUuid: "6b00f4d1-6850-5547-b624-3e1425fb9516"
diamondUuid: "4169615c-2fb7-8955-8ee5-c3f03cb2b884"
uuid: "b868e63d-9994-8299-9bb3-69e7054e34c9"
horo: 8
bonds:
  in:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
    - vendor
  out:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
typography:
  partition: vendors
  bondDegree: 33
  neighbors: []
standards:
  - "ISO 9001:2015 §8.4 control-of-externally-provided-processes"
  - "ISO-19011:2018 audit-trail rfq-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "ISO-9001"
  - "OECD BEPS Action 13 transfer-pricing-evidence"
  - "SOX §404 internal-controls vendor-selection"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - items
    - law
    - orders
    - requisitions
    - vendors
  matrix:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
  backlinks:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
signatures:
  computationUuid: "173360d2-65e1-818c-9f33-bb4f80176f42"
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
      stageUuid: "14554fbd-c33f-8c1c-bcbe-2f46283a1cc6"
    - stage: seal
      stageUuid: "b6a560dd-dcc3-838e-9d9a-8f24fed4f2aa"
    - stage: uuid
      stageUuid: "838d69b8-aa8e-8fe3-8efe-d6e38d3acea9"
version: 2
---
# vendor-quotes

Vendor Quotes / RFQs — supplier RFQ responses (BEPS Action 13 evidence).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-evidence
- SOX §404 internal-controls vendor-selection
- ISO 9001:2015 §8.4 control-of-externally-provided-processes
- ISO-19011:2018 audit-trail rfq-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[cost/centers/purchase/requisitions]] · [[Vendors]] · [[Items]] · [[items/purchase/orders]].

**Law — [[law]]: a vendor-quote is one supplier's RFQ response with its award decision and rationale — the competitive-bid record that stands as arm's-length transfer-pricing evidence (BEPS Action 13 / SOX §404).**
