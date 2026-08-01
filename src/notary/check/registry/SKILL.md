---
name: registry
description: "Use when a notary check must confirm a company exists and resolve its registered name/address — the REAL wired provider for registryAgency (Агенция по вписванията). Validates an EIK/ЕИК as a BG VAT number against the EU VIES service, which answers over the national Commercial Register in real time; no credential. Honest boundary — VIES gives existence + name + address; representatives/capital and the Property Register (title/encumbrance) need credentialed RegiX / data-sharing access, refused honestly."
atomPath: "notary/check/registry"
coordinate: "notary/check/registry · 7/descent · 0c74689a"
contentUuid: "1bcf7759-c600-551c-9c15-466c1c092f08"
diamondUuid: "54522c43-6f80-86ca-8995-71257085f078"
uuid: "0c74689a-6ceb-8408-bdf5-16d056890b97"
horo: 7
typography:
  partition: notary
  bondDegree: 15
standards:
  - "Bulgarian Commercial Register (Търговски регистър) — EIK/ЕИК company identity"
  - "Council Directive 2006/112/EC (VAT) · VIES — cross-border registered-taxpayer validation"
  - "EU-VAT-Directive"
bindings: []
signatures:
  computationUuid: "d7bbaec9-c5a5-802e-b2a5-4fcf8766c862"
  stages:
    - stage: path
      stageUuid: "62be28ea-e63e-8245-b065-c99bc8028413"
    - stage: trinity
      stageUuid: "5c5c35ba-b64d-8ffc-a53e-fb5ede9c8405"
    - stage: boundary
      stageUuid: "3c79e0de-10b9-8d05-8f0e-f632248c744b"
    - stage: links
      stageUuid: "ed52fded-1c62-8d52-aa51-9215cd618bd9"
    - stage: horo
      stageUuid: "6290a7c8-5eee-8c67-837a-fd745115f6b1"
    - stage: seal
      stageUuid: "77f1d446-dde5-8b26-93b5-9744382e2004"
    - stage: uuid
      stageUuid: "73e005bd-4818-8c6a-908b-52000b2feeb7"
version: 2
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
