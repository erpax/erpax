---
name: payable
description: "Use when reasoning about payable — The A/P field factories: the shapes a bill carries — bill number, vendor, due date, payment terms, A/P analysis. (the type module) is a set of these; this atom is the one."
atomPath: payable
coordinate: "payable · 5/round · c60a0d53"
contentUuid: "a6d13c0b-b54f-521e-8c4c-f54c69b329a1"
diamondUuid: "e7e95f6f-65cd-8e2c-9afe-a29ee0bc1392"
uuid: "c60a0d53-e1e7-85fc-8622-b0d356fd6777"
horo: 5
typography:
  partition: payable
  bondDegree: 40
standards:
  - "EN-16931:2017 §BG-4 seller"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "83f0902f-52cc-898b-aeb1-e939b151a252"
  stages:
    - stage: path
      stageUuid: "568e663c-e2ed-8f3a-85e9-ec08ec29fdd2"
    - stage: trinity
      stageUuid: "9537c8fb-2f73-811c-969a-b47b7fce45a3"
    - stage: boundary
      stageUuid: "8c9d7b29-37a1-8bac-88b5-54126b8534b6"
    - stage: links
      stageUuid: "150ebdb6-66c5-84ef-b645-4028645eb3ed"
    - stage: horo
      stageUuid: "df4f5018-b407-8a4d-aa88-c5984ce088c8"
    - stage: seal
      stageUuid: "61a2c646-d323-8b2a-9ef5-6965c6a23fa2"
    - stage: uuid
      stageUuid: "5039232e-329e-82bd-819a-088529a3455b"
version: 2
---
# payable — the singular the `payables` collection is a set of

The A/P field factories: the shapes a bill carries — bill number, vendor, due date, payment terms,
A/P analysis. `payables` (the type module) is a set of these; this atom is the one.

That pairing is not decoration. [[balance]] reads the corpus as a double entry — a plural atom is a
COLLECTION and its singular is the MODEL, and a plural with no singular is a store with no type.
This atom held `index.ts` and `test.ts` and **no SKILL.md**, so the [[matrix]] could not see it —
and `payables` therefore read as an orphan for as long as both existed. The code was there; the
address was not.

A bill is the A/P mirror of an invoice ([[receivable]]), and the two field sets are deliberately
NOT one: a bill becomes live on **approval**, an invoice on **issue**, and folding that difference
away is how the AR/AP hooks broke once already ([[invoices]]/hooks/transition).

**Honest boundary.** These are field FACTORIES — shapes, not behaviour. What a bill means when
posted lives in the GL hooks; what it owes lives in `aging.service`. This atom claims the EN-16931
and ASC-405 shapes it declares, and nothing about whether a caller assembles them correctly.

**Law — [[law]]: a plural atom is a collection and its singular is the model. An atom with matter
and no SKILL is invisible to the fold, and its plural reads as a store with no type.**

## Standards

- **EN-16931:2017 §BG-4** — seller.
- **ISO-4217:2015** — currency codes.
- **US-GAAP ASC-405** — liabilities.

Composes: [[balance]] · [[receivable]] · [[field]] · [[law]].
