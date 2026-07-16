---
name: cycle
description: "Use when a module reads a binding that does not exist yet — 'Cannot access X before initialization'. Reports the strongly connected components of the runtime import graph: sets of files that can all reach each other, where initialisation order is decided by accident. Type imports are not edges. Run: tsx src/rules/cycle/index.ts"
---

# cycle — an import loop is a lie the module graph tells at runtime

A cycle is not a style defect. It **decides initialisation order**, and when a module inside the loop runs code at import time, it reads a binding that does not exist yet:

```
ReferenceError: Cannot access 'createAccountingCollection' before initialization
```

That is live in erpax, and it was found **by accident, twice**, because the failures it causes are silent.

## The measurement

| | count (2026-07-16) |
| --- | ---: |
| import tangles (SCC, size > 1) | **7** |
| the largest | **152 files, all mutually reachable** |
| the rest | 11 · 3 · 2 · 2 · 2 · 2 |

**152 files that can all reach each other.** Not a knot at the edge — the corpus's core: `factory/collection-factory`, `collections`, `fixed/assets`, `agents/mcp/tool-defs`, `readme/compute`, `diamond` are all in the same component.

One ring through it, traced end to end:

```
factory/collection-factory → diamond → readme → readme/compute → rules → quantum
  → quantum/dimension-realtime → team/comms → agent/sync → chat-broadcast → agent
  → agents/mcp → agents/mcp/tool-defs → collections → fixed/assets
  → factory/collection-factory
```

**A collection factory reaches the agent's MCP tool definitions, which import every collection, which import the factory.** Then `fixed/assets` calls `createAccountingCollection(...)` at module top level, while the factory is still initialising.

**No single hop is wrong.** `diamond` legitimately needs the readme model; the readme legitimately renders the rules registry. Only the whole ring is wrong — which is exactly why it survived, and why this is a command rather than a paragraph.

## What it has already cost

- **`readme/test.ts`** — the whole file fails to collect. Red, and unseen.
- **`gl/accounts/period/end/adjustments`** — the posting hook's journal-entry booking throws this TDZ; the hook's own `catch` swallows it and returns normally. **The adjustment is marked `posted` with no journal entry, and the user sees success.** That hook **is** wired.

## The bug this gate shipped with

It was first written as a depth-first walk that marked nodes `done` and reported the stack slice on a back-edge — with a comment boasting *"Tarjan-free"*. It reported **90 loops** and **missed the one it was written for**: a finished node is never re-entered, so any loop reachable only *through* it is invisible.

**A false negative in a gate is worse than a false positive** — it reports green over the exact defect it exists for. Tarjan is not decoration; it is the reason the answer is complete. The fixture that reproduces the miss is pinned in `test.ts`.

An **SCC is the honest unit**: enumerating every distinct ring is exponential in a dense tangle, while the component answers the question that matters — *which files are mutually entangled* — in linear time.

## Entangled is not fatal — `fatalCycleUses`

ES modules tolerate a loop as long as nobody **uses** a binding while the graph is still initialising. So the question worth asking is not *who is in a ring* — it is *who runs a ring-mate at load time*:

| | count (2026-07-16) |
| --- | ---: |
| files in a tangle | **174** |
| that CALL a binding from their own tangle at load time | **20** |

A fix list, not a map — and it independently finds `fixed/assets:34 → createAccountingCollection()`, the one that was found by reading.

Two things it must NOT flag, and both were learned the hard way:

- **A function is deferred.** `const build = () => make()` runs long after initialisation. Only an initialiser that *is not* a function body is evaluated at load time.
- **A builtin cannot be in a dead zone.** The scan reported **49** uses until the source check existed; ~44 were `join`, `existsSync`, `createRequire` — node builtins, fully initialised before our graph starts, structurally incapable of the failure being hunted. Only a binding imported **from a file in the same tangle** can be undefined.

**Honest boundary.** An import whose specifiers are ALL inline  is erased too — the same class as `import type`, in different syntax. Counting it invents an edge, and an invented edge in a cycle gate is an invented cycle; it is 5 of 3,995 braced imports here, and correcting it moved neither the 152 nor the 20. The tangle is not an artifact of the scan.

This proves a binding is **run during initialisation**, never that the run **throws** — whether a given loop bites depends on the order the graph is entered, which is why `readme/test.ts` dies and a full Payload boot may not. It reads top-level **calls**; a bare dereference (`const x = importedObj.field`) is evaluated too and is not yet caught. And the 154 entangled files that run nothing are not innocent — their initialisation order is decided by accident, which is the latent form of the same failure.

**Law — [[law]]: a module may not depend on itself, however far around. An import loop makes initialisation order an accident, and a top-level call inside one reads a binding that does not exist yet.**

## Standards

- **ISO/IEC 25010:2023 §5.6.2** — modularity.

Composes: [[rules]] · [[law]].
