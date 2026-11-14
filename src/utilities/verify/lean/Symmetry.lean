/-
  Symmetry — what an involution of the zeta zeros can and cannot say about the critical line.

  The functional equation of ζ relates ζ(s) to ζ(1 − s), and ζ(s̄) = conj ζ(s). So the zero set is
  carried to itself by two involutions of the strip:

      σ : s ↦ 1 − s            conj : s ↦ s̄            τ = conj ∘ σ : s ↦ 1 − s̄

  τ is the REFLECTION in the line Re s = ½. An argument "by involution" can therefore say two
  different things, and the Riemann Hypothesis needs the second while the functional equation
  gives only the first:

    · INVARIANT   the zero set is carried to itself by σ and conj      (what symmetry gives)
    · FIXED       every zero is fixed by τ, i.e. lies on Re s = ½       (what the hypothesis says)

  What is proved below, by `simp`, `omega` and `decide` over integer coordinates. No Mathlib, no sorry,
  no axiom of its own: the kernel's report (inventory.generated.json) lists only Lean's three standard
  axioms (propext, Classical.choice, Quot.sound) under these theorems.

    1. σ, conj and τ are involutions.
    2. The critical line is EXACTLY the fixed set of τ.
    3. A set closed under σ and conj can lie OFF the line: an explicit one is checked.
    4. Hence "closed under the involutions" does not imply "fixed by τ", and a point is on the
       line iff its τ-orbit collapses, off it iff the orbit splits.

  What is NOT proved, and cannot be by this file: whether the zeros of ζ lie on the line. The model
  is the strip's symmetry group acting on coordinates, not ζ. Theorem 3 shows only that an argument
  using nothing but these involutions cannot decide the question; it proves nothing about the truth
  of the Riemann Hypothesis in either direction.

  Coordinates are in quarters so the strip's points stay integral: a point (a, b) is
  s = a/4 + (b/4)·i, the critical line Re s = ½ is a = 2, and the open strip is 0 < a < 4.
-/

namespace Symmetry

/-- A point of the strip, in quarters: Re s = a / 4, Im s = b / 4. -/
structure P where
  a : Int
  b : Int
  deriving DecidableEq, Repr

/-- σ : s ↦ 1 − s  (the functional equation's involution). -/
def sigma (p : P) : P := ⟨4 - p.a, -p.b⟩

/-- conj : s ↦ s̄. -/
def conj (p : P) : P := ⟨p.a, -p.b⟩

/-- τ = conj ∘ σ : s ↦ 1 − s̄, the reflection in the line Re s = ½. -/
def tau (p : P) : P := conj (sigma p)

/-- σ∘σ = id: going through the functional equation twice returns the point. -/
theorem sigma_is_an_involution (p : P) : sigma (sigma p) = p := by
  cases p; simp only [sigma, P.mk.injEq]; omega

/-- conj∘conj = id. -/
theorem conj_is_an_involution (p : P) : conj (conj p) = p := by
  cases p; simp [conj]

/-- τ∘τ = id. -/
theorem tau_is_an_involution (p : P) : tau (tau p) = p := by
  cases p; simp [tau, conj, sigma]; omega

/-- THE LINE IS THE FIXED SET OF τ: a point is fixed by the reflection iff Re s = ½. -/
theorem the_critical_line_is_the_fixed_set (p : P) : tau p = p ↔ p.a = 2 := by
  cases p; simp only [tau, conj, sigma, P.mk.injEq]; omega

/-- A set of points closed under σ and conj — what the symmetries of ζ give about its zeros. -/
def Invariant (S : List P) : Prop := ∀ q ∈ S, sigma q ∈ S ∧ conj q ∈ S

/-- An off-line configuration: Re = ¼ and ¾, Im = ±¾. The four points of one symmetry orbit. -/
def offLine : List P := [⟨1, 3⟩, ⟨3, -3⟩, ⟨1, -3⟩, ⟨3, 3⟩]

/-- The off-line configuration is closed under σ and conj, checked point by point. -/
theorem off_line_is_invariant : Invariant offLine := by
  unfold Invariant offLine; decide

/-- ...and it contains points that are not on the line Re s = ½. -/
theorem off_line_leaves_the_line : ∃ q ∈ offLine, q.a ≠ 2 :=
  ⟨⟨1, 3⟩, by unfold offLine; decide, by decide⟩

/-- SYMMETRY DOES NOT FORCE THE LINE: a set closed under both involutions need not lie on Re s = ½.
    So "the zeros are invariant under σ and conj" — all the functional equation gives — does not
    imply "the zeros are fixed by τ". The step from invariant to fixed is the whole hypothesis. -/
theorem symmetry_does_not_force_the_line :
    ∃ S : List P, Invariant S ∧ ∃ q ∈ S, q.a ≠ 2 :=
  ⟨offLine, off_line_is_invariant, off_line_leaves_the_line⟩

/-- On the line the reflection does nothing: the orbit collapses. -/
theorem on_line_the_orbit_collapses (p : P) (h : p.a = 2) : tau p = p :=
  (the_critical_line_is_the_fixed_set p).mpr h

/-- Off the line the reflection moves the point: the orbit splits into distinct points. -/
theorem off_line_the_orbit_splits (p : P) (h : p.a ≠ 2) : tau p ≠ p :=
  fun e => h ((the_critical_line_is_the_fixed_set p).mp e)

end Symmetry
