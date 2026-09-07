---
name: accounts
description: "Use when recognising IFRS 14 regulatory-deferral balances — under-recovery assets or over-recovery liabilities — for utilities or telcos under price-cap regimes on first-time IFRS adoption (§16 continuation of previous GAAP), tracking recovery period and period movements. The IFRS 14 regulatory-deferral register."
atomPath: "regulatory/deferral/accounts"
coordinate: "regulatory/deferral/accounts · 5/round · b9670d4d"
contentUuid: "f2aea9f3-8d0a-5f98-a31b-31d5b5a7d95b"
diamondUuid: "af20230e-48ea-814f-af59-ab5600a60f1d"
uuid: "b9670d4d-8abd-814e-a991-fd6803531387"
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
  computationUuid: "afac680f-7211-8343-9ee1-1dc6b87ba8ca"
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
      stageUuid: "47cd6bd5-507d-8000-a448-7810a1098edb"
    - stage: seal
      stageUuid: "647cf490-f714-831f-b976-c8c98a57ba6c"
    - stage: uuid
      stageUuid: "51f95cc3-172e-8949-b873-eb3e2b5ee409"
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
