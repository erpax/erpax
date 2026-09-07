---
name: returns
description: "Use when authorising, tracking, and closing a customer return (RMA) — recording the reason, line-level items and restock decisions, enforcing SoD on approval, and linking to the credit memo that reverses revenue per IFRS-15 §B22. The returns-and-RMA collection."
atomPath: "customers/sales/orders/returns"
coordinate: "customers/sales/orders/returns · 8/crest · f7a8f3da"
contentUuid: "26135e9b-d611-53c6-868c-ac27db12accd"
diamondUuid: "52fdfcee-3412-85db-9b43-859be20c1b69"
uuid: "f7a8f3da-3995-85c1-af75-a535672507ec"
horo: 8
typography:
  partition: customers
  bondDegree: 36
standards:
  - "IFRS IAS-2 inventories return-to-stock"
  - "IFRS IFRS-15 §B22 right-of-return-revenue-reversal"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls return-approval"
  - "US-GAAP ASC-330 inventory cost-flow"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c6695685-9b7e-828d-a568-1073540c8516"
  stages:
    - stage: path
      stageUuid: "2bf7c8f8-0287-893b-af46-38d6e75a697e"
    - stage: trinity
      stageUuid: "ef27cc2b-1457-89b6-9512-22f0cf647da4"
    - stage: boundary
      stageUuid: "9e33437a-3ec3-8174-852f-59c1aa53bee9"
    - stage: links
      stageUuid: "a7a5832b-bc7f-82d1-bc1f-89e00f5f7b77"
    - stage: horo
      stageUuid: "3790dc8e-dfbb-8c4a-b364-4e2dc5a0bf49"
    - stage: seal
      stageUuid: "70ac5fd1-5c8d-8cfe-aa60-4be79ba32b9b"
    - stage: uuid
      stageUuid: "ab4a14c9-ae03-8433-a466-8dc69399271e"
version: 2
---
# returns

Returns / RMA — customer-return authorisation with inventory + GL reversal.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §B22 right-of-return-revenue-reversal
- IFRS IAS-2 inventories return-to-stock
- US-GAAP ASC-606-10-32-10 variable-consideration
- US-GAAP ASC-330 inventory cost-flow
- ISO-19011:2018 audit-trail rma-evidence
- SOX §404 internal-controls return-approval
- ISO-27002 §5.4 segregation-of-duties

Composes: [[accounting]] · [[transaction]] · [[proof]] · [[hooks]] · [[field]] · [[standard]].

**Law — [[law]]: every authorised return links to the credit memo that reverses its original revenue, and restocked quantity never exceeds what was shipped.**
