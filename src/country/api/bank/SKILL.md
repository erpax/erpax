---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 2/share · e5cc88c0"
contentUuid: "9644fdf1-9a6d-5bff-8fc0-ce1fc52288e8"
diamondUuid: "899741f8-9a4e-83b5-9779-79c635dfe84c"
uuid: "e5cc88c0-97b0-811e-a47b-a8a39e10e7e9"
horo: 2
typography:
  partition: country
  bondDegree: 70
standards: []
bindings: []
signatures:
  computationUuid: "f4ba97e2-79af-874e-8c52-adfabe0c4a96"
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
      stageUuid: "e3da9a34-45ec-8a52-8514-022c55b0efc4"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "4d0a7038-137a-8954-a141-509d89c35cbf"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
