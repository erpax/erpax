---
name: statements
description: "Use when generating, certifying, and publishing financial statements — trial balance, balance sheet, income statement, cash flow, equity — under IAS-1 / IFRS-18 (2027+) with SOX §302 preparer-vs-certifier segregation, financial ratios, and multi-format export. The period-end financial-statement collection."
atomPath: financial/statements
coordinate: financial/statements · 8/crest · 54e1f66b
contentUuid: "0b0de5fc-6886-5557-a15e-62eba6386558"
diamondUuid: "1c4bc41e-8460-8448-9689-2d53428c2d44"
uuid: "54e1f66b-50e3-8965-a57c-f36fac71e9bf"
horo: 8
bonds:
  in:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - financial
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
  out:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
typography:
  partition: financial
  bondDegree: 53
  neighbors: []
standards:
  - "BCP-47"
  - "BCP-47 language-tag"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-34 §8 §10 interim-financial-reporting (when statementType ∈ Q1/Q2/Q3 the §10 condensed format applies)"
  - "IFRS IFRS-18 §9 §10 §40 presentation-and-disclosure (effective 2027-01 — replaces IAS-1 with structured operating/investing/financing categories)"
  - "IFRS IFRS-7 §31-§42 financial-instruments-disclosures (statement notes consume IFRS-7 risk-management disclosures)"
  - "ISO-19011:2018 audit-trail"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time fiscal-period-end generated-at issued-at approved-at"
  - "SOX §302 disclosure-controls"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-205 presentation-of-financial-statements"
  - "US-GAAP ASC-270 interim-reporting"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
  backlinks:
    - accounting
    - balance
    - budgetvariance
    - disclosure
    - hedge
    - horo
    - identity
    - law
    - materiality
    - proof
    - segment
    - standard
    - transaction
    - variance
signatures:
  computationUuid: "e1d9eb7e-3dad-8cbf-9941-164a9a7fb123"
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
      stageUuid: "e7eb2e92-15bd-8ea8-9657-215d3d218190"
    - stage: seal
      stageUuid: "faa38e09-69c9-8502-a9bc-5d008e19dab1"
    - stage: uuid
      stageUuid: "fdc392a1-3def-8cfd-8054-9ab80587de46"
version: 2
---
# financial-statements

Financial Statements — generated statement records (TB, BS, IS, CF, etc.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
