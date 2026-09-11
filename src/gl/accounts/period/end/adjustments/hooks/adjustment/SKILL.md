---
name: adjustment
description: "Use when reasoning about adjustment — Period-End Adjustment Posting Hook — fires GL on status → 'posted'."
atomPath: "gl/accounts/period/end/adjustments/hooks/adjustment"
coordinate: "gl/accounts/period/end/adjustments/hooks/adjustment · 7/descent · 182a6653"
contentUuid: "2d0aabd1-375a-53f2-b92a-cae424df96e5"
diamondUuid: "af13b9d5-9fcd-8c98-b3ff-148a504ba44f"
uuid: "182a6653-bc55-8ce7-9080-a3975453050d"
horo: 7
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
  computationUuid: "377ff70e-c331-8601-b913-3d635faf7dcc"
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
      stageUuid: "144a57fc-69c4-822a-adb5-934e9a5672cc"
    - stage: seal
      stageUuid: "9e553d3f-1029-88f0-bf21-f9fa0676722f"
    - stage: uuid
      stageUuid: "a41067a3-1c50-86bb-89c8-fc02b8064db9"
version: 2
---
# gl/accounts/period/end/adjustments/hooks/adjustment

Period-End Adjustment Posting Hook — fires GL on status → 'posted'.

Extracted from `gl/accounts/period/end/adjustments/hooks/adjustment.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[gl/accounts/period/end/adjustments]].
