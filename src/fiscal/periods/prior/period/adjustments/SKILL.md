---
name: adjustments
description: "Use when restating a prior closed period for material errors — IAS-8 §42 retrospective correction, adjusting opening balances without re-opening; disclosing error category and amount per §49; CEO/CFO certification for SOX §906. The prior-period restatement node."
atomPath: "fiscal/periods/prior/period/adjustments"
coordinate: "fiscal/periods/prior/period/adjustments · 4/weave · 64501028"
contentUuid: "5d2bcba3-0997-5ad0-b1f6-d591bfd6f59b"
diamondUuid: "632426bc-0ca4-8727-b13c-96d0b07c2658"
uuid: "64501028-8e58-8521-91e2-f958f8588379"
horo: 4
typography:
  partition: fiscal
  bondDegree: 42
standards:
  - "IFRS IAS-8 §42-49 errors-of-prior-periods"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time adjustment-date post-date"
  - "ISO-8601-1:2019 date-time adjustment-date post-date`"
  - "SOX §404 internal-controls restatement-control TOM-PPA-01"
  - "SOX §906 ceo-cfo-certification material-misstatement"
  - "US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections"
  - "US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f344c1ab-1c6e-86f4-ae2e-92b8d05af831"
  stages:
    - stage: path
      stageUuid: "1f95d29e-02c6-8b0c-9dab-53841947a863"
    - stage: trinity
      stageUuid: "d77b794e-cebd-8d19-adee-f8c86c8f70d2"
    - stage: boundary
      stageUuid: "b7626474-e5da-80b1-9043-5147d9cad9fb"
    - stage: links
      stageUuid: "b6864de4-6161-8094-93fc-79891ad11721"
    - stage: horo
      stageUuid: "3d9398e2-39cb-894a-ba97-853f88c8b07a"
    - stage: seal
      stageUuid: "f3030037-d05c-80cb-9772-d0bfce04fb30"
    - stage: uuid
      stageUuid: "6c16d815-ceb9-81c4-b9c5-1f7dd2e71085"
version: 2
---
# prior-period-adjustments

Prior-Period Adjustments — IAS-8 §42-49 retrospective corrections of material errors discovered after a period was closed. Distinct from `period-end-adjustments` (which books regular accruals into the *current* open period) — this collection records corrections to a *prior closed period* via restatement of the opening balances of the earliest period presented.

Per IAS-8 §42, restatement adjusts opening balances; it never re-opens the prior period.

## Architecture

Single-folder collection node: schema in `index.ts` (with standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks). One folder per collection ⇒ no scatter ⇒ no drift.

Composes: [[fiscal/periods]] · [[journal/entries]] · [[accounting]] · [[close]] · [[access]] · [[hooks]] · [[field]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time adjustment-date post-date`


- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time adjustment-date post-date
- IFRS IAS-8 §42-49 errors-of-prior-periods
- US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections
- US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments
- ISO-19011:2018 audit-trail prior-period-restatement
- SOX §404 internal-controls restatement-control TOM-PPA-01
- SOX §906 ceo-cfo-certification material-misstatement
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a prior-period adjustment corrects a material error in a closed period by restating opening balances — it NEVER re-opens that period (IAS-8 §42); the closed past stays sealed, the correction flows through the earliest period presented with CEO/CFO certification.**
