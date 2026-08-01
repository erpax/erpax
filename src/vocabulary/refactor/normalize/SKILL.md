---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: "vocabulary/refactor/normalize"
coordinate: "vocabulary/refactor/normalize · 7/descent · b1223e67"
contentUuid: "1b6e5771-fc71-58c0-b50f-3d858bf6c632"
diamondUuid: "8b9d3511-e31e-88be-8d9a-52f44b08a9b2"
uuid: "b1223e67-f37d-8793-8e14-46a01219c56e"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "bb3fa4b0-6091-876c-9024-e8f4778c3f03"
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
      stageUuid: "07cc5387-a119-8cbf-8aba-3ea0f46a10f3"
    - stage: seal
      stageUuid: "9154203f-a701-8515-9048-155aa2c0b82e"
    - stage: uuid
      stageUuid: "40d62011-f38f-81b1-b6f6-441c125cab06"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
