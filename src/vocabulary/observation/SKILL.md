---
name: observation
description: "Use when reasoning about observation — Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredP"
atomPath: "vocabulary/observation"
coordinate: "vocabulary/observation · 4/weave · 3f956644"
contentUuid: "89d04861-2cab-5176-a87a-d7442c88704c"
diamondUuid: "191017a6-3a4e-8184-8ab2-85bc848d6175"
uuid: "3f956644-61d0-8499-8c09-6582ccdee0fa"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "3063734a-bb64-85bf-976e-65f3e032259d"
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
      stageUuid: "9609d073-32d3-8654-b658-476d4fdd1043"
    - stage: seal
      stageUuid: "6558ffde-c567-888e-829e-2af4ed62e8f3"
    - stage: uuid
      stageUuid: "901f2333-ad0c-8a1e-85ee-182d256a5bea"
version: 2
---
# observation

Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredProperty, statType, [[value] and observationDate and measuredProperty. Some but not all Observations represent a QuantitativeValue. Quantitative observations can be about a StatisticalVariable, which is an abstract specification about which we can make observations that are grounded at a particular location and time. Observations can also encode a subset of simple RDF-like statements (its observationAbout, a StatisticalVariable, defining the measuredPoperty; its observationAbout property indicating the entity the statement is about, and value ) In the context of a quantitative knowledge graph, typical properties could include measuredProperty, observationAbout, observationDate, value, unitCode, unitText, measurementMethod.

Entangled with — [[about]] · [[date]] · [[period]]

Attested in schema.org — Observation · observationAbout · observationDate · observationPeriod

**Law — [[law]]: observation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
