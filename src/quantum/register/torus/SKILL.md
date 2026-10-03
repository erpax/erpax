---
name: torus
description: "Use when every superposition the gate basis can reach must be enumerated rather than sampled — the finite real-Clifford orbit on exact amplitudes, the 4 × 4 double torus of two-qubit product states with the entangled states off it, and every referrer of the register asked to agree with each discovered state from its own standard's perspective."
atomPath: "quantum/register/torus"
coordinate: "quantum/register/torus · 1/base · 7309f37b"
contentUuid: "11f71cbd-c807-5a29-b22e-f2aa6098550c"
diamondUuid: "a96a1f49-e259-84c5-8022-97c025f784cd"
uuid: "7309f37b-c05e-8a4f-a17d-31f5fc83701a"
horo: 1
typography:
  partition: quantum
  bondDegree: 213
standards:
  - "Nielsen & Chuang §10.5 — stabilizer states; the real Clifford group is finite"
bindings: []
signatures:
  computationUuid: "c27c02e0-513d-82b0-8acd-480d2a5d0f26"
  stages:
    - stage: path
      stageUuid: "86b6981e-1f5a-8bb1-8bee-38126ef37386"
    - stage: trinity
      stageUuid: "391c63a8-a23c-86d7-b6fc-f5a871202701"
    - stage: boundary
      stageUuid: "63a93a01-65fc-8c41-91d4-2f91c109833e"
    - stage: links
      stageUuid: "5667735b-533e-85c6-8d0c-f660a9156ddb"
    - stage: horo
      stageUuid: "1329859e-b491-8229-afa5-6fd623187efc"
    - stage: seal
      stageUuid: "12635e2b-587a-8b92-9bc4-b3efb47d1a33"
    - stage: uuid
      stageUuid: "e81388d9-fecb-8c5a-9abd-f58dbf9c4119"
quantum:
  superposition:
    - access
    - akashic
    - all
    - anchor
    - angel
    - atom
    - begin
    - beyond
    - superposition
  collapse:
    - "Use when every superposition the gate basis can reach must be enumerated rather than sampled — the finite real-Clifford orbit on exact amplitudes, the 4 × 4 double torus of two-qubit product states with the entangled states off it, and every referrer of the register asked to agree with each discovered state from its own standard's perspective."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "c27c02e0-513d-82b0-8acd-480d2a5d0f26"
    contentUuid: "11f71cbd-c807-5a29-b22e-f2aa6098550c"
version: 2
---
# quantum/register/torus — every superposition discovered, and the double torus they live on

The register's basis is `H · X · Z · CNOT · SWAP` on integer amplitudes. Its orbit from `|0…0⟩` is
**finite** — the real Clifford orbit — so the honest instrument is not a sample of circuits but the
**whole orbit to a fixpoint**: breadth-first, every state named by its canonical integer vector
(scale folded out, first non-zero amplitude positive), stopped only when no generator finds a new one.

| qubits | states | product | entangled | what the numbers are |
| ---: | ---: | ---: | ---: | --- |
| 1 | 4 | 4 | 0 | the ring: `\|0⟩ · \|1⟩ · \|+⟩ · \|−⟩` |
| 2 | computed | **16** | computed | the double torus, and what lies off it |

The two-qubit product states tile a **4 × 4 torus** — each qubit on its own ring, the state the
tensor of its two coordinates — and the test demands every cell occupied **exactly once**. The
entangled states are the ones with no coordinate at all; every one of them has a non-zero
determinant and every product state has zero, so the partition is decided by arithmetic, not by name.
The counts are not typed into this file: the enumeration is the arbiter, the test asserts closure,
normalisation and the partition, and `orbit().receipt` is `toUuid` over the sorted state keys.

## Cross-developed from every referrer's perspective

A discovered superposition is only as real as the atoms that read it. `referrerPerspectives()` finds
every file that **imports** `@/quantum/register` — an `ImportDeclaration`, never a mention — and
reads the standards it cites, because a referrer's standard is the law it would write the test under.
Then each one is made to agree on **every** state of the orbit, not on the Bell state alone:

| referrer | the perspective | what must hold on every state |
| --- | --- | --- |
| [[superposition]] · [[quantum]]/dimension · `trading/quantum` | the Float Born rule | `normaliseAmplitudes` squared equals the exact weight over `2^halvings`, to 1e-12 |
| [[quantum]]/entanglement | EPR / Bell, ER=EPR | the witness fires on exactly the off-torus states |
| `agents/mcp/tool/quantum` | the wire | every state serialises as decimal strings and parses back whole |

**Honest boundary.** This enumerates one basis; a gate outside it (`S`, `T`) leaves the real orbit
and this atom says nothing about it. The torus coordinates are defined for two qubits — three qubits
enumerate (and are capped at 20,000 states) but have no 2-D coordinate here. A referrer that cites no
standard is reported with an empty perspective, not invented one. And agreement across all states is
agreement on **this** carrier of the Born rule: it does not say the Float carrier is exact, only that
it never disagrees with the exact one on any state the basis reaches.

**Law — [[law]]: a finite orbit is enumerated, never sampled. Discover every superposition the basis
reaches, name each one, and make every referrer agree with every one of them from the standard it
cites — one state no referrer disagrees with is a claim; a whole orbit none disagrees with is a seal.**

## Standards

- **Nielsen & Chuang §10.5** — stabilizer states; the real Clifford group is finite.
- **ISO/IEC 25010:2023 §5.5** — testability: a finite space is tested whole.

Composes: [[quantum]]/register · [[dual/torus/fusion]] · [[rules]]/citation · [[superposition]] · [[law]].

<sub>content-uuid `11f71cbd-c807-5a29-b22e-f2aa6098550c` · account `quantum/register/torus` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
