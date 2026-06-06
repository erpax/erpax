---
name: readme
description: Use when the repository README needs to change — it is COMPUTED, never hand-edited. Edit src/readme/index.ts (the generator) or the source it reads, then run pnpm readme. The README is a render target like a vitepress page; readme:check gates it so it can never drift.
---

# readme — the README, computed

`README.md` is not prose someone maintains. It is a **render target** — the same as a [[vitepress]] page over an [[atom|SKILL.md]], or the [[standards]] catalogue — emitted by [`index.ts`](index.ts) from the live sources of truth. Editing `README.md` by hand is a category error: the next `pnpm readme` overwrites it, and `pnpm readme:check` fails the [[gate]] until it matches.

## What is computed (everything that is a fact)

Every number, list, version, and table row is **derived at generation time**, never asserted:

- **[[package|package.json]]** → name, description, version, license, the whole script table, every dependency + version, engines, the package manager, the [[gate]] steps (parsed from the `check` chain).
- **[[collections]] barrel** (`src/collections/index.ts`) → the registered-collection count (the same `Object.values(allCollections)` [[payload]] registers).
- **the `src/` tree** (an fs scan, symlink-skipping) → `SKILL.md`, `index.ts`, `test.ts` counts — the [[trinity]] coverage made visible.
- **every atom `SKILL.md`** → the wiki-link graph + each atom's own blurb, read live (the [[merge]] of matter and antimatter into one page).
- **[[horo]] (the math)** → `digitalRoot`, the horo ring, the [[measure]] names — used to compute the core-atom spine, not a hand-picked list.
- **[[payload]] config** (`src/payload.config.ts`) → the composed plugin pipeline (in order) and the admin UI locale count.
- **`wrangler.jsonc`** → the Cloudflare binding kinds, [[bindings]] + cron triggers.
- **[[standards]] catalogue** (`src/standards/catalogue.ts`) → the governing-standards count + families.

There is **no fixed English** — not one authored sentence, tagline, or label. The generator's only string literals are markup glyphs and source *addresses* (a path, an object key, a regex anchor that names a real repo token); every word in `README.md` is read from a source. The corpus describes itself. The **core-atom spine** is computed by the math: in-degree centrality over the code subgraph (atoms that carry an `index.ts`) → the [[balance]] cut (the shortest prefix holding half the centrality mass, Σfeatured = Σrest) → ordered around the horo ring by `digitalRoot` of the centrality, tagged with the horo measure. No timestamps; stable sorts; integer math only — so the output is **byte-deterministic** and `--verify` can gate it.

## Why this is the [[law]]

The README is the repo's outermost claim about itself, and an unverifiable claim is [[entropy]]. Wiring it to its sources gives it the same property as a content-[[uuid]]: it cannot disagree with the thing it describes without the [[gate]] catching it. Change a collection, a script, a binding, a standard, an atom — the README is **stale by construction** until regenerated. Zero drift ⇒ the README is [[proof]], not decoration. This is [[trinity]] applied to the repository root.

## Use it

```bash
pnpm readme         # write README.md from the live tree
pnpm readme:check   # verify README.md is fresh (gate; exits 1 if stale)
```

Wired into the [[confirm]] / pre-push flow so a structural change that forgets to regenerate the README is caught before it lands. To change what the README *says*, change [`index.ts`](index.ts) (the skeleton) or — better — the source it reads, so the fact and its rendering stay one thing.

@standard ISO/IEC-25010:2023 §5.4 reusability — one scan, one render target
@standard ISO-19011:2018 §6.4 audit-evidence — every figure traces to a source
