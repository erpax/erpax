---
name: receivable
description: "Use when reasoning about receivable — The A/R field factories: the shapes an invoice carries — invoice number, status, due date, payment terms, A/R analysis. (the type module) is a set of these; this atom is the one."
atomPath: receivable
coordinate: "receivable · 1/base · 820001c2"
contentUuid: "f6732789-13b7-5653-ac60-91acca94d8ec"
diamondUuid: "6e5f7437-ae1c-81ee-a560-d81d7fd2abc5"
uuid: "820001c2-fdfc-8ab1-b098-bc6dbd9b1822"
horo: 1
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
  computationUuid: "94e885d2-7d42-8777-ba35-0253aca09f60"
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
      stageUuid: "81284d36-95e8-84b3-a4af-54a0048a86d1"
    - stage: seal
      stageUuid: "58afe757-2573-8837-8f00-e5be28d00a50"
    - stage: uuid
      stageUuid: "3700441c-29ae-871d-a7c7-de80662cb5e5"
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
