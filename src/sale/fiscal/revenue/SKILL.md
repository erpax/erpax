---
name: revenue
description: "Use when recognising the revenue of a fiscalised sale — turns a closed sale into the accounting fact, and reverses it through the reverse path rather than deleting anything."
atomPath: "sale/fiscal/revenue"
---
# revenue

Recognises the revenue of a fiscalised sale. It composes [[sale/fiscal/context]] for the device and [[sale/reverse]] for the correction path — because a fiscal sale is never deleted: it is **reversed**, and both entries stay.

## One membrane, many sources

Every source-specific bridge — `order-fiscalization`, `subscription-fiscalization`,
and any future POS or invoice path — is a **thin adapter** that maps its event payload
into a `RevenueInput` and delegates here. That is deliberate: the no-bypass invariant,
the **чл. 3 ал. 1** fiscalisation-scope rule, ФУ resolution, idempotency and the сторно
logic then exist in exactly ONE place. A second implementation of any of them is the
duplication this corpus treats as camouflage — while one rule is stated twice, nothing
can show a third caller is missing it.

A sale records its origin in a polymorphic `source` group (`{type, ref}` — the STI
discriminator), and that pair is what keys both idempotency and сторно.

**The two records are not the same kind of thing.** The source document is the
*mutable* commercial record; the fiscal sale is the *immutable*, gapless-УНП register
entry ([[sale/immutability]]). This membrane is the join, and it is the only lawful
crossing.

Composes: [[sale]] · [[sale/fiscal/context]] · [[sale/reverse]] · [[law]].
