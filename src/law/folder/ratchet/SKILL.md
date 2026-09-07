---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: "law/folder/ratchet"
coordinate: "law/folder/ratchet · 8/crest · 1f2832c2"
contentUuid: "215b01a8-86c8-57a0-bda2-8e49bbf416c7"
diamondUuid: "ca228e65-6e0e-8f78-bdcf-36d0a5775d3a"
uuid: "1f2832c2-e4f1-8a65-a612-5e699eb8c4ff"
horo: 8
typography:
  partition: law
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "cc1bcb46-1bd6-8b83-984d-0c96b84c3d15"
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
      stageUuid: "7e45609a-d305-8b34-a1f3-23fa0b56be51"
    - stage: seal
      stageUuid: "a34f2707-3c4d-85d6-98c4-847b4706caa9"
    - stage: uuid
      stageUuid: "d40f062f-efb2-8e88-b953-72e0bc80ac7a"
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
