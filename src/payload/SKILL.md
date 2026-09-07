---
name: payload
description: "Use when reasoning about the matter coil — Payload is the half of every atom that becomes a collection, fields, hooks, access, and a database table; the index.ts twin the SKILL.md form is bound to by content-uuid."
atomPath: payload
coordinate: "payload · 2/share · 0f4803e5"
contentUuid: "7cdf641b-3b88-5adb-9f19-f810bbdb7684"
diamondUuid: "571a570f-4c6e-873a-a7f2-ed1239c283b7"
uuid: "0f4803e5-c960-889c-a61e-02e15fa4e90e"
horo: 2
typography:
  partition: payload
  bondDegree: 107
standards: []
bindings: []
signatures:
  computationUuid: "a3b2707b-74a2-8393-886f-c17a0f2d2086"
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
      stageUuid: "dd1a6870-2c9b-80da-85a0-9b041a6b1e80"
    - stage: seal
      stageUuid: "4013a8dc-9d32-84bb-b365-9caddb63686e"
    - stage: uuid
      stageUuid: "e33e212a-6073-8b67-a91b-b7ee93a4139d"
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
