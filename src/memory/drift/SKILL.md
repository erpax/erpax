---
name: drift
description: "Use when checking that the agent memory index still matches its files — MEMORY.md is the load surface, so a memory absent from it is written but never loaded, and an index line with no file is a citation leading nowhere. Fails closed on both directions; zero is a theorem, not a ratchet."
atomPath: "memory/drift"
coordinate: "memory/drift · 2/share · 85b42baa"
contentUuid: "8ff25fe2-71aa-584c-88fc-b97deeb547b3"
diamondUuid: "2d998d22-781e-8e41-b8dd-61dc9d9f22e4"
uuid: "85b42baa-9d03-8c68-9299-8b4963762ca5"
horo: 2
typography:
  partition: memory
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "30f9f8bc-afe3-8dec-a8f1-f1e1a313f900"
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
      stageUuid: "33435b93-a8d3-8932-a3d2-5b608603fb51"
    - stage: seal
      stageUuid: "60395318-1b36-84fa-81ec-533b163d69dd"
    - stage: uuid
      stageUuid: "b05475d3-2a47-8a96-bdce-e4fba05a4c12"
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
