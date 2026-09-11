---
name: correspondence
description: "Use when asked whether string theory or quantum computation bears on the Millennium Problems, or whether any of it strengthens cryptography. A physical duality can PREDICT a statement that mathematics then proves — mirror symmetry is the genuine instance — but a correspondence never proves the problem it corresponds to, so every row carries the precise gap that remains beside what is really established. bearsOnSecurity is false in every row, declared per row rather than waved away: hardness rests on module-LWE, factoring, discrete logs and hash preimage resistance, and no result here constrains any of them."
atomPath: "millennium/correspondence"
coordinate: "millennium/correspondence · 8/crest · 18a68773"
contentUuid: "785a71f9-e255-5f89-affd-aeba44a669b0"
diamondUuid: "63e07f6e-9e00-8096-8a1f-d5253eede061"
uuid: "18a68773-b1f4-85eb-b266-4e06699facce"
horo: 8
typography:
  partition: millennium
  bondDegree: 18
standards:
  - "ISO 80000-2 — mathematical signs and symbols"
bindings: []
signatures:
  computationUuid: "b999b475-f730-89af-a7ba-d4bf60f04eaa"
  stages:
    - stage: path
      stageUuid: "6b842b5c-c0d8-8f7a-8349-13a15db100ff"
    - stage: trinity
      stageUuid: "b6f6bd57-b551-81e8-91ba-e1e527fedb18"
    - stage: boundary
      stageUuid: "22a18d38-9876-867c-b4b8-ff6236f0df1d"
    - stage: links
      stageUuid: "942c7bc3-56bc-8790-953c-2ae30a7c2f6b"
    - stage: horo
      stageUuid: "1c6d8e5b-19d8-830c-b468-efd749c2bb40"
    - stage: seal
      stageUuid: "9f13dd7b-9fcc-8525-88fc-568d02bd66c5"
    - stage: uuid
      stageUuid: "979fa206-3b2e-83c1-8b99-6b1cd576eed6"
version: 2
---
# millennium/correspondence — physics predicts; mathematics proves

[[millennium]] names the seven problems and refuses to solve them. What it did not carry is the question people actually arrive with: **string theory is said to bear on these — does it?**

It does, in exactly one direction. A physical duality can *predict* a mathematical statement, and mathematicians can then prove that statement by their own means. **Mirror symmetry is the real instance**: a string-theoretic argument produced the enumerative invariants of the quintic threefold (Candelas–de la Ossa–Green–Parkes 1991), and those predictions were later **proved** (Givental 1996; Lian–Liu–Yau 1997).

And the sting is in the same row: **it still does not settle the Hodge Conjecture.** The strongest documented case of physics-produces-theorem leaves its own problem open — which is why every row states `notProof` beside `establishes`. A correspondence quoted without its gap reads as a solution.

| problem | programme | what remains |
| --- | --- | --- |
| Yang–Mills mass gap | gauge/gravity duality · lattice gauge theory | a rigorous construction on ℝ⁴ satisfying the OS axioms. The duality is itself a conjecture; lattice results are numerical at finite spacing and volume |
| Navier–Stokes | fluid/gravity correspondence | a different equation — relativistic, conformal — inside an unproven duality. No a-priori bound follows |
| Riemann | Hilbert–Pólya · Montgomery–Dyson · Connes | no operator with the zeros as its spectrum has been constructed. Matching statistics do not locate a zero |
| Hodge | **mirror symmetry** — physics that produced a proved theorem | it concerns Gromov–Witten invariants and variations of Hodge structure, not the rationality of Hodge classes |
| P vs NP | quantum computation | BQP is not known to contain NP. A device settles no complexity-class separation |

`Birch–Swinnerton-Dyer` and `Poincaré` have no correspondence worth stating, and the two lists **partition the seven** — no problem is silently unanswered.

## The security question, answered rather than hedged

`bearsOnSecurity` is `false` in **every** row, declared per row so the claim is refuted individually. Cryptographic hardness rests on module-LWE and module-SIS (what ML-KEM and ML-DSA reduce to), integer factorisation, discrete logarithms, and hash preimage resistance. **No result in any of these programmes constrains any of those problems.**

The seductive near-miss is worth naming: the lattice mathematics that *does* touch this material — the hexagonal ring in [[rodin]]/phase, optimal sphere packing in dimensions 8 and 24 (Viazovska 2016; Cohn–Kumar–Miller–Radchenko–Viazovska 2017) — are **proven theorems about packing density**. Density is not hardness. They are different questions, and conflating them is how a real theorem gets recruited into a false security claim.

So `assertCorrespondenceClaim` refuses *"use string theory to increase security"* by naming what hardness rests on, instead of producing a plausible sentence about it — the same move [[anchor]]/claims makes for the post-quantum surfaces.

**Honest boundary.** This registers **claimed correspondences and their gaps**, never the full literature — a programme absent here is unregistered, not disproved. It judges the *inference*, not the physics: every row's `establishes` is stated as strongly as the evidence allows, and only the leap from correspondence to proof is refused.

**Law — [[law]]: a correspondence predicts; it does not prove. A physical duality may generate a mathematical statement, and only a mathematical proof settles it — and none of them bears on cryptographic hardness.**

Composes: [[millennium]] · [[anchor]]/claims · [[rodin]]/phase · [[convention]]/discern · [[rules]]/refutable · [[law]].
