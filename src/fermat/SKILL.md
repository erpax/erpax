---
name: fermat
description: "Use when reasoning about fermat — Fermat's Last Theorem via basis decomposition - P vs NP + algebra"
atomPath: fermat
coordinate: "fermat · 5/round · 66378ad0"
contentUuid: "0632dc6c-5c79-572a-8ecb-419f5a8bcaec"
diamondUuid: "425f2b53-c078-824a-87eb-451fd74e5de5"
uuid: "66378ad0-3295-8358-9da5-ae8da613defe"
horo: 5
typography:
  partition: fermat
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "90a837c4-e27a-8287-b2b1-1b9ef6c03ab5"
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
      stageUuid: "8ff480d9-a3bd-8b8c-8516-2237dd6203c8"
    - stage: seal
      stageUuid: "bf9493b1-68b9-8b50-a141-80144ccff9f0"
    - stage: uuid
      stageUuid: "9df3eb3c-9c66-835c-a20a-f0f348c23daa"
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
