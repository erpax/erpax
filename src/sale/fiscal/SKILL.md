---
name: fiscal
description: "Use when reasoning about the fiscal side of a sale — the parent atom for the СУПТО fiscalisation family: the tenant's fiscal context, the receipt it issues, the revenue it recognises, and the references that must resolve."
atomPath: "sale/fiscal"
coordinate: "sale/fiscal · 5/round · c34099a9"
contentUuid: "6962cf32-9a05-5fe9-9a47-9b0cf72848e3"
diamondUuid: "86104fb6-136d-844d-99f9-65eeaa60f350"
uuid: "c34099a9-dc96-8c8e-bb67-1909ff76e722"
horo: 5
typography:
  partition: sale
  bondDegree: 27
standards:
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "990f0d87-8a23-8620-9e73-addcdeff42b1"
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
      stageUuid: "9081dd6f-4a01-8df7-872a-990ff57a50f8"
    - stage: seal
      stageUuid: "ddc25044-952a-8c0a-a755-e5381d2a1532"
    - stage: uuid
      stageUuid: "7cc33566-34f2-87ac-929b-9b20e38eccfb"
version: 2
---
# fiscal

The fiscalisation family of a sale, under Наредба Н-18 §СУПТО. A sale is a commercial fact; **fiscalisation** is what the state requires of it — a device, a sequence, a receipt and a trail. The children split that by what each one decides: [[sale/fiscal/context]] resolves WHICH device and tenant apply, [[sale/fiscal/receipt]] issues the document, [[sale/fiscal/revenue]] recognises the amount, and [[sale/fiscal/reference]] proves the citations resolve.

Composes: [[sale]] · [[law]].
