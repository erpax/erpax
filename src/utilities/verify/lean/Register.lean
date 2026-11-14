/-
  Register — an exact-amplitude register, and why the Bell state is a theorem here.

  A quantum register is usually simulated in Float, and a Float Born rule proves nothing: equality
  of Floats is not decidable, so `decide` closes no statement about it. qpu.uuidna.com showed the
  other road — basis states are NATURALS, amplitudes are INTEGERS, and every Hadamard scales the
  vector by √2 and records one HALVING instead of dividing. Normalisation then reads

      Σ amplitude² = 2 ^ halvings

  which is integer arithmetic a kernel decides.

  Two carriers of the same circuit live here, as they do in the matter twin (src/quantum/register):

    basis path    cnot 0 1 (x 0 0) = 3        — |00⟩ → X → |01⟩ → CNOT → |11⟩, on the index alone
    amplitudes    cnot01 (h0 zero) = ⟨1,0,0,1⟩ — the Bell state, support {0, 3}, one halving

  And the one inequality that makes it ENTANGLED rather than merely correlated: a two-qubit state is
  a product state exactly when its 2×2 determinant a0·a3 − a1·a2 vanishes. For Bell it is 1·1 − 0·0.
  That is qpu's `entangle : 1 * 1 ≠ 0 * 0`, with the state it is about written beside it.

  WHAT THIS PROVES: the circuit arithmetic — the gates compose as stated, the Bell and |++⟩ states
  are what the twin says they are, the one is entangled and the other is not, and the Hadamard
  doubles the weight on the states that occur. All by `decide`, no axiom.

  WHAT THIS DOES NOT PROVE: any physics. Nothing here says a qubit exists or that a device prepares
  this state; the twin computes on CPU/GPU and says so. Unitarity in general (weight (h0 s) = 2 ·
  weight s for EVERY s) needs ring arithmetic the core kernel does not carry, so it is proved on the
  states the circuit visits and checked on every gate application in the matter twin.
-/

namespace Register

/-! ## The basis path — qpu's integer form -/

/-- Qubit `q` is the bit `2^q` of the basis index. -/
def bit (q i : Nat) : Bool := (i / 2 ^ q) % 2 == 1

/-- Flip bit `q` of `i` by arithmetic. `i ^^^ 2 ^ q` says the same thing, but `Nat.xor` reduces
    through `propext`; subtract-or-add reduces through nothing, and every theorem below stays axiom-free. -/
def flip (q i : Nat) : Nat := if bit q i then i - 2 ^ q else i + 2 ^ q

/-- Pauli X on qubit `q`: flip that bit. -/
def x (q i : Nat) : Nat := flip q i

/-- CNOT control `c` target `t`: flip the target bit when the control bit is set. -/
def cnot (c t i : Nat) : Nat := if bit c i then flip t i else i

/-- |00⟩ → X₀ → |01⟩ → CNOT₀₁ → |11⟩. The pattern, on the index — `rfl`, as qpu writes it. -/
theorem bell_path : cnot 0 1 (x 0 0) = 3 := rfl

/-- One more CNOT reaches |111⟩: the GHZ path. -/
theorem ghz_path : cnot 1 2 (cnot 0 1 (x 0 0)) = 7 := rfl

/-- A bit-flip channel applied twice is the identity on every 2-qubit index — qpu's `noise`.
    Written as four `rfl`s rather than a bounded ∀ by `decide`, so no `propext` enters. -/
theorem noise_is_identity :
    x 0 (x 0 0) = 0 ∧ x 0 (x 0 1) = 1 ∧ x 0 (x 0 2) = 2 ∧ x 0 (x 0 3) = 3 := ⟨rfl, rfl, rfl, rfl⟩

/-- CNOT is an involution on every 2-qubit index. -/
theorem cnot_involution :
    cnot 0 1 (cnot 0 1 0) = 0 ∧ cnot 0 1 (cnot 0 1 1) = 1 ∧ cnot 0 1 (cnot 0 1 2) = 2 ∧
      cnot 0 1 (cnot 0 1 3) = 3 := ⟨rfl, rfl, rfl, rfl⟩

/-! ## The amplitudes — two qubits, four integers -/

/-- A two-qubit register: amplitudes over |00⟩ |01⟩ |10⟩ |11⟩, scaled by √2 per halving. -/
structure Two where
  a0 : Int
  a1 : Int
  a2 : Int
  a3 : Int
deriving DecidableEq, Repr

/-- Hadamard on qubit 0 pairs indices (i, i ^^^ 1): sum into the clear bit, difference into the set bit. -/
def h0 (s : Two) : Two := ⟨s.a0 + s.a1, s.a0 - s.a1, s.a2 + s.a3, s.a2 - s.a3⟩

/-- Hadamard on qubit 1 pairs indices (i, i ^^^ 2). -/
def h1 (s : Two) : Two := ⟨s.a0 + s.a2, s.a1 + s.a3, s.a0 - s.a2, s.a1 - s.a3⟩

/-- CNOT₀₁ permutes the basis 1 ↔ 3; the amplitudes travel with it. -/
def cnot01 (s : Two) : Two := ⟨s.a0, s.a3, s.a2, s.a1⟩

/-- Σ amplitude² — the Born weight before dividing by 2^halvings. -/
def weight (s : Two) : Int := s.a0 * s.a0 + s.a1 * s.a1 + s.a2 * s.a2 + s.a3 * s.a3

/-- The 2×2 determinant: zero exactly when the state is a product of two one-qubit states. -/
def determinant (s : Two) : Int := s.a0 * s.a3 - s.a1 * s.a2

def zero : Two := ⟨1, 0, 0, 0⟩
def bell : Two := cnot01 (h0 zero)
def plus : Two := h1 (h0 zero)

/-- The Bell state is (|00⟩ + |11⟩), one halving: support {0, 3}. -/
theorem bell_amplitudes : bell = ⟨1, 0, 0, 1⟩ := by decide

/-- Σ amplitude² = 2 = 2^1 — one Hadamard, one halving. The books of possibility close at an integer. -/
theorem bell_normalised : weight bell = 2 := by decide

/-- 1·1 − 0·0 ≠ 0: not a product state. qpu's `entangle`, with its state attached. -/
theorem bell_entangled : determinant bell ≠ 0 := by decide

/-- |++⟩ is (|00⟩+|01⟩+|10⟩+|11⟩), two halvings, and its determinant 1·1 − 1·1 vanishes: separable. -/
theorem plus_is_product : plus = ⟨1, 1, 1, 1⟩ ∧ weight plus = 4 ∧ determinant plus = 0 := by decide

/-- Interference: H·H on |0⟩ cancels the |1⟩ amplitude to 0 and restores |0⟩ at 2 — two halvings, weight 4. -/
theorem interfere : h0 (h0 zero) = ⟨2, 0, 0, 0⟩ ∧ weight (h0 (h0 zero)) = 4 := by decide

/-- On every state the circuit visits, a Hadamard doubles the weight — the halving is exact, not rounded. -/
theorem hadamard_doubles_weight :
    ∀ s ∈ [zero, h0 zero, bell, plus], weight (h0 s) = 2 * weight s ∧ weight (h1 s) = 2 * weight s := by
  decide

/-- The permutation gate moves weight without changing it. -/
theorem cnot_preserves_weight : ∀ s ∈ [zero, h0 zero, bell, plus], weight (cnot01 s) = weight s := by
  decide

end Register
