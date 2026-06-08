---
name: returns
description: "Use when authorising, tracking, and closing a customer return (RMA) — recording the reason, line-level items and restock decisions, enforcing SoD on approval, and linking to the credit memo that reverses revenue per IFRS-15 §B22. The returns-and-RMA collection."
atomPath: customers/sales/orders/returns
coordinate: customers/sales/orders/returns · 5/round · d720d6ee
contentUuid: "6bddf94a-eb26-5d22-9482-d6e84eeea8b4"
diamondUuid: "21b8247a-229c-8f8a-a684-d9047d6fc25e"
uuid: "d720d6ee-f33f-8941-96a5-055a0cce8faf"
horo: 5
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
  - "ISO-19011:2018 audit-trail rma-evidence"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls return-approval"
  - "US-GAAP ASC-330 inventory cost-flow"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
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
  computationUuid: "c62b64f0-9e2c-8764-aac0-22f22204f8f7"
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
      stageUuid: "59b08a75-9d80-86f7-bb0a-37f1e8cda7cf"
    - stage: seal
      stageUuid: "70ac5fd1-5c8d-8cfe-aa60-4be79ba32b9b"
    - stage: uuid
      stageUuid: "176ba2fa-2e46-8c57-9553-d488aea230e0"
version: 2
---
# returns

Returns / RMA — customer-return authorisation with inventory + GL reversal.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
