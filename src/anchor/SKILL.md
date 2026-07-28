---
name: anchor
description: "Use when reasoning about the external anchor — the one drop of borrowed entropy that makes a zero-entropy content-addressed store tamper-proof. RFC-3161/eIDAS TSA or a blockchain leaf pins the chain root to a time no party can rewrite; tamper-cost is min(digest, anchor), so the anchor must be ≥ the digest or it is the weak link. Matter-twin anchor/index.ts."
atomPath: anchor
coordinate: "anchor · 2/share · 7d84dcfc"
contentUuid: "26c7b15b-22b7-58d7-aefe-1f9f84015159"
diamondUuid: "537d6584-85cc-83e3-b8d4-b336585e8484"
uuid: "7d84dcfc-b3bc-8cc3-92e5-5fbb0c2a29f8"
horo: 2
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
  bondDegree: 123
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)"
  - "NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)`"
  - "NIST-SP-800-57"
  - "NIST-SP-800-63"
  - "RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422"
  - "RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422`"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "a48eed2e-1744-88cc-91a2-06c0b54395f1"
  stages:
    - stage: path
      stageUuid: "a67b8c67-2555-82a4-bf4a-6851baaa82ca"
    - stage: trinity
      stageUuid: "cfb18007-c7e0-8ddc-b6af-18dbbdbc3eae"
    - stage: boundary
      stageUuid: "97825268-792e-8de6-b8d3-932bf181ce90"
    - stage: links
      stageUuid: "d376d363-a49a-8306-938d-24aa184ae6e4"
    - stage: horo
      stageUuid: "062a3b4b-6298-804c-88f4-8229e6449c28"
    - stage: seal
      stageUuid: "05f9e206-43bb-8ebe-8bbb-46d89406277d"
    - stage: uuid
      stageUuid: "53ba5b5a-47a8-876b-b856-6d4192d0bb0b"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422`
- `@standard NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)`


- **RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422** — the qualified-timestamp anchor family; forging requires breaking the TSA key.
- **NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)** — RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit; the values in `ANCHOR_STRENGTH_BITS` must match these tables.
