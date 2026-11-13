---
name: standards
description: "Use when registering, citing, superseding or querying any published standard (IFRS, ISO, W3C, RFC, EU Directive, etc.) against a tenant — conflict graph, supersession trail, per-module citation index, per-tenant adoption status. The live standards-registry collection backing the erpax.standards.* MCP tool family."
atomPath: standards
coordinate: "standards · 1/base · f65c4f04"
contentUuid: "6f67c0f9-660e-528b-a888-22c8ebbd7619"
diamondUuid: "1d5d28e0-175b-822f-9a9d-0d085cc71598"
uuid: "f65c4f04-8fe6-88dd-8b06-459455a16bfc"
horo: 1
typography:
  partition: standards
  bondDegree: 197
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
  computationUuid: "b3309358-196c-8dae-8b1f-80f1b188561a"
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
      stageUuid: "8dbfeeed-2ffa-8a94-81fe-bddba60fe959"
    - stage: seal
      stageUuid: "47197e8b-0e61-8144-80ca-7730bd2eb282"
    - stage: uuid
      stageUuid: "c3a798e8-eb12-8446-87e8-aba26131ebd1"
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

## Catalogue — 159 standards, 6530 citations

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
| eu | 26 | 889 | `EU-Intrastat-Reg-2019/2152` · 348 |
| gdpr | 1 | 31 | `EU-2016/679` · 31 |
| iec | 6 | 324 | `ISO/IEC-25010` · 201 |
| ifrs | 20 | 206 | `IFRS-15` · 38 |
| iso | 32 | 1490 | `ISO-8601-1` · 332 |
| national | 2 | 47 | `Naredba-N-18` · 43 |
| nist | 10 | 277 | `NIST-SP-800-63` · 97 |
| oecd | 4 | 87 | `SAF-T` · 64 |
| other | 15 | 268 | `COSO-ERM-2017` · 144 |
| rfc | 11 | 456 | `RFC-9562` · 154 |
| sox | 6 | 38 | `SOX` · 25 |
| un | 6 | 93 | `ISO-9735` · 42 |
| upu | 1 | 7 | `UPU-S42` · 7 |
| us_gaap | 3 | 61 | `US-CTA-2021` · 38 |
| w3c | 11 | 2076 | `schema.org` · 1909 |
| wcag | 2 | 21 | `W3C-WAI-ARIA-1.2` · 12 |
| **Σ** | **159** | **6530** | |

**Registered, awaiting citation: 104.** Known canonical standards the registry holds and
no code cites yet — they seed as `proposed` and become cited as a domain grows. Listed in
`docs/STANDARDS_INDEX.md`.

<!-- CATALOGUE:END -->
