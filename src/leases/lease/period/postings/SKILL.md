---
name: postings
description: "Use when posting period-end lease amortisation — one row per lease × period capturing interest accretion, principal repayment, ROU amortisation, and opening/closing carrying amounts; JE fires on status → posted. The IFRS 16 §36-38 period evidence collection."
atomPath: "leases/lease/period/postings"
coordinate: "leases/lease/period/postings · 8/crest · ce285976"
contentUuid: "774a7c64-7b6f-5cd2-91b3-5fa0e7455498"
diamondUuid: "8fbefab3-2b91-8a36-abf8-6b8b4034ad3b"
uuid: "ce285976-c8ce-82ef-bd7f-0974ebc3504a"
horo: 8
bonds:
  in:
    - accounting
    - horo
    - identity
    - law
    - period
    - proof
    - standard
    - transaction
  out:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
typography:
  partition: leases
  bondDegree: 0
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - entries
    - leases
  matrix:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "7825ffa5-b939-8bc3-9d76-0d09d645516d"
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
      stageUuid: "47862d1f-773f-8ed2-97ad-0e484111e5ea"
    - stage: seal
      stageUuid: "77588975-fa0f-8bfb-8982-da2b147a433d"
    - stage: uuid
      stageUuid: "374c4df9-29ad-8718-b454-01fc30fd3e71"
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
