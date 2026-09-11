---
name: fermat
description: "Use when reasoning about fermat — Fermat's Last Theorem via basis decomposition - P vs NP + algebra"
atomPath: fermat
coordinate: "fermat · 1/base · cbfa47db"
contentUuid: "95e8fa2b-7b70-5e4c-8885-2c676858048d"
diamondUuid: "ba79fe94-d03d-8f31-a7db-66c4f91aec9c"
uuid: "cbfa47db-4ed3-8ef0-aa65-a46ba05c64ec"
horo: 1
typography:
  partition: fermat
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "bbdfc711-78de-8f0c-b5b1-e57e242cf29f"
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
      stageUuid: "4ad060f0-080a-8d03-9580-6f2b6e935db3"
    - stage: seal
      stageUuid: "bf9493b1-68b9-8b50-a141-80144ccff9f0"
    - stage: uuid
      stageUuid: "ddbab3f1-afd5-86f4-bfd1-b0b40a488c0f"
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
