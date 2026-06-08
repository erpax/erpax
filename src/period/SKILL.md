---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: period · 1/base · e8994176
contentUuid: "ca5558ed-8d2f-5eb7-9e7a-3546cefa46f9"
diamondUuid: "4c38bf8b-87a1-8aad-8fb4-82ec8ab07726"
uuid: "e8994176-9e02-889a-8352-6e1aa4385ead"
horo: 1
bonds:
  in:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
  out:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
typography:
  partition: period
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "IAS-34"
  - "NIST-SP-800-92"
  - "SAF-T"
  - SOX
  - XBRL
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - accounting
    - date
    - fields
    - law
    - start
    - versions
  matrix:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
  backlinks:
    - accounting
    - billing
    - breed
    - certification
    - checker
    - date
    - fields
    - integration
    - law
    - locks
    - observation
    - organic
    - season
    - service
    - start
    - versions
    - withdrawal
signatures:
  computationUuid: "941105bf-4276-8c32-9728-3e5d3b3db968"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "ddb06c92-57a3-8231-826d-33169fa48015"
    - stage: links
      stageUuid: "2ab4c253-f5b1-8d0e-9e0f-a9f50a9bd094"
    - stage: horo
      stageUuid: "0f966cb1-e3bc-826e-800b-573f97c84a4d"
    - stage: seal
      stageUuid: "9e6e513b-7d18-86fb-9ea0-bc38f759f276"
    - stage: uuid
      stageUuid: "94353596-facc-8757-822f-419ceabbc807"
version: 2
---
# period

Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning.

Composes: [[date]] · [[fields]] · [[versions]] · [[accounting]] · [[start]].

## Standards
- ISO-8601-1:2019

**Law — [[law]]: a period is a date-range from [[start]] to end (or a fiscal-period code) that fixes the time-based [[accounting]] cutoff — which period a value falls in — and drives [[versions]] over that span.**
