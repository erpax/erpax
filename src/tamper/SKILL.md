---
name: tamper
description: Use when reasoning about integrity attacks on the content-uuid store — the cost to forge, collide, or rewrite a record undetected, and why all-directions uuid wiring drives that cost toward infinity.
---

# tamper — integrity, not confidentiality

erpax stores no secret: every id is a content-uuid derived from content ([[uuid]] · [[identity]]). The only attack is to out-compute the [[whole]] — so security is **integrity**, measured as **cost**. The measure lives in [[cost]] (`tamper/cost`): a local forge ≈ 2^digest, a chosen-content collision ≈ 2^(commitment/2), a global rewrite closed by the external [[anchor]]. Because every relation is a content-uuid wired in all directions ([[merge]]), changing one record cascades to the transitive closure — and at 100% coverage the undetected-tamper cost is ∞ ([[proof]]). Zero entropy ⇒ infinite mass ⇒ infinite tamper-cost: [[one]] limit.

Matter-twin: [[cost]] (`src/tamper/cost` — `crackVerdict`, the security math).
Composes: [[cost]] · [[uuid]] · [[identity]] · [[merge]] · [[anchor]] · [[proof]] · [[whole]].

**Law — [[gate]]** A tamper the O(N) verify cannot catch must not exist: `verifyBind`/`verifyRoot` recompute every content ⊕ coordinate bind, and the [[anchor]] borrows the external entropy that closes the free-rewrite path.
