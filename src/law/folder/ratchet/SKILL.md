---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: "law/folder/ratchet"
coordinate: "law/folder/ratchet · 8/crest · 6ef16b15"
contentUuid: "ff4a54d4-657a-5843-83f1-e4f549d5bdfb"
diamondUuid: "3e5d668f-2d54-82be-9e47-cf55f05967ae"
uuid: "6ef16b15-43f1-835b-8b64-ab34f845c087"
horo: 8
typography:
  partition: law
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "bd2c19ae-c9ec-87e6-9222-065bdedd5485"
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
      stageUuid: "cc51fd10-7a04-841d-a3a9-e69d9ecbe402"
    - stage: seal
      stageUuid: "a34f2707-3c4d-85d6-98c4-847b4706caa9"
    - stage: uuid
      stageUuid: "177a01c4-81fa-81c2-a600-41d47dff944e"
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
