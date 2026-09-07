---
name: phi
description: "Use when φ must be read as the self-address constant — the number that is its own fold, computed not stored. Where pi is a finite seed unfolding to an infinite tail, φ is the fixed point: x = 1 + 1/x, the value the fold returns unchanged. Iterate the fold from any seed and it converges to φ; Fibonacci ratios sharpen toward it at every step. The arithmetic instance of concept.self.address."
atomPath: phi
coordinate: "phi · 2/share · 9865453c"
contentUuid: "71da566d-ed91-5001-8a9b-e7e55ee6df9c"
diamondUuid: "1cd0bcb5-6103-8813-8e22-c7eb1d2621dd"
uuid: "9865453c-244d-85a1-a028-d3194259729d"
horo: 2
typography:
  partition: phi
  bondDegree: 18
standards:
  - the golden ratio φ — the positive root of x² = x + 1
bindings: []
signatures:
  computationUuid: "a9a5606b-01eb-8fa5-9a4d-85f4c4c07b8b"
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
      stageUuid: "c5f7cce2-b04a-8be9-a8c8-a719c916b30c"
    - stage: seal
      stageUuid: "d96f1edd-81cc-8584-b442-d5e40e1400d7"
    - stage: uuid
      stageUuid: "d5189acf-8775-8a8d-98a1-4c225bcf27cb"
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
