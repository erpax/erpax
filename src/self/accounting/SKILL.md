---
name: accounting
description: "Use when erpax runs its OWN books — auto-booking subscription revenue (IFRS-15), infra/payroll/supplier/tax costs, scheduling regulatory filings (FINREP/COREP/CSRD/VAT) and obligations, and checking nothing is overdue (Conservation Law 26, checkSelfAccountingComplete). The self as a double-entry gateway; revenue is the credit, cost the debit, the filing the proof."
atomPath: "self/accounting"
coordinate: "self/accounting · 5/round · 347b6b8f"
contentUuid: "dca8d141-4dd2-551b-bb71-12b303da4b36"
diamondUuid: "93387b27-f602-823f-9319-e310f38db8e3"
uuid: "347b6b8f-b0ec-8797-ae64-283310b8aaeb"
horo: 5
typography:
  partition: self
  bondDegree: 824
standards:
  - "CSRD 2022/2464 + ESRS E1-S4 + IFRS S1/S2"
  - EU EBA FINREP + COREP technical standards
  - "EU VAT Directive 2006/112/EC + DAC8"
  - "EU-CSRD"
  - "EU-ESRS"
  - "EU-VAT-Directive"
  - "IFRS IAS-18 (deprecated, superseded by IFRS-15)"
  - "IFRS IAS-18 (deprecated, superseded by IFRS-15)`"
  - "IFRS IFRS-15 §31-§45 (revenue recognition)"
  - "IFRS IFRS-15 §31-§45 (revenue recognition)`"
  - "IFRS-15"
  - "IFRS-S1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f7929a33-723c-8667-b55f-b96b0f671455"
  stages:
    - stage: path
      stageUuid: "cfa69d58-ab80-8fce-8919-5079e6b8c540"
    - stage: trinity
      stageUuid: "66978444-1f6a-8656-badd-13b8c2e1d7cf"
    - stage: boundary
      stageUuid: "60b4163d-dc77-8229-a057-02a6b9116b11"
    - stage: links
      stageUuid: "a04c649f-3004-8cac-99b5-b89080222934"
    - stage: horo
      stageUuid: "e359ab9f-162c-8e0f-9744-b0c59dc1285b"
    - stage: seal
      stageUuid: "bebb7e3e-120b-8180-b647-3b3950e329fd"
    - stage: uuid
      stageUuid: "c739625c-c956-8793-91f0-2a25f9dde3b3"
version: 2
---
# self-accounting — erpax books itself (under [[self]])

FORM: **the erpax-platform tenant runs its own [[accounting]] through erpax.** [[revenue]] (IFRS-15 §31–§45, from Stripe), [[cost]]s (infra/payroll/supplier/tax), regulatory filings (FINREP · COREP · CSRD · IFRS-S1/S2 · VAT) and obligations are booked/scheduled, and `checkSelfAccountingComplete` (Conservation Law 26) asserts every revenue is booked, every filing filed by its due date, every obligation paid — surfacing the overdue tail. This is the literal double-[[entry]] gateway of the [[law]]: each booking posts a balanced entry (revenue ⊕ obligation, cost ⊕ filing), and balanced books = zero net [[entropy]].

Matter-twin: `src/self/accounting/index.ts` — `bookRevenue` · `bookCost` · `scheduleFiling` · `scheduleObligation` · `checkSelfAccountingComplete`.
Composes: [[self]] · [[accounting]] · [[entry]] · [[revenue]] · [[cost]] · [[standard]] · [[reconcile]] · [[balance]] · [[gate]] · [[law]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §31-§45 (revenue recognition)`
- `@standard IFRS IAS-18 (deprecated, superseded by IFRS-15)`

- IFRS 15 §31–§45 (revenue recognition); EU VAT Directive 2006/112/EC; EBA FINREP/COREP; CSRD 2022/2464 + ESRS
- Conservation Law 26 — self-accounting-complete

## Common mistakes
- Booking revenue without linking the GL journal entry — an unbooked revenue (`journalEntryId` unset) is an unbalanced post, counted by `checkSelfAccountingComplete`.
- Treating a missed filing/obligation as advisory — Law 26 makes overdue items a RED gate (the books don't balance until they are filed/paid).

**Law — [[gate]]** erpax's books must balance: every revenue booked, every filing filed by its due date, every obligation paid — or `checkSelfAccountingComplete` returns the overdue tail and the gate is red.
