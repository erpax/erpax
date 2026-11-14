/-
  Gate — the standard gates as exact matrices, and their unitarity as kernel-decided theorems.

  Ported from qpu.uuidna.com (Qpu.Physics.HilbertSpace · Qpu.Physics.Operator ·
  Qpu.Processing.QuantumGate, same author). Register.lean carries a circuit on integer amplitudes
  and says unitarity "in general" is out of the core kernel's reach. This file takes the other
  half that IS in reach: each gate is a concrete matrix, so `U · U† = I` is a finite check over its
  entries and `decide` closes it.

  Amplitudes are GAUSSIAN INTEGERS `re + im·i`, never floats. Hadamard is kept UNSCALED —
  [[1, 1], [1, −1]] — so its unitarity reads `H · H† = 2 · I`: the √2 is recorded as the factor 2
  rather than divided out, the same bookkeeping Register.lean calls a halving. The T gate needs the
  eighth root of unity, so it lives over ℤ[ω] with ω⁴ = −1.

  WHAT THIS PROVES: H, X, Z, S, CNOT, SWAP and Toffoli are unitary (H up to its recorded scale);
  X, CNOT, SWAP and Toffoli are their own inverses; S² = Z; T is unitary, has order exactly 8, and
  does not commute with H. All by `decide`, no axiom.

  WHAT THIS DOES NOT PROVE: any physics, and nothing about a device. It also does not prove that
  {H, S, CNOT, T} is a universal gate set — that is a density theorem about the group they
  generate, and non-commutation of H and T is a necessary step toward it, not the theorem.
-/

namespace Gate

/-! ## 1. The state space — Gaussian integers and vectors of them -/

/-- A Gaussian integer `re + im·i`. -/
structure GI where
  re : Int
  im : Int
deriving DecidableEq, Repr

namespace GI
instance (n : Nat) : OfNat GI n := ⟨⟨n, 0⟩⟩
instance : Add GI := ⟨fun a b => ⟨a.re + b.re, a.im + b.im⟩⟩
instance : Neg GI := ⟨fun a => ⟨-a.re, -a.im⟩⟩
instance : Mul GI := ⟨fun a b => ⟨a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re⟩⟩
/-- The imaginary unit. -/
def i : GI := ⟨0, 1⟩
/-- The complex conjugate. -/
def conj (a : GI) : GI := ⟨a.re, -a.im⟩
/-- The squared modulus: a measurement weight. -/
def normSq (a : GI) : Int := a.re * a.re + a.im * a.im

end GI

/-- The parts of a sum, a product and the literals 0 and 1 — what a proof over ALL matrices unfolds
    to. Stated at the file's own namespace so the inventory names each one. -/
theorem gi_add_re (x y : GI) : (x + y).re = x.re + y.re := rfl
theorem gi_add_im (x y : GI) : (x + y).im = x.im + y.im := rfl
theorem gi_mul_re (x y : GI) : (x * y).re = x.re * y.re - x.im * y.im := rfl
theorem gi_zero_re : (0 : GI).re = 0 := rfl
theorem gi_one_re : (1 : GI).re = 1 := rfl
theorem gi_zero_im : (0 : GI).im = 0 := rfl
theorem gi_one_im : (1 : GI).im = 0 := rfl

/-- The sum of `f k` for `k < n`. -/
def sumTo (n : Nat) (f : Nat → GI) : GI := (List.range n).foldl (fun acc k => acc + f k) 0

/-- A state: its amplitude on each basis index. -/
abbrev Vec := Nat → GI
/-- The basis state `b`. -/
def basis (b : Nat) : Vec := fun r => if r = b then 1 else 0

/-! ## 2. Operators — matrices read on the indices below their dimension -/

abbrev Mat := Nat → Nat → GI

/-- The product of two `n × n` matrices. -/
def mm (n : Nat) (a b : Mat) : Mat := fun r c => sumTo n fun k => a r k * b k c
/-- The conjugate transpose. -/
def dag (a : Mat) : Mat := fun r c => GI.conj (a c r)
/-- The identity. -/
def idm : Mat := fun r c => if r = c then 1 else 0
/-- A scalar times a matrix. -/
def smul (k : GI) (a : Mat) : Mat := fun r c => k * a r c
/-- The Kronecker product of `a` with an `m × m` matrix `b`. -/
def kron (m : Nat) (a b : Mat) : Mat := fun r c => a (r / m) (c / m) * b (r % m) (c % m)
/-- The permutation matrix sending basis state `c` to `p c`. -/
def perm (p : Nat → Nat) : Mat := fun r c => if r = p c then 1 else 0
/-- The matrix `u` applied to the `n`-dimensional state `v`. -/
def ap (n : Nat) (u : Mat) (v : Vec) : Vec := fun r => sumTo n fun k => u r k * v k

/-- Two matrices agree on every entry below `n`. -/
def Same (n : Nat) (a b : Mat) : Prop := ∀ r, r < n → ∀ c, c < n → a r c = b r c
instance (n : Nat) (a b : Mat) : Decidable (Same n a b) := by unfold Same; infer_instance

/-! ## 3. The gates -/

/-- Hadamard, unscaled: [[1, 1], [1, −1]]. -/
def H : Mat := fun r c => if r = 1 ∧ c = 1 then -1 else 1
/-- Pauli X: the bit flip. -/
def X : Mat := perm fun c => 1 - c
/-- Pauli Z: the phase flip. -/
def Z : Mat := fun r c => if r = c then (if r = 0 then 1 else -1) else 0
/-- Pauli Y = i·X·Z. -/
def Y : Mat := smul GI.i (mm 2 X Z)
/-- The phase gate S = diag(1, i). -/
def S : Mat := fun r c => if r = c then (if r = 0 then 1 else GI.i) else 0
/-- CNOT on two qubits, the control the high bit: |c t⟩ ↦ |c, t ⊕ c⟩. -/
def CNOT : Mat := perm fun c => if c = 2 then 3 else if c = 3 then 2 else c
/-- SWAP on two qubits. -/
def SWAP : Mat := perm fun c => if c = 1 then 2 else if c = 2 then 1 else c
/-- Toffoli on three qubits: the low bit flips when both high bits are set. -/
def TOFFOLI : Mat := perm fun c => if c = 6 then 7 else if c = 7 then 6 else c

