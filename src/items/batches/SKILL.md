---
name: batches
description: "Use when creating or tracing a lot/batch of material or product — GS1 AI(10) lot number, manufacture/expiry dates, quality status, parentBatches genealogy for EU 178/2002 one-step-back recall, pharma/automotive traceability. The batches collection."
atomPath: "items/batches"
coordinate: "items/batches · 7/descent · c221acbd"
contentUuid: "2b257115-8fe3-59ea-b2f0-4b0731dd3580"
diamondUuid: "5c9202c0-744a-8f75-a164-14c0a74de61c"
uuid: "c221acbd-757c-8130-9f45-a89c5c31a368"
horo: 7
typography:
  partition: items
  bondDegree: 21
standards:
  - "EU Regulation 178/2002 Art 18 one-step-back-one-step-forward"
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
signatures:
  computationUuid: "1d764371-5af5-8de7-b0b0-71dbe6b5cfbc"
  stages:
    - stage: path
      stageUuid: "aefe3c34-f084-86b3-ad32-498d7d774cbb"
    - stage: trinity
      stageUuid: "1f6bfcc7-8247-80ac-812e-f90ff4468eb3"
    - stage: boundary
      stageUuid: "f481e129-bcc8-8587-8c2c-41b524f94056"
    - stage: links
      stageUuid: "840869f7-3c68-8539-ad9f-445dd151baeb"
    - stage: horo
      stageUuid: "68d3f6b0-e0c0-86d2-b339-9555bbd082be"
    - stage: seal
      stageUuid: "bd80cad1-0b2f-842a-82a5-de59947139f1"
    - stage: uuid
      stageUuid: "2db443c5-dbd7-89c2-85ff-4edf7afaba03"
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

Composes: [[items/quality/inspections]] · [[collections]] · [[field]] · [[accounting]] · [[standard]].

**Law — [[law]]: a batch carries lot identity and parent-batch genealogy (one-step-back, one-step-forward) so any unit traces to its sources and forward to its products — the recall and traceability spine (EU 178/2002, GS1 AI(10)).**
