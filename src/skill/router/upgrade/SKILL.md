---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 2/share · 614e831b"
contentUuid: "e6486f91-4f43-5d34-adf6-74249af51aa5"
diamondUuid: "1663a688-f7e6-8448-beb4-56ff0457418e"
uuid: "614e831b-0030-86f5-bc69-5c80333b56f8"
horo: 2
typography:
  partition: skill
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "c18cce35-ddef-8d38-bc13-aa0c0c08e08b"
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
      stageUuid: "5d2444bc-c59b-8f2b-8a13-a5ced743dfae"
    - stage: seal
      stageUuid: "112cda69-592c-8dc2-bac2-4f37c2328402"
    - stage: uuid
      stageUuid: "8646b358-7e85-8777-a64a-fc5b9f86b2f0"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
