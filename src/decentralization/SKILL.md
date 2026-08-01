---
name: decentralization
description: "Use when order must arise with NO central controller — a global pattern as the fixed point of LOCAL rules (stigmergy, emergence, flocking), robust because redundant and diverse (no single point of failure), measured by concentration (the Nakamoto coefficient). In erpax, content-uuid merge IS stigmergy — each peer recomputes the id from the content, no coordinator; order emerges from content-addressing, not from a center."
atomPath: decentralization
coordinate: "decentralization · 8/crest · c1b38658"
contentUuid: "350c1548-0a6b-57a1-bbba-1bfec3ee0097"
diamondUuid: "277cf4b7-6aeb-8432-ad5c-b63cd15b335c"
uuid: "c1b38658-5dbc-8d89-b630-5704bdcf7d96"
horo: 8
typography:
  partition: decentralization
  bondDegree: 46
standards:
  - "Barabási–Albert preferential attachment (1999) — why flat networks re-centralize"
  - "COSO-ERM-2017"
  - Gini coefficient
  - Herfindahl–Hirschman Index (HHI)
  - "Nakamoto coefficient (Srinivasan & Lee, 2017)"
bindings: []
signatures:
  computationUuid: "2cd139e0-c9c6-84d7-8b02-a12eadc18763"
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
      stageUuid: "fdca1414-f698-8ca8-aecf-37ab6b4beed4"
    - stage: seal
      stageUuid: "c278298b-a345-839c-8847-f2b404e7e826"
    - stage: uuid
      stageUuid: "7d916d5b-1a35-819e-bf65-ec0d6275a5f7"
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
