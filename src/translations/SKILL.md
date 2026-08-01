---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: "translations · 7/descent · 08b24ce9"
contentUuid: "b24288ff-36cc-557b-89e2-58ed75fbec18"
diamondUuid: "bff84b62-110e-8320-a5b9-c3d3a2007a6b"
uuid: "08b24ce9-dbe8-8211-9f90-cd5e7f2e9149"
horo: 7
typography:
  partition: translations
  bondDegree: 40
standards:
  - "BCP-47"
  - "BCP-47 language tags"
  - "EU 1958/1 official-languages-of-the-european-union"
  - "EU-1958"
  - "EU-1958/1"
  - "ISO/IEC-25010:2023"
  - "RFC-7231"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)`"
  - "W3C-HTTP-Content-Language"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "13ac05a6-7770-8e9f-a6f7-ac86637b3c31"
  stages:
    - stage: path
      stageUuid: "e98325fe-356f-858b-b9df-92b1b1e40133"
    - stage: trinity
      stageUuid: "a3c8d8d0-2b40-8632-9b3d-894f5dd93b47"
    - stage: boundary
      stageUuid: "4cb3026e-c995-8f60-80c3-78d688d177a8"
    - stage: links
      stageUuid: "9ded648d-d36b-8996-99dc-2f9c6bdef15f"
    - stage: horo
      stageUuid: "ca8c5483-1f45-89ad-b8cf-7eb745aa6fb1"
    - stage: seal
      stageUuid: "8539dd42-fd82-89fa-b764-bbad5df75508"
    - stage: uuid
      stageUuid: "5f7df180-fe9b-8e10-8b39-2570ca1fe4f2"
version: 2
---
# translations

Translations — per-tenant override layer above the platform-default.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)`

- W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
- BCP-47 language tags
- EU 1958/1 official-languages-of-the-european-union
- Conservation Law 8 content-uuid
- Conservation Law 10 referential-harmony (relatedTo back to the source row)
- ISO 19011:2018 §6.4.6 (translation changes audit-trailed)

**Law — [[law]]: a per-tenant override layer above the platform default — per-locale values within activation windows, each carrying provenance back to the row it overrides ([[balance]]).**

Composes: [[fields]] · [[standard]] · [[identity]] · [[proof]].
