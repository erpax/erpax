---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 1/base · ede79ba1"
contentUuid: "3d9dff5e-1900-50cf-9ba6-ec2b782105bb"
diamondUuid: "f497553a-7b8b-81ea-bd32-20156dc71ed2"
uuid: "ede79ba1-39e2-8c58-8eaa-361710796819"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "02a685d7-7739-85ce-911c-aee2db4a1937"
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
      stageUuid: "98c3ef94-7545-86fd-b50c-4e55b745a67d"
    - stage: seal
      stageUuid: "79d61cd3-02a8-8101-aa76-fa3783faa6fd"
    - stage: uuid
      stageUuid: "38a46a2b-d6a5-8ba6-8dad-7924360eee29"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
