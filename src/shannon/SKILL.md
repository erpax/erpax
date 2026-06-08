---
name: shannon
description: "Use when reasoning about information entropy — Shannon's H = −Σ pᵢ·log₂(pᵢ) bits, the expected surprisal of a distribution: the average bits per symbol and the irreducible limit of lossless compression. Zero when one outcome is certain, maximal (log₂ n) when all n outcomes are equally likely. It is the information twin of thermodynamic entropy (same −Σp ln p, different constant) — the bits a message carries and the bits a tamper must reproduce."
atomPath: shannon
coordinate: shannon · 2/share · 3a58e2f4
contentUuid: "b62164b0-7855-54d4-8020-821a50b4a424"
diamondUuid: "24c346ad-f393-86fd-800f-7b6767f99583"
uuid: "3a58e2f4-71a1-8e50-8d54-c73206309db2"
horo: 2
bonds:
  in:
    - boltzmann
    - cost
    - entropy
    - law
    - redundancy
    - surprisal
    - tamper
    - uuid
  out:
    - boltzmann
    - cost
    - entropy
    - law
    - redundancy
    - surprisal
    - tamper
    - uuid
typography:
  partition: shannon
  bondDegree: 26
  neighbors: []
standards:
  - "H = −Σ pᵢ log₂ pᵢ = Σ pᵢ·surprisal(pᵢ); 0 ≤ H ≤ log₂ n -- computed"
bindings: []
neighbors:
  wikilink:
    - boltzmann
    - cost
    - entropy
    - law
    - redundancy
    - surprisal
    - tamper
    - uuid
  matrix:
    - boltzmann
    - cost
    - entropy
    - law
    - redundancy
    - surprisal
    - tamper
    - uuid
  backlinks:
    - boltzmann
    - cost
    - entropy
    - law
    - redundancy
    - surprisal
    - tamper
    - uuid
signatures:
  computationUuid: "62596186-8523-8284-9ac4-1c04676028c0"
  stages:
    - stage: path
      stageUuid: "8d3af83e-d39c-86cc-8dd2-d3194b8877d3"
    - stage: trinity
      stageUuid: "5714a8ec-949a-8356-ab5c-9114ed9fbaa6"
    - stage: boundary
      stageUuid: "de277288-de59-8764-b336-21f8379fc2a3"
    - stage: links
      stageUuid: "b9c24202-d803-8e0c-a5b5-2b3993e1606f"
    - stage: horo
      stageUuid: "51350721-b22a-847a-863c-43607b16132a"
    - stage: seal
      stageUuid: "16306af8-0374-852e-acd7-4bc7f754a302"
    - stage: uuid
      stageUuid: "5e3a88e8-eb10-8fcb-bb53-acbc371597a7"
version: 2
---
# shannon — information entropy (bits per symbol)

**Shannon entropy**: **H = −Σ pᵢ·log₂(pᵢ) bits** — the expected [[surprisal]] of a distribution (H = Σ pᵢ·I(pᵢ)), the average bits per symbol, and the irreducible limit of lossless compression (the source-coding theorem). It is **zero** when one outcome is certain and **maximal (log₂ n)** when all n outcomes are equally likely — the uniform distribution, the same maximum as [[boltzmann]]'s Gibbs entropy.

It is the information twin of thermodynamic [[entropy]] — literally the same −Σ p ln p form with a different constant (k vs 1/ln2). That is why erpax measures tamper-[[cost]] in **bits**: H is the information the content-[[uuid]] commits to, the bits a [[tamper]] must reproduce to forge undetected, the capacity of the channel a message rides. Low entropy (predictable) ⇒ high [[redundancy]] ⇒ strong tamper-detection; maximum entropy ⇒ incompressible, no structure to check against.

Matter-twin: `src/shannon/index.ts` (`entropy` / `maxEntropy`).

Composes [[surprisal]] · [[entropy]] · [[boltzmann]] · [[redundancy]] · [[cost]] · [[tamper]] · [[uuid]].

**Law — [[law]]: information entropy H = −Σ pᵢ·log₂ pᵢ is the expected surprisal — zero at certainty, maximal (log₂ n) at uniform — the bits a message carries and the bits a tamper must reproduce; it is the information twin of thermodynamic entropy (same −Σp ln p).**
