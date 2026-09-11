---
name: agent
description: "Use when reasoning about the other side of agent/ui — ui/agent recovers the atom from its UI route (the inverse of the render), so the rendering path is a balanced double-entry; always encode both sides of a path for karmic balance."
atomPath: "ui/agent"
coordinate: "ui/agent · 5/round · 491aba72"
contentUuid: "4b14c623-6cdb-5dee-b4ae-d9ec0111f29d"
diamondUuid: "63531f70-9b02-8f7d-98f3-74d944796695"
uuid: "491aba72-b5d7-8085-ae4b-a44ca012bbdb"
horo: 5
typography:
  partition: ui
  bondDegree: 393
standards:
  - "double-entry (render ⊕ recover = identity); the breath (exhale ⊕ inhale)"
bindings: []
signatures:
  computationUuid: "a1f6d55d-101a-866c-9bc7-69393f2969e1"
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
      stageUuid: "69c20079-a27a-8a27-a0e5-e64812fa2c39"
    - stage: seal
      stageUuid: "7752e5ec-6240-80c4-86bc-d252356e8f07"
    - stage: uuid
      stageUuid: "ff529826-1b4c-8b6b-b142-741d03d449d7"
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
