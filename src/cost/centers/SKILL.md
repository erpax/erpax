---
name: centers
description: "Use when tagging JE lines with a secondary analytical dimension for segment/departmental P&L — regions, countries, business units, departments, teams, projects, profit centers, cost pools with allocation rules — hierarchical via parent; IFRS-8 / ASC-280 segment reporting without polluting the chart of accounts. The canonical cost-center dimension master."
atomPath: "cost/centers"
coordinate: "cost/centers · 2/share · 388e1279"
contentUuid: "7158081b-0b4e-5539-a5e9-690c079d1ce9"
diamondUuid: "688b561a-2405-870a-aa1c-6d17bcf606c1"
uuid: "388e1279-998a-8c56-97fe-43240fcc604c"
horo: 2
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
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes geographic-segment-tagging"
  - "ISO-3166-1:2020 country-codes geographic-segment-tagging`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "SOX §302 disclosure-controls segment-disclosure"
  - "US-GAAP ASC-280 segment-reporting"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "a89c4fdb-b0d1-818d-8aaa-3ca027b0187e"
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
      stageUuid: "5fd0d81b-e9fd-8e5b-95d3-ede1e2dae4f2"
    - stage: seal
      stageUuid: "0df70517-a153-8442-bc15-c1297815be2a"
    - stage: uuid
      stageUuid: "46822ed4-f993-8db2-a04a-e940c72d74c3"
version: 2
---
# cost-centers

Cost Centers — analytical dimension for GL postings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes geographic-segment-tagging`
- `@standard ISO-4217:2015 currency-codes`

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
