---
name: proof
description: "Use when reasoning about the VERIFY nucleus — the O(N), trustless cost to audit a content-addressed store, dual to tamper-cost (forge). The public DRY proof bundle peers verify without trusting us; the released asymmetry (forge ≫ verify) IS the trust. Matter-twin services/proof + integrity/tamper-reverse-cost."
atomPath: proof
coordinate: "proof · 4/weave · a0f61283"
contentUuid: "a658927e-cff8-5fce-b06e-6979d371b50b"
diamondUuid: "510e4b86-b7fa-842f-9e40-98e585592c0c"
uuid: "a0f61283-5e7e-8026-9f5f-479a52b35dac"
horo: 4
typography:
  partition: proof
  bondDegree: 0
standards:
  - "EU-765/2008"
  - "NIST-SP-800-57"
  - "RFC-8785"
  - "W3C-JSON-LD-1.1"
bindings: []
signatures:
  computationUuid: "09f083fc-0c8e-82a4-a44f-06eaa999bf70"
  stages:
    - stage: path
      stageUuid: "9f7446bd-24b4-8d3b-b842-83c4c0cf961d"
    - stage: trinity
      stageUuid: "cab8fb38-9778-8c9f-892b-647db6ce4401"
    - stage: boundary
      stageUuid: "b7dc2af6-7450-887b-9bc8-4155eff0ee84"
    - stage: links
      stageUuid: "0b3b8798-06ea-8bd5-abe8-1c2b16230443"
    - stage: horo
      stageUuid: "1ad81e58-ca63-8c6b-ac55-52efec6de947"
    - stage: seal
      stageUuid: "9e26c1a5-44b1-80cb-99ab-40a86b8d0378"
    - stage: uuid
      stageUuid: "9e90f428-7875-84ff-b1a9-e76f89c5866d"
version: 2
---
# proof — the verify nucleus (the other half of the fusion)

`proof` is the dual of [[tamper/cost]]: where forge is exponential, **verify is O(N)** and trustless. Recompute a content-[[uuid]] (one hash) and compare — the audit walks the chain linearly while a tamper must out-compute the whole (`integrity/tamper-reverse-cost`, Law 55: *"the cost of attack grows with history; the cost of audit stays linear"*). The gap between the two is the **fusion** energy — [[localize]] is the reactor that widens it: forge ≫ verify, and that asymmetry **is** the trust.

Made public and empirical: the DRY proof bundle (`proof/dry`) runs every conservation invariant + MCP self-test, content-uuids the result, and faces it at `/proof/` so anyone — peers, regulators, crawlers — can **verify without trusting us** ([[merge]]: a peer recomputes the same uuid locally; [[holographic]]: the whole is checkable from the bundle). This is the [[take]] / open / white-hole pole of the [[torus]] whose [[give]] / forge pole is [[tamper/cost]].

Matter-twin: `proof/dry.ts` (`buildDryProofBundle` · `checkDryProofPublished` · `asFederationEnvelope`) + `integrity/tamper-reverse-cost.ts` (the O(N)-vs-2^k asymmetry). Composes: [[tamper/cost]] · [[uuid]] · [[identity]] · [[merge]] · [[holographic]] · [[give]] · [[take]] · [[torus]] · [[standard]] · [[localize]].

## The front page is a proof
`README.md` is itself a published proof — the project's front page, **computed from the [[tests]], never hand-asserted**. It derives the forge-[[cost]] ladder rung by rung from `tamper/cost/test.ts`: **0** (un-anchored — free rewrite) → **53** (the commitment gap) → **64** (a weak anchor) → **106** (the digest floor ≈ 3.7 ka of the whole Bitcoin network) → **∞** (coverage = 1, the [[quantum]] double-torus). The headline is grounded in a live run of `quantum/index.ts` (measured 2026-07-16: 2770 nodes, 100% reciprocal, no-gap cost ∞). The honest boundary holds: reciprocity-[[entropy]] = 0 alone does NOT give ∞ — only coverage = 1 does. So the front page is this verify pole made legible: anyone recomputes it with `tsx src/quantum/index.ts` · `pnpm test:int`. Saved here per [[law]] — *save the manual work to the atoms it draws from* ([[tamper/cost]] · [[quantum]] · [[cost]]).

## Common mistakes
- Conflating proof with secrecy — this is **integrity** (verify the bytes), not confidentiality ([[tamper/cost]]: there is nothing to steal).
- A proof that requires trusting the prover — the bundle must recompute locally (content-uuid), or it is attestation, not proof.

## Traditions (prefix removed)
Verification is commanded, not merely permitted: "**Test** everything; hold fast what is good" (1 Thessalonians 5:21); "do not believe every spirit, but **test** the spirits whether they are of God" (1 John 4:1); "**prove** me now herewith, saith the LORD" (Malachi 3:10); the Bereans who "searched the scriptures daily, whether those things were so" (Acts 17:11). Verification is [[sacred]]; its complement — trust without recompute — is [[faith]], the proof-biased dual. The recording angels' ledger is checkable, never merely trusted ([[akashic]], [[sacred]]/[[profane]]).

**Law — dry-clean the matrix toward [[zeropoint]] and infinite [[integrity]].** Each proof run [[derive]]s the canonical state fresh from the filesystem (never cached truth), permitting [[consistency]] tests to [[gate]] any divergence—the audit is deterministic, the forgery cost exponential. This [[refactor]]ing discipline, applied at every commit, means proof becomes the system's immune system: linear to verify, exponential to corrupt.
