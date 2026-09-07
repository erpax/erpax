---
name: receivable
description: "Use when reasoning about receivable — The A/R field factories: the shapes an invoice carries — invoice number, status, due date, payment terms, A/R analysis. (the type module) is a set of these; this atom is the one."
atomPath: receivable
coordinate: "receivable · 2/share · f47e8e63"
contentUuid: "826ea33a-051b-5621-838b-30d48ed0537c"
diamondUuid: "e2ed385f-55b9-8fe7-ada5-9e16fdd78010"
uuid: "f47e8e63-cfc9-8a2c-8952-63a7561cf1ea"
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
  computationUuid: "f6e4f683-a40f-884f-b122-c93e86a1028e"
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
      stageUuid: "8f2e528d-fdcc-8bd9-a519-123b97bb7d6e"
    - stage: seal
      stageUuid: "58afe757-2573-8837-8f00-e5be28d00a50"
    - stage: uuid
      stageUuid: "7a8fe31e-8fb3-8d2f-8250-6352fbc193ef"
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
