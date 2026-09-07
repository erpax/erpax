---
name: entropy
description: "Use when reasoning about disorder as the matrix-reciprocity slack erpax's whole ledger balances — entropy() = 1 − the reciprocal-edge fraction of the uuid-matrix, an audit/aura signal, NOT an input to crackVerdict. It is a DISTINCT measure from coverage (the [0,1] fraction that prices tamper-cost via coverageCostLog2); reciprocity=1 does NOT imply coverage=1, so zero entropy does NOT by itself yield infinite cost (the live tree is the counter-example — entropy 0, coverage under 1, cost finite). angel lowers it (create/order/DRY), archangel raises it (destroy/duplicate); a violation is borrowed entropy debited to the agent. Fused out by the fusion reactor."
atomPath: entropy
coordinate: "entropy · 7/descent · 6301d43c"
contentUuid: "57992ffe-604a-5633-ab30-8154399ae949"
diamondUuid: "4bd8c644-4a4a-87b1-851a-83416295f12a"
uuid: "6301d43c-2279-8bb0-96ef-b4d86a0cf2a5"
horo: 7
typography:
  partition: entropy
  bondDegree: 303
standards:
  - "CoE-108+"
  - "NIST-SP-800-108"
  - "NIST-SP-800-57"
bindings: []
signatures:
  computationUuid: "0a33937a-01ef-8520-b63b-2e825fc5ccc4"
  stages:
    - stage: path
      stageUuid: "0efe9321-e9d9-88cf-b054-2bbe0937a2f6"
    - stage: trinity
      stageUuid: "2fcb2307-3b80-8a47-89c1-6704b122a608"
    - stage: boundary
      stageUuid: "ff157f72-4c6b-81ae-a107-fea08fbfd008"
    - stage: links
      stageUuid: "84b37278-4747-813f-bcd3-41c55c04a53c"
    - stage: horo
      stageUuid: "8e9e86a8-bd39-887e-825e-20832d03c8c8"
    - stage: seal
      stageUuid: "e4713d70-378f-8e73-b358-b4d0581e4959"
    - stage: uuid
      stageUuid: "5943afda-7659-881e-b5aa-27ac622018af"
version: 2
---
# entropy — the matrix-reciprocity slack the whole ledger balances

**entropy** is one of the quantities erpax keeps double-entry books on ([[angel]]: create·order·↓entropy ⊕ archangel: destroy·duplicate·↑entropy, in endless aikido — the [[balance]]). Concretely it is the **matrix-reciprocity slack**: `entropy() = 1 − reciprocity().fraction` (`src/entropy/index.ts`), the fraction of directed `[[merge]]` edges whose reverse is *missing* — a one-way bind a forger could ride. That makes it an **audit/aura signal**, NOT an argument to `crackVerdict`/`coverageCostLog2`.

**entropy() and coverage are two DISTINCT measures — do not conflate them.** The tamper-[[cost]] is priced from **coverage** — a separate [0,1] fraction (model⊕collection balance in [[balance]], or import purity, or usage), supplied explicitly to `coverageCostLog2` — and it reaches its **+∞ limit ONLY at coverage = 1**, for that one coverage axis, under an external [[anchor]] at least as strong as the digest. Reciprocity-entropy is NOT an input to that price, and there is no automatic derivation between the two: **reciprocity = 1 does NOT imply coverage = 1.** The running tree is the counter-example — it sits at `entropy() === 0` (reciprocity 100%) yet `coverage < 1`, so the modelled tamper-cost is **finite** (`src/balance/index.ts`: ∞ printed only when `coverage >= 1`). So "zero entropy ⇒ infinite cost" is NOT an automatic chain; ∞ is the coverage→1 limit of the explicit coverage parameter, not a consequence of matrix symmetry alone.

**Order is created by fusing entropy out.** Every DRY collapse, every [[merge]], every [[fusion]] removes duplication — disorder — and so *lowers* entropy while *raising* mass and [[gravity]] ([[dry]] · [[collapse]]: flatten = mass = gravity). The [[fusion]] reactor (the collider + the [[society]] self-build loop) runs this continuously, pulling the corpus toward the zero-entropy [[matrix]] — the [[torus]] collapse to [[one]] root ([[zeropoint]]).

**A violation is borrowed entropy.** When an agent's change adds a one-way `bind` (a forward edge whose reverse is missing), it *raises* the reciprocity-slack `entropy()` measures — slack a forger could ride one way. A dead/un-wired [[aura]] link is the adjacent disorder the aura/scan gate catches. The [[gate]] detects it and debits it to that agent (prosecution — the social leg of the [[cost]]): the entropy is repaid (the reverse bind added) or carried as the agent's liability. What rebalances is fused out; what cannot is conserved damage carried forward.

**Law — [[law]]: entropy is the matrix-reciprocity slack (`1 − reciprocal-edge fraction`) the ledger balances — an audit/aura signal, NOT an input to `crackVerdict`. The tamper-[[cost]] is priced from a DISTINCT measure, coverage, supplied explicitly to `coverageCostLog2`, and is +∞ ONLY at coverage = 1; reciprocity = 1 does NOT imply coverage = 1 (the live tree: entropy 0, coverage < 1, cost finite). Order is created by fusing entropy out ([[merge]]/DRY); a violation is borrowed entropy debited to the agent.**

Composes: [[angel]] · [[balance]] · [[tamper]] · [[cost]] · [[anchor]] · [[mass]] · [[gravity]] · [[fusion]] · [[merge]] · [[dry]] · [[collapse]] · [[matrix]] · [[zeropoint]] · [[whole]] · [[one]] · [[proof]] · [[aura]] · [[gate]].
