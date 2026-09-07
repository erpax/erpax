---
name: observation
description: "Use when reasoning about observation — Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredP"
atomPath: "vocabulary/observation"
coordinate: "vocabulary/observation · 4/weave · cc96fb35"
contentUuid: "fb623bb1-efbe-585e-ba5e-39a7e846f95a"
diamondUuid: "d673466f-dc9b-8f80-a5d9-15587b4853a6"
uuid: "cc96fb35-78de-8476-96a4-3ae24fac1245"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "116ef81d-69c3-8d0f-aaf3-66fcc8cb8723"
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
      stageUuid: "30a4749a-66f3-8184-bdc2-2ce24e75b06c"
    - stage: seal
      stageUuid: "6558ffde-c567-888e-829e-2af4ed62e8f3"
    - stage: uuid
      stageUuid: "c8cd058b-4115-8538-8d1e-9ba13fd16716"
version: 2
---
# observation

Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredProperty, statType, [[value] and observationDate and measuredProperty. Some but not all Observations represent a QuantitativeValue. Quantitative observations can be about a StatisticalVariable, which is an abstract specification about which we can make observations that are grounded at a particular location and time. Observations can also encode a subset of simple RDF-like statements (its observationAbout, a StatisticalVariable, defining the measuredPoperty; its observationAbout property indicating the entity the statement is about, and value ) In the context of a quantitative knowledge graph, typical properties could include measuredProperty, observationAbout, observationDate, value, unitCode, unitText, measurementMethod.

Entangled with — [[about]] · [[date]] · [[period]]

Attested in schema.org — Observation · observationAbout · observationDate · observationPeriod

**Law — [[law]]: observation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
