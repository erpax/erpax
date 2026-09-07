---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 7/descent · 7d817bc5"
contentUuid: "0d8663f4-4295-5047-8de7-0863ff5c92c8"
diamondUuid: "27c5a943-009f-8737-bfa9-b6eaeae20bb5"
uuid: "7d817bc5-d4e5-80fa-951f-5612148bc2f2"
horo: 7
typography:
  partition: country
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "36fc96f3-d320-8e0d-8563-bddeb4750c56"
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
      stageUuid: "54640d44-c4c7-8d3d-8483-9b45ef0a25ff"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "914363ab-574d-8670-86d9-89824e0e16b3"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
