---
name: payable
description: "Use when reasoning about payable — The A/P field factories: the shapes a bill carries — bill number, vendor, due date, payment terms, A/P analysis. (the type module) is a set of these; this atom is the one."
atomPath: payable
coordinate: "payable · 5/round · 1383875d"
contentUuid: "225f6fdf-ea89-5906-9dda-4065dfe01b58"
diamondUuid: "eaa0d632-5dbe-821c-9592-66a12c90e8c6"
uuid: "1383875d-fc87-8eec-b852-b1e18877dd46"
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
  computationUuid: "b2f9e785-8592-8573-a2ef-f604546e6294"
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
      stageUuid: "a444c90c-78c5-8d4e-8b99-25ca834bbf92"
    - stage: seal
      stageUuid: "61a2c646-d323-8b2a-9ef5-6965c6a23fa2"
    - stage: uuid
      stageUuid: "4cb500de-601c-8fde-b15b-296a637b6858"
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
