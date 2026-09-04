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
