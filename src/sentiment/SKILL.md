---
name: sentiment
description: "Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score."
atomPath: sentiment
coordinate: "sentiment · 5/round · 02dcbdcb"
contentUuid: "5840b118-6e39-5831-ab92-889ff8931f66"
diamondUuid: "0e40b87b-f0b7-843b-8a5d-16c30c770c2b"
uuid: "02dcbdcb-26ec-8a68-bc7b-29a5b7151028"
horo: 5
typography:
  partition: sentiment
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "37fdeff7-b883-876f-aaf0-f0ed00b7e4a6"
  stages:
    - stage: path
      stageUuid: "46d13c32-4944-8243-9098-9fd22f8c6f76"
    - stage: trinity
      stageUuid: "b60a575f-31b6-8a59-9581-8aa5ef7aa212"
    - stage: boundary
      stageUuid: "edf7f879-a79f-8ff8-8395-56a3d498e556"
    - stage: links
      stageUuid: "481de95b-b936-8849-be12-6ead952fa81d"
    - stage: horo
      stageUuid: "3dab033b-93ce-8a25-b1ee-40366283e86c"
    - stage: seal
      stageUuid: "ab5971c2-6b55-8564-88a7-22f185c5e003"
    - stage: uuid
      stageUuid: "ffddbf53-2011-85c1-bc6c-8acef280cee2"
version: 2
---
# sentiment

Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score.

Composes: [[comment]] · [[Activities]] · [[satisfaction]] · [[feedback]].

**Law — [[law]]: the polarity and intensity of emotion (positive/negative/neutral, a score) read from text, survey, or interaction.**

## Standards
- NLP sentiment analysis
- VADER/TextBlob scoring
