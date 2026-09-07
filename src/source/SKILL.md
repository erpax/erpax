---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: "source · 5/round · 3060633d"
contentUuid: "ddc0f2b2-1d5b-5543-b15f-71ef6d0b0ddc"
diamondUuid: "3906fb09-0d68-8cf1-827d-08b3acd93dcf"
uuid: "3060633d-05c6-82a5-b29a-0cda8612a44d"
horo: 5
typography:
  partition: source
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "fe55d47b-8a17-88ce-8477-94674d1de6cf"
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
      stageUuid: "827f99ad-ea93-8bb3-90b5-94b7df4c6201"
    - stage: seal
      stageUuid: "4cdec43a-ba10-8bb9-883a-154e38103946"
    - stage: uuid
      stageUuid: "62968743-155d-84af-8770-7a62a8c17c85"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[field]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
