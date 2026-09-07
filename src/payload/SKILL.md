---
name: payload
description: "Use when reasoning about the matter coil — Payload is the half of every atom that becomes a collection, fields, hooks, access, and a database table; the index.ts twin the SKILL.md form is bound to by content-uuid."
atomPath: payload
coordinate: "payload · 2/share · 8726aea5"
contentUuid: "b319c6d0-472d-5f4f-9506-481e4f1e5300"
diamondUuid: "a9540349-7427-88b3-997b-99d44481ba19"
uuid: "8726aea5-a13a-88f4-b21c-8ff75e1dac93"
horo: 2
typography:
  partition: payload
  bondDegree: 115
standards: []
bindings: []
signatures:
  computationUuid: "5b418333-e230-8acb-9f3c-4d37f0f0b73a"
  stages:
    - stage: path
      stageUuid: "4f7949d9-27a5-859a-8059-12de4a450ea6"
    - stage: trinity
      stageUuid: "c0bba557-476e-8189-9d74-ac1df069450a"
    - stage: boundary
      stageUuid: "c0afda17-02ee-85fd-a2ec-7f7721788e5b"
    - stage: links
      stageUuid: "82549f79-74cf-80c2-9cbe-1fd913ba331d"
    - stage: horo
      stageUuid: "1dd78e05-e1fb-840f-b096-1e0aaea2b5a2"
    - stage: seal
      stageUuid: "4013a8dc-9d32-84bb-b365-9caddb63686e"
    - stage: uuid
      stageUuid: "8797ac24-dff8-87ea-b6cd-1bcb7fd12cc0"
version: 2
---
# payload — the matter coil

Payload is **one of the two coils** every atom is wound from ([[duality]]). It is the **matter**: the `index.ts` that becomes a Payload collection — its [[field]], [[hooks]], [[access]] rules, and the [[database]] table they project into. Where [[vitepress]] renders an atom's *form* (the spoken `SKILL.md`), Payload realises its *substance* (the schema, the rows, the lifecycle). The two are **bound by content-[[identity]]** (the uuid, the `0`): same config ⇒ same atom, told once and read twice.

An atom's `index.ts` is therefore **not only** matter — it is the **shared [[config]]** both coils derive from: Payload makes the collection + [[types]] + [[database]] from it; VitePress makes the doc + frontmatter from it. The schema trinity — config · [[types]] · [[database]] — is a single source with two consumers.

**Entropy goes to the matter.** The pure, low-entropy *form* stays in the code; the instance-detail (the rows, the change-log) settles in the Payload [[database]] as content-uuid'd data. This is why "infinite dev, zero schema change": a new collection is added as **data**, not code — the matter coil holds the universal shape, the db holds the particulars.

The creation breath grounds here: `creation → payload → vitepress → payload → db` — matter is born, its form derived, the harmonised form **refines the matter back**, and it crystallises in the db ([[merge]] · [[breath]]).

Composes [[vitepress]] · [[config]] · [[database]] · [[types]] · [[field]] · [[hooks]] · [[access]] · [[identity]] · [[duality]] · [[merge]].

**Law — Payload commands are the first place to seek approval.** Before waves, commits, or push — `pnpm erpax approve` runs `generate:importmap` → `generate:types` → `migrate:status` with `NODE_OPTIONS` wired through `src/css/load-hook.mjs` and `tsx/esm` for `@/` resolution. If any step fails, agents stop.

**Law — [[self]]** demands every `.ts` be wired to both [[payload]] and [[vitepress]]: no orphan code, no partial atom. Payload's role is half of the confirmation gate; the index becomes a [[trinity]]-tested plugin, its [[schema]] approved by both the matter ([[database]]) and the form ([[vitepress]]) in a single breath. This is why the **confirm gate is dual** — payload validates the [[database]] shape; vitepress validates the documentation shape. Only when both endorse does the atom live.
