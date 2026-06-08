---
name: accrual
description: "Use when recognizing revenue or expense in the period incurred, earned, or obligated, regardless of payment timing — the foundation of accrual-basis accounting and the IFRS/GAAP reporting standard"
atomPath: accrual
coordinate: accrual · 5/round · 24a734d2
contentUuid: "de3e833c-370c-5f5e-924a-8d9262a0f123"
diamondUuid: "4730bdac-cebd-8cae-9afa-ac71a2bd9c60"
uuid: "24a734d2-65f6-8521-8a08-551a8c04e14b"
horo: 5
bonds:
  in:
    - adjustments
    - balance
    - deduction
    - deferral
    - deferredrevenue
    - entries
    - journals
    - periods
    - prepaid
    - provision
    - recognition
    - tenure
  out:
    - adjustments
    - balance
    - deduction
    - deferral
    - deferredrevenue
    - entries
    - journals
    - periods
    - prepaid
    - provision
    - recognition
    - tenure
typography:
  partition: accrual
  bondDegree: 36
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - adjustments
    - balance
    - entries
    - journals
    - periods
  matrix:
    - adjustments
    - balance
    - deduction
    - deferral
    - deferredrevenue
    - entries
    - journals
    - periods
    - prepaid
    - provision
    - recognition
    - tenure
  backlinks:
    - adjustments
    - balance
    - deduction
    - deferral
    - deferredrevenue
    - entries
    - journals
    - periods
    - prepaid
    - provision
    - recognition
    - tenure
signatures:
  computationUuid: "d8f4ee1a-ad44-8c38-b6d0-fb27f5a3d5e9"
  stages:
    - stage: path
      stageUuid: "a8d62968-9600-8684-88c5-24c49eab1a3d"
    - stage: trinity
      stageUuid: "d912dcd7-3281-8a9c-bf2a-01c41d7bb99c"
    - stage: boundary
      stageUuid: "bf50ab53-2e7b-8831-8250-64fcc36eac3f"
    - stage: links
      stageUuid: "fb721ac4-3917-8d6d-a3eb-eeb3518fcdd1"
    - stage: horo
      stageUuid: "48ee8664-d6c2-8a78-af63-903543ab88c1"
    - stage: seal
      stageUuid: "d6e8afcc-0706-88fb-a4e3-3f2a8f729f5b"
    - stage: uuid
      stageUuid: "64669a79-7215-8737-ab53-faef91ab5885"
version: 2
---
# accrual

Use when recognizing revenue or expense in the period incurred, earned, or obligated, regardless of payment timing — the foundation of accrual-basis accounting and the IFRS/GAAP reporting standard

Composes: [[journal/entries]] · [[gl/accounts/period/end/adjustments]] · [[gl/accounts/recurring/journals]] · [[fiscal/periods]] · [[balance]].

## Standards
- IAS-1 §27 (accrual basis)
- IFRS-15 §31-35 (control transfer timing)
- FASB ASC 606
