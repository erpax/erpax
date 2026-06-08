---
name: periods
description: "Use when managing the accounting calendar — opening, closing, or locking periods; enforcing four-eyes SoD on period transitions; configuring SAF-T or XBRL-GL period coding; blocking GL writes once a period is locked. The fiscal-period lifecycle node (open → closed → locked)."
atomPath: fiscal/periods
coordinate: fiscal/periods · 7/descent · c620e144
contentUuid: "fa26643c-1cc1-5da4-a052-0dd6a51c0eb8"
diamondUuid: "03de8029-0c3f-8837-b0ad-0f64563aeac3"
uuid: "c620e144-eb80-8918-9885-237f317a893e"
horo: 7
bonds:
  in:
    - accounting
    - accrual
    - adjustments
    - events
    - law
    - periods
    - quota
    - rest
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
    - rest
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
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
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
  - "ISO-19011:2018 audit-trail status-transition"
  - "ISO-4217:2015 currency-code per-fiscal-configuration"
  - "ISO-8601-1:2019 date-time start-date end-date closed-at locked-at reopened-at week-numbering"
  - "NIST-SP-800-63"
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
    - rest
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
    - rest
    - share
    - shares
    - snapshots
signatures:
  computationUuid: "774c0611-d032-8e3d-af94-30398ef3b9bb"
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
      stageUuid: "38e664c5-04e2-8722-bf33-42942521867e"
    - stage: seal
      stageUuid: "799579d1-a269-8094-bf85-70c24d3c360f"
    - stage: uuid
      stageUuid: "9864f1f0-0e3c-8e8d-a7b2-0caf47a0f6bf"
version: 2
---
# fiscal-periods

Fiscal Periods — accounting calendar with period locking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
