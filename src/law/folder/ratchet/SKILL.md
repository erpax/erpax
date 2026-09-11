---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: "law/folder/ratchet"
coordinate: "law/folder/ratchet · 2/share · a4f7b5d1"
contentUuid: "b1550650-11d0-5429-b42e-24c8cf6a3d8e"
diamondUuid: "da2f682a-f5b0-88f5-ace1-8379a84a8e9f"
uuid: "a4f7b5d1-9d78-8c2f-8e5b-4cae5350d2e2"
horo: 2
typography:
  partition: law
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c568bec1-ed98-887c-b7fb-69b67d383217"
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
      stageUuid: "fad29bf6-b95a-8657-96f7-215681e027cb"
    - stage: seal
      stageUuid: "a34f2707-3c4d-85d6-98c4-847b4706caa9"
    - stage: uuid
      stageUuid: "90fa46a1-46e4-8ca6-b990-45df22e5410d"
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
