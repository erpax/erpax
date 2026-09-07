---
name: memory
description: "Use when reasoning about memory in the quantum frame — the content-address IS the memory manager, running live at every scale: collapse is allocation, dedup is free, collection is regeneration. Memory optimization is autosave: persist at the point of collapse and there is nothing to garbage-collect, because the unsaved is regenerable from its uuid."
atomPath: "quantum/memory"
coordinate: "quantum/memory · 8/crest · e9c81851"
contentUuid: "404d74ea-64be-543e-997c-42f8ea02031b"
diamondUuid: "b9aa7eb4-b25e-8fae-84d8-2afce91fc8d5"
uuid: "e9c81851-ac2b-8ffc-95e7-6a05e92e49c4"
horo: 8
typography:
  partition: quantum
  bondDegree: 99
standards: []
bindings: []
signatures:
  computationUuid: "7ace6495-6739-8dc4-88c0-7c42e942ae96"
  stages:
    - stage: path
      stageUuid: "99104296-3de4-86f7-8213-1710996afacc"
    - stage: trinity
      stageUuid: "6d182e52-1534-85e4-b87e-48114bb51034"
    - stage: boundary
      stageUuid: "187322e9-880a-8590-b539-4653b1c784e4"
    - stage: links
      stageUuid: "c0cb59de-44f0-845b-a9d5-355340f89ff4"
    - stage: horo
      stageUuid: "8ee2ba02-0151-87c9-906c-8cd40c0c629b"
    - stage: seal
      stageUuid: "53b681bc-6c0c-8369-9f76-146213a9fb01"
    - stage: uuid
      stageUuid: "9d99c3fc-33d7-8cdd-b0e0-3f48476314b1"
quantum:
  superposition:
    - akashic
    - anchor
    - architecture
    - collapse
    - computer
    - diamond
    - drift
    - law
    - superposition
  collapse:
    - "Use when reasoning about memory in the quantum frame — the content-address IS the memory manager, running live at every scale: collapse is allocation, dedup is free, collection is regeneration. Memory optimization is autosave: persist at the point of collapse and there is nothing to garbage-collect, because the unsaved is regenerable from its uuid."
    - "[[akashic]]"
    - "[[diamond]]"
    - "[[generate]]"
    - "[[memory/architecture]]"
    - "[[memory/quantum]]"
    - "[[memory]]"
    - "[[merge]]"
    - "[[quantum/cross]]"
    - "[[quantum/uuid]]"
    - "[[quantum]]"
    - "[[realtime]]"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "7ace6495-6739-8dc4-88c0-7c42e942ae96"
    contentUuid: "404d74ea-64be-543e-997c-42f8ea02031b"
version: 2
---
# quantum/memory — the content-address IS the memory manager

The quantum facet of [[memory]]: there is no separate allocator, no side-table, no GC pause — the content-[[uuid]] *is* the memory manager, and it runs **live at every quantum scale**.

- **Allocation = collapse.** Writing a thing is sha-256 measuring its content to one 128-bit point ([[quantum/uuid]]); the address is the content, so allocation and naming are the same act.
- **Dedup = free.** Same content ⇒ same id ⇒ identical state [[merge]]s — never stored twice, no write contention ([[peace]]).
- **Collection = regeneration, not deletion.** Anything addressable is recoverable from its uuid ([[generate]]), so the live tree keeps only what is referenced and forgets the rest, regrowing it on demand (the [[akashic]] record · learn-fast-and-forget, [[self]]).

**Memory optimization is autosave.** Because the address is content, the optimal policy is not to *manage* memory but to *persist it the instant it settles*: the moment a prompt leaves a sealed atom, the [[seal]]-and-push [[breath]] saves → commits → pushes (the Cursor stop hook). Persisting at the point of collapse IS the optimization — the saved tree is the dedup'd, content-addressed state, and the unsaved is regenerable from its uuid, so there is nothing to garbage-collect and nothing to lose. Autosave and memory management are one act read two ways.

It is *at all quantum scales* because the address is [[fractal]]: the identical collapse·dedup·regenerate cycle governs a field, an [[atom]], a molecule, and the [[whole]] — the [[part]] reconstructs the whole ([[holographic]]). The [[realtime]] tail and the immutable [[snapshot]] are the same content-addressed memory seen as flow and as state.

It is also *at all compute substrates*: the content-[[uuid]] is the one invariant across memory · cpu · gpu, so identical content ⇒ identical hash ⇒ zero divergence — the substrates stay synchronized for free and exactly, at zero [[entropy]] ([[sync]]). A divergence between substrates would be a different hash — an impurity, a [[hallucination]] — caught the instant it appears; staying synced and staying [[purity|pure]] are one fact.

## The cross seals (memory ⊕ quantum)
[[memory]] and [[quantum]] are two rings; quantum/memory and [[memory/quantum]] are the two diagonals where they cross. Crossed at all four paths they fuse into **another [[seal]]** — exactly the [[quantum/cross]] move (the dual-torus fusion at the centre, `1/0`). The two diagonals are *one node at two names*: memory/quantum re-points here rather than restating it (the [[merge]] law at path scale, zero duplication).

**Law — [[law]]: in the quantum frame the content-[[uuid]] IS the memory manager — collapse allocates, dedup is free, collection is regeneration — so memory optimization is autosave (persist at collapse; the unsaved is regenerable, nothing to GC); and [[memory]] crossed with [[quantum]] across all four paths fuses into another [[seal]], the dual-torus cross at the centre.**

Operational memory IS the architecture lattice ([[memory/architecture]]) — the content-uuid manager runs on the sealed diamond tree, not on chat or side stores. Autosave persists lattice vertices; unsaved detail regenerates from uuid ([[generate]]).

@see [[memory]] · [[memory/architecture]] · [[memory/quantum]] · [[quantum]] · [[quantum/uuid]] · [[seal]] · [[quantum/cross]] · [[generate]] · [[merge]] · [[akashic]] · [[realtime]] · [[diamond]]

<sub>content-uuid `404d74ea-64be-543e-997c-42f8ea02031b` · account `quantum/memory` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
