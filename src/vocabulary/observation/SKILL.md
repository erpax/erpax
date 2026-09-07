---
name: observation
description: "Use when reasoning about observation — Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredP"
atomPath: "vocabulary/observation"
coordinate: "vocabulary/observation · 5/round · 1d9a56e2"
contentUuid: "5199f199-ab34-505c-bfd8-39ba6500e72e"
diamondUuid: "b1ad8df1-7bd3-8e28-866f-3bcc5f1fa366"
uuid: "1d9a56e2-a2a4-8864-b236-398edfa51a9b"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 25
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "d05cdc29-a440-87bb-8c46-380a982f0139"
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
      stageUuid: "90841292-3ce5-869d-a27e-e9a3abea8f37"
    - stage: seal
      stageUuid: "6558ffde-c567-888e-829e-2af4ed62e8f3"
    - stage: uuid
      stageUuid: "c69e0092-9d15-8f3f-9544-83166509861c"
version: 2
---
# observation

Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredProperty, statType, [[value] and observationDate and measuredProperty. Some but not all Observations represent a QuantitativeValue. Quantitative observations can be about a StatisticalVariable, which is an abstract specification about which we can make observations that are grounded at a particular location and time. Observations can also encode a subset of simple RDF-like statements (its observationAbout, a StatisticalVariable, defining the measuredPoperty; its observationAbout property indicating the entity the statement is about, and value ) In the context of a quantitative knowledge graph, typical properties could include measuredProperty, observationAbout, observationDate, value, unitCode, unitText, measurementMethod.

Entangled with — [[about]] · [[date]] · [[period]]

Attested in schema.org — Observation · observationAbout · observationDate · observationPeriod

**Law — [[law]]: observation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
