---
name: shannon
description: "Use when reasoning about information entropy — Shannon's H = −Σ pᵢ·log₂(pᵢ) bits, the expected surprisal of a distribution: the average bits per symbol and the irreducible limit of lossless compression. Zero when one outcome is certain, maximal (log₂ n) when all n outcomes are equally likely. It is the information twin of thermodynamic entropy (same −Σp ln p, different constant) — the bits a message carries and the bits a tamper must reproduce."
atomPath: shannon
coordinate: "shannon · 4/weave · 00992ca0"
contentUuid: "31604d37-82be-5c30-9753-edccea53d705"
diamondUuid: "ea56028d-c663-8738-9615-cd7d3cb66882"
uuid: "00992ca0-45fc-8c5b-8ae9-e1265d8fee97"
horo: 4
typography:
  partition: shannon
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "3804abc6-4cfc-8f9d-8be1-42fbba39593c"
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
      stageUuid: "6ed516c2-f709-8b9a-9477-fb25abbe8870"
    - stage: seal
      stageUuid: "22af84cd-08a3-8f75-bfa1-e70a361dc23e"
    - stage: uuid
      stageUuid: "dc21b3e6-c191-895d-aca1-a328cce36bbe"
version: 2
---
# shannon — information entropy (bits per symbol)

**Shannon entropy**: **H = −Σ pᵢ·log₂(pᵢ) bits** — the expected [[surprisal]] of a distribution (H = Σ pᵢ·I(pᵢ)), the average bits per symbol, and the irreducible limit of lossless compression (the source-coding theorem). It is **zero** when one outcome is certain and **maximal (log₂ n)** when all n outcomes are equally likely — the uniform distribution, the same maximum as [[boltzmann]]'s Gibbs entropy.

It is the information twin of thermodynamic [[entropy]] — literally the same −Σ p ln p form with a different constant (k vs 1/ln2). That is why erpax measures tamper-[[cost]] in **bits**: H is the information the content-[[uuid]] commits to, the bits a [[tamper]] must reproduce to forge undetected, the capacity of the channel a message rides. Low entropy (predictable) ⇒ high [[redundancy]] ⇒ strong tamper-detection; maximum entropy ⇒ incompressible, no structure to check against.

Matter-twin: `src/shannon/index.ts` (`entropy` / `maxEntropy`).

Composes [[surprisal]] · [[entropy]] · [[boltzmann]] · [[redundancy]] · [[cost]] · [[tamper]] · [[uuid]].

**Law — [[law]]: information entropy H = −Σ pᵢ·log₂ pᵢ is the expected surprisal — zero at certainty, maximal (log₂ n) at uniform — the bits a message carries and the bits a tamper must reproduce; it is the information twin of thermodynamic entropy (same −Σp ln p).**
