---
name: temporal
description: "Use when reasoning about temporal — The \\\"temporal\\\" property can be used in cases where more specific properties (e.g. temporalCoverage, dateCreated, dateModified, datePublished) are not known to be appropriate."
atomPath: temporal
coordinate: temporal · 2/share · ca0b9ace
contentUuid: "4e972911-9b58-5bff-9c19-2f1775caeacb"
diamondUuid: "e838edf4-f025-8d8c-9589-d23b4d75d11e"
uuid: "ca0b9ace-85ec-86a5-b39d-a915ff5432d1"
horo: 2
bonds:
  in:
    - coverage
    - law
  out:
    - coverage
    - law
typography:
  partition: temporal
  bondDegree: 7
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - coverage
    - law
  matrix:
    - coverage
    - law
  backlinks:
    - coverage
    - law
signatures:
  computationUuid: "925d9de1-0e06-8c10-84ee-817ca5b6a470"
  stages:
    - stage: path
      stageUuid: "88d847b6-35fd-8a65-925e-ff5ce5002724"
    - stage: trinity
      stageUuid: "3faad6ba-f320-8df0-b6a9-2c05b390e4e4"
    - stage: boundary
      stageUuid: "045770c1-b447-8d00-96d3-bf7dc27d054a"
    - stage: links
      stageUuid: "4345481b-0e97-8c42-85bb-0cad4f9ee57e"
    - stage: horo
      stageUuid: "64294c53-8efa-8f78-b058-c111fcbe8a69"
    - stage: seal
      stageUuid: "c7ac08ca-4440-8271-adf5-5c8429139fdd"
    - stage: uuid
      stageUuid: "142227d8-dd6a-897b-b725-3f5b225c65be"
version: 2
---
# temporal

The "temporal" property can be used in cases where more specific properties (e.g. temporalCoverage, dateCreated, dateModified, datePublished) are not known to be appropriate.

Entangled with — [[coverage]]

Attested in schema.org — temporal · temporalCoverage

**Law — [[law]]: the unspecific time qualifier is the fallback used only when no sharper date property fits, so temporal and temporalCoverage collapse to one identity that never competes with a more specific term.**

@standard schema.org — the type vocabulary, collided to single words
