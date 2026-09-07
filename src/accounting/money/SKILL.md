---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 8/crest · 56386bbf"
contentUuid: "d31077c2-2235-5c6c-951f-3f5a6ba1feea"
diamondUuid: "af5a9345-1693-899d-8f0a-0363aea87b74"
uuid: "56386bbf-6875-891a-b5c0-dd1dc3bfd5cf"
horo: 8
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
  computationUuid: "6bfefe0b-722d-8189-bf6e-6d3d4ea2f976"
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
      stageUuid: "595e2a25-2c86-850f-90b2-db4ddb378da3"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "8b16f65c-10fd-8206-9867-efa9a028dcba"
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
