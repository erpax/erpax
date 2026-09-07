---
name: receipt
description: "Use when issuing the fiscal receipt for a sale — the document Наредба Н-18 requires, carrying the УНП, the device number and the amounts a НАП inspector reads."
atomPath: "sale/fiscal/receipt"
coordinate: "sale/fiscal/receipt · 5/round · 49d59a24"
contentUuid: "e8915a89-2394-5b0b-8ecd-690e79f2ab23"
diamondUuid: "93c8ead4-3460-8bc7-900c-790350c07cea"
uuid: "49d59a24-eb10-8097-84a9-612f465b504d"
horo: 5
typography:
  partition: sale
  bondDegree: 118
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt"
bindings: []
signatures:
  computationUuid: "a945e7f3-35d0-8824-87f6-5e551070c490"
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
      stageUuid: "0811ab4d-b096-81d6-a1c0-10244ffc4111"
    - stage: seal
      stageUuid: "28eb48ea-d987-84b1-885d-70f1226e35f0"
    - stage: uuid
      stageUuid: "97e1d3bc-820a-8fd2-b3ea-bcff634e720a"
version: 2
---
# receipt

Issues the fiscal receipt: the document the statute actually requires, carrying the УНП, the device number and the amounts. It is the artefact an inspector reads, so its shape is not an internal choice — the regulation names the fields.

Composes: [[sale]] · [[law]].
