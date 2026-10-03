---
name: quantum
description: "Use when an agent needs the exact-amplitude register over MCP — erpax.quantum.run · erpax.quantum.bell · erpax.quantum.shots expose quantum/register (integer amplitudes, halvings, determinant entanglement witness, enumerated shots) as pure tools; bigints cross the wire as decimal strings."
atomPath: "agents/mcp/tool/quantum"
coordinate: "agents/mcp/tool/quantum · 1/base · 920c9897"
contentUuid: "83dbebde-3a51-5a61-af51-33bd32d6a0fe"
diamondUuid: "9601d3e7-c41a-81ea-8487-a2d9e7cc7444"
uuid: "920c9897-290e-8301-9980-1f8ed79e0712"
horo: 1
typography:
  partition: agents
  bondDegree: 576
standards: []
bindings: []
signatures:
  computationUuid: "aeaa5a1e-5d98-852e-904f-f63698dc6d7e"
  stages:
    - stage: path
      stageUuid: "24e816db-72fe-830b-9126-30b9544cdcb7"
    - stage: trinity
      stageUuid: "5744068f-29b7-858d-b3a4-d4b4a1ea82c6"
    - stage: boundary
      stageUuid: "d06d7a86-693e-882e-bd51-2a81687feb82"
    - stage: links
      stageUuid: "480adc06-137c-8fde-87b4-974a17860e03"
    - stage: horo
      stageUuid: "f2942d82-df9a-812d-8aa1-4da82e362cb0"
    - stage: seal
      stageUuid: "38730f8e-1a87-8e77-a423-c51846ffc1e3"
    - stage: uuid
      stageUuid: "fb5c901c-5697-82f8-95dd-da707bb964f8"
version: 2
---
# agents/mcp/tool/quantum — the register, one door away from every agent

[[quantum]]/register made the Bell state an integer identity. This area makes it **callable**: three
tools under `erpax.quantum.*`, pure over their arguments, reading no tenant's rows.

| tool | what it answers |
| --- | --- |
| `erpax.quantum.run` | any circuit in the basis `h · x · z · cnot · swap` on 1–10 qubits — amplitudes, halvings, weights, support, `normalised`, and per-qubit entanglement across its cut |
| `erpax.quantum.bell` | \|00⟩+\|11⟩ by H₀ then CNOT₀₁ (or GHZ for `qubits` > 2), with the determinant a₀a₃ − a₁a₂ as the entanglement witness |
| `erpax.quantum.shots` | measurement by **enumeration** — `rounds` repetitions of the exact weight multiset, never a sample |

## Why bigints become strings

JSON carries no integer past 2⁵³. A register at ten qubits and ten halvings holds weights to 2¹⁰ —
fine — but the law here is that an amplitude is **never** a Float, and the one way to keep that
promise on a wire that only knows Floats is to send the decimal text. A caller that wants arithmetic
parses it; a caller that wants a Float has to ask for one explicitly, which is the seam made visible.

## The witness is the determinant, not the parity

The sibling at `uuidna.com` reports the same Bell state and says, honestly, that parity in the
computational basis does **not** separate an entangled state from an equal classical mixture — both
give ½ and ½. So the entanglement field here is not parity: it is `isProductAt()` per qubit, every
2×2 minor across that qubit's cut, which is rank and nothing else. `|++⟩` reports `product: true` at
both cuts; Bell reports `entangled: true` at both.

**Honest boundary.** This is the register's boundary restated over MCP: arithmetic on CPU/GPU, no
device, dense 2ⁿ so capped at ten qubits, and nothing here says a qubit exists. The tools refuse a
gate naming a qubit the register does not have, and refuse more than ten qubits, so a caller cannot
make the gateway allocate a 2³⁰ vector by accident.

**Law — [[law]]: a tool that computes a quantum state answers with integers and an enumerated list, or
it answers with a tolerance and a draw. Put the exact one on the wire, as text if the wire cannot carry
it, and let the Float be the thing a caller must ask for.**

Composes: [[quantum]]/register · [[mcp]] · [[law]].
