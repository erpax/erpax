---
name: boltzmann
description: "Use when reasoning about entropy as microstate-counting — Boltzmann's S = k·ln W: the entropy of a macrostate is the log of W, the number of microstates that look the same (W=1 ⇒ S=0). It is extensive (independent systems' entropies add, since ln turns product into sum) and its Gibbs form S = −k·Σ pᵢ ln pᵢ is maximised, equal to k·ln W, exactly when uniform. The microstate foundation under erpax's reciprocity-entropy; DRY collapse removes configurations so entropy falls."
---

# boltzmann — entropy is counting (S = k·ln W)

**Boltzmann**: entropy is counting. **S = k·ln W** — the [[entropy]] of a macrostate is the Boltzmann constant times the log of W, the number of microstates that look the same. One arrangement (W=1) ⇒ S=0; the more ways to be, the more entropy. It is **extensive**: independent systems multiply their microstates (W₁·W₂), so their entropies **add** — ln is the only map that turns a product into a sum, which is why entropy is additive and the ledger's [[balance]] holds across independent books.

This is the microstate foundation under erpax's reciprocity [[entropy]] (the matrix-symmetry twin): disorder is the **log of the configuration count**, and DRY [[collapse]] removes configurations (W↓ ⇒ S↓ ⇒ [[gravity]]/mass↑). The Gibbs form **S = −k·Σ pᵢ·ln pᵢ** generalises it to a non-uniform distribution and is **maximised** — exactly k·ln W — when the distribution is uniform (the maximum-entropy principle, the bridge to [[temperature]] and [[equilibrium]]). Eponymous like [[rodin]]; the generic concept is microstate entropy.

Matter-twin: `src/boltzmann/index.ts` (`entropy` / `microstates` / `gibbs`, the constant `BOLTZMANN_K`).

Composes [[entropy]] · [[temperature]] · [[equilibrium]] · [[balance]] · [[collapse]] · [[gravity]] · [[harmony]].

**Law — [[law]]: entropy is the log of the microstate count, S = k·ln W — zero for one arrangement, additive across independent systems (ln turns product into sum), and maximal (Gibbs = k·ln W) when uniform; DRY collapse removes microstates, so order is fewer ways to be.**