/-- HADAMARD IS UNITARY UP TO ITS RECORDED SCALE: H · H† = 2 · I. -/
theorem h_unitary : Same 2 (mm 2 H (dag H)) (smul 2 idm) := by decide

/-- Hadamard twice is twice the identity — it undoes itself, with the same factor 2. -/
theorem h_squared : Same 2 (mm 2 H H) (smul 2 idm) := by decide

/-- X, Z and S are unitary: U · U† = I. -/
theorem paulis_unitary :
    Same 2 (mm 2 X (dag X)) idm ∧ Same 2 (mm 2 Z (dag Z)) idm ∧ Same 2 (mm 2 S (dag S)) idm := by decide

/-- Y is unitary and its own inverse, like the other Paulis. -/
theorem y_unitary : Same 2 (mm 2 Y (dag Y)) idm ∧ Same 2 (mm 2 Y Y) idm := by decide

/-- S squared is Z. -/
theorem s_squared : Same 2 (mm 2 S S) Z := by decide

/-- CNOT is unitary and its own inverse. -/
theorem cnot : Same 4 (mm 4 CNOT (dag CNOT)) idm ∧ Same 4 (mm 4 CNOT CNOT) idm := by decide

/-- SWAP is unitary and its own inverse. -/
theorem swap : Same 4 (mm 4 SWAP (dag SWAP)) idm ∧ Same 4 (mm 4 SWAP SWAP) idm := by decide

/-- Toffoli is unitary and its own inverse. -/
theorem toffoli : Same 8 (mm 8 TOFFOLI (dag TOFFOLI)) idm ∧ Same 8 (mm 8 TOFFOLI TOFFOLI) idm := by
  decide +kernel

/-! ## 4. The T gate — over ℤ[ω], ω the eighth root of unity -/

/-- An element `a₀ + a₁ω + a₂ω² + a₃ω³` of ℤ[ω], with ω⁴ = −1. -/
structure ZW where
  a0 : Int
  a1 : Int
  a2 : Int
  a3 : Int
deriving DecidableEq, Repr

namespace ZW
instance (n : Nat) : OfNat ZW n := ⟨⟨n, 0, 0, 0⟩⟩
instance : Add ZW := ⟨fun x y => ⟨x.a0 + y.a0, x.a1 + y.a1, x.a2 + y.a2, x.a3 + y.a3⟩⟩
instance : Neg ZW := ⟨fun x => ⟨-x.a0, -x.a1, -x.a2, -x.a3⟩⟩
/-- The product, reduced by ω⁴ = −1. -/
instance : Mul ZW := ⟨fun x y =>
  ⟨x.a0 * y.a0 - x.a1 * y.a3 - x.a2 * y.a2 - x.a3 * y.a1,
   x.a0 * y.a1 + x.a1 * y.a0 - x.a2 * y.a3 - x.a3 * y.a2,
   x.a0 * y.a2 + x.a1 * y.a1 + x.a2 * y.a0 - x.a3 * y.a3,
   x.a0 * y.a3 + x.a1 * y.a2 + x.a2 * y.a1 + x.a3 * y.a0⟩⟩
/-- ω, the eighth root of unity. -/
def ω : ZW := ⟨0, 1, 0, 0⟩
/-- The complex conjugate: ω̄ = ω⁻¹ = −ω³. -/
def conj (x : ZW) : ZW := ⟨x.a0, -x.a3, -x.a2, -x.a1⟩
end ZW

/-- A 2 × 2 matrix over ℤ[ω]. -/
abbrev MatW := Nat → Nat → ZW
def mmW (a b : MatW) : MatW := fun r c => a r 0 * b 0 c + a r 1 * b 1 c
def dagW (a : MatW) : MatW := fun r c => ZW.conj (a c r)
def idW : MatW := fun r c => if r = c then 1 else 0
def SameW (a b : MatW) : Prop := ∀ r, r < 2 → ∀ c, c < 2 → a r c = b r c
instance (a b : MatW) : Decidable (SameW a b) := by unfold SameW; infer_instance
/-- The `k`-th power. -/
def powW (a : MatW) : Nat → MatW
  | 0 => idW
  | k + 1 => mmW a (powW a k)

/-- The T gate diag(1, ω). -/
def TW : MatW := fun r c => if r = c then (if r = 0 then 1 else ZW.ω) else 0
/-- Hadamard over ℤ[ω], unscaled. -/
def HW : MatW := fun r c => if r = 1 ∧ c = 1 then -1 else 1

/-- ω really is a primitive eighth root: ω⁴ = −1, so ω⁸ = 1 and no smaller power is. -/
theorem omega_fourth : ZW.ω * ZW.ω * ZW.ω * ZW.ω = -1 := by decide

/-- T IS UNITARY, HAS ORDER EXACTLY 8 (T⁸ = I, T⁴ ≠ I), AND DOES NOT COMMUTE WITH HADAMARD. -/
theorem t_gate :
    SameW (mmW TW (dagW TW)) idW ∧ SameW (powW TW 8) idW ∧ ¬ SameW (powW TW 4) idW
      ∧ ¬ SameW (mmW HW TW) (mmW TW HW) := by
  decide

end Gate
