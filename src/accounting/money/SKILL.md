---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 7/descent · f0885a72"
contentUuid: "a0250c28-61d7-55f4-831e-8d0927d19bd2"
diamondUuid: "3be9f2fc-8eff-827f-bc11-199afb1e23a7"
uuid: "f0885a72-4450-8a5f-9a15-88cb7e781c7f"
horo: 7
bonds:
  in:
    - accounting
    - collapse
    - dated
    - law
    - merge
    - specification
    - sti
    - transfer
    - wallet
  out:
    - collapse
    - dated
    - law
    - merge
    - specification
    - sti
    - transfer
    - wallet
typography:
  partition: accounting
  bondDegree: 32
  neighbors: []
standards:
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
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
neighbors:
  wikilink:
    - accounting
    - balance
    - debit
    - law
    - path
  matrix:
    - collapse
    - dated
    - law
    - merge
    - specification
    - sti
    - transfer
    - wallet
  backlinks:
    - collapse
    - dated
    - law
    - merge
    - specification
    - sti
    - transfer
    - wallet
signatures:
  computationUuid: "3b680467-bec3-8656-a23e-f50b72727fb5"
  stages:
    - stage: path
      stageUuid: "7e882c4d-e6c8-8956-b1a4-ad503db0e0da"
    - stage: trinity
      stageUuid: "a8c601c0-e259-8e22-825f-e3c02fb438f4"
    - stage: boundary
      stageUuid: "ea1e0d0d-2412-8d39-b3b6-62b2701d4d60"
    - stage: links
      stageUuid: "889af43b-374e-8b97-9fc7-dc9b75a59587"
    - stage: horo
      stageUuid: "a8ba2f1f-2fd9-8401-b311-f5738ecbde08"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "b793be16-c77c-8fe3-b624-c07bd0e29591"
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
