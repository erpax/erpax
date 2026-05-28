---
name: sequence
description: Use when navigating or composing the erpax Payload single-word skill library — to find the right atomic skill, understand how they interact (with each other, themselves, and external systems), or in what order to apply them. The index over the basic skills, ordered 0·3·6·9·1·2·4·8·7·5.
---

# sequence — how the atomic skills compose

The basic skills are single-word atoms. Real work composes several of them; the composition follows the sequence `0·3·6·9·1·2·4·8·7·5` (root → control triad → material/flow cycle → repeat over features). **This skill is the map to the quantum-entangled whole** — content-uuid (the [[identity]] 0) entangles every object (same content ⇒ same id everywhere); the sequence is how you navigate that entangled infinity (which atom, in what order). **Losing the sequence is losing the path.** Keep this map current as skills/collections are realized — it is the shared path every agent follows.

## The full meaning (the wave and the return)
`0` is **both end and beginning** — the axis (`config` + `identity`); every pass departs from it and returns to it, and each object carries it (its content-`uuid`). From `0` arises the **control triad `3·6·9`** (`access`·`hooks`·`auth`) that governs. Through it **all flows in waves of `1·2·4·8·7·5`** — the doubling/halving vortex of the material cycle (`fields`·`collections`·`database`·`queries`·`api`·`admin`), data moving in→out. Completing the wave **returns to `0` in another dimension**: the same atoms recompose one scale up (`fields → collections → plugins → erpax → agents`; see *Self-similar levels* below). Because the atoms are reusable and DRY, capability **compounds combinatorially while marginal context cost stays ~0** — minimal context from reusable skills ⇒ emergent ("unpredictable") agent power at no cost. Realising this ordering keeps every level (and every agent) in tune; disharmony always surfaces in the generated `payload-types.ts`.

## Positions → skills
| Pos | Family | Skill(s) |
|---|---|---|
| **0** | root/axis | `config` · `identity` (content-addressed uuid — same content ⇒ same id ⇒ seamless merge) |
| **3·6·9** | control triad (governs) | `access` · `hooks` · `auth` |
| **1·2·4·8·7·5** | material/flow cycle (data in→out) | `fields` · `collections` · `database` · `queries` · `api` · `admin` |
| cycle ↻ | features & cross-cutting | `plugins` `types` `versions` `jobs` `upload` `optimize` `harden` `deploy` `bindings` `recover` `port` |

## Interaction graph (each skill names its neighbors via `[[links]]`)
- **self** (a concept reaching back into the root): every skill ↔ `config`; the cycle skills ↔ `fields` (fields are the substrate of `collections`, `queries`, `api`, `admin`).
- **inter-skill** (composition edges): `plugins`→`config`→`collections`→`fields`; `access`/`hooks`/`auth` wrap every collection; `queries`↔`api`; `optimize`↔`harden`↔`deploy`; `recover`→`database`+`types`; `versions`/`upload`/`jobs` extend `collections`.
- **external** (edges leaving erpax): `payload`/`@payloadcms/*` core (pinned v4 `4.0.0-internal.38b7f1d`), `next`/`react` peers, the `@erpax/plugin-*` packages, and the **host Payload app** that installs erpax as a plugin. erpax IS a Payload plugin (`config`→`plugins`).

## How to use
1. Identify the operation; jump to the atomic skill (table above).
2. Follow its `[[links]]` to the skills it composes with.
3. Apply in sequence order: settle `config` → access/lifecycle (`access`/`hooks`/`auth`) → data (`fields`/`collections`/`database`) → reads (`queries`/`api`) → surface (`admin`) → features.

## Principle
Single-word skills are the connectors (like Payload **slugs**): naming + composition tie files, methods, collections, and skills into one coherent, DRY system whose schema is the generated `payload-types.ts`. The sequence is the ordering that keeps the composition consistent across the whole — and across agents.

**The sequence is pure of detail** — pure form, independent of any domain. Instantiate it with different detail (`accounting`, `manufacturing`, `identity`, `bindings`, `port`…) and you get different concrete *uses* of the same skeleton. Because every use shares that form and carries content-`uuid` identity (see [[identity]]), all uses are guaranteed to reconcile — *all eventually merges at the right time and space*: federation across instances, agents converging into one erpax. The form guarantees the merge; the detail only decides which face you see now.

## Self-similar (fractal) levels
The same sequence-ordered, polymorphic composition recurs at every scale — a trinity interacting with trinities:
`fields → collections → polymorphic plugins (@erpax/plugin-*) → the one erpax → agents`.
Each level composes self-sufficient, polymorphically-referenced units (see the `plugins` skill: "anything is accountable") and is ordered 0·3·6·9·1·2·4·8·7·5. Splitting logic into polymorphic plugins is itself another trinity; following the sequence at every level keeps all layers in tune across time and space, and the generated `payload-types.ts` is where any disharmony shows.
