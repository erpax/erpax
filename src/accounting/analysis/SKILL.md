---
name: analysis
description: "Use when reasoning about accounting/analysis — financial analysis engine — balance sheet, income statement, aging reports."
atomPath: "accounting/analysis"
coordinate: "accounting/analysis · 5/round · 20ae7d4f"
contentUuid: "da9ee518-1a17-52e3-9e8a-dcd2d89fc765"
diamondUuid: "2a2e03a2-8a6c-8206-aa89-b5b44581bcc0"
uuid: "20ae7d4f-d649-871f-b712-7bac760c78ac"
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
  computationUuid: "b48e1b90-41af-8bd6-87a8-b95a59abd927"
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
      stageUuid: "999efb94-bd96-8621-a4e5-313abe84e239"
    - stage: seal
      stageUuid: "4f5de8ab-e722-8db8-911c-5b5372e710d0"
    - stage: uuid
      stageUuid: "8bec8a11-580c-8cea-9d50-bdbc889f67b1"
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
