---
name: accounts
description: "Use when recognising IFRS 14 regulatory-deferral balances — under-recovery assets or over-recovery liabilities — for utilities or telcos under price-cap regimes on first-time IFRS adoption (§16 continuation of previous GAAP), tracking recovery period and period movements. The IFRS 14 regulatory-deferral register."
atomPath: "regulatory/deferral/accounts"
coordinate: "regulatory/deferral/accounts · 5/round · d1935a5a"
contentUuid: "f4ffd7f2-f16d-5fee-908e-70b4590ef373"
diamondUuid: "a1965afa-a3ce-8e4a-b467-cc526fea7038"
uuid: "d1935a5a-796e-8692-9562-9dc334101b3a"
horo: 5
typography:
  partition: regulatory
  bondDegree: 44
standards:
  - "IFRS IFRS-14 §16 continuation-of-previous-GAAP"
  - "IFRS IFRS-14 §16 continuation-of-previous-GAAP`"
  - "IFRS IFRS-14 §27 disclosure-requirements"
  - "IFRS IFRS-14 §27 disclosure-requirements`"
  - "IFRS IFRS-14 §3 scope-first-time-adopter"
  - "IFRS IFRS-14 §3 scope-first-time-adopter`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "34067278-a3d9-84c6-857a-8d6c4c0e37f7"
  stages:
    - stage: path
      stageUuid: "564ada6f-8086-8a40-9e0d-0c7230759692"
    - stage: trinity
      stageUuid: "4242bed5-99aa-8332-b3c5-0466bca26a3f"
    - stage: boundary
      stageUuid: "00a36538-dd28-8271-8fbf-9dd793250d23"
    - stage: links
      stageUuid: "596849f5-095a-83d7-8315-f2b23e4905e8"
    - stage: horo
      stageUuid: "5648e9f9-b272-8ba3-839a-792bf9304940"
    - stage: seal
      stageUuid: "647cf490-f714-831f-b976-c8c98a57ba6c"
    - stage: uuid
      stageUuid: "cd624c8f-9f6c-8092-9cf3-375eb4027750"
version: 2
---
# regulatory-deferral-accounts

Regulatory Deferral Accounts — IFRS 14 first-time-adopter rate-.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-14 §3 scope-first-time-adopter`
- `@standard IFRS IFRS-14 §16 continuation-of-previous-GAAP`
- `@standard IFRS IFRS-14 §27 disclosure-requirements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`

- IFRS IFRS-14 §3 scope-first-time-adopter
- IFRS IFRS-14 §16 continuation-of-previous-GAAP
- IFRS IFRS-14 §27 disclosure-requirements
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[collections]].
