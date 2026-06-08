---
name: boltzmann
description: "Use when reasoning about entropy as microstate-counting — Boltzmann's S = k·ln W: the entropy of a macrostate is the log of W, the number of microstates that look the same (W=1 ⇒ S=0). It is extensive (independent systems' entropies add, since ln turns product into sum) and its Gibbs form S = −k·Σ pᵢ ln pᵢ is maximised, equal to k·ln W, exactly when uniform. The microstate foundation under erpax's reciprocity-entropy; DRY collapse removes configurations so entropy falls."
atomPath: boltzmann
coordinate: boltzmann · 4/weave · 91d2f972
contentUuid: "d880fec3-b601-5594-aac0-1594a34a9dc3"
diamondUuid: "e92d63f7-6b7b-86b6-9ab0-061aa3b49427"
uuid: "91d2f972-b0d0-8b3f-b5a8-54475e147f17"
horo: 4
bonds:
  in:
    - balance
    - collapse
    - entropy
    - equilibrium
    - gravity
    - harmony
    - law
    - rodin
    - shannon
    - temperature
  out:
    - balance
    - collapse
    - entropy
    - equilibrium
    - gravity
    - harmony
    - law
    - rodin
    - shannon
    - temperature
typography:
  partition: boltzmann
  bondDegree: 32
  neighbors: []
standards:
  - "S = k·ln W, inverse W = e^(S/k), Gibbs S = −k·Σ pᵢ ln pᵢ -- all computed"
  - "SI-2019 exact: k_B = 1.380649e-23 J/K"
bindings: []
neighbors:
  wikilink:
    - balance
    - collapse
    - entropy
    - equilibrium
    - gravity
    - harmony
    - law
    - rodin
    - temperature
  matrix:
    - balance
    - collapse
    - entropy
    - equilibrium
    - gravity
    - harmony
    - law
    - rodin
    - shannon
    - temperature
  backlinks:
    - balance
    - collapse
    - entropy
    - equilibrium
    - gravity
    - harmony
    - law
    - rodin
    - shannon
    - temperature
signatures:
  computationUuid: "620bdf86-4e45-8537-a0a4-d3f4d3899fdb"
  stages:
    - stage: path
      stageUuid: "06a804a4-3a98-8118-8517-82dc58d6d677"
    - stage: trinity
      stageUuid: "bb29771b-958c-8fdc-a2a0-df96d54bb8ca"
    - stage: boundary
      stageUuid: "3272ca48-f8dd-8410-bc88-cb2ca18ed1d6"
    - stage: links
      stageUuid: "9be5f7d9-0225-8c45-8101-8ec2a518415f"
    - stage: horo
      stageUuid: "9cb8feec-f8b1-8a87-b797-3c73c999404e"
    - stage: seal
      stageUuid: "ca3936d8-8d5d-8712-970c-c584afe419f9"
    - stage: uuid
      stageUuid: "65e06169-a2c6-892a-9f3c-4cfd78f49b68"
version: 2
---
# boltzmann — entropy is counting (S = k·ln W)

**Boltzmann**: entropy is counting. **S = k·ln W** — the [[entropy]] of a macrostate is the Boltzmann constant times the log of W, the number of microstates that look the same. One arrangement (W=1) ⇒ S=0; the more ways to be, the more entropy. It is **extensive**: independent systems multiply their microstates (W₁·W₂), so their entropies **add** — ln is the only map that turns a product into a sum, which is why entropy is additive and the ledger's [[balance]] holds across independent books.

This is the microstate foundation under erpax's reciprocity [[entropy]] (the matrix-symmetry twin): disorder is the **log of the configuration count**, and DRY [[collapse]] removes configurations (W↓ ⇒ S↓ ⇒ [[gravity]]/mass↑). The Gibbs form **S = −k·Σ pᵢ·ln pᵢ** generalises it to a non-uniform distribution and is **maximised** — exactly k·ln W — when the distribution is uniform (the maximum-entropy principle, the bridge to [[temperature]] and [[equilibrium]]). Eponymous like [[rodin]]; the generic concept is microstate entropy.

Matter-twin: `src/boltzmann/index.ts` (`entropy` / `microstates` / `gibbs`, the constant `BOLTZMANN_K`).

Composes [[entropy]] · [[temperature]] · [[equilibrium]] · [[balance]] · [[collapse]] · [[gravity]] · [[harmony]].

**Law — [[law]]: entropy is the log of the microstate count, S = k·ln W — zero for one arrangement, additive across independent systems (ln turns product into sum), and maximal (Gibbs = k·ln W) when uniform; DRY collapse removes microstates, so order is fewer ways to be.**
