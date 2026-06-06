---
name: fiscal-periods
description: Use when managing the accounting calendar — opening, closing, or locking periods; enforcing four-eyes SoD on period transitions; configuring SAF-T or XBRL-GL period coding; blocking GL writes once a period is locked. The fiscal-period lifecycle node (open → closed → locked).
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
