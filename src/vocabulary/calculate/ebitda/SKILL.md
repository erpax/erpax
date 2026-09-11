---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: "vocabulary/calculate/ebitda"
coordinate: "vocabulary/calculate/ebitda · 8/crest · d4384b96"
contentUuid: "965292fc-8f75-51ba-a704-c7c2c2a18357"
diamondUuid: "fedd3259-dd11-8618-8d56-22bdf11619db"
uuid: "d4384b96-4ef0-8502-8f72-d122e2c04b7a"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "00be1cb2-1bcd-8225-9701-0e71dae9d8be"
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
      stageUuid: "88535cb4-56b1-8490-b0df-2cd9a5ce06cb"
    - stage: seal
      stageUuid: "4d0fa5a7-49d9-85d8-adce-2849a49937fe"
    - stage: uuid
      stageUuid: "2c56fe60-22bb-8928-b76b-e310781bbab0"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
