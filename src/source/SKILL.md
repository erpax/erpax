---
name: source
description: "Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation."
atomPath: source
coordinate: source · 4/weave · 8c8ce0ed
contentUuid: "de08ee9a-eb89-5e30-8a1c-d97d770f7f84"
diamondUuid: "a1359812-4a21-8b2c-ac19-40c565138602"
uuid: "8c8ce0ed-798e-8660-8dd7-0a39a70ef15f"
horo: 4
bonds:
  in:
    - accounting
    - audit
    - baseline
    - customer
    - digital
    - empirical
    - enumeration
    - fields
    - generate
    - identity
    - iptc
    - item
    - label
    - law
    - organization
    - remorse
    - return
    - software
  out:
    - accounting
    - audit
    - baseline
    - customer
    - digital
    - empirical
    - enumeration
    - fields
    - generate
    - identity
    - iptc
    - item
    - label
    - law
    - organization
    - remorse
    - return
    - software
typography:
  partition: source
  bondDegree: 55
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - audit
    - fields
    - identity
    - law
  matrix:
    - accounting
    - audit
    - baseline
    - customer
    - digital
    - empirical
    - enumeration
    - fields
    - generate
    - identity
    - iptc
    - item
    - label
    - law
    - organization
    - remorse
    - return
    - software
  backlinks:
    - accounting
    - audit
    - baseline
    - customer
    - digital
    - empirical
    - enumeration
    - fields
    - generate
    - identity
    - iptc
    - item
    - label
    - law
    - organization
    - remorse
    - return
    - software
signatures:
  computationUuid: "537631c1-dbcd-84ef-b487-2827a34b233d"
  stages:
    - stage: path
      stageUuid: "4063074e-1484-84c5-8c24-5545de7e6723"
    - stage: trinity
      stageUuid: "6a7be5c5-802e-8445-a8a3-d0a1dfb89552"
    - stage: boundary
      stageUuid: "021fe04f-4cc6-80f9-b2f5-33de9d026dcd"
    - stage: links
      stageUuid: "e1fcb79c-eb0b-89ea-ba05-3afe8c3d8af6"
    - stage: horo
      stageUuid: "5ed78865-fc7f-8409-a1be-174569c0b78d"
    - stage: seal
      stageUuid: "4e9bad1b-5dba-8391-9f8d-b4886f30c8eb"
    - stage: uuid
      stageUuid: "4432e26e-9997-8d5b-a696-f8d6406fdcef"
version: 2
---
# source

Use when tracking the origin of data — source document (purchase order for invoice), source system (ERP, spreadsheet), source bank account (for transfer), data-import source. Metadata for audit and reconciliation.

Composes: [[fields]] · [[accounting]] · [[audit]] · [[identity]].

**Law — [[law]]: source is the origin metadata of data — the document, system, or account a record came from; what every proper noun anonymizes to, kept for [[audit]] and reconciliation.**
