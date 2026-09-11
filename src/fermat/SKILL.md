---
name: fermat
description: "Use when reasoning about fermat — Fermat's Last Theorem via basis decomposition - P vs NP + algebra"
atomPath: fermat
coordinate: "fermat · 1/base · dcf28ae7"
contentUuid: "7fae0ed5-3187-5a31-bfce-818de5d1c214"
diamondUuid: "9a8bc742-53c5-8e6c-8cfa-174f1f1562fa"
uuid: "dcf28ae7-b42d-8a9b-9354-fa1825e0bc01"
horo: 1
typography:
  partition: fermat
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "4c73981a-937c-8edb-b849-233ed035e8af"
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
      stageUuid: "f7c9472b-8cf2-8411-b76e-90495711a180"
    - stage: seal
      stageUuid: "bf9493b1-68b9-8b50-a141-80144ccff9f0"
    - stage: uuid
      stageUuid: "ef17518e-915f-8844-a766-61104abe767f"
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
