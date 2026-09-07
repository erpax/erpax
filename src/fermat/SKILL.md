---
name: fermat
description: "Use when reasoning about fermat — Fermat's Last Theorem via basis decomposition - P vs NP + algebra"
atomPath: fermat
coordinate: "fermat · 5/round · 901e729e"
contentUuid: "4a796a93-a93a-51ae-a60d-03803bd75d88"
diamondUuid: "ff066242-5bd8-88bc-9b98-73c1cd778627"
uuid: "901e729e-2d1e-8a3d-8715-66d9727c464a"
horo: 5
typography:
  partition: fermat
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "52516928-bf29-8036-9211-58a5f6115308"
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
      stageUuid: "17f271cb-4ea9-8e1b-a2a7-c555988751d3"
    - stage: seal
      stageUuid: "bf9493b1-68b9-8b50-a141-80144ccff9f0"
    - stage: uuid
      stageUuid: "50af097d-c6d3-8044-bad1-b4493a2938b7"
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
