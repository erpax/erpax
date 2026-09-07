---
name: receivable
description: "Use when reasoning about receivable — The A/R field factories: the shapes an invoice carries — invoice number, status, due date, payment terms, A/R analysis. (the type module) is a set of these; this atom is the one."
atomPath: receivable
coordinate: "receivable · 2/share · e04289f7"
contentUuid: "31f67958-197e-5be9-841d-0aa81e60fccd"
diamondUuid: "d5747a66-4ea1-8e00-ac2c-1da529c2f91f"
uuid: "e04289f7-84fc-83dc-aa24-07c39a46d5d5"
horo: 2
typography:
  partition: receivable
  bondDegree: 34
standards:
  - "EN-16931:2017 invoice-fields"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
bindings: []
signatures:
  computationUuid: "9e63a6a1-94d3-83fd-ab30-fe160289d063"
  stages:
    - stage: path
      stageUuid: "d8e62f61-381d-8beb-9a59-584ab2d247eb"
    - stage: trinity
      stageUuid: "1dabdf67-b450-844c-9df5-71081d2949a0"
    - stage: boundary
      stageUuid: "bc3edb56-8f4f-8033-9463-d79f7afb7965"
    - stage: links
      stageUuid: "e03af6f5-6a08-8d25-8ccb-ab83f8cf1654"
    - stage: horo
      stageUuid: "e7890948-937d-8ca9-9d2c-d71f6eb867b7"
    - stage: seal
      stageUuid: "58afe757-2573-8837-8f00-e5be28d00a50"
    - stage: uuid
      stageUuid: "bdf82f99-fbc9-8f68-bb8b-f813f9d292f9"
version: 2
---
# receivable — the singular the `receivables` collection is a set of

The A/R field factories: the shapes an invoice carries — invoice number, status, due date, payment
terms, A/R analysis. `receivables` (the type module) is a set of these; this atom is the one.

Like [[payable]], it held `index.ts` and `test.ts` and **no SKILL.md**, so the [[matrix]] could not
see it and `receivables` read as an orphan — a collection whose model exists on disk and nowhere in
the fold. [[balance]] measures exactly that pairing: plural is the collection, singular is the model.

The A/R and A/P shapes are mirrors and are deliberately not merged. An invoice becomes live on
**issue** and stays live through its **grace period**; a bill becomes live on **approval**. Neither
status exists in the other's set, which is the difference that a same-looking fold erased once
([[invoices]]/hooks/transition).

**Honest boundary.** Field FACTORIES — shapes, not behaviour. Revenue recognition under IFRS 15 is
a judgement made elsewhere; this atom claims the field shapes it declares and nothing more.

**Law — [[law]]: a plural atom is a collection and its singular is the model. An atom with matter
and no SKILL is invisible to the fold, and its plural reads as a store with no type.**

## Standards

- **EN-16931:2017** — invoice fields.
- **ISO-4217:2015** — currency codes.
- **IFRS 15** — revenue from contracts with customers.

Composes: [[balance]] · [[payable]] · [[field]] · [[law]].
