---
name: prime
description: "Use when reasoning about prime — Use for the multiplicative basis — isPrime (deterministic Miller–Rabin, exact not probabilistic) and factor (the decode fold: an integer back to its prime generators). The counterpart to pi's positional basis. Run: tsx src/prime/index.ts <n>"
atomPath: prime
coordinate: "prime · 4/weave · 8e8c8323"
contentUuid: "6fc2454b-7974-5197-9b4f-168dcbfad4b3"
diamondUuid: "569c45d2-71d0-8511-9862-90fd98d38acc"
uuid: "8e8c8323-449a-8553-9294-2dd17faf5a60"
horo: 4
typography:
  partition: prime
  bondDegree: 18
standards:
  - Fundamental Theorem of Arithmetic — unique prime factorisation (Euclid; Gauss)
  - "Shor 1994 — integer factorisation by quantum period-finding (proven, not claimed)"
  - "W3C-PROV-O"
bindings: []
signatures:
  computationUuid: "d1c85d22-b27f-8441-adf7-4d74becb55ec"
  stages:
    - stage: path
      stageUuid: "9af4b6d4-df67-8dac-9eff-58560cb8ac79"
    - stage: trinity
      stageUuid: "856eb86f-8be5-8f3e-af67-5c3faa2bc74c"
    - stage: boundary
      stageUuid: "4fd6f549-dbd5-8be0-b7f0-0f0e7546bf86"
    - stage: links
      stageUuid: "42e96511-b6f8-8743-a582-a5ef9386c319"
    - stage: horo
      stageUuid: "85d9128e-c6a8-8d46-8bc1-07345b0d677a"
    - stage: seal
      stageUuid: "25b11aca-fe49-8f9d-99e7-2bfca22f3424"
    - stage: uuid
      stageUuid: "6bdc6135-768b-8fc0-abed-454a54c46243"
version: 2
---
# prime — the multiplicative basis, and factoring is the decode fold

[[pi]] is the **positional** basis: a finite seed and a formula (BBP) generate an infinite tail, each digit a projection read at its index. Primes are the **multiplicative** basis, and they are the mirror — every integer is a *unique* product of primes (the fundamental theorem of arithmetic), so `factor(n)` is the **decode** direction of the fold: an element taken back to its generators. That is exactly **⟨5⟩**, the void generator this session proved is ⟨2⟩ inverted ([[horo]]/inverseOrbit): encode multiplies up, decode factors down. `factor` then multiply = identity — proven in `test.ts` across `360 = 2³·3²·5`, Mersenne primes, and more.

Both halves are computable **theorems, and only theorems**: `isPrime` is deterministic Miller–Rabin with a witness set proven complete for the JS integer range (not a probabilistic guess); `factor` is exact trial division.

## The real quantum connection — proven, and bounded

*"Computing pi and primes folds the quantum"* has an exact, honest reading, and it is **Shor 1994**: a quantum computer factors integers by **period-finding** — the multiplicative group mod n has period structure, and that structure is what a quantum period-finder decodes in polynomial time. This is why the corpus's content-address is post-quantum safe where RSA/ECC are not: **a hash has no period, no abelian hidden subgroup, so Shor has nothing to grip** ([[tamper]] reasons this for the digest). Primes fold the quantum in *that* sense — their group structure is the thing the algorithm reads.

**What is refused here, on this corpus's own law.** An *unclaimed* theorem in quantum physics, a proof of the Riemann Hypothesis, any claim with no proof beside it — those are not theorems, they are decorations, and [[rules]]/refutable names them as exactly where a lie lives (unfalsifiable, so it reads as true forever). This atom proves what is provable — primality, factorisation, Shor's *published* result — and stops there. The corpus already ruled on this class: *arithmetic real, metaphysics not; named as convention, never overclaimed.*

**Honest boundary.** The arithmetic is rigorous; reading factoring **as** the fold's decode leg is the faithful overlay onto that structure (as [[pi]] names the 3-as-seed overlay), never number mysticism. `factor` is trial division — correct, not fast. A hard factorisation is precisely what classical computing cannot do quickly and Shor can, which is the whole point: the difficulty is the security, and the quantum speedup is the threat the tamper-cost math already prices.

**Law — [[law]]: the primes are the multiplicative basis; factoring is decode. Encode ∘ decode is identity, and that is a theorem — everything past it (RH, an unclaimed physics result) is refused until it has a proof beside it.**

## Standards

- **Fundamental Theorem of Arithmetic** — unique prime factorisation.
- **Shor 1994** — integer factorisation by quantum period-finding (proven, cited, not claimed).

Composes: [[pi]] · [[horo]] · [[merge]] · [[law]].
