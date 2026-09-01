---
name: context
description: "Use when reading the live quantum surface state — superposition pending paths, last collapse, bond reciprocity, and the formatted status the CLI prints. The last loose sibling in the quantum partition, now an atom. Run: tsx src/quantum/context/index.ts"
atomPath: "quantum/context"
---

# context — the live state of the quantum surface

What is currently in superposition, what collapsed last, and whether the bonds reciprocate. This is the read side of the partition: [[quantum]]/status formats it for the CLI, [[apply]] and [[monitor]]/violations read it to decide what to do next, and [[seal]] folds it into a receipt.

It was the **last loose `.ts`** beside the quantum barrel. With it nested, the partition holds **zero** stray files — every piece of matter under `quantum/` is an addressable atom with a path, a uuid, and a place in the fold ([[rules]]/invisible).

## The move, and why it cost nothing

Nine importers, every one using the alias `@/quantum/context` — which resolves to `context/index.ts` unchanged. Zero repoints.

That was established rather than assumed, because a first scan said otherwise. `from './context'` matched siblings in other directories, and `src/agent/context/index.ts` is a **different atom** that happens to share a word. The same false positive had already appeared twice in this partition's other moves, on `./registry` and `./dimensions`.

The four checks that make a move safe here, each earned by a failure elsewhere in the corpus:

| check | what it caught previously |
| --- | --- |
| relative-import depth | [[quantum]]/ftl/admin — `./index` came to mean the file **itself** after nesting: a self-import that typechecks and leaves every binding `undefined` |
| literal path probes | `self/improve/tip` locates matter with `existsSync` on a path string, invisible to any import scan |
| all extensions, all dirs | two `.tsx` consumers of the dimension move were missed by a `*.ts` glob; a stale import in `scripts/` was missed by a `src`-only glob |
| subprocess dispatch | [[quantum]]/status is invoked by the CLI as a path, so both import and symbol scans reported zero references — and it was nearly deleted as dead |

All four came back clean here. A move is only zero-risk once every spelling of a reference has been looked for.

**Honest boundary.** This proves the state is **addressable and its consumers resolve** — not that the state it reports is **correct**. Whether `bond reciprocity 100%` is true of the corpus is [[quantum]]/status's question and the underlying computation's, not this atom's.

**Law — [[law]]: a partition is closed when nothing loose remains beside it. The last stray is the one that proves the rule was a rule and not a habit.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — modularity: one concept, one addressable home.

Composes: [[quantum]] · [[quantum]]/status · [[seal]] · [[rules]]/invisible · [[law]].
