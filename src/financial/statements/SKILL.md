---
name: statements
description: "Use when generating, certifying, and publishing financial statements — trial balance, balance sheet, income statement, cash flow, equity — under IAS-1 / IFRS-18 (2027+) with SOX §302 preparer-vs-certifier segregation, financial ratios, and multi-format export. The period-end financial-statement collection."
atomPath: "financial/statements"
coordinate: "financial/statements · 8/crest · b4e09e5a"
contentUuid: "3b95fed7-56c5-5661-acab-9665e72652e2"
diamondUuid: "34d11238-dc53-85ee-9284-952e39180ee2"
uuid: "b4e09e5a-c87c-83d4-8e4a-34f2399db6e2"
horo: 8
typography:
  partition: financial
  bondDegree: 53
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)"
  - "IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)"
  - "IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at"
  - "ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at`"
  - "SOX §302 disclosure-controls"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-205 presentation-of-financial-statements"
  - "US-GAAP ASC-270 interim-reporting"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "aff9d929-7984-8563-934f-4216ee49c55b"
  stages:
    - stage: path
      stageUuid: "a34a2754-da29-8f74-ad0e-2df260a2a760"
    - stage: trinity
      stageUuid: "a7ee9b10-356f-8bc1-9fe0-06bd81051658"
    - stage: boundary
      stageUuid: "d2c825ab-c1a7-82ca-9fce-dad957cf8701"
    - stage: links
      stageUuid: "6925f5ca-c1df-8a3b-b16b-3d8abdd46759"
    - stage: horo
      stageUuid: "807e5a37-1ef4-8c4a-a7da-ffe42543fe1a"
    - stage: seal
      stageUuid: "bcf9a2d7-1ece-8100-bb56-4eacf0ef45b6"
    - stage: uuid
      stageUuid: "afcf93c7-0790-8e9d-a1ba-85e4cc86f162"
version: 2
---
# financial-statements

Financial Statements — generated statement records (TB, BS, IS, CF, etc.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at
- BCP-47 language-tag
- IFRS IAS-1 presentation-of-financial-statements
- IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)
- IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)
- IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)
- US-GAAP ASC-205 presentation-of-financial-statements
- US-GAAP ASC-270 interim-reporting
- SOX §302 disclosure-controls
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties certifier-vs-preparer
- ISO-19011:2018 audit-trail

Composes: [[accounting]] · [[transaction]] · [[proof]] · [[identity]] · [[standard]] · [[horo]].

**Law — [[law]]: every period-end statement is derived from the [[balance]]d ledger under IAS-1/IFRS-18, and the preparer can never be the certifier (SOX §302 segregation) — the statement is generated, not asserted.**
