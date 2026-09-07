---
name: payload
description: "Use when reasoning about the matter coil — Payload is the half of every atom that becomes a collection, fields, hooks, access, and a database table; the index.ts twin the SKILL.md form is bound to by content-uuid."
atomPath: payload
coordinate: "payload · 2/share · 4a955c1b"
contentUuid: "48c06199-a6d8-57c7-956d-54fa463533b6"
diamondUuid: "c34a8e4b-2587-8124-b67f-77e9c2678ecc"
uuid: "4a955c1b-b5af-83db-a783-71034a64a128"
horo: 2
typography:
  partition: payload
  bondDegree: 115
standards: []
bindings: []
signatures:
  computationUuid: "f96a8aa0-3b49-8494-a3f0-702896d84c49"
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
      stageUuid: "c958d1d4-f1d1-8c26-a47a-c8cd0be06dc7"
    - stage: seal
      stageUuid: "4013a8dc-9d32-84bb-b365-9caddb63686e"
    - stage: uuid
      stageUuid: "e7363dab-3d44-823a-bd93-bf13a857114d"
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
