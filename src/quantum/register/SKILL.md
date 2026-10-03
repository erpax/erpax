---
name: register
description: "Use when a quantum state must be DECIDED rather than approximated — an exact-amplitude register (integer amplitudes, halvings instead of division) with H · X · Z · CNOT · SWAP, the Bell and GHZ states, a determinant entanglement witness, enumerated shots, and the one Float Born normaliser the three Float copies fold onto; kernel-checked twin in Register.lean."
atomPath: "quantum/register"
coordinate: "quantum/register · 7/descent · 376eb7ab"
contentUuid: "dad892fb-9b26-55c5-b836-cfe6729fa356"
diamondUuid: "25d80b62-20f8-86de-94a7-3558951c422a"
uuid: "376eb7ab-1e28-8dea-b6ff-db1f89f819eb"
horo: 7
typography:
  partition: quantum
  bondDegree: 26
standards:
  - "Nielsen & Chuang §1.3.6 — the Bell state as H then CNOT"
bindings: []
signatures:
  computationUuid: "8d365cac-2490-8d12-87e2-741b91ff15ad"
  stages:
    - stage: path
      stageUuid: "54b3a83a-36cb-8802-ba5f-db68ba860556"
    - stage: trinity
      stageUuid: "99c36a6f-a54a-8464-99bc-b6f697fd2dff"
    - stage: boundary
      stageUuid: "2b9831b2-ec78-80bc-a087-b3116266e6ac"
    - stage: links
      stageUuid: "54612dcc-8b31-8e74-ac58-780dd15c3b72"
    - stage: horo
      stageUuid: "117e8307-67c2-8fc9-a3db-09dda50e413b"
    - stage: seal
      stageUuid: "7c182352-d3a4-8272-9344-c7257ddb38a8"
    - stage: uuid
      stageUuid: "c89690b9-5e06-84c4-aee5-4abdb82c0185"
quantum:
  superposition:
    - duality
    - law
    - proof
    - quantum
    - rules
    - un
    - superposition
  collapse:
    - "Use when a quantum state must be DECIDED rather than approximated — an exact-amplitude register (integer amplitudes, halvings instead of division) with H · X · Z · CNOT · SWAP, the Bell and GHZ states, a determinant entanglement witness, enumerated shots, and the one Float Born normaliser the three Float copies fold onto; kernel-checked twin in Register.lean."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "8d365cac-2490-8d12-87e2-741b91ff15ad"
    contentUuid: "dad892fb-9b26-55c5-b836-cfe6729fa356"
version: 2
---
# quantum/register — the Bell state is an integer identity, or it is a Float that proves nothing

Four atoms wrote the Born rule — [[superposition]] over the seven horo levels, [[quantum]]/dimension
over the 2D grid, `trading/quantum` over trade outcomes, [[qubit]] over the six roots — and three of
the four did it in **Float**: `Σ|c|² = 1` after dividing by a square root. A Float equality is not
decidable. `decide` closes nothing about it, a kernel cannot check it, and the test that asserts it
asserts `≈ 1 within 1e-12`, which is a tolerance wearing a theorem's clothes.

The sibling at `qpu.uuidna.com` showed the other road and this atom takes it: **basis states are
integers, amplitudes are integers, and every Hadamard records a HALVING instead of dividing.**

```
register(2)                     [1, 0, 0, 0]   halvings 0   Σ amp² = 1 = 2⁰
h(0)                            [1, 1, 0, 0]   halvings 1   Σ amp² = 2 = 2¹
cnot(0, 1)        — bell()      [1, 0, 0, 1]   halvings 1   Σ amp² = 2 = 2¹
```

`normalised()` is `Σ amp² === 2^halvings` on bigints — an identity, checked after **every** gate in
the test, and never once approximately.

## The Bell+CNOT pattern, found and sealed

qpu carries it twice, and so does this atom, because the two carriers answer different questions:

