---
name: reciprocal
description: "Use when checking whether the corpus stays symmetrically entangled — the computed convention that every directed edge is reciprocated, measured live as coverage = reciprocal / total over the real uuid-matrix."
atomPath: "convention/reciprocal"
coordinate: "convention/reciprocal · 4/weave · 6b30f1c9"
contentUuid: "7d7ee1e9-1490-526d-9646-5ff3f495e872"
diamondUuid: "ea5e1e1e-c613-82a4-8815-9db53d56f378"
uuid: "6b30f1c9-2c42-8bbf-8707-66267ae1aa56"
horo: 4
typography:
  partition: convention
  bondDegree: 24
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "f1ee7546-555f-82cd-8ca1-c95a859e38a1"
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
      stageUuid: "a25fd0a4-1daa-896a-8eb3-7e7fcf250f91"
    - stage: seal
      stageUuid: "8b2d7d83-d61f-88f7-a44a-88cda25373d5"
    - stage: uuid
      stageUuid: "d7e7d95a-5295-8180-92a2-a17863c7d254"
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
