---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 2/share · 4e850bf8"
contentUuid: "784b2920-73f0-5b9a-8a50-f3722c2dd0a3"
diamondUuid: "550524e8-3f83-8faa-be47-252373528a38"
uuid: "4e850bf8-9323-85c4-bdeb-978cfec121cf"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "f7cb6c18-2826-8afe-a5f9-fda7f881d164"
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
      stageUuid: "6b40552d-e0de-80bd-89b8-2978c4b54cf5"
    - stage: seal
      stageUuid: "79d61cd3-02a8-8101-aa76-fa3783faa6fd"
    - stage: uuid
      stageUuid: "705a015e-de18-8999-8e3c-1ac218eec0ed"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
