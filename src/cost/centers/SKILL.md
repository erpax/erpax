---
name: centers
description: "Use when tagging JE lines with a secondary analytical dimension for segment/departmental P&L — regions, countries, business units, departments, teams, projects, profit centers, cost pools with allocation rules — hierarchical via parent; IFRS-8 / ASC-280 segment reporting without polluting the chart of accounts. The canonical cost-center dimension master."
atomPath: cost/centers
coordinate: cost/centers · 5/round · 1c9da18a
contentUuid: "7a17ec48-6c3d-56ae-8d3a-701a4214e8db"
diamondUuid: "65fdedda-a2c0-8276-80bb-a3a2cbafb8a5"
uuid: "1c9da18a-a4fa-827f-acae-e58a0c1a369d"
horo: 5
bonds:
  in:
    - access
    - accounting
    - budgetvariance
    - cost
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
  out:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
typography:
  partition: cost
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-1 §99 statement-of-comprehensive-income"
  - "IFRS IFRS-8 operating-segments"
  - "ISO-19011:2018 audit-trail"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes geographic-segment-tagging"
  - "ISO-4217:2015 currency-codes"
  - "SOX §302 disclosure-controls segment-disclosure"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - fields
    - hooks
    - identity
    - law
    - positions
    - proof
  matrix:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
  backlinks:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
signatures:
  computationUuid: "eb74f79d-a53e-8ad3-a1be-5482ea365a52"
  stages:
    - stage: path
      stageUuid: "4e92b35a-d309-88ba-8cd6-2f9f169a7ff6"
    - stage: trinity
      stageUuid: "d472aaba-609f-8155-8791-233c7e4cbb4b"
    - stage: boundary
      stageUuid: "240a1429-491c-8dbd-842e-36a6d5a2121f"
    - stage: links
      stageUuid: "9882e617-4c2f-8ec3-9c4f-bce70e95c6bb"
    - stage: horo
      stageUuid: "a4660ead-0f0a-84fd-b26a-5e831a1903ed"
    - stage: seal
      stageUuid: "0df70517-a153-8442-bc15-c1297815be2a"
    - stage: uuid
      stageUuid: "cf21abe6-829f-825b-8cc1-afdc11d46949"
version: 2
---
# cost-centers

Cost Centers — analytical dimension for GL postings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes geographic-segment-tagging
- ISO-4217:2015 currency-codes
- IFRS IAS-1 §99 statement-of-comprehensive-income
- IFRS IFRS-8 operating-segments
- US-GAAP ASC-280 segment-reporting
- ISO-19011:2018 audit-trail
- SOX §302 disclosure-controls segment-disclosure
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a cost-center is a SECONDARY analytical dimension on GL postings (region·unit·department·project, hierarchical via parent) for segment/departmental P&L — it tags JE lines without polluting the chart of accounts.**

Composes: [[hooks]] · [[access]] · [[fields]] · [[accounting]] · [[identity]] · [[proof]] · [[cost/centers/job/positions]].
