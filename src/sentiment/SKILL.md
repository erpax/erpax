---
name: sentiment
description: "Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score."
atomPath: sentiment
coordinate: "sentiment · 5/round · d26e3e59"
contentUuid: "f8d5512a-6cbb-5051-9025-4f6657749e39"
diamondUuid: "a5270eec-ef6c-83df-962d-e76f90122365"
uuid: "d26e3e59-eac4-8e93-8acd-ca6ebabb0e77"
horo: 5
typography:
  partition: sentiment
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "9127f7d4-5e26-8a65-ba2d-6468fe91d05a"
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
      stageUuid: "5c9cdcc4-1f64-86ce-a27b-fb231df9b333"
    - stage: seal
      stageUuid: "ab5971c2-6b55-8564-88a7-22f185c5e003"
    - stage: uuid
      stageUuid: "d7635679-adfa-8717-8268-6172e7ace38d"
version: 2
---
# sentiment

Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score.

Composes: [[comment]] · [[Activities]] · [[satisfaction]] · [[feedback]].

**Law — [[law]]: the polarity and intensity of emotion (positive/negative/neutral, a score) read from text, survey, or interaction.**

## Standards
- NLP sentiment analysis
- VADER/TextBlob scoring
