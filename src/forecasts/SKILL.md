---
name: forecasts
description: "Use when forecasting on Earth's cardinal homology tips — phase-locked ±ω steps at 0°·90°·180°·270°, composed with navigation.predictNext; structural forecasts only (not weather); physical datum WGS 84."
atomPath: forecasts
coordinate: "forecasts · 1/base · ce2c6e14"
contentUuid: "3ad973ac-822d-53d3-9cd1-776211e83932"
diamondUuid: "1e39a348-e789-85de-846a-4ec17d24ab4e"
uuid: "ce2c6e14-ad00-8b2c-9f5e-0f5a7f129d38"
horo: 1
typography:
  partition: forecasts
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "13d799ab-5b09-8df4-b3ef-7ecc0810882f"
  stages:
    - stage: path
      stageUuid: "26c5b5c7-1b4b-8ff0-b062-13ececef6854"
    - stage: trinity
      stageUuid: "416da05a-7c4a-89df-9d91-c69afc681caa"
    - stage: boundary
      stageUuid: "9f3ed485-fa6b-85a7-b7b9-b22f5ce63543"
    - stage: links
      stageUuid: "feefc8f9-3c55-8019-a0cf-61c65489372c"
    - stage: horo
      stageUuid: "596b6947-97c9-8023-80f1-949662d225d9"
    - stage: seal
      stageUuid: "21ca9dcc-08c3-8fc8-8ddd-28ebfcf3da76"
    - stage: uuid
      stageUuid: "09ac8444-9c98-8d49-b286-d2d05d3c0144"
version: 2
---
# forecasts — phase-locked Earth tip forecasts

**Law — [[law]]: the next tip is the current tip advanced by ±90° under alternating ±ω on the square homology ring. `forecastEarth` folds tip forecasts with [[navigation]].`predictNext`. Not meteorology — structural isomorphism only.**

| step | function |
| --- | --- |
| one tip | `forecastTip` |
| ring | `forecastTipRing` |
| earth + nav | `forecastEarth` |

Composes [[earth]] · [[navigation]].
