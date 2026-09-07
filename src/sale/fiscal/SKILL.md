---
name: fiscal
description: "Use when reasoning about the fiscal side of a sale — the parent atom for the СУПТО fiscalisation family: the tenant's fiscal context, the receipt it issues, the revenue it recognises, and the references that must resolve."
atomPath: "sale/fiscal"
coordinate: "sale/fiscal · 4/weave · d6169783"
contentUuid: "1f3c28b6-ecd7-5acc-a65d-cba73886f9dc"
diamondUuid: "d047a346-f42d-83d5-9c76-c7d7c4832e71"
uuid: "d6169783-9e28-80f7-b877-6eada6114391"
horo: 4
typography:
  partition: sale
  bondDegree: 27
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "1be53f42-b023-89ee-a87a-53cee3ee65ba"
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
      stageUuid: "f097acdb-068f-8f95-a6fa-5d2dda45ef91"
    - stage: seal
      stageUuid: "ddc25044-952a-8c0a-a755-e5381d2a1532"
    - stage: uuid
      stageUuid: "2a68bde8-b4f6-887d-9a11-c93cea3f9905"
version: 2
---
# fiscal

The fiscalisation family of a sale, under Наредба Н-18 §СУПТО. A sale is a commercial fact; **fiscalisation** is what the state requires of it — a device, a sequence, a receipt and a trail. The children split that by what each one decides: [[sale/fiscal/context]] resolves WHICH device and tenant apply, [[sale/fiscal/receipt]] issues the document, [[sale/fiscal/revenue]] recognises the amount, and [[sale/fiscal/reference]] proves the citations resolve.

Composes: [[sale]] · [[law]].
