---
name: forecasts
description: "Use when forecasting on Earth's cardinal homology tips — phase-locked ±ω steps at 0°·90°·180°·270°, composed with navigation.predictNext; structural forecasts only (not weather); physical datum WGS 84."
atomPath: forecasts
coordinate: "forecasts · 5/round · f5150ce2"
contentUuid: "f3d60134-b24b-56a8-93c0-b3130a54b4fa"
diamondUuid: "73ce6795-6a37-8eb4-949b-4206c6c12aed"
uuid: "f5150ce2-176c-8cf3-9da3-20be522d1f9f"
horo: 5
typography:
  partition: forecasts
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "90600585-736c-8b90-84fd-734eea8b3063"
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
      stageUuid: "f7073014-deed-8bbf-9f28-5fd70e4dbfb2"
    - stage: seal
      stageUuid: "21ca9dcc-08c3-8fc8-8ddd-28ebfcf3da76"
    - stage: uuid
      stageUuid: "89da3173-0429-8175-8966-d5a38e66cdeb"
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
