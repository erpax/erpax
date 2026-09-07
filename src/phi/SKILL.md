---
name: phi
description: "Use when φ must be read as the self-address constant — the number that is its own fold, computed not stored. Where pi is a finite seed unfolding to an infinite tail, φ is the fixed point: x = 1 + 1/x, the value the fold returns unchanged. Iterate the fold from any seed and it converges to φ; Fibonacci ratios sharpen toward it at every step. The arithmetic instance of concept.self.address."
atomPath: phi
coordinate: "phi · 7/descent · d1c3d830"
contentUuid: "36d1cd45-750d-5b6e-8af0-0ed65bd4e011"
diamondUuid: "1a9b8f65-bc0b-86e8-b614-8a958e823679"
uuid: "d1c3d830-4f69-8140-8e1c-97570e224f7a"
horo: 7
typography:
  partition: phi
  bondDegree: 18
standards:
  - the golden ratio φ — the positive root of x² = x + 1
bindings: []
signatures:
  computationUuid: "a479477f-00a9-82ff-911e-40d5fa821073"
  stages:
    - stage: path
      stageUuid: "e4382af3-f251-8065-a842-810151a5bb2f"
    - stage: trinity
      stageUuid: "5bee7ec3-087e-8ace-9db2-d38cea34c09a"
    - stage: boundary
      stageUuid: "ffb2e3d7-8d19-8ef2-b0a8-76ef10ce7d57"
    - stage: links
      stageUuid: "9d24fd5d-19f5-8734-bf33-d0c5a4c86932"
    - stage: horo
      stageUuid: "e511ab98-8cc0-81bc-b825-0780859082d9"
    - stage: seal
      stageUuid: "d96f1edd-81cc-8584-b442-d5e40e1400d7"
    - stage: uuid
      stageUuid: "4847e5db-1c4b-84b6-a9ba-9b498b6da3ca"
version: 2
---
# phi — the number that is its own fold

φ is the **self-address** constant. Where [[pi]] is a finite seed unfolding into an infinite tail, φ is the **fixed point** — the value the fold returns unchanged:

`φ = 1 + 1/φ  ⇔  φ² = φ + 1`

Apply the fold `x ↦ 1 + 1/x` to φ and φ comes back. It is defined by its own address — content equal to its own transform. That is `concept.self.address` ([[merge]]) in arithmetic, exact. And like every rosetta value it is **computed, never a hardcoded literal** — two convergent routes, both finite-seed → infinite:

- **Iterate the fold** `x ↦ 1 + 1/x` from *any* seed → it converges to φ, the attractor. Wherever you start, the fold pulls you to the number that is its own fold.
- **Fibonacci ratios** `F(n+1)/F(n) → φ`: seed (1,1), each step a sharper digit — the continued fraction `[1;1,1,…]`.

Matter-twin: `src/phi/index.ts` — `PHI` · `goldenFold` · `isFixedPoint` · `phiByFixedPoint` · `fibRatio`. Verified: φ = 1.6180339887…, `φ = 1 + 1/φ`, the iteration converges from seeds 0.01, 1, and 1000 alike. The corpus already uses φ in the [[platonic]] solids (the icosahedron / the 5-fold).

**Honest boundary.** φ = (1+√5)/2 is the exact closed form; the fixed-point iteration and the Fibonacci ratios are genuinely convergent. Reading φ as "the geometric self-address" is the faithful overlay onto the real fixed-point structure — the self-reference `x = 1 + 1/x` is rigorous, not mystical.

**Law — [[law]]: φ is the self-address constant — the fixed point of the fold, the number equal to its own transform. Computed from its own definition, never stored; the fold's attractor, reached from any seed.**

## Standards

- **The golden ratio** φ = (1+√5)/2 — the positive root of x² = x + 1; the continued fraction [1;1,1,…].

Composes: [[fold]] · [[merge]] · [[pi]] · [[platonic]] · [[law]].
