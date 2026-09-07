---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: "vocabulary/opportunity"
coordinate: "vocabulary/opportunity · 5/round · a3a60616"
contentUuid: "0dbf8c85-4957-59ad-8f2d-7ae5da16de60"
diamondUuid: "a2f8392f-1224-8d71-9f26-b2c00771e7be"
uuid: "a3a60616-660e-8944-83e8-b29bf88b8327"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "0709e2fd-5147-8bfc-8689-98d8eacc4965"
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
      stageUuid: "b405ea3b-c7cd-8c2c-977c-6e2d0f5666b7"
    - stage: seal
      stageUuid: "79d61cd3-02a8-8101-aa76-fa3783faa6fd"
    - stage: uuid
      stageUuid: "11393d96-5e57-89f9-a530-e5080f496229"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
