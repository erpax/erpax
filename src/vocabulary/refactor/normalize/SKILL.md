---
name: normalize
description: "Use when rewriting cross-unit relative imports to the uniform @/ alias before a move — so the single-word-folder migration becomes a pure @/old→@/new remap with no relative-depth that silently breaks. The address-law dry-clean; the matter is index.mjs."
atomPath: refactor/normalize
coordinate: refactor/normalize · 1/base · 2fef3401
contentUuid: "c55cc137-d765-5460-89df-55696e670439"
diamondUuid: "75d5b9ea-9542-8ca6-b994-f5dd43766c88"
uuid: "2fef3401-d304-820e-aacc-d2beb97d70c2"
horo: 1
bonds:
  in:
    - dissolve
    - identity
    - refactor
    - sequence
  out:
    - dissolve
    - identity
    - refactor
    - sequence
typography:
  partition: refactor
  bondDegree: 0
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - dissolve
    - identity
    - sequence
  matrix:
    - dissolve
    - identity
    - refactor
    - sequence
  backlinks:
    - dissolve
    - identity
    - refactor
    - sequence
signatures:
  computationUuid: "f145dbbf-af9b-8783-a967-b288bbc7d0a4"
  stages:
    - stage: path
      stageUuid: "36e6b99b-5871-844f-9671-8516e1f4e5c6"
    - stage: trinity
      stageUuid: "b6b63cce-fb79-86b0-82a6-c5962a60c2cb"
    - stage: boundary
      stageUuid: "a49ade83-b832-88bb-8b22-57bab0f4c490"
    - stage: links
      stageUuid: "33284d1b-69cc-80f3-9aa9-66948f892bc2"
    - stage: horo
      stageUuid: "414703dd-6fea-8edf-9844-cfd580bac1bb"
    - stage: seal
      stageUuid: "4c3fe699-8cf8-84c4-b550-69a57f0ff215"
    - stage: uuid
      stageUuid: "2d9093f6-7e4d-8f94-8078-32d121083f9f"
version: 2
---
# normalize — relative imports → the @/ coordinate

The wiring dry-clean that precedes [[dissolve]]: every cross-unit relative spec (`./x`, `../x`) that resolves under `src/` is rewritten to its absolute `@/…` address. The [[sequence]] law makes `../x` for a non-sibling a violation; uniform `@/` is depth-INDEPENDENT, so the move that follows is a pure string remap. `.ts/.tsx` only — `.mjs` runs under raw node (no tsconfig path map) and keeps relative imports.

Matter: `index.mjs` (`--apply` executes; default dry-run). Composes [[dissolve]] · [[sequence]] · [[identity]].
