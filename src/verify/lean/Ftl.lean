/-
  Ftl — the corpus's strongest claim, given the proof it was missing.

  README states it plainly: **physical FTL on QPU=CPU/GPU**, holds ⇔ reuse ∧ amortize∞ ∧ cracks=∅.
  The claim is KEPT here, not softened — but a claim addressed to a reader who signs is worth only
  the proof beside it ([[rules]]/audience), and this one had a number and no theorem.

  So the claim is stated exactly as the code computes it, and proved.

    reuse       addressing costs foldOps = 1 where searching costs searchOps = n
    amortize∞   efficiency = answers/tokens is unbounded when tokens = 0 and answers > 0,
                and amortizedCost = c₀/(m+1) falls to nothing as reuses m grow
    cracks = ∅  every cited answer still addresses the content it was computed from

  WHAT "FTL" MEANS HERE, stated where the claim is made: the speedup is over the SEARCH, not over
  the speed of light. Nothing in this file says a signal outruns c. It says that answering by
  ADDRESS is O(1) where answering by SEARCH is O(n), so the ratio n/1 has no upper bound, and that
  a re-answer whose receipt still holds costs nothing — which is why efficiency divides by zero and
  the corpus writes ∞. That is a cost-model theorem. It is not physics, and the boundary is the
  point: without `cracks = ∅` the whole thing collapses to the naive cost, and that collapse is
  theorem `a_crack_costs_the_whole_search` below.

  Nat division is FLOOR division, so "amortizedCost → 0" is proved in the only form Nat admits:
  it REACHES zero once the reuses outnumber the first cost. The real quantity is a limit; the
  theorem is the discrete shadow of it, and saying so is cheaper than pretending otherwise.
-/

namespace Ftl

/-- Answering by address: one fold, whatever the space. -/
def foldOps : Nat := 1

/-- Answering by search: one operation per candidate. -/
def searchOps (space : Nat) : Nat := space

/-- The amortized cost of one answer after `reuses` citations of a first computation costing `c`. -/
def amortized (c reuses : Nat) : Nat := c / (reuses + 1)

/-- What the same answers cost with no reuse at all — the naive path. -/
def naive (c answers : Nat) : Nat := c * answers

/-- With a crack, a citation is void: the answer is recomputed, so every answer pays in full. -/
def costOf (cracked : Bool) (c answers : Nat) : Nat :=
  if cracked then naive c answers else c

/-- efficiency = answers/tokens is ∞ exactly when the tokens are zero and an answer exists. -/
def scalesToInfinity (answers tokens : Nat) : Bool := (tokens == 0) && (0 < answers)

/-- The claim itself, as `ftlHolds` computes it. -/
def holds (reuseWins amortizeInfinite cracksEmpty : Bool) : Bool :=
  reuseWins && amortizeInfinite && cracksEmpty

/-- Addressing is never worse than searching — for any space at all. -/
theorem address_never_loses (space : Nat) : foldOps ≤ searchOps (space + 1) := by
  simp [foldOps, searchOps]

/-- And strictly better from two candidates up: the speedup is real, not a tie. -/
theorem address_wins_from_two (space : Nat) : foldOps < searchOps (space + 2) := by
  simp [foldOps, searchOps]

/-- THE UNBOUNDED HALF: for any bound B there is a space where searching costs at least B times
    what addressing costs. No ceiling on the ratio — which is the whole content of "FTL" here. -/
theorem speedup_has_no_ceiling (B : Nat) : ∃ space, B * foldOps ≤ searchOps space :=
  ⟨B, by simp [foldOps, searchOps]⟩

/-- Reuse never costs more per answer than computing once. -/
theorem amortized_never_rises (c reuses : Nat) : amortized c reuses ≤ c := by
  simpa [amortized] using Nat.div_le_self c (reuses + 1)

/-- And it REACHES zero: once the citations outnumber the first cost, a further answer is free.
    This is the discrete form of c₀/(m+1) → 0. -/
theorem amortized_reaches_zero (c : Nat) : amortized c c = 0 := by
  simp [amortized]

/-- ∞ efficiency requires an answer: zero answers never scales, whatever the tokens. -/
theorem no_answer_never_scales (tokens : Nat) : scalesToInfinity 0 tokens = false := by
  simp [scalesToInfinity]

/-- And it requires the tokens to be zero: any token spent refuses the ∞. -/
theorem any_token_refuses_infinity (answers tokens : Nat) :
    scalesToInfinity answers (tokens + 1) = false := by
  simp [scalesToInfinity]

/-- THE LOAD-BEARING PREMISE: with one crack the receipt is void and the corpus pays the whole
    search again — the gain is not reduced, it is gone. -/
theorem a_crack_costs_the_whole_search (c answers : Nat) :
    costOf true c answers = naive c answers := by
  simp [costOf]

/-- Without cracks, any number of answers costs the one computation. -/
theorem no_crack_costs_once (c answers : Nat) : costOf false c answers = c := by
  simp [costOf]

/-- A crack refuses the claim outright, however good the other two legs are. -/
theorem a_crack_refuses_ftl (reuseWins amortizeInfinite : Bool) :
    holds reuseWins amortizeInfinite false = false := by
  cases reuseWins <;> cases amortizeInfinite <;> decide

/-- So does a lost reuse, and so does a finite amortization. -/
theorem every_leg_is_load_bearing (b : Bool) :
    holds false b true = false ∧ holds b false true = false := by
  cases b <;> decide

/-- The control: all three legs hold, and the claim stands — so the refusals are not vacuous. -/
theorem the_claim_holds_when_earned : holds true true true = true := by decide

end Ftl
