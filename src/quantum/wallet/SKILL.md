---
name: wallet
description: "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
atomPath: "quantum/wallet"
coordinate: "quantum/wallet · 4/weave · cc798d3b"
contentUuid: "d90eb190-ec66-5bd4-9661-dac1f4f2c4f3"
diamondUuid: "e0583830-5fa3-8502-a57d-691ca779505e"
uuid: "cc798d3b-2f92-8d04-9492-aee0fb464e28"
horo: 4
typography:
  partition: quantum
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
bindings: []
signatures:
  computationUuid: "d5d7bd65-1e48-8364-8e69-f28ae454300d"
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
      stageUuid: "58f7507d-5b90-894b-abc1-87753f0873a9"
    - stage: seal
      stageUuid: "b820d6ec-568b-8335-9cc3-01bbde7b618f"
    - stage: uuid
      stageUuid: "27161f78-ff8d-83e5-9bc3-d84f49840b0f"
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
    computationUuid: "d5d7bd65-1e48-8364-8e69-f28ae454300d"
    contentUuid: "d90eb190-ec66-5bd4-9661-dac1f4f2c4f3"
version: 2
---
# quantum/wallet — the tamper-evident wallet (state = content-uuid)

The [[wallet]] on the [[quantum]] substrate. Its **state is a content-[[uuid]]** — tamper-evident: any balance change yields a *new* state-uuid (RFC 9562 §5.8), so the wallet cannot drift without the id moving with it. Every transfer is a **balanced double-[[entry]]** ([[entry]] — payer credited, payee debited, Σdebit = Σcredit). The **history is a chain of state-uuids** ([[merge]] — each balance is a state, each change a new content-uuid linked to the last). Merges into [[wallet]]; the value flow grounds in [[karma]].

Matter-twin: `src/quantum/wallet/index.ts` (`stateUuid` · `transfer` · `balanced`). Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[merge]] · [[karma]].

**Law — [[law]]: a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids.**

@standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)

<sub>content-uuid `d90eb190-ec66-5bd4-9661-dac1f4f2c4f3` · account `quantum/wallet` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
