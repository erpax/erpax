---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: "vocabulary/refactor/normalize"
coordinate: "vocabulary/refactor/normalize · 5/round · 38522422"
contentUuid: "1f6c887a-cd3b-5b9a-a0c3-5fb19dd6be6d"
diamondUuid: "e928b317-8abb-8984-be67-ac9fe2e77b45"
uuid: "38522422-1ad9-802c-8b14-99aa9bb8dbd6"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "156044f0-fe65-8961-8b9c-f81cf307cd81"
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
      stageUuid: "60296193-2b58-872b-8951-534a71f5d6f2"
    - stage: seal
      stageUuid: "6fa71f57-c17e-86e2-86bd-e65489e948a5"
    - stage: uuid
      stageUuid: "dfab8e2f-a0d8-8fc0-be0b-cd004e2a551f"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
