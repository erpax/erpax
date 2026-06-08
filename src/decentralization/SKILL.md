---
name: decentralization
description: "Use when order must arise with NO central controller — a global pattern as the fixed point of LOCAL rules (stigmergy, emergence, flocking), robust because redundant and diverse (no single point of failure), measured by concentration (the Nakamoto coefficient). In erpax, content-uuid merge IS stigmergy — each peer recomputes the id from the content, no coordinator; order emerges from content-addressing, not from a center."
atomPath: decentralization
coordinate: decentralization · 1/base · 4f73df07
contentUuid: "d4649320-ba70-5f4e-acd8-df63041a3e10"
diamondUuid: "66ba2c6d-6552-8505-bf27-e61deb7cedc2"
uuid: "4f73df07-f422-8bd2-a899-786b80160423"
horo: 1
bonds:
  in:
    - agent
    - diversity
    - ecosystem
    - federation
    - law
    - merge
    - mycelium
    - network
    - self
    - society
    - sustainability
    - uuid
    - whole
  out:
    - agent
    - diversity
    - ecosystem
    - federation
    - law
    - merge
    - mycelium
    - network
    - self
    - society
    - sustainability
    - uuid
    - whole
typography:
  partition: decentralization
  bondDegree: 44
  neighbors:
    - agent
standards:
  - "Barabási–Albert preferential attachment (1999) — why flat networks re-centralize"
  - "COSO-ERM-2017"
  - "EU-2017/1132"
  - "EU-2017/828"
  - Gini coefficient
  - Herfindahl–Hirschman Index (HHI)
  - "Nakamoto coefficient (Srinivasan & Lee, 2017)"
  - "computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - agent
    - diversity
    - ecosystem
    - federation
    - law
    - merge
    - network
    - self
    - society
    - sustainability
    - uuid
    - whole
  matrix:
    - agent
    - diversity
    - ecosystem
    - federation
    - law
    - merge
    - mycelium
    - network
    - self
    - society
    - sustainability
    - uuid
    - whole
  backlinks:
    - agent
    - diversity
    - ecosystem
    - federation
    - law
    - merge
    - mycelium
    - network
    - self
    - society
    - sustainability
    - uuid
    - whole
signatures:
  computationUuid: "3209d6bc-5b60-8c55-a63d-ef7f0297a129"
  stages:
    - stage: path
      stageUuid: "3d860fac-0654-8c74-a381-3ab1b7ae96b4"
    - stage: trinity
      stageUuid: "bd80c5aa-4bcd-8cf7-a11f-ee063a8b9186"
    - stage: boundary
      stageUuid: "28dac7af-f179-8b1a-990e-38bf298e2809"
    - stage: links
      stageUuid: "a54d2060-c84a-8be4-a815-bc11f1c578d7"
    - stage: horo
      stageUuid: "1001d6c0-5d26-8053-93c9-9cc05a1f93f8"
    - stage: seal
      stageUuid: "0e72778f-0f41-879a-b0cf-c18452903b65"
    - stage: uuid
      stageUuid: "f4a07084-077e-8acd-919a-1869a2780600"
version: 2
---
# decentralization — global order from local rules, no controller

**Decentralization** is order that has **no center** — the global pattern is a **fixed point of local rules**, not a command broadcast from a hub. Nature is overwhelmingly built this way. **Stigmergy** (Grassé): ants and termites coordinate by leaving traces in the environment — each acts on the local state, no foreman holds the plan, yet a nest emerges. **Self-organization**: a flock needs only three local rules (Reynolds' boids — separate, align, cohere) for global murmuration; slime mould solves mazes; mycelium and the immune system route around damage; evolution itself designs with no designer.

**Why it is robust — and what it costs.** Because the function lives in *every* node, there is **no single point of failure**: knock out a node and the work reroutes. Redundancy plus [[diversity]] buys **resilience** (Holling) — the more independent ways to perform a function, the more shocks the whole absorbs. But decentralization is not free: it pays **coordination overhead** (every node must re-derive what a center could have declared once), and it **re-centralizes** under preferential attachment — links accrue to the already-linked (Barabási–Albert), so an unguarded "flat" network drifts to power-law hubs. The honest measure is concentration: the **Nakamoto coefficient** — the minimum number of nodes whose capture would control the whole. High coefficient, truly decentralized; falling coefficient, a center forming in disguise.

erpax is decentralized by **content-addressing**, and the [[merge]] law IS stigmergy: a peer never asks a coordinator whether a row is valid — it recomputes the content-[[uuid]] from the row itself (the local trace) and either it matches or the [[federation]] envelope is rejected. Same content ⇒ same id, anywhere, with no central registry; the [[society]] advances by local gate-checks, not a broadcast. Order emerges from the content, so there is nothing in the middle to capture — the Nakamoto coefficient of a content-addressed store is every honest replica at once.

**Law — [[law]]: decentralization is global order as the fixed point of LOCAL rules with no controller; erpax achieves it by content-addressing — the [[merge]] law IS stigmergy: each peer recomputes the content-[[uuid]] from the row itself, so same content ⇒ same id with nothing in the middle to capture.**

## Standards
- **Grassé, stigmergy** (1959) — coordination through traces left in a shared environment; the root model of coordinator-free order.
- **Reynolds, boids** (1987) — flocking as three local rules; emergence as a fixed point.
- **Holling, resilience** (1973) — *Resilience and Stability of Ecological Systems*; redundancy and diversity absorb shocks.
- **Nakamoto coefficient** (Srinivasan & Lee, 2017) — minimum entities to control a decentralized system; the honest concentration metric.
- **Barabási–Albert** (1999) — preferential attachment ⇒ scale-free hubs; why flat networks re-centralize unless guarded.

Composes [[merge]] · [[federation]] · [[society]] · [[network]] · [[diversity]] · [[agent]] · [[uuid]] · [[self]] · [[sustainability]] · [[ecosystem]] · [[whole]] · [[law]].

## Matter-twin

The computed math in `src/decentralization/index.ts` is the structural twin of this atom:

- `normalizeShares` — maps raw resource counts to the probability distribution p_i / Σs that all other functions consume.
- `herfindahl` — Σ p_i² (HHI); the concentration scalar; 1/n at perfect equality, 1 at monopoly. Dual: `1 − herfindahl` = Simpson diversity (the diversity atom asserts this complement).
- `effectiveNodes` — 1 / HHI; the effective number of independent participants; the continuous analogue of counting equal-weight nodes.
- `nakamoto` — the integer threshold: sort descending, accumulate until > 0.5; the minimum captures required for control. The honest single number for "how decentralized is this?"
- `gini` — sorted-ascending formula; 0 at perfect equality, approaching 1 at monopoly; the inequality axis orthogonal to concentration.
- `singlePointOfFailure` — boolean red-line: true iff any single participant holds ≥ 50%, equivalent to `nakamoto === 1`.
