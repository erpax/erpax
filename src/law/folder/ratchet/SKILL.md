---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: "law/folder/ratchet"
coordinate: "law/folder/ratchet · 4/weave · ecd63134"
contentUuid: "77b09e38-ab7e-5418-b4e1-f0f0a7443c1d"
diamondUuid: "54d7c2d7-5be8-83d6-bdc8-c6d7eb7050a7"
uuid: "ecd63134-b33a-82f3-80df-bcdd08fbfd65"
horo: 4
typography:
  partition: law
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "6e4d1321-155a-8daa-990d-0d85f751a953"
  stages:
    - stage: path
      stageUuid: "a7312531-7e86-85f0-b310-b272ec9176e8"
    - stage: trinity
      stageUuid: "a15eda0b-a8fb-8e49-afdc-b340864858b2"
    - stage: boundary
      stageUuid: "84b04efd-9492-8aba-96c2-9df02ee215ef"
    - stage: links
      stageUuid: "192e355d-e0fd-8e44-938a-58ae68bdbb12"
    - stage: horo
      stageUuid: "7e57acd3-a727-86e0-a935-3c12ab748f74"
    - stage: seal
      stageUuid: "a34f2707-3c4d-85d6-98c4-847b4706caa9"
    - stage: uuid
      stageUuid: "8c6906c1-6d1c-869f-9106-fe72e87e6cd1"
version: 2
---
# ratchet

How a ceiling is computed, and why it can only fall.

`math` derives the ceiling from live violation counts —
`baseline(axis) = ceil(violations / (LANDAUER_BIT × horoRatio(digit, 10)))` — so a
ceiling is a **function of the corpus**, not a number someone typed. `compute`
recomputes the sealed snapshot from live scans and takes `min(prior, math)`, which is
the whole discipline: a ceiling never rises.

**The emitted artifact is output only.** `ratchet.generated.ts` is written by the
emitter and is never a hand-edited gate input — a ceiling raised by hand is a gate
disabled quietly. It deliberately stays a sibling of this folder rather than moving
into it: the emitter addresses it by a path assembled from string fragments, so
relocating it would leave the emitter recreating the old path and two divergent
ratchets ([[rules]]/hyphen refuses generated files for exactly this reason).

Composes: [[law]]/folder · [[horo]] · [[algebra]] · [[law]].
