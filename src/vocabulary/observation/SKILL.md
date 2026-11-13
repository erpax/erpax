---
name: observation
description: "Use when reasoning about observation — Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredP"
atomPath: "vocabulary/observation"
coordinate: "vocabulary/observation · 4/weave · 3f956644"
contentUuid: "08787b52-f389-51a1-94f8-709cbd6c9713"
diamondUuid: "1202d1a4-88c3-87cd-9f4b-a88aa2189676"
uuid: "3f956644-61d0-8499-8c09-6582ccdee0fa"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 22
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "c3ab4a0d-cb80-8cf8-a160-1a5341442f84"
  stages:
    - stage: path
      stageUuid: "2267ec5b-8745-8e15-b86f-e3bc1f5466f8"
    - stage: trinity
      stageUuid: "4a64fbfc-0bb7-896e-8dcc-8e3546c3f4f9"
    - stage: boundary
      stageUuid: "cc63c674-3b3a-824f-b204-70244143ff08"
    - stage: links
      stageUuid: "8a4ec7ce-3c76-8357-99d1-9f864b87016a"
    - stage: horo
      stageUuid: "751f0d36-a0f7-8e04-bac0-455ee4ea5a8d"
    - stage: seal
      stageUuid: "6558ffde-c567-888e-829e-2af4ed62e8f3"
    - stage: uuid
      stageUuid: "1de1cb76-3a6c-8696-8795-ed82520f3330"
version: 2
---
# observation

Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredProperty, statType, [[value] and observationDate and measuredProperty. Some but not all Observations represent a QuantitativeValue. Quantitative observations can be about a StatisticalVariable, which is an abstract specification about which we can make observations that are grounded at a particular location and time. Observations can also encode a subset of simple RDF-like statements (its observationAbout, a StatisticalVariable, defining the measuredPoperty; its observationAbout property indicating the entity the statement is about, and value ) In the context of a quantitative knowledge graph, typical properties could include measuredProperty, observationAbout, observationDate, value, unitCode, unitText, measurementMethod.

Entangled with — [[about]] · [[date]] · [[period]]

Attested in schema.org — Observation · observationAbout · observationDate · observationPeriod

**Law — [[law]]: observation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
