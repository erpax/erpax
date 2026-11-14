/-
  Cost — the tamper margin, stated against NIST's ladder instead of a folk rule.

  The claim is economic: VERIFYING a record is one hash, FORGING one is a search. This file fixes
  the exponents so the gap can be argued with by an auditor rather than admired.

  THE CORRECTION THIS FILE CARRIES. An earlier version halved every exponent for Grover —
  "quantum square-roots the search" — and rated SHA-256 preimage at 2^128. NIST does not do that,
  and the reason is not pedantry:

    · The PQC call for proposals costs SHA3-256 collision search at 2^146 CLASSICAL gates and gives
      the hash rows NO quantum column at all.
    · Its §4.A.5 states why: Grover needs a long SERIAL computation, and parallelising it across m
      machines buys only √m — the MAXDEPTH construct (Zalka 1999, Phys. Rev. A 60, 2746).
    · IR 8547 (initial public draft) Table 7 rates SHA-256 at COLLISION 128 bits, PREIMAGE 256 bits.

  So preimage keeps its full width and collision takes the classical birthday bound. Halving the
  preimage was the safe direction — it under-claimed — but a margin stated against the wrong
  standard cannot be checked against the right one, and an auditor reads the standard.

  BHT (quant-ph/9705002) finds collisions in O(N^(1/3)) QUERIES — 2^85 for a 256-bit hash — but
  needs ~2^(n/3) quantum-accessible memory, so under a gate/area-time metric classical parallel rho
  wins. The query count is not the cost, and this file uses the cost.

  WHAT IS NOT PROVED: that SHA-256 has no shortcut. A break makes every number here irrelevant, and
  no theorem in this corpus can forbid one. Nat division is floor division — an odd width rounds
  DOWN, the only safe way to round a margin.
-/

namespace Cost

/-- Verification: one hash, whatever the chain length. The whole asymmetry lives here. -/
def verify : Nat := 1

/-- PREIMAGE strength of a digest, in log2 — its full width. NIST rates SHA-256 at 256, not 128. -/
def preimage (bits : Nat) : Nat := bits

/-- COLLISION strength — the classical birthday bound, which quantum does not improve under a
    cost metric. This is the number that governs a chosen-content forgery. -/
def collision (bits : Nat) : Nat := bits / 2

/-- Independent seams multiply the work, so their exponents add. -/
def chained (strength seams : Nat) : Nat := strength * seams

/-- NIST PQC security categories, as the floor a claim is held to.
    1 ≈ AES-128 · 2 ≈ SHA3-256 collision · 3 ≈ AES-192 · 5 ≈ AES-256. -/
def category1 : Nat := 128
def category2 : Nat := 128
def category3 : Nat := 192
def category5 : Nat := 256

/-- Forging costs more than verifying, for any real width and any seam. -/
theorem forging_costs_more_than_verifying (bits seams : Nat) :
    verify ≤ chained (preimage (bits + 1)) (seams + 1) := by
  simp [verify, chained, preimage]
  exact Nat.succ_le_succ (Nat.zero_le _)

/-- Seams add in the exponent — k+1 seams cost one seam more than k. -/
theorem seams_add_in_the_exponent (strength seams : Nat) :
    chained strength (seams + 1) = chained strength seams + strength := by
  simp [chained, Nat.mul_succ]

/-- SHA-256 preimage sits at category 5 — NIST's rating, not a halved guess. -/
theorem the_content_digest_preimage_is_category_five : preimage 256 = category5 := by decide

/-- And its collision strength is category 2 — the number a chosen-content forgery actually faces. -/
theorem the_content_digest_collision_is_category_two : collision 256 = category2 := by decide

/-- THE BREAK, and it needs no quantum computer. erpax's uuid carries 122 free bits, so a chosen
    content COLLISION costs 2^61 classically — less than half of category 1. A bare address is not
    a security boundary. -/
theorem the_uuid_address_collides_below_category_one : collision 122 < category1 := by decide

/-- Two seams of it are still short: 61 + 61 = 122 < 128. The shortfall is not rhetorical. -/
theorem two_uuid_seams_are_still_short : chained (collision 122) 2 < category1 := by decide

/-- Three clear it. This is what "multi-seam" must mean to be worth saying. -/
theorem three_uuid_seams_clear_category_one : category1 ≤ chained (collision 122) 3 := by decide

/-- SHA-224 is the near miss worth naming: 112-bit collision strength, which IR 8547 puts BELOW
    category 1 — and 112-bit classical security is the level deprecated after 2030. -/
theorem sha224_collision_is_below_category_one : collision 224 < category1 := by decide

/-- Truncation is where a margin is lost quietly: half the width, half the collision strength. -/
theorem truncation_halves_the_collision_margin (bits : Nat) :
    collision (bits / 2) ≤ collision bits := by
  simp [collision]
  exact Nat.div_le_div_right (Nat.div_le_self bits 2)

/-- The control: the anchored chain really does clear category 2, so the refusals are not vacuous. -/
theorem the_anchored_chain_holds : category2 ≤ chained (collision 256) 1 := by decide

end Cost
