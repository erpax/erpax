---
name: reference
description: "Use when verifying erpax observes ITSELF — the platform's own genome must yield ≥1 collection, chain, agent, and standard, the erpax-platform role, and the meta agents (Conservation Law 23, checkErpaxObservesItself). The self reaching into its own root; the genome is the debit, the observation the credit."
atomPath: "self/reference"
coordinate: "self/reference · 1/base · 30d13f7e"
contentUuid: "19ee194d-c9c1-5578-8958-d59ad2268ed4"
diamondUuid: "999dc20d-e801-8bff-a86e-ce3808980de7"
uuid: "30d13f7e-8220-84fe-8bbe-fcbb693613ca"
horo: 1
typography:
  partition: self
  bondDegree: 81
standards: []
bindings: []
signatures:
  computationUuid: "51253e6e-2e23-82e5-9f1f-8a0927bfc3f4"
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
      stageUuid: "26a8f5ee-6186-87d7-8325-1c820e42eeb5"
    - stage: seal
      stageUuid: "eafabeb1-af05-88cb-9735-a0b53b02ff13"
    - stage: uuid
      stageUuid: "5fa93490-00d7-85b8-8552-5d908d255c2c"
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
