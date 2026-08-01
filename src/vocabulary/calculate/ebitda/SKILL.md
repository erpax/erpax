---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: "vocabulary/calculate/ebitda"
coordinate: "vocabulary/calculate/ebitda · 7/descent · 31a7818f"
contentUuid: "dcbd0352-e78f-57e7-b77d-4844d2860c87"
diamondUuid: "b4207ece-0820-8468-82db-4edada1b5f9b"
uuid: "31a7818f-fa15-8e1d-8cca-348bd484dbde"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "84e6ff56-13c9-8cd5-896d-2edc0a0208d3"
  stages:
    - stage: path
      stageUuid: "155a904d-3de4-8b2b-b595-c7fb5557cf69"
    - stage: trinity
      stageUuid: "392f1a39-cc10-8f09-a41a-2883824acac7"
    - stage: boundary
      stageUuid: "922e0b79-d0c9-8937-b943-6bf0ba3d417a"
    - stage: links
      stageUuid: "2a28e213-43d9-85e8-8925-9b10375ce416"
    - stage: horo
      stageUuid: "70fc51f9-26f1-8a7e-bcc8-4b3fd41d9a1e"
    - stage: seal
      stageUuid: "82eaa84f-7d0d-8588-a154-7cce62818449"
    - stage: uuid
      stageUuid: "1ded5cdc-f190-864f-8c11-558f88ab701c"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
