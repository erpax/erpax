---
name: centers
description: "Use when tagging JE lines with a secondary analytical dimension for segment/departmental P&L — regions, countries, business units, departments, teams, projects, profit centers, cost pools with allocation rules — hierarchical via parent; IFRS-8 / ASC-280 segment reporting without polluting the chart of accounts. The canonical cost-center dimension master."
atomPath: "cost/centers"
coordinate: "cost/centers · 4/weave · f90f454a"
contentUuid: "e79175e7-aa46-52b5-8ba9-37c355e81bff"
diamondUuid: "e9dd9d23-f6a8-8abd-8c57-f3465643b379"
uuid: "f90f454a-b0b5-8020-afe8-2ed66d524af6"
horo: 4
typography:
  partition: cost
  bondDegree: 48
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
signatures:
  computationUuid: "6a3f8b5a-5e82-84cc-95b1-bdc76931946e"
  stages:
    - stage: path
      stageUuid: "4e92b35a-d309-88ba-8cd6-2f9f169a7ff6"
    - stage: trinity
      stageUuid: "d472aaba-609f-8155-8791-233c7e4cbb4b"
    - stage: boundary
      stageUuid: "240a1429-491c-8dbd-842e-36a6d5a2121f"
    - stage: links
      stageUuid: "27d8c9a0-9099-8236-b7a8-be92e75c3455"
    - stage: horo
      stageUuid: "695ad6bb-4c7d-818a-a079-e0f00a638975"
    - stage: seal
      stageUuid: "1e3c2c75-34fd-8279-986f-9b429b8fc616"
    - stage: uuid
      stageUuid: "15372146-1a77-8c5f-8c19-df4444ad4f75"
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

Composes: [[hooks]] · [[access]] · [[field]] · [[accounting]] · [[identity]] · [[proof]] · [[cost/centers/job/positions]].
