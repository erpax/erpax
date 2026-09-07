---
name: analysis
description: "Use when reasoning about accounting/analysis — financial analysis engine — balance sheet, income statement, aging reports."
atomPath: "accounting/analysis"
coordinate: "accounting/analysis · 5/round · b90df87e"
contentUuid: "6e748deb-41a0-5a6a-902b-6ed475bdd8b4"
diamondUuid: "a8fac073-e8ae-802a-ab89-59c69f01798e"
uuid: "b90df87e-5a66-85b3-8c0f-e580a9c831cf"
horo: 5
typography:
  partition: accounting
  bondDegree: 27
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time as-of-date"
  - "ISO-8601-1:2019 date-time as-of-date`"
  - "US-GAAP ASC-205 presentation-of-financial-statements"
  - "US-GAAP ASC-230 statement-of-cash-flows"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "36c0442f-746d-8416-8dbe-543aa3ff21bb"
  stages:
    - stage: path
      stageUuid: "a0217656-49f0-8e3e-9222-f035fc6d5adb"
    - stage: trinity
      stageUuid: "d6ba15fa-ca2a-83cc-972d-ebc713d00d71"
    - stage: boundary
      stageUuid: "229d4a14-dd18-82c8-8906-7e68f232aab1"
    - stage: links
      stageUuid: "2b59176f-e3df-886c-a79a-f658683cd92f"
    - stage: horo
      stageUuid: "f517dbe2-9509-8e77-a6f4-8a37ef2068ce"
    - stage: seal
      stageUuid: "4f5de8ab-e722-8db8-911c-5b5372e710d0"
    - stage: uuid
      stageUuid: "a81d20e4-60d4-8b7d-b9a3-3b9cffc250e4"
version: 2
---
# accounting/analysis

Financial analysis engine — balance sheet, income statement, aging reports.

**Law — [[law]]: accounting/analysis composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/analysis/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time as-of-date`
