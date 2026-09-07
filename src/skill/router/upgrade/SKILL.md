---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 5/round · 6c8b8743"
contentUuid: "7d0d599c-dc55-5522-8130-94549ce595c5"
diamondUuid: "f611939e-be9c-882e-8a58-0c32e5e39173"
uuid: "6c8b8743-8fbf-89be-ad02-bd3d4b11c1b1"
horo: 5
typography:
  partition: skill
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "6e2b98e5-602a-888c-9a52-666d89d24e5e"
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
      stageUuid: "4e21d2d3-46f3-85cc-af71-e512b79e55f4"
    - stage: seal
      stageUuid: "112cda69-592c-8dc2-bac2-4f37c2328402"
    - stage: uuid
      stageUuid: "652ee92e-abcc-81b3-a3c7-7de8b0013b39"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
