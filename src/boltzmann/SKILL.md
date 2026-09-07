---
name: boltzmann
description: "Use when reasoning about entropy as microstate-counting — Boltzmann's S = k·ln W: the entropy of a macrostate is the log of W, the number of microstates that look the same (W=1 ⇒ S=0). It is extensive (independent systems' entropies add, since ln turns product into sum) and its Gibbs form S = −k·Σ pᵢ ln pᵢ is maximised, equal to k·ln W, exactly when uniform. The microstate foundation under erpax's reciprocity-entropy; DRY collapse removes configurations so entropy falls."
atomPath: boltzmann
coordinate: "boltzmann · 2/share · c92f8d51"
contentUuid: "821281c6-32b8-5b0f-a4f1-f26ef5b00a8e"
diamondUuid: "2e56e17d-adbb-82ed-a3e2-660e86851a4d"
uuid: "c92f8d51-ed3d-8b42-93e3-ed3967cb8dc1"
horo: 2
typography:
  partition: boltzmann
  bondDegree: 32
standards:
  - "SI-2019 exact: k_B = 1.380649e-23 J/K"
bindings: []
signatures:
  computationUuid: "7ca12286-b6a5-8d28-8cc0-07d297694631"
  stages:
    - stage: path
      stageUuid: "06a804a4-3a98-8118-8517-82dc58d6d677"
    - stage: trinity
      stageUuid: "bb29771b-958c-8fdc-a2a0-df96d54bb8ca"
    - stage: boundary
      stageUuid: "7fc8180f-453b-8514-b463-f793c3241a1d"
    - stage: links
      stageUuid: "9be5f7d9-0225-8c45-8101-8ec2a518415f"
    - stage: horo
      stageUuid: "1dc6ce53-2f9c-88e4-92be-5b9ae8481b4a"
    - stage: seal
      stageUuid: "a4d02196-2866-8942-b8e2-e03eae7187f0"
    - stage: uuid
      stageUuid: "2e3dc5c9-98a8-84c7-83bf-79a0d24dfaa3"
version: 2
---
# boltzmann — entropy is counting (S = k·ln W)

**Boltzmann**: entropy is counting. **S = k·ln W** — the [[entropy]] of a macrostate is the Boltzmann constant times the log of W, the number of microstates that look the same. One arrangement (W=1) ⇒ S=0; the more ways to be, the more entropy. It is **extensive**: independent systems multiply their microstates (W₁·W₂), so their entropies **add** — ln is the only map that turns a product into a sum, which is why entropy is additive and the ledger's [[balance]] holds across independent books.

This is the microstate foundation under erpax's reciprocity [[entropy]] (the matrix-symmetry twin): disorder is the **log of the configuration count**, and DRY [[collapse]] removes configurations (W↓ ⇒ S↓ ⇒ [[gravity]]/mass↑). The Gibbs form **S = −k·Σ pᵢ·ln pᵢ** generalises it to a non-uniform distribution and is **maximised** — exactly k·ln W — when the distribution is uniform (the maximum-entropy principle, the bridge to [[temperature]] and [[equilibrium]]). Eponymous like [[rodin]]; the generic concept is microstate entropy.

Matter-twin: `src/boltzmann/index.ts` (`entropy` / `microstates` / `gibbs`, the constant `BOLTZMANN_K`).

Composes [[entropy]] · [[temperature]] · [[equilibrium]] · [[balance]] · [[collapse]] · [[gravity]] · [[harmony]].

**Law — [[law]]: entropy is the log of the microstate count, S = k·ln W — zero for one arrangement, additive across independent systems (ln turns product into sum), and maximal (Gibbs = k·ln W) when uniform; DRY collapse removes microstates, so order is fewer ways to be.**
