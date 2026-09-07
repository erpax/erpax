---
name: upgrade
description: "Use when SKILL.md frontmatter must self-upgrade from live corpus state — connectFrontmatter folds diamond, matrix, typography, standards, bonds, and per-stage signatures into one connected graph."
atomPath: "skill/router/upgrade"
coordinate: "skill/router/upgrade · 5/round · a305d805"
contentUuid: "73fd4b0b-bacc-5770-b781-47b6ddd4b10f"
diamondUuid: "178a8254-a3a9-8f12-8b6f-e700af349037"
uuid: "a305d805-5f41-82a8-9990-7adea34a6e12"
horo: 5
typography:
  partition: skill
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "af28e342-44cb-89f4-9941-76f1e29e530c"
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
      stageUuid: "f25474e5-a9ff-8e0d-a345-7497acd54500"
    - stage: seal
      stageUuid: "112cda69-592c-8dc2-bac2-4f37c2328402"
    - stage: uuid
      stageUuid: "b469b381-62f4-80fe-a8a2-5a21daad7b52"
version: 2
---
# upgrade

Computational frontmatter for the skill corpus: derived from `deriveFolderModel`, `diamondUuid`, `coordinateAddress`, typography partitions, and the diamond pipeline stage chain (`path` → `trinity` → `boundary` → `links` → `horo` → `seal` → `uuid`) — never hand-pinned. Each stage carries a `stageUuid`; the fold is `computationUuid`. Materialize with `pnpm skill:upgrade`; gate with `pnpm skill:upgrade:check`.

**Law — [[law]]: sign every document at every stage in frontmatter — `signatures.stages[]` must match recomputed `computeDiamond` seals; drift fails closed.**

Composes [[skill/router]] · [[readme]] · [[diamond]] · [[matrix]] · [[typography]] · [[integrity]]
