---
name: checker
description: "Use when validating whether a fiscal period may be closed — pure, no-mutation checks that the period is in range and not already closed, that the closing entries balance, that a state transition is legal, and that reversals can post to the next period."
atomPath: "closing/period/checker"
coordinate: "closing/period/checker · 2/share · 6c93f05f"
contentUuid: "8e8ebfea-6c99-5163-9b4e-814674496585"
diamondUuid: "3b3daf8d-2821-8d01-a53b-07803cebebc1"
uuid: "6c93f05f-3f4e-80a1-a7a4-88b807160764"
horo: 2
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
  bondDegree: 18
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
  computationUuid: "b56e1c50-a0c7-8e21-853a-303d928e2910"
  stages:
    - stage: path
      stageUuid: "94f10a92-0816-8970-b835-d582c9282449"
    - stage: trinity
      stageUuid: "4d0c225b-9c77-84cc-a71c-0754d42647c8"
    - stage: boundary
      stageUuid: "7a223704-d65a-833d-a3ec-f5a43fe483a1"
    - stage: links
      stageUuid: "19e54426-efe7-867a-8e8c-cfa9eb4b4c68"
    - stage: horo
      stageUuid: "d2385f99-6571-8aa5-9f9c-61b725740dec"
    - stage: seal
      stageUuid: "c6f0a215-5657-802d-8c81-a32ba9cb9cdf"
    - stage: uuid
      stageUuid: "b2b624f0-4161-80c3-987c-71f7ee6446a6"
version: 2
---
# closing/period/checker — the period-closing gate

A static, side-effect-free validator for period [[closing]]. It answers the questions that must all pass before a [[period]] is sealed: is the fiscal year/period in range for its type (monthly→12, quarterly→4, weekly→53, custom→999) and not already in the entity's closing log; do the revenue and expense totals [[balance]] within tolerance; is the requested closing-state move legal (`in-progress → pending-approval → approved → posted → finalized`); and is the next period open enough to receive the auto-generated reversing entries. Every method is pure — inputs in, JSON-serializable verdict out (`errors`/`warnings`) — so the same call is an audit artifact.

Matter-twin: `src/closing/period/checker/index.ts` (`ClosingPeriodChecker` — `checkClosingEligibility` · `validateClosingBalance` · `validateStatusTransition` · `generateReversals` · `computeRegulatoryCode`). Composes [[closing]] · [[period]] · [[balance]].

**Law — [[law]]: a [[period]] closes only through the gate — in-range, not already closed, entries that [[balance]] within tolerance, and a legal state transition — and the check is pure, so the verdict is itself the audit evidence ([[trinity]]).**

@standard IAS-34:2023 — interim financial reporting, period structure
@standard SAF-T:3.0.2 — period coding, regulatory audit trail
