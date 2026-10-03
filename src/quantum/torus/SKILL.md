---
name: torus
description: "Use when every superposition the gate basis can reach must be enumerated rather than sampled — the finite real-Clifford orbit on exact amplitudes, the 4 × 4 double torus of two-qubit product states with the entangled states off it, and every referrer of the register asked to agree with each discovered state from its own standard's perspective."
atomPath: "quantum/torus"
coordinate: "quantum/torus · 1/base · 2b5ecab8"
contentUuid: "5dc3e557-af3f-54f3-b00a-d960cd0cb761"
diamondUuid: "a8d02949-399f-8752-932d-071f9a7ef1e6"
uuid: "2b5ecab8-193d-8924-b58d-67b2049b0e86"
horo: 1
typography:
  partition: quantum
  bondDegree: 213
standards:
  - "Nielsen & Chuang §10.5 — stabilizer states; the real Clifford group is finite"
bindings: []
signatures:
  computationUuid: "ad0be464-6c6f-80a7-b186-25fd1ed29239"
  stages:
    - stage: path
      stageUuid: "33b24bcd-87ae-86e9-9e94-c8c58cf8003b"
    - stage: trinity
      stageUuid: "73f83876-638b-8490-82e8-3d06079ce1ac"
    - stage: boundary
      stageUuid: "0cf4b61c-7981-8892-9c53-c3bec39249f2"
    - stage: links
      stageUuid: "05a5743a-0328-8509-bd8c-8b14cfab8677"
    - stage: horo
      stageUuid: "1c2ee3e5-46c2-8bd3-a35f-2458e9db2724"
    - stage: seal
      stageUuid: "cf59efee-831b-8d75-a18c-b156346ffb3c"
    - stage: uuid
      stageUuid: "1ba6762b-6b9d-8ad1-8a9e-6e140ae0a99f"
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
    computationUuid: "ad0be464-6c6f-80a7-b186-25fd1ed29239"
    contentUuid: "5dc3e557-af3f-54f3-b00a-d960cd0cb761"
version: 2
---
# quantum/torus — every superposition discovered, and the double torus they live on

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

<sub>content-uuid `5dc3e557-af3f-54f3-b00a-d960cd0cb761` · account `quantum/torus` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
