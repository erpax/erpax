/-
  Route — a gate between uncoupled qubits, routed through SWAPs, computes the same function.

  Ported from qpu.uuidna.com (Qpu.Processing.QuantumCircuit, same author), on Gate.lean. On a
  device, a two-qubit gate can only act on a coupled pair. A CNOT between qubits 0 and 2 of a line
  0–1–2 has no coupler, so it is compiled as SWAP(0,1) · CNOT(1,2) · SWAP(0,1). This file proves the
  compiled circuit is the gate it replaces, entry by entry, and counts what the routing costs.

  The source also proved that qubits 0 and 2 are uncoupled on qpu's own register layout. That
  statement is about one device's coupling graph, which this corpus does not model, so it is not
  ported; the routing identity holds on any line of three.

  WHAT THIS PROVES: SWAP · CNOT · SWAP on a line of three qubits is exactly CNOT(0,2); and a CNOT
  routed over a path of distance d ≥ 1 takes 2d − 1 gates in sequence. The identity is by `decide`
  and the count by `omega`; both rest on Lean's standard axioms only (`propext`, and `Quot.sound`
  for the count) — nothing is declared here.

  WHAT THIS DOES NOT PROVE: that 2d − 1 is the fewest gates possible, or anything about depth when
  gates run in parallel. The count is of this routing scheme, not a lower bound.
-/
import Gate

namespace Route
open Gate

/-- CNOT from qubit 0 to qubit 2 of three (qubit 0 the high bit): the low bit flips when the high bit is set. -/
def cnot02 : Mat := perm fun c => if c ≥ 4 then c ^^^ 1 else c
/-- CNOT from qubit 1 to qubit 2 of three. -/
def cnot12 : Mat := kron 4 idm CNOT
/-- SWAP of qubits 0 and 1 of three. -/
def swap01 : Mat := kron 2 SWAP idm

/-- ROUTING PRESERVES THE FUNCTION: SWAP(0,1) · CNOT(1,2) · SWAP(0,1) is exactly CNOT(0,2). -/
theorem swap_routing : Same 8 (mm 8 (mm 8 swap01 cnot12) swap01) cnot02 := by decide +kernel

/-- And the routing is needed: the unrouted neighbour gate is a different function. -/
theorem unrouted_differs : ¬ Same 8 cnot12 cnot02 := by decide +kernel

/-- The gates of a CNOT routed over distance `d`: a SWAP in and out per step past the first, and the CNOT. -/
def routedGates (d : Nat) : Nat := 2 * (d - 1) + 1

/-- A routed CNOT at distance d ≥ 1 takes 2d − 1 gates; at distance 2, the three above. -/
theorem routed_depth (d : Nat) (h : 1 ≤ d) : routedGates d = 2 * d - 1 ∧ routedGates 2 = 3 := by
  unfold routedGates
  exact ⟨by omega, rfl⟩

end Route
