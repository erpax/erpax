---
name: forecasts
description: "Use when forecasting on Earth's cardinal homology tips — phase-locked ±ω steps at 0°·90°·180°·270°, composed with navigation.predictNext; structural forecasts only (not weather); physical datum WGS 84."
atomPath: forecasts
coordinate: "forecasts · 5/round · 1c12c832"
contentUuid: "e400e1d5-d3d7-5cd8-bcd6-8f9f084d4ac7"
diamondUuid: "68d9a76f-996a-87d6-a22f-4448ced93cdd"
uuid: "1c12c832-de36-883c-b115-18e0b3250fb4"
horo: 5
typography:
  partition: forecasts
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "bca759e1-6262-8560-904f-0b0a6c1893bd"
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
      stageUuid: "396ef000-247c-816b-8e99-4b7909c2dd86"
    - stage: seal
      stageUuid: "21ca9dcc-08c3-8fc8-8ddd-28ebfcf3da76"
    - stage: uuid
      stageUuid: "372ad767-7f76-87fb-b1ac-ec45776d87f9"
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
