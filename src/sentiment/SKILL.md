---
name: sentiment
description: "Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score."
atomPath: sentiment
coordinate: "sentiment · 5/round · 8cf4d97d"
contentUuid: "e8994a18-0336-57dc-ad30-f7cf48bb460f"
diamondUuid: "b898d2f8-bf80-85e8-a8b5-8e6f775ab733"
uuid: "8cf4d97d-9df6-8d27-8202-cb922bdc679f"
horo: 5
typography:
  partition: sentiment
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "f2b2fd6a-b6c8-854e-bbb7-9322fa21b6c0"
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
      stageUuid: "899acdac-01fc-8e01-8e8a-98d61e5e5a9b"
    - stage: seal
      stageUuid: "ab5971c2-6b55-8564-88a7-22f185c5e003"
    - stage: uuid
      stageUuid: "a8fd668a-7098-8781-a557-e97e4b988eed"
version: 2
---
# sentiment

Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score.

Composes: [[comment]] · [[Activities]] · [[satisfaction]] · [[feedback]].

**Law — [[law]]: the polarity and intensity of emotion (positive/negative/neutral, a score) read from text, survey, or interaction.**

## Standards
- NLP sentiment analysis
- VADER/TextBlob scoring
