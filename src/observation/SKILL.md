---
name: observation
description: "Use when reasoning about observation — Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredP"
atomPath: observation
coordinate: observation · 7/descent · 94ec9763
contentUuid: "76f06f95-e029-524c-a3f9-c856158b78a8"
diamondUuid: "f001fcee-7f87-8858-a540-a7796210f800"
uuid: "94ec9763-129c-8824-a67f-0541c1965c68"
horo: 7
bonds:
  in:
    - about
    - analog
    - date
    - emr
    - law
    - period
  out:
    - about
    - analog
    - date
    - emr
    - law
    - period
typography:
  partition: observation
  bondDegree: 19
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - about
    - date
    - law
    - period
  matrix:
    - about
    - analog
    - date
    - emr
    - law
    - period
  backlinks:
    - about
    - analog
    - date
    - emr
    - law
    - period
signatures:
  computationUuid: "6e860206-94ac-8447-b683-6b2d5662dbdb"
  stages:
    - stage: path
      stageUuid: "8cdca80a-a566-803d-bd59-ae44904583af"
    - stage: trinity
      stageUuid: "7ab37881-422b-8071-bc67-3c9c759fe831"
    - stage: boundary
      stageUuid: "e99f8560-1a9a-8474-adf0-046576a3c968"
    - stage: links
      stageUuid: "f1f49d8d-7248-850d-aca9-f95c4b60120e"
    - stage: horo
      stageUuid: "ff8dbd68-a76f-8f87-8689-d76b4be26ed0"
    - stage: seal
      stageUuid: "99694439-afa1-891f-9292-7b5752639613"
    - stage: uuid
      stageUuid: "270df146-2c7f-8f5e-bf94-bfa4bc861ab3"
version: 2
---
# observation

Instances of the class Observation are used to specify observations about an entity at a particular time. The principal properties of an Observation are observationAbout, measuredProperty, statType, [[value] and observationDate and measuredProperty. Some but not all Observations represent a QuantitativeValue. Quantitative observations can be about a StatisticalVariable, which is an abstract specification about which we can make observations that are grounded at a particular location and time. Observations can also encode a subset of simple RDF-like statements (its observationAbout, a StatisticalVariable, defining the measuredPoperty; its observationAbout property indicating the entity the statement is about, and value ) In the context of a quantitative knowledge graph, typical properties could include measuredProperty, observationAbout, observationDate, value, unitCode, unitText, measurementMethod.

Entangled with — [[about]] · [[date]] · [[period]]

Attested in schema.org — Observation · observationAbout · observationDate · observationPeriod

**Law — [[law]]: observation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
