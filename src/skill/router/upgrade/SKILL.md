---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: skill/router/upgrade
coordinate: skill/router/upgrade · 7/descent · 25cbd0e5
contentUuid: "e2c4434c-1428-5c7c-9d84-383b60df7345"
diamondUuid: "c373c5a2-b6e0-867e-84da-ca706d6f0e66"
uuid: "25cbd0e5-5d3b-884f-a237-5a6c8a0ad96a"
horo: 7
bonds:
  in:
    - diamond
    - integrity
    - law
    - matrix
    - readme
    - router
    - typography
  out:
    - diamond
    - integrity
    - law
    - matrix
    - readme
    - router
    - typography
typography:
  partition: skill
  bondDegree: 27
  neighbors:
    - "analytics/max-tamper-cost"
    - aura
    - diamond
    - hallucination
    - purity
standards: []
bindings: []
neighbors:
  wikilink:
    - diamond
    - integrity
    - law
    - matrix
    - readme
    - router
    - typography
  matrix:
    - diamond
    - integrity
    - law
    - matrix
    - readme
    - router
    - typography
  backlinks:
    - diamond
    - integrity
    - law
    - matrix
    - readme
    - router
    - typography
signatures:
  computationUuid: "7359cdb2-6e8d-8995-a4e0-ae72f50e4ef4"
  stages:
    - stage: path
      stageUuid: "08fa6562-690a-8980-8cff-5da4617f17e8"
    - stage: trinity
      stageUuid: "d2c377a2-8fb9-8fc1-accf-a80ccd223c44"
    - stage: boundary
      stageUuid: "68cede19-1459-81ac-a092-46840831cc7a"
    - stage: links
      stageUuid: "31ff1e16-7941-801c-b5f0-29cabd75f27b"
    - stage: horo
      stageUuid: "91ab1fed-d152-83ab-bbe8-b0b70646955c"
    - stage: seal
      stageUuid: "927c9d44-a79f-8462-b6cf-0e61e32bf3b1"
    - stage: uuid
      stageUuid: "f2817de3-a4d3-80e8-aa47-373b57810816"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
