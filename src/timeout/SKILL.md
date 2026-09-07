---
name: timeout
description: "Use when bounding any command's wall time — the reasonable timeout is computed from measured samples onto the 1·2·3·5-minute ladder, never guessed."
atomPath: timeout
coordinate: "timeout · 7/descent · fe8beb18"
contentUuid: "4e0f090f-469c-53c6-8336-10b8b3a502a3"
diamondUuid: "188cd82d-10d1-8056-8331-617d62539e7b"
uuid: "fe8beb18-7689-812e-91d5-8372852f9152"
horo: 7
typography:
  partition: timeout
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "37e796fc-a66d-8c37-8fff-b4c2029ab5db"
  stages:
    - stage: path
      stageUuid: "40f7818d-bd6e-8cd2-96d4-533ee1f18309"
    - stage: trinity
      stageUuid: "904cecef-07c7-8ccb-b7b1-bed0c3fa6608"
    - stage: boundary
      stageUuid: "d8d6fd47-21b7-8323-8bfa-dcf55db2df7e"
    - stage: links
      stageUuid: "544bf708-f914-8791-bf91-82f776a84171"
    - stage: horo
      stageUuid: "85efe8c2-b517-8b2b-b4ad-99a80bf7cf39"
    - stage: seal
      stageUuid: "a4834f58-4482-8972-aea9-17b0ee135421"
    - stage: uuid
      stageUuid: "c1863ab1-b350-8e89-a9c5-e73daec6face"
version: 2
---
# timeout — the reasonable timeout is computed, never guessed

The standing cap ("max 3 minutes per task") lived as prose in memory — read every session, enforced never. This atom makes it a rung on a ladder: **1 · 2 · 3 · 5 minutes, 5 is the max**.

`timeoutOf(samplesMs)` picks the smallest rung that fits **2× the worst measured run** — the safety doubling over real evidence, not a guess. No samples ⇒ rung 3 (the standing cap). Needing past rung 5 ⇒ `exceeds: true` — **the command is the defect, not the ladder**: split it ([[rules]]: a flag is an audit of the spend, not a licence to raise the cap).

Wired where src spawns: the gate lanes and the rules ratchet run under the ceiling, so a runaway lane fails visibly instead of hanging forever.

**Honest boundary.** A rung proves a command *was bounded*, never that the bound is *right* — a lane that legitimately grows past its rung earns the next one from its own measured samples, in a deliberate diff.

**Law — [[law]]: every command carries a computed timeout from the 1·2·3·5 ladder; past 5 minutes the command is split, never the ceiling raised.**

Composes: [[rules]] · [[confirm]] · [[law]].
