---
name: reciprocal
description: "Use when checking whether the corpus stays symmetrically entangled — the computed convention that every directed edge is reciprocated, measured live as coverage = reciprocal / total over the real uuid-matrix."
atomPath: "convention/reciprocal"
coordinate: "convention/reciprocal · 4/weave · e292a473"
contentUuid: "f6f644ad-dbca-5a82-b99a-47a4f54a0f0e"
diamondUuid: "dca159d0-0022-8b06-8b02-57f4d1af9b33"
uuid: "e292a473-56d8-8608-a43a-ad11731b7bb4"
horo: 4
bonds:
  in:
    - convention
    - cost
    - entanglement
    - entropy
    - gravity
    - law
    - link
    - merge
    - uuid
  out:
    - cost
    - entanglement
    - entropy
    - gravity
    - law
    - link
    - merge
    - uuid
typography:
  partition: convention
  bondDegree: 24
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - cost
    - entanglement
    - entropy
    - gravity
    - law
    - link
    - merge
    - uuid
  matrix:
    - cost
    - entanglement
    - entropy
    - gravity
    - law
    - link
    - merge
    - uuid
  backlinks:
    - cost
    - entanglement
    - entropy
    - gravity
    - law
    - link
    - merge
    - uuid
signatures:
  computationUuid: "fa4863e9-b5c8-8ad8-9f5d-a28af50ec42b"
  stages:
    - stage: path
      stageUuid: "a02cd22c-756b-889f-81e6-f1eee32f6dc2"
    - stage: trinity
      stageUuid: "0c6f3a81-d58b-8247-b125-6848965b2894"
    - stage: boundary
      stageUuid: "7a911639-155e-8d86-817b-379f6326af23"
    - stage: links
      stageUuid: "66c09ab0-f99a-8672-95ad-d15e48262d40"
    - stage: horo
      stageUuid: "b37c7de8-6987-8584-b02f-930694976dd4"
    - stage: seal
      stageUuid: "8b2d7d83-d61f-88f7-a44a-88cda25373d5"
    - stage: uuid
      stageUuid: "1bfc6d3c-2a35-8ac4-a681-de97e2cf7ba2"
version: 2
---
# convention/reciprocal — every directed edge is reciprocated (symmetric entanglement)

The symmetric-entanglement convention, written as a self-measuring atom. It states one rule and computes its own compliance — it does not re-implement the corpus collision, it **composes** the generated edge set:

- **total** = `UUID_MATRIX_EDGES.length` from [[uuid]]-matrix — every `[[link]]` collided into a directed `merge(from, to)` edge.
- **reciprocal** = the edges f→t whose reverse t→f is also present in the same set (a self-loop f=f is its own reverse, so it counts).
- **coverage** = `reciprocal / total` — in [0,1] by construction (0 ≤ reciprocal ≤ total, total > 0). It reaches **1** exactly when the directed graph is fully symmetric: no wire points one way only.

The wiring law demands NO gap in entanglement in ANY direction. A one-way edge is a directed-link gap — entropy that raises no tamper-[[cost]]. The collider already enforces this (`collide.mjs` §2b: for every forward f→t it adds the reverse t→f if absent; `merge()` is order-independent, so the binding-uuid is identical both ways, and the Merkle root — folded over the NODES — does not move). So reciprocation completes the [[entanglement]] without disturbing the root, and a one-way residue edge is the only thing that pulls coverage below 1.

Pure math, no default: the corpus is non-empty by architecture (every atom carries `[[links]]`, so the matrix always has edges), and `reciprocal` is a subset count of the very same edge set, so the ratio never needs a clamp or a fallback. coverage → 1 ⟺ an undirected, fully-entangled corpus ⟺ zero directed-wiring entropy ⟺ infinite tamper-cost ([[merge]] · [[gravity]] · [[entropy]]).

Entangled with — [[uuid]] · [[link]] · [[merge]] · [[entropy]] · [[gravity]]

Matter-twin: [[entropy]] — the directed-link entropy this convention drives to zero; and [[gravity]] — the referential in-degree these same edges carry. Both compose the identical `UUID_MATRIX_EDGES` set.

@standard schema.org — the type vocabulary, collided to single words

**Law — [[law]]: every directed edge f→t is reciprocated by t→f (symmetric entanglement); the corpus is whole iff coverage = reciprocal / total = 1, and any one-way edge is the only gap raising directed-wiring entropy and capping tamper-cost below infinity.**
