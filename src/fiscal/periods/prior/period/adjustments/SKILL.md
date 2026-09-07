---
name: adjustments
description: "Use when restating a prior closed period for material errors — IAS-8 §42 retrospective correction, adjusting opening balances without re-opening; disclosing error category and amount per §49; CEO/CFO certification for SOX §906. The prior-period restatement node."
atomPath: "fiscal/periods/prior/period/adjustments"
coordinate: "fiscal/periods/prior/period/adjustments · 8/crest · 885be009"
contentUuid: "ab10eab6-ca2e-5848-a754-68ad5001fd02"
diamondUuid: "e6289e11-3b91-83b7-b00a-7af68789e678"
uuid: "885be009-ef03-8109-966e-793be2cd5222"
horo: 8
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
  computationUuid: "a5c5fe73-cb79-8035-bac1-3f99c738cabc"
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
      stageUuid: "4942787d-dca5-83ee-8c78-60f8cf3062e6"
    - stage: seal
      stageUuid: "f3030037-d05c-80cb-9772-d0bfce04fb30"
    - stage: uuid
      stageUuid: "ec1603c6-a0e8-863f-a934-eb9ac7ce54ad"
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
