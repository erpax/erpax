---
name: postings
description: "Use when posting period-end lease amortisation — one row per lease × period capturing interest accretion, principal repayment, ROU amortisation, and opening/closing carrying amounts; JE fires on status → posted. The IFRS 16 §36-38 period evidence collection."
atomPath: leases/lease/period/postings
coordinate: leases/lease/period/postings · 8/crest · 947ca018
contentUuid: "d4c53448-5201-539e-a328-a07cc708712c"
diamondUuid: "7fe8e5ec-7e1e-83c2-8c7f-5b0bf4590d32"
uuid: "947ca018-5803-8452-a9a8-07c5c11aa29c"
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
  - "ISO-19011:2018 audit-trail period-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period-start period-end"
  - "SOX §404 internal-controls capital-asset-register"
  - "US-GAAP ASC-842-20-35 lessee-subsequent-measurement"
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
  computationUuid: "19a8face-55a8-8a9e-925b-301aa458ead7"
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
      stageUuid: "780d4424-be4e-8dbb-8d46-5d0df8ef6ae0"
    - stage: seal
      stageUuid: "77588975-fa0f-8bfb-8982-da2b147a433d"
    - stage: uuid
      stageUuid: "766c11f5-7a8c-83a1-b23f-56f09aa7a04c"
version: 2
---
# lease-period-postings

Lease Period Postings — period-by-period IAS 16 / ASC 842 evidence.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time period-start period-end
- ISO-4217:2015 currency-codes
- IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
- IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
- US-GAAP ASC-842-20-35 lessee-subsequent-measurement
- ISO-19011:2018 audit-trail period-evidence
- SOX §404 internal-controls capital-asset-register
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[Leases]] · [[journal/entries]].
