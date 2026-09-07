---
name: files
description: "Use when documenting intercompany transfer pricing per OECD BEPS Action 13 — Master File, Local File, and Country-by-Country Report per jurisdiction per fiscal year — TP method, CbCR aggregates, Pillar Two applicability, filing deadlines and status. The BEPS Action 13 TP documentation register."
atomPath: "legal/entities/transfer/pricing/files"
coordinate: "legal/entities/transfer/pricing/files · 7/descent · a2afcb8b"
contentUuid: "29b35abb-5280-57be-9ab3-e8d1459eccad"
diamondUuid: "083b24ce-39f7-806f-aa48-1d1084afc72f"
uuid: "a2afcb8b-7c3d-8aee-bead-3a1c654205e1"
horo: 7
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
  computationUuid: "b61eb1f2-fbf5-8af2-8564-212a2705f8d8"
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
      stageUuid: "2e9e6f13-302b-8bec-8d46-e35f3c7ea50d"
    - stage: seal
      stageUuid: "7334f663-3215-8e0e-8982-e3a326d600e4"
    - stage: uuid
      stageUuid: "a0353ae0-61c9-8fb5-b550-0952f9e14ad9"
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
