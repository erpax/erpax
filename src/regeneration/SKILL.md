---
name: regeneration
description: "Use when reasoning about erpax as a living, self-repairing system — the computed proof that it regrows from seed and heals its own wounds. The content-uuid is the genome: every observable (uuid, aura, coordinate, the README proof) is derived from content and never stored, so any derived artefact regenerates byte-identically from the surviving seed. A gap (dead link, untested atom) is a wound; the gate is the immune system; healing is monotone, so the loop converges to gap 0 — wholeness, zero entropy, max tamper-cost."
---

# regeneration — erpax regrows from seed and heals its own wounds

The biology of a content-addressed organism, computed (`tsx src/regeneration/index.ts`):

## 1. Regeneration — regrow from the genome
Every observable erpax shows — a uuid, an [[aura]] colour, a matrix [[coordinate]], the README proof — is *derived* from content, **never stored** ([[aura]]: "paid once, harvested always"). So the content-uuid (`toUuid`, RFC 9562 §5.8) is the **genome** and regeneration is a pure function: destroy any derived artefact and recompute it **byte-identically** from the surviving content. The seed determines the organism — one perturbed bit ⇒ a different genome ([[uuid]] · [[akashic]]). This is the README's "Recompute it", proven: nothing derived can be lost, because nothing derived is kept.

## 2. Self-healing — the gate is the immune system
A gap — a dead [[link]], an untested code-atom, an un-wired reference — is a **wound**: borrowed entropy a forger can exploit ([[aura]]). erpax **detects** it (the aura scan), **proposes** the suture ([[propose]] / weave), and the [[gate]] **refuses** any change that opens one. Healing is **monotone**: each suture strictly reduces the gap and never opens a new one, so the immune loop converges to **gap = 0** — wholeness, zero entropy, max [[tamper]]-cost.

Composes: [[aura]] · [[uuid]] · [[akashic]] · [[coordinate]] · [[link]] · [[propose]] · [[gate]] · [[tamper]] · [[organic]] · [[permaculture]] · [[proof]] · [[whole]] · [[one]].

**Law — [[law]]: a content-addressed organism cannot lose what it never stores (regenerates from seed) and cannot keep a wound the gate can detect (heals to gap 0) — so it is alive: it regrows ⊕ heals.**
