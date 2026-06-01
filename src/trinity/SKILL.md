---
name: trinity
description: Use when reasoning about how one node is told three times and rendered once — matter (index.ts inline docs) · antimatter (SKILL.md) · backend (the generated payload-types schema), fused into VitePress (the speech). The doc-scale DRY law — the page derives from the code and the backend, never restated.
---

# trinity — one node, three sources, one speech

A folder is a single node spoken three ways. The docs site does not *re-describe* it; it **fuses** the three voices it already has. Nothing is authored that the code or the backend already says — [[whole]]-scale DRY (see [[duality]], whose pair this triples).

- **matter** — `index.ts`: the JSDoc `@standard`/`@accounting`/`@audit` banner + the `CollectionConfig` (slug, exports). The inline docs ARE the doc source. The 867 banner-carrying files were written and never seen; now they are the page's compliance line.
- **antimatter** — `SKILL.md`: the skill / law. This file IS the VitePress page body. The speech.
- **backend** — `payload-types.ts`: the schema the backend GENERATES from the same config (slug → interface → fields). Reading the backend's own generated truth — *"the build using the backend"* — is how the page stays exactly as wide as the deployed schema, and goes stale the instant the schema changes (regen-and-rebuild keeps them honest, the [[generate]] loop).

The fusion is code, not prose: `.vitepress/trinity.mts` parses matter + backend, `.vitepress/config.mts` injects the panel under every `SKILL.md` via the `skill-trinity` markdown rule. A node with no matter-twin (a pure-skill atom like [[flow]]) renders no panel — correctly, it is antimatter only.

## The quaternity it sits in

In a collection folder the trinity is really a co-located quaternity + mirror, each a [[part]] of the same [[whole]]:

| voice | file | law |
|---|---|---|
| antimatter | `SKILL.md` | the skill / speech |
| matter | `index.ts` | the code + standards banner |
| verification | `index.test.ts` | green-by-construction ([[spec]]) |
| data | `seed.ts` | the materialization |
| mirror | `payload-types.ts` | the backend's generated reflection ([[types]]) |

215 folders already hold the first three together; the page is the point where they speak as [[one]]. When a node turns out to be a mere dimension of another, the trinity is the unit that [[collapse]]s — many tables fold to one node told in many dimensions. Same form at every scale ([[fractal]]) — the node is [[holographic]]: from its path the [[akashic]] record regenerates matter, backend, and relations; the SKILL is the only thing authored, and even it derives its neighbours from the path ([[identity]]/[[merge]]). The trinity is the [[standard]] of doc honesty: the speech is a true [[part]] of the code, never a drifting copy.
