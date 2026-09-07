---
name: shannon
description: "Use when reasoning about information entropy — Shannon's H = −Σ pᵢ·log₂(pᵢ) bits, the expected surprisal of a distribution: the average bits per symbol and the irreducible limit of lossless compression. Zero when one outcome is certain, maximal (log₂ n) when all n outcomes are equally likely. It is the information twin of thermodynamic entropy (same −Σp ln p, different constant) — the bits a message carries and the bits a tamper must reproduce."
atomPath: shannon
coordinate: "shannon · 8/crest · d08303ea"
contentUuid: "2b7bf2ab-c547-56aa-9057-d632dbd14433"
diamondUuid: "4436459b-fed8-86a1-8884-4b657b18a003"
uuid: "d08303ea-3c3c-8d91-809b-5eae7dfb97f1"
horo: 8
typography:
  partition: shannon
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "0fd6f9ab-124f-8d2b-8e01-e76cda411148"
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
      stageUuid: "71639fad-74d8-8c98-8967-8304ac1bfb1b"
    - stage: seal
      stageUuid: "22af84cd-08a3-8f75-bfa1-e70a361dc23e"
    - stage: uuid
      stageUuid: "3844c7e5-7b1d-81cf-bc88-7a44f4bbcb56"
version: 2
---
# shannon — information entropy (bits per symbol)

**Shannon entropy**: **H = −Σ pᵢ·log₂(pᵢ) bits** — the expected [[surprisal]] of a distribution (H = Σ pᵢ·I(pᵢ)), the average bits per symbol, and the irreducible limit of lossless compression (the source-coding theorem). It is **zero** when one outcome is certain and **maximal (log₂ n)** when all n outcomes are equally likely — the uniform distribution, the same maximum as [[boltzmann]]'s Gibbs entropy.

It is the information twin of thermodynamic [[entropy]] — literally the same −Σ p ln p form with a different constant (k vs 1/ln2). That is why erpax measures tamper-[[cost]] in **bits**: H is the information the content-[[uuid]] commits to, the bits a [[tamper]] must reproduce to forge undetected, the capacity of the channel a message rides. Low entropy (predictable) ⇒ high [[redundancy]] ⇒ strong tamper-detection; maximum entropy ⇒ incompressible, no structure to check against.

Matter-twin: `src/shannon/index.ts` (`entropy` / `maxEntropy`).

Composes [[surprisal]] · [[entropy]] · [[boltzmann]] · [[redundancy]] · [[cost]] · [[tamper]] · [[uuid]].

**Law — [[law]]: information entropy H = −Σ pᵢ·log₂ pᵢ is the expected surprisal — zero at certainty, maximal (log₂ n) at uniform — the bits a message carries and the bits a tamper must reproduce; it is the information twin of thermodynamic entropy (same −Σp ln p).**
