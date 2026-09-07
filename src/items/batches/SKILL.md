---
name: batches
description: "Use when creating or tracing a lot/batch of material or product — GS1 AI(10) lot number, manufacture/expiry dates, quality status, parentBatches genealogy for EU 178/2002 one-step-back recall, pharma/automotive traceability. The batches collection."
atomPath: "items/batches"
coordinate: "items/batches · 7/descent · 6d890143"
contentUuid: "53965f17-6b7d-5b30-a2b9-ae996f85f00f"
diamondUuid: "351dfc5c-10a9-87c3-80aa-510a1de320db"
uuid: "6d890143-a654-8a12-bf97-015489d37d3a"
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
  computationUuid: "d5dfce68-caa3-8def-b5da-5d3abb25cdfb"
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
      stageUuid: "46dbdabf-03cd-880d-ac88-e2cc3a571719"
    - stage: seal
      stageUuid: "bd80cad1-0b2f-842a-82a5-de59947139f1"
    - stage: uuid
      stageUuid: "276c9438-9cbb-8045-aa48-ffd8256de47b"
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