| carrier | qpu | here | what it proves |
| --- | --- | --- | --- |
| basis index | `(0 ^^^ 1) ^^^ 2 = 3` | `basisCnot(0, 1, basisX(0, 0)) === 3` | the gates compose: \|00⟩ → X → \|01⟩ → CNOT → \|11⟩ |
| amplitudes | `entangle : 1 * 1 ≠ 0 * 0` | `determinant(bell()) === 1n` | the state is **not a product**: a₀a₃ − a₁a₂ ≠ 0 |

The determinant is the whole content of "entangled" for two qubits — a 2×2 matrix of amplitudes has
rank 1 exactly when the state factors. `isProductAt()` lifts it to n qubits by checking every 2×2
minor across one qubit's cut, so `ghz(3)` is entangled at all three cuts and `|++⟩` (`h(0)`, `h(1)`)
is a product at both — the same `[1,1,1,1]` qpu reports as `separable`, with determinant 1·1 − 1·1.

**Interference is exact too.** `h(0)` twice on `|0⟩` gives `[2, 0]` at two halvings: the `|1⟩`
amplitude cancelled to **0**, not to 1e-17, and `|0⟩` restored to **2**, not to 1.9999. That is qpu's
`interfere {cancelled: 0, restored: 2}`, reproduced to the integer.

## Shots are enumerated, never sampled

`shots()` lists outcomes — one round is every supported index repeated by its Born weight, in index
order, and `rounds` repeats it. Bell for four rounds is `[0,3,0,3,0,3,0,3]`. There is no random
number anywhere in this atom, so a measurement is an **audit record** a reader recomputes rather
than a draw they must trust. `sampled: false · enumerated: true` is carried on the result so a
consumer cannot mistake the one for the other.

## The Float carrier, folded to one address

The three Float bodies were byte-near copies — zero-fill a key space, sum the squares, `algebraSqrt`,
divide, throw on zero. `normaliseAmplitudes()` is that body **once**; each caller keeps only what
differs (which keys it zero-fills, which it drops) and calls here. This is [[rules]]/copy's law
applied to the Born rule, and the honest part is that the Float carrier **stays** Float: √ of a
Float is a Float, and nothing here pretends otherwise. What changed is that the approximation now
has one address and the exact register has another, and a reader can see which one a claim rests on.

## The Lean twin

`src/verify/lean/Register.lean` carries both carriers as kernel-checked theorems — `bell_path`,
`bell_amplitudes`, `bell_normalised`, `bell_entangled`, `plus_is_product`, `interfere`,
`hadamard_doubles_weight` — **every one axiom-free** (`#print axioms` says "does not depend on any
axioms" for all eleven). One thing the probe taught: `Nat.xor` reduces through `propext`, so the
Lean flips a bit by `if bit then i − 2^q else i + 2^q` and the theorems stay clean. The TypeScript
uses `^` because it is not the arbiter; the test reads the `.lean` file and refuses if a theorem it
relies on is renamed or a `sorry` appears.

**Honest boundary.** This proves the **arithmetic** of a 2–3 qubit circuit on CPU/GPU — nothing here
is a device, and nothing here says a qubit exists. `hadamard_doubles_weight` is proved on the states
the circuit visits, not for every state: the general identity needs ring arithmetic the core kernel
does not carry, so unitarity-in-general is the TypeScript test's claim (every gate, `normalised()`
after it) and not Lean's. The register is dense — 2ⁿ bigints — so it is a proof instrument for small
n, not a simulator. And a Float amplitude is still a Float after this fold; the gain is one address
and a visible seam, not exactness.

**Law — [[law]]: a Born rule the kernel cannot decide is a tolerance, not a theorem. Keep the
amplitudes integer and record the halving; keep the measurement enumerated and record the list — and
where a Float must remain, give it one address so the seam between approximate and exact is visible.**

## Standards

- **Nielsen & Chuang §1.3.6** — the Bell state as Hadamard then CNOT.
- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is made once, not once per copy.
- **ISO 19011:2018 §6.4** — audit evidence: an enumerated shot list is reproducible; a sampled one is not.

Composes: [[quantum]] · [[superposition]] · [[qubit]] · [[rules]]/copy · [[law]].

<sub>content-uuid `dad892fb-9b26-55c5-b836-cfe6729fa356` · account `quantum/register` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
