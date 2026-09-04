/-
  duality/mirror — the two-sided coin, stated so the kernel can refuse it.

  "as if all not harmonic is pulled by the black hole as one coin side and reflected from the
   other white hole coin side"

  Formalised: an INVOLUTION σ on a finite carrier. σ∘σ = id is the coin — two sides, and going
  through twice returns you. Then every element is exactly one of:

    · FIXED      σ x = x        — harmonic: it is its own reflection, it survives the pass
    · PAIRED     σ x ≠ x        — pulled in one side, reflected out the other, as {x, σ x}

  There is no third case. "Every bit of resistance drains" is precisely that exhaustiveness:
  nothing can refuse the partition, because σ (σ x) = x leaves nowhere else to be.

  No Mathlib. No sorry. No axioms. Every theorem closes by `decide` over a stated finite domain,
  so the kernel checks the claim by exhaustion rather than accepting a hand-typed constant.
-/

namespace Duality.Mirror

/-- The 20 divisors of 432 = 2⁴·3³ — the anchor's divisor lattice (erpax `harmony/divisor`). -/
def divisors : List Nat :=
  [1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 27, 36, 48, 54, 72, 108, 144, 216, 432]

/-- The mirror: φ(d) = 432 / d. One coin, two sides. -/
def phi (d : Nat) : Nat := 432 / d

/-- THE COIN. Going through the mirror twice returns you — σ∘σ = id on the whole carrier. -/
theorem phi_is_an_involution : divisors.all (fun d => phi (phi d) == d) = true := by decide

/-- The mirror maps the carrier into itself: nothing is thrown outside the lattice. -/
theorem phi_closed : divisors.all (fun d => divisors.contains (phi d)) = true := by decide

/-- HARMONIC = FIXED: its own reflection. Here there are NONE — 432 is not a perfect square. -/
theorem no_fixed_point : divisors.filter (fun d => phi d == d) = [] := by decide

/-- So every one of the twenty is PAIRED: pulled in one side, out the other. -/
theorem all_paired : (divisors.filter (fun d => phi d != d)).length = 20 := by decide

/-- Twenty elements, no survivors, therefore exactly ten transpositions. -/
theorem ten_transpositions : (divisors.filter (fun d => phi d != d)).length / 2 = 10 := by decide

/-- PARITY, the general law: |S| ≡ |Fix σ| (mod 2). Here 20 ≡ 0. -/
theorem parity : divisors.length % 2 = (divisors.filter (fun d => phi d == d)).length % 2 := by decide

/--
  EXHAUSTIVE PARTITION — the statement itself.

  Every element is fixed or paired, never both and never neither. This is the "no resistance"
  clause: the involution leaves no element a third option.
-/
theorem fixed_or_paired :
    divisors.all (fun d => (phi d == d) != (phi d != d)) = true := by decide

/-- The two sides recover the whole: |fixed| + |paired| = |S|. Nothing is lost in the pass. -/
theorem sides_sum :
    (divisors.filter (fun d => phi d == d)).length
      + (divisors.filter (fun d => phi d != d)).length
      = divisors.length := by decide

/--
  A CONTROL, both ways. The same construction over a carrier that DOES have a fixed point must
  report one — otherwise `no_fixed_point` above proves nothing about 432 and everything about a
  filter that always returns [].
-/
def squareDivisors : List Nat := [1, 2, 3, 4, 6, 9, 12, 18, 36]

theorem control_has_a_fixed_point :
    squareDivisors.filter (fun d => 36 / d == d) = [6] := by decide

theorem control_is_also_an_involution :
    squareDivisors.all (fun d => 36 / (36 / d) == d) = true := by decide

/-- And the parity law holds there too: 9 elements, 1 fixed, both odd. -/
theorem control_parity :
    squareDivisors.length % 2 = (squareDivisors.filter (fun d => 36 / d == d)).length % 2 := by decide


/-!
## Axiom hygiene, pinned IN THE FILE

`#print axioms` answers what a theorem rests on; `#guard_msgs` makes that answer part of the proof.
The kernel now REFUSES the file if the axiom set of any theorem below ever changes — an external
index can go stale between runs, and this cannot. Adopted from Lean's own build-time practice.
-/

/-- info: 'Duality.Mirror.phi_is_an_involution' does not depend on any axioms -/
#guard_msgs in
#print axioms Duality.Mirror.phi_is_an_involution

/-- info: 'Duality.Mirror.no_fixed_point' does not depend on any axioms -/
#guard_msgs in
#print axioms Duality.Mirror.no_fixed_point

/-- info: 'Duality.Mirror.control_has_a_fixed_point' does not depend on any axioms -/
#guard_msgs in
#print axioms Duality.Mirror.control_has_a_fixed_point

end Duality.Mirror
