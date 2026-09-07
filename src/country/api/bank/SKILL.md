---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 7/descent · 17f591e8"
contentUuid: "a862936c-a925-5010-aa20-9881d93b93c5"
diamondUuid: "7c296d4b-28b8-8746-83c7-addb06dc54a7"
uuid: "17f591e8-1c7c-8086-9d33-c3fe52b99415"
horo: 7
typography:
  partition: country
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "38325838-b47a-8529-822a-087df5de1458"
  stages:
    - stage: path
      stageUuid: "114c17fc-a1cf-8be7-a81c-805190d31ae7"
    - stage: trinity
      stageUuid: "72e60fdf-3b1a-88b2-bd48-47a5201190cf"
    - stage: boundary
      stageUuid: "bf99d280-47ee-8e76-90bc-daf39d4b51b5"
    - stage: links
      stageUuid: "064fa38b-b095-8817-87d2-ccb0df65aa33"
    - stage: horo
      stageUuid: "5a50a324-c770-877b-80ad-cd7fe4f8890b"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "c6bce3c2-bf69-87d9-874f-473ec8d16dbb"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
