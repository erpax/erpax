---
name: money
description: "Use when reasoning about accounting/money — money fields — Payload money type fixes and currency handling."
atomPath: "accounting/money"
coordinate: "accounting/money · 5/round · 60d34bcc"
contentUuid: "b8f0d06c-2dee-51be-b29f-dd8ce634bf61"
diamondUuid: "022645c3-89d1-8243-9de8-71d4d58a74a7"
uuid: "60d34bcc-7f6d-8c8d-8604-89780fba3436"
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
  computationUuid: "270ae2cb-c2a5-88cf-bfbe-2b95ac1c7fd8"
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
      stageUuid: "ff7f2b51-b116-8e10-b5d8-a63cee349b57"
    - stage: seal
      stageUuid: "2f184d52-34f5-8b5c-bd59-5fbe5c22504e"
    - stage: uuid
      stageUuid: "bf998018-d9cd-8549-8f5a-d1febf7b6477"
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
