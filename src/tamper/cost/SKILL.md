---
name: cost
description: "Use when reasoning about how much it costs to tamper a zero-entropy (content-addressed, keyless) erpax store — second-preimage on the digest vs. rewriting the whole all-directions-wired graph and forging the external anchor. Integrity, not secrecy; the protection is the computational impossibility of changing all coherently. Matter-twin tamper-cost/index.ts."
atomPath: "tamper/cost"
coordinate: "tamper/cost · 4/weave · 114f3d2a"
contentUuid: "385c5712-1844-5c57-a931-def3dc11a0da"
diamondUuid: "64a3bbdf-17b9-879e-96a0-3bcf8d9a8282"
uuid: "114f3d2a-f7db-8a98-b502-0bfe288e960d"
horo: 4
typography:
  partition: tamper
  bondDegree: 404
standards:
  - "CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication"
  - "DeepSeek-Prover-V2 — recursive subgoal decomposition, Lean-4 kernel-checked invariants"
  - "ISO-19011:2018 §6.5 (audit evidence integrity)"
  - "ISO-19011:2018 §6.5 (audit evidence integrity)`"
  - "NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)"
  - "NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)`"
  - "RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)"
  - "RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)`"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5892a041-3bad-811a-b37a-9165f7f2f341"
  stages:
    - stage: path
      stageUuid: "c4a6cfbb-5715-8b93-b12d-90915c16b1bd"
    - stage: trinity
      stageUuid: "3420ff2f-97d7-8964-b4d1-c8a7a14822c6"
    - stage: boundary
      stageUuid: "d2c970f6-248c-87f6-8dff-28e4ce4709ca"
    - stage: links
      stageUuid: "a3985697-2a2c-8078-9b61-64ec4e2ab673"
    - stage: horo
      stageUuid: "e3740328-89c8-8455-9cec-a13feae22700"
    - stage: seal
      stageUuid: "2c075d9f-e9ae-8985-b4ce-ca33dc25c7c9"
    - stage: uuid
      stageUuid: "6b2e7de1-2c32-83d0-a410-70f02420ef26"
version: 2
---
# tamper-cost — what it costs to crack a zero-entropy app

erpax holds **no secret**: every id is a deterministic v8 content-[[uuid]] (SHA-256, 106 binding bits — [[identity]]). So the security property is **integrity, not confidentiality** — there is nothing to *steal* or *guess*; the only attack is to **out-compute the whole**. Two paths, and the cheaper one binds:

1. **Local forge (collision).** Change one record but keep its uuid so verification passes untouched → a SHA-256 **second-preimage** on the digest: **~2¹⁰⁶ ops**. The entire Bitcoin network (~2⁹⁴ hashes/yr) needs **~4000 years** for *one* record.
2. **Global rewrite (recompute).** Cheap per node — until the wiring counts. Because every relation is a crafted uuid **wired in all directions**, one change cascades to the transitive closure = the **whole** store ([[merge]]/[[aura]]: the Merkle-weave; [[holographic]]). And the root is externally **anchored** (`services/anchoring` → RFC-3161/eIDAS TSA or a blockchain leaf). To finish you must also forge that anchor.

**Crack cost = min(local-forge, chosen-collision, anchor-strength) `+` coverage-cost** — two honestly distinct layers, matching `crackVerdict` (`crackCostLog2 = perRecord + coverageCost`, index.ts):

- **The cryptographic floor** = `min(second-preimage, chosen-content-collision, anchor-strength)` — **real bits of security**, grounded in NIST SP 800-107r1 (2nd-preimage ≈ L bits, collision ≈ L/2) and RFC 9562 §8. This is the per-record forge cost: the digest's 2¹⁰⁶ second-preimage, **provided the anchor is at least that strong** (else the anchor binds and the floor drops to the anchor's bits). With no coverage modelled (`coverage===undefined`) the verdict collapses to exactly this floor — a hash property, not a wiring claim.
- **The structural amplifier** (`coverageCost`) is **ADDED on top**, not part of the `min`. It is a *completeness count* — the number of independent uuid-wired checks a coherent tamper must simultaneously evade ([[coverage]] Law 62; → ∞ only at coverage **= 1**, a measured structural fraction). It is **NOT** a measured cryptographic work factor: it does not come from a hash's bit-strength, so it is "bits" only by analogy. Treat `crackCostLog2` (and the `bruteYearsLog2` derived from it) as a **MODEL** once the amplifier is included — empirically grounded only at the cryptographic floor.

