---
name: returns
description: "Use when authorising, tracking, and closing a customer return (RMA) — recording the reason, line-level items and restock decisions, enforcing SoD on approval, and linking to the credit memo that reverses revenue per IFRS-15 §B22. The returns-and-RMA collection."
atomPath: "customers/sales/orders/returns"
coordinate: "customers/sales/orders/returns · 7/descent · 96cd3981"
contentUuid: "dc4822ac-529e-5c9e-9882-5094770af754"
diamondUuid: "86af1d84-e5b8-8850-95a4-3c5a032c26f5"
uuid: "96cd3981-83e2-8338-85be-98efe717dc59"
horo: 7
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
  computationUuid: "7597fee3-58a5-8f0d-99f1-c87b9f7c7196"
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
      stageUuid: "9f36d0ab-b36d-8cf6-afd2-6345a8c31f4e"
    - stage: seal
      stageUuid: "70ac5fd1-5c8d-8cfe-aa60-4be79ba32b9b"
    - stage: uuid
      stageUuid: "386c2b71-2c6a-8fb0-8417-e7920d853e0b"
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
