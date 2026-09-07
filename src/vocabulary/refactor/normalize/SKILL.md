---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: "vocabulary/refactor/normalize"
coordinate: "vocabulary/refactor/normalize · 5/round · 349b4308"
contentUuid: "25147316-8e56-5311-9680-603b5704afd0"
diamondUuid: "af8a5c6e-85b0-8437-b977-2a0144dbb268"
uuid: "349b4308-0438-80aa-a92d-3d7ae132f1d8"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "bd61d9d7-03e6-837c-9cb5-6bab57245862"
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
      stageUuid: "0ffe0c92-3fea-8bbd-8a0b-f95d50c46ba4"
    - stage: seal
      stageUuid: "6fa71f57-c17e-86e2-86bd-e65489e948a5"
    - stage: uuid
      stageUuid: "3f434e80-eb3c-8217-a316-03c50f84ffd6"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
