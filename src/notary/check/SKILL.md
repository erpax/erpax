---
name: check
description: "Use when a notary must verify an instrument before sealing it — the per-document-type duty matrix (identity, capacity, title, encumbrance, cadastre, sanctions, tax, spousal consent, company, signature, timestamp, apostille) mapped to the responsible Bulgarian register and the standard it satisfies, with a rosetta coverage audit that surfaces every unwired gap. Provider adapters are contracts; live wiring needs accredited credentials — no endpoint is fabricated, no gap is hidden."
---

# check — what a notary verifies, per document

A notary does not only seal — it **checks** first, and different instruments demand different checks. A deed of sale needs title, encumbrances, cadastre, spousal consent and tax; a power of attorney needs none of those. This atom makes that duty computable: the **check → provider → standard** rows (the rosetta), the **per-document requirement matrix**, and a **coverage audit** that enumerates every gap.

## The duty matrix

Each [[check]] is answered by a real Bulgarian institution and satisfies a standard:

| check | provider (register) | standard / basis |
| --- | --- | --- |
| identity · capacity | ГРАО (НБД Население) | AMLD5 CDD · civil capacity |
| representation · spousal consent · apostille | Нотариална камара | POA register · Family Code · Hague 1961 |
| title · encumbrance · company | Агенция по вписванията | Имотен + Търговски регистър |
| cadastre | АГКК / КАИС | Cadastre & Property Register Act |
| tax | НАП | tax clearance |
| signature · timestamp | eIDAS QTSP (B‑Trust / Evrotrust / InfoNotary) | eIDAS 910/2014 · RFC 3161 |
| sanctions | EU/UN/OFAC + PEP | AMLD screening |

Matter-twin: `src/notary/check/index.ts` — `CHECKS` · `REQUIRED` · `coverageAudit` · `providersFor` · `ProviderAdapter` · `unwired`.

## Leave no gap — honestly

`coverageAudit(documentType, wiredProviders)` returns **every** required check whose provider is not yet wired. "Production-grade, no gaps" means the audit reports `complete: true` — reached only when every adapter a document touches is bound to its live, credentialed endpoint. Until then the gaps are **surfaced, not hidden**, and `unwired()` **refuses** rather than fabricate a passing check: a notarial act must never be sealed on a fabricated verification.

**Honest boundary.** The providers are the real institutions responsible for each check, but this atom wires no live endpoint and holds no credential. Live integration requires the deployer's accredited access — several registers demand a **licensed-notary legal basis** — plus a verified endpoint spec per provider. The institution→check mapping is an engineering model to validate against current BG law with a qualified professional; it is **not** legal advice.

**Law — [[law]]: a notary checks before it seals, and the checks differ by instrument. The duty is complete only when every required check is answered by an accredited provider; an unanswered check is a gap that must be surfaced, never fabricated, and a seal must never issue over one.**

## Standards

- **eIDAS — Regulation (EU) No 910/2014** — qualified signatures, seals, timestamps.
- **RFC 3161** — trusted timestamping.
- **AMLD5 — Directive (EU) 2018/843** — customer due diligence, PEP/sanctions screening.
- **Hague Apostille Convention (1961)** — cross-border authentication.

Composes: [[notary]] · [[law]] · [[standards]] · [[uuid]].
