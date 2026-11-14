/-
  Landauer — the heat a computation must shed is the bits it erases, times k·T·ln 2.

  The twin is src/temperature (landauerJ · erasedBits · reversible · amortisedBits). What is decided
  here is the arithmetic the twin rests on, in naturals: a core at 300 K against a fridge at 15 mK is a
  factor of 20,000 per erased bit; a step whose output is at least as wide as its input erases nothing
  (and is the reversible, quantum-eligible kind); a step that narrows erases exactly the difference.
  Proved by `decide` and `omega`, no axiom.
-/

namespace Landauer

/-- Erased bits of a deterministic step from `i` input bits to `o` output bits. -/
def erased (i o : Nat) : Nat := i - o

/-- 300 K over 15 mK, in millikelvin: 300000 / 15 = 20000. -/
theorem core_over_fridge : 300000 / 15 = 20000 := by decide

/-- A step that does not narrow erases nothing — the reversible kind. -/
theorem bijection_erases_nothing (i o : Nat) (h : i ≤ o) : erased i o = 0 := by
  unfold erased; omega

/-- A step that narrows erases exactly the difference. -/
theorem narrowing_erases_the_difference (i o : Nat) (h : o ≤ i) : erased i o + o = i := by
  unfold erased; omega

/-- The corpus's widths: the CRT split widens (128 → 155), so it erases nothing; the AND-fold halves. -/
theorem split_is_reversible : erased 128 155 = 0 := by decide
theorem and_fold_erases_half : erased 128 64 = 64 := by decide

end Landauer
