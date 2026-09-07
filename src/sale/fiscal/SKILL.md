---
name: fiscal
description: "Use when reasoning about the fiscal side of a sale — the parent atom for the СУПТО fiscalisation family: the tenant's fiscal context, the receipt it issues, the revenue it recognises, and the references that must resolve."
atomPath: "sale/fiscal"
coordinate: "sale/fiscal · 4/weave · 248f03a5"
contentUuid: "f2b4e591-81bf-56b7-8fcc-63fbf4e96fa6"
diamondUuid: "d58c57d1-ce42-81af-9e7e-66f592ce6a48"
uuid: "248f03a5-2763-8512-97e6-1ebbbcb00def"
horo: 4
typography:
  partition: sale
  bondDegree: 27
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "518bb5aa-518f-82df-aa89-3d4bb0e4d3f5"
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
      stageUuid: "4219d946-e347-8da3-927f-b6c74745adb8"
    - stage: seal
      stageUuid: "ddc25044-952a-8c0a-a755-e5381d2a1532"
    - stage: uuid
      stageUuid: "5f3e8347-57fb-8df3-b943-0332cb5fb2cc"
version: 2
---
# fiscal

The fiscalisation family of a sale, under Наредба Н-18 §СУПТО. A sale is a commercial fact; **fiscalisation** is what the state requires of it — a device, a sequence, a receipt and a trail. The children split that by what each one decides: [[sale/fiscal/context]] resolves WHICH device and tenant apply, [[sale/fiscal/receipt]] issues the document, [[sale/fiscal/revenue]] recognises the amount, and [[sale/fiscal/reference]] proves the citations resolve.

Composes: [[sale]] · [[law]].
