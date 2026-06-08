---
name: quota
description: "Use when setting or tracking rep/team/territory sales targets — period quota, attainment %, variance to goal; often linked to compensation."
atomPath: quota
coordinate: quota · 5/round · 9dc32bc0
contentUuid: "6a781d66-e8d1-5797-bfca-7a5c2dc82549"
diamondUuid: "58195f52-cd02-8983-ab18-b0ca70f5b088"
uuid: "9dc32bc0-c0fc-837e-ac37-e15d11781f38"
horo: 5
bonds:
  in:
    - commissions
    - employees
    - forecast
    - grade
    - law
    - periods
    - territory
  out:
    - commissions
    - employees
    - forecast
    - grade
    - law
    - periods
    - territory
typography:
  partition: quota
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - commissions
    - employees
    - forecast
    - law
    - periods
    - territory
  matrix:
    - commissions
    - employees
    - forecast
    - grade
    - law
    - periods
    - territory
  backlinks:
    - commissions
    - employees
    - forecast
    - grade
    - law
    - periods
    - territory
signatures:
  computationUuid: "64984c80-f77a-8c14-8c08-c85764e3f618"
  stages:
    - stage: path
      stageUuid: "c6950aa9-bb9e-8aed-b364-9d19a0cef7b3"
    - stage: trinity
      stageUuid: "5347d44e-4256-890f-886c-47044d5f8f29"
    - stage: boundary
      stageUuid: "bad5afe8-226f-8a68-a007-b3c7499065d9"
    - stage: links
      stageUuid: "604e41cb-5e4e-85ea-884e-7e3578161ed6"
    - stage: horo
      stageUuid: "e48f0d5e-1c59-8613-a086-4d0a0f49ab29"
    - stage: seal
      stageUuid: "fddea473-5ecf-8c6f-971e-9d8a6ed6ecc9"
    - stage: uuid
      stageUuid: "4880d4dc-8334-8ddd-b232-f1c800fedd3b"
version: 2
---
# quota

Use when setting or tracking rep/team/territory sales targets — period quota, attainment %, variance to goal; often linked to compensation.

Composes: [[forecast]] · [[employees/sales/commissions]] · [[Employees]] · [[fiscal/periods]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a quota is a period sales target for a rep, team, or territory, against which attainment % and variance-to-goal are measured — often the basis of compensation.**
