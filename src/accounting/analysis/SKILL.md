---
name: analysis
description: "Use when reasoning about accounting/analysis — financial analysis engine — balance sheet, income statement, aging reports."
atomPath: "accounting/analysis"
coordinate: "accounting/analysis · 1/base · 6b8d0640"
contentUuid: "edb5724a-948e-570b-ae00-3938191c2d10"
diamondUuid: "870ce737-e0c8-88eb-8add-4382c28171bf"
uuid: "6b8d0640-4a41-8916-a5d6-3c17fd370a7a"
horo: 1
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
  computationUuid: "ac77dcf5-53b9-89dc-b213-152cd68cf74f"
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
      stageUuid: "e21965d7-1280-82c1-8692-2829d1b729ee"
    - stage: seal
      stageUuid: "4f5de8ab-e722-8db8-911c-5b5372e710d0"
    - stage: uuid
      stageUuid: "4416a2b3-1d13-8b1b-8d0a-31f195c8cde6"
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
