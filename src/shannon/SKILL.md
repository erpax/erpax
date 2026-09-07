---
name: shannon
description: "Use when reasoning about information entropy — Shannon's H = −Σ pᵢ·log₂(pᵢ) bits, the expected surprisal of a distribution: the average bits per symbol and the irreducible limit of lossless compression. Zero when one outcome is certain, maximal (log₂ n) when all n outcomes are equally likely. It is the information twin of thermodynamic entropy (same −Σp ln p, different constant) — the bits a message carries and the bits a tamper must reproduce."
atomPath: shannon
coordinate: "shannon · 8/crest · 8689a103"
contentUuid: "5c25f2e1-ab5f-5a08-a836-e12183681df4"
diamondUuid: "330811b9-2aea-86aa-9eb8-55a96621be07"
uuid: "8689a103-2a31-8517-9484-148fae86d12f"
horo: 8
typography:
  partition: shannon
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "d6510029-3701-84c5-9047-2d5a29dc4f32"
  stages:
    - stage: path
      stageUuid: "8d3af83e-d39c-86cc-8dd2-d3194b8877d3"
    - stage: trinity
      stageUuid: "5714a8ec-949a-8356-ab5c-9114ed9fbaa6"
    - stage: boundary
      stageUuid: "a60fbc48-ec24-8b50-bd4a-023e32893591"
    - stage: links
      stageUuid: "b9c24202-d803-8e0c-a5b5-2b3993e1606f"
    - stage: horo
      stageUuid: "7ed30241-0566-8e2d-89ae-50b79990fdee"
    - stage: seal
      stageUuid: "22af84cd-08a3-8f75-bfa1-e70a361dc23e"
    - stage: uuid
      stageUuid: "3c1827d0-e7d6-8ece-8692-509a34825570"
version: 2
---
# shannon — information entropy (bits per symbol)

**Shannon entropy**: **H = −Σ pᵢ·log₂(pᵢ) bits** — the expected [[surprisal]] of a distribution (H = Σ pᵢ·I(pᵢ)), the average bits per symbol, and the irreducible limit of lossless compression (the source-coding theorem). It is **zero** when one outcome is certain and **maximal (log₂ n)** when all n outcomes are equally likely — the uniform distribution, the same maximum as [[boltzmann]]'s Gibbs entropy.

It is the information twin of thermodynamic [[entropy]] — literally the same −Σ p ln p form with a different constant (k vs 1/ln2). That is why erpax measures tamper-[[cost]] in **bits**: H is the information the content-[[uuid]] commits to, the bits a [[tamper]] must reproduce to forge undetected, the capacity of the channel a message rides. Low entropy (predictable) ⇒ high [[redundancy]] ⇒ strong tamper-detection; maximum entropy ⇒ incompressible, no structure to check against.

Matter-twin: `src/shannon/index.ts` (`entropy` / `maxEntropy`).

Composes [[surprisal]] · [[entropy]] · [[boltzmann]] · [[redundancy]] · [[cost]] · [[tamper]] · [[uuid]].

**Law — [[law]]: information entropy H = −Σ pᵢ·log₂ pᵢ is the expected surprisal — zero at certainty, maximal (log₂ n) at uniform — the bits a message carries and the bits a tamper must reproduce; it is the information twin of thermodynamic entropy (same −Σp ln p).**
