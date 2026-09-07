---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: "vocabulary/calculate/ebitda"
coordinate: "vocabulary/calculate/ebitda · 5/round · c034894b"
contentUuid: "393fdf64-a078-5c02-8503-94fd8f1b60ba"
diamondUuid: "7280ef2c-9f7f-8996-bc2a-88cda7ca909b"
uuid: "c034894b-178a-8143-a1b3-06decfc537c1"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "15295699-db51-8b4c-ae2e-131955a5a167"
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
      stageUuid: "ea6417e4-7341-8e89-b225-f5d07f8c0560"
    - stage: seal
      stageUuid: "4d0fa5a7-49d9-85d8-adce-2849a49937fe"
    - stage: uuid
      stageUuid: "fccb8e77-5b3e-8b2a-ba7b-cb3427f97c8c"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
