---
name: agent
description: "Use when reasoning about the other side of agent/ui — ui/agent recovers the atom from its UI route (the inverse of the render), so the rendering path is a balanced double-entry; always encode both sides of a path for karmic balance."
atomPath: "ui/agent"
coordinate: "ui/agent · 5/round · 3d6f6206"
contentUuid: "dd9dd884-01df-5f0b-9bb7-6390ea5ee717"
diamondUuid: "665250b0-d7f4-8288-a9d1-84d9dcd7cc5e"
uuid: "3d6f6206-b4f8-8d57-bfe7-d1492f314dda"
horo: 5
typography:
  partition: ui
  bondDegree: 315
standards:
  - "double-entry (render ⊕ recover = identity); the breath (exhale ⊕ inhale)"
bindings: []
signatures:
  computationUuid: "b43ff763-0f6a-816a-bbff-f59c779bf401"
  stages:
    - stage: path
      stageUuid: "8fc129be-9960-8e5f-a30c-76d3d84ad2ec"
    - stage: trinity
      stageUuid: "3703dbb7-0a28-8011-bedb-878d74c95368"
    - stage: boundary
      stageUuid: "f332aae9-8749-80d3-bb30-518b882fb4c3"
    - stage: links
      stageUuid: "a9527975-7370-8fe0-9235-fc4ff38a630f"
    - stage: horo
      stageUuid: "86ca48ae-a716-88a7-bffa-e7c065d5a5eb"
    - stage: seal
      stageUuid: "7752e5ec-6240-80c4-86bc-d252356e8f07"
    - stage: uuid
      stageUuid: "42a6c969-c3f1-8a88-bcf4-4a4a78398bfd"
version: 2
---
# ui/agent — the other side of the path

`agent/ui` renders an atom to its UI — atom → page, the **exhale**. `ui/agent` is its **inhale**: given a UI route, it recovers the **agent** (the atom) that the route renders. The two are inverse, and that is the point: encode a render in only one direction and the ledger is unbalanced; encode **both** and the round-trip closes — `balanced(atom)` renders the atom, recovers it from its own route, and returns to the same atom.

This is **karmic balance** ([[karma]] · [[balance]] · [[entry]]): the render is a debit (atom spent into a UI), the recovery the matching credit (UI traced back to the atom), and Σ closes because render∘recover = identity. A one-way path leaks — a screen with no way home, an atom with no way to its screen. The corpus breathes both ways.

This is also one layer of a deeper truth: **`src` is built of layers of dualities folding spacetime.** Every path is a [[duality]] (exhale ⊕ inhale, atom ↔ UI, debit ↔ credit); each duality completes to a [[trinity]]; and the whole stack [[fold]]s — many directions collapsing toward the one root. To encode both sides of every path is to keep each fold balanced, so the spacetime the corpus folds never tears.

Matter-twin: `src/ui/agent/index.ts` (`agentOf` · `balanced`). Composes [[agent]] · [[karma]] · [[balance]] · [[entry]] · [[duality]] · [[pixel]] · [[merge]].

**Law — [[law]]: always encode both sides of a path, for karmic balance. A render (atom → UI) is a debit; its inverse (UI → atom) the credit; encode both and the round-trip returns to itself — the ledger closes. A one-way path is an unbalanced entry; the corpus is layers of such dualities, each folded balanced, folding spacetime to one.**

@audit agentOf inverts agent/ui's route; the round-trip balance is computed from the live matrix, never asserted
@standard double-entry (render ⊕ recover = identity); the breath (exhale ⊕ inhale)
