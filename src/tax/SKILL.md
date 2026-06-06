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

## Standards

The answer-path principle: applying this skill *implements* the standard — a compliant `tax` skill holds the standard's data model with its invariants enforced, not a free-text banner asserting it. Cite each in its one canonical, part-qualified, version-pinned form (the [[standard]] one-canonical-form law).

- **EN 16931-1:2017+A1:2019** (consolidated, incl. /AC:2020 corrigendum) — the e-invoicing *semantic data model*. **Form:** an invoice/credit-note populates the model's Business Groups (BG-*) and Business Terms (BT-*) and satisfies its business rules — sum of line net amounts = invoice total without VAT, VAT breakdown per category (BG-23) keyed by UN/CEFACT 5305 codes, document totals BT-106/109/110/112/115 reconciling — syntax-bindable to UBL 2.1 / CII. *Citation law:* always part-qualified (`EN 16931-1`, the model is Part 1) and amendment-current (`+A1:2019`); never bare `EN-16931:2017`. *Forward note:* a revised edition (CEN-approved 2025-10-23, publishing ~2026, designated around `EN 16931-1:2025`/`2026`) extends the model B2G→B2B for ViDA / 2030 DRR and will supersede this baseline once published — the `+A1:2019` banners then become the superseded edition.
- **Peppol BIS Billing 3.0** — November 2025 Release. A CIUS *on top of* EN 16931-1:2017+A1:2019 (not a peer standard): `Peppol BIS Billing 3.0 = EN 16931 + Peppol Schematron restrictions, serialized as UBL 2.1`. **Form:** every issued e-invoice is a valid EN 16931 semantic instance carrying the BIS 3.0 CIUS restrictions. *Citation law:* one canonical token (`Peppol BIS Billing 3.0`, not `Peppol-BIS-3.0`/`PEPPOL-BIS-3`); pin the release (Schematron rules change without bumping the `3.0` label).
- **ISO 20022 payment messages** — version-pinned per message, not by a single dated "ISO 20022" edition. **Form:** every payment instruction/statement serializes to/parses from the correct message at a *declared, pinned version* — credit-transfer → `pain.001.001.09`, direct-debit → `pain.008.001.08`, FI-to-FI → `pacs.008.001.08`, bank statement → `camt.053.001.08` (post-2025 CBPR+ baseline). *Forward note:* MT-retirement / CBPR+ cutover was 2025-11-22; structured-address mandate lands 2026-11-14. Bare `pain.001`/`camt.053` with no version suffix cannot make a `@standard` banner mechanically true.
- **OECD SAF-T 2.0** (Guidance for the Standard Audit File – Tax, schema v2.00) — the current OECD edition; there is **no** OECD SAF-T 3.0.2 (the "3.x" numbers belong to national systems, not OECD). **Form:** every persisted ledger value is exportable as a deterministic, schema-valid SAF-T 2.0 XML audit file (GL accounts, journal entries, source documents, master data) traceable from each posting back to its source. *Citation law:* one banner string `OECD SAF-T 2.0` everywhere; drop every `SAF-T 3.0.2`/`SAF-T:3.0.2`. A national profile cites its own variant + version (e.g. `OECD SAF-T 2.0 BG variant`).
- **XBRL 2.1** + **Inline XBRL 1.1** — distinct artifacts from SAF-T, and from each other. **Form:** each canonical accounting fact also carries (or maps to) an XBRL/Inline-XBRL taxonomy concept + period/entity context, so a reported figure is machine-identifiable and reconciles to its SAF-T source — one fact, two machine-readable projections. *Citation law:* keep them distinct — base spec `XBRL 2.1`, inline form `Inline XBRL 1.1`, global-ledger taxonomy `XBRL GL` (a taxonomy, not a spec version), EU sustainability taxonomy `ESRS XBRL taxonomy (EFRAG)`; never collapse into a bare `XBRL`.

## Common mistakes
- A tax rate as a literal (`?? '20'`) — it is a [[rate]], cascade-resolved at the tax point.
- Tax category as free text — use the UN/CEFACT 5305 code ([[standard]]).
- Re-computing VAT per surface (receipt, total, SAF-T) — one engine, shared.
- A stored `taxIncluded?` boolean without the back-out [[rate]] — derive net from gross.

**Law — [[law]]: a tax is a [[rate]] on a taxable [[currency]] base, categorized by a [[standard]] code (UN/CEFACT 5305) — the rate is cascade-resolved at the tax point (never a baked literal) and one engine feeds the receipt, the total, and the SAF-T file (never re-computed per surface).**