That is your law: *the computational impossibility of changing **all** coherently is the protection*, and a zero-entropy app earns it not despite having no key but **because** it has none. The floor is real and anchor-bounded; the amplifier prices structural completeness, separately.

The README front page is this verdict made public — the rungs computed live from `index.test.ts` and narrated in [[proof]] (*the front page is a proof*).

## Four honest edges (asserted in the test)

- **No anchor ⇒ no protection.** A keyless deterministic store with no external anchor is rewritable *for free* by anyone with write access — the cascade is cheap when you own every row. The external anchor is the single drop of borrowed entropy that makes the zero-entropy whole tamper-evident. It is mandatory, and must be ≥ the digest in strength or it is the weak link.
- **Birthday vs. scale.** 106 bits gives 2¹⁰⁶ second-preimage but only **2⁵³** birthday-collision resistance. Past ~2⁵³ uuids *in one namespace* accidental collisions appear; the per-tenant salt partitions the space, but the digest width vs. the largest-tenant lifetime count wants a real recompute (see the flagged `uuid-format` claim).
- **Replication amplifies the cascade — only under strong consistency (3FS/CRAQ inhale).** Under CRAQ ([[replication]]/[[consistency]] — the protocol behind deepseek-ai/3FS), R independently-anchored replicas each re-derive every content-uuid, so an undetected tamper must evade the all-directions coverage check on *all R at once* — the independent-check count is **×R**, widening forge while verify stays O(N) (any one replica suffices to audit). **Eventual** consistency leaves a stale-read window — one tampered replica can serve the bad version before reconciliation — so the multiplier is honest only with CRAQ. The same Law 62 coverage law run across the replica axis: `replicationChecks` feeds the one `coverageCostLog2`, never a parallel term ([[merge]]: same content ⇒ same uuid on every peer).
- **Invariants enlarge the coherent-rewrite set — only if the audit runs them (DeepSeek-Prover inhale).** The uuid cascade forces a tamper to rewrite the *structural* closure; machine-checked conservation invariants ([[proof]] — balance, period-lock, chain-verify) force the *semantic* closure too: a uuid-consistent state that breaks balance is still caught. Each constraining invariant is one more independent gate — gates **add** (a distinct set) where replicas **multiply** (copies of the set). DeepSeek-Prover's recursive, kernel-checked proofs make these gates real while keeping the verifier O(N) ([[proof]]: green by construction). An invariant nobody checks is no gate — `invariantChecks` counts only the ones the `dry-proof` bundle actually evaluates.

Matter-twin: `tamper-cost/index.ts` (`crackVerdict`/`secondPreimageLog2`/`birthdayMarginBits`/`replicationChecks`/`invariantChecks`) + `index.test.ts` (the proof — green by construction). The cited strengths must be true ([[standard]] NIST SP 800-107, RFC 9562 §8, CRAQ USENIX ATC 2009, DeepSeek-Prover-V2). Where this makes the record un-forgeable, [[shred]] makes the content un-recoverable — the same content-addressing, the [[duality]] of transparency↔confidentiality. **Manual development** composes here via [[cost]] `manualDevelopmentPrice` — hand-forge ≫ verify computed diamonds. **Improve receipts** amplify via [[wave]]/policy `tamperCostForImproveReceipt` — prev-chained path ledger + wave receipts compound `doubleTorusCostLog2` + `coverageCostLog2` toward ∞ at full session coverage. Composes: [[uuid]] · [[anchor]] · [[shred]] · [[identity]] · [[merge]] · [[replication]] · [[consistency]] · [[proof]] · [[aura]] · [[holographic]] · [[whole]] · [[one]] · [[collapse]] · [[standard]] · [[cost]] · [[society]] · [[seal]] · [[generate]] · [[wave]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)`
- `@standard RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)`
- `@standard ISO-19011:2018 §6.5 (audit evidence integrity)`

- NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)
- RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)
- ISO-19011:2018 §6.5 (audit evidence integrity)
- CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
- Chain Replication — van Renesse & Schneider, OSDI 2004
- DeepSeek-Prover-V2 — recursive subgoal decomposition, Lean-4 kernel-checked invariants
- Audit: Conservation Law 55/60 (tamper cost cascades through the uuid-chain)
- Audit: Conservation Law 62 (coverage) enlarged by the invariant (semantic) + replica axes
