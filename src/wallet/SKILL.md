---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: "wallet · 8/crest · f1c8b217"
contentUuid: "4f89a79a-535e-503a-a76b-00fcfd82c447"
diamondUuid: "1f656f7a-ec16-8293-994c-10935d502872"
uuid: "f1c8b217-e7ae-88a3-b4f6-44adb367365a"
horo: 8
typography:
  partition: wallet
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
signatures:
  computationUuid: "994b7daf-5b3e-8166-8625-acfcf2df196d"
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
      stageUuid: "e2b55b68-1647-8057-820c-d71795a18d96"
    - stage: seal
      stageUuid: "4f93e8ec-4060-8fba-a09c-5e6544393434"
    - stage: uuid
      stageUuid: "b57c9099-2f52-864c-a90e-8c2b4b22eeca"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
