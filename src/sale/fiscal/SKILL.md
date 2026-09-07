---
name: fiscal
description: "Use when reasoning about the fiscal side of a sale — the parent atom for the СУПТО fiscalisation family: the tenant's fiscal context, the receipt it issues, the revenue it recognises, and the references that must resolve."
atomPath: "sale/fiscal"
coordinate: "sale/fiscal · 2/share · 4b74690b"
contentUuid: "7d996236-4034-54d6-a95a-8a54e31f45d9"
diamondUuid: "9d60a0a1-1b2e-8e2b-bdae-ed0af7594878"
uuid: "4b74690b-d4e7-8967-90de-ce134b29cfdd"
horo: 2
typography:
  partition: sale
  bondDegree: 27
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "08dcd425-8ba2-83d7-9b88-28f524292bb1"
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
      stageUuid: "9ceb8ba6-6272-8fd6-8e83-73525f7453cf"
    - stage: seal
      stageUuid: "ddc25044-952a-8c0a-a755-e5381d2a1532"
    - stage: uuid
      stageUuid: "a77f6eba-8a84-8651-9b02-145980714b7a"
version: 2
---
# fiscal

The fiscalisation family of a sale, under Наредба Н-18 §СУПТО. A sale is a commercial fact; **fiscalisation** is what the state requires of it — a device, a sequence, a receipt and a trail. The children split that by what each one decides: [[sale/fiscal/context]] resolves WHICH device and tenant apply, [[sale/fiscal/receipt]] issues the document, [[sale/fiscal/revenue]] recognises the amount, and [[sale/fiscal/reference]] proves the citations resolve.

Composes: [[sale]] · [[law]].
