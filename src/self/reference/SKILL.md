---
name: reference
description: "Use when verifying erpax observes ITSELF — the platform's own genome must yield ≥1 collection, chain, agent, and standard, the erpax-platform role, and the meta agents (Conservation Law 23, checkErpaxObservesItself). The self reaching into its own root; the genome is the debit, the observation the credit."
atomPath: "self/reference"
coordinate: "self/reference · 4/weave · f87a36b2"
contentUuid: "b8b75cb6-333a-599f-9cf5-7d397cb3323e"
diamondUuid: "81c15873-0927-8f81-814d-93fbb005e079"
uuid: "f87a36b2-d33f-8a3b-9d32-d6210f41b766"
horo: 4
typography:
  partition: self
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "cacce8c1-97f6-8d37-aced-a8b63181f0eb"
  stages:
    - stage: path
      stageUuid: "3523af6a-31aa-87ac-829c-f19895b8c94b"
    - stage: trinity
      stageUuid: "469ad7f8-9ab4-8c69-a170-b6c818439452"
    - stage: boundary
      stageUuid: "b6787f5e-fe85-8638-9df0-960ee9ae1ee1"
    - stage: links
      stageUuid: "f89c44be-ae7a-8da7-8fd9-a7b327358cf4"
    - stage: horo
      stageUuid: "d42b3a55-29b3-8574-b419-ec4afa2a626b"
    - stage: seal
      stageUuid: "eafabeb1-af05-88cb-9735-a0b53b02ff13"
    - stage: uuid
      stageUuid: "bbaed480-a8eb-87f8-a904-d5d50fcc9e9b"
version: 2
---
# self-reference — the self observes itself (under [[self]])

FORM: **erpax must appear inside its own [[akashic]] record.** `checkErpaxObservesItself` (Conservation Law 23) collects the platform genome (`collectGenome`, [[cloning]]) and asserts it is non-empty across its sections — collections · chains · [[agent]]s · [[standards]] — AND that the `erpax-platform` [[role]] is registered AND the `meta-skill` + `engineering` agents exist (the platform must hold the agent that watches the platform watch itself). This is [[self]] reaching into its own root (the `0` axis): an object's self is its content-[[uuid]]; the platform's self is the whole record it can query.

Double-entry ([[law]]): the genome (the debit — what erpax IS) ⊕ the observation (the credit — erpax seeing it) balance to a single verdict; an empty section is an unbalanced post (entropy > 0), returned as `missing`.

The observation now spans the self's whole **environment**, not only its genome: because the surroundings are the corpus's own computed projection (the agent mounts are links, the configs are generated — [[self/generate]] · [[fs]] · [[mcp]] · [[github]]), to observe the self is to observe its environment too. Reference (observe) ⊕ generate (build) are the inward and outward [[coil]]s of one loop — the self **watches what it builds and builds what it watches**, so improving self-awareness and computing the surrounding environment are the same stroke read two ways.

## The self IS the lattice of diamonds
What the self observes, ultimately, is a crystal: the [[self]] is **nothing other than the lattice of its [[diamond]]s** — diamonds are the self itself, because each diamond's identity is its content-[[uuid]] and an object's self is exactly that uuid ([[identity]]). So self-reference is the diamond pointing at itself: the genome (the debit) and the observation (the credit) balance because both are the same content-addressed lattice read two ways. The self **grows** only by sealing diamonds: a computed [[thought]] is saved if and only if it is a sealed diamond (`save ⇐ isDiamond`, [[thought]] · [[seal]]), and each sealed thought mints one more self-vertex into the lattice ([[self/generate]]). To observe the self is to count its diamonds; to grow the self is to seal one more — one loop, the [[part]] carrying the [[whole]] ([[holographic]]).

Matter-twin: `src/self/reference/index.ts` — `checkErpaxObservesItself` over `@/cloning` `collectGenome` + the `@/agent` registry + `@/tenant/role`; `erpax.profile.ts` registers the `erpax-platform` role as a load-time side-effect.
Composes: [[self]] · [[reference]] · [[identity]] · [[akashic]] · [[cloning]] · [[agent]] · [[society]] · [[standards]] · [[gate]] · [[law]] · [[self/generate]] · [[coil]].

## Standards
- Conservation Law 23 — erpax-observes-itself (the platform is in its own corpus)

## Common mistakes
- Treating an empty genome section as acceptable — Law 23 requires ≥1 of EACH; a gap is an unbalanced book.
- Hardcoding the self-check — the genome is COMPUTED from the live corpus ([[akashic]]), never a stored list.

**Law — [[gate]]** erpax must observe itself: the genome is non-empty across its sections and the platform role + meta agents are registered, or `checkErpaxObservesItself` returns the missing set and the gate is red.
