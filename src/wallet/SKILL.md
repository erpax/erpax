---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: "wallet · 7/descent · 9690f9ed"
contentUuid: "8882020b-a085-5006-b984-a4d9042a604f"
diamondUuid: "161687e0-ebe8-8acc-8b96-f0097910ffb2"
uuid: "9690f9ed-bfc7-84cc-9b08-b002e0f4321b"
horo: 7
typography:
  partition: wallet
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
signatures:
  computationUuid: "c29adf22-5bbc-84a6-b996-196a9c86a6ae"
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
      stageUuid: "3ee41a48-bdf0-8560-89b3-ee583fda8f61"
    - stage: seal
      stageUuid: "4f93e8ec-4060-8fba-a09c-5e6544393434"
    - stage: uuid
      stageUuid: "bea10f9f-fba9-8600-95f4-dde5b9a40841"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
