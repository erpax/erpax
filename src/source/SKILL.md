---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: "source · 1/base · a252f13e"
contentUuid: "06afc2be-73f2-5380-a738-b7bfcd4db19e"
diamondUuid: "8870f3ee-0d34-8eca-ac0f-2a492f1c9efc"
uuid: "a252f13e-fcb2-89e9-bfa3-3792c263ab52"
horo: 1
typography:
  partition: source
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "0220e8c3-775e-80b4-9ac7-a4687a343aab"
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
      stageUuid: "dca58828-37dd-85ce-bbca-fdc0098382d6"
    - stage: seal
      stageUuid: "4cdec43a-ba10-8bb9-883a-154e38103946"
    - stage: uuid
      stageUuid: "049df8e6-0b5a-8489-8e02-d85005156675"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[field]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
