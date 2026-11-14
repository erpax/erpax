/-
  Contrast — every colour admits a legible foreground, and the reason is one multiplication.

  WCAG 2.2 §1.4.3 asks 4.5:1 for normal text. A uuid-derived colour is computed, not chosen, so
  "pick a foreground that reads" cannot be left to a designer's eye — and it does not have to be.

  THE IDENTITY. Write x for the colour's relative luminance plus the 0.05 WCAG offset. Contrast
  against WHITE is 1.05/x; against BLACK it is x/0.05. Their PRODUCT is 1.05/0.05 = 21, for every
  colour there is. So the two contrasts are reciprocal about √21: as one falls the other rises, and
  the larger of them can never be small.

  If both were under 4.5 their product would be under 20.25, and 20.25 < 21. Therefore the better
  of black and white ALWAYS reaches 4.5:1 — on any background, not merely on this corpus's band.

  Stated over scaled integers so the kernel decides it with no reals and no square root: x is in
  ten-thousandths, so x ∈ [500, 10500], and `a/b < 4.5` is `2a < 9b`.

  WHAT THIS DOES NOT PROVE: that the resulting page is readable. Contrast is one criterion of one
  guideline; font size, spacing, motion and focus order are not in it, and a legible colour pair can
  still be an unusable interface. It also says nothing about a THIRD colour — two arbitrary colours
  may fail each other badly, which is exactly why the foreground here is restricted to black or
  white rather than derived from the uuid as well.
-/

namespace Contrast

/-- Relative luminance plus WCAG's 0.05 offset, in ten-thousandths: L ∈ [0,1] ⇒ x ∈ [500, 10500]. -/
def adjusted (x : Nat) : Bool := decide (500 ≤ x ∧ x ≤ 10500)

/-- Contrast against white is 1.05/x — under 4.5 exactly when `2 · 10500 < 9 · x`. -/
def whiteUnder (x : Nat) : Bool := decide (2 * 10500 < 9 * x)

/-- Contrast against black is x/0.05 — under 4.5 exactly when `2 · x < 9 · 500`. -/
def blackUnder (x : Nat) : Bool := decide (2 * x < 9 * 500)

/-- THE THEOREM: no colour fails BOTH. The better of black and white always reaches 4.5:1. -/
theorem some_ink_always_reads (x : Nat) : ¬(whiteUnder x = true ∧ blackUnder x = true) := by
  intro h
  obtain ⟨hw, hb⟩ := h
  simp only [whiteUnder, blackUnder, decide_eq_true_eq] at hw hb
  omega

/-- It needs no range assumption — the bound holds for every x, adjusted or not. -/
theorem white_under_forces_black_reads (x : Nat) (h : whiteUnder x = true) : blackUnder x = false := by
  cases hb : blackUnder x with
  | false => rfl
  | true => exact absurd ⟨h, hb⟩ (some_ink_always_reads x)

/-- Black is the choice exactly when the colour is light — x at or past the crossover. -/
def inkIsBlack (x : Nat) : Bool := decide (x * x ≥ 500 * 10500)

/-- The crossover, to the ten-thousandth: 2291² is short of 21·500², 2292² clears it. -/
theorem crossover_is_where_the_choice_turns :
    inkIsBlack 2292 = true ∧ inkIsBlack 2291 = false := by decide

/-- And the tight point still clears the threshold — 21 > 20.25, with little to spare. -/
theorem tight_point_clears_the_threshold :
    ¬(whiteUnder 2292 = true ∧ blackUnder 2292 = true) :=
  some_ink_always_reads 2292

/-- A black background takes white ink. -/
theorem darkest_takes_white : blackUnder 500 = true ∧ whiteUnder 500 = false := by decide

/-- A white background takes black ink. -/
theorem lightest_takes_black : whiteUnder 10500 = true ∧ blackUnder 10500 = false := by decide

/-- Every adjusted luminance is in range, and every one of them reads. -/
theorem the_whole_range_reads (x : Nat) (_h : adjusted x = true) :
    whiteUnder x = false ∨ blackUnder x = false := by
  cases hw : whiteUnder x with
  | false => exact Or.inl rfl
  | true => exact Or.inr (white_under_forces_black_reads x hw)

end Contrast
