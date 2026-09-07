---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 8/crest · 2cb72058"
contentUuid: "43006f1f-a187-5492-9f5e-5c59e6f8b737"
diamondUuid: "0950538d-58f6-83b4-82c0-df0e9a2ab904"
uuid: "2cb72058-8538-89f6-88f9-921483299bb4"
horo: 8
typography:
  partition: country
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "0c8b4515-4691-8c0b-a8e0-e28dc512e6db"
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
      stageUuid: "2475fa62-5aaa-8d89-9a84-8b4ad80e76ba"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "9fed8940-0808-8311-be24-65fefa68c09f"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
