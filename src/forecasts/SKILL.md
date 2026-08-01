---
name: forecasts
description: "Use when forecasting on Earth's cardinal homology tips — phase-locked ±ω steps at 0°·90°·180°·270°, composed with navigation.predictNext; structural forecasts only (not weather); physical datum WGS 84."
atomPath: forecasts
coordinate: "forecasts · 5/round · 078e97db"
contentUuid: "d6cac72d-3e66-5273-b9df-c4fcfc37a06d"
diamondUuid: "4ec1fde0-7569-86dc-a987-e7b2b1b60ba7"
uuid: "078e97db-2000-849c-9574-8674d930e1bd"
horo: 5
typography:
  partition: forecasts
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "cd55a1f8-2975-873e-aa16-8c90c7b7400e"
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
      stageUuid: "9669c116-2634-876c-b944-f6667bcd8f3b"
    - stage: seal
      stageUuid: "21ca9dcc-08c3-8fc8-8ddd-28ebfcf3da76"
    - stage: uuid
      stageUuid: "1f6ffdbf-5c19-8c43-b600-8634dd40022d"
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
