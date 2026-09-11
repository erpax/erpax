---
name: canonical
description: "Use when checking that an installed package is actually used through its own API — a dependency in package.json whose exports are never called in src is dead weight or a hand-roll waiting to happen. Export names are READ from the package (r2Storage is not derivable from @payloadcms/storage-r2), never guessed from the dep name; an import alone is not use, the call site is the evidence. Run: tsx src/rules/canonical/index.ts"
atomPath: "rules/canonical"
coordinate: "rules/canonical · 2/share · 7c55740a"
contentUuid: "0244f8c8-ee8b-5603-be54-06dc7dcaa505"
diamondUuid: "5450eea5-d9b6-8488-a42f-323fa3fbe89a"
uuid: "7c55740a-b8d5-841c-a55e-a3ec3c497975"
horo: 2
typography:
  partition: rules
  bondDegree: 6
standards:
  - "ISO/IEC 25010:2023 §5.5 reusability — use the dependency or drop it"
bindings: []
signatures:
  computationUuid: "e20af3ff-45b3-8bad-a6d3-ebf1372182fe"
  stages:
    - stage: path
      stageUuid: "e528b63d-cf3f-820b-84cb-079a936e9a0e"
    - stage: trinity
      stageUuid: "0c966ef7-b9f1-862f-923f-78f5f2657ad7"
    - stage: boundary
      stageUuid: "8ce61971-873c-81a2-bb3d-4f12f947822f"
    - stage: links
      stageUuid: "b279fc1e-4e0d-80b6-8f14-7e16854e853e"
    - stage: horo
      stageUuid: "c12b2ba9-d8d7-8215-ae04-bd767468c91f"
    - stage: seal
      stageUuid: "14b51cff-c456-8397-89ab-e8e595f6ffdc"
    - stage: uuid
      stageUuid: "6303d662-4171-8203-a6dc-741999b685e1"
version: 2
---
# canonical — use the package or drop it

Minimum tokens come from **minimum prose and maximum code**. "Use packages canonically" as prose costs ~550 tokens in every agent's system prompt, on every turn, forever — and still relies on the agent choosing to obey. As a **gate** it costs zero tokens and cannot be violated ([[rules]]: a law is obeyed only when a gate blocks its violation, not when it is written down).

The violation is mechanical: a governed dependency whose exports are never called in hand-written `src/`. It was real three times:

| package | the hand-roll beside it |
| --- | --- |
| `plugin-nested-docs` | 9 collections hand-rolled a self-referential `parent` tree — now wired computed in `payload.config.ts` |
| `plugin-multi-tenant` | *imported* but never called, beside a hand-rolled `tenantCollectionsConfig` |
| `plugin-seo` | installed, never called |

- `exportNamesOf(pkgDir)` — the package's own type face is the authority on its API. `r2Storage` cannot be derived from `@payloadcms/storage-r2`, so the name is never guessed.
- `unwiredPackages(cwd)` — governed deps (`@payloadcms/plugin-*`, `@payloadcms/storage-*`) with no call site. **An import is not use** — the call is. Generated bundles (`skills.index.ts`, `payload-types.ts`) restate every symbol, so they are not evidence.
- `assertPackagesCanonical(cwd, ceiling)` — ratchets: fails on getting worse, the ceiling drops as each is wired or dropped.

**Honest boundary.** This proves a package is *called*, never that it is called *well* — extending through a plugin's override API vs fighting it is beyond the gate. And a package with no readable API face is never judged rather than guessed at.

**Law — [[law]]: an installed package is used through its own API or dropped — a dependency whose exports are never called is dead weight or a re-implementation of what it already ships.**

Composes: [[rules]] · [[law]].
