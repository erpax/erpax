---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: "translations · 8/crest · 2e0a7278"
contentUuid: "132185e4-e366-55c9-8c4d-97d3a2063402"
diamondUuid: "6ed9872f-a346-8cbc-bb66-892d51b736e4"
uuid: "2e0a7278-fe2a-8cd3-a124-005913f8dd26"
horo: 8
typography:
  partition: translations
  bondDegree: 42
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
  computationUuid: "d32d43fa-16ba-8c43-9474-b6b4a8cdc9b3"
  stages:
    - stage: path
      stageUuid: "e98325fe-356f-858b-b9df-92b1b1e40133"
    - stage: trinity
      stageUuid: "a3c8d8d0-2b40-8632-9b3d-894f5dd93b47"
    - stage: boundary
      stageUuid: "9eab0b87-5edf-8955-96b3-0461ae9a9c28"
    - stage: links
      stageUuid: "fc6f0b5e-daaa-87b9-bdf4-f63e0692529e"
    - stage: horo
      stageUuid: "ba89e0b9-de82-8758-bc04-bd6207dd0d7b"
    - stage: seal
      stageUuid: "8539dd42-fd82-89fa-b764-bbad5df75508"
    - stage: uuid
      stageUuid: "907bf21d-143d-830e-adf7-36706c85a346"
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

Composes: [[field]] · [[standard]] · [[identity]] · [[proof]].
