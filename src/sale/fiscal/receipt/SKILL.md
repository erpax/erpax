---
name: receipt
description: "Use when issuing the fiscal receipt for a sale — the document Наредба Н-18 requires, carrying the УНП, the device number and the amounts a НАП inspector reads."
atomPath: "sale/fiscal/receipt"
coordinate: "sale/fiscal/receipt · 5/round · bc815abf"
contentUuid: "18d39e64-0027-5e95-926e-6c38d14897cd"
diamondUuid: "0b6f04c7-d058-87ba-a955-a532ffee0b82"
uuid: "bc815abf-d9df-8072-9cc3-057f12d64e1a"
horo: 5
typography:
  partition: sale
  bondDegree: 116
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt"
bindings: []
signatures:
  computationUuid: "9f10438c-87f9-8e00-bf69-a21bbe0019ca"
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
      stageUuid: "5ae70362-1af3-8c70-a8d6-b8baf4f31484"
    - stage: seal
      stageUuid: "28eb48ea-d987-84b1-885d-70f1226e35f0"
    - stage: uuid
      stageUuid: "dceb9e0d-d6f7-80da-a164-2a42e70dfdc0"
version: 2
---
# receipt

Issues the fiscal receipt: the document the statute actually requires, carrying the УНП, the device number and the amounts. It is the artefact an inspector reads, so its shape is not an internal choice — the regulation names the fields.

Composes: [[sale]] · [[law]].
