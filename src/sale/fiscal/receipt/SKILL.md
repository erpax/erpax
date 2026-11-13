---
name: receipt
description: "Use when issuing the fiscal receipt for a sale — the document Наредба Н-18 requires, carrying the УНП, the device number and the amounts a НАП inspector reads."
atomPath: "sale/fiscal/receipt"
coordinate: "sale/fiscal/receipt · 2/share · 3aca77cf"
contentUuid: "6b6b690f-e7c4-5fe4-aea6-f37e1aa4fb99"
diamondUuid: "554f84d1-f541-8f48-905e-ab032f7d092a"
uuid: "3aca77cf-780c-8a23-9193-8744173cc5ab"
horo: 2
typography:
  partition: sale
  bondDegree: 111
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt"
bindings: []
signatures:
  computationUuid: "9480f712-398a-8a55-b4bb-d901608a8846"
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
      stageUuid: "450d8c48-f693-83c9-8c47-7dc6f1285d45"
    - stage: seal
      stageUuid: "28eb48ea-d987-84b1-885d-70f1226e35f0"
    - stage: uuid
      stageUuid: "42e3cfdf-e69f-8eb9-9806-d0b43b548b3b"
version: 2
---
# receipt

Issues the fiscal receipt: the document the statute actually requires, carrying the УНП, the device number and the amounts. It is the artefact an inspector reads, so its shape is not an internal choice — the regulation names the fields.

Composes: [[sale]] · [[law]].
