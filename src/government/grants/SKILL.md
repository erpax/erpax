---
name: grants
description: "Use when recording or reporting public-sector grants, EU funds, or national subsidies — award, conditions, recognition method (deferred-income vs net-against-asset), clawback provisions, CSRD/BEPS traceability; IAS-20 §7-§39 + ASC 958-605. The government-grants IAS-20 register."
atomPath: government/grants
coordinate: government/grants · 1/base · 0c9b91d0
contentUuid: "63db2992-cc8e-59b8-9aa0-3d9566ebfd65"
diamondUuid: "55581511-ae99-8a99-9807-cddb20905ff4"
uuid: "0c9b91d0-f92a-8352-a63c-969947eac836"
horo: 1
bonds:
  in:
    - accounting
    - assets
    - government
    - identity
    - law
    - proof
    - provisions
    - standard
  out:
    - accounting
    - assets
    - identity
    - law
    - proof
    - provisions
    - standard
typography:
  partition: government
  bondDegree: 22
  neighbors: []
standards:
  - "EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)"
  - "IFRS IAS-20 §12 §13 income-or-asset-presentation"
  - "IFRS IAS-20 §17 §18 §28 §32 disclosure"
  - "IFRS IAS-20 §39 disclosure-government-assistance"
  - "IFRS IAS-20 §7 §8 §10 recognition"
  - "ISO-19011:2018 audit-trail grant-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "OECD BEPS Action 13 country-by-country (when grants ≥ threshold)"
  - "US-GAAP ASC-832 government-assistance-disclosure"
  - "US-GAAP ASC-958-605 contributions"
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - identity
    - law
    - proof
    - provisions
    - standard
  matrix:
    - accounting
    - assets
    - identity
    - law
    - proof
    - provisions
    - standard
  backlinks:
    - accounting
    - assets
    - identity
    - law
    - proof
    - provisions
    - standard
signatures:
  computationUuid: "289396b5-fd6b-8b6a-810d-b8dc70a94787"
  stages:
    - stage: path
      stageUuid: "2bb7f38f-4966-81c1-93cc-90dc05023fcb"
    - stage: trinity
      stageUuid: "599c5286-edc1-8e9a-b26f-00097d871b2a"
    - stage: boundary
      stageUuid: "72349bab-481a-800b-84c6-6b62430072ed"
    - stage: links
      stageUuid: "19d20619-ea59-8250-a52d-66611330fcca"
    - stage: horo
      stageUuid: "d571bcb2-edca-8fdd-93bd-6f24b907a0b4"
    - stage: seal
      stageUuid: "c7df1975-8ba3-867f-bb59-ed54fa7cd2db"
    - stage: uuid
      stageUuid: "16681ba7-834a-8b51-afea-0561a5915820"
version: 2
---
# government-grants

Government Grants — IAS-20 + ASC 958-605 register of public-sector.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-20 §7 §8 §10 recognition
- IFRS IAS-20 §12 §13 income-or-asset-presentation
- IFRS IAS-20 §17 §18 §28 §32 disclosure
- IFRS IAS-20 §39 disclosure-government-assistance
- US-GAAP ASC-958-605 contributions
- US-GAAP ASC-832 government-assistance-disclosure
- ISO-19011:2018 audit-trail grant-evidence
- EU CSRD ESRS 2 sbm-3 material-impacts (EU funds traceability)
- OECD BEPS Action 13 country-by-country (when grants ≥ threshold)
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Provisions]] · [[fixed/assets]] · [[accounting]] · [[proof]] · [[identity]] · [[standard]].

**Law — [[law]]: a government grant is recognized only as its attached conditions are met (IAS-20) by one of two presentations — deferred income or netted against the asset — and remains clawback-exposed, the public subsidy carried with full traceability.**
