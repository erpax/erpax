/-
  Clifford — H, S and CNOT act on Pauli strings exactly as the tableau rules say.

  Ported from qpu.uuidna.com (Qpu.Processing.CircuitBasedQuantumComputing, same author), on
  Gate.lean. This is the fact behind the Gottesman–Knill theorem: a circuit of H, S and CNOT can be
  followed on Pauli strings — a few bits per qubit — instead of on the 2ⁿ amplitudes, because each
  of those gates sends a Pauli string to a Pauli string.

  A two-qubit Pauli string is a phase `i^k` and an (x, z) bit pair per qubit; its matrix is
  `i^k · P(x₀, z₀) ⊗ P(x₁, z₁)` with `P(x, z) = i^(x·z) · X^x · Z^z`, so `P(1, 1)` is Y. The rules
  (Aaronson–Gottesman): H swaps x and z and flips the sign of Y; S adds x to z and flips the sign of
  Y; CNOT copies x from control to target and z from target to control, with the sign
  `x_c · z_t · (x_t = z_c)`.

  Each rule is proved EQUAL to the exact conjugation `U · P · U†` of the string's matrix, for all 64
  strings (four phases, sixteen bit patterns). Hadamard is unscaled, so its conjugation carries the
  factor 2.

  WHAT THIS PROVES: on two qubits, the three update rules are the conjugation, for every Pauli
  string, on both qubits. By `decide`, no axiom.

  WHAT THIS DOES NOT PROVE: the Gottesman–Knill theorem itself — that is a statement about circuits
  of any length on any number of qubits, and it follows from these rules by induction that is not
  written here. Nothing covers measurement, or the T gate, which is exactly what takes a circuit
  outside this efficiently-followed class.
-/
import Gate

namespace Clifford
open Gate

/-- A two-qubit Pauli string: the phase `i^k` and the (x, z) bits of the high and the low qubit. -/
structure Pauli2 where
  k : Nat
  x0 : Bool
  z0 : Bool
  x1 : Bool
  z1 : Bool

/-- `i^k`. -/
def ipow : Nat → GI
  | 0 => 1
  | k + 1 => GI.i * ipow k

/-- The one-qubit Pauli `P(x, z) = i^(x·z) · X^x · Z^z`. -/
def pauli (x z : Bool) : Mat := match x, z with
  | false, false => idm
  | true, false => X
  | false, true => Z
  | true, true => Y

/-- The matrix of a Pauli string. -/
def Pauli2.mat (p : Pauli2) : Mat := smul (ipow p.k) (kron 2 (pauli p.x0 p.z0) (pauli p.x1 p.z1))

/-- The sign flip a rule adds: `i² = −1` when `b` holds. -/
def signFlip (k : Nat) (b : Bool) : Nat := (k + if b then 2 else 0) % 4

def ruleH0 (p : Pauli2) : Pauli2 := ⟨signFlip p.k (p.x0 && p.z0), p.z0, p.x0, p.x1, p.z1⟩
def ruleH1 (p : Pauli2) : Pauli2 := ⟨signFlip p.k (p.x1 && p.z1), p.x0, p.z0, p.z1, p.x1⟩
def ruleS0 (p : Pauli2) : Pauli2 := ⟨signFlip p.k (p.x0 && p.z0), p.x0, p.z0 != p.x0, p.x1, p.z1⟩
def ruleS1 (p : Pauli2) : Pauli2 := ⟨signFlip p.k (p.x1 && p.z1), p.x0, p.z0, p.x1, p.z1 != p.x1⟩
/-- CNOT, control the high qubit, target the low. -/
def ruleCNOT (p : Pauli2) : Pauli2 :=
  ⟨signFlip p.k (p.x0 && p.z1 && (p.x1 == p.z0)), p.x0, p.z0 != p.z1, p.x1 != p.x0, p.z1⟩

/-- The gate `u` conjugating the string `p` equals `scale` times the string the rule gives. -/
def Exact (u : Mat) (rule : Pauli2 → Pauli2) (scale : GI) : Prop :=
  ∀ k, k < 4 → ∀ x0 z0 x1 z1 : Bool,
    Same 4 (mm 4 (mm 4 u (Pauli2.mat ⟨k, x0, z0, x1, z1⟩)) (dag u)) (smul scale (rule ⟨k, x0, z0, x1, z1⟩).mat)
instance (u : Mat) (rule : Pauli2 → Pauli2) (scale : GI) : Decidable (Exact u rule scale) := by
  unfold Exact; infer_instance

/-- H ON EITHER QUBIT ACTS ON EVERY PAULI STRING AS ITS RULE SAYS (times its recorded factor 2). -/
theorem stabilizer_hadamard : Exact (kron 2 H idm) ruleH0 2 ∧ Exact (kron 2 idm H) ruleH1 2 := by
  decide +kernel

/-- S on either qubit acts on every Pauli string as its rule says. -/
theorem stabilizer_phase : Exact (kron 2 S idm) ruleS0 1 ∧ Exact (kron 2 idm S) ruleS1 1 := by
  decide +kernel

/-- CNOT acts on every Pauli string as its rule says. -/
theorem stabilizer_cnot : Exact CNOT ruleCNOT 1 := by decide +kernel

end Clifford
