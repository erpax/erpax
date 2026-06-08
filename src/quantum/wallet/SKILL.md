---
name: wallet
description: "Use when putting a wallet on the quantum substrate — when you need its state to be a content-uuid (tamper-evident, any balance change yields a new state-uuid) and every transfer to be a balanced double-entry (payer credited, payee debited) over a history that is a chain of state-uuids."
atomPath: quantum/wallet
coordinate: quantum/wallet · 8/crest · bb61b198
contentUuid: "8027d15e-e73a-5f8c-a266-d88395ce8a04"
diamondUuid: "db457c99-ab83-85bc-84dd-6f81d74f0e65"
uuid: "bb61b198-c4a8-89fc-9218-03de7f3619a6"
horo: 8
bonds:
  in:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - uuid
    - wallet
  out:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - uuid
    - wallet
typography:
  partition: quantum
  bondDegree: 37
  neighbors: []
standards:
  - "double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)"
bindings: []
neighbors:
  wikilink:
    - entry
    - karma
    - law
    - merge
    - quantum
    - uuid
    - wallet
  matrix:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - uuid
    - wallet
  backlinks:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - uuid
    - wallet
signatures:
  computationUuid: "a997a4c4-d232-830d-ad30-5a2a33806c5f"
  stages:
    - stage: path
      stageUuid: "f32d55f5-b79b-8134-a3f7-08e464af10a9"
    - stage: trinity
      stageUuid: "f7150097-a6d3-870e-a5df-8def2b3e4594"
    - stage: boundary
      stageUuid: "79ddfb9c-2a23-86e9-9502-baf8bc2321cd"
    - stage: links
      stageUuid: "713f62a3-eddb-8519-b8da-8055c8e721ce"
    - stage: horo
      stageUuid: "a5a55f92-f72c-8660-8bb4-a9986f009640"
    - stage: seal
      stageUuid: "b820d6ec-568b-8335-9cc3-01bbde7b618f"
    - stage: uuid
      stageUuid: "c3bf672a-1c94-81db-a9c8-c37ba864009c"
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
    computationUuid: "a997a4c4-d232-830d-ad30-5a2a33806c5f"
    contentUuid: "8027d15e-e73a-5f8c-a266-d88395ce8a04"
version: 2
---
# quantum/wallet — the tamper-evident wallet (state = content-uuid)

The [[wallet]] on the [[quantum]] substrate. Its **state is a content-[[uuid]]** — tamper-evident: any balance change yields a *new* state-uuid (RFC 9562 §5.8), so the wallet cannot drift without the id moving with it. Every transfer is a **balanced double-[[entry]]** ([[entry]] — payer credited, payee debited, Σdebit = Σcredit). The **history is a chain of state-uuids** ([[merge]] — each balance is a state, each change a new content-uuid linked to the last). Merges into [[wallet]]; the value flow grounds in [[karma]].

Matter-twin: `src/quantum/wallet/index.ts` (`stateUuid` · `transfer` · `balanced`). Composes [[quantum]] · [[wallet]] · [[entry]] · [[uuid]] · [[merge]] · [[karma]].

**Law — [[law]]: a wallet's state IS its content-[[uuid]], so any balance change is tamper-evident (new state-uuid), and every transfer is a balanced double-[[entry]] (payer credited, payee debited) over a [[merge]]-chain of state-uuids.**

@standard double-entry ([[entry]]); RFC 9562 §5.8 content-uuid (tamper-evident state)

<sub>content-uuid `8027d15e-e73a-5f8c-a266-d88395ce8a04` · account `quantum/wallet` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
