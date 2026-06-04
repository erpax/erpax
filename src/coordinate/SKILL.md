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

Matter-twin: `[[uuid]]/matrix/collide.mjs` computes parent/prev/next per node, crosses them, and folds `bind` to the root. Composes [[identity]] · [[sequence]] · [[horo]] · [[coil]] · [[proof]] · [[merge]].
