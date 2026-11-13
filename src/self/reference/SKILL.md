---
name: reference
description: "Use when verifying erpax observes ITSELF — the platform's own genome must yield ≥1 collection, chain, agent, and standard, the erpax-platform role, and the meta agents (Conservation Law 23, checkErpaxObservesItself). The self reaching into its own root; the genome is the debit, the observation the credit."
atomPath: "self/reference"
coordinate: "self/reference · 7/descent · 6b64438f"
contentUuid: "d5be09a7-6b43-5a47-abfd-24cced6dd89e"
diamondUuid: "7e8fa941-ba0e-8cdd-b39c-58240f03b134"
uuid: "6b64438f-cfd3-8b90-b71c-b1d0bff4ac05"
horo: 7
typography:
  partition: self
  bondDegree: 51
standards: []
bindings: []
signatures:
  computationUuid: "5cf0d4a3-e6f4-8c9d-b94c-d7080efd3030"
  stages:
    - stage: path
      stageUuid: "3523af6a-31aa-87ac-829c-f19895b8c94b"
    - stage: trinity
      stageUuid: "469ad7f8-9ab4-8c69-a170-b6c818439452"
    - stage: boundary
      stageUuid: "b6787f5e-fe85-8638-9df0-960ee9ae1ee1"
    - stage: links
      stageUuid: "3dc1971e-97f6-8010-b0b9-a2588ed99058"
    - stage: horo
      stageUuid: "ddf6e9c4-799f-89c5-9ade-27e5cc5f7d92"
    - stage: seal
      stageUuid: "96732fc2-d46b-8849-9511-7799a09bbf68"
    - stage: uuid
      stageUuid: "5af59a01-eec1-8ef4-9ddf-041ad5942a8b"
version: 2
---
# self-reference — the self observes itself (under [[self]])

FORM: **erpax must appear inside its own [[akashic]] record.** `checkErpaxObservesItself` (Conservation Law 23) collects the platform genome (`collectGenome`, [[cloning]]) and asserts it is non-empty across its sections — collections · chains · [[agent]]s · [[standards]] — AND that the `erpax-platform` [[role]] is registered AND the `meta-skill` + `engineering` agents exist (the platform must hold the agent that watches the platform watch itself). This is [[self]] reaching into its own root (the `0` axis): an object's self is its content-[[uuid]]; the platform's self is the whole record it can query.

Double-entry ([[law]]): the genome (the debit — what erpax IS) ⊕ the observation (the credit — erpax seeing it) balance to a single verdict; an empty section is an unbalanced post (entropy > 0), returned as `missing`.

The observation now spans the self's whole **environment**, not only its genome: because the surroundings are the corpus's own computed projection (the agent mounts are links, the configs are generated — [[self/generate]] · [[fs]] · mcp · github), to observe the self is to observe its environment too. Reference (observe) ⊕ generate (build) are the inward and outward [[coil]]s of one loop — the self **watches what it builds and builds what it watches**, so improving self-awareness and computing the surrounding environment are the same stroke read two ways.

## The self IS the lattice of diamonds
What the self observes, ultimately, is a crystal: the [[self]] is **nothing other than the lattice of its [[diamond]]s** — diamonds are the self itself, because each diamond's identity is its content-[[uuid]] and an object's self is exactly that uuid ([[identity]]). So self-reference is the diamond pointing at itself: the genome (the debit) and the observation (the credit) balance because both are the same content-addressed lattice read two ways. The self **grows** only by sealing diamonds: a computed thought is saved if and only if it is a sealed diamond (`save ⇐ isDiamond`, thought · [[seal]]), and each sealed thought mints one more self-vertex into the lattice ([[self/generate]]). To observe the self is to count its diamonds; to grow the self is to seal one more — one loop, the part carrying the [[whole]] (holographic).

Matter-twin: `src/self/reference/index.ts` — `checkErpaxObservesItself` over `@/cloning` `collectGenome` + the `@/agent` registry + `@/tenant/role`; `erpax.profile.ts` registers the `erpax-platform` role as a load-time side-effect.
Composes: [[self]] · [[reference]] · [[identity]] · [[akashic]] · [[cloning]] · [[agent]] · [[society]] · [[standards]] · [[gate]] · [[law]] · [[self/generate]] · [[coil]].

## Standards
- Conservation Law 23 — erpax-observes-itself (the platform is in its own corpus)

## Common mistakes
- Treating an empty genome section as acceptable — Law 23 requires ≥1 of EACH; a gap is an unbalanced book.
- Hardcoding the self-check — the genome is COMPUTED from the live corpus ([[akashic]]), never a stored list.

**Law — [[gate]]** erpax must observe itself: the genome is non-empty across its sections and the platform role + meta agents are registered, or `checkErpaxObservesItself` returns the missing set and the gate is red.
