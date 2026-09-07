---
name: modifications
description: "Use when recording a lease modification — classify as separate-lease (§44) or not-separate (§45/§46 partial/full termination), capture pre/post terms, and compute liability remeasurement + ROU adjustment. The IFRS-16 §44-46 modification register."
atomPath: "leases/lease/modifications"
coordinate: "leases/lease/modifications · 4/weave · cd1b7cb1"
contentUuid: "dedd85e6-0840-56f6-975a-f9fed9edf2f5"
diamondUuid: "92af2de1-74b7-80f0-b8e4-a77d088060e5"
uuid: "cd1b7cb1-c56f-8392-8c51-66ca331f8f6c"
horo: 4
typography:
  partition: leases
  bondDegree: 13
standards:
  - "IFRS IFRS-16 §44 separate-lease-criterion"
  - "IFRS IFRS-16 §45 not-separate-lease-modification"
  - "IFRS IFRS-16 §46 partial-or-full-termination"
  - "IFRS IFRS-16 §B43 §B44 lease-modification-examples"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls liability-completeness"
  - "US-GAAP ASC-842-10-25-11 ASC-842-10-25-12 ASC-842-10-25-13"
  - "US-GAAP ASC-842-10-25-8 lease-modification-classification"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "30f35370-8ceb-8bb3-a085-54ded7c2ec64"
  stages:
    - stage: path
      stageUuid: "387d6002-6c26-87de-975b-a8c131c33f94"
    - stage: trinity
      stageUuid: "930f33e2-d53e-88d8-8e7d-d4df04dbbba7"
    - stage: boundary
      stageUuid: "4586a0b4-a2dd-86c9-8c5b-5b63171e9904"
    - stage: links
      stageUuid: "0dbc3a2b-f709-86c7-abd8-6223b3ba9db9"
    - stage: horo
      stageUuid: "87ebeaa1-b7aa-82f8-92cb-413175b8f410"
    - stage: seal
      stageUuid: "55e2106c-237a-843c-a3b9-d4468f302d64"
    - stage: uuid
      stageUuid: "efc8bd9e-e5e4-8308-b84c-a608014ea22e"
version: 2
---
# lease-modifications

Lease Modifications — IFRS-16 §44-46 + ASC 842-10-25-12 structured.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IFRS-16 §44 separate-lease-criterion
- IFRS IFRS-16 §45 not-separate-lease-modification
- IFRS IFRS-16 §46 partial-or-full-termination
- IFRS IFRS-16 §B43 §B44 lease-modification-examples
- US-GAAP ASC-842-10-25-8 lease-modification-classification
- US-GAAP ASC-842-10-25-11 ASC-842-10-25-12 ASC-842-10-25-13
- ISO-19011:2018 audit-trail lease-modification-evidence
- SOX §404 internal-controls liability-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[Leases]] · [[leases/lease/period/postings]] · [[journal/entries]].
