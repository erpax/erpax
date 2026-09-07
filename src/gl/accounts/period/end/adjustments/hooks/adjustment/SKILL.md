---
name: adjustment
description: "Use when reasoning about adjustment — Period-End Adjustment Posting Hook — fires GL on status → 'posted'."
atomPath: "gl/accounts/period/end/adjustments/hooks/adjustment"
coordinate: "gl/accounts/period/end/adjustments/hooks/adjustment · 2/share · 6306ce0d"
contentUuid: "78d0d53c-d3b6-58f9-a0de-d06d6d6c3f4f"
diamondUuid: "de8e69b9-0ff4-813a-8e6a-60c7a0ac83e0"
uuid: "6306ce0d-0db2-8cd7-9f6a-176402235f81"
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
  computationUuid: "1171b74f-a42d-8ea1-af8f-0aee4f5f8e5e"
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
      stageUuid: "b3fc6bfb-c245-867d-8912-fd5b5b9e71e5"
    - stage: seal
      stageUuid: "9e553d3f-1029-88f0-bf21-f9fa0676722f"
    - stage: uuid
      stageUuid: "b2db4f14-dbc8-84ce-be67-37c531fda951"
version: 2
---
# gl/accounts/period/end/adjustments/hooks/adjustment

Period-End Adjustment Posting Hook — fires GL on status → 'posted'.

Extracted from `gl/accounts/period/end/adjustments/hooks/adjustment.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[gl/accounts/period/end/adjustments]].
