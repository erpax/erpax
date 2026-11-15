/-
  Search — why measuring small instances cannot separate polynomial from exponential cost.

  Clay: pnp meta

  P vs NP asks whether every problem whose solutions can be VERIFIED in polynomial time can also be
  SOLVED in polynomial time. One tempting argument is empirical: time exhaustive search (2^n candidate
  certificates of n bits) against a polynomial-time algorithm as n grows, and read the separation off
  the measurements. This file proves that such an argument, confined to instance sizes up to 58,
  cannot show anything: a cost of degree 10 is at least the exhaustive cost at every size from 2 to
  58, so no measurement in that range sees exponential search lose. The order flips only at 59.

  What is proved, by `decide` alone (no simp, no omega, no axiom):
    1. For every n with 2 ≤ n ≤ 58:   2^n ≤ n^10.
    2. At n = 59 the order flips:     59^10 < 2^59.
    3. Below the window, at n = 1:    1^10 < 2^1.

  What is NOT proved: anything about P vs NP itself. The file shows only that a polynomial of degree
  10 hides inside exponential growth up to n = 58, so bounded experiments are evidence for neither
  answer. No lower bound for any problem is derived.
-/

namespace Search

/-- Exhaustive search over n-bit certificates: 2^n candidates. -/
def exhaustive (n : Nat) : Nat := 2 ^ n

/-- The cost of a polynomial-time algorithm of degree 10. -/
def poly10 (n : Nat) : Nat := n ^ 10

/-- At every size from 2 to 58, the degree-10 cost is at least the exhaustive cost. -/
theorem polynomial_hides_in_exponential_up_to_58 : ∀ n, n < 59 → 2 ≤ n → exhaustive n ≤ poly10 n := by
  decide

/-- At 59 exhaustive search finally costs more. -/
theorem exponential_overtakes_at_59 : poly10 59 < exhaustive 59 := by decide

/-- Below the window, at 1, exhaustive search already costs more, so the window starts at 2. -/
theorem window_starts_at_2 : poly10 1 < exhaustive 1 := by decide

end Search
