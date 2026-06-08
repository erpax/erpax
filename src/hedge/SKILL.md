---
name: hedge
description: "Use when designating financial instruments or transactions to offset market risk (FX, interest rate, commodity); accounting treatment under IFRS-9 hedge accounting or derivatives mark-to-market"
atomPath: hedge
coordinate: hedge · 1/base · df6da6f8
contentUuid: "b71ae21f-9bee-5b34-95f7-8ec01f253a46"
diamondUuid: "f9abc6de-6746-8825-89ae-1ddeb5c14179"
uuid: "df6da6f8-dec0-8c4c-ad08-37e76b0a8684"
horo: 1
bonds:
  in:
    - accounting
    - balance
    - currency
    - law
    - measurements
    - risk
    - standard
    - statements
    - transaction
    - transactions
  out:
    - accounting
    - balance
    - currency
    - law
    - measurements
    - risk
    - standard
    - statements
    - transaction
    - transactions
typography:
  partition: hedge
  bondDegree: 30
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - currency
    - law
    - measurements
    - risk
    - standard
    - statements
    - transactions
  matrix:
    - accounting
    - balance
    - currency
    - law
    - measurements
    - risk
    - standard
    - statements
    - transaction
    - transactions
  backlinks:
    - accounting
    - balance
    - currency
    - law
    - measurements
    - risk
    - standard
    - statements
    - transaction
    - transactions
signatures:
  computationUuid: "3eb12098-e3f8-8f05-a9b1-8857fdd1ecd7"
  stages:
    - stage: path
      stageUuid: "7338bdef-c421-8611-90f1-84e10200a336"
    - stage: trinity
      stageUuid: "6cdd9724-aa9f-8203-8c14-55e06e8c4fb9"
    - stage: boundary
      stageUuid: "fc27e2cd-118c-8986-ad2e-71f6d40ac803"
    - stage: links
      stageUuid: "619c5843-a550-8322-808a-cac47845c37c"
    - stage: horo
      stageUuid: "2e5302c1-0a6e-845d-916a-e2b67a2a28ba"
    - stage: seal
      stageUuid: "0e4843fd-321a-8996-843b-0e41b8d8089e"
    - stage: uuid
      stageUuid: "ce25fa5b-5fb5-859b-9b4a-d063cfcc6ef1"
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
