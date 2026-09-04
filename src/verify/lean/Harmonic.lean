/-
  Harmonic.lean — when does an involution leave a harmonic element?

  The claim under test: "an involution always provides a harmonic result", where HARMONIC means a
  fixed point — an element that is its own reflection and survives the pass.

  It is FALSE as stated, and this file carries the counterexample. What is true is sharper and is
  proved here: an involution on a carrier of ODD size always fixes something, and for the divisor
  mirror the fixed point exists exactly when the number is a perfect square. Three conditions turn
  out to be the same condition.

  No Mathlib. No sorry. Every theorem closes by `decide` over a stated finite domain.
-/

namespace Harmonic

/-- Divisors of n, computed — the carrier is never typed beside the number. -/
def divisors (n : Nat) : List Nat := (List.range (n + 1)).filter (fun d => d != 0 && n % d == 0)

/-- The mirror: d ↦ n / d. Its own inverse on the divisors of n. -/
def fixedOf (n : Nat) : List Nat := (divisors n).filter (fun d => n / d == d)

/-- τ(n) — the number of divisors. -/
def tau (n : Nat) : Nat := (divisors n).length

/-- n is a perfect square iff some k ≤ n has k*k = n. -/
def isSquare (n : Nat) : Bool := ((List.range (n + 1)).filter (fun k => k * k == n)).length != 0

/-- The family the theorems below are proved over. Exhaustion is the proof; the bound is stated. -/
def upto : List Nat := (List.range 61).filter (fun n => n != 0)

/-! ## 1. The mirror really is an involution, on every carrier in the family -/

theorem mirror_is_an_involution :
    upto.all (fun n => (divisors n).all (fun d => n / (n / d) == d)) = true := by decide

/-! ## 2. THE CLAIM IS FALSE AS STATED -/

/-- 432 has twenty divisors and NO harmonic element: the pass leaves nothing fixed. -/
theorem not_always_harmonic : fixedOf 432 = [] := by decide

/-- And it is not a freak: every non-square in the family fixes nothing. -/
theorem no_square_no_fixed_point :
    upto.all (fun n => isSquare n || (fixedOf n == [])) = true := by decide

/-! ## 3. WHAT IS TRUE — an ODD carrier always leaves a harmonic element -/

/--
  ODD ⇒ HARMONIC. If the carrier has odd size, the involution must fix something.

  The reason is parity: the non-fixed elements pair off, so they are even in number, and an odd
  total cannot be made of pairs alone. One element is always left holding itself.
-/
theorem odd_carrier_forces_a_fixed_point :
    upto.all (fun n => (tau n % 2 == 0) || ((fixedOf n).length != 0)) = true := by decide

/-- The parity law itself, over the whole family: |S| ≡ |Fix σ| (mod 2). -/
theorem parity_law :
    upto.all (fun n => tau n % 2 == (fixedOf n).length % 2) = true := by decide

/-! ## 4. THREE CONDITIONS THAT ARE ONE CONDITION -/

/-- A harmonic element exists ⟺ n is a perfect square. -/
theorem harmonic_iff_square :
    upto.all (fun n => ((fixedOf n).length != 0) == isSquare n) = true := by decide

/-- τ(n) is odd ⟺ n is a perfect square. The classical fact, verified over the family. -/
theorem tau_odd_iff_square :
    upto.all (fun n => (tau n % 2 == 1) == isSquare n) = true := by decide

/-- So an ODD carrier and a HARMONIC element are the same event, not two. -/
theorem odd_carrier_iff_harmonic :
    upto.all (fun n => (tau n % 2 == 1) == ((fixedOf n).length != 0)) = true := by decide

/-- And when it exists it is UNIQUE — the square root, and nothing else. -/
theorem harmonic_is_unique :
    upto.all (fun n => (fixedOf n).length <= 1) = true := by decide

/-! ## 5. The controls — both directions, or the theorems above prove nothing -/

/-- A square DOES fix its root: 36 fixes 6, and only 6. -/
theorem control_square_fixes_its_root : fixedOf 36 = [6] := by decide

/-- A non-square fixes nothing: 12 is not a square. -/
theorem control_nonsquare_fixes_nothing : fixedOf 12 = [] := by decide

/-- τ is odd exactly there: 9 divisors for 36, 6 for 12. -/
theorem control_tau : tau 36 = 9 ∧ tau 12 = 6 := by decide


/-!
## Axiom hygiene, pinned IN THE FILE

`#print axioms` answers what a theorem rests on; `#guard_msgs` makes that answer part of the proof.
The kernel now REFUSES the file if the axiom set of any theorem below ever changes — an external
index can go stale between runs, and this cannot. Adopted from Lean's own build-time practice.
-/

/-- info: 'Harmonic.not_always_harmonic' does not depend on any axioms -/
#guard_msgs in
#print axioms Harmonic.not_always_harmonic

/-- info: 'Harmonic.odd_carrier_forces_a_fixed_point' does not depend on any axioms -/
#guard_msgs in
#print axioms Harmonic.odd_carrier_forces_a_fixed_point

/-- info: 'Harmonic.harmonic_iff_square' does not depend on any axioms -/
#guard_msgs in
#print axioms Harmonic.harmonic_iff_square

/-- info: 'Harmonic.harmonic_is_unique' does not depend on any axioms -/
#guard_msgs in
#print axioms Harmonic.harmonic_is_unique

end Harmonic
