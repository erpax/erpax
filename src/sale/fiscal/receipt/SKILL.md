---
name: receipt
description: "Use when issuing the fiscal receipt for a sale — the document Наредба Н-18 requires, carrying the УНП, the device number and the amounts a НАП inspector reads."
atomPath: "sale/fiscal/receipt"
coordinate: "sale/fiscal/receipt · 7/descent · eff0adb3"
contentUuid: "46b1daac-5537-5106-b9b9-86a54bdd2036"
diamondUuid: "a25e1286-692f-833e-a88f-5d992d55efd1"
uuid: "eff0adb3-b18c-89a1-b731-ad16169fd274"
horo: 7
typography:
  partition: sale
  bondDegree: 118
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt"
bindings: []
signatures:
  computationUuid: "2fff5c04-7705-8543-a52c-de522a204783"
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
      stageUuid: "c265419a-9df9-8355-9c7e-8846e68d3805"
    - stage: seal
      stageUuid: "28eb48ea-d987-84b1-885d-70f1226e35f0"
    - stage: uuid
      stageUuid: "6cf49b4b-2228-8638-be09-bd7369a778a4"
version: 2
---
# receipt

Issues the fiscal receipt: the document the statute actually requires, carrying the УНП, the device number and the amounts. It is the artefact an inspector reads, so its shape is not an internal choice — the regulation names the fields.

Composes: [[sale]] · [[law]].
