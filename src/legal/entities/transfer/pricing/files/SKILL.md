---
name: files
description: "Use when documenting intercompany transfer pricing per OECD BEPS Action 13 — Master File, Local File, and Country-by-Country Report per jurisdiction per fiscal year — TP method, CbCR aggregates, Pillar Two applicability, filing deadlines and status. The BEPS Action 13 TP documentation register."
atomPath: "legal/entities/transfer/pricing/files"
coordinate: "legal/entities/transfer/pricing/files · 7/descent · bbafe92d"
contentUuid: "21e9ee6f-0c61-5559-a033-6a52b31700ff"
diamondUuid: "8d3a7479-017a-8bd0-aa31-7c6fba6426f3"
uuid: "bbafe92d-9e38-8bd2-979e-ce2bf9af2b62"
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
  computationUuid: "c15a8f05-d947-8bcf-ac7f-26e9c415620f"
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
      stageUuid: "a3d3986b-d9b3-890f-99ba-5cadaf2d4f55"
    - stage: seal
      stageUuid: "7334f663-3215-8e0e-8982-e3a326d600e4"
    - stage: uuid
      stageUuid: "c0641b3d-e399-81a7-8b6b-9f2678d7a65f"
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
