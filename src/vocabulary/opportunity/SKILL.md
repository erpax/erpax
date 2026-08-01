---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 5/round · 2641ee77"
contentUuid: "df736d8e-b95c-5177-98b2-366c042dd877"
diamondUuid: "a56af739-bffa-894b-aa4e-606104881dd2"
uuid: "2641ee77-5740-8850-8b9f-56b5727deb2f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "8bbd9e64-684d-8c04-937e-06a9a2916d77"
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
      stageUuid: "8ac87097-04ce-8872-82f6-f54ea8283f58"
    - stage: seal
      stageUuid: "9ec30662-59f4-87ce-ad0a-5a81df1a0f48"
    - stage: uuid
      stageUuid: "13850983-6ed2-8e4a-933a-b60eb624d857"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
