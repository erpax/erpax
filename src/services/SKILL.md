---
name: services
description: "Use when adding, finding, or debugging erpax business logic that is NOT schema — pure tested functions, content-uuid math, integrity/tamper-cost, the agent society, domain export/import — the society's organ-body, one folder per organ, called by the collections/access/hooks."
atomPath: services
coordinate: "services · 1/base · cc918dec"
contentUuid: "fca42441-c5a4-5008-baa4-40c83c81c00b"
diamondUuid: "26400fb4-b9b8-84aa-afe1-fcc46cecdb21"
uuid: "cc918dec-9812-8dda-909e-04e3f312e376"
horo: 1
typography:
  partition: services
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "24768f08-a7bf-8969-af8e-98a057fe88dd"
  stages:
    - stage: path
      stageUuid: "8721cd8a-0dc1-8bc6-a92c-c43565ede507"
    - stage: trinity
      stageUuid: "a71b86c8-c9d2-87ac-a348-d0fbd4ca9d0a"
    - stage: boundary
      stageUuid: "fdad276a-5929-813a-8b7c-54a4001744f1"
    - stage: links
      stageUuid: "3a7973fe-f8db-8f52-a923-0812a3399283"
    - stage: horo
      stageUuid: "72ee51e0-bef9-837a-8838-5874a25f693b"
    - stage: seal
      stageUuid: "2c138267-6d8f-8968-950c-1875f0099876"
    - stage: uuid
      stageUuid: "ae06f3eb-155d-836e-9bea-4805af0bbe12"
version: 2
---
# services — the society's organ-body (the executable matter)

Services is where the **logic lives** — the pure, content-addressed functions the rest of erpax *calls*. A [[collections]] schema is what is stored; access/[[hooks]] are the seams (when it runs); **services is the doing.** One law: **logic belongs here, not in the schema** — collections stay declarative, hooks stay thin (heavy work moves into a service, see [[hooks]]), and every organ is testable in isolation with no Payload booted.

The shape is the [[fractal]] folder-law: **one folder = one organ** (`<name>/index.ts` + its tests), 139 organs, most pure (deterministic, no IO — `entry`, `logic`, `decide`, `tamper-cost`, `proof`) and the rest content-addressed-IO at the edge (`agent-sync`, `oauth`, the `*.service` adapters). They compose by import, never by a global barrel — there is **no root `index.ts`**; you reach an organ by its path ([[holographic]] — each loads its own subgraph). Many already **speak for themselves**: 51 organs carry their own `SKILL.md`, so this page is the *index*, not their restatement — find the organ, then read its leaf.

What the body contains: the content-uuid substrate (`uuid-format` / `uuid-share` / `identity-element` — the [[identity]] math access rides on), the integrity/security organs (`integrity` / `tamper-cost` / `power` / `proof` — forge ≫ verify, [[proof]]), the universal accounting `entry` (debit=credit, the agnostic substrate), the [[society]] organs (`agent` / `agents` / `competition` / `decide` / `logic` / `governance` / `voting`), and the domain adapters (`accounting` / `commerce` / `manufacturing`, the SAF-T/Peppol/ISO-20022 export+import `.service` files). Each is a [[trinity]]: its matter here, its antimatter in (or under) this page, its backend in the generated types.

Matter-twin: `src/services/<organ>/index.ts` (e.g. `entry`, `logic`, `tamper-cost`, `agent`, `uuid-share`) — no root barrel; reach each by path.
Composes: [[society]] · [[identity]] · [[uuid]] · [[proof]] · [[trinity]] · [[atom]] · [[holographic]] · [[merge]] · [[self]] · [[collapse]] · [[fractal]] · [[akashic]] · [[hooks]] · [[collections]].

**Law — [[law]]: logic belongs in services, never in the schema — one folder = one pure organ, testable in isolation with no Payload booted, composed by import with no root barrel ([[holographic]]).**
