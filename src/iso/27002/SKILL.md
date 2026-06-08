---
name: "27002"
description: Use when implementing or referencing ISO 27002 — Information security controls.
atomPath: iso/27002
coordinate: iso/27002 · 7/descent · f26a5089
contentUuid: "243c1f07-44ed-5254-9506-ea72212d2568"
diamondUuid: "da784faa-e76b-865e-b730-8b5b9bdca312"
uuid: "f26a5089-2165-814b-90a8-34733dfb4484"
horo: 7
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-27001"
  - "ISO-27001:2022 isms-annex-a-controls"
  - "ISO-27002"
  - "ISO-27002:2022 information-security-controls"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27002:2022"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "316a7bce-29cb-8c5e-b292-8d71bbc8c092"
  stages:
    - stage: path
      stageUuid: "c75f7176-6bcb-807e-90c5-e2348d487758"
    - stage: trinity
      stageUuid: "95acfa63-faf8-8ad2-a383-c9764c479f2f"
    - stage: boundary
      stageUuid: "7911368b-576f-86de-aab8-43bbb043d03c"
    - stage: links
      stageUuid: "42882dd4-ce9c-87f5-af1c-9c14882860c3"
    - stage: horo
      stageUuid: "3085163f-72aa-8f9e-83d6-d1620904853c"
    - stage: seal
      stageUuid: "990774e8-5fb9-88ca-a5e5-5a3a53aa5b59"
    - stage: uuid
      stageUuid: "2f76234e-a06a-82a9-aa60-b9773df7601b"
version: 2
---
# ISO 27002 — Information security controls

**Edition:** ISO/IEC 27002:2022 (third edition, replaces 2013).
**Companion standard:** ISO/IEC 27001:2022 — `Information security management systems — Requirements`.
**Publishers:**
- ISO 27002:2022 <https://www.iso.org/standard/75652.html>
- ISO 27001:2022 <https://www.iso.org/standard/27001>

## What's here

Canonical types for the security control catalog cited across the codebase:

- `Iso27002ControlId` — union of the controls actually used (extend as new ones are cited).
- `Iso27002Theme` — the four themes from ISO 27002:2022 (Organizational, People, Physical, Technological).
- Tables: `iso27002Title(id)` and `iso27002Theme(id)` lookups.

Files:

- `types.ts` — control catalog (id ↔ title ↔ theme).
- `validate.ts` — runtime guard `isIso27002ControlId`.
- `index.ts` — barrel.

## Numbering — ISO 27001 Annex A vs ISO 27002 §

Both standards reference the SAME control by two different numbers:

| Concept | ISO 27001:2022 | ISO 27002:2022 |
|---|---|---|
| Annex prefix | `Annex A.5.x` (Organizational), `A.6.x` (People), `A.7.x` (Physical), `A.8.x` (Technological) | bare `§5.x`, `§6.x`, `§7.x`, `§8.x` |
| Where it lives | Mandatory annex of the certification standard | Implementation guidance |
| Same numbering after the prefix? | Yes — `A.5.15` ≡ `§5.15` | Yes |

Citations in the codebase use both formats: `@security ISO-27001 A.5.23` AND `@security ISO-27002 §8.3` are valid and may even appear in the same banner. The canonical id type collapses both to a single key (`'5.23'`, `'8.3'`, …) so consumer code doesn't have to care which standard the auditor cited from.

## Cited subset (this catalog)

Organizational controls (clause 5):
- 5.4  Segregation of duties
- 5.14 Information transfer
- 5.15 Access control
- 5.16 Identity management
- 5.17 Authentication information
- 5.18 Access rights
- 5.23 Information security for use of cloud services
- 5.34 Privacy and protection of PII

Technological controls (clause 8):
- 8.2  Privileged access rights
- 8.3  Information access restriction
- 8.5  Secure authentication
- 8.11 Data masking
- 8.15 Logging
- 8.16 Monitoring activities
- 8.20 Networks security
- 8.23 Web filtering
- 8.24 Use of cryptography
- 8.30 Outsourced development

This subset reflects the controls a multi-tenant ERP cites for its
access predicates, audit-trail emitters, and operational policies.
Add controls (5.X, 6.X, 7.X, 8.X) as they're cited.

## Out of scope

- The full 93-control ISO 27002:2022 catalog — extend `Iso27002ControlId` and the lookup tables when needed.
- ISO 27001 Information Security Management System (ISMS) clauses 4-10 — those are management-system requirements, not controls.
- Mapping to other catalogues (NIST SP 800-53 / CIS / SOC 2 trust principles) — separate modules if/when needed.

## Used by

- `src/access/*.ts` — every access predicate carries a `@security ISO-27002 §X.Y` banner.
- `src/plugins/auth/access.ts` — RBAC + tenant-scope helpers.
- All multi-tenant collections — `@security ISO-27001 A.5.23 cloud-service-tenant-isolation` banner.

## References

- ISO/IEC 27001:2022 — Information security management systems — Requirements.
- ISO/IEC 27002:2022 — Information security controls.
- ISO/IEC 27017:2015 — Code of practice for information security controls based on ISO/IEC 27002 for cloud services.
- ISO/IEC 27701:2019 — Privacy information management extension.
