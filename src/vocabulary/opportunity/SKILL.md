---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 5/round · 07c84709"
contentUuid: "404c9a48-92cd-510c-8b1a-6c87f2302953"
diamondUuid: "00d3368b-f3af-868a-9f51-1b21fcadbbf5"
uuid: "07c84709-33ea-8bea-b962-ab4fa1f7e9ac"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "2a5337ce-18a2-85be-8344-2d5ed521307e"
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
      stageUuid: "cabefc4d-5443-82d6-a0d8-1de8013be7cb"
    - stage: seal
      stageUuid: "79d61cd3-02a8-8101-aa76-fa3783faa6fd"
    - stage: uuid
      stageUuid: "6c82a3d0-f8bf-8a1a-a5fd-e517b60a19a5"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
