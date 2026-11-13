/-
  Clone — quantum information cannot be copied: no linear map clones both |0⟩, |1⟩ and |+⟩.

  Ported from qpu.uuidna.com (Qpu.Information.QuantumInformation, same author), on the matrices of
  Gate.lean. Every other theorem in this family is a finite check of one circuit. This one is
  different in kind: it quantifies over EVERY 4 × 4 matrix `u` with Gaussian-integer entries, so
  `decide` cannot close it — there are infinitely many. It is proved by unfolding the one output
  amplitude that matters and letting `omega` refuse the arithmetic.

  The argument is the textbook one, in one entry. Suppose `u` copies the basis states:
  |0⟩|0⟩ ↦ |0⟩|0⟩ and |1⟩|0⟩ ↦ |1⟩|1⟩. By linearity `u` sends |+⟩|0⟩ = |00⟩ + |10⟩ to
  |00⟩ + |11⟩. A true copy of |+⟩ would be |+⟩|+⟩ = |00⟩ + |01⟩ + |10⟩ + |11⟩, which has amplitude 1
  on |01⟩ — and the linear image has amplitude 0 there. So the map that copies the basis cannot
  copy their sum.

  WHAT THIS PROVES: for every such matrix, if it copies |0⟩ and |1⟩ onto a blank second qubit, its
  output on |+⟩|0⟩ has amplitude ≠ 1 on |01⟩, so it is not |+⟩|+⟩. No axiom beyond Lean's standard
  ones (`propext`, `Quot.sound`), which `simp` and `omega` use.

  WHAT THIS DOES NOT PROVE: the theorem over the complex numbers — the entries here are Gaussian
  integers, which is the arithmetic this family is exact in; the argument does not use that
  restriction, but the statement is only what is written. It also says nothing about approximate
  cloning, which is possible with bounded fidelity.
-/
import Gate

namespace Clone
open Gate

/-- NO LINEAR MAP THAT COPIES |0⟩ AND |1⟩ COPIES |+⟩: its image of |+⟩|0⟩ is not |+⟩|+⟩. -/
theorem no_cloning (u : Mat)
    (h0 : ∀ r, r < 4 → ap 4 u (basis 0) r = basis 0 r)
    (h2 : ∀ r, r < 4 → ap 4 u (basis 2) r = basis 3 r) :
    ap 4 u (fun r => basis 0 r + basis 2 r) 1 ≠ 1 := by
  have a := h0 1 (by decide)
  have b := h2 1 (by decide)
  simp only [ap, sumTo, basis, List.range, List.range.loop, List.foldl] at a b ⊢
  generalize u 1 0 = x0 at a b ⊢
  generalize u 1 1 = x1 at a b ⊢
  generalize u 1 2 = x2 at a b ⊢
  generalize u 1 3 = x3 at a b ⊢
  obtain ⟨p0, q0⟩ := x0
  obtain ⟨p1, q1⟩ := x1
  obtain ⟨p2, q2⟩ := x2
  obtain ⟨p3, q3⟩ := x3
  intro h
  simp only [Nat.reduceEqDiff, ↓reduceIte] at a b h
  have ha := congrArg GI.re a
  have hb := congrArg GI.re b
  have hh := congrArg GI.re h
  simp only [gi_add_re, gi_add_im, gi_mul_re, gi_zero_re, gi_one_re, gi_zero_im, gi_one_im] at ha hb hh
  omega

/-- The hypotheses are not vacuous: CNOT is such a map — it copies the basis states exactly. -/
theorem cnot_copies_the_basis :
    (∀ r, r < 4 → ap 4 CNOT (basis 0) r = basis 0 r) ∧ (∀ r, r < 4 → ap 4 CNOT (basis 2) r = basis 3 r) := by
  decide

end Clone
