---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: "translations · 5/round · 0d0ed561"
contentUuid: "5b31def0-30b4-54d6-993f-096bc6e1447f"
diamondUuid: "952d490f-837c-8578-bde1-f915cd06e7ae"
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
  computationUuid: "15b42a80-7f97-86ba-ab04-7bc8469e3478"
  stages:
    - stage: path
      stageUuid: "e98325fe-356f-858b-b9df-92b1b1e40133"
    - stage: trinity
      stageUuid: "a3c8d8d0-2b40-8632-9b3d-894f5dd93b47"
    - stage: boundary
      stageUuid: "e60692bb-3d06-842d-a620-d5f126253a51"
    - stage: links
      stageUuid: "fc6f0b5e-daaa-87b9-bdf4-f63e0692529e"
    - stage: horo
      stageUuid: "f315aa52-a745-809e-a4a2-ce49b6b75a10"
    - stage: seal
      stageUuid: "8539dd42-fd82-89fa-b764-bbad5df75508"
    - stage: uuid
      stageUuid: "3b1b3ebe-1363-8f7d-9d76-481370636dfb"
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
