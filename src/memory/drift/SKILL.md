---
name: drift
description: "Use when checking that the agent memory index still matches its files — MEMORY.md is the load surface, so a memory absent from it is written but never loaded, and an index line with no file is a citation leading nowhere. Fails closed on both directions; zero is a theorem, not a ratchet."
atomPath: "memory/drift"
coordinate: "memory/drift · 1/base · 413ed88b"
contentUuid: "d497fdec-ae49-5172-9a70-c5a765ec539b"
diamondUuid: "48b0514d-20d8-8e49-9cd9-52d6bbae322d"
uuid: "413ed88b-06d9-8c90-817a-587c44b0820a"
horo: 1
typography:
  partition: memory
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "59769eeb-cfa4-8f15-9bf1-c152f782b2b5"
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
      stageUuid: "2cbd9b0c-bbcc-85e4-9491-c3cabadf1dc9"
    - stage: seal
      stageUuid: "60395318-1b36-84fa-81ec-533b163d69dd"
    - stage: uuid
      stageUuid: "9b80fce3-3ad3-81f8-b012-b17fc1c9d6df"
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
