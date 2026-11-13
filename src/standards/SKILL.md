---
name: standards
description: "Use when registering, citing, superseding or querying any published standard (IFRS, ISO, W3C, RFC, EU Directive, etc.) against a tenant — conflict graph, supersession trail, per-module citation index, per-tenant adoption status. The live standards-registry collection backing the erpax.standards.* MCP tool family."
atomPath: standards
coordinate: "standards · 2/share · 79679b62"
contentUuid: "a38a4635-46e7-5d3c-8e48-3c9fc171ae25"
diamondUuid: "8bfdd6e4-8187-8b62-9afd-f17fd7e5c3f6"
uuid: "79679b62-0eea-88bb-987d-5217c06cedf2"
horo: 2
typography:
  partition: standards
  bondDegree: 188
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)"
  - "ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)`"
  - "ISO-19011:2018"
  - "ISO/IEC 25010:2023 §5.1 functional-completeness"
  - "ISO/IEC 25010:2023 §5.1 functional-completeness`"
  - "ISO/IEC-25010:2023"
  - "RFC-8259"
  - "W3C JSON-LD 1.1 (citation as live linked-data)"
  - "W3C JSON-LD 1.1 (citation as live linked-data)`"
  - "W3C-JSON-LD-1.1"
  - "banners by src/standards/emit.ts. Do not edit by hand. -->"
  - "tag pointing at this standardId. Populated by the citation-index gate (Slice QQQQQQQQ companion).' },"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7a977895-7f03-829b-8a33-67fb57eb6296"
  stages:
    - stage: path
      stageUuid: "e4d21269-1c37-8fe4-85da-1900af3645f0"
    - stage: trinity
      stageUuid: "4d6b8103-7297-8bd1-a011-ba1bc9680168"
    - stage: boundary
      stageUuid: "a19fb2b1-9111-829f-96ce-f1e20cda15d1"
    - stage: links
      stageUuid: "ce14a10d-8dd0-8830-b2ef-cf5cffbeec8e"
    - stage: horo
      stageUuid: "e9cc4b42-efe8-8361-a1dc-fbfe7f02f751"
    - stage: seal
      stageUuid: "47197e8b-0e61-8144-80ca-7730bd2eb282"
    - stage: uuid
      stageUuid: "220e5b6b-5769-821c-978e-1eb3a61eed3c"
version: 2
---
# standards

The persistent registry of every published standard erpax cites. Standards are **not folders** — they are *everywhere*, dissolved across `src/` as `@standard` / `@rfc` banners (the usage truth). This is where that vocabulary **meets**: one computed scan — the curated `registry.ts` ⊕ the live banners (`scripts/standards-catalogue.mjs`) — emits a single `catalogue.ts` that BOTH seeds the payload `standards` collection (queryable, per-tenant, MCP-backed) AND renders the index below (vitepress). One scan, two indices; the banners stay the source of truth.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (computed opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.1 functional-completeness`
- `@standard ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)`
- `@standard W3C JSON-LD 1.1 (citation as live linked-data)`

- ISO/IEC 25010:2023 §5.1 functional-completeness
- ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)
- W3C JSON-LD 1.1 (citation as live linked-data)
- Conservation Law 27 standards-as-live-objects
- Conservation Law 28 standards-supersession-tracking
- Conservation Law 38 mcp-tool-standardization

Composes: [[accounting]] · [[standard]] · [[identity]] · [[proof]].

**Law — [[law]]: standards are not folders — they are dissolved across `src/` as `@standard` / `@rfc` banners (the usage truth) and MEET here in one computed scan (curated registry ⊕ live banners → `catalogue.ts`) that BOTH seeds the payload `standards` collection AND renders the index; one scan, two indices, the banners the single source of truth.**

<!-- CATALOGUE:START -->

## Catalogue — 159 standards, 4915 citations

<!-- GENERATED from registry.ts ⊕ @standard banners by src/standards/emit.ts. Do not edit by hand. -->

The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners,
and this is where they meet. The ROWS are not restated here: every id and content-uuid is in
`docs/STANDARDS_CATALOGUE.md`, the typed data is `STANDARDS_CATALOGUE` in `./seed.ts` (which seeds the payload
`standards` collection), and every citing module and line is in `docs/STANDARDS_INDEX.md`. A SKILL is
loaded into an agent context on every turn and context is re-sent per turn, so a table generated three
times elsewhere would be paid for here once per turn, forever — 60,733 bytes of it, 24KB of that
inline HTML that renders as a coloured dot.

| family | standards | citations | heaviest |
| --- | ---: | ---: | --- |
| en | 1 | 128 | `EN-16931` · 128 |
| etsi | 2 | 31 | `eIDAS` · 19 |
| eu | 26 | 888 | `EU-Intrastat-Reg-2019/2152` · 348 |
| gdpr | 1 | 29 | `EU-2016/679` · 29 |
| iec | 6 | 322 | `ISO/IEC-25010` · 199 |
| ifrs | 20 | 206 | `IFRS-15` · 38 |
| iso | 32 | 1477 | `ISO-8601-1` · 331 |
| national | 2 | 47 | `Naredba-N-18` · 43 |
| nist | 10 | 271 | `NIST-SP-800-63` · 95 |
| oecd | 4 | 85 | `SAF-T` · 62 |
| other | 15 | 268 | `COSO-ERM-2017` · 144 |
| rfc | 11 | 445 | `RFC-9562` · 145 |
| sox | 6 | 36 | `SOX` · 23 |
| un | 6 | 94 | `ISO-9735` · 42 |
| upu | 1 | 7 | `UPU-S42` · 7 |
| us_gaap | 3 | 61 | `US-CTA-2021` · 38 |
| w3c | 11 | 457 | `schema.org` · 292 |
| wcag | 2 | 63 | `W3C-WAI-ARIA-1.2` · 33 |
| **Σ** | **159** | **4915** | |

**Registered, awaiting citation: 104.** Known canonical standards the registry holds and
no code cites yet — they seed as `proposed` and become cited as a domain grows. Listed in
`docs/STANDARDS_INDEX.md`.

<!-- CATALOGUE:END -->
