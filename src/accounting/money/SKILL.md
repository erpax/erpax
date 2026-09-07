---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 2/share · b974b23f"
contentUuid: "2fa5737c-374b-5910-9e2e-b2b989b13275"
diamondUuid: "172e9b27-0212-8807-9cc3-ec5d5ad53933"
uuid: "b974b23f-ed72-8d6a-8256-ced2a3678580"
horo: 2
typography:
  partition: accounting
  bondDegree: 45
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
  computationUuid: "81a71c8c-9ab3-8e63-92c1-d75ab4725934"
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
      stageUuid: "e5ae45e3-5f74-8451-9705-390918c58327"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "828c2f16-3b57-81e9-91d3-04a575a7e190"
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
