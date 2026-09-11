---
name: analysis
description: "Use when reasoning about accounting/analysis — financial analysis engine — balance sheet, income statement, aging reports."
atomPath: "accounting/analysis"
coordinate: "accounting/analysis · 8/crest · a0d6a212"
contentUuid: "8dc22240-39a6-5816-84ee-c249d349a964"
diamondUuid: "1257ffd0-8b2d-8d4c-811b-94f4137a5198"
uuid: "a0d6a212-6dce-894b-ad73-b386a160f329"
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
  computationUuid: "e3f14fa9-a8f3-8a31-afe3-372b0a7e25ac"
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
      stageUuid: "ec8a1804-c59f-8ca6-b073-bf7a0515f0ee"
    - stage: seal
      stageUuid: "4f5de8ab-e722-8db8-911c-5b5372e710d0"
    - stage: uuid
      stageUuid: "7970fdbf-3a90-8a26-bdca-e5a1f0b69c20"
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
