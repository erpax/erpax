---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 8/crest · 55c7fa8c"
contentUuid: "532623ed-c09d-5b89-89dd-1c1246b2dc02"
diamondUuid: "1288904b-eb43-81e1-9376-f915815e7f9b"
uuid: "55c7fa8c-c592-8144-a9ec-a2f147805cd2"
horo: 8
typography:
  partition: skill
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "6ad4d4b7-fbd6-81eb-afbb-9b53cde36780"
  stages:
    - stage: path
      stageUuid: "08fa6562-690a-8980-8cff-5da4617f17e8"
    - stage: trinity
      stageUuid: "d2c377a2-8fb9-8fc1-accf-a80ccd223c44"
    - stage: boundary
      stageUuid: "68cede19-1459-81ac-a092-46840831cc7a"
    - stage: links
      stageUuid: "9e0a82a7-ba2b-876a-a0ca-9c06fcb887ac"
    - stage: horo
      stageUuid: "2db25c25-5ec1-8770-9a8b-64b65391dfd2"
    - stage: seal
      stageUuid: "a6c699a4-ea39-8a1c-bd54-fe90dbe39a97"
    - stage: uuid
      stageUuid: "d9505f3d-ce3c-868c-b956-a4695ebafd0f"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
