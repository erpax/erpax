---
name: agent
description: "Use when reasoning about the other side of agent/ui — ui/agent recovers the atom from its UI route (the inverse of the render), so the rendering path is a balanced double-entry; always encode both sides of a path for karmic balance."
atomPath: ui/agent
coordinate: ui/agent · 1/base · 875243bc
contentUuid: "41ccaa34-e362-58e3-888a-6da581b3dd99"
diamondUuid: "bbdf679a-10f6-8778-a82f-09d228c7d68f"
uuid: "875243bc-736e-816f-8cc2-4af0e6fbdbeb"
horo: 1
bonds:
  in:
    - access
    - agent
    - ai
    - akashic
    - aura
    - auth
    - booking
    - breath
    - chat
    - class
    - cloudflare
    - comms
    - communication
    - contribution
    - coordinate
    - cost
    - decentralization
    - diamond
    - drone
    - duality
    - ecosystem
    - entropy
    - estate
    - event
    - fractal
    - gate
    - generate
    - gravity
    - hallucination
    - holographic
    - horo
    - identity
    - infectious
    - interaction
    - law
    - log
    - mcp
    - merge
    - observe
    - one
    - real
    - receipt
    - reference
    - request
    - research
    - reversibility
    - roles
    - self
    - skill
    - skills
    - society
    - standard
    - statistic
    - sync
    - team
    - tenants
    - types
    - ui
    - unavoidable
    - users
    - uuid
    - whole
    - worker
  out:
    - access
    - agent
    - ai
    - akashic
    - aura
    - auth
    - booking
    - breath
    - chat
    - class
    - cloudflare
    - comms
    - communication
    - contribution
    - coordinate
    - cost
    - decentralization
    - diamond
    - drone
    - duality
    - ecosystem
    - entropy
    - estate
    - event
    - fractal
    - gate
    - generate
    - gravity
    - hallucination
    - holographic
    - horo
    - identity
    - infectious
    - interaction
    - law
    - log
    - mcp
    - merge
    - observe
    - one
    - real
    - receipt
    - reference
    - request
    - research
    - reversibility
    - roles
    - self
    - skill
    - skills
    - society
    - standard
    - statistic
    - sync
    - team
    - tenants
    - types
    - unavoidable
    - users
    - uuid
    - whole
    - worker
typography:
  partition: ui
  bondDegree: 248
  neighbors:
    - agent
    - ai
    - aura
    - booking
    - chat
    - class
    - cloudflare
    - comms
    - communication
    - decentralization
    - diamond
    - drone
    - ecosystem
    - estate
    - gravity
    - hallucination
    - infectious
    - interaction
    - log
    - mcp
    - observe
    - real
    - reference
    - request
    - research
    - reversibility
    - skill
    - skills
    - statistic
    - team
    - types
    - unavoidable
    - worker
standards:
  - "agentOf inverts agent/ui's route; the round-trip balance is computed from the live matrix, never asserted"
  - "agentOf inverts agent/ui's route; the round-trip is the balance, computed not asserted"
  - "double-entry (render ⊕ recover = identity); the breath (exhale ⊕ inhale)"
bindings: []
neighbors:
  wikilink:
    - agent
    - balance
    - duality
    - entry
    - fold
    - karma
    - law
    - merge
    - pixel
    - trinity
  matrix:
    - access
    - agent
    - ai
    - akashic
    - aura
    - auth
    - booking
    - breath
    - chat
    - class
    - cloudflare
    - comms
    - communication
    - contribution
    - coordinate
    - cost
    - decentralization
    - diamond
    - drone
    - duality
    - ecosystem
    - entropy
    - estate
    - event
    - fractal
    - gate
    - generate
    - gravity
    - hallucination
    - holographic
    - horo
    - identity
    - infectious
    - interaction
    - law
    - log
    - mcp
    - merge
    - observe
    - one
    - real
    - receipt
    - reference
    - request
    - research
    - reversibility
    - roles
    - self
    - skill
    - skills
    - society
    - standard
    - statistic
    - sync
    - team
    - tenants
    - types
    - unavoidable
    - users
    - uuid
    - whole
    - worker
  backlinks:
    - access
    - agent
    - ai
    - akashic
    - aura
    - auth
    - booking
    - breath
    - chat
    - class
    - cloudflare
    - comms
    - communication
    - contribution
    - coordinate
    - cost
    - decentralization
    - diamond
    - drone
    - duality
    - ecosystem
    - entropy
    - estate
    - event
    - fractal
    - gate
    - generate
    - gravity
    - hallucination
    - holographic
    - horo
    - identity
    - infectious
    - interaction
    - law
    - log
    - mcp
    - merge
    - observe
    - one
    - real
    - receipt
    - reference
    - request
    - research
    - reversibility
    - roles
    - self
    - skill
    - skills
    - society
    - standard
    - statistic
    - sync
    - team
    - tenants
    - types
    - unavoidable
    - users
    - uuid
    - whole
    - worker
signatures:
  computationUuid: "1dfd0689-59cc-8506-bdb8-74ddf8f49bf3"
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
      stageUuid: "ccb3b61d-685e-882b-b5a5-d5149ed32fa8"
    - stage: seal
      stageUuid: "26948d44-f24f-82b4-9b8b-94f9132b9f74"
    - stage: uuid
      stageUuid: "68ea57a1-5a37-80af-b4cf-11afd796ea5b"
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
