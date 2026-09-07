---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 7/descent · 2eedfcf2"
contentUuid: "eb885c75-72e0-51b9-bb06-710e6bbc76a8"
diamondUuid: "71d6d11f-10e4-82d7-af1d-ca646804a434"
uuid: "2eedfcf2-ffa9-8947-8fd6-aa8d8abc5ca1"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "057226d4-c2a6-8c57-bae7-22eaa7464fb7"
  stages:
    - stage: path
      stageUuid: "55b09bb4-a26b-81a0-8686-3bd22f932684"
    - stage: trinity
      stageUuid: "24c125dd-84c1-89c7-8072-ffcabd85312e"
    - stage: boundary
      stageUuid: "29afa034-64ed-846e-994d-569d9644ac14"
    - stage: links
      stageUuid: "72e2955a-e909-8390-bf46-e4cc1d2ac871"
    - stage: horo
      stageUuid: "5a1f72c0-472c-8750-9a93-500f528552b3"
    - stage: seal
      stageUuid: "79d61cd3-02a8-8101-aa76-fa3783faa6fd"
    - stage: uuid
      stageUuid: "c2dbfa0b-2d25-8a50-b89e-a2239d086ca0"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
