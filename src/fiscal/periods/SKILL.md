---
name: periods
description: "Use when managing the accounting calendar — opening, closing, or locking periods; enforcing four-eyes SoD on period transitions; configuring SAF-T or XBRL-GL period coding; blocking GL writes once a period is locked. The fiscal-period lifecycle node (open → closed → locked)."
atomPath: "fiscal/periods"
coordinate: "fiscal/periods · 8/crest · 6f44a5f3"
contentUuid: "00e471af-2dca-5ceb-8d7c-2b5738246f32"
diamondUuid: "d761e5f3-4387-8956-affb-acc9d76e44bb"
uuid: "6f44a5f3-54cd-8b1e-a1c8-2a84df1677ff"
horo: 8
bonds:
  in:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - share
    - shares
    - snapshots
  out:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - share
    - shares
    - snapshots
typography:
  partition: fiscal
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2011/83"
  - "EU-2014/55"
  - "EU-2016/679"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "GDPR Art 5(1)(f) audit-trail-integrity"
  - "GHG-Protocol"
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
neighbors:
  wikilink:
    - adjustments
    - events
    - law
    - periods
    - share
    - snapshots
  matrix:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - share
    - shares
    - snapshots
  backlinks:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - share
    - shares
    - snapshots
signatures:
  computationUuid: "466ed8a8-3459-824e-8958-7c7744152c48"
  stages:
    - stage: path
      stageUuid: "c2d46d7d-f33b-8c89-9ef4-d333fbff62a5"
    - stage: trinity
      stageUuid: "7da42a92-8441-8678-9c96-4670b3c7e10a"
    - stage: boundary
      stageUuid: "5d38f802-f5c1-8497-b20d-78737f9de26b"
    - stage: links
      stageUuid: "4b5e5c91-6683-8872-8f10-17c232d67ede"
    - stage: horo
      stageUuid: "6c3de3b3-434a-8466-9d8e-b82ec946ae7a"
    - stage: seal
      stageUuid: "799579d1-a269-8094-bf85-70c24d3c360f"
    - stage: uuid
      stageUuid: "696fbd9c-5094-8287-841d-0f1c76f11345"
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
