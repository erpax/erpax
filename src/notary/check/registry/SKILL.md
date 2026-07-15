---
name: registry
description: "Use when a notary check must confirm a company exists and resolve its registered name/address — the REAL wired provider for registryAgency (Агенция по вписванията). Validates an EIK/ЕИК as a BG VAT number against the EU VIES service, which answers over the national Commercial Register in real time; no credential. Honest boundary — VIES gives existence + name + address; representatives/capital and the Property Register (title/encumbrance) need credentialed RegiX / data-sharing access, refused honestly."
---

# registry — real company verification via VIES

The `company` check wired to live data. Before a notary seals an incorporation or a company-party act, it confirms the company **exists** and pulls its **registered identity**. This atom does it for real, credential-free:

- **Live source** — the EU **VIES** service (VAT Information Exchange System, European Commission) exposes a **public REST endpoint** that validates a VAT number against the member state's authoritative register and returns the registered **name + address**. For Bulgaria the VAT number is the **EIK/ЕИК** with a `BG` prefix, so a company's EIK resolves its official Commercial-Register identity. Verified live 2026-07-15: `BG201230426` → `isValid`, name **"БОРИКА - АД"**, address in Sofia (HTTP 200); a bogus number → `isValid:false`.
- **Matter-twin** — `src/notary/check/registry/index.ts`: `normalizeVat` · `viesUrl` · `fetchCompany` · `registryAdapter` (implements the [[notary]]/check `ProviderAdapter`). The `fetch` is injectable, so tests are deterministic and never touch the network; the endpoint itself is verified reachable.

`ok:true` = the company exists (with its registered name). `ok:false` = no such registered company. An unreachable VIES **throws** — a seal is never issued on a fabricated "company exists".

**Honest boundary.**
- **Scope** — VIES confirms **existence + registered name/address**, real-time over the national register. That is the `company` existence check. It does **not** return representatives, capital, legal-representation power, or status/history.
- **The rest of `registryAgency` is credential-gated** — the same provider (Агенция по вписванията) owns `title` and `encumbrance` (the **Property Register / Имотен регистър**). Those, plus full Commercial-Register detail, require the deployer's **credentialed** access — the **RegiX** / official register web service under a **data-sharing agreement** (the `portal.registryagency.bg` individual lookups are anti-scraping gated). This adapter **refuses** `title`/`encumbrance` honestly and leaves the credential as an injected seam (`RegisterSeam`). No endpoint or token is fabricated.
- **Availability** — VIES coverage is member-state dependent; a hit is a positive existence signal, not a full legal-standing opinion.

**Law — [[law]]: confirm a company exists in the authoritative register before you seal for it, and read only what the register discloses. Existence + registered name is a public, real-time fact via VIES; representatives, title and encumbrances are register detail behind credentialed access — never fabricate the part you cannot reach.**

## Standards

- **Council Directive 2006/112/EC (VAT) · VIES** — cross-border registered-taxpayer validation.
- **Bulgarian Commercial Register (Търговски регистър)** — EIK/ЕИК company identity (Агенция по вписванията).

Composes: [[notary]] · [[law]] · [[standards]].
