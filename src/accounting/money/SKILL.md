---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 1/base · 070e3ae5"
contentUuid: "79eb41d2-5bfc-5694-b43b-c4a05d5c67d4"
diamondUuid: "f14fa8e5-86ec-8747-a93d-80edcd636d0a"
uuid: "070e3ae5-e1ca-8aaf-8332-c50819528c83"
horo: 1
typography:
  partition: accounting
  bondDegree: 24
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
  computationUuid: "d6afd770-d5c7-8b26-96bc-ecbb19350286"
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
      stageUuid: "4666548b-2029-8e10-a16e-29bf2fef7fd2"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "47ae79ea-b4bc-8c73-9cb0-ef85b79e5dd5"
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
