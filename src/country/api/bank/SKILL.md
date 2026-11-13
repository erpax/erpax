---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 2/share · e5cc88c0"
contentUuid: "e12dbf3d-b1db-59b5-861b-1935f98c7003"
diamondUuid: "288a273a-4044-86f6-8419-f11f22c24ea0"
uuid: "e5cc88c0-97b0-811e-a47b-a8a39e10e7e9"
horo: 2
typography:
  partition: country
  bondDegree: 61
standards: []
bindings: []
signatures:
  computationUuid: "d1422327-dc49-8b33-972c-c75bbea2da2a"
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
      stageUuid: "df9dbbbf-3183-8844-a3e2-3872941e81f2"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "0f1288fd-a9b5-83b5-957a-482f41468ff7"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
