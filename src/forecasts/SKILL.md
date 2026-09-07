---
name: forecasts
description: "Use when forecasting on Earth's cardinal homology tips — phase-locked ±ω steps at 0°·90°·180°·270°, composed with navigation.predictNext; structural forecasts only (not weather); physical datum WGS 84."
atomPath: forecasts
coordinate: "forecasts · 2/share · 4c943ce2"
contentUuid: "911abdd4-8567-5b2f-ad52-85249ad86b5c"
diamondUuid: "700582dc-9caa-82dc-8fa5-2c0c5630745c"
uuid: "4c943ce2-2f12-85f9-b4a4-4c0cd6af88a3"
horo: 2
typography:
  partition: forecasts
  bondDegree: 11
standards: []
bindings: []
signatures:
  computationUuid: "8330ddf8-d4de-8489-a0d7-9c728f06a505"
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
      stageUuid: "e6e1ac96-adaa-81f2-b17b-955c836399be"
    - stage: seal
      stageUuid: "21ca9dcc-08c3-8fc8-8ddd-28ebfcf3da76"
    - stage: uuid
      stageUuid: "7edf87f1-9172-821f-bbc3-46fa6df78ae7"
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
