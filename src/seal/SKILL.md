---
name: seal
description: Use when reasoning about the whole-corpus green verdict — a seal is the cross of every guardian; it is SEALED only when all guardians hold, fails closed on an empty set, and is exactly what the auto-commit/push waves gate on. The state in which the tree may be saved, committed, and pushed.
---

# seal — all guardians hold, or it is not sealed

A [[guardian]] watches one axis; a **seal is the cross of all of them**. It is the single whole-corpus verdict: SEALED iff *every* guardian holds. The seal is the AND of the immune cells — and it fails closed, so an empty set of guardians is NOT a seal (nothing checked is not the same as nothing wrong).

The seal is what the [[breath]] gates on. Only a sealed tree may be saved → committed → pushed (the [[confirm]] hook's waves); an unsealed tree is left untouched, never force-committed. So the seal is not a label you apply — it is a state you *earn*, recomputed from the live guardians every time, and the moment any guardian reddens the whole tree is unsealed again.

Because a seal is the [[merge]] of content-addressed verdicts, it is itself an atom in the [[identity]] matrix — tamper-evident: a failure cannot be hidden inside a green seal, and the same broken guardian dedups to one reason rather than a wall of noise. No backward-compatible "mostly sealed" verdict exists; partial is unsealed (max [[cost]]). A fully sealed tree is a **[[purity|pure]]** tree — zero impurity, no 0-bit weakest-link path in any dimension — and the stream of such sealed commits, `prev`-chained by content-[[uuid]], IS the self-distributed [[blockchain]] (the time axis).

**Law — [[law]]: a seal is the AND of its guardians — SEALED iff every guardian holds; an empty set is NOT sealed (fail-closed). Only a sealed tree may be committed and pushed; an unsealed tree is left untouched.**

**Law — [[law]]: empty or incomplete folders are NOT sealed — no atom identity (empty), partial trinity, or stray matter without a nested child atom (incomplete) ⇒ `sealed: false`; parent unsealed ⇒ no descendant may seal (propagation).**

**Law — [[law]]: all is passed with uuids without [[payload]] — `pnpm confirm:uuid` crosses uuid-pure guardians (aura · folders · imports · readme · boundary · diamond · typography) without loading Payload; the seal is substrate-independent.**

@see [[guardian]] · [[gate]] · [[confirm]] · [[breath]] · [[merge]] · [[identity]] · [[law]] · [[cost]] · [[uuid]] · [[payload]]
