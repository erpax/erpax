---
name: returns
description: "Use when authorising, tracking, and closing a customer return (RMA) — recording the reason, line-level items and restock decisions, enforcing SoD on approval, and linking to the credit memo that reverses revenue per IFRS-15 §B22. The returns-and-RMA collection."
atomPath: "customers/sales/orders/returns"
coordinate: "customers/sales/orders/returns · 8/crest · a767eceb"
contentUuid: "86fb91a8-d0d6-5fff-8e82-5d6cb0f7621c"
diamondUuid: "f2bda075-961a-893d-8834-7c58d0df4702"
uuid: "a767eceb-f762-8f4c-b3a1-e31285cd3ce5"
horo: 8
bonds:
  in:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
  out:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
typography:
  partition: customers
  bondDegree: 36
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - fields
    - hooks
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
  backlinks:
    - accounting
    - fields
    - hooks
    - law
    - offered
    - orders
    - proof
    - standard
    - store
    - transaction
signatures:
  computationUuid: "04b7b254-a7b0-8c7f-a802-5ac1c7009f30"
  stages:
    - stage: path
      stageUuid: "2bf7c8f8-0287-893b-af46-38d6e75a697e"
    - stage: trinity
      stageUuid: "ef27cc2b-1457-89b6-9512-22f0cf647da4"
    - stage: boundary
      stageUuid: "9e33437a-3ec3-8174-852f-59c1aa53bee9"
    - stage: links
      stageUuid: "bafa1ce5-fff9-862a-aee3-a893153ac587"
    - stage: horo
      stageUuid: "3072d676-18c1-846a-964f-7fff3499ca10"
    - stage: seal
      stageUuid: "70ac5fd1-5c8d-8cfe-aa60-4be79ba32b9b"
    - stage: uuid
      stageUuid: "8f8e9d13-04b3-8ac4-b67e-a59572d82eb8"
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

Composes: [[accounting]] · [[transaction]] · [[proof]] · [[hooks]] · [[fields]] · [[standard]].

**Law — [[law]]: every authorised return links to the credit memo that reverses its original revenue, and restocked quantity never exceeds what was shipped.**
