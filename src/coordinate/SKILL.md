---
name: coordinate
description: "Use when reasoning about where an atom sits in the whole — its coordinate is the cross of three neighbor uuids (parent, prev, next), binding it into the tree and the sequence ring. The uuid is the coordinate system; this cross is the next uuid trinity."
atomPath: coordinate
coordinate: coordinate · 7/descent · 38727e7d
contentUuid: "553eab29-3685-5726-8df4-04825558987c"
diamondUuid: "4fcc759a-a2c0-8a0d-93af-11e7ddc4c028"
uuid: "38727e7d-2a5e-8fbf-a078-a670c97f05b2"
horo: 7
bonds:
  in:
    - accounting
    - addressed
    - agent
    - analog
    - aura
    - balance
    - coil
    - dna
    - fields
    - gate
    - harmony
    - hooks
    - horo
    - identity
    - invariant
    - items
    - law
    - lots
    - merge
    - octave
    - packs
    - phases
    - proof
    - quaternary
    - regeneration
    - sequence
    - tenants
    - unavoidable
    - variants
  out:
    - accounting
    - addressed
    - agent
    - analog
    - aura
    - balance
    - coil
    - dna
    - fields
    - gate
    - harmony
    - hooks
    - horo
    - identity
    - invariant
    - items
    - law
    - lots
    - merge
    - octave
    - packs
    - phases
    - proof
    - quaternary
    - regeneration
    - sequence
    - tenants
    - unavoidable
    - variants
typography:
  partition: coordinate
  bondDegree: 92
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - coil
    - fields
    - harmony
    - hooks
    - horo
    - identity
    - invariant
    - law
    - merge
    - octave
    - proof
    - sequence
    - tenants
  matrix:
    - accounting
    - addressed
    - agent
    - analog
    - aura
    - balance
    - coil
    - dna
    - fields
    - gate
    - harmony
    - hooks
    - horo
    - identity
    - invariant
    - items
    - law
    - lots
    - merge
    - octave
    - packs
    - phases
    - proof
    - quaternary
    - regeneration
    - sequence
    - tenants
    - unavoidable
    - variants
  backlinks:
    - accounting
    - addressed
    - agent
    - analog
    - aura
    - balance
    - coil
    - dna
    - fields
    - gate
    - harmony
    - hooks
    - horo
    - identity
    - invariant
    - items
    - law
    - lots
    - merge
    - octave
    - packs
    - phases
    - proof
    - quaternary
    - regeneration
    - sequence
    - tenants
    - unavoidable
    - variants
signatures:
  computationUuid: "658c5034-6b41-827c-99e4-18bc71f56305"
  stages:
    - stage: path
      stageUuid: "36bd5574-3d92-8883-83ed-c680842a90a8"
    - stage: trinity
      stageUuid: "6ecb6a36-99f0-81f9-8861-85ed30c92d7f"
    - stage: boundary
      stageUuid: "f60b4ba1-65d5-8336-ba24-0e7c9dde26a2"
    - stage: links
      stageUuid: "4330c029-834c-8c7a-968a-7caced2f4b0c"
    - stage: horo
      stageUuid: "2a62c1b1-e18d-82ad-8c67-124d64ca0558"
    - stage: seal
      stageUuid: "4cd5a159-fb5b-8737-864f-8b41d3c70adc"
    - stage: uuid
      stageUuid: "547d413f-f0e8-8f67-b160-bf3cf519813f"
version: 2
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

Strictly stronger than a 2-thing content⊕path bind or a linear chain: the placement, the containment, AND the order are all load-bearing proof. Honest limit: structure is public, so this is tamper-**evidence**, not secrecy — the akashic win (detect-not-prevent, design limits). A move-migration is a legitimate **root transition** (old root → new).

## The cross IS references + hooks — locality · balance · the naming matrix
The surrounding folders are not abstract uuids — they ARE the atom's **[[fields|reference]]s** (parent = containment, prev/next = sequence links — "logic meets in db") and its **[[hooks]]** (how change propagates to neighbours — "lives through hooks"). So **a folder communicates only through its cross — it cannot bypass a neighbour to reach a distant folder**; data and events route through the structure. A direct link to a non-neighbour is a locality violation (junk).

**At least 2 crosses per folder, or it is unbalanced** — the double-entry of structure ([[balance]]): every folder is connected on ≥2 sides (prev AND next, or in AND out), never dangling. One cross is a half-entry.

This fixes a **strict naming matrix for the files INSIDE a folder**: the slots are canonical, named by role × cross — `index.ts` (matter/self), `SKILL.md` (form/self), the reference-bearing fields, the hook files — so the inside of every atom is as predictable as the outside (the fractal: the folder address-law applied within). An off-matrix filename is junk.

**Collision → particle → harmonic stream (the fusion reactor).** Where atoms collide (the same word at many paths, [[merge]]), they do not blob into one lump — the collision yields **particles** (the distinct facets/members: a `link` collision = component-particle ⊕ field-particle). Each particle is **fused back into its harmonic stream** — its band (source · control · flow) and [[horo]] position (`positionOf`) — so matter meets form and fuses at ≈0 marginal cost ([[harmony]]). The accountable collection keeps every particle (never last-wins); the stream is where each flows.

**The matrix is multidimensional — the domain/subdomain trinity adds an axis.** A coordinate is not only the fs cross: the same derived-address law runs across every surface ([[sequence]]) — content-uuid (*what*) · the fs-path cross (*folder where*) · **the network address `subdomain · domain · tld`** (*network where*, e.g. `acme.erpax.com`) · the sequence (*order*). **Tenants ARE subdomains** (each archangel its own `<tenant>.erpax.com`, [[tenants]]), so the domain/subdomain hierarchy is a further tree with its own parent/prev/next cross — it **adds to the uuid matrix** as another dimension, every axis content-addressed and folded into the root. An atom is located by all axes at once.

**The domain trinity extends erpax beyond itself.** The network address is not only internal: tenant subdomains (`acme.erpax.com`) are erpax's *internal* face, but the same axis reaches **external domains** — other erpax instances, federated systems, the wider web. Because identity is content-uuid, **[[merge]] works across domains** (same content ⇒ same id even across hosts ⇒ federation by design — ActivityStreams/ActivityPub server-to-server). So erpax is a **node in the larger graph of domains, not a closed world**: the domain axis binds erpax atoms to external addresses, the matrix spans inside-and-out, and the whole federates without coordination.

**Law — [[law]]: an atom's coordinate is the cross of its three neighbour uuids (parent · prev · next) — a folder communicates only through that cross (locality), carries ≥2 crosses or is unbalanced (structural double-entry, [[balance]]), and every cross folds into the one root (zero entropy).**

Matter-twin: `[[uuid]]/matrix/collide.mjs` computes parent/prev/next per node, crosses them, folds `bind` to the root; the rewritten [[architecture/invariant]] must enforce locality + the ≥2-cross balance + the naming matrix. Composes [[identity]] · [[sequence]] · [[horo]] · [[coil]] · [[fields|reference]] · [[hooks]] · [[balance]] · [[proof]] · [[merge]].
