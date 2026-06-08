---
name: opportunity
description: Use when modelling one opportunity — the singular model of the opportunities collection (the plural store); a potential deal tracked through a sales pipeline.
atomPath: opportunity
coordinate: opportunity · 1/base · 5c2b88df
contentUuid: "779b6d29-2267-5158-8647-b913b703b20b"
diamondUuid: "450efc81-ac6b-8d60-8bc5-fe9ebf5e4e74"
uuid: "5c2b88df-b2a4-8ef5-afae-74d213827dba"
horo: 1
bonds:
  in:
    - balance
    - law
    - opportunities
    - sales
  out:
    - balance
    - law
    - opportunities
    - sales
typography:
  partition: opportunity
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - opportunities
    - sales
  matrix:
    - balance
    - law
    - opportunities
    - sales
  backlinks:
    - balance
    - law
    - opportunities
    - sales
signatures:
  computationUuid: "5afc93b9-5575-81c8-8bb5-817d8d929611"
  stages:
    - stage: path
      stageUuid: "c8ef6b21-759e-8629-a0ed-edc38cd55453"
    - stage: trinity
      stageUuid: "ff4baedd-c24f-8926-a027-597f598108a1"
    - stage: boundary
      stageUuid: "4910b224-5daf-8c94-b432-3fb2e53db3ec"
    - stage: links
      stageUuid: "a474c00f-5952-83af-a857-1c8cf103280e"
    - stage: horo
      stageUuid: "3ee0b54d-7dee-8d0f-916c-5be8d60e0b96"
    - stage: seal
      stageUuid: "bc0697f5-b634-8cf6-b8ca-501262d8ec01"
    - stage: uuid
      stageUuid: "0b84b8a2-0864-8cc6-8a18-652168d5e749"
version: 2
---
# opportunity — the model of one [[opportunities]] row

A potential deal tracked through a sales pipeline. The singular model whose plural store is the [[opportunities]] collection ([[balance]]: every collection has its model).

Composes [[opportunities]] · [[sales]] · [[balance]].

**Law — [[law]]: one opportunity is the singular model of exactly one row in its plural store, so the model and the collection stay in one-to-one balance — no row without its model, no model without its row.**
