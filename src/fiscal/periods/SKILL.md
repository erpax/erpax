---
name: periods
description: "Use when managing the accounting calendar — opening, closing, or locking periods; enforcing four-eyes SoD on period transitions; configuring SAF-T or XBRL-GL period coding; blocking GL writes once a period is locked. The fiscal-period lifecycle node (open → closed → locked)."
atomPath: "fiscal/periods"
coordinate: "fiscal/periods · 8/crest · 136c8984"
contentUuid: "891b2ead-8352-55e9-894c-de945d0b5a28"
diamondUuid: "316e419c-2d97-8304-a903-756e0a9de212"
uuid: "136c8984-61fc-8fc8-8879-f13780dc1c86"
horo: 8
typography:
  partition: fiscal
  bondDegree: 39
standards:
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "GDPR Art 5(1)(f) audit-trail-integrity"
  - "GHG-Protocol"
  - "IAS-10"
  - "IAS-34"
  - "IAS-34:2023 interim-financial-reporting period-structure quarterly-alignment"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-14064-1"
  - "ISO-4217:2015 currency-code per-fiscal-configuration"
  - "ISO-4217:2015 currency-code per-fiscal-configuration`"
  - "ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering"
  - "ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering`"
  - "NIST-SP-800-92"
  - "OECD-Transfer-Pricing"
  - "SAF-T"
  - "SAF-T 3.0.2 regulatory-period-coding audit-file-structure"
  - SOX
  - "SOX §404 period-close-integrity access-control-evidence"
  - "US-GAAP"
  - "US-GAAP ASC-210 balance-sheet"
  - XBRL
  - "XBRL-GL fiscal-context general-ledger-reporting"
  - eIDAS
  - "eIDAS Regulation 910/2014 qualified-electronic-signature on-amendments"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7794f02c-860a-80b0-ae66-bcd316d275f4"
  stages:
    - stage: path
      stageUuid: "c2d46d7d-f33b-8c89-9ef4-d333fbff62a5"
    - stage: trinity
      stageUuid: "7da42a92-8441-8678-9c96-4670b3c7e10a"
    - stage: boundary
      stageUuid: "c07603a5-1797-8aa9-ab0c-44ece09ffa04"
    - stage: links
      stageUuid: "4b5e5c91-6683-8872-8f10-17c232d67ede"
    - stage: horo
      stageUuid: "260b8a4f-19ff-8b2e-b1b4-4bc51a118e75"
    - stage: seal
      stageUuid: "799579d1-a269-8094-bf85-70c24d3c360f"
    - stage: uuid
      stageUuid: "a648d85f-b453-8567-bc18-db2a1ce822d1"
version: 2
---
# fiscal-periods

Fiscal Periods — accounting calendar with period locking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering`
- `@standard ISO-4217:2015 currency-code per-fiscal-configuration`

- ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering
- IAS-34:2023 interim-financial-reporting period-structure quarterly-alignment
- ISO-4217:2015 currency-code per-fiscal-configuration
- SAF-T 3.0.2 regulatory-period-coding audit-file-structure
- XBRL-GL fiscal-context general-ledger-reporting
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-210 balance-sheet
- SOX §404 period-close-integrity access-control-evidence
- GDPR Art 5(1)(f) audit-trail-integrity
- eIDAS Regulation 910/2014 qualified-electronic-signature on-amendments
- ISO-27002 §5.4 segregation-of-duties closer-vs-creator locker-vs-creator
- ISO-19011:2018 audit-trail status-transition

Composes: [[horo/share]] · [[fiscal/periods/fiscal/period/snapshots]] · [[fiscal/periods/post/balance/sheet/events]] · [[fiscal/periods/prior/period/adjustments]] · [[fiscal/periods/tax/periods]].

**Law — [[law]]: a fiscal period moves open → closed → locked and never backward freely — once locked, GL writes are blocked, and every transition requires four-eyes segregation (closer ≠ creator, locker ≠ creator); the accounting calendar is a gated lifecycle, not a free date range.**
