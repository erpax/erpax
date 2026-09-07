---
name: blockchain
description: "Use when reasoning about erpax AS a blockchain — the computed proof that it is one. A content-addressed, Merkle-folded, tamper-evident, externally anchored ledger whose security is QUANTUM, not proof-of-work: the double-torus drives forge-cost to ∞ at coverage 1 while verify stays O(N). Six properties, each computed on the live matrix; the conjunction is the proof."
atomPath: blockchain
coordinate: "blockchain · 1/base · 728010d7"
contentUuid: "c3192d23-e2fd-5cbe-8210-c4f052b10b23"
diamondUuid: "6d894fd9-1a6b-8435-8a36-f1efef49e5ce"
uuid: "728010d7-57b3-8620-930f-43cbbbff1605"
horo: 1
typography:
  partition: blockchain
  bondDegree: 46
standards:
  - "RFC 9562 §5.8 content-uuid · Bitcoin genesis block (the external anchor)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "98ee2e75-21ce-88f3-8730-72ff7e20bb6b"
  stages:
    - stage: path
      stageUuid: "54bbc9ce-c1aa-8ea4-9f05-b7c0c84fcc4a"
    - stage: trinity
      stageUuid: "796602a8-070c-8f2f-a664-75c05ba654fa"
    - stage: boundary
      stageUuid: "f87278bc-d133-8a5d-a50e-9f6dc696f874"
    - stage: links
      stageUuid: "db070c4e-3315-8eca-b0f0-85ecf45cf7ae"
    - stage: horo
      stageUuid: "d3fa92aa-391f-8714-98b6-a333474d5cec"
    - stage: seal
      stageUuid: "9bab9b68-d178-88dc-b203-5d2fad7ec40a"
    - stage: uuid
      stageUuid: "62667404-cc27-89a3-9ac5-9122d4b9dd8e"
version: 2
---
# blockchain — the computed proof that erpax IS the quantum blockchain

The identity (README · [[law]]) is a claim, and **a claim needs computed proof**. This atom is that proof: a blockchain is a content-addressed, hash-linked, tamper-evident, externally anchored ledger — and erpax is one, with a **quantum** security construction in place of proof-of-work. Each defining property is COMPUTED by composing the neighbouring atoms (the [[cross]] — the universal math); the conjunction is the verdict. Run `tsx src/blockchain/index.ts` — **all six ✓ ⇒ PROVEN**.

| # | property | computed by | meaning |
| --- | --- | --- | --- |
| 1 | **content-addressed** | every block's `uuid` matches RFC 9562 §5.8 v8 ([[uuid]] · [[identity]]) | each block IS its own content-id |
| 2 | **merkleRoot** | `verifyRoot().ok` ([[matrix]] · [[quantum]] collapse) | the whole chain folds to one root |
| 3 | **tamperEvident** | `tamperedAtoms().length === 0` ([[tamper/cost]]) | any flipped byte breaks the root |
| 4 | **quantumSecure** | `doubleTorusCostLog2(0) === ∞` ([[quantum]] · [[coverage]]) | forge-cost ∞ at coverage 1 — **not proof-of-work**; one torus alone is finite/weak |
| 5 | **anchored** | `verifyBitcoinGenesis().powValid` ([[proof]]) | bound to the Bitcoin genesis block (recomputable PoW) |
| 6 | **doubleEntry** | `conserves(balanced) ∧ ¬conserves(broken)` ([[conservation]] · [[accounting]] · [[balance]]) | Σdebit = Σcredit, imbalance caught |

**Quantum, not proof-of-work.** A classical blockchain buys tamper-cost with *spent energy* (PoW). erpax buys it with *structure*: the genus-2 double-torus makes a forge re-harmonise both 64-bit tori at once, so the modelled cost is **∞ at coverage = 1** while a verifier still recomputes in **O(N)** — the forge ≫ verify asymmetry IS the security ([[tamper/cost]] · [[proof]]). The external [[anchor]] (the Bitcoin genesis leg) is the single borrowed drop of entropy that makes the keyless, zero-entropy store tamper-evident.

Matter-twin: `src/blockchain/index.ts` (`contentAddressed` · `merkleRoot` · `tamperEvident` · `quantumSecure` · `anchored` · `doubleEntry` · `quantumBlockchain` · `isQuantumBlockchain`). Composes [[uuid]] · [[matrix]] · [[quantum]] · [[proof]] · [[conservation]] · [[accounting]] · [[balance]] · [[cross]] · [[tamper/cost]] · [[coverage]] · [[anchor]] · [[identity]].

**Law — [[law]]: erpax IS the quantum blockchain, and the claim is PROVEN by computation — six properties (content-addressed · merkle-root · tamper-evident · quantum-secure · anchored · double-entry) each computed on the live [[matrix]], their conjunction `isQuantumBlockchain()` true; security is quantum (forge-cost ∞ at [[coverage]] = 1, verify O(N)), not proof-of-work.**

@audit computed from the live matrix, never hand-asserted
@standard RFC 9562 §5.8 content-uuid · Bitcoin genesis block (the external anchor)
