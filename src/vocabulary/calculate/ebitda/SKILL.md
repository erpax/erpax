---
name: ebitda
description: "Use when reasoning about ebitda — ports the EBITDA calculator verbatim (calculate, port): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over"
atomPath: calculate/ebitda
coordinate: calculate/ebitda · 5/round · 558b8d9a
contentUuid: "ce4bc8a3-e7ae-5760-8f6e-9b05bf4a91ca"
diamondUuid: "70ceaace-5ccb-88af-82c0-b92e0a2bc260"
uuid: "558b8d9a-50cb-8b53-9f53-a8bd0ff4fcaf"
horo: 5
bonds:
  in:
    - accounting
    - calculate
    - currency
    - port
  out:
    - accounting
    - calculate
    - currency
    - port
typography:
  partition: calculate
  bondDegree: 13
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - calculate
    - currency
    - port
  matrix:
    - accounting
    - calculate
    - currency
    - port
  backlinks:
    - accounting
    - calculate
    - currency
    - port
signatures:
  computationUuid: "5d601080-90f4-8320-9e93-438d2d670b61"
  stages:
    - stage: path
      stageUuid: "8fcea876-c74f-8734-980d-0c8157fa73a5"
    - stage: trinity
      stageUuid: "3174d7d1-9566-87a0-91bb-92d5dcbe0826"
    - stage: boundary
      stageUuid: "74697dee-576b-8e58-bf50-e0c38adae789"
    - stage: links
      stageUuid: "a15dc667-a20c-8ce2-abf3-321c5e0e5f79"
    - stage: horo
      stageUuid: "2b2c3e3d-aaba-8483-95aa-97f78c86eb81"
    - stage: seal
      stageUuid: "03bf2a62-ca03-8173-92ba-72599330bc7a"
    - stage: uuid
      stageUuid: "9bb0675d-b94a-808f-8410-a049cc6c67c7"
version: 2
---
# ebitda — earnings before interest, tax, depreciation, amortization (pure compute)

`calculate/ebitda` ports the EBITDA calculator verbatim ([[calculate]], [[port]]): EBITDA = operating profit + depreciation + amortization (equivalently net income + interest + tax + D&A). Pure function over [[accounting]] P&L figures, no persistence. It is a **non-GAAP** measure — label it as such (SEC Reg-G discipline) and don't present it as a GAAP line. Money is amount + [[currency]]; the add-backs are read from [[accounting]], never hardcoded.

## Common mistakes
- Presenting EBITDA as a GAAP figure — it's non-GAAP; disclose the reconciliation.
- Hardcoding the add-backs instead of reading them from [[accounting]].
