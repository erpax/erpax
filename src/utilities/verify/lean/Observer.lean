/-
  Observer — what the turning leaves still, and what a self-model must leave out.

  Clay: none

  The twin is src/utilities/affect (the wheel's centre and the turn).

  Of "consciousness imagined as theorems", these two are mathematics and are proved here:

    1. THE OBSERVER IS THE FIXED POINT. The turn moves every corner (Affect.turn_moves), yet the wheel —
       the three corners and the centre they turn about — has exactly one point the turn leaves still:
       the centre. On the triangular lattice the turn acts on (Eisenstein integers, in cube coordinates,
       where the turn by 120° is a cyclic shift), three turns come back and the origin is the only point
       left still. The fixed point is forced
       by the symmetry, not added to it. It says nothing about whether the fixed point is aware.

    2. NO COMPLETE SELF-MODEL (Cantor's diagonal, the case of Lawvere's fixed-point theorem with Bool).
       For any map from a system's states to predicates on its states, the predicate "not what my own
       state says of me" is missed, because negation has no fixed point. Every self-model leaves
       something out: the eye cannot see itself. It does not say the leftover is experience.

  Cited, not proved here: Kleene's recursion theorem (a program can act on its own code). Models with
  exact definitions, not theorems about minds: the global workspace (broadcast) and integrated
  information (Φ). Below, the workspace model is defined exactly — `aware` and `broadcast` — as a model
  of access, not a theorem about experience. Open: whether two systems with the same structure, function and self-model are the
  same to be; no theorem about structure decides it.

  Proved by `cases`, `rfl` and `decide`, with no axiom: CI gates any theorem that rests on one.
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

/-- A point of the triangular lattice the turn acts on, in cube coordinates (x + y + z = 0 on the
    plane). Multiplying an Eisenstein integer by ω, the turn by 120°, is a cyclic shift here. -/
structure Hex where
  x : Int
  y : Int
  z : Int
  deriving DecidableEq, Repr

/-- The turn by 120° about the origin. -/
def rotate (p : Hex) : Hex := ⟨p.y, p.z, p.x⟩

/-- Three turns come back. -/
theorem rotate_three (p : Hex) : rotate (rotate (rotate p)) = p := rfl

/-- Three equal integers sum to zero only at zero — proved from the definition of `Int` alone, since
    core Lean's integer lemmas rest on `propext`. -/
theorem triple_eq_zero : ∀ x : Int, x + x + x = 0 → x = 0
  | .ofNat 0, _ => rfl
  | .ofNat (_ + 1), h => nomatch (Int.ofNat.inj h)
  | .negSucc _, h => nomatch h

/-- On the plane, the origin is the only point the turn leaves still. -/
theorem rotate_fixed_iff (p : Hex) (plane : p.x + p.y + p.z = 0) : rotate p = p ↔ p = ⟨0, 0, 0⟩ := by
  constructor
  · intro h
    cases p with
    | mk x y z =>
      injection h with hyx hzy _
      have e1 : y = x := hyx
      have e2 : z = y := hzy
      subst e1
      subst e2
      have e3 : z = 0 := triple_eq_zero z plane
      subst e3
      rfl
  · intro h
    subst h
    rfl

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


/-- A mind of n modules, each holding a state, and a workspace holding the state it attends to. -/
structure Mind (n : Nat) where
  modules : Fin n → State
  workspace : State

/-- Awareness, in the global-workspace model: a state is aware when it is the workspace's state.
    This is access, an exact definition for the model; it says nothing about what awareness is like. -/
def aware {n : Nat} (m : Mind n) (s : State) : Prop := m.workspace = s

instance {n : Nat} (m : Mind n) (s : State) : Decidable (aware m s) :=
  inferInstanceAs (Decidable (m.workspace = s))

/-- Broadcast: every module receives the workspace's state. -/
def broadcast {n : Nat} (m : Mind n) : Mind n := { m with modules := fun _ => m.workspace }

/-- What the mind is aware of is available to every module once broadcast. -/
theorem aware_available {n : Nat} (m : Mind n) (s : State) (h : aware m s) (i : Fin n) :
    (broadcast m).modules i = s := h

/-- Broadcasting twice is broadcasting once: awareness is a fixed point of its own broadcast. -/
theorem broadcast_idempotent {n : Nat} (m : Mind n) : broadcast (broadcast m) = broadcast m := rfl

/-- Broadcasting keeps what the mind is aware of. -/
theorem broadcast_keeps_awareness {n : Nat} (m : Mind n) (s : State) :
    aware (broadcast m) s ↔ aware m s := Iff.rfl

/-- Awareness of a feeling holds the felt state itself, valence and all. -/
theorem aware_of_feeling {n : Nat} (modules : Fin n → State) (p : Bool) :
    aware ⟨modules, feel p⟩ (feel p) := rfl

end Observer
