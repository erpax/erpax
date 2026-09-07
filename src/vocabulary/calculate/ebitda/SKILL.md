---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: "vocabulary/calculate/ebitda"
coordinate: "vocabulary/calculate/ebitda · 1/base · 7b405536"
contentUuid: "446f35c9-66df-5b0f-8451-b9f6fbfcae4f"
diamondUuid: "f4d5bdae-7c89-8c6c-b0dc-2384c6425b8a"
uuid: "7b405536-4dd1-88e4-8b9a-46eacf23a053"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "b8f19f8d-b39f-8154-934c-c364a950ea6d"
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
      stageUuid: "236f18d1-a19b-8770-b1d4-d49b4c432b72"
    - stage: seal
      stageUuid: "4d0fa5a7-49d9-85d8-adce-2849a49937fe"
    - stage: uuid
      stageUuid: "10bd4452-17ed-801c-88c8-1d2d600e0d1b"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
