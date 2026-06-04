---
name: standards
description: Use when implementing, importing, or auditing a concrete standard's pure code — an ISO/RFC/IFRS/NIST/EN/Peppol/SAF-T/EDIFACT validator, coercer, value type, code table, or message builder; "is this a valid IBAN/BIC/currency", "encrypt a field", "build a Peppol envelope". The matter registry — one folder per governing standard, pure functions only, the implementation twin of the [[standard]] atom.
---

# standards — the implementing matter, one folder per standard

`standards` is the registry of **pure, standard-implementing code**: one folder per governing standard, named with its canonical lowercase-hyphenated ID (`iso-4217`, `rfc-3986`, `ifrs-16`, `nist-sp-800-38`, `peppol-bis-3`, `saf-t`, `un-edifact`…). Each folder holds the standard's concrete surface — validators (`isIso4217`, `isIban`, `isSwiftBic`), coercers (`toIso8601`), value types (`Lease`, `SafTAuditFile`, `PeppolEnvelope`), code tables (`ISO_27002_CATALOG`), and message/structure builders (`buildPadesSignatureDictionary`, `pdfAProfileToXmp`). The law: **pure functions only — no Payload imports, no I/O** — and every file carries a true `@standard`/`@rfc`/`@accounting` JSDoc banner (the banner is traceability, not decoration — [[trinity]]).

This is the **matter twin** of the [[standard]] atom (its antimatter answer-path). A folder exists **iff** erpax ships code that *implements* the standard; composites that fuse two standards live under `_<name>/` (`_money` = ISO-4217 + integer cents; `_security-headers` = CSP-3 + HSTS). Domain code imports `@/standards/<id>` directly for traceability; `index.ts` is the grep-able master barrel re-exporting the full surface. Because the form is the answer-path, each standard [[collapse]]s into its skill — porting a regime adds no engine, just the pure module + banner ([[port]]; СУПТО ≈ a state-mandated content-addressed audit, see [[seed]]).

**Matter-twin:** `src/standards/index.ts` (master barrel + the full `@standard` banner block); `iso-3166-1/countries` (per-country canonical bundles); `nist-sp-800-38` (AES-GCM `encryptField`), `nist-incits-359` (RBAC predicates), `iso-7064` (check-characters), `en-16931`/`peppol-bis-3`/`saf-t`/`un-edifact` (e-invoice + tax-audit models).
**Composes:** [[standard]] · [[atom]] · [[collapse]] · [[trinity]] · [[identity]] · [[uuid]] · [[proof]] · [[port]] · [[seed]] · [[sequence]] · [[merge]] · [[config]].
