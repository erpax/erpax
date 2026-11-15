/-
  Gap — why a symmetry that survives rescaling cannot force a mass gap.

  Clay: yang-mills meta

  The Yang–Mills problem asks for a quantum theory on ℝ⁴ whose spectrum has a MASS GAP: the lowest
  energy above the vacuum is some Δ > 0. Classical Yang–Mills in four dimensions has no scale: its
  symmetries survive rescaling, while a gap is a scale. An argument that uses only invariance under
  such a symmetry would need the symmetry to bound the gap from below. This file shows, in a finite
  model, that it cannot: one family of spectra keeps the same internal symmetry at every scale while
  its gap, measured in absolute units, is 1/k and shrinks toward zero. The gap has to come from
  something the symmetry does not carry (in the physics, the quantum breaking of scale invariance).

  A spectrum lists the energies of four states in units of 1/scale. The internal symmetry exchanges
  state i with state i + 2 (mod 4). family k has levels [0, 1, 0, 1] at scale k: the vacuum level 0,
  and the first excitation at 1/k.

  What is proved, by `decide` alone, for every k from 1 to 8:
    1. family k is invariant under the symmetry.
    2. Its gap is 1 unit of 1/k: the first excitation is one unit above the vacuum.
    3. The gap strictly shrinks as k grows: 1/(k + 1) < 1/k.

  What is NOT proved: anything about quantum Yang–Mills theory, its existence or its spectrum. The
  file shows only that invariance under a scale-free symmetry is compatible with gaps as small as one
  likes, so such invariance alone cannot prove Δ > 0.
-/

namespace Gap

/-- The energies of four states, in units of 1/scale. -/
structure Spectrum where
  levels : List Nat
  scale : Nat

/-- The n-th entry, 0 past the end. Structural recursion, so a `decide` over it rests on no axiom
    (the library's defaulting lookup carries propext). -/
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, n + 1 => nth xs n

/-- The internal symmetry: state i ↔ state i + 2 (mod 4). -/
def shift (i : Nat) : Nat := (i + 2) % 4

/-- Invariant: every state has the energy of its image under the symmetry. -/
def invariant (s : Spectrum) : Bool :=
  (List.range 4).all (fun i => nth s.levels (shift i) == nth s.levels i)

/-- The vacuum level: the lowest energy. -/
def vacuum (s : Spectrum) : Nat := s.levels.foldl min (s.levels.headD 0)

/-- The gap, in units of 1/scale: the lowest level above the vacuum, minus the vacuum (0 if none). -/
def gap (s : Spectrum) : Nat :=
  match s.levels.filter (fun e => decide (e > vacuum s)) with
  | [] => 0
  | e :: es => es.foldl min e - vacuum s

/-- The same levels at scale k: the first excitation sits at 1/k. -/
def family (k : Nat) : Spectrum := ⟨[0, 1, 0, 1], k⟩

theorem invariant_at_every_scale : ∀ k, k < 9 → invariant (family k) = true := by decide

theorem gap_is_one_unit_of_one_over_k : ∀ k, k < 9 → 1 ≤ k → gap (family k) = 1 ∧ (family k).scale = k := by decide

/-- 1/(k + 1) < 1/k, compared with denominators cleared. -/
theorem gap_shrinks_with_scale :
    ∀ k, k < 8 → 1 ≤ k → gap (family (k + 1)) * (family k).scale < gap (family k) * (family (k + 1)).scale := by
  decide

end Gap
