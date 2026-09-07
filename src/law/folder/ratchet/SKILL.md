---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: "law/folder/ratchet"
coordinate: "law/folder/ratchet · 4/weave · a017fcbd"
contentUuid: "b8bedfe7-d856-5851-812c-014dc1fd6685"
diamondUuid: "cdfd89b1-7ed0-8ce6-9c24-8fa79f00f3bb"
uuid: "a017fcbd-701f-8197-bf35-3e25e8e9b4e5"
horo: 4
typography:
  partition: law
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "25bc5c16-7252-8a9d-a315-51f4ed89eb38"
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
      stageUuid: "20f8a736-c95d-87c3-9d2b-ee72936b056a"
    - stage: seal
      stageUuid: "a34f2707-3c4d-85d6-98c4-847b4706caa9"
    - stage: uuid
      stageUuid: "f87c65f2-6fec-8957-8304-60a1eb0250a1"
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
