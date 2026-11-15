/-
  Prefix — why finitely many coefficients cannot fix the order of vanishing.

  Clay: bsd meta

  The Birch and Swinnerton-Dyer conjecture says that for an elliptic curve E over ℚ the order of
  vanishing of L(E, s) at s = 1 equals the rank of E(ℚ). The point s = 1 lies outside the region where
  the Euler product of L(E, s) converges absolutely, so the behaviour there depends on ALL of the
  coefficients aₙ, through analytic continuation. An argument that read off the order of vanishing
  from a finite list of coefficients (finitely many point counts) would need those to determine a
  quantity that depends on every coefficient. This file shows, in a finite model, that a prefix does
  not determine such a quantity: two sequences agree on their first N terms and still differ in a
  later sum.

  For N = 1 … 8: the sequence `a N` is 0 everywhere; the sequence `b N` is 0 below N and 1 from N on.

  What is proved, by `decide` alone, for every N from 1 to 8:
    1. a N and b N agree on the first N terms.
    2. Their sums over the first 2N terms differ: 0 against N.

  What is NOT proved: anything about elliptic curves, L-functions or ranks. The file shows only that
  agreement on finitely many coefficients leaves an aggregate of all of them undetermined, so such an
  argument cannot by itself fix the order of vanishing.
-/

namespace Prefix

/-- 0 everywhere. -/
def a (_N : Nat) (_n : Nat) : Int := 0

/-- 0 below N, 1 from N on. -/
def b (N : Nat) (n : Nat) : Int := if n < N then 0 else 1

/-- The sum of the first M terms. -/
def sumTo (f : Nat → Int) (M : Nat) : Int := (List.range M).foldl (fun s n => s + f n) 0

theorem agree_on_the_first_N_terms : ∀ N, N < 9 → ∀ n, n < N → a N n = b N n := by decide

theorem differ_in_a_later_sum : ∀ N, N < 9 → 1 ≤ N → sumTo (a N) (2 * N) = 0 ∧ sumTo (b N) (2 * N) = N := by decide

end Prefix
