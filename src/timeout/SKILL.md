---
name: timeout
description: "Use when bounding any command's wall time — the reasonable timeout is computed from measured samples onto the 1·2·3·5-minute ladder, never guessed."
atomPath: timeout
coordinate: "timeout · 1/base · 1a42b259"
contentUuid: "e4988a89-6fc7-5162-b732-e6e59689347b"
diamondUuid: "b83dfcc8-7be5-809e-929f-7cca0fdf7b0a"
uuid: "1a42b259-f6de-835f-98ab-1eae621e5a98"
horo: 1
typography:
  partition: timeout
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "ab855fdc-c161-8d9b-8a6a-6d186e093967"
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
      stageUuid: "c24942cf-2f8d-8cc5-815b-dc3b3c215fcf"
    - stage: seal
      stageUuid: "a4834f58-4482-8972-aea9-17b0ee135421"
    - stage: uuid
      stageUuid: "cb780d41-7eee-8165-acb4-9fca1dd45ab4"
version: 2
---
# timeout — the reasonable timeout is computed, never guessed

The standing cap ("max 3 minutes per task") lived as prose in memory — read every session, enforced never. This atom makes it a rung on a ladder: **1 · 2 · 3 · 5 minutes, 5 is the max**.

`timeoutOf(samplesMs)` picks the smallest rung that fits **2× the worst measured run** — the safety doubling over real evidence, not a guess. No samples ⇒ rung 3 (the standing cap). Needing past rung 5 ⇒ `exceeds: true` — **the command is the defect, not the ladder**: split it ([[rules]]: a flag is an audit of the spend, not a licence to raise the cap).

Wired where src spawns: the gate lanes and the rules ratchet run under the ceiling, so a runaway lane fails visibly instead of hanging forever.

**Honest boundary.** A rung proves a command *was bounded*, never that the bound is *right* — a lane that legitimately grows past its rung earns the next one from its own measured samples, in a deliberate diff.

**Law — [[law]]: every command carries a computed timeout from the 1·2·3·5 ladder; past 5 minutes the command is split, never the ceiling raised.**

Composes: [[rules]] · [[confirm]] · [[law]].
