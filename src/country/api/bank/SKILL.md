---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 4/weave · 818aa35c"
contentUuid: "3f9737f9-dd1f-573c-959c-f906f5fe56d1"
diamondUuid: "7ca3d747-4d43-816b-b097-f00819034366"
uuid: "818aa35c-0077-8318-a86e-3062ce49d9fe"
horo: 4
typography:
  partition: country
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "73be5bec-8376-841d-8195-dca13ccedf2f"
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
      stageUuid: "6ead4b8e-6595-8ddc-b680-32d592bf3065"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "159bfc06-e1f6-8518-ac5d-aec81e5ee607"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
