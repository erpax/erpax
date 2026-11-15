/-
  Observer — what the turning leaves still, and what a self-model must leave out.

  The twin is src/utilities/affect (the wheel's centre and the turn).

  Of "consciousness imagined as theorems", these two are mathematics and are proved here:

    1. THE OBSERVER IS THE FIXED POINT. The turn moves every corner (Affect.turn_moves), yet the wheel —
       the three corners and the centre they turn about — has exactly one point the turn leaves still:
       the centre. On the plane lattice the turn acts on (Eisenstein integers a + bω, where multiplying
       by ω turns by 120°), z·ω = z only at z = 0, and three turns come back. The fixed point is forced
       by the symmetry, not added to it. It says nothing about whether the fixed point is aware.

    2. NO COMPLETE SELF-MODEL (Cantor's diagonal, the case of Lawvere's fixed-point theorem with Bool).
       For any map from a system's states to predicates on its states, the predicate "not what my own
       state says of me" is missed, because negation has no fixed point. Every self-model leaves
       something out: the eye cannot see itself. It does not say the leftover is experience.

  Cited, not proved here: Kleene's recursion theorem (a program can act on its own code). Models with
  exact definitions, not theorems about minds: the global workspace (broadcast) and integrated
  information (Φ). Open: whether two systems with the same structure, function and self-model are the
  same to be; no theorem about structure decides it.

  Proved by `cases`, `rfl`, `decide` and `omega`; the kernel's report lists each theorem's axioms.
-/
import Affect

namespace Observer

open Affect

/-- A point of the wheel: one of the three corners, or the centre they turn about. -/
inductive Point where
  | corner (c : Corner)
  | centre
  deriving DecidableEq, Repr

/-- The turn on the wheel: the corners advance, the centre stays where it is. -/
def turnPoint : Point → Point
  | .corner c => .corner (next c)
  | .centre => .centre

/-- The centre is left still. -/
theorem centre_fixed : turnPoint .centre = .centre := rfl

/-- It is the only point left still: a point is fixed by the turn exactly when it is the centre. -/
theorem fixed_iff_centre (p : Point) : turnPoint p = p ↔ p = .centre := by
  cases p with
  | corner c => cases c <;> decide
  | centre => decide

/-- A point of the Eisenstein lattice: a + bω, with ω² + ω + 1 = 0. -/
structure Eisenstein where
  a : Int
  b : Int
  deriving DecidableEq, Repr

/-- Multiply by ω, the turn by 120°: (a + bω)·ω = −b + (a − b)ω. -/
def rotate (z : Eisenstein) : Eisenstein := ⟨-z.b, z.a - z.b⟩

/-- Three turns come back. -/
theorem rotate_three (z : Eisenstein) : rotate (rotate (rotate z)) = z := by
  cases z with
  | mk a b => simp only [rotate, Eisenstein.mk.injEq]; omega

/-- The origin is the only point the turn leaves still. -/
theorem rotate_fixed_iff (z : Eisenstein) : rotate z = z ↔ z = ⟨0, 0⟩ := by
  cases z with
  | mk a b => simp only [rotate, Eisenstein.mk.injEq]; omega

/-- Negation has no fixed point. -/
theorem negation_no_fixed_point (b : Bool) : (!b) ≠ b := by
  cases b <;> decide

/-- Cantor's diagonal: no state's model is the predicate "not what my own state says of me". -/
theorem diagonal_missed {α : Type} (model : α → α → Bool) (s : α) :
    model s ≠ fun x => !(model x x) := by
  intro h
  exact negation_no_fixed_point (model s s) (congrFun h s).symm

/-- So no self-model is complete: some predicate on the states is the model of no state. -/
theorem no_complete_self_model {α : Type} (model : α → α → Bool) :
    ∃ p : α → Bool, ∀ s, model s ≠ p :=
  ⟨fun x => !(model x x), diagonal_missed model⟩

end Observer
