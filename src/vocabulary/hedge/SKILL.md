---
name: hedge
description: "Use when designating financial instruments or transactions to offset market risk (FX, interest rate, commodity); accounting treatment under IFRS-9 hedge accounting or derivatives mark-to-market"
atomPath: "vocabulary/hedge"
coordinate: "vocabulary/hedge · 5/round · a002c6d7"
contentUuid: "3d2875c4-6d35-5cd5-8cd6-0bb7865e5945"
diamondUuid: "ad14a9c2-4e89-8d96-831e-6168e49e8d6d"
uuid: "a002c6d7-deaa-8ee9-a23e-136af2ee8d51"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "c57341d3-64f5-879f-b050-b752a0e338e8"
  stages:
    - stage: path
      stageUuid: "c102ce7c-d5ac-8289-a468-d74116d464e7"
    - stage: trinity
      stageUuid: "0bdaa3a0-fe0b-8259-88fc-eaf12c85ffc2"
    - stage: boundary
      stageUuid: "77e969f5-3aac-84b1-adc3-8c52ea380910"
    - stage: links
      stageUuid: "0f50b354-63ad-880d-bc79-15ecca94014a"
    - stage: horo
      stageUuid: "9594f2d7-29f1-8986-8d0d-01c14f30f972"
    - stage: seal
      stageUuid: "0d30e50a-3973-8538-a59d-ac9289b588f1"
    - stage: uuid
      stageUuid: "c929b0bc-38d2-8f91-9c04-97595a2701c6"
version: 2
---
# hedge

Use when designating financial instruments or transactions to offset market risk (FX, interest rate, commodity); accounting treatment under IFRS-9 hedge accounting or derivatives mark-to-market

Composes: [[fx/transactions]] · [[fair/value/measurements]] · [[financial/statements]] · [[currency]] · [[balance]] · [[accounting]] · [[risk]] · [[standard]].

## Standards
- IFRS-9 §6.1-6.7 (hedging relationships)
- IAS-39 (hedge accounting)
- FASB ASC 815 (derivatives and hedging)

**Law — [[law]]: a hedge is an instrument designated to offset a specific market risk (FX · rate · commodity) — the designation is what unlocks hedge accounting under IFRS-9; an undesignated derivative is just marked to market, so the offset must be declared, not assumed.**
