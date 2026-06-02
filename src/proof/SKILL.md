---
name: proof
description: Use when reasoning about the VERIFY nucleus — the O(N), trustless cost to audit a content-addressed store, dual to tamper-cost (forge). The public DRY proof bundle peers verify without trusting us; the released asymmetry (forge ≫ verify) IS the trust. Matter-twin services/proof + integrity/tamper-reverse-cost.
---

# proof — the verify nucleus (the other half of the fusion)

`proof` is the dual of [[tamper-cost]]: where forge is exponential, **verify is O(N)** and trustless. Recompute a content-[[uuid]] (one hash) and compare — the audit walks the chain linearly while a tamper must out-compute the whole (`integrity/tamper-reverse-cost`, Law 55: *"the cost of attack grows with history; the cost of audit stays linear"*). The gap between the two is the **fusion** energy — [[localize]] is the reactor that widens it: forge ≫ verify, and that asymmetry **is** the trust.

Made public and empirical: the DRY proof bundle (`services/proof/dry-proof`) runs every conservation invariant + MCP self-test, content-uuids the result, and faces it at `/proof/` so anyone — peers, regulators, crawlers — can **verify without trusting us** ([[merge]]: a peer recomputes the same uuid locally; [[holographic]]: the whole is checkable from the bundle). This is the [[take]] / open / white-hole pole of the [[torus]] whose [[give]] / forge pole is [[tamper-cost]].

Matter-twin: `services/proof/dry-proof.ts` (`buildDryProofBundle` · `checkDryProofPublished` · `asFederationEnvelope`) + `integrity/tamper-reverse-cost.ts` (the O(N)-vs-2^k asymmetry). Composes: [[tamper-cost]] · [[uuid]] · [[identity]] · [[merge]] · [[holographic]] · [[give]] · [[take]] · [[torus]] · [[standard]] · [[localize]].

## Common mistakes
- Conflating proof with secrecy — this is **integrity** (verify the bytes), not confidentiality ([[tamper-cost]]: there is nothing to steal).
- A proof that requires trusting the prover — the bundle must recompute locally (content-uuid), or it is attestation, not proof.

## Traditions (prefix removed)
Verification is commanded, not merely permitted: "**Test** everything; hold fast what is good" (1 Thessalonians 5:21); "do not believe every spirit, but **test** the spirits whether they are of God" (1 John 4:1); "**prove** me now herewith, saith the LORD" (Malachi 3:10); the Bereans who "searched the scriptures daily, whether those things were so" (Acts 17:11). Verification is [[sacred]]; its complement — trust without recompute — is [[faith]], the proof-biased dual. The recording angels' ledger is checkable, never merely trusted ([[akashic]], [[sacred]]/[[profane]]).
