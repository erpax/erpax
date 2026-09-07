---
name: statements
description: "Use when generating, certifying, and publishing financial statements — trial balance, balance sheet, income statement, cash flow, equity — under IAS-1 / IFRS-18 (2027+) with SOX §302 preparer-vs-certifier segregation, financial ratios, and multi-format export. The period-end financial-statement collection."
atomPath: "financial/statements"
coordinate: "financial/statements · 2/share · 548aeb0f"
contentUuid: "5bb30e18-9ec4-51d3-96d2-576e270412ec"
diamondUuid: "75fb8bce-783f-813b-a6c3-67d6046ff2c6"
uuid: "548aeb0f-4ea8-827e-bd83-57450b9a34b6"
horo: 2
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
  computationUuid: "d8195d98-652e-8ffc-8399-8d18bff5d5cc"
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
      stageUuid: "7b06d2ca-808d-8060-baa5-4a3b7020bbe2"
    - stage: seal
      stageUuid: "bcf9a2d7-1ece-8100-bb56-4eacf0ef45b6"
    - stage: uuid
      stageUuid: "623a1b1a-04d5-8f27-8e44-792e1c550698"
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
