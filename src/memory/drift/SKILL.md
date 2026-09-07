---
name: drift
description: "Use when checking that the agent memory index still matches its files — MEMORY.md is the load surface, so a memory absent from it is written but never loaded, and an index line with no file is a citation leading nowhere. Fails closed on both directions; zero is a theorem, not a ratchet."
atomPath: "memory/drift"
coordinate: "memory/drift · 8/crest · 91c2b1b1"
contentUuid: "4a87469f-37d3-56d7-8626-f91b14799306"
diamondUuid: "aa3b03d0-ca55-8862-bff9-d12f5e323eb1"
uuid: "91c2b1b1-03ef-8b99-8abd-1cc0192ca23e"
horo: 8
typography:
  partition: memory
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "17ae3498-2175-8e6e-adf3-93a2e4b792fb"
  stages:
    - stage: path
      stageUuid: "a41e0fad-ca01-8404-bfb0-067b3406f8b9"
    - stage: trinity
      stageUuid: "e2b13bb2-48c4-8793-9ef4-603a6fa6894a"
    - stage: boundary
      stageUuid: "5362fa04-f490-8534-9bc9-708f2a25e8a0"
    - stage: links
      stageUuid: "9459bf8c-4018-8727-953d-6d400c1aec16"
    - stage: horo
      stageUuid: "1cba9e85-8eb9-8336-bbb0-2d4a55050ad1"
    - stage: seal
      stageUuid: "60395318-1b36-84fa-81ec-533b163d69dd"
    - stage: uuid
      stageUuid: "243ad164-b03b-882d-9569-063782838a68"
version: 2
---
# drift — a memory off the index is not an instruction

`MEMORY.md` is the **load surface**: one line per memory, and it is what enters context
each session. A memory file that is not named there is never read. It can be complete,
correct and emphatic, and it will not apply.

That is measured, not feared. On 2026-08-20 the live memory held **121 files with 11
orphaned** and **3 index lines pointing at deleted files**. Four orphans were STANDING
feedback:

| orphaned instruction | violated in the session that found it |
| --- | --- |
| never compute with `python3` — use `tsx` on sealed functions | used throughout |
| UPDATE the tool, never defer with "the rest is your call" | deferred repeatedly |
| never end a turn with a solicitation | ended turns exactly that way |
| ignoring or bypassing a violation IS a violation | used `--no-verify` |

The instructions existed. The index did not carry them, so they were not instructions.

## Both directions are drift

**Orphan** — on disk, off the index: written, never loaded, silently inert.
**Dead entry** — on the index, no file: a citation leading nowhere ([[rules]]/reference,
turned on memory instead of on `src/`).

Neither surfaces as an error anywhere else, which is exactly why it needs a gate: the
failure mode of both is **silence**.

**Honest boundary.** This proves the index and the files AGREE — never that a memory is
true, current, or worth loading. A perfectly indexed corpus of stale memories passes.
Consolidation is a separate judgement; this only guarantees that what exists is reachable.

**Law — [[law]]: the index is the load surface. A memory that is not on it does not
exist, and an entry that resolves to nothing is a lie about what is remembered — zero
drift is a theorem, not a ceiling to ratchet toward.**

Composes: [[memory]] · [[rules]]/reference · [[law]].
