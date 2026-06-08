---
name: sentiment
description: "Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score."
atomPath: sentiment
coordinate: sentiment · 8/crest · 2b154507
contentUuid: "c3c10ded-b124-50b8-bb10-281eb587ce21"
diamondUuid: "b5487658-05aa-8926-801b-919285db1ec4"
uuid: "2b154507-57ad-8bbe-8610-8c7f2cbb6b61"
horo: 8
bonds:
  in:
    - activities
    - comment
    - engagement
    - feedback
    - law
    - satisfaction
  out:
    - activities
    - comment
    - engagement
    - feedback
    - law
    - satisfaction
typography:
  partition: sentiment
  bondDegree: 19
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - comment
    - feedback
    - law
    - satisfaction
  matrix:
    - activities
    - comment
    - engagement
    - feedback
    - law
    - satisfaction
  backlinks:
    - activities
    - comment
    - engagement
    - feedback
    - law
    - satisfaction
signatures:
  computationUuid: "63039019-9fe1-8e4a-997c-a8ad26134b80"
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
      stageUuid: "339ac202-74b5-8e7f-9f5b-d4b3b79ef48e"
    - stage: seal
      stageUuid: "b0966f5f-3a33-84d3-a458-715a60ab3d7c"
    - stage: uuid
      stageUuid: "00092dfd-9aa2-86d5-9ebc-744ee47f9c00"
version: 2
---
# sentiment

Use when analyzing emotional tone — from text, survey, or interaction. The polarity/intensity of emotion (positive/negative/neutral) or sentiment score.

Composes: [[comment]] · [[Activities]] · [[satisfaction]] · [[feedback]].

**Law — [[law]]: the polarity and intensity of emotion (positive/negative/neutral, a score) read from text, survey, or interaction.**

## Standards
- NLP sentiment analysis
- VADER/TextBlob scoring
