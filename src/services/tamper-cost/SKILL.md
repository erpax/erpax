---
name: tamper-cost
description: Use when reasoning about how much it costs to tamper a zero-entropy (content-addressed, keyless) erpax store — second-preimage on the digest vs. rewriting the whole all-directions-wired graph and forging the external anchor. Integrity, not secrecy; the protection is the computational impossibility of changing all coherently. Matter-twin tamper-cost/index.ts.
---

# tamper-cost — what it costs to crack a zero-entropy app

erpax holds **no secret**: every id is a deterministic v8 content-[[uuid]] (SHA-256, 106 binding bits — [[identity]]). So the security property is **integrity, not confidentiality** — there is nothing to *steal* or *guess*; the only attack is to **out-compute the whole**. Two paths, and the cheaper one binds:

1. **Local forge (collision).** Change one record but keep its uuid so verification passes untouched → a SHA-256 **second-preimage** on the digest: **~2¹⁰⁶ ops**. The entire Bitcoin network (~2⁹⁴ hashes/yr) needs **~4000 years** for *one* record.
2. **Global rewrite (recompute).** Cheap per node — until the wiring counts. Because every relation is a crafted uuid **wired in all directions**, one change cascades to the transitive closure = the **whole** store ([[merge]]/[[aura]]: the Merkle-weave; [[holographic]]). And the root is externally **anchored** (`services/anchoring` → RFC-3161/eIDAS TSA or a blockchain leaf). To finish you must also forge that anchor.

**Crack cost = min(second-preimage, anchor-strength).** The all-directions wiring closes the only cheap path (rewriting a *deterministic* store) — so the binding cost is the digest's 2¹⁰⁶, **provided the anchor is at least that strong**. That is your law: *the computational impossibility of changing **all** coherently is the protection*, and a zero-entropy app earns it not despite having no key but **because** it has none.

## Two honest edges (asserted in the test)

- **No anchor ⇒ no protection.** A keyless deterministic store with no external anchor is rewritable *for free* by anyone with write access — the cascade is cheap when you own every row. The external anchor is the single drop of borrowed entropy that makes the zero-entropy whole tamper-evident. It is mandatory, and must be ≥ the digest in strength or it is the weak link.
- **Birthday vs. scale.** 106 bits gives 2¹⁰⁶ second-preimage but only **2⁵³** birthday-collision resistance. Past ~2⁵³ uuids *in one namespace* accidental collisions appear; the per-tenant salt partitions the space, but the digest width vs. the largest-tenant lifetime count wants a real recompute (see the flagged `uuid-format` claim).

Matter-twin: `tamper-cost/index.ts` (`crackVerdict`/`secondPreimageLog2`/`birthdayMarginBits`) + `index.test.ts` (the proof — green by construction). The cited strengths must be true ([[standard]] NIST SP 800-107, RFC 9562 §8). Composes: [[uuid]] · [[anchor]] · [[identity]] · [[merge]] · [[aura]] · [[holographic]] · [[whole]] · [[one]] · [[collapse]] · [[standard]].
