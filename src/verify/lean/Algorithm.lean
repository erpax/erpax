/-
  Algorithm — four textbook algorithms at the size where the kernel can check every amplitude.

  Ported from qpu.uuidna.com (Qpu.Processing.QuantumAlgorithm, same author), on Gate.lean. Each is
  the smallest instance in which the algorithm's whole claim is visible and finite.

  DEUTSCH–JOZSA on two qubits: all sixteen functions {0,1,2,3} → {0,1}. One oracle query between
  two layers of Hadamards leaves ALL weight on |00⟩ for a constant function and NONE for a balanced
  one. Hadamard is unscaled, so "all the weight" reads 16 rather than 1.

  GROVER on four items: from the uniform state, one oracle query and one diffusion leave weight on
  the marked item only. Four items is the size at which one iteration is exact.

  THE FOURIER TRANSFORM on three qubits, over ℤ[ω] with ω the eighth root of unity: the matrix
  ω^(jk) times its inverse is 8 · I. And PHASE ESTIMATION: a register holding ω^(jk) on |j⟩ — the
  phases an eigenvalue e^(2πi·k/8) kicks back — returns exactly |k⟩ under the inverse transform.

  WHAT THIS PROVES: each statement above, on every input in its stated range, by `decide` with no
  axiom.

  WHAT THIS DOES NOT PROVE: anything about scaling. Deutsch–Jozsa's separation, Grover's √N and the
  transform's efficiency are statements about ALL sizes; these are single sizes, and at four items
  Grover's one-iteration exactness is special to four. Phase estimation is exact here because the
  eigenphase is a multiple of 1/8; for other phases the output is a distribution, not a basis
  state. No speed-up over classical computation is claimed or shown.
-/
import Gate

namespace Algorithm
open Gate

/-! ## 1. Deutsch–Jozsa -/

/-- The value of the two-bit function with truth table `f` (bit `x` of `f`). -/
def fval (f x : Nat) : Bool := (f / 2 ^ x) % 2 == 1
/-- The phase oracle of `f`: the sign (−1)^f(x) on basis state `x`. -/
def oracle (f : Nat) : Mat := fun r c => if r = c then (if fval f r then -1 else 1) else 0
/-- Deutsch–Jozsa on two qubits: Hadamards, one oracle query, Hadamards. -/
def dj (f : Nat) : Vec := ap 4 (kron 2 H H) (ap 4 (oracle f) (ap 4 (kron 2 H H) (basis 0)))
/-- A constant function: all zeros or all ones. -/
def constant (f : Nat) : Bool := f == 0 || f == 15
/-- A balanced function: exactly two of its four values are one. -/
def balanced (f : Nat) : Bool := ((List.range 4).filter (fval f)).length == 2

/-- ONE QUERY DECIDES: a constant function leaves all weight on 00, a balanced one leaves none. -/
theorem deutsch_jozsa :
    ∀ f, f < 16 → (constant f = true → (dj f 0).normSq = 16) ∧ (balanced f = true → dj f 0 = 0) := by
  decide +kernel

/-- The promise is not empty on either side: two functions are constant and six are balanced. -/
theorem promise_census :
    ((List.range 16).filter constant).length = 2 ∧ ((List.range 16).filter balanced).length = 6 := by decide

/-! ## 2. Grover -/

/-- The oracle marking item `m`. -/
def mark (m : Nat) : Mat := fun r c => if r = c then (if r = m then -1 else 1) else 0
/-- The diffusion over four items, scaled by two: 2·(2|s⟩⟨s| − I) = J − 2·I. -/
def diffusion : Mat := fun r c => if r = c then -1 else 1
/-- Grover over four items: the uniform state, one oracle query, one diffusion. -/
def grover (m : Nat) : Vec := ap 4 diffusion (ap 4 (mark m) (ap 4 (kron 2 H H) (basis 0)))

/-- ONE GROVER ITERATION OVER FOUR ITEMS LEAVES ALL WEIGHT ON THE MARKED ITEM. -/
theorem grover_search : ∀ m, m < 4 → ∀ r, r < 4 → (grover m r ≠ 0 ↔ r = m) := by decide +kernel

/-! ## 3. The Fourier transform and phase estimation -/

/-- ω to the power `k`, with ω⁸ = 1. -/
def wPow (k : Nat) : ZW := (List.range (k % 8)).foldl (fun x _ => x * ZW.ω) 1
/-- The sum of eight terms. -/
def sum8 (f : Nat → ZW) : ZW := (List.range 8).foldl (fun s i => s + f i) 0
/-- The Fourier transform on three qubits, unscaled: entry (j, k) is ω^(jk). -/
def qft (j k : Nat) : ZW := wPow (j * k)
/-- Its inverse, unscaled: ω^(−jk). -/
def iqft (j k : Nat) : ZW := wPow (8 - j * k % 8)

/-- THE TRANSFORM IS UNITARY UP TO ITS RECORDED SCALE: QFT · QFT† = 8 · I. -/
theorem qft_unitary :
    ∀ j, j < 8 → ∀ k, k < 8 → sum8 (fun i => qft j i * iqft i k) = if j = k then 8 else 0 := by
  decide +kernel

/-- PHASE ESTIMATION IS EXACT ON AN EIGENPHASE k/8: the inverse transform returns |k⟩. -/
theorem phase_estimation_exact :
    ∀ k, k < 8 → ∀ r, r < 8 → sum8 (fun j => iqft r j * wPow (j * k)) = if r = k then 8 else 0 := by
  decide +kernel

end Algorithm
