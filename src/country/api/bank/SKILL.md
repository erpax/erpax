---
name: bank
description: "Use when reasoning about bank — Use for open-banking / PSD2 / banking-rails APIs by country (account information, payment initiation, aggregators). The banking slice of the country-authority registry."
atomPath: "country/api/bank"
coordinate: "country/api/bank · 5/round · face3469"
contentUuid: "813cce39-cfb1-5138-a8da-e2fa70835f1e"
diamondUuid: "39b3588e-807e-83e3-8c4a-06a1bf43e71f"
uuid: "face3469-1a9b-896c-8a74-f475459ddcdd"
horo: 5
typography:
  partition: country
  bondDegree: 73
standards: []
bindings: []
signatures:
  computationUuid: "871d79e4-f337-8acb-ad83-46a2e843d699"
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
      stageUuid: "7d999307-65c2-8c72-b52a-5d36c5162eed"
    - stage: seal
      stageUuid: "5d6449a6-9c6e-8d0b-ab4e-d80f162eb5b8"
    - stage: uuid
      stageUuid: "51128248-a6f7-8008-bd7e-e3f84164d1f2"
version: 2
---
# country/api/bank

The **bank** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
