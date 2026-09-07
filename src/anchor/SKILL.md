---
name: anchor
description: "Use when reasoning about the external anchor — the one drop of borrowed entropy that makes a zero-entropy content-addressed store tamper-proof. RFC-3161/eIDAS TSA or a blockchain leaf pins the chain root to a time no party can rewrite; tamper-cost is min(digest, anchor), so the anchor must be ≥ the digest or it is the weak link. Matter-twin anchor/index.ts."
atomPath: anchor
coordinate: "anchor · 7/descent · 70d42578"
contentUuid: "bb00c011-bc09-5e99-bd97-a684329d7da7"
diamondUuid: "8a507a3a-d252-84aa-87f9-753869e51ae7"
uuid: "70d42578-7c8f-8909-8489-2e2bec3250d2"
horo: 7
typography:
  partition: anchor
  bondDegree: 139
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-CSDDD-2024/1760"
  - "FIPS 203 (ML-KEM, finalized 2024-08-13) — key establishment; not an anchor kind, it"
  - "FIPS 204 (ML-DSA, finalized 2024-08-13) — the lattice hybrid `ml-dsa-fips204`, whose"
  - "FIPS 205 (SLH-DSA, finalized 2024-08-13) — the primary root signature kind defined"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)`"
  - "NIST-SP-800-57"
  - "NIST-SP-800-63"
  - "RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422"
  - "RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422`"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "68e78c43-b203-8f95-9935-462d6f068242"
  stages:
    - stage: path
      stageUuid: "a67b8c67-2555-82a4-bf4a-6851baaa82ca"
    - stage: trinity
      stageUuid: "cfb18007-c7e0-8ddc-b6af-18dbbdbc3eae"
    - stage: boundary
      stageUuid: "cad0c66a-21e9-8b6d-a592-fc10d91a24ee"
    - stage: links
      stageUuid: "95d22f77-8c2c-8c74-804b-0d08cc27bf7c"
    - stage: horo
      stageUuid: "a5e1b6dc-4fa4-8cd5-8ef9-671d47632e4f"
    - stage: seal
      stageUuid: "05f9e206-43bb-8ebe-8bbb-46d89406277d"
    - stage: uuid
      stageUuid: "364e154b-5bde-8a13-973b-f3102bac9878"
version: 2
---
# anchor — the borrowed entropy

A zero-entropy app holds no secret, so its deterministic whole could be rewritten *for free* by anyone who controls every row — **unless** its chain root is **anchored** to something outside itself that cannot be reproduced. That is the **anchor**: the single drop of external, non-deterministic entropy that pins the [[history]]/chain to a time and order no party can forge.

- **RFC-3161 / eIDAS / ETSI EN 319 422** — a qualified TSA signs the root's hash + `genTime`; forging it = breaking the TSA key (RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit). This is the only artefact that makes the time *legally* non-repudiable ([[uuid]]: no version IS a legal timestamp).
- **Blockchain (PoW)** — the root becomes a leaf; rewriting it means re-doing 51% of the chain's cumulative work — practically ∞.

## Post-quantum — the assumption, and what a CRQC leaves standing

A strength number alone is an over-claim: two anchors resting on the **same** assumption do not compose into a hedge, and an assumption Shor breaks is worth **zero** bits the day a cryptographically-relevant quantum computer exists — not *fewer* bits. So the strengths are priced on **two** tables beside a named assumption:

| anchor | today | post-quantum | assumption |
| --- | ---: | ---: | --- |
| `rfc3161-rsa2048` · `rfc3161-ecdsa-p256` · `eidas-qualified` | 112–128 | **0** | factorisation / ECDLP — **Shor-broken** |
| `blockchain-pow` | ∞ | ∞ | cumulative work over a hash — Grover-weakened, not structurally broken |
| `slh-dsa-fips205` | 128 | 128 | hash preimage only — the **same** assumption the digest already rests on |
| `ml-dsa-fips204` | 192 | 192 | module lattices (MLWE/MSIS) — a **distinct** assumption, so it hedges |

FIPS 204 and 205 are the NIST PQC signature standards finalized 2024-08-13. SLH-DSA is the primary root precisely because it takes on **no new assumption**; ML-DSA is the hybrid option, and its distinct lattice assumption is what makes it a hedge rather than a repetition. FIPS 203 **ML-KEM** is deliberately *not* an anchor kind — a KEM pins nothing to a time; it keys a **channel**, and that surface is [[anchor/surface]]'s.

A signed root over a classical channel is still crackable, which is why the strength tables are only half the answer: [[anchor/surface]] is the guard that makes an undeclared surface fail the build.

The law: [[tamper/cost]] is bound by **min(digest, anchor)**. So the anchor must be **≥ the content digest** (erpax's 106 bits) or it is the weak link — and **un-anchored ⇒ the floor is 0** (free rewrite). The anchor is where integrity and the outside world touch; everything else is the [[self]]-contained deterministic [[merge]]. It closes the [[torus]]: the inward collapse is sealed by one outward fact.

Matter-twin: `anchor/index.ts` (`ANCHOR_STRENGTH_BITS`/`anchorBinds`/`anchoredFloorLog2`) feeding `tamper-cost.crackVerdict` + `index.test.ts` (the proof). The cited strengths must be true ([[standard]] NIST SP 800-57, RFC 3161, eIDAS). Composes: [[tamper/cost]] · [[uuid]] · [[identity]] · [[proof]] · [[history]] · [[merge]] · [[torus]] · [[standard]].

**Law — [[law]]: the anchor is the one drop of external entropy that pins a zero-entropy store's chain root to a time no party can forge — [[tamper/cost]] is min(digest, anchor), so the anchor must be ≥ the digest or it is the weak link, and un-anchored ⇒ floor 0 (free rewrite).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422`
- `@standard NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)`


- **RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422** — the qualified-timestamp anchor family; forging requires breaking the TSA key.
- **NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)** — RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit; the values in `ANCHOR_STRENGTH_BITS` must match these tables.
