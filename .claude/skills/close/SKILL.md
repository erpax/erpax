---
name: close
description: Use when reasoning about the forbidding boundary state in erpax — fiscal period locked, document sealed, shift/stream finished, month-end close. The universal root of the closed state; dual of open.
---

# close — the forbidding state (locked · sealed)

`close` is the universal root of the **forbidding boundary**: a fiscal period *closes* / locks → no GL writes for any date in it ([[accounting]]); a document seals → its content-uuid is frozen, immutable ([[identity]], [[versions]]); a shift / stream finishes. Dual of [[open]]. The month-end *close* assembles and freezes the period ([[accounting]]). Enforced by a write-guard [[hooks]] — the [[end]] of a [[flow]].
