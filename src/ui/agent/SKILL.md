---
name: agent
description: "Use when reasoning about the other side of agent/ui — ui/agent recovers the atom from its UI route (the inverse of the render), so the rendering path is a balanced double-entry; always encode both sides of a path for karmic balance."
atomPath: "ui/agent"
coordinate: "ui/agent · 7/descent · 59a62786"
contentUuid: "377084f4-26f8-5f72-862a-b456d0b75748"
diamondUuid: "727cad0a-b186-8c7b-bb1f-9703dc794a99"
uuid: "59a62786-8554-821b-905a-dee130f3bf2b"
horo: 7
typography:
  partition: ui
  bondDegree: 393
standards:
  - "double-entry (render ⊕ recover = identity); the breath (exhale ⊕ inhale)"
bindings: []
signatures:
  computationUuid: "6839eb9c-3042-89c4-bb43-1ac07ea5bfa6"
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
      stageUuid: "d4f1997a-7522-83a9-bfa3-e225c706765d"
    - stage: seal
      stageUuid: "7752e5ec-6240-80c4-86bc-d252356e8f07"
    - stage: uuid
      stageUuid: "3c5b9885-18bf-8546-9106-4f914430ae21"
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
