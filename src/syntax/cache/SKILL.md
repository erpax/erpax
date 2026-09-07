---
name: cache
description: "Use when reasoning about cache — *\"Reuse the computed answer, never re-derive\"* is the first agent law in this corpus."
atomPath: "syntax/cache"
coordinate: "syntax/cache · 7/descent · 94ef3ee1"
contentUuid: "f732f225-9069-571a-9c3f-0a9db0b20a29"
diamondUuid: "aa1c0fc8-f6e9-8dea-9149-10296d192806"
uuid: "94ef3ee1-7bc1-842a-a61a-57c2f4614446"
horo: 7
typography:
  partition: syntax
  bondDegree: 51
standards: []
bindings: []
signatures:
  computationUuid: "501581b9-6cb1-8456-966f-91216ba2f54d"
  stages:
    - stage: path
      stageUuid: "0d4c114c-5876-898d-9829-87f3a881d39d"
    - stage: trinity
      stageUuid: "ffbb5a60-e216-89ce-aa0c-7bf06267ec9b"
    - stage: boundary
      stageUuid: "c19589f7-79c5-8f5e-b8c3-91f9e49a97ce"
    - stage: links
      stageUuid: "af2e872d-96ba-8801-99a3-1c52857df39c"
    - stage: horo
      stageUuid: "77aa5177-0b3f-8982-9e49-3d20ac0752bf"
    - stage: seal
      stageUuid: "70c4d72d-da75-8ecb-9103-0fed7d1fccfe"
    - stage: uuid
      stageUuid: "6bac87c0-cc86-8418-b717-db9ab7702a70"
version: 2
---
# syntax/cache — the instruments were the last place not reusing the answer

*"Reuse the computed answer, never re-derive"* is the first agent law in this corpus. Thirty-five
modules walk `src/` with their own `readdirSync`, and every one that reads the grammar calls
`ts.createSourceFile` again on bytes another gate parsed a moment earlier.

Same content ⇒ same parse is a **theorem**, not an optimisation: a `SourceFile` is a pure function of
(text, target, `setParentNodes`), so a second parse of unchanged bytes cannot differ from the first.
That is what makes one cache safe to share between gates that never coordinate.

## Measured, and the intuition is inverted

Three gates over 7,407 files. Min of three runs, RSS growth sampled after a forced GC:

| | time | RSS grown |
| --- | ---: | ---: |
| **A** no sharing at all | 3233 ms | +285 MB |
| **B** walk + text shared *(the default)* | **2651 ms** | **+15 MB** |
| **C** walk + text + AST shared | 2004 ms | +502 MB |
| **D** second pass, everything warm | **304 ms** | +2 MB |

**B is the surprise.** Sharing the text is faster *and* **19× lighter** — because without it each
gate allocates its own copy of the same 26 MB and the allocator grows for all of them. "Caching
costs memory" is the intuition; here the cache is what stops the waste.

**C is the trap.** 0.6 s for half a gigabyte: 26 MB of source becomes ~500 MB of tree, a **19×
expansion**. That is a real trade belonging to whoever knows the machine, so AST retention is
opt-in and never taken silently. **D** is what it is for — a process making repeated passes pays the
parse once and the rest is nearly free (10.6× on the second pass).

## The measurement that had to be corrected first

The first numbers here were taken by timing the whole registry once, before and after: 35.7 s then
45.6 s, and the change looked like a regression. Three runs of the **unchanged** tree then gave
33.08 s, 33.08 s and **55.84 s**. The variance was larger than the effect, so both numbers meant
nothing — the same failure this session refuted two other instruments for. Everything above is
measured in-process, min-of-N, with the population diffed file-by-file against the original walk to
prove no gate's answer moved.

**Honest boundary.** The scope is ONE PROCESS. A gate run is a snapshot of the tree, so a file
cannot change under it; across runs, [[gate]]/receipt already handles reuse by content hash — two
caches at two scopes, each honest about what it assumes. `clearCache()` exists for a test that
mutates the tree between assertions and for nothing else. And this is a fold of I/O, not of
meaning: it makes no gate more correct, it only stops them paying for the same bytes repeatedly.

**Law — [[law]]: the same bytes are read once and parsed once. Sharing a pure result cannot change
an answer — but retaining it can cost more than it saves, so what is cheap is shared by default and
what is expensive is asked for.**

## Standards

- **ISO/IEC 25010:2023 §5.7** — performance efficiency: resource utilisation.

Composes: [[syntax]] · [[gate]]/receipt · [[law]].
