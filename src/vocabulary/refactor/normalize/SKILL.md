---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: "vocabulary/refactor/normalize"
coordinate: "vocabulary/refactor/normalize · 8/crest · 5570bc8a"
contentUuid: "61b49425-e2b2-52f4-a39b-73d11910e276"
diamondUuid: "0677ac5f-6391-8ea9-9478-8d99c2da9916"
uuid: "5570bc8a-cb74-8034-979c-b609043a2ab3"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "accb415e-9e0d-8982-944f-bc3a21613fc0"
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
      stageUuid: "c9bd18a8-5f0f-8562-9a99-463531c032d3"
    - stage: seal
      stageUuid: "6fa71f57-c17e-86e2-86bd-e65489e948a5"
    - stage: uuid
      stageUuid: "d259d77b-7c41-8352-a244-4ff7604ecd87"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
