---
name: statements
description: "Use when generating, certifying, and publishing financial statements — trial balance, balance sheet, income statement, cash flow, equity — under IAS-1 / IFRS-18 (2027+) with SOX §302 preparer-vs-certifier segregation, financial ratios, and multi-format export. The period-end financial-statement collection."
atomPath: "financial/statements"
coordinate: "financial/statements · 1/base · f2deb96a"
contentUuid: "294e42ba-3c3f-5d1a-844d-7402110d6e60"
diamondUuid: "b568ee49-70d4-8a92-98b4-6e5eef3ea870"
uuid: "f2deb96a-43f0-8ac2-867f-8a546d469d25"
horo: 1
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
  computationUuid: "77578149-0507-8c46-a316-31ebc51f39fa"
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
      stageUuid: "ec274674-5677-8558-8ea4-5e38765682d7"
    - stage: seal
      stageUuid: "bcf9a2d7-1ece-8100-bb56-4eacf0ef45b6"
    - stage: uuid
      stageUuid: "5b86f71c-4485-832b-9106-a6b152cd6746"
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
