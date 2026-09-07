---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 5/round · 590e6dba"
contentUuid: "33bf8217-6647-5000-9a34-b7f6c16ad84c"
diamondUuid: "b5a5ad54-6f0e-8a01-b587-e5593c7059b6"
uuid: "590e6dba-a589-8a50-b3d4-972ecf683783"
horo: 5
typography:
  partition: accounting
  bondDegree: 37
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "IEEE-754"
  - "IEEE-754-2019 binary-floating-point avoid-for-money"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "US-GAAP ASC-210 balance-sheet"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "84daae66-22f4-80c5-8e7c-ddfec12687da"
  stages:
    - stage: path
      stageUuid: "7e882c4d-e6c8-8956-b1a4-ad503db0e0da"
    - stage: trinity
      stageUuid: "a8c601c0-e259-8e22-825f-e3c02fb438f4"
    - stage: boundary
      stageUuid: "4a022ce2-8ef5-85b5-a5ea-6e65e65e7dba"
    - stage: links
      stageUuid: "69f2b82a-f219-8843-98ad-76662a15a90f"
    - stage: horo
      stageUuid: "402cc6d7-c345-81cd-b78e-219050037878"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "b7e22faa-ac33-8a28-a410-716ef0637680"
version: 2
---
# accounting/money

Money fields — Payload money type fixes and currency handling.

**Law — [[law]]: accounting/money composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/money/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
