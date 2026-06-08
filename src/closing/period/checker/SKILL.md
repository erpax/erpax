---
name: checker
description: "Use when validating whether a fiscal period may be closed — pure, no-mutation checks that the period is in range and not already closed, that the closing entries balance, that a state transition is legal, and that reversals can post to the next period."
atomPath: closing/period/checker
coordinate: closing/period/checker · 1/base · 92d05df7
contentUuid: "365090e3-36c7-5aec-9ee4-c9fc2c57dae6"
diamondUuid: "3d09d796-d6f3-8752-8b24-2b000309e5e3"
uuid: "92d05df7-f270-8ccf-85d9-d87f96134544"
horo: 1
bonds:
  in:
    - balance
    - closing
    - law
    - period
    - trinity
  out:
    - balance
    - closing
    - law
    - period
    - trinity
typography:
  partition: closing
  bondDegree: 15
  neighbors: []
standards:
  - "IAS-34"
  - "IAS-34:2023 (period structure, interim closing requirements)"
  - "IAS-34:2023 — interim financial reporting, period structure"
  - "SAF-T"
  - "SAF-T:3.0.2 (period coding, regulatory audit trail)"
  - "SAF-T:3.0.2 — period coding, regulatory audit trail"
bindings: []
neighbors:
  wikilink:
    - balance
    - closing
    - law
    - period
    - trinity
  matrix:
    - balance
    - closing
    - law
    - period
    - trinity
  backlinks:
    - balance
    - closing
    - law
    - period
    - trinity
signatures:
  computationUuid: "fcfcfb78-6ec0-8c20-99bc-10fbbcc4e285"
  stages:
    - stage: path
      stageUuid: "94f10a92-0816-8970-b835-d582c9282449"
    - stage: trinity
      stageUuid: "4d0c225b-9c77-84cc-a71c-0754d42647c8"
    - stage: boundary
      stageUuid: "830ed872-02e8-8ff1-80ba-02c78a346b77"
    - stage: links
      stageUuid: "19e54426-efe7-867a-8e8c-cfa9eb4b4c68"
    - stage: horo
      stageUuid: "4f93b71c-d1ce-844d-a56f-9568726cd822"
    - stage: seal
      stageUuid: "c6f0a215-5657-802d-8c81-a32ba9cb9cdf"
    - stage: uuid
      stageUuid: "8d7c2ef0-e895-8bf8-803d-5b4c180e58a1"
version: 2
---
# closing/period/checker — the period-closing gate

A static, side-effect-free validator for period [[closing]]. It answers the questions that must all pass before a [[period]] is sealed: is the fiscal year/period in range for its type (monthly→12, quarterly→4, weekly→53, custom→999) and not already in the entity's closing log; do the revenue and expense totals [[balance]] within tolerance; is the requested closing-state move legal (`in-progress → pending-approval → approved → posted → finalized`); and is the next period open enough to receive the auto-generated reversing entries. Every method is pure — inputs in, JSON-serializable verdict out (`errors`/`warnings`) — so the same call is an audit artifact.

Matter-twin: `src/closing/period/checker/index.ts` (`ClosingPeriodChecker` — `checkClosingEligibility` · `validateClosingBalance` · `validateStatusTransition` · `generateReversals` · `computeRegulatoryCode`). Composes [[closing]] · [[period]] · [[balance]].

**Law — [[law]]: a [[period]] closes only through the gate — in-range, not already closed, entries that [[balance]] within tolerance, and a legal state transition — and the check is pure, so the verdict is itself the audit evidence ([[trinity]]).**

@standard IAS-34:2023 — interim financial reporting, period structure
@standard SAF-T:3.0.2 — period coding, regulatory audit trail
