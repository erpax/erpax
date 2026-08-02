---
name: parent
description: "Use when an atom needs the ancestor of a path without inheriting the seal barrel — parentAtomPath and ancestorPaths, in a module with ZERO imports. Three lines of string arithmetic that used to live in @/seal, whose barrel is inside the corpus's import component, so path/ paid for the whole subtree to get one function. @/seal re-exports both, so no existing reader changed."
atomPath: "seal/parent"
---

# seal/parent — three lines that should cost nothing to import

`parentAtomPath` is string arithmetic: find the last `/`, slice. It lived in `@/seal`, whose barrel sits inside the corpus's import component — so [[path]], which takes this one function, inherited the component with it.

Same shape as [[agent]]/sync/depth: **a function that depends on nothing must be reachable without depending on anything.** `@/seal` re-exports it, so nothing that already read it changed.

`ancestorPaths` is the chain a seal propagates along — nearest first, terminating at the root, built from the same primitive rather than re-deriving the slice.

**Honest boundary, and it is the interesting part.** This cut did **not** shrink the component. `path` and `seal` are both still inside it, connected by other routes — the edge was real but not load-bearing. That is the finding: the residual 58-file component is **dense, not a chain**, so single-edge cuts stop working here. The two cuts that did work (249 → 57) removed edges into modules that were otherwise leaves; this one removed an edge between two members of the same dense core, which changes nothing about reachability.

The atom is kept because it is strictly better regardless — a pure function reachable without a barrel — but it should not be read as a cycle fix.

**Law — [[law]]: a pure function of its arguments belongs where importing it costs nothing — and a cut only splits a component when one side is otherwise a leaf.**

Composes: [[seal]] · [[path]] · [[agent]]/sync/depth · [[rules]]/cycle · [[law]].
