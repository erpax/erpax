---
name: reciprocal
description: "Use when checking whether the corpus stays symmetrically entangled — the computed convention that every directed edge is reciprocated, measured live as coverage = reciprocal / total over the real uuid-matrix."
atomPath: "convention/reciprocal"
coordinate: "convention/reciprocal · 7/descent · bbf7f5fe"
contentUuid: "454d69fe-0403-513c-a604-f3e41dfa6acc"
diamondUuid: "06ae1705-dc95-8a4a-8738-aad8c197e5ed"
uuid: "bbf7f5fe-3c3e-873e-b671-72199e893cb1"
horo: 7
typography:
  partition: convention
  bondDegree: 24
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "a4aa49bb-7856-8ff2-aa39-b74b3c15fe24"
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
      stageUuid: "d8bf3fe4-2b64-8fbd-8672-73bf5535a1a4"
    - stage: seal
      stageUuid: "8b2d7d83-d61f-88f7-a44a-88cda25373d5"
    - stage: uuid
      stageUuid: "e2270a24-d49a-8492-af32-9a7cfeda92a4"
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
