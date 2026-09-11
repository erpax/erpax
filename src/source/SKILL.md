---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: "source · 1/base · 502b02d2"
contentUuid: "d8484ac8-a539-50b1-b21a-8cfd4311d3da"
diamondUuid: "d8f24c8e-49b4-81cd-8040-6d062716d761"
uuid: "502b02d2-03a9-806b-a83e-39b069488dc7"
horo: 1
typography:
  partition: source
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "07db1b69-d672-86f0-b4d7-851ce5e98300"
  stages:
    - stage: path
      stageUuid: "4063074e-1484-84c5-8c24-5545de7e6723"
    - stage: trinity
      stageUuid: "6a7be5c5-802e-8445-a8a3-d0a1dfb89552"
    - stage: boundary
      stageUuid: "fd03d9d8-cd7b-8484-a3e9-540ce32359f6"
    - stage: links
      stageUuid: "3aa21ad1-2994-86de-bd41-afc775e56bf2"
    - stage: horo
      stageUuid: "a79d3ba0-5661-86c7-ab00-9738e8832d80"
    - stage: seal
      stageUuid: "4cdec43a-ba10-8bb9-883a-154e38103946"
    - stage: uuid
      stageUuid: "72b1f695-f45b-808e-a501-2e40b62b4599"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[field]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
