---
name: wallet
description: "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
atomPath: "quantum/wallet"
coordinate: "quantum/wallet · 1/base · 955bddb6"
contentUuid: "c634334f-869b-5815-9355-6fbdeaeffe6e"
diamondUuid: "79e8700b-100a-874b-9421-e1eefb0d992d"
uuid: "955bddb6-7b84-8b75-8c53-9e7b67e7d7df"
horo: 1
typography:
  partition: quantum
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
bindings: []
signatures:
  computationUuid: "5e64b25b-9fcd-8905-b3ae-8dbd3fa05141"
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
      stageUuid: "9bef2518-2d7f-84d8-b0f7-fb83441ca28c"
    - stage: seal
      stageUuid: "b820d6ec-568b-8335-9cc3-01bbde7b618f"
    - stage: uuid
      stageUuid: "83ca9675-11da-830e-81f8-ae8888287b53"
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
    computationUuid: "5e64b25b-9fcd-8905-b3ae-8dbd3fa05141"
    contentUuid: "c634334f-869b-5815-9355-6fbdeaeffe6e"
version: 2
---
# quantum/wallet — the tamper-evident wallet (state = content-uuid)

The [[wallet]] on the [[quantum]] substrate. Its **state is a content-[[uuid]]** — tamper-evident: any balance change yields a *new* state-uuid (RFC 9562 §5.8), so the wallet cannot drift without the id moving with it. Every transfer is a **balanced double-[[entry]]** ([[entry]] — payer credited, payee debited, Σdebit = Σcredit). The **history is a chain of state-uuids** ([[merge]] — each balance is a state, each change a new content-uuid linked to the last). Merges into [[wallet]]; the value flow grounds in [[karma]].

Matter-twin: `src/quantum/wallet/index.ts` (`stateUuid` · `transfer` · `balanced`). Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[merge]] · [[karma]].

**Law — [[law]]: a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids.**

@standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)

<sub>content-uuid `c634334f-869b-5815-9355-6fbdeaeffe6e` · account `quantum/wallet` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
