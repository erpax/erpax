---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: "source · 1/base · cdfa6ff8"
contentUuid: "9e63391d-2bd6-5cdc-99bb-2d335e24b067"
diamondUuid: "224f2e8d-ce91-839b-be47-bfaf4172b8cb"
uuid: "cdfa6ff8-fd0d-8d81-a207-4d59719eee56"
horo: 1
typography:
  partition: source
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "16dbe39c-9783-896e-9dd8-d29cd2542075"
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
      stageUuid: "8724df81-529f-88c7-abee-bc2ced893b6f"
    - stage: seal
      stageUuid: "4cdec43a-ba10-8bb9-883a-154e38103946"
    - stage: uuid
      stageUuid: "bcc019b6-ca64-8cd6-a919-e47acaae9e8f"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[field]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
