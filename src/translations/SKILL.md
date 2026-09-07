---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: "translations · 2/share · c4bed6ac"
contentUuid: "b9c606ff-a6e8-522f-86a7-54a3b1111a3b"
diamondUuid: "a5e0814e-527c-8d81-aea7-1d033f41443a"
uuid: "c4bed6ac-d801-88d8-babe-f8e6ce4e4e00"
horo: 2
typography:
  partition: translations
  bondDegree: 38
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
  computationUuid: "ff4e89c1-c6de-8556-8ac0-6234a21b900e"
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
      stageUuid: "0621ae2a-dd9f-843d-85e0-fc9fb085b729"
    - stage: seal
      stageUuid: "8539dd42-fd82-89fa-b764-bbad5df75508"
    - stage: uuid
      stageUuid: "7442b4a0-b97d-8532-8d26-e5beed294d09"
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
