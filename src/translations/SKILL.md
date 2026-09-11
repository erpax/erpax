---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: "translations · 5/round · 0d0ed561"
contentUuid: "23f0fe70-f02e-5758-9ee1-5f120bd8807d"
diamondUuid: "d43c584d-d0ba-85d8-864e-cea87897ceb4"
uuid: "0d0ed561-5179-84ce-b474-6c547024cc70"
horo: 5
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
  computationUuid: "0298c20b-073b-80c0-8dc7-f55f57975ae0"
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
      stageUuid: "f315aa52-a745-809e-a4a2-ce49b6b75a10"
    - stage: seal
      stageUuid: "8539dd42-fd82-89fa-b764-bbad5df75508"
    - stage: uuid
      stageUuid: "b1da0a09-0caa-847e-97b1-58d8d004cd12"
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
