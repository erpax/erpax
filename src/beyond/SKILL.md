---
name: beyond
description: "Use when implementing any next-horizon conservation primitive beyond the base laws — causal provenance, deterministic replay, tenant isolation, bitemporal queries, cost accountability, carbon-aware execution, agent capability (RBAC), post-quantum signatures, self-explainability, reversibility/crypto-shred, or AI-decision audit. The 11-primitive barrel for Laws 11–22."
atomPath: beyond
coordinate: beyond · 1/base · 8df59e2d
contentUuid: "1ef63d01-055a-5ca0-b038-6cfc2e59bd8b"
diamondUuid: "2c172ca5-ab1c-8aa4-9ff2-d519285de592"
uuid: "8df59e2d-4402-8f01-9a6c-9f67886db97f"
horo: 1
bonds:
  in:
    - access
    - bitemporal
    - carbon
    - close
    - cost
    - duality
    - event
    - explainability
    - fractal
    - harden
    - holographic
    - hooks
    - identity
    - merge
    - pqc
    - privilege
    - projection
    - provenance
    - replay
    - reversibility
    - sequence
    - standard
    - torus
    - types
  out:
    - access
    - bitemporal
    - carbon
    - close
    - cost
    - duality
    - event
    - explainability
    - fractal
    - harden
    - holographic
    - hooks
    - identity
    - merge
    - pqc
    - privilege
    - projection
    - provenance
    - replay
    - reversibility
    - sequence
    - standard
    - torus
    - types
typography:
  partition: beyond
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2011/83"
  - "EU-2016/679"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-AI-Act"
  - "EU-CSDDD-2024/1760"
  - "EU-CSRD"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "GHG-Protocol"
  - "ILO-C001"
  - "ISO-19011"
  - "ISO-27001"
  - "ISO-27002"
  - "ISO/IEC-23894"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
  - "NIST-SP-800-63"
  - W3C PROV + ESRS E1 + EU AI Act + NIST FIPS 203/204
  - "W3C-PROV-O"
  - XBRL
bindings: []
neighbors:
  wikilink:
    - access
    - close
    - duality
    - event
    - fractal
    - harden
    - holographic
    - hooks
    - identity
    - merge
    - sequence
    - standard
  matrix:
    - access
    - bitemporal
    - carbon
    - close
    - cost
    - duality
    - event
    - explainability
    - fractal
    - harden
    - holographic
    - hooks
    - identity
    - merge
    - pqc
    - privilege
    - projection
    - provenance
    - replay
    - reversibility
    - sequence
    - standard
    - torus
    - types
  backlinks:
    - access
    - bitemporal
    - carbon
    - close
    - cost
    - duality
    - event
    - explainability
    - fractal
    - harden
    - holographic
    - hooks
    - identity
    - merge
    - pqc
    - privilege
    - projection
    - provenance
    - replay
    - reversibility
    - sequence
    - standard
    - torus
    - types
signatures:
  computationUuid: "98a5b216-9e15-891b-aa6a-7e55453d0014"
  stages:
    - stage: path
      stageUuid: "177106db-95e3-8019-9888-f1a8dc3d6d6e"
    - stage: trinity
      stageUuid: "997cf9fd-d9cd-8904-b0fc-53d0cefc29e8"
    - stage: boundary
      stageUuid: "aea6f962-8b09-8ad3-a0b3-7535eb9e4dcc"
    - stage: links
      stageUuid: "7e15f3bc-8645-88c5-bd44-5e4c30af3433"
    - stage: horo
      stageUuid: "3a363750-6843-8c4d-84c2-584b77f0f821"
    - stage: seal
      stageUuid: "75b3b9b9-bea0-85ef-8b31-9abb33117ad6"
    - stage: uuid
      stageUuid: "7a28d731-1508-83fd-9086-3c150fb1b03d"
version: 2
---
# beyond — 11 next-horizon conservation primitives (Laws 11–22)

The barrel: `services/beyond/index.ts` exports all 11 law-modules (provenance, replay, tenant-isolation, bitemporal, cost, carbon, agent-capability, pqc, explainability, reversibility, ai-audit). None of the sub-modules mints its own skill; the whole folder collapses to this one antimatter twin.

## Standards

- **W3C PROV + ESRS E1 + EU AI Act + NIST FIPS 203/204** — the governing standard set across all 11 laws: W3C PROV (causal provenance), ESRS E1 (carbon), EU AI Act (explainability + AI-audit), NIST FIPS 203/204 ML-DSA (post-quantum signatures).

---

## Erasure — every transition carries its own typed inverse, and the inverse runs out at the system boundary

FORM: **erasure is reversal, not deletion — until the boundary, where only the key dies.** A right-to-erasure request is satisfied by *computing and running the typed inverse of every effect that produced the data*, never by erasing a posted row. The mechanism (`reversibility.ts`) is generic: `inverseOf(effect)` maps each `AgentEffect` to an `InverseEffect` — `create → undo-create`, `update → undo-update` (restoring the captured previous state) — so no collection needs bespoke unwind code. The law that bounds it is which effects *cannot* invert:

