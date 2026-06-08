---
name: translations
description: "Use when overriding platform localizations per tenant — MCP tool descriptions, UI labels, event labels, notification templates, standard citations, chain-step names — with per-locale values (BCP-47), activation windows, and provenance back to the overridden row. The tenant translation override layer above the platform default."
atomPath: translations
coordinate: translations · 2/share · 7fe52e27
contentUuid: "4acde27d-6530-5fe5-87b1-e821689408b6"
diamondUuid: "c4a74a9d-a661-8c58-a7b5-5eab25dab4aa"
uuid: "7fe52e27-2eec-8839-bf03-6f0bb31f8885"
horo: 2
bonds:
  in:
    - balance
    - catalogue
    - collect
    - fields
    - identity
    - law
    - localize
    - proof
    - quaternary
    - standard
    - translate
    - translation
    - translator
  out:
    - balance
    - catalogue
    - collect
    - fields
    - identity
    - law
    - localize
    - proof
    - quaternary
    - standard
    - translate
    - translation
    - translator
typography:
  partition: translations
  bondDegree: 39
  neighbors: []
standards:
  - "BCP-47"
  - "BCP-47 language tags"
  - "Conservation Law 10 referential-harmony (relatedTo back to the source row)"
  - "Conservation Law 8 content-uuid"
  - "EU 1958/1 official-languages-of-the-european-union"
  - "EU-1958"
  - "EU-1958/1"
  - "ISO 19011:2018 §6.4.6 (translation changes audit-trailed)"
  - "ISO/IEC-25010:2023"
  - "RFC-7231"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2)"
  - "W3C-HTTP-Content-Language"
bindings: []
neighbors:
  wikilink:
    - balance
    - fields
    - identity
    - law
    - proof
    - standard
  matrix:
    - balance
    - catalogue
    - collect
    - fields
    - identity
    - law
    - localize
    - proof
    - quaternary
    - standard
    - translate
    - translation
    - translator
  backlinks:
    - balance
    - catalogue
    - collect
    - fields
    - identity
    - law
    - localize
    - proof
    - quaternary
    - standard
    - translate
    - translation
    - translator
signatures:
  computationUuid: "f0e27fd2-c774-8eed-9648-6cbec42b3fa4"
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
      stageUuid: "18a579d4-4d07-8462-912d-899af768b98a"
    - stage: seal
      stageUuid: "4cb52ffe-efc1-8fe1-8f3f-1697460ab4f2"
    - stage: uuid
      stageUuid: "80bab361-b3e0-81e7-9fbd-0cd0e0ae753c"
version: 2
---
# translations

Translations — per-tenant override layer above the platform-default.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
- BCP-47 language tags
- EU 1958/1 official-languages-of-the-european-union
- Conservation Law 8 content-uuid
- Conservation Law 10 referential-harmony (relatedTo back to the source row)
- ISO 19011:2018 §6.4.6 (translation changes audit-trailed)

**Law — [[law]]: a per-tenant override layer above the platform default — per-locale values within activation windows, each carrying provenance back to the row it overrides ([[balance]]).**

Composes: [[fields]] · [[standard]] · [[identity]] · [[proof]].
