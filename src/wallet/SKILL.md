---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: "wallet · 1/base · 23f060a5"
contentUuid: "bef0e061-9237-5218-ba3a-fd9edcb75638"
diamondUuid: "f1148591-fc2e-83bb-9c25-81dc90f90083"
uuid: "23f060a5-a656-88bd-a4e0-4dce55febda0"
horo: 1
typography:
  partition: wallet
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
signatures:
  computationUuid: "03bb12e0-6f71-8461-873e-94bce852f9bc"
  stages:
    - stage: path
      stageUuid: "d002acff-9010-8d8b-ac94-fc5c9bc24276"
    - stage: trinity
      stageUuid: "c753df25-c7d0-8253-9b22-0e90fe778fc4"
    - stage: boundary
      stageUuid: "0f94a63e-a55b-8162-af9c-39e0a86b5492"
    - stage: links
      stageUuid: "c46cad00-3f8e-82ec-8dec-27e4f2ecdb7d"
    - stage: horo
      stageUuid: "15724f2f-5e1a-83db-9b77-1590195a8eb1"
    - stage: seal
      stageUuid: "4f93e8ec-4060-8fba-a09c-5e6544393434"
    - stage: uuid
      stageUuid: "e5d890a8-6db1-80c9-9d7d-2732d4c7c9eb"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
