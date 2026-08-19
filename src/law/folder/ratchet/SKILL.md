---
name: ratchet
description: "Use when computing or lowering a gate ceiling — the Landauer×horo ceiling math and the DOWN-only recompute that emits the sealed snapshot. The emitted artifact is OUTPUT ONLY and is never a hand-edited gate input."
atomPath: law/folder/ratchet
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
