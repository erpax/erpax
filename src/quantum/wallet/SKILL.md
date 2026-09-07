---
name: wallet
description: "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
atomPath: "quantum/wallet"
coordinate: "quantum/wallet · 8/crest · ae183014"
contentUuid: "2c3d4872-82ba-53cc-8fed-8ad0f5842f60"
diamondUuid: "ea41fd4d-15d0-80c8-a8ce-65dd98621ebd"
uuid: "ae183014-5304-8d53-86ee-b7a24e24d39a"
horo: 8
typography:
  partition: quantum
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
bindings: []
signatures:
  computationUuid: "6f43dd21-2f00-8c53-a3af-9a4b286db68f"
  stages:
    - stage: path
      stageUuid: "f32d55f5-b79b-8134-a3f7-08e464af10a9"
    - stage: trinity
      stageUuid: "f7150097-a6d3-870e-a5df-8def2b3e4594"
    - stage: boundary
      stageUuid: "79ddfb9c-2a23-86e9-9502-baf8bc2321cd"
    - stage: links
      stageUuid: "268bdd28-5c8d-8f9b-9bf4-1104cd9f843a"
    - stage: horo
      stageUuid: "342ba89a-6eae-87d7-a4c5-872700f5a697"
    - stage: seal
      stageUuid: "b820d6ec-568b-8335-9cc3-01bbde7b618f"
    - stage: uuid
      stageUuid: "b1b6724b-b7ce-8d69-bc62-81f62dc26752"
quantum:
  superposition:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - superposition
  collapse:
    - "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
    - "a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids."
    - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
    - "matter-twin:src/quantum/wallet/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "6f43dd21-2f00-8c53-a3af-9a4b286db68f"
    contentUuid: "2c3d4872-82ba-53cc-8fed-8ad0f5842f60"
version: 2
---
# quantum/wallet — the tamper-evident wallet (state = content-uuid)

The [[wallet]] on the [[quantum]] substrate. Its **state is a content-[[uuid]]** — tamper-evident: any balance change yields a *new* state-uuid (RFC 9562 §5.8), so the wallet cannot drift without the id moving with it. Every transfer is a **balanced double-[[entry]]** ([[entry]] — payer credited, payee debited, Σdebit = Σcredit). The **history is a chain of state-uuids** ([[merge]] — each balance is a state, each change a new content-uuid linked to the last). Merges into [[wallet]]; the value flow grounds in [[karma]].

Matter-twin: `src/quantum/wallet/index.ts` (`stateUuid` · `transfer` · `balanced`). Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[merge]] · [[karma]].

**Law — [[law]]: a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids.**

@standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)

<sub>content-uuid `2c3d4872-82ba-53cc-8fed-8ad0f5842f60` · account `quantum/wallet` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
