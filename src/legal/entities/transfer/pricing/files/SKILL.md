---
name: files
description: "Use when documenting intercompany transfer pricing per OECD BEPS Action 13 — Master File, Local File, and Country-by-Country Report per jurisdiction per fiscal year — TP method, CbCR aggregates, Pillar Two applicability, filing deadlines and status. The BEPS Action 13 TP documentation register."
atomPath: "legal/entities/transfer/pricing/files"
coordinate: "legal/entities/transfer/pricing/files · 2/share · 191d04df"
contentUuid: "4a197211-2daf-53d6-bf87-725792931312"
diamondUuid: "b3b83a9c-b79a-89c3-a934-ff548fd046d6"
uuid: "191d04df-9d7e-8c10-9c07-5a88a90ecad9"
horo: 2
typography:
  partition: legal
  bondDegree: 18
standards:
  - "EU 2016/881 administrative-cooperation-tax"
  - "EU DAC-4 country-by-country-reporting"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - OECD Pillar Two GloBE (15% global minimum tax)
  - "OECD TPG 2022 transfer-pricing-guidelines"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b77669ad-59ca-8ade-9a2e-9935f5154581"
  stages:
    - stage: path
      stageUuid: "56b105eb-b9db-83ca-86e1-6d6b4038f9bc"
    - stage: trinity
      stageUuid: "5f839b27-f56b-8cb3-8fa2-604a44a14f0a"
    - stage: boundary
      stageUuid: "9bb82934-9e64-86ea-a3a7-4e8c448db080"
    - stage: links
      stageUuid: "6d42e2cb-64c3-8ce0-92f9-7a63cfba443b"
    - stage: horo
      stageUuid: "4d7169ae-ef01-89ea-be24-541a3a1e627c"
    - stage: seal
      stageUuid: "7334f663-3215-8e0e-8982-e3a326d600e4"
    - stage: uuid
      stageUuid: "7feb4bdd-67c2-88d2-b25c-34df82df3f59"
version: 2
---
# transfer-pricing-files

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[accounting]] (ledger patterns, currency fields, audit trails), [[transaction]] (relates to intercompany-transactions), [[identity]] (legal entities), [[proof]] (evidence attestations), and [[standard]] (OECD/EU compliance frameworks).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-documentation
- OECD TPG 2022 transfer-pricing-guidelines
- EU DAC-4 country-by-country-reporting
- EU 2016/881 administrative-cooperation-tax
- OECD Pillar Two GloBE (15% global minimum tax)
- ISO-19011:2018 audit-trail tp-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation
