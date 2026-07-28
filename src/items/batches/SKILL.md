---
name: batches
description: "Use when creating or tracing a lot/batch of material or product — GS1 AI(10) lot number, manufacture/expiry dates, quality status, parentBatches genealogy for EU 178/2002 one-step-back recall, pharma/automotive traceability. The batches collection."
atomPath: "items/batches"
coordinate: "items/batches · 8/crest · 07da66a6"
contentUuid: "29390216-44d0-5112-9751-3575dc9767ee"
diamondUuid: "cd7f561a-011b-863d-8e95-4c2ccb1c1834"
uuid: "07da66a6-a183-86ee-914b-b6b1e2677886"
horo: 8
bonds:
  in:
    - accounting
    - collections
    - fields
    - inspections
    - items
    - law
    - standard
  out:
    - accounting
    - collections
    - fields
    - inspections
    - items
    - law
    - standard
typography:
  partition: items
  bondDegree: 21
  neighbors: []
standards:
  - "EU Regulation 178/2002 Art 18 one-step-back-one-step-forward"
  - "EU-2005/29"
  - "FDA 21 CFR 211.122 211.130 pharma-lot-control"
  - "GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date"
  - "IATF 16949:2016 §8.5.2.1 automotive-traceability"
  - "IFRS IAS-2 §23-§27 cost-formula-specific-identification"
  - "ISO 22005:2007 feed-and-food-chain-traceability"
  - "ISO 22005:2007 feed-and-food-chain-traceability`"
  - "ISO 9001:2015 §8.5.2 identification-and-traceability"
  - "ISO 9001:2015 §8.5.2 identification-and-traceability`"
  - "ISO-8601-1:2019 date-time manufacture-expiry-dates"
  - "ISO-8601-1:2019 date-time manufacture-expiry-dates`"
  - "ISO-9001"
  - "SOX §404 internal-controls traceability-control TOM-TRACE-01"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - fields
    - inspections
    - law
    - standard
  matrix:
    - accounting
    - collections
    - fields
    - inspections
    - items
    - law
    - standard
  backlinks:
    - accounting
    - collections
    - fields
    - inspections
    - items
    - law
    - standard
signatures:
  computationUuid: "2b34cc7a-bd41-8857-8cda-bad1647a1345"
  stages:
    - stage: path
      stageUuid: "aefe3c34-f084-86b3-ad32-498d7d774cbb"
    - stage: trinity
      stageUuid: "1f6bfcc7-8247-80ac-812e-f90ff4468eb3"
    - stage: boundary
      stageUuid: "f481e129-bcc8-8587-8c2c-41b524f94056"
    - stage: links
      stageUuid: "c3d6a8a3-bfd3-865c-a91f-81e7620b1a9a"
    - stage: horo
      stageUuid: "9d52cfed-7172-8e94-b1b3-e1961b164db4"
    - stage: seal
      stageUuid: "88ca933f-041e-8dd1-aaae-15e03c9dc0c3"
    - stage: uuid
      stageUuid: "a914a750-5e34-853f-acba-d43370bac45c"
version: 2
---
# batches

Batches — lot / batch traceability with genealogy (one-up / one-down).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 9001:2015 §8.5.2 identification-and-traceability`
- `@standard ISO 22005:2007 feed-and-food-chain-traceability`
- `@standard ISO-8601-1:2019 date-time manufacture-expiry-dates`

- ISO 9001:2015 §8.5.2 identification-and-traceability
- ISO 22005:2007 feed-and-food-chain-traceability
- GS1 General Specifications AI(10) batch/lot AI(17) expiry AI(11) production-date
- EU Regulation 178/2002 Art 18 one-step-back-one-step-forward
- FDA 21 CFR 211.122 211.130 pharma-lot-control
- IATF 16949:2016 §8.5.2.1 automotive-traceability
- ISO-8601-1:2019 date-time manufacture-expiry-dates
- IFRS IAS-2 §23-§27 cost-formula-specific-identification
- ISO-19011:2018 audit-trail lot-genealogy-evidence
- SOX §404 internal-controls traceability-control TOM-TRACE-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[items/quality/inspections]] · [[collections]] · [[fields]] · [[accounting]] · [[standard]].

**Law — [[law]]: a batch carries lot identity and parent-batch genealogy (one-step-back, one-step-forward) so any unit traces to its sources and forward to its products — the recall and traceability spine (EU 178/2002, GS1 AI(10)).**
