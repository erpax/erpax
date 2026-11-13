/-
  Entangle — the Bell and GHZ states from their circuits, and the CHSH bound they break.

  Ported from qpu.uuidna.com (Qpu.Physics.QuantumEntanglement, same author), on the exact matrices
  of Gate.lean. Register.lean already shows the Bell state is entangled by its determinant. This
  file adds the statement that makes entanglement an OBSERVABLE difference rather than a property
  of a vector: the CHSH test.

  A CHSH test reads two ±1 observables on each side and forms S = a₀b₀ + a₀b₁ + a₁b₀ − a₁b₁. If the
  four values are DEFINITE before they are read, S is ±2 — there are only sixteen assignments and
  the kernel checks all of them. The Bell state gives S = 2√2.

  The √2 is never written. Hadamard is unscaled, so ⟨Φ|Φ⟩ = 2, and Bob's observables Z ± X are left
  unnormalised, each a factor √2 too large. The exact sum is therefore 8 = S · 2 · √2, and
  S² = 8² / (2² · 2) = 8 > 4. Every number in that line is an integer the kernel decides.

  WHAT THIS PROVES: the two circuits produce exactly the states claimed — support {00, 11} and
  {000, 111}, equal weight; every definite-value assignment gives |S| = 2; the Bell state's exact
  CHSH sum is 8, which is S² = 8 after the recorded scales. All by `decide`, no axiom.

  WHAT THIS DOES NOT PROVE: that any experiment was run, or that 2√2 is the largest value quantum
  mechanics allows (Tsirelson's bound is a statement over ALL states and observables; this is one
  state and one choice). It computes the numbers a register would have to SHOW to count as quantum
  — a register whose contents are definite bits computes them without showing them.
-/
import Gate

namespace Entangle
open Gate

/-- Bell: Hadamard on the high qubit of |00⟩, then CNOT. -/
def bell : Vec := ap 4 CNOT (ap 4 (kron 2 H idm) (basis 0))

/-- THE BELL STATE IS SUPPORTED ON EXACTLY 00 AND 11, WITH EQUAL WEIGHT. -/
theorem bell_state :
    (∀ r, r < 4 → (bell r ≠ 0 ↔ r = 0 ∨ r = 3)) ∧ (bell 0).normSq = (bell 3).normSq := by decide

/-- GHZ on three qubits: Hadamard on the top qubit, then CNOT down the line. -/
def ghz : Vec := ap 8 (kron 4 idm CNOT) (ap 8 (kron 2 CNOT idm) (ap 8 (kron 4 H idm) (basis 0)))

/-- The GHZ state is supported on exactly 000 and 111, with equal weight. -/
theorem ghz_state :
    (∀ r, r < 8 → (ghz r ≠ 0 ↔ r = 0 ∨ r = 7)) ∧ (ghz 0).normSq = (ghz 7).normSq := by decide +kernel

/-- A CHSH test with definite values: the four ±1 outcomes `a₀ a₁ b₀ b₁`. -/
def chshClassical (a0 a1 b0 b1 : Bool) : Int :=
  let v := fun b : Bool => if b then (1 : Int) else -1
  v a0 * v b0 + v a0 * v b1 + v a1 * v b0 - v a1 * v b1

/-- EVERY ASSIGNMENT OF DEFINITE VALUES GIVES |S| = 2 — the classical bound, all sixteen cases. -/
theorem chsh_classical_bound :
    ∀ a0 a1 b0 b1 : Bool, chshClassical a0 a1 b0 b1 = 2 ∨ chshClassical a0 a1 b0 b1 = -2 := by decide

/-- The correlation ⟨Φ|A ⊗ B|Φ⟩ of the Bell state, unnormalised. -/
def corr (a b : Mat) : GI := sumTo 4 fun r => GI.conj (bell r) * ap 4 (kron 2 a b) bell r
/-- Bob's two observables scaled by √2: Z + X and Z − X. -/
def bobPlus : Mat := fun r c => Z r c + X r c
def bobMinus : Mat := fun r c => Z r c + -(X r c)
/-- The CHSH sum of the Bell state, with ⟨Φ|Φ⟩ = 2 and Bob's scale √2 left in. -/
def chshBell : GI := corr Z bobPlus + corr Z bobMinus + corr X bobPlus + -(corr X bobMinus)

/-- THE BELL STATE BREAKS THE BOUND: the scaled sum is 8 = S · ⟨Φ|Φ⟩ · √2, so
    S² = 8² / (2² · 2) = 8, beyond the classical 2² = 4. -/
theorem chsh_quantum_value : chshBell = 8 ∧ (8 : Nat) ^ 2 = 8 * (2 ^ 2 * 2) ∧ (2 : Nat) ^ 2 < 8 := by
  decide +kernel

end Entangle
