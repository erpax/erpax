---
name: phi
description: "Use when φ must be read as the self-address constant — the number that is its own fold, computed not stored. Where pi is a finite seed unfolding to an infinite tail, φ is the fixed point: x = 1 + 1/x, the value the fold returns unchanged. Iterate the fold from any seed and it converges to φ; Fibonacci ratios sharpen toward it at every step. The arithmetic instance of concept.self.address."
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
