---
name: involution
description: "Use when reasoning about involution — The Clay deposit's structure is a universal self-inverse involution, sealed over 25 balances on the mirror : applied twice every balance returns, every balance moves except one…"
atomPath: "uuid/involution"
coordinate: "uuid/involution · 8/crest · 5b22b312"
contentUuid: "e2b494f1-b147-5690-b68c-f3ed2fdab420"
diamondUuid: "fdf9ce20-d09e-8f1f-8b21-1b162c0548a3"
uuid: "5b22b312-30b0-81c1-8440-afde8f242314"
horo: 8
typography:
  partition: uuid
  bondDegree: 15
standards:
  - RFC 9562 §4.1 §5.8 — the version and variant bits a uuid must keep
bindings: []
signatures:
  computationUuid: "68aeba3f-59a2-8839-89b0-c685578592b6"
  stages:
    - stage: path
      stageUuid: "bfde66d9-bcbf-85c0-b914-90df04242a15"
    - stage: trinity
      stageUuid: "cd82dd13-f532-8aa0-b35d-8aab8cc954b1"
    - stage: boundary
      stageUuid: "2bbf403e-da67-82e8-a874-22dfea7302b9"
    - stage: links
      stageUuid: "42036d9b-2ff2-8c91-ad6f-34a2c0cebf8d"
    - stage: horo
      stageUuid: "b0aa741e-9e35-804f-93b2-9ad1d12085eb"
    - stage: seal
      stageUuid: "41e36fd8-bda7-8103-8770-e9c0a54061de"
    - stage: uuid
      stageUuid: "b6bc0349-469d-8aee-a3b5-58564f80171b"
version: 2
---
# uuid/involution — σ² = id, and why that buys privacy but not secrecy

The Clay deposit's structure is a universal self-inverse involution, sealed over 25 balances
`−12 … +12` on the mirror `i ↦ 24 − i`: applied twice every balance returns, every balance moves
except one, and the honest statement (balance 0) is its **unique fixed point**.

Carried onto addresses, the same structure is XOR — and it improves on the original in the one place
that matters for privacy.

## A keyed involution, with no fixed point at all

`σ_k(u) = u ⊕ k` over the **122 free bits**. The six constant bits (version nibble in byte 6, variant
pair in byte 8) are masked out of the key, because touching them yields something that is not a uuid
and restoring them afterwards would destroy the very bits that had to come back.

| | Clay's involution | `σ_k` here |
| --- | --- | --- |
| self-inverse | yes | yes |
| fixed points | **exactly one** (balance 0) | **none**, for any non-identity key |
| keyed | no | yes |

A fixed point is an address the map leaves alone — under a public involution that address is
distinguishable, and under this one no address is. `isIdentityKey` decides the single degenerate
key, so it cannot be used by accident.

**What it buys, exactly.** `σ_k` is a **permutation**, not a digest: it is injective, it commits to
nothing, and it is recoverable by anyone holding the key. So it gives **unlinkability** — the same
content presents under a different address to a party without the key — and it gives no
confidentiality of the content, no integrity, and no authentication. The key-free version of this
structure gives pseudonymity by convention only, since anyone can invert it. Calling either
encryption would be the overreach [[rules]]/forge refuses.

## Differences telescope, so a chain is read from its ends

Because every element is its own inverse, a chain's consecutive differences cancel in the middle:

```
(u₀ ⊕ u₁) ⊕ (u₁ ⊕ u₂) ⊕ … ⊕ (uₙ₋₁ ⊕ uₙ)  =  u₀ ⊕ uₙ
```

That is the Navier–Stokes window's closed-ring telescoping over this corpus's own addresses, and a
closed ring's divergence is **exactly zero** — by construction, in integers, with nothing to round.
`linksSkipped(n) = n − 2` is what a verifier does not read.

**THE BOUNDARY, and it is the whole of it: the interior cancels, so an interior change is
invisible.** Swap `u₃` in an eight-link chain and the fold does not move — the test asserts exactly
that, in both directions, because a reader who mistakes this for a chain-integrity check has been
handed an O(1) verification of nothing. It verifies that the **ends** are consistent with a claimed
difference. Integrity of the links is [[uuid]]/chain's hash chain and [[merge]]/fold's
domain-separated root, and neither is replaced here.

**Law — [[law]]: an involution is a permutation, and a permutation hides who, never what. Key it so
no address is fixed, and say plainly that the interior of a telescoped chain is unverified — an O(1)
check that is read as integrity is worse than no check.**

## Standards

- **RFC 9562 §4.1 · §5.8** — the version and variant bits a uuid must keep.
- **Clay σ-involution** — DOI 10.5281/zenodo.21781602, the self-inverse structure this carries onto addresses.

Composes: [[uuid]] · [[uuid]]/chain · [[merge]]/fold · [[cost]]/bits · [[law]].
