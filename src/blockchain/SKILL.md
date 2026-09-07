---
name: blockchain
description: "Use when reasoning about erpax AS a blockchain — the computed proof that it is one. A content-addressed, Merkle-folded, tamper-evident, externally anchored ledger whose security is QUANTUM, not proof-of-work: the double-torus drives forge-cost to ∞ at coverage 1 while verify stays O(N). Six properties, each computed on the live matrix; the conjunction is the proof."
atomPath: blockchain
coordinate: "blockchain · 8/crest · 7bfd30ff"
contentUuid: "45cd6213-9922-5d1b-9a3d-dc7ea6edf1b8"
diamondUuid: "dde38196-7a2e-899b-b7fd-d46fbfdb77df"
uuid: "7bfd30ff-e747-8679-864d-18373d23cae1"
horo: 8
typography:
  partition: blockchain
  bondDegree: 52
standards:
  - "RFC 9562 §5.8 content-uuid · Bitcoin genesis block (the external anchor)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "76952416-b41e-8366-ab74-514ad288ce11"
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
      stageUuid: "54db8496-2fbc-8497-acd9-90701be2ada8"
    - stage: seal
      stageUuid: "9bab9b68-d178-88dc-b203-5d2fad7ec40a"
    - stage: uuid
      stageUuid: "67bc918e-5fbb-8e17-9298-ad53fe3abc19"
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
