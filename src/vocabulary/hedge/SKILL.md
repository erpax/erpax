---
name: hedge
description: "Use when designating financial instruments or transactions to offset market risk (FX, interest rate, commodity); accounting treatment under IFRS-9 hedge accounting or derivatives mark-to-market"
atomPath: "vocabulary/hedge"
coordinate: "vocabulary/hedge · 2/share · b60d9cb7"
contentUuid: "6ec52c0c-7b2f-5b85-8e5a-f020050d0ce4"
diamondUuid: "4c5e5966-2dde-8f5c-84d5-7ade21593e54"
uuid: "b60d9cb7-d64e-8725-ade6-ecef7803bce2"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "cd44ef8c-466f-8300-a45f-4f1db61548bb"
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
      stageUuid: "0a96f52d-e472-8f7a-9273-40c2474d27e5"
    - stage: seal
      stageUuid: "0d30e50a-3973-8538-a59d-ac9289b588f1"
    - stage: uuid
      stageUuid: "3b457b28-0f40-8f92-950f-7f368c321d5f"
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
