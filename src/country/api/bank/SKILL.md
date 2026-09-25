---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 2/share · e5cc88c0"
contentUuid: "ce335537-ede7-56f6-9436-ba38f4a6d089"
diamondUuid: "14c14b4a-308e-88c5-a2dd-31cc943dcd30"
uuid: "e5cc88c0-97b0-811e-a47b-a8a39e10e7e9"
horo: 2
typography:
  partition: country
  bondDegree: 76
standards: []
bindings: []
signatures:
  computationUuid: "b9b8f9af-b6dc-8656-9ba8-46f6218e1d60"
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
      stageUuid: "ae2c24cd-9aea-8034-9272-d5e7ffef5cd7"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "a7bf98b9-4229-83de-816f-874b8ddadd9c"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
