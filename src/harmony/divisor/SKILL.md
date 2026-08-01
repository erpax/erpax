---
name: divisor
description: "Use when the 432 anchor's structure must be exact — the divisor lattice C5×C4 (20 divisors) and its self-dual inversion φ(d)=432/d, where every divisor-fraction d/432 reduces to the unit fraction 1/φ(d), verified to the bit by integer arithmetic."
atomPath: "harmony/divisor"
coordinate: "harmony/divisor · 1/base · e607d4b3"
contentUuid: "f8d9282c-a49a-55dd-a012-b020d8c15a0d"
diamondUuid: "2d37d4b2-c896-8fab-8ca9-ab755d45fd4c"
uuid: "e607d4b3-dbd3-8385-b2d6-9f15f616c3c1"
horo: 1
typography:
  partition: harmony
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "4f61b730-b751-8ec6-a86f-5de74d794e0a"
  stages:
    - stage: path
      stageUuid: "15b15981-f6b7-8eb6-8378-7dbb5533fd3c"
    - stage: trinity
      stageUuid: "54ec9c55-59bb-8069-a6f1-bb751f7dc1a3"
    - stage: boundary
      stageUuid: "f6d82634-a74d-892f-b10f-1896fd993ebc"
    - stage: links
      stageUuid: "1675b12e-280a-8e71-9511-f01d78018878"
    - stage: horo
      stageUuid: "34b8f1ac-d5d1-818d-94b1-5e70f8586f49"
    - stage: seal
      stageUuid: "3c92be86-9929-84ad-b516-35ad8ce07903"
    - stage: uuid
      stageUuid: "e3c862f4-dc79-866c-8b26-21167f85ba68"
version: 2
---
# harmony/divisor — the 432 divisor lattice: the respected fractions, down to the bit

432 = **2⁴·3³** is the A432 anchor ([[harmony]]). Its divisors, ordered by divisibility, form a lattice — and because the exponents are (4,3), that lattice is **exactly the product of chains C5 × C4**: five powers of two × four powers of three = **20 divisors**, one per coordinate (a,b), a∈0..4, b∈0..3. The count is a theorem (τ(432) = 5·4 = 20), not a measurement — none missing, none extra.

## The inversion computes exactly

φ(d) = 432/d is the lattice's self-duality, and it holds to the bit — integer arithmetic, no float:

| leg | statement | why exact |
| --- | --- | --- |
| exact product | d · φ(d) = 432 | d divides 432, so the quotient is integer |
| involution | φ(φ(d)) = d | applying 432/· twice returns d |
| self-dual | d \| e ⟺ φ(e) \| φ(d) | order-reversing — C5×C4 is isomorphic to its own dual |
| **respected fraction** | **d / 432 = 1 / φ(d)** | d/432 = d/(d·φ(d)) = 1/φ(d) |

The last is the point: **every divisor-fraction reduces to a UNIT fraction** whose denominator is its own inversion. d/432 and 1/φ(d) are one fact read two ways — the fraction *is* the reciprocal of its inversion. Verified without a float, by integer cross-multiplication `1·432 = d·φ(d)`. σ(432) = 1240 (= 31·40) closes the set.

## Real math, not the numerology

This is a **distributive divisor lattice** and an **order-reversing involution** — sealed as a **finite-complete** theorem because the domain is 20 elements, so the proof exhausts it rather than sampling ([[theorem]] proof-class). The number 432 earns its place here through the arithmetic that holds to the bit, never through 432-Hz mysticism — the same discipline that keeps [[rodin]] as group theory and rejects the metaphysics around it.

**Honest boundary.** This proves the lattice of 432 is C5×C4 and its inversion is bit-exact — it does not claim 432 is special beyond being 2-smooth·3-smooth with those exponents; any n = pᵃ·qᵇ has the analogous C(a+1)×C(b+1) lattice. What is sealed is that FOR 432 the structure is exactly this, and the inversion computes exactly.

**Law — [[law]]: the 432 divisor lattice is C5×C4, self-dual under φ(d)=432/d, and every divisor-fraction d/432 equals the unit fraction 1/φ(d) exactly. The inversion is a theorem exhausted over all 20 divisors, verified to the bit.**

Composes: [[harmony]] · [[theorem]] · [[law]].
