---
name: fermat
description: "Use when reasoning about fermat — Fermat's Last Theorem via basis decomposition - P vs NP + algebra"
atomPath: fermat
coordinate: "fermat · 1/base · 67cc20a1"
contentUuid: "7e1ef8a3-7304-57ed-bec0-996a4ef2e1db"
diamondUuid: "b7e5b41c-462e-8893-bde3-7fbb10d5afa1"
uuid: "67cc20a1-48fb-85ac-b964-15dcebb81233"
horo: 1
typography:
  partition: fermat
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "dd18788a-05c6-8476-9dc9-72ced9d2bf75"
  stages:
    - stage: path
      stageUuid: "862f9e91-d55e-8d2a-a4ef-add25c3dec5f"
    - stage: trinity
      stageUuid: "83cc7325-cbc3-8796-8115-d3145e83cc3c"
    - stage: boundary
      stageUuid: "80d0c6ad-bb8d-8aa2-bd10-5e408f0dcce5"
    - stage: links
      stageUuid: "b293a988-6a31-8bc9-8f9c-647146f75770"
    - stage: horo
      stageUuid: "f8dc4024-3c73-8369-85c8-16264789cc3b"
    - stage: seal
      stageUuid: "bf9493b1-68b9-8b50-a141-80144ccff9f0"
    - stage: uuid
      stageUuid: "e1acb396-3cb4-85e6-a722-5716efc2ada7"
version: 2
---
# fermat — Fermat's Last Theorem decomposed into quantum basis

No integer solutions exist for x^n + y^n = z^n when n > 2. Decomposed via P vs NP and BSD Conjecture.

## code

entry `@/fermat` · sealed `0` (emerging) · trinity `1·0·0`
exports fermatTheoremProof, verifyNoSolution
imports @/basis, @/millennium

---

<sub>Classical problem · basis decomposition · quantum proof</sub>

Composes: [[millennium]] · [[basis]].
