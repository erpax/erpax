---
name: checker
description: "Use when validating whether a fiscal period may be closed — pure, no-mutation checks that the period is in range and not already closed, that the closing entries balance, that a state transition is legal, and that reversals can post to the next period."
atomPath: "closing/period/checker"
coordinate: "closing/period/checker · 8/crest · 571cfbad"
contentUuid: "a3540305-3f1e-5191-9e5f-54449b191aef"
diamondUuid: "8f2f7c22-e580-8736-86f3-e87631621684"
uuid: "571cfbad-bc6f-8099-a716-28b2b9b7747b"
horo: 8
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
  computationUuid: "1add82bf-52a4-8317-b9ed-a9c266a20430"
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
      stageUuid: "4ad36b3d-ea00-8197-9fdd-77e24a432c74"
    - stage: seal
      stageUuid: "c6f0a215-5657-802d-8c81-a32ba9cb9cdf"
    - stage: uuid
      stageUuid: "023bd006-7fd9-8733-8427-7b99491105b6"
version: 2
---
# closing/period/checker — the period-closing gate

A static, side-effect-free validator for period [[closing]]. It answers the questions that must all pass before a [[period]] is sealed: is the fiscal year/period in range for its type (monthly→12, quarterly→4, weekly→53, custom→999) and not already in the entity's closing log; do the revenue and expense totals [[balance]] within tolerance; is the requested closing-state move legal (`in-progress → pending-approval → approved → posted → finalized`); and is the next period open enough to receive the auto-generated reversing entries. Every method is pure — inputs in, JSON-serializable verdict out (`errors`/`warnings`) — so the same call is an audit artifact.

Matter-twin: `src/closing/period/checker/index.ts` (`ClosingPeriodChecker` — `checkClosingEligibility` · `validateClosingBalance` · `validateStatusTransition` · `generateReversals` · `computeRegulatoryCode`). Composes [[closing]] · [[period]] · [[balance]].

**Law — [[law]]: a [[period]] closes only through the gate — in-range, not already closed, entries that [[balance]] within tolerance, and a legal state transition — and the check is pure, so the verdict is itself the audit evidence ([[trinity]]).**

@standard IAS-34:2023 — interim financial reporting, period structure
@standard SAF-T:3.0.2 — period coding, regulatory audit trail
