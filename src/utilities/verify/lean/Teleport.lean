/-
  Teleport — one shared Bell pair exchanges a qubit for two classical bits, both ways.

  Ported from qpu.uuidna.com (Qpu.Communication.QuantumCommunication, same author), on Gate.lean
  and Entangle.lean. Two protocols over the same resource, each the other read backwards.

  TELEPORTATION, on three qubits with the measurements deferred — the corrections are applied as
  the controlled gates they would condition. Qubits 1 and 2 are made a Bell pair; qubit 0 is
  entangled with qubit 1 by CNOT and turned by Hadamard; then qubit 1 corrects qubit 2 by X and
  qubit 0 corrects it by Z. For each basis input on qubit 0, every outcome of qubits 0 and 1 leaves
  qubit 2 holding that input, with equal weight. The circuit is linear, so the basis cases carry
  every input.

  NO SIGNALLING. Before the corrections, qubit 2 alone is in the same state whatever was sent: its
  reduced density is diagonal with equal weights. Nothing of the input crosses until the two
  classical bits do. Checked on the six Pauli eigenstates.

  SUPERDENSE CODING runs the exchange the other way: Alice writes two classical bits on her half of
  the pair with I, X, Z or ZX, and Bob's CNOT then Hadamard returns exactly those bits.

  WHAT THIS PROVES: the three circuits compute what is claimed, entry by entry, by `decide` with no
  axiom.

  WHAT THIS DOES NOT PROVE: no-signalling for every input — it is checked on six states, and the
  step from those to all inputs (a density matrix is determined by its Pauli expectations) is the
  usual argument, not a theorem here. Nothing is transmitted and no device is modelled; the
  deferred-measurement form is an equivalent circuit, not a measurement.
-/
import Gate
import Entangle

namespace Teleport
open Gate Entangle

/-- Z on qubit 2 controlled by qubit 0. -/
def cz02 : Mat := fun r c => if r = c then (if (r / 4) % 2 = 1 ∧ r % 2 = 1 then -1 else 1) else 0

/-- Qubits 0 and 1 entangled with the Bell pair and turned, before any correction, for input `v`. -/
def sentFrom (v : Vec) : Vec :=
  let input : Vec := fun r => if r % 4 = 0 then v (r / 4) else 0
  let bellPair := ap 8 (kron 4 idm CNOT) (ap 8 (kron 4 idm (kron 2 H idm)) input)
  ap 8 (kron 4 H idm) (ap 8 (kron 2 CNOT idm) bellPair)

/-- The reduced density of qubit 2: entry (i, j) summed over the outcomes of qubits 0 and 1. -/
def reduced2 (v : Vec) (i j : Nat) : GI := sumTo 4 fun m => v (2 * m + i) * GI.conj (v (2 * m + j))

/-- The six Pauli eigenstates on one qubit, unnormalised: |0⟩, |1⟩, |0⟩ ± |1⟩, |0⟩ ± i|1⟩. -/
def pauliEigen (s : Nat) : Vec := fun r =>
  if r = 0 then (if s = 1 then 0 else 1)
  else if r = 1 then (match s with | 0 => 0 | 1 => 1 | 2 => 1 | 3 => -1 | 4 => GI.i | _ => -GI.i)
  else 0

/-- The teleportation circuit on the basis input `b` of qubit 0. -/
def teleport (b : Nat) : Vec :=
  let bellPair := ap 8 (kron 4 idm CNOT) (ap 8 (kron 4 idm (kron 2 H idm)) (basis (4 * b)))
  let sent := ap 8 (kron 4 H idm) (ap 8 (kron 2 CNOT idm) bellPair)
  ap 8 cz02 (ap 8 (kron 4 idm CNOT) sent)

/-- EVERY OUTCOME OF QUBITS 0 AND 1 LEAVES QUBIT 2 HOLDING THE INPUT, with equal weight. -/
theorem teleport_exact : ∀ b, b < 2 → ∀ r, r < 8 → teleport b r = if r % 2 = b then 1 else 0 := by
  decide +kernel

/-- NO SIGNALLING: before the corrections, qubit 2 alone is the same for every Pauli eigenstate
    input — off-diagonals zero, diagonals equal. -/
theorem teleport_no_signalling :
    ∀ s, s < 6 → reduced2 (sentFrom (pauliEigen s)) 0 1 = 0 ∧ reduced2 (sentFrom (pauliEigen s)) 1 0 = 0
      ∧ reduced2 (sentFrom (pauliEigen s)) 0 0 = reduced2 (sentFrom (pauliEigen s)) 1 1 := by
  decide +kernel

/-- The Pauli that writes the two classical bits `m` on qubit 0: I, X, Z, ZX. -/
def encode : Nat → Mat | 0 => idm | 1 => X | 2 => Z | _ => mm 2 Z X

/-- Superdense coding: Alice turns her half of the Bell pair, Bob decodes by CNOT then Hadamard. -/
def superdense (m : Nat) : Vec := ap 4 (kron 2 H idm) (ap 4 CNOT (ap 4 (kron 2 (encode m) idm) bell))

/-- EACH OF THE FOUR MESSAGES DECODES TO EXACTLY ITS OWN BASIS STATE: one qubit carries two bits. -/
theorem superdense_exact : ∀ m, m < 4 → ∀ r, r < 4 → (superdense m r ≠ 0 ↔ r = m) := by decide +kernel

/-- Both directions over one pair: one qubit carries two classical bits, and two carry one qubit. -/
theorem both_ways :
    (∀ m, m < 4 → ∀ r, r < 4 → (superdense m r ≠ 0 ↔ r = m)) ∧
    ∀ b, b < 2 → ∀ r, r < 8 → teleport b r = if r % 2 = b then 1 else 0 :=
  ⟨superdense_exact, teleport_exact⟩

end Teleport
