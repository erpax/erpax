---
name: wallet
description: "Use when holding value — a balance under an owner identity; double-entry and content-addressed, so the wallet state is tamper-evident and every move balances."
atomPath: wallet
coordinate: "wallet · 8/crest · fc6c4689"
contentUuid: "4db7431a-341a-522e-ad0f-b0943f62bb2b"
diamondUuid: "b809c98e-0ab8-8cec-a033-58ac666f64ef"
uuid: "fc6c4689-f8fa-8242-b4b4-ee0d712e72ea"
horo: 8
typography:
  partition: wallet
  bondDegree: 37
standards:
  - "double-entry ([[entry]]); content-addressed state ([[uuid]])"
bindings: []
signatures:
  computationUuid: "7ddd1cfb-2f8a-856c-b32f-f4085071e37d"
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
      stageUuid: "5f601699-516d-8145-b979-81148aa23983"
    - stage: seal
      stageUuid: "4f93e8ec-4060-8fba-a09c-5e6544393434"
    - stage: uuid
      stageUuid: "14871983-cd98-81d1-a200-7ca064a707bb"
version: 2
---
# wallet — holds value

A wallet **holds value**: a [[balance]] under an owner [[identity]]. In erpax value is **double-entry** ([[entry]]) and content-addressed, so a wallet's state is **tamper-evident** — the [[quantum]]/wallet facet gives it a state content-uuid (any balance change → new uuid) and a balanced transfer. `credit`/`debit` are pure (return a new wallet). Composes [[balance]] · [[identity]] · [[money]] · [[account]] · [[quantum]].

Matter-twin: `src/wallet/index.ts` (`Wallet` · `wallet` · `credit` · `debit`).

**Law — [[law]]: a wallet holds value as a [[balance]] under an owner [[identity]] — double-entry ([[entry]]) and content-addressed, so any balance change yields a new state uuid and every move balances ([[tamper/cost]]).**

@standard double-entry ([[entry]]); content-addressed state ([[uuid]])
