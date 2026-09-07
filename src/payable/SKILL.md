---
name: payable
description: "Use when reasoning about payable — The A/P field factories: the shapes a bill carries — bill number, vendor, due date, payment terms, A/P analysis. (the type module) is a set of these; this atom is the one."
atomPath: payable
coordinate: "payable · 2/share · d9a216f4"
contentUuid: "ed5e0f26-ba18-5a21-b1c0-61aa3374e0f2"
diamondUuid: "d14ea096-80c0-8fc9-b873-a6c50838d3c0"
uuid: "d9a216f4-bdc2-844a-aeff-7cd7cfb68a0a"
horo: 2
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
  computationUuid: "a92883b4-0175-8a57-bf91-9a6539c2c050"
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
      stageUuid: "f477ae0c-2fe5-80bd-b9e2-b5cca7226335"
    - stage: seal
      stageUuid: "61a2c646-d323-8b2a-9ef5-6965c6a23fa2"
    - stage: uuid
      stageUuid: "20845e81-38c9-86f2-9a95-e84c61d10080"
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
