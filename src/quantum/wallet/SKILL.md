---
name: wallet
description: "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
atomPath: "quantum/wallet"
coordinate: "quantum/wallet · 7/descent · 98c68422"
contentUuid: "b08133d3-c046-5d2e-8794-e8d84c531971"
diamondUuid: "efc6871a-ddc3-8bd4-8a6d-cf8bdd69764a"
uuid: "98c68422-baa0-8040-a5a6-7d77a628227f"
horo: 7
typography:
  partition: quantum
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
bindings: []
signatures:
  computationUuid: "3dde1fcf-6980-8530-8083-91dca336f7c5"
  stages:
    - stage: path
      stageUuid: "f32d55f5-b79b-8134-a3f7-08e464af10a9"
    - stage: trinity
      stageUuid: "f7150097-a6d3-870e-a5df-8def2b3e4594"
    - stage: boundary
      stageUuid: "79ddfb9c-2a23-86e9-9502-baf8bc2321cd"
    - stage: links
      stageUuid: "d22f1e90-765b-8b56-9443-477a0eb57206"
    - stage: horo
      stageUuid: "a9a05a67-9cf4-8cfe-ae10-9c2a531743a5"
    - stage: seal
      stageUuid: "b820d6ec-568b-8335-9cc3-01bbde7b618f"
    - stage: uuid
      stageUuid: "01c19ba0-d3f6-8618-ad12-8614cbb0c783"
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
    computationUuid: "3dde1fcf-6980-8530-8083-91dca336f7c5"
    contentUuid: "b08133d3-c046-5d2e-8794-e8d84c531971"
version: 2
---
# quantum/wallet — the tamper-evident wallet (state = content-uuid)

The [[wallet]] on the [[quantum]] substrate. Its **state is a content-[[uuid]]** — tamper-evident: any balance change yields a *new* state-uuid (RFC 9562 §5.8), so the wallet cannot drift without the id moving with it. Every transfer is a **balanced double-[[entry]]** ([[entry]] — payer credited, payee debited, Σdebit = Σcredit). The **history is a chain of state-uuids** ([[merge]] — each balance is a state, each change a new content-uuid linked to the last). Merges into [[wallet]]; the value flow grounds in [[karma]].

Matter-twin: `src/quantum/wallet/index.ts` (`stateUuid` · `transfer` · `balanced`). Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[merge]] · [[karma]].

**Law — [[law]]: a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids.**

@standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)

<sub>content-uuid `b08133d3-c046-5d2e-8794-e8d84c531971` · account `quantum/wallet` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
