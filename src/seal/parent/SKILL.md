---
name: parent
description: "Use when an atom needs the ancestor of a path without inheriting the seal barrel — parentAtomPath and ancestorPaths, in a module with ZERO imports. Three lines of string arithmetic that used to live in @/seal, whose barrel is inside the corpus's import component, so path/ paid for the whole subtree to get one function. @/seal re-exports both, so no existing reader changed."
atomPath: "seal/parent"
coordinate: "seal/parent · 2/share · 6ff7ccc4"
contentUuid: "15ac68c4-a911-50b3-a70b-5d8fda1ab0d7"
diamondUuid: "430d2d81-7dcb-8b90-a266-870b73a7292e"
uuid: "6ff7ccc4-38d6-86a0-9782-8d0593cc1f84"
horo: 2
typography:
  partition: seal
  bondDegree: 37
standards: []
bindings: []
signatures:
  computationUuid: "8d154706-e9d2-88a9-914b-3ae20c023628"
  stages:
    - stage: path
      stageUuid: "2d122007-38d3-883e-99f0-69f3f6c58a76"
    - stage: trinity
      stageUuid: "7a13afeb-ec02-8b5d-b1be-0364de8c8690"
    - stage: boundary
      stageUuid: "14567ddf-b335-8e37-a179-a209e4e1a701"
    - stage: links
      stageUuid: "3249b595-dc2b-8eac-a16d-157fa8263b45"
    - stage: horo
      stageUuid: "3a80592e-bfcb-878f-8baf-0d6109c1742d"
    - stage: seal
      stageUuid: "8c8ac4a5-bc77-848d-b5ed-ea2c5b8b0c05"
    - stage: uuid
      stageUuid: "19209e47-a12a-8deb-86cd-e70381ff45ee"
version: 2
---
# seal/parent — three lines that should cost nothing to import

`parentAtomPath` is string arithmetic: find the last `/`, slice. It lived in `@/seal`, whose barrel sits inside the corpus's import component — so [[path]], which takes this one function, inherited the component with it.

Same shape as [[agent]]/sync/depth: **a function that depends on nothing must be reachable without depending on anything.** `@/seal` re-exports it, so nothing that already read it changed.

`ancestorPaths` is the chain a seal propagates along — nearest first, terminating at the root, built from the same primitive rather than re-deriving the slice.

**Honest boundary, and it is the interesting part.** This cut did **not** shrink the component. `path` and `seal` are both still inside it, connected by other routes — the edge was real but not load-bearing. That is the finding: the residual 58-file component is **dense, not a chain**, so single-edge cuts stop working here. The two cuts that did work (249 → 57) removed edges into modules that were otherwise leaves; this one removed an edge between two members of the same dense core, which changes nothing about reachability.

The atom is kept because it is strictly better regardless — a pure function reachable without a barrel — but it should not be read as a cycle fix.

**Law — [[law]]: a pure function of its arguments belongs where importing it costs nothing — and a cut only splits a component when one side is otherwise a leaf.**

Composes: [[seal]] · [[path]] · [[agent]]/sync/depth · [[rules]]/cycle · [[law]].
