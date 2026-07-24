---
name: divisor
description: "Use when the 432 anchor's structure must be exact — the divisor lattice C5×C4 (20 divisors) and its self-dual inversion φ(d)=432/d, where every divisor-fraction d/432 reduces to the unit fraction 1/φ(d), verified to the bit by integer arithmetic."
atomPath: harmony/divisor
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
