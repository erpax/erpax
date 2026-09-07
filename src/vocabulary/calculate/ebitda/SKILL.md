---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: "vocabulary/calculate/ebitda"
coordinate: "vocabulary/calculate/ebitda · 7/descent · df355ba3"
contentUuid: "5c47186c-05a8-5f78-85b8-3265b2585978"
diamondUuid: "41995a0f-9bf5-8848-ace1-627f658c17b5"
uuid: "df355ba3-bf0c-83c9-9e81-6f2ad95b03f0"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 13
standards: []
bindings: []
signatures:
  computationUuid: "80d2f30e-a46a-80ce-be20-5c3b045a379f"
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
      stageUuid: "0b35ccc5-e928-86f3-b455-3ce03de342fd"
    - stage: seal
      stageUuid: "4d0fa5a7-49d9-85d8-adce-2849a49937fe"
    - stage: uuid
      stageUuid: "8bd00c38-371d-87ad-9157-3213ecdff850"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
