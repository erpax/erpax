---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 8/crest · d44a5a88"
contentUuid: "75f1c294-e2e6-52c1-8f33-0d60ce5e285b"
diamondUuid: "bce3bc66-d8df-8b0d-a8ad-eac88db16a64"
uuid: "d44a5a88-d91a-8d81-a4ca-14219a598cd2"
horo: 8
typography:
  partition: skill
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "ccb992f4-4da2-8f85-bef6-27e497adcb48"
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
      stageUuid: "2f959b7c-a1af-8d8d-9100-72eac0fb5286"
    - stage: seal
      stageUuid: "112cda69-592c-8dc2-bac2-4f37c2328402"
    - stage: uuid
      stageUuid: "d3322125-0c2f-82f5-87a1-81b80fc87c44"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
