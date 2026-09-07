---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: "vocabulary/refactor/normalize"
coordinate: "vocabulary/refactor/normalize · 8/crest · 946a6e3a"
contentUuid: "59ccd422-53c3-5464-9712-b27186d6ad13"
diamondUuid: "c24c71c4-269e-8e3e-9355-7775b6f17f72"
uuid: "946a6e3a-c48a-80a5-a66e-fa790f5bcb98"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "43995045-8488-867d-a574-425c21a7c996"
  stages:
    - stage: path
      stageUuid: "1be1063c-ecf1-8699-8721-2e5a0dec1ad4"
    - stage: trinity
      stageUuid: "2be8e522-2fb8-8cac-ae28-1fd15e6f8858"
    - stage: boundary
      stageUuid: "f704d187-82c0-8ea1-a2ca-ce577e29c1c1"
    - stage: links
      stageUuid: "a1bf5b0d-7cf3-8723-90ff-84b2f9b64491"
    - stage: horo
      stageUuid: "228e24e1-656a-8f43-9b82-76d8e2b667a7"
    - stage: seal
      stageUuid: "6fa71f57-c17e-86e2-86bd-e65489e948a5"
    - stage: uuid
      stageUuid: "aff821f9-6283-821c-acfc-217a7b273eae"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
