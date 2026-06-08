---
name: redirect
description: Use when modelling one redirect — the singular model of the redirects collection (the plural store); a rule that forwards one address to another.
atomPath: redirect
coordinate: redirect · 4/weave · 9fa0b847
contentUuid: "03e204c3-71b9-5eb6-a799-0d83bc552e61"
diamondUuid: "7e782519-62a3-8ba8-810e-d6367fa4ab4e"
uuid: "9fa0b847-a4f8-8a2e-8d8b-e43e28095950"
horo: 4
bonds:
  in:
    - balance
    - law
    - redirects
    - url
  out:
    - balance
    - law
    - redirects
    - url
typography:
  partition: redirect
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - redirects
    - url
  matrix:
    - balance
    - law
    - redirects
    - url
  backlinks:
    - balance
    - law
    - redirects
    - url
signatures:
  computationUuid: "dce8e1e2-a080-8736-bee9-4ea1f1d70006"
  stages:
    - stage: path
      stageUuid: "9586b685-7f39-8c00-87d3-601d638c1f4c"
    - stage: trinity
      stageUuid: "a06419d4-207b-852c-92f6-7a3374e2ca41"
    - stage: boundary
      stageUuid: "41960c6f-4f8a-8426-af42-f8b57a6ea366"
    - stage: links
      stageUuid: "8213248c-03f8-8c6c-ae6c-4cfe1d2a08f8"
    - stage: horo
      stageUuid: "5673d45c-2ece-80a4-a292-1252f4bed1e2"
    - stage: seal
      stageUuid: "1a47c226-c5fd-89c0-b346-240a61076839"
    - stage: uuid
      stageUuid: "071b23e9-33b3-8782-a977-c7ceb366dfd0"
version: 2
---
# redirect — the model of one [[redirects]] row

A rule that forwards one address to another. The singular model whose plural store is the [[redirects]] collection ([[balance]]: every collection has its model).

Composes [[redirects]] · [[url]] · [[balance]].

**Law — [[law]]: one redirect is the singular model of one [[redirects]] row — a rule forwarding one address to another; every collection has its model ([[balance]]).**
