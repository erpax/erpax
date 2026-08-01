---
name: test
description: "Use when proving or tightening the unbreakable-matrix gate — the test that pulls all entropy as food for agents and leaves purity for the skills, so no agent can record uncollidable data or break the content-uuid matrix."
atomPath: "schema/test"
coordinate: "schema/test · 5/round · 5d70ea16"
contentUuid: "866a7def-b650-50ce-9543-b64d44d8b1ab"
diamondUuid: "5f4328f1-a42e-81ec-93a9-6ccc5ba3e6e5"
uuid: "5d70ea16-d803-85da-8091-6787e8b05a2f"
horo: 5
typography:
  partition: schema
  bondDegree: 100
standards:
  - "ISO/IEC 25010:2023 quality-model (integrity, modularity)"
  - "ISO/IEC 25010:2023 quality-model (integrity, modularity)`"
  - "RFC 9562 §5.8 (uuidv8 content-uuid) — the collision unit"
  - "RFC 9562 §5.8 (uuidv8 content-uuid) — the collision unit`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8b94fb64-15b3-829f-b7ae-042387ac9daa"
  stages:
    - stage: path
      stageUuid: "de8fb821-5ac3-8d57-87ca-b2ce615750f0"
    - stage: trinity
      stageUuid: "53f1398c-1f7a-89ed-b8f0-be0ebd14fed0"
    - stage: boundary
      stageUuid: "ed2c1ea9-a76b-87b0-92b3-cc063eb56dfe"
    - stage: links
      stageUuid: "0956328f-f695-87eb-9e0c-cae8ad328ddd"
    - stage: horo
      stageUuid: "acbaeb4d-57b2-8fd6-aceb-f701d13badc8"
    - stage: seal
      stageUuid: "debba1ce-9817-8b93-b249-524d61e12067"
    - stage: uuid
      stageUuid: "d8abaa25-00ed-84c5-9968-59da8332beaa"
version: 2
---
# test — the gate that makes the matrix unbreakable

The test proves ONE thing per atom, and nothing else: **maximum tamper-cost at zero entropy — balanced**. Zero entropy ⇒ infinite mass ⇒ infinite tamper-cost: [[one]] limit. The matter twin (`index.ts`) is the detector; this is its law.

## The metabolism — entropy is food, purity is the skill
The test **pulls all entropy** (every recorded thing that does not collide into the matrix) as **food for the agents**, leaving **purity for the skills**. An agent cannot *record* uncollidable data: a save is **redirected** into the convention — create/update the related atoms via skills (built in [[team]]s), **confirmed by payload ⊕ vitepress** ([[confirm]]). Each entropy unit carries its `redirect` — the path to digest it into an atom.

## The laws the gate enforces
- **Zero entropy = a text is entered exactly once.** Dedup by **reference** (`[[link]]`), never deletion — no lost [[schema]]. The uuid does the same: it is **language-independent** (content-addressed), entangled to payload ⊕ vitepress.
- **Max tamper-cost.** `uuid = sha256(SKILL.md)`; `bind = content ⊕ coordinate` ([[trinity]]: parent⊕prev⊕next); `verifyBind` holds for every atom; `verifyRoot` folds to the one root; coverage→1 ⇒ crack-cost = ∞ ([[tamper]]).
- **Balance.** Debit entropy = credit tamper-cost, net zero; [[dimension]]s (multi-coordinate words) collapse to [[one]].
- **Cross-linked in all computable dimensions.** An atom passes only if woven both ways — outgoing `[[links]]` AND incoming backlinks — entangled to payload (relationships) ⊕ vitepress (links). An orphan or dead-end is food, not a passing atom ([[aura]] · [[merge]]).
- **Only collidable files in `src/`** (the rest is uncollidable data → DB); **only dot-folders + the vitepress-generated `public/` beside `src/`** (no loose `docs`/`scripts`/`tests`). [[dissolution]].
- **No bypass.** Ignoring or muting a violation (gitignore, `--no-verify`, `@ts-ignore`, escape hatch) is itself a violation. Fix the root.

## Types are atoms — all computed
Types meet in atoms because an atom **is** a type ([[types]] · [[schema]]); they merge into the [[one]] zero-point app, **all computed** ([[merge]] · [[holographic]]). **DRY imports/exports are the gravity** that migrates code to the core: import ⊕ export ⊕ the module that balances them is a [[trinity]] (give·take·balance). Drive every reference to one home and the mass pulls the corpus to its centre.

## The generational seed loop
The **test results are the `seed.ts` in each folder** — the materialized, verified state (the data voice of the quaternity: SKILL.md ⊕ index.ts ⊕ index.test.ts ⊕ seed.ts). **Every new test starts from the previous test's seeds**: a fixpoint iteration (test → seed → test → seed) that converges on zero entropy. The seed is the proof made data; the corpus self-generates toward purity ([[generate]] · [[society]]).

Matter-twin: `src/schema/test/index.ts` (`pullEntropy`, `matrixBreaks`, `uncrosslinkedAtoms`, `duplicateDescriptions`, `isPure`).
Composes: [[schema]] · [[trinity]] · [[tamper]] · [[aura]] · [[merge]] · [[generate]] · [[seed]] · [[testing]] · [[dry]] · [[types]] · [[confirm]] · [[dimension]].

**Law — [[gate]]** The corpus is pure when `pullEntropy()` is empty: every recorded thing is a balanced, cross-linked, tamper-bound atom. Until then, the difference is the agents' food.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 quality-model (integrity, modularity)`
- `@standard RFC 9562 §5.8 (uuidv8 content-uuid) — the collision unit`
