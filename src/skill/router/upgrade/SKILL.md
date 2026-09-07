---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 1/base · bc20f403"
contentUuid: "b3a5ce5a-71a2-5eff-873b-4ebdfe2e9a4c"
diamondUuid: "5ade5f70-9c49-8972-9311-11aaef171523"
uuid: "bc20f403-2d8b-8e44-a758-216baced24db"
horo: 1
typography:
  partition: skill
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "9b634b63-33f0-85f4-b1a5-cd68d24f2f6c"
  stages:
    - stage: path
      stageUuid: "08fa6562-690a-8980-8cff-5da4617f17e8"
    - stage: trinity
      stageUuid: "d2c377a2-8fb9-8fc1-accf-a80ccd223c44"
    - stage: boundary
      stageUuid: "7ec3bd7e-245e-82ce-a292-3230dd11a298"
    - stage: links
      stageUuid: "9e0a82a7-ba2b-876a-a0ca-9c06fcb887ac"
    - stage: horo
      stageUuid: "4db871f0-7b35-8034-a0da-3039e46bab20"
    - stage: seal
      stageUuid: "112cda69-592c-8dc2-bac2-4f37c2328402"
    - stage: uuid
      stageUuid: "24101b11-3e08-86cc-ad1a-cba1d5eacc5c"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
