---
name: receipt
description: "Use when issuing the fiscal receipt for a sale — the document Наредба Н-18 requires, carrying the УНП, the device number and the amounts a НАП inspector reads."
atomPath: "sale/fiscal/receipt"
coordinate: "sale/fiscal/receipt · 7/descent · 6ab781cb"
contentUuid: "2200b78d-e8bd-550d-a8b6-e8fbe82d1f17"
diamondUuid: "8907da9a-5251-8b5f-aea8-a80852137c91"
uuid: "6ab781cb-c0a8-88f0-8cfd-8c48609d502b"
horo: 7
typography:
  partition: sale
  bondDegree: 116
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt"
bindings: []
signatures:
  computationUuid: "752b778a-6b06-86b6-a23f-e36ea93d0497"
  stages:
    - stage: path
      stageUuid: "4602b357-ad67-8406-9f6b-c797abe08b09"
    - stage: trinity
      stageUuid: "339e6186-128b-8a4e-9cb5-87343903ea55"
    - stage: boundary
      stageUuid: "d6896ebe-db2e-8b45-9da1-6cf2384c7357"
    - stage: links
      stageUuid: "fc58f2ec-0677-85a7-a1a5-ffd6ab24e250"
    - stage: horo
      stageUuid: "dd22bcca-6ae8-8302-a868-3c81b7afda5b"
    - stage: seal
      stageUuid: "28eb48ea-d987-84b1-885d-70f1226e35f0"
    - stage: uuid
      stageUuid: "83309087-3c96-8047-8d11-f203fe8db41f"
version: 2
---
# receipt

Issues the fiscal receipt: the document the statute actually requires, carrying the УНП, the device number and the amounts. It is the artefact an inspector reads, so its shape is not an internal choice — the regulation names the fields.

Composes: [[sale]] · [[law]].
