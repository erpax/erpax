---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: total · 1/base · 4f034740
contentUuid: "5a6ded9f-8556-5592-b05f-8e9fb7e1e9cc"
diamondUuid: "6bceb5be-19a0-87e4-b93b-7d1dc3d56d69"
uuid: "4f034740-4642-853e-94bf-3757169822bf"
horo: 1
bonds:
  in:
    - amount
    - bathrooms
    - calculate
    - currency
    - due
    - enrollment
    - fields
    - historical
    - job
    - measure
    - openings
    - price
    - weight
  out:
    - amount
    - bathrooms
    - calculate
    - currency
    - due
    - enrollment
    - fields
    - historical
    - job
    - measure
    - openings
    - price
    - weight
typography:
  partition: total
  bondDegree: 39
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - amount
    - calculate
    - currency
    - fields
    - measure
  matrix:
    - amount
    - bathrooms
    - calculate
    - currency
    - due
    - enrollment
    - fields
    - historical
    - job
    - measure
    - openings
    - price
    - weight
  backlinks:
    - amount
    - bathrooms
    - calculate
    - currency
    - due
    - enrollment
    - fields
    - historical
    - job
    - measure
    - openings
    - price
    - weight
signatures:
  computationUuid: "fcb69f9a-a775-813c-91ec-057d678bdf64"
  stages:
    - stage: path
      stageUuid: "d479f207-d9e1-8a56-89c1-808cfe9600c8"
    - stage: trinity
      stageUuid: "0906d82a-11a2-8a76-91bc-868846d22bfb"
    - stage: boundary
      stageUuid: "27a123d2-d145-8bcb-b1c4-e6e833b827e1"
    - stage: links
      stageUuid: "1d223002-1c91-8246-a8c4-5550d841b582"
    - stage: horo
      stageUuid: "10be906d-8449-8dd3-a97c-b1c49ffde2cf"
    - stage: seal
      stageUuid: "204dfe07-235e-8d2c-b450-870f875b7c6a"
    - stage: uuid
      stageUuid: "4f067ff6-98fe-80f4-9191-fcf992d2e101"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[fields]] · [[calculate]] · [[measure]].

## Standards
- ISO-4217:2015
