---
name: checker
description: "Use when validating whether a fiscal period may be closed — pure, no-mutation checks that the period is in range and not already closed, that the closing entries balance, that a state transition is legal, and that reversals can post to the next period."
atomPath: "closing/period/checker"
coordinate: "closing/period/checker · 4/weave · f18d2512"
contentUuid: "fc595eb1-fb00-54c5-87a9-bc6c0da065b1"
diamondUuid: "bb664e12-ab12-8b11-b10a-c37ae92409a8"
uuid: "f18d2512-19fc-83bf-b07a-27094c0453bf"
horo: 4
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
  computationUuid: "003fe057-fac9-808a-9f45-6c5058a6e498"
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
      stageUuid: "48660f1c-c635-8e95-9305-7b49b13d512e"
    - stage: seal
      stageUuid: "c6f0a215-5657-802d-8c81-a32ba9cb9cdf"
    - stage: uuid
      stageUuid: "654f9d55-31ee-82aa-baeb-93fc55c1e5e1"
version: 2
---
# closing/period/checker — the period-closing gate

A static, side-effect-free validator for period [[closing]]. It answers the questions that must all pass before a [[period]] is sealed: is the fiscal year/period in range for its type (monthly→12, quarterly→4, weekly→53, custom→999) and not already in the entity's closing log; do the revenue and expense totals [[balance]] within tolerance; is the requested closing-state move legal (`in-progress → pending-approval → approved → posted → finalized`); and is the next period open enough to receive the auto-generated reversing entries. Every method is pure — inputs in, JSON-serializable verdict out (`errors`/`warnings`) — so the same call is an audit artifact.

Matter-twin: `src/closing/period/checker/index.ts` (`ClosingPeriodChecker` — `checkClosingEligibility` · `validateClosingBalance` · `validateStatusTransition` · `generateReversals` · `computeRegulatoryCode`). Composes [[closing]] · [[period]] · [[balance]].

**Law — [[law]]: a [[period]] closes only through the gate — in-range, not already closed, entries that [[balance]] within tolerance, and a legal state transition — and the check is pure, so the verdict is itself the audit evidence ([[trinity]]).**

@standard IAS-34:2023 — interim financial reporting, period structure
@standard SAF-T:3.0.2 — period coding, regulatory audit trail
