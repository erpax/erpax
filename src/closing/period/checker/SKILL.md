---
name: checker
description: "Use when validating whether a fiscal period may be closed — pure, no-mutation checks that the period is in range and not already closed, that the closing entries balance, that a state transition is legal, and that reversals can post to the next period."
atomPath: "closing/period/checker"
coordinate: "closing/period/checker · 2/share · 862d9c3b"
contentUuid: "5f3fb9a4-ee7e-5f14-b236-5104e3c5728a"
diamondUuid: "4af43fc6-7505-862a-8e3a-d6d435d2db2e"
uuid: "862d9c3b-f195-8326-88c8-f72aed7d9f26"
horo: 2
typography:
  partition: closing
  bondDegree: 18
standards:
  - "IAS-34"
  - "IAS-34:2023 (period structure, interim closing requirements)"
  - "IAS-34:2023 — interim financial reporting, period structure"
  - "SAF-T"
  - "SAF-T:3.0.2 (period coding, regulatory audit trail)"
  - "SAF-T:3.0.2 — period coding, regulatory audit trail"
bindings: []
signatures:
  computationUuid: "2d3220d2-10de-819a-91ef-7e6f87bd1dc5"
  stages:
    - stage: path
      stageUuid: "94f10a92-0816-8970-b835-d582c9282449"
    - stage: trinity
      stageUuid: "4d0c225b-9c77-84cc-a71c-0754d42647c8"
    - stage: boundary
      stageUuid: "aea57215-64d3-838c-a6cc-2f21c5df1dc5"
    - stage: links
      stageUuid: "19e54426-efe7-867a-8e8c-cfa9eb4b4c68"
    - stage: horo
      stageUuid: "98b9386b-3f5c-8c71-be7f-71815dcb805e"
    - stage: seal
      stageUuid: "c6f0a215-5657-802d-8c81-a32ba9cb9cdf"
    - stage: uuid
      stageUuid: "b9f81498-7578-88fc-9043-ece99bcb9532"
version: 2
---
# closing/period/checker — the period-closing gate

A static, side-effect-free validator for period [[closing]]. It answers the questions that must all pass before a [[period]] is sealed: is the fiscal year/period in range for its type (monthly→12, quarterly→4, weekly→53, custom→999) and not already in the entity's closing log; do the revenue and expense totals [[balance]] within tolerance; is the requested closing-state move legal (`in-progress → pending-approval → approved → posted → finalized`); and is the next period open enough to receive the auto-generated reversing entries. Every method is pure — inputs in, JSON-serializable verdict out (`errors`/`warnings`) — so the same call is an audit artifact.

Matter-twin: `src/closing/period/checker/index.ts` (`ClosingPeriodChecker` — `checkClosingEligibility` · `validateClosingBalance` · `validateStatusTransition` · `generateReversals` · `computeRegulatoryCode`). Composes [[closing]] · [[period]] · [[balance]].

**Law — [[law]]: a [[period]] closes only through the gate — in-range, not already closed, entries that [[balance]] within tolerance, and a legal state transition — and the check is pure, so the verdict is itself the audit evidence ([[trinity]]).**

@standard IAS-34:2023 — interim financial reporting, period structure
@standard SAF-T:3.0.2 — period coding, regulatory audit trail
