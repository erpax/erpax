---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: "wallet · 4/weave · a9416aad"
contentUuid: "045562a5-088b-51f4-8e37-5b4bf66656a1"
diamondUuid: "25700287-391b-848d-82c9-dc82924d5d9e"
uuid: "a9416aad-53a2-87da-afb8-c467a60cb003"
horo: 4
typography:
  partition: wallet
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
signatures:
  computationUuid: "d879b0ac-b2ed-8ea6-8bfa-d1320922f482"
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
      stageUuid: "dd4b5508-6875-84f2-9c53-9e35c0d9dc98"
    - stage: seal
      stageUuid: "4f93e8ec-4060-8fba-a09c-5e6544393434"
    - stage: uuid
      stageUuid: "d13ef966-7baf-881b-976a-0569f6847903"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
