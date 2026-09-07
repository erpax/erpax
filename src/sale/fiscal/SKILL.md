---
name: fiscal
description: "Use when reasoning about the fiscal side of a sale — the parent atom for the СУПТО fiscalisation family: the tenant's fiscal context, the receipt it issues, the revenue it recognises, and the references that must resolve."
atomPath: "sale/fiscal"
coordinate: "sale/fiscal · 1/base · 4f7b44b9"
contentUuid: "9a3ba001-2735-518e-adc1-e36dfb7f1671"
diamondUuid: "057d294b-7b94-8509-8cf0-e23674ad68ef"
uuid: "4f7b44b9-bc4d-83c9-9100-1732f97681dc"
horo: 1
typography:
  partition: sale
  bondDegree: 27
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "801f3d33-d970-8be2-885b-d0502825437d"
  stages:
    - stage: path
      stageUuid: "3de3344d-625b-80d9-927a-b3fb9075ff5c"
    - stage: trinity
      stageUuid: "dc12fe57-acfb-82ff-b324-e8f390be63f9"
    - stage: boundary
      stageUuid: "0dff44ba-be39-8e80-b1e4-6bdb5c981c71"
    - stage: links
      stageUuid: "9c1c961b-e21e-8c9f-8d15-7ad2940c4366"
    - stage: horo
      stageUuid: "39bbdbea-6066-85a3-93a4-bf567294858b"
    - stage: seal
      stageUuid: "ddc25044-952a-8c0a-a755-e5381d2a1532"
    - stage: uuid
      stageUuid: "cc48967e-7c97-8610-a8b4-4a5b23550499"
version: 2
---
# fiscal

The fiscalisation family of a sale, under Наредба Н-18 §СУПТО. A sale is a commercial fact; **fiscalisation** is what the state requires of it — a device, a sequence, a receipt and a trail. The children split that by what each one decides: [[sale/fiscal/context]] resolves WHICH device and tenant apply, [[sale/fiscal/receipt]] issues the document, [[sale/fiscal/revenue]] recognises the amount, and [[sale/fiscal/reference]] proves the citations resolve.

Composes: [[sale]] · [[law]].
