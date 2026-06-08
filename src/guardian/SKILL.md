---
name: guardian
description: Use when reasoning about a single immune-cell of the corpus — a guardian watches exactly ONE violation axis against its own committed baseline with a fail-closed ratchet, so a rise on its axis reddens the gate on its own and can never be masked by a fix on another axis. Many guardians cross into one seal.
---

# guardian — one axis, one baseline, fail-closed

A [[gate]] is the immune system; a **guardian is one immune cell**. It watches exactly **one axis** of violation (naming, trinity, import coverage, …) against its own committed baseline, and rules with a fail-closed ratchet:

- **one axis only** — a guardian never sums two concerns. Independence is the whole point: a naming violation is caught on the *name* guardian regardless of what the *trinity* guardian does, so nothing rides in masked behind an unrelated fix.
- **ratchets only DOWN** — the baseline is a checked-in literal (reviewable in git); the live count may never exceed it, and a change that fixes the axis LOWERS the literal in the same diff. The axis therefore *cannot get worse*.
- **fail-closed** — a non-finite or negative count, or a broken baseline literal, is NOT a pass (a scan that cannot run did not pass). Pure (no fs, no process) ⇒ regression-locked by `test.ts`.

This is the generalization the folder law's NAME and TRINITY guardians are instances of, and the cell that [[convention]]/import is. Summing axes into one ceiling is the anti-pattern: it let `name + 1` hide behind `trinity − 1` (net zero, PASS). One guardian per axis closes that — *naming violations are caught at the gates by the guardians*. There is no summed back-compat verdict; a shim is tamper-surface, not safety (max [[cost]]).

**Law — [[law]]: a guardian watches exactly one axis and ratchets only DOWN, fails closed (a non-finite count or baseline is never a pass), and is independent — its verdict is unaffected by any other axis, so a violation on its axis is caught on its own.**

@see [[gate]] · [[seal]] · [[law]] · [[convention]] · [[cost]] · [[proof]] · [[identity]]
