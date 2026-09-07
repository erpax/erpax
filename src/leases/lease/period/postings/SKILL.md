---
name: postings
description: "Use when posting period-end lease amortisation — one row per lease × period capturing interest accretion, principal repayment, ROU amortisation, and opening/closing carrying amounts; JE fires on status → posted. The IFRS 16 §36-38 period evidence collection."
atomPath: "leases/lease/period/postings"
coordinate: "leases/lease/period/postings · 4/weave · c79629f5"
contentUuid: "17eafafa-b45c-5ebb-813d-d0cd72b0f849"
diamondUuid: "4b9d60cb-46af-8452-91c2-94e8c9e8272c"
uuid: "c79629f5-375e-8cc0-afa5-eba5211b3498"
horo: 4
typography:
  partition: leases
  bondDegree: 28
standards:
  - "IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement"
  - "IFRS IFRS-16 §36-§38 lease-liability-amortised-cost"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period-start period-end"
  - "ISO-8601-1:2019 date-time period-start period-end`"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-842-20-35 lessee-subsequent-measurement"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "00081d2e-2b61-80cb-95bc-d23685b22786"
  stages:
    - stage: path
      stageUuid: "4408dd1b-bdf1-89da-b23f-91b2dc4bdef9"
    - stage: trinity
      stageUuid: "d62ec8a2-c593-81fc-90f5-1e294e2661b4"
    - stage: boundary
      stageUuid: "e9e0257e-2194-853f-af43-4d87a4b23306"
    - stage: links
      stageUuid: "e0c03198-972f-81dc-8bba-69dc93458546"
    - stage: horo
      stageUuid: "c0de73d6-f53b-8ca5-81c8-88d9c091a3f5"
    - stage: seal
      stageUuid: "77588975-fa0f-8bfb-8982-da2b147a433d"
    - stage: uuid
      stageUuid: "9e797441-2528-852e-87ff-a8161b3fe75d"
version: 2
---
# lease-period-postings

Lease Period Postings — period-by-period IAS 16 / ASC 842 evidence.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time period-start period-end`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time period-start period-end
- ISO-4217:2015 currency-codes
- IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
- IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
- US-GAAP ASC-842-20-35 lessee-subsequent-measurement
- ISO-19011:2018 audit-trail period-evidence
- SOX §404 internal-controls capital-asset-register
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[Leases]] · [[journal/entries]].
