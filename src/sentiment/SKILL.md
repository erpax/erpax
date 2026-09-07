---
name: sentiment
description: "Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score."
atomPath: sentiment
coordinate: "sentiment · 5/round · 4d3ae5ce"
contentUuid: "a4e7903a-09b5-5336-b332-aaed1231f767"
diamondUuid: "cb465d89-db97-8893-bbe5-759d7536af12"
uuid: "4d3ae5ce-bb91-8c92-af18-f6b687afd1ef"
horo: 5
typography:
  partition: sentiment
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "78ba00be-daf9-885a-b161-1a98aae171a3"
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
      stageUuid: "de53acd7-87d3-8327-ae3e-8ce4a55ab976"
    - stage: seal
      stageUuid: "ab5971c2-6b55-8564-88a7-22f185c5e003"
    - stage: uuid
      stageUuid: "06fdc57e-a6d7-82b2-bd0f-cea58b73d70e"
version: 2
---
# sentiment

Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score.

Composes: [[comment]] · [[Activities]] · [[satisfaction]] · [[feedback]].

**Law — [[law]]: the polarity and intensity of emotion (positive/negative/neutral, a score) read from text, survey, or interaction.**

## Standards
- NLP sentiment analysis
- VADER/TextBlob scoring
