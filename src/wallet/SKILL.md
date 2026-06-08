---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: wallet · 5/round · 7af63f85
contentUuid: "a978eb19-694a-5314-8993-67f55579169e"
diamondUuid: "661d27c5-3f00-847d-94cd-0ecb730b83b4"
uuid: "7af63f85-2913-8929-af88-f6964ee91d64"
horo: 5
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
  partition: wallet
  bondDegree: 37
  neighbors: []
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
neighbors:
  wikilink:
    - account
    - balance
    - cost
    - entry
    - identity
    - law
    - money
    - quantum
    - uuid
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
  computationUuid: "5706e784-2832-82b5-875f-ed06c2fb5249"
  stages:
    - stage: path
      stageUuid: "d002acff-9010-8d8b-ac94-fc5c9bc24276"
    - stage: trinity
      stageUuid: "c753df25-c7d0-8253-9b22-0e90fe778fc4"
    - stage: boundary
      stageUuid: "0f94a63e-a55b-8162-af9c-39e0a86b5492"
    - stage: links
      stageUuid: "4a9ef9b7-8e5a-8fd6-8858-491913af9189"
    - stage: horo
      stageUuid: "1441ab9f-e2aa-880e-a2e2-c78b281e07ba"
    - stage: seal
      stageUuid: "85d12d57-7d09-8443-9e39-378d511cdaa0"
    - stage: uuid
      stageUuid: "699ed1d3-8990-8ee4-8557-8f02d72c64a4"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
