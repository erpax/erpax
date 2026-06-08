---
name: adjustments
description: "Use when restating a prior closed period for material errors — IAS-8 §42 retrospective correction, adjusting opening balances without re-opening; disclosing error category and amount per §49; CEO/CFO certification for SOX §906. The prior-period restatement node."
atomPath: fiscal/periods/prior/period/adjustments
coordinate: fiscal/periods/prior/period/adjustments · 7/descent · 10a0622c
contentUuid: "9c033784-fe5a-50be-aa78-e6f5b62da30f"
diamondUuid: "e1a768b6-7ff4-8200-b112-47a3872f655b"
uuid: "10a0622c-285a-8b3e-8e57-ab234f214868"
horo: 7
bonds:
  in:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - period
    - proof
    - standard
  out:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
typography:
  partition: fiscal
  bondDegree: 41
  neighbors: []
standards:
  - "IFRS IAS-8 §42-49 errors-of-prior-periods"
  - "ISO-19011:2018 audit-trail prior-period-restatement"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time adjustment-date post-date"
  - "SOX §404 internal-controls restatement-control TOM-PPA-01"
  - "SOX §906 ceo-cfo-certification material-misstatement"
  - "US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections"
  - "US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - close
    - entries
    - fields
    - hooks
    - law
    - periods
  matrix:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
signatures:
  computationUuid: "9591f14f-5df4-8cb5-b24d-105ef4dbd171"
  stages:
    - stage: path
      stageUuid: "1f95d29e-02c6-8b0c-9dab-53841947a863"
    - stage: trinity
      stageUuid: "d77b794e-cebd-8d19-adee-f8c86c8f70d2"
    - stage: boundary
      stageUuid: "b7626474-e5da-80b1-9043-5147d9cad9fb"
    - stage: links
      stageUuid: "8579ee87-5847-84ff-9245-2e315ec0de28"
    - stage: horo
      stageUuid: "e3a801c0-28a9-8bae-a264-fe66e1fe4d4c"
    - stage: seal
      stageUuid: "f3030037-d05c-80cb-9772-d0bfce04fb30"
    - stage: uuid
      stageUuid: "c09755e0-f412-8e82-bb31-09fec7597268"
version: 2
---
# prior-period-adjustments

Prior-Period Adjustments — IAS-8 §42-49 retrospective corrections of material errors discovered after a period was closed. Distinct from `period-end-adjustments` (which books regular accruals into the *current* open period) — this collection records corrections to a *prior closed period* via restatement of the opening balances of the earliest period presented.

Per IAS-8 §42, restatement adjusts opening balances; it never re-opens the prior period.

## Architecture

Single-folder collection node: schema in `index.ts` (with standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks). One folder per collection ⇒ no scatter ⇒ no drift.

Composes: [[fiscal/periods]] · [[journal/entries]] · [[accounting]] · [[close]] · [[access]] · [[hooks]] · [[fields]].

## Standards

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
