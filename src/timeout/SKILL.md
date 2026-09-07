---
name: timeout
description: "Use when bounding any command's wall time — the reasonable timeout is computed from measured samples onto the 1·2·3·5-minute ladder, never guessed."
atomPath: timeout
coordinate: "timeout · 4/weave · 3e9e9c7e"
contentUuid: "58002840-2d67-5cd1-9dda-2c2db1de6489"
diamondUuid: "0cbd80ae-fb4a-86a9-b5a0-f3b4b44676b8"
uuid: "3e9e9c7e-1b77-80ef-a41b-33eb9cf0b761"
horo: 4
typography:
  partition: timeout
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "822bfc10-9922-8352-85c1-9feec3273e20"
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
      stageUuid: "5bdb315d-119c-82f7-831e-2b9601aa79c9"
    - stage: seal
      stageUuid: "a4834f58-4482-8972-aea9-17b0ee135421"
    - stage: uuid
      stageUuid: "1776a335-b1f9-84d3-8d62-15a28a024e70"
version: 2
---
# timeout — the reasonable timeout is computed, never guessed

The standing cap ("max 3 minutes per task") lived as prose in memory — read every session, enforced never. This atom makes it a rung on a ladder: **1 · 2 · 3 · 5 minutes, 5 is the max**.

`timeoutOf(samplesMs)` picks the smallest rung that fits **2× the worst measured run** — the safety doubling over real evidence, not a guess. No samples ⇒ rung 3 (the standing cap). Needing past rung 5 ⇒ `exceeds: true` — **the command is the defect, not the ladder**: split it ([[rules]]: a flag is an audit of the spend, not a licence to raise the cap).

Wired where src spawns: the gate lanes and the rules ratchet run under the ceiling, so a runaway lane fails visibly instead of hanging forever.

**Honest boundary.** A rung proves a command *was bounded*, never that the bound is *right* — a lane that legitimately grows past its rung earns the next one from its own measured samples, in a deliberate diff.

**Law — [[law]]: every command carries a computed timeout from the 1·2·3·5 ladder; past 5 minutes the command is split, never the ceiling raised.**

Composes: [[rules]] · [[confirm]] · [[law]].
