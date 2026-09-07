---
name: adjustment
description: "Use when reasoning about adjustment — Period-End Adjustment Posting Hook — fires GL on status → 'posted'."
atomPath: "gl/accounts/period/end/adjustments/hooks/adjustment"
coordinate: "gl/accounts/period/end/adjustments/hooks/adjustment · 7/descent · f21be1cf"
contentUuid: "a8444073-0143-5e09-880c-55cd506a4451"
diamondUuid: "cfc73aee-9dab-872a-9f9b-2443a264ae07"
uuid: "f21be1cf-d134-89bd-b3da-16de9b0bb2b9"
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
  computationUuid: "90c3b09c-e03a-8403-9e49-d84b4e8600d5"
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
      stageUuid: "4b345942-9237-854b-a39d-f979112fd095"
    - stage: seal
      stageUuid: "9e553d3f-1029-88f0-bf21-f9fa0676722f"
    - stage: uuid
      stageUuid: "ff7549a7-c643-8dcc-b411-3d618898604c"
version: 2
---
# gl/accounts/period/end/adjustments/hooks/adjustment

Period-End Adjustment Posting Hook — fires GL on status → 'posted'.

Extracted from `gl/accounts/period/end/adjustments/hooks/adjustment.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[gl/accounts/period/end/adjustments]].
