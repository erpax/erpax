---
name: blockchain
description: "Use when reasoning about erpax AS a blockchain — the computed proof that it is one. A content-addressed, Merkle-folded, tamper-evident, externally anchored ledger whose security is QUANTUM, not proof-of-work: the double-torus drives forge-cost to ∞ at coverage 1 while verify stays O(N). Six properties, each computed on the live matrix; the conjunction is the proof."
atomPath: blockchain
coordinate: "blockchain · 2/share · 9b67ac3b"
contentUuid: "517e163e-5206-57a2-a3ec-f1d4166568e5"
diamondUuid: "30d1d564-d278-84a4-a3c9-6ae870844e12"
uuid: "9b67ac3b-af66-85cd-90fc-4a0ec19fc9da"
horo: 2
typography:
  partition: blockchain
  bondDegree: 52
standards:
  - "RFC 9562 §5.8 content-uuid · Bitcoin genesis block (the external anchor)"
  - "RFC-9562"
bindings: []
signatures:
  computationUuid: "32a0353a-0d2c-8fb0-bea8-0121c5efb419"
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
      stageUuid: "f4c08e14-cb76-889c-bc39-649833c5e9ac"
    - stage: seal
      stageUuid: "9bab9b68-d178-88dc-b203-5d2fad7ec40a"
    - stage: uuid
      stageUuid: "20467779-8a67-812d-a8c8-e2c44ef6bd7d"
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
