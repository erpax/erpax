---
name: analysis
description: "Use when reasoning about accounting/analysis — financial analysis engine — balance sheet, income statement, aging reports."
atomPath: "accounting/analysis"
coordinate: "accounting/analysis · 8/crest · a2f8c2e4"
contentUuid: "764a33ff-eb5d-5cdd-8fc5-affe85d9f80c"
diamondUuid: "5cc27e23-c9e9-8c6b-8380-ce68038b18dc"
uuid: "a2f8c2e4-1339-8432-9ae3-656fcdb8415c"
horo: 8
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
  computationUuid: "1f31bc0b-c0ab-818d-89c4-cbf78741377b"
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
      stageUuid: "cb161c5a-05fc-8c0c-b6ab-8f5df565273a"
    - stage: seal
      stageUuid: "4f5de8ab-e722-8db8-911c-5b5372e710d0"
    - stage: uuid
      stageUuid: "5e0eb793-6646-8664-972c-fce116705589"
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