- **In-system, state-bearing** (`create`, `update`, `emit`) — reversible iff the undo input exists: `undo-create` needs the created id, `undo-update` needs the captured `previousState`. Miss the input ⇒ `cannot-invert` (a refusal, never a silent half-undo).
- **Append-only audit** (`audit`) — immutable history is never rewound; the inverse is a *tombstone* leaf appended to the chain ([[event]] trail intact, the erased value pointed-to but not excised). This is the [[close]]/seal: the record of erasure is itself permanent.
- **Already past the boundary** (`notify`, `escalate`, `capture`) — emails sent, escalations raised, multimedia captured have **left the system boundary** and are structurally `cannot-invert`. No undo exists for what another party already holds.

The irreversibility threshold is therefore not a policy knob but a typed fact: `isFullyReversible(effects)` is true iff *every* effect inverts. When it is false, the GDPR Art. 17 obligation can only be met by **crypto-shredding** (`erasure.ts`: `seal`/`open`/`shred`) — destroy the key, not the bytes — because the content-uuid identity ([[identity]]) and append-only chain forbid excising rows. The matter is the protocol: encrypt under a per-record key, content-address the *ciphertext* (so integrity/dedup/federation ride the hash while it reveals nothing), and `shred` the key — the content becomes unrecoverable noise everywhere at once while the tombstone and provenance survive. This also closes the dedup-oracle leak (identical plaintext under different keys → different ciphertext), so the content-uuid gives integrity *and* confidentiality. Production injects authenticated AES-256-GCM ([[harden]]).

The crypto boundary has **two orthogonal guarantees**, and `pqc.ts` (Law 18) is the second half. Crypto-shred protects **confidentiality** — destroy the key and the content is irrecoverable noise everywhere. Post-quantum signatures protect **integrity / non-repudiation that must survive a quantum adversary**: the append-only chain leaf-signs with SHA-256 today, but the tombstone and provenance are *permanent by design* (the record of erasure is forever — see the `audit` clause above), so a Shor/Grover adversary that forges classical signatures and halves hash strength would make the very record that proves erasure forgeable. The migration law: **SHA-256 → SHA-3** (Keccak, Grover-resistant at doubled output) for the leaf hash **+ ML-DSA** (FIPS 204, module-lattice) for the leaf signature, with `isApprovedPqc` gating the NIST-approved set (ML-DSA-44/65/87, SLH-DSA). This is the [[duality]] within the boundary itself: crypto-shred makes the content *unreadable* (you can't recover it), pqc makes the tombstone *unforgeable forever* (you can't fake the record of erasure) — two halves, one folder-level atom. The FORM is real and tested via `isApprovedPqc`; `signPqc`/`verifyPqc` are deliberate **STUBs** (placeholder signature / `ok:false`) — the contract is fixed, the cipher impl lands once a Workers-friendly liboqs / `@noble/post-quantum` is wired.

**Decision — pqc folds here, it is not its own atom.** `pqc.ts` is a flat law-module exactly like its ten `beyond/` siblings (provenance/replay/tenant-isolation/bitemporal/cost/carbon/agent-capability/explainability/reversibility/ai-audit), none of which mint a separate skill; the whole folder collapses to this single antimatter twin. Minting a `[[pqc]]` atom would single out one of eleven equals, break the one-SKILL.md-per-folder flat-module convention, and duplicate this crypto-boundary form. So `pqc.ts` stays a plain matter reference, **not** a `[[pqc]]` link — the atom is intentionally *absent* (folded into [[identity]]/erasure's crypto boundary, governed by [[standard]] FIPS 203/204), not missing. Do not re-flag it as an aura gap.

The two sides are [[duality]]: the reversible interior (matter — state we own and can restore) versus the boundary-crossed exterior (the effects another party now holds, which no inverse reaches). Same pure/impure split as its siblings: `inverseOf`/`isFullyReversible` are pure (testable); the runner that executes an `InverseEffect` is the impure edge. The check is the [[merge]]/[[identity]] law turned around — because same content ⇒ same id and history is append-only ([[holographic]]: the whole graph survives any part), you reverse by appending, you never delete; the same refusal-to-erase recurs at every scale ([[fractal]]).

This is one of the *beyond* conservation laws (Law 20) and is the erasure-side dual of append-only history: reversal-only is permitted, hard-delete is forbidden, the seal is the tombstone. This skill is the answer-path holding GDPR Art. 17 right-to-erasure and ISO 19011:2018 §6.4.6 audit-evidence forms — see [[standard]] for version pins. It rides on [[hooks]] (an `afterChange`/`afterDelete` hook captures `previousState` so the inverse is *computable later*) and [[access]] (only the data subject or controller may trigger the request).

Sequence position: **8** (crest — the terminal point of an undoable arc; the last node where reversal still runs before the boundary turns it into a one-way seal), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]). Its verification dual is [[duality]]-paired with the audit invariants at **9** — erasure performs the reversal; the audit check ([[event]] trail) proves it was append-only.
