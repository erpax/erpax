---
name: adjustment
description: "Use when reasoning about adjustment — Period-End Adjustment Posting Hook — fires GL on status → 'posted'."
atomPath: "gl/accounts/period/end/adjustments/hooks/adjustment"
coordinate: "gl/accounts/period/end/adjustments/hooks/adjustment · 2/share · d8b49c71"
contentUuid: "4a21cede-35d5-5925-a2e6-22af9574ae6f"
diamondUuid: "75f21b77-aa39-8825-86b4-9e45ba49a2f8"
uuid: "d8b49c71-123f-8a53-9abd-92260ad1c925"
horo: 2
typography:
  partition: gl
  bondDegree: 14
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-8 accounting-policies-changes-and-errors"
  - "ISO-8601-1:2019 date-time posted-date"
  - "ISO/IEC-29119"
  - "SOX §404 internal-controls four-eyes"
  - "US-GAAP ASC-250 accounting-changes-and-error-corrections"
bindings: []
signatures:
  computationUuid: "02b336ca-c66b-82a4-b229-136071f85d36"
  stages:
    - stage: path
      stageUuid: "eb5fff7e-6bd6-84b5-9820-99a371ba6be7"
    - stage: trinity
      stageUuid: "bfc2cd8e-387c-8d38-bf94-85ac48d9cb09"
    - stage: boundary
      stageUuid: "055fdfe2-0e65-870c-b37f-5187a4099a45"
    - stage: links
      stageUuid: "ed91276a-000b-8b62-9923-4019d2fd13c3"
    - stage: horo
      stageUuid: "8d604c73-cbc1-8705-8444-0127c1725cb2"
    - stage: seal
      stageUuid: "9e553d3f-1029-88f0-bf21-f9fa0676722f"
    - stage: uuid
      stageUuid: "c31931fe-ef22-8a6e-ad51-0e51ece21ec8"
version: 2
---
# gl/accounts/period/end/adjustments/hooks/adjustment

Period-End Adjustment Posting Hook — fires GL on status → 'posted'.

Extracted from `gl/accounts/period/end/adjustments/hooks/adjustment.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[gl/accounts/period/end/adjustments]].
