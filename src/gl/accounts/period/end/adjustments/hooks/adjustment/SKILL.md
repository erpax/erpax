---
name: adjustment
description: "Use when reasoning about adjustment — Period-End Adjustment Posting Hook — fires GL on status → 'posted'."
atomPath: "gl/accounts/period/end/adjustments/hooks/adjustment"
coordinate: "gl/accounts/period/end/adjustments/hooks/adjustment · 8/crest · 16361b6f"
contentUuid: "d7637e82-66a8-5fd7-bdbf-99632650870d"
diamondUuid: "18520084-c995-878c-b4bb-ed141d7056d9"
uuid: "16361b6f-4248-81dd-bac1-995cf275c92b"
horo: 8
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
  computationUuid: "89bf9829-d225-87e4-a68f-9516185e6464"
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
      stageUuid: "a2142650-565c-815a-b497-a8ea2d0fe80a"
    - stage: seal
      stageUuid: "9e553d3f-1029-88f0-bf21-f9fa0676722f"
    - stage: uuid
      stageUuid: "b0834aa1-2ae5-8f3c-88c1-9eaba600f542"
version: 2
---
# gl/accounts/period/end/adjustments/hooks/adjustment

Period-End Adjustment Posting Hook — fires GL on status → 'posted'.

Extracted from `gl/accounts/period/end/adjustments/hooks/adjustment.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[gl/accounts/period/end/adjustments]].
