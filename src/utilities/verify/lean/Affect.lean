/-
  Affect — feeling, thought and emotion as a trinity, and the two groups it can mean.

  The twin is src/utilities/affect.

  The model (a lens, not a law of mind): three corners run in a loop.
    · feeling   the body's signal, raw affect with no story yet
    · thought   the reading of that signal (appraisal)
    · emotion   the whole episode, signal and reading fused into something with a push
  Feeling feeds thought, thought shapes emotion, emotion changes the body, which is new feeling.
  A state is a corner with a valence (pleasant or unpleasant).

  Two symmetries act on it:
    · turn  ρ : the loop advances one corner; three turns come back, ρ³ = id, and no corner stays put
    · flip  σ : valence reverses at every corner at once; σ² = id
  Because σ acts on the valence and ρ on the corner, they COMMUTE, and together they make the cyclic
  group C₃ × C₂ ≅ C₆: the turn-and-flip ρσ has order six and generates all six motions. Of the three
  "flipped" motions σ, σρ, σρ² only σ is an involution; the other two have order six. So a flip that
  commutes with the turn gives ONE flip, not three.

  Three genuine flips need a flip that REVERSES the loop: a mirror μ that fixes one corner and swaps
  the other two satisfies μ² = id and μρμ = ρ⁻¹. That flip does not commute with the turn, and with it
  the motions form the dihedral group S₃ ≅ D₃, whose three mirrors μ, μρ, μρ² are all involutions.
  The two readings are different groups (C₆ is commutative, S₃ is not), and both are proved below.

  Proved by `cases` and `rfl` over the finite states. No Mathlib, no sorry, no axiom.
-/

namespace Affect

/-- The three corners of the loop. -/
inductive Corner where
  | feeling | thought | emotion
  deriving DecidableEq, Repr

/-- A state: where in the loop, and with which valence (`true` = pleasant). -/
structure State where
  corner : Corner
  pleasant : Bool
  deriving DecidableEq, Repr

/-- One step of the loop: feeling → thought → emotion → feeling. -/
def next : Corner → Corner
  | .feeling => .thought
  | .thought => .emotion
  | .emotion => .feeling

/-- The turn ρ: advance the corner, keep the valence. -/
def turn (s : State) : State := { s with corner := next s.corner }

/-- The flip σ: reverse the valence, keep the corner. -/
def flip (s : State) : State := { s with pleasant := !s.pleasant }

/-- The mirror μ: fix feeling, swap thought and emotion — the loop run backward. -/
def mirrorCorner : Corner → Corner
  | .feeling => .feeling
  | .thought => .emotion
  | .emotion => .thought

def mirror (s : State) : State := { s with corner := mirrorCorner s.corner }

/-- Three turns come back: ρ³ = id. -/
theorem turn_three (s : State) : turn (turn (turn s)) = s := by
  cases s with | mk c v => cases c <;> rfl

/-- A turn moves every corner: there is no fixed corner, only the axis the loop turns about. -/
theorem turn_moves (s : State) : turn s ≠ s := by
  cases s with | mk c v => cases c <;> cases v <;> decide

/-- Two turns are not yet home: the turn has order exactly three. -/
theorem turn_two_moves (s : State) : turn (turn s) ≠ s := by
  cases s with | mk c v => cases c <;> cases v <;> decide

/-- Two flips come back: σ² = id. -/
theorem flip_two (s : State) : flip (flip s) = s := by
  cases s with | mk c v => cases v <;> rfl

/-- A flip moves every state. -/
theorem flip_moves (s : State) : flip s ≠ s := by
  cases s with | mk c v => cases c <;> cases v <;> decide

/-- The flip commutes with the turn: σρ = ρσ. -/
theorem flip_turn_commute (s : State) : flip (turn s) = turn (flip s) := by
  cases s with | mk c v => cases c <;> cases v <;> rfl

/-- The turn-and-flip ρσ. -/
def cycle (s : State) : State := flip (turn s)

/-- ρσ has order six: six steps come back… -/
theorem cycle_six (s : State) : cycle (cycle (cycle (cycle (cycle (cycle s))))) = s := by
  cases s with | mk c v => cases c <;> cases v <;> rfl

/-- …and neither two nor three steps do, so it generates all six motions: C₃ × C₂ ≅ C₆. -/
theorem cycle_two_moves (s : State) : cycle (cycle s) ≠ s := by
  cases s with | mk c v => cases c <;> cases v <;> decide

theorem cycle_three_moves (s : State) : cycle (cycle (cycle s)) ≠ s := by
  cases s with | mk c v => cases c <;> cases v <;> decide

/-- With the commuting flip, σρ is NOT an involution: only σ itself is. -/
theorem flipped_turn_not_involution : ∃ s : State, flip (turn (flip (turn s))) ≠ s :=
  ⟨⟨.feeling, true⟩, by decide⟩

/-- The mirror is an involution: μ² = id. -/
theorem mirror_two (s : State) : mirror (mirror s) = s := by
  cases s with | mk c v => cases c <;> rfl

/-- The mirror reverses the loop: μρμ = ρ⁻¹ = ρ². -/
theorem mirror_reverses (s : State) : mirror (turn (mirror s)) = turn (turn s) := by
  cases s with | mk c v => cases c <;> rfl

/-- So the mirror does not commute with the turn — the group it makes is not C₆. -/
theorem mirror_turn_not_commute : ∃ s : State, mirror (turn s) ≠ turn (mirror s) :=
  ⟨⟨.feeling, true⟩, by decide⟩

/-- The three mirrors μ, μρ, μρ² are all involutions: S₃ has three genuine flips. -/
theorem mirror_turn_involution (s : State) : mirror (turn (mirror (turn s))) = s := by
  cases s with | mk c v => cases c <;> rfl

theorem mirror_turn_two_involution (s : State) :
    mirror (turn (turn (mirror (turn (turn s))))) = s := by
  cases s with | mk c v => cases c <;> rfl

/-- The valence flip commutes with the mirror too: it acts on another coordinate. -/
theorem flip_mirror_commute (s : State) : flip (mirror s) = mirror (flip s) := by
  cases s with | mk c v => cases c <;> cases v <;> rfl

end Affect
