---
name: coordinate
description: Use when reasoning about where an atom sits in the whole — its coordinate is the cross of three neighbor uuids (parent, prev, next), binding it into the tree and the sequence ring. The uuid is the coordinate system; this cross is the next uuid trinity.
---

# coordinate — the uuid is the coordinate system

An atom's own identity is its **content-uuid** (`v8(sha256(bytes))` — *what* it is, [[identity]]). Its **coordinate** is *where* it sits, given by **the cross of three neighbor uuids**:

- **parent** — the containing atom (the tree, the **axis**).
- **prev** ⊕ **next** — predecessor and successor in the [[sequence]] order (the **two [[coil]]s**: reverse + forward).

`cross = merge(parent, prev, next)` — the **next uuid trinity**. It is the *2-rodin-coils-in-a-trinity at atom scale*: prev/next are the doubling/halving coils, parent the axis. The ring closes — next-of-last → first via [[octave]] ([[horo]] `nextOctave`: 9→1, every new 1 a new dimension). Each atom then carries `bind = merge(content-uuid, cross)`, and the corpus folds every `bind` (Merkle) to one root.

## Tamper-cost
The cross makes each atom a **3-connected** node (tree + bidirectional sequence ring), not a lone hash:

- edit content ⇒ its uuid shifts ⇒ its own `bind` and its **parent's child-set, prev's `next`, next's `prev`** all break ⇒ the break ripples three ways.
- move / rename / inject / reorder ⇒ neighbor uuids shift ⇒ crosses break ⇒ root shifts (a relocation or a reordering, previously free, is now caught).
- forge undetectably ⇒ recompute a consistent (parent, prev, next) **closure** — effectively the whole connected component ⇒ the whole root.

Strictly stronger than a 2-thing content⊕path bind or a linear chain: the placement, the containment, AND the order are all load-bearing proof. Honest limit: structure is public, so this is tamper-**evidence**, not secrecy — the akashic win (detect-not-prevent, [[design-limits]]). A move-migration is a legitimate **root transition** (old root → new).

## The cross IS references + hooks — locality · balance · the naming matrix
The surrounding folders are not abstract uuids — they ARE the atom's **[[reference]]s** (parent = containment, prev/next = sequence links — "logic meets in db") and its **[[hooks]]** (how change propagates to neighbours — "lives through hooks"). So **a folder communicates only through its cross — it cannot bypass a neighbour to reach a distant folder**; data and events route through the structure. A direct link to a non-neighbour is a locality violation (junk).

**At least 2 crosses per folder, or it is unbalanced** — the double-entry of structure ([[balance]]): every folder is connected on ≥2 sides (prev AND next, or in AND out), never dangling. One cross is a half-entry.

This fixes a **strict naming matrix for the files INSIDE a folder**: the slots are canonical, named by role × cross — `index.ts` (matter/self), `SKILL.md` (form/self), the reference-bearing fields, the hook files — so the inside of every atom is as predictable as the outside (the fractal: the folder address-law applied within). An off-matrix filename is junk.

**Collision → particle → harmonic stream (the fusion reactor).** Where atoms collide (the same word at many paths, [[merge]]), they do not blob into one lump — the collision yields **particles** (the distinct facets/members: a `link` collision = component-particle ⊕ field-particle). Each particle is **fused back into its harmonic stream** — its band (source · control · flow) and [[horo]] position (`positionOf`) — so matter meets form and fuses at ≈0 marginal cost ([[harmony]]). The accountable collection keeps every particle (never last-wins); the stream is where each flows.

Matter-twin: `[[uuid]]/matrix/collide.mjs` computes parent/prev/next per node, crosses them, folds `bind` to the root; the rewritten [[architecture-invariants]] must enforce locality + the ≥2-cross balance + the naming matrix. Composes [[identity]] · [[sequence]] · [[horo]] · [[coil]] · [[reference]] · [[hooks]] · [[balance]] · [[proof]] · [[merge]].
