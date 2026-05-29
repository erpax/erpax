---
name: tax
description: Use when a value bears VAT/GST/sales/withholding tax — a rate on a taxable base, UN/CEFACT 5305 category codes, EN-16931 VAT breakdown, inclusive/exclusive pricing, exemption, reverse-charge, the tax point. The TaxConcern; tax is a cascade-resolved rate on a base, one engine feeding receipt+total+SAF-T, never a baked literal.
---

# tax — a levy is a rate on a taxable base, categorized by a standard code

`tax` is the levy concern-atom (VAT · GST · sales/use · withholding · excise): a [[rate]] applied to a taxable [[currency]] base → a tax amount posted to [[accounting]] (payable on sales / recoverable on purchases). Categorized by a [[standard]] code — UN/CEFACT 5305 (`S` standard · `Z` zero · `E` exempt · `AE` reverse-charge · `K` intra-EU · `G` export · `O` out-of-scope) — and broken down per category × [[rate]] (EN-16931 §BG-23). Sequence position **1** ([[fields]]).

The form (hold it; the codebase holds which jurisdiction charges what):
- **rate, never a literal** — the tax [[rate]] is cascade-resolved (jurisdiction × category × date = the *tax point*, [[versions]]), never a baked `?? 0.20`.
- **inclusive ⇄ exclusive** — a price either includes or excludes tax; back the net out of the gross at the resolved [[rate]] (the [[supto]] net split), one way — not a stored `taxIncluded` flag that duplicates the math.
- **exempt is categorical** — `E`/`Z`/`O` route to the zero-rate identity element with a reason code ([[identity]]), never a missing row.
- **reverse-charge / intra-EU** — the liability shifts to the buyer (`AE`/`K`); the buyer self-accounts both sides, net-zero cash — a [[party]] role-shift, not a different number.
- **one engine** — a single tax calculator (`vatBreakdownForItems`) feeds the касов бон, the invoice total, the SAF-T file and the audit file; never re-compute per surface.

Profiles are matter: the BG СУПТО groups (А/Б/В/Г) + НАП VAT are a [[supto]] profile over this form; EU OSS, US sales/use are others — read them from the config, don't catalog them here.

Composes: [[rate]] (the tax rate), [[currency]] (base + tax amounts), [[accounting]] (payable/recoverable GL), [[standard]] (UN/CEFACT 5305 + EN-16931 BG-23), [[party]] (jurisdiction/registration + reverse-charge shift), [[identity]] (exempt element), [[supto]] (BG profile), [[fields]].

## Common mistakes
- A tax rate as a literal (`?? '20'`) — it is a [[rate]], cascade-resolved at the tax point.
- Tax category as free text — use the UN/CEFACT 5305 code ([[standard]]).
- Re-computing VAT per surface (receipt, total, SAF-T) — one engine, shared.
- A stored `taxIncluded?` boolean without the back-out [[rate]] — derive net from gross.
