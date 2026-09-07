---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: "source · 2/share · 9c55bff6"
contentUuid: "9b49eb13-340e-50d1-b8b6-97d9633dad0e"
diamondUuid: "8934e243-b174-8282-bb3d-1a7db211ad12"
uuid: "9c55bff6-22a1-8a60-a100-524fb73650f7"
horo: 2
typography:
  partition: source
  bondDegree: 67
standards: []
bindings: []
signatures:
  computationUuid: "84ac567f-77fc-896e-ae31-cccaa9e0ad26"
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
      stageUuid: "b4a9384d-3cb2-8bc4-a5b7-c191355bced2"
    - stage: seal
      stageUuid: "4cdec43a-ba10-8bb9-883a-154e38103946"
    - stage: uuid
      stageUuid: "c5592545-744d-8f93-92c0-04a0b7bab72f"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[field]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
