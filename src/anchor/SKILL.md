---
name: anchor
description: "Use when reasoning about the external anchor — the one drop of borrowed entropy that makes a zero-entropy content-addressed store tamper-proof. RFC-3161/eIDAS TSA or a blockchain leaf pins the chain root to a time no party can rewrite; tamper-cost is min(digest, anchor), so the anchor must be ≥ the digest or it is the weak link. Matter-twin anchor/index.ts."
atomPath: anchor
coordinate: anchor · 7/descent · 5ffc970f
contentUuid: "a62ca1a4-f6c6-51c2-818f-52e8bde1e369"
diamondUuid: "4f44dff1-e5b6-8911-bf79-77e269a351ea"
uuid: "5ffc970f-8154-8317-b216-7094c8e6e797"
horo: 7
bonds:
  in:
    - access
    - anchoring
    - angel
    - aura
    - barrier
    - blockchain
    - cloning
    - conservation
    - cost
    - deploy
    - development
    - entropy
    - finality
    - fusion
    - history
    - identity
    - law
    - merge
    - patent
    - power
    - projection
    - proof
    - purity
    - reality
    - relocate
    - research
    - self
    - standard
    - statements
    - surprisal
    - sustainability
    - tamper
    - torus
    - trading
    - unavoidable
    - uuid
    - verification
  out:
    - access
    - anchoring
    - angel
    - aura
    - barrier
    - blockchain
    - cloning
    - conservation
    - cost
    - deploy
    - development
    - entropy
    - finality
    - fusion
    - history
    - identity
    - law
    - merge
    - patent
    - power
    - projection
    - proof
    - purity
    - reality
    - relocate
    - research
    - self
    - standard
    - statements
    - surprisal
    - sustainability
    - tamper
    - torus
    - trading
    - unavoidable
    - uuid
    - verification
typography:
  partition: anchor
  bondDegree: 119
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)"
  - "NIST-SP-800-57"
  - "NIST-SP-800-63"
  - RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - cost
    - history
    - identity
    - law
    - merge
    - proof
    - self
    - standard
    - torus
    - uuid
  matrix:
    - access
    - anchoring
    - angel
    - aura
    - barrier
    - blockchain
    - cloning
    - conservation
    - cost
    - deploy
    - development
    - entropy
    - finality
    - fusion
    - history
    - identity
    - law
    - merge
    - patent
    - power
    - projection
    - proof
    - purity
    - reality
    - relocate
    - research
    - self
    - standard
    - statements
    - surprisal
    - sustainability
    - tamper
    - torus
    - trading
    - unavoidable
    - uuid
    - verification
  backlinks:
    - access
    - anchoring
    - angel
    - aura
    - barrier
    - blockchain
    - cloning
    - conservation
    - cost
    - deploy
    - development
    - entropy
    - finality
    - fusion
    - history
    - identity
    - law
    - merge
    - patent
    - power
    - projection
    - proof
    - purity
    - reality
    - relocate
    - research
    - self
    - standard
    - statements
    - surprisal
    - sustainability
    - tamper
    - torus
    - trading
    - unavoidable
    - uuid
    - verification
signatures:
  computationUuid: "c074dc1d-fb42-87ec-bab7-dd40d0b2414a"
  stages:
    - stage: path
      stageUuid: "a67b8c67-2555-82a4-bf4a-6851baaa82ca"
    - stage: trinity
      stageUuid: "cfb18007-c7e0-8ddc-b6af-18dbbdbc3eae"
    - stage: boundary
      stageUuid: "60ef0088-628e-8479-b4c5-c1b6fd78197d"
    - stage: links
      stageUuid: "d376d363-a49a-8306-938d-24aa184ae6e4"
    - stage: horo
      stageUuid: "b6c2183c-cf0f-8df4-b340-e25c26ce316c"
    - stage: seal
      stageUuid: "3cb2be4b-42e3-8a09-af88-2519cc680260"
    - stage: uuid
      stageUuid: "483d729e-a8d6-8ded-9248-ed845545c70b"
version: 2
---
# anchor — the borrowed entropy

A zero-entropy app holds no secret, so its deterministic whole could be rewritten *for free* by anyone who controls every row — **unless** its chain root is **anchored** to something outside itself that cannot be reproduced. That is the **anchor**: the single drop of external, non-deterministic entropy that pins the [[history]]/chain to a time and order no party can forge.

- **RFC-3161 / eIDAS / ETSI EN 319 422** — a qualified TSA signs the root's hash + `genTime`; forging it = breaking the TSA key (RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit). This is the only artefact that makes the time *legally* non-repudiable ([[uuid]]: no version IS a legal timestamp).
- **Blockchain (PoW)** — the root becomes a leaf; rewriting it means re-doing 51% of the chain's cumulative work — practically ∞.

The law: [[tamper/cost]] is bound by **min(digest, anchor)**. So the anchor must be **≥ the content digest** (erpax's 106 bits) or it is the weak link — and **un-anchored ⇒ the floor is 0** (free rewrite). The anchor is where integrity and the outside world touch; everything else is the [[self]]-contained deterministic [[merge]]. It closes the [[torus]]: the inward collapse is sealed by one outward fact.

Matter-twin: `anchor/index.ts` (`ANCHOR_STRENGTH_BITS`/`anchorBinds`/`anchoredFloorLog2`) feeding `tamper-cost.crackVerdict` + `index.test.ts` (the proof). The cited strengths must be true ([[standard]] NIST SP 800-57, RFC 3161, eIDAS). Composes: [[tamper/cost]] · [[uuid]] · [[identity]] · [[proof]] · [[history]] · [[merge]] · [[torus]] · [[standard]].

**Law — [[law]]: the anchor is the one drop of external entropy that pins a zero-entropy store's chain root to a time no party can forge — [[tamper/cost]] is min(digest, anchor), so the anchor must be ≥ the digest or it is the weak link, and un-anchored ⇒ floor 0 (free rewrite).**

## Standards

- **RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422** — the qualified-timestamp anchor family; forging requires breaking the TSA key.
- **NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)** — RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit; the values in `ANCHOR_STRENGTH_BITS` must match these tables.
