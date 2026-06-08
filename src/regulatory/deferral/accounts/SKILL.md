---
name: accounts
description: "Use when recognising IFRS 14 regulatory-deferral balances — under-recovery assets or over-recovery liabilities — for utilities or telcos under price-cap regimes on first-time IFRS adoption (§16 continuation of previous GAAP), tracking recovery period and period movements. The IFRS 14 regulatory-deferral register."
atomPath: regulatory/deferral/accounts
coordinate: regulatory/deferral/accounts · 1/base · 15b5affa
contentUuid: "d8de8695-e6ae-5f8b-9e9f-a06d64cde661"
diamondUuid: "41174711-cf5e-82f1-824c-20ed597cd8d1"
uuid: "15b5affa-5db0-8e0d-8a2a-177a2309e4c2"
horo: 1
bonds:
  in:
    - access
    - accounting
    - auth
    - deferral
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  out:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
typography:
  partition: regulatory
  bondDegree: 44
  neighbors: []
standards:
  - "IFRS IFRS-14 §16 continuation-of-previous-GAAP"
  - "IFRS IFRS-14 §27 disclosure-requirements"
  - "IFRS IFRS-14 §3 scope-first-time-adopter"
  - "ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
  matrix:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  backlinks:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
signatures:
  computationUuid: "ab3b733d-fdfc-83df-a1b2-3c85194848cb"
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
      stageUuid: "dd0c8490-3986-861e-baed-c5d29e6180d9"
    - stage: seal
      stageUuid: "647cf490-f714-831f-b976-c8c98a57ba6c"
    - stage: uuid
      stageUuid: "e9d45db7-1c76-87a7-8bf4-6ac9b426a49c"
version: 2
---
# regulatory-deferral-accounts

Regulatory Deferral Accounts — IFRS 14 first-time-adopter rate-.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IFRS-14 §3 scope-first-time-adopter
- IFRS IFRS-14 §16 continuation-of-previous-GAAP
- IFRS IFRS-14 §27 disclosure-requirements
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[collections]].
