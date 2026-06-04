---
name: standards
description: Use when registering, citing, superseding or querying any published standard (IFRS, ISO, W3C, RFC, EU Directive, etc.) against a tenant — conflict graph, supersession trail, per-module citation index, per-tenant adoption status. The live standards-registry collection backing the erpax.standards.* MCP tool family.
---

# standards

The persistent registry of every published standard erpax cites. Standards are **not folders** — they are *everywhere*, dissolved across `src/` as `@standard` / `@rfc` banners (the usage truth). This is where that vocabulary **meets**: one computed scan — the curated `registry.ts` ⊕ the live banners (`scripts/standards-catalogue.mjs`) — emits a single `catalogue.ts` that BOTH seeds the payload `standards` collection (queryable, per-tenant, MCP-backed) AND renders the index below (vitepress). One scan, two indices; the banners stay the source of truth.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (computed opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO/IEC 25010:2023 §5.1 functional-completeness
- ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)
- W3C JSON-LD 1.1 (citation as live linked-data)
- Conservation Law 27 standards-as-live-objects
- Conservation Law 28 standards-supersession-tracking
- Conservation Law 38 mcp-tool-standardization

Composes: [[accounting]] · [[standard]] · [[identity]] · [[proof]].

<!-- CATALOGUE:START -->

## Catalogue — 102 standards, 2179 citations

<!-- GENERATED from registry.ts ⊕ @standard banners by scripts/standards-catalogue.ts. Do not edit by hand. -->

The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners. This index is where they meet: each carries its content-uuid (the same `uuid()` projection every row uses — its colour is that uuid made visible), and the same data seeds the payload `standards` collection.

### en

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 78% 43%)"></span> `EN-16931` — Semantic model of the electronic invoice · 95 · `b293e94d`

### etsi

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(260 73% 42%)"></span> `eIDAS` — EU electronic identification & trust services · 14 · `29ccc17c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(77 83% 42%)"></span> `ETSI-EN-319-142` — PAdES PDF advanced electronic signatures · 9 · `3f95cb7c`

### eu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 86% 49%)"></span> `Peppol-BIS-3.0` — Peppol Billing BIS · 26 · `6408ce0b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(313 59% 47%)"></span> `EU-ESRS` — European Sustainability Reporting Standards · 16 · `b2699009`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(217 61% 51%)"></span> `ESCO` — European Skills/Competences/Occupations · 6 · `cb59fb0d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(65 72% 49%)"></span> `EU-1958` — Official languages of the EU · 6 · `1f3111fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(296 64% 38%)"></span> `EU-AI-Act` — Regulation (EU) 2024/1689 on AI · 4 · `8af8b878`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 69% 45%)"></span> `SEPA` — Single Euro Payments Area schemes · 2 · `553c7767`

### iec

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(287 80% 39%)"></span> `ISO/IEC-25010` — Systems & software quality models · 93 · `3c2f1991`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 59% 40%)"></span> `ISO/IEC-29119` — Software testing · 26 · `e69bd662`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(25 66% 53%)"></span> `ISO/IEC-23894` — AI risk management · 14 · `bb2197cf`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(272 55% 53%)"></span> `ISO/IEC-12207` — Software life-cycle processes · 8 · `897869e7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(339 56% 40%)"></span> `ISO/IEC-10918` — JPEG image coding · 4 · `4eab24da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(331 67% 50%)"></span> `ISO/IEC-42001` — AI management system · 4 · `a03398fc`

### ifrs

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(288 55% 38%)"></span> `IFRS-15` — Revenue from Contracts with Customers · 23 · `e0b86948`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(66 76% 47%)"></span> `IAS-1` — Presentation of Financial Statements · 12 · `f0bae7c9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(214 86% 61%)"></span> `IAS-34` — Interim Financial Reporting · 11 · `07deaba7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 61% 57%)"></span> `IFRS-13` — Fair Value Measurement · 10 · `6296d8d3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(304 60% 49%)"></span> `IAS-12` — Income Taxes · 7 · `a9f0b4fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(305 60% 52%)"></span> `IAS-40` — Investment Property · 6 · `77516eb6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(325 82% 41%)"></span> `IFRS-17` — Insurance Contracts · 6 · `5f7d61ab`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(273 67% 59%)"></span> `IFRS-9` — Financial Instruments · 6 · `b3a9bba5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(277 82% 43%)"></span> `IFRS-16` — Leases · 3 · `2e15a7dd`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(186 87% 47%)"></span> `IAS-2` — Inventories · 2 · `53b24399`

### iso

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(359 66% 49%)"></span> `ISO-8601-1` — Date and time representation · 210 · `dcc7dde3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(112 57% 38%)"></span> `ISO-4217` — Currency codes · 199 · `2aa02578`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(268 74% 57%)"></span> `ISO-3166-1` — Country codes · 81 · `33acc25b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(215 78% 55%)"></span> `ISO-20022` — Universal financial industry message scheme · 79 · `37af5d59`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(83 87% 54%)"></span> `ISO-19011` — Auditing management systems · 51 · `85eb43b8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(24 66% 46%)"></span> `ISO-27001` — Information security management system · 39 · `55e0dd80`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(26 74% 52%)"></span> `ISO-13616-1` — IBAN — International Bank Account Number · 32 · `7d425926`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(41 74% 39%)"></span> `ISO-9362` — BIC — Business Identifier Code (SWIFT) · 22 · `69a1e579`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(14 80% 58%)"></span> `ISO-27002` — Information security controls · 21 · `2336192c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(11 70% 47%)"></span> `ISO-17442-1` — LEI — Legal Entity Identifier · 12 · `816b5551`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 80% 55%)"></span> `ISO-19005` — PDF/A archival format · 11 · `c97ea5e9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(3 83% 60%)"></span> `ISO-3166-2` — Country subdivision codes · 11 · `2b9ba8a6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(226 57% 53%)"></span> `ISO-32000` — PDF — Portable Document Format · 10 · `786a489f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(133 64% 48%)"></span> `ISO-22400-2` — Manufacturing operations KPIs · 9 · `95952c82`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(159 57% 59%)"></span> `ISO-7064` — Check character systems · 8 · `b8d78e45`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(224 74% 58%)"></span> `ISO-14289-1` — PDF/UA universally accessible PDF · 7 · `dda87cbc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(35 66% 60%)"></span> `ISO-19160-4` — Addressing — components & conceptual model · 7 · `db832e2e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(82 66% 39%)"></span> `ISO-27037` — Digital evidence identification & preservation · 6 · `20aa97f1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(251 80% 55%)"></span> `ISO-37301` — Compliance management systems · 6 · `393bebe9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(5 74% 48%)"></span> `ISO-41001` — Facility management · 6 · `fbbd366a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(69 58% 44%)"></span> `ISO-55000` — Asset management · 5 · `69bdd54e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(314 80% 59%)"></span> `ISO-6523-1` — Participant identifier scheme · 5 · `a72aa55d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(61 67% 45%)"></span> `ISO-639` — Language codes · 1 · `ad359867`

### national

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(144 58% 53%)"></span> `Naredba-N-18` — BG fiscal-device & SUPTO ordinance · 33 · `6a08f86f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(156 60% 54%)"></span> `ZDDS` — BG Value Added Tax Act · 2 · `83644ba0`

### nist

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(326 65% 58%)"></span> `NIST-INCITS-359-2012` — Role-Based Access Control · 43 · `e67e2dd4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(173 82% 42%)"></span> `NIST-FIPS-180-4` — Secure Hash Standard (SHA-2) · 29 · `6a25a77c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(346 57% 44%)"></span> `OWASP-ASVS` — Application Security Verification Standard · 11 · `b55af77e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(27 85% 48%)"></span> `NIST-SP-800-38D` — AES-GCM authenticated encryption · 10 · `439bcd9a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(129 72% 43%)"></span> `NIST-SP-800-92` — Log management · 10 · `20d957c5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 65% 44%)"></span> `NIST-SP-800-162` — Attribute-Based Access Control · 8 · `6610734e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(228 68% 43%)"></span> `NIST-SP-800-57` — Key management lifecycles · 7 · `03b4df35`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(6 59% 53%)"></span> `NIST-SP-800-108` — Key derivation functions · 5 · `1956d6ff`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(138 75% 54%)"></span> `NIST-AI-RMF` — AI Risk Management Framework · 3 · `268214a0`

### oecd

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(342 61% 61%)"></span> `SAF-T` — OECD Standard Audit File for Tax · 61 · `3c66b577`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(192 85% 45%)"></span> `OECD-Transfer-Pricing` — Transfer Pricing Guidelines · 12 · `d3b0647f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(13 84% 42%)"></span> `BEPS` — Base Erosion and Profit Shifting · 6 · `a1c51ddc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(117 68% 61%)"></span> `OECD-Pillar-Two` — GloBE global minimum tax · 5 · `d635bcd7`

### other

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 59% 47%)"></span> `MCP` — Model Context Protocol · 25 · `bbe40439`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(33 75% 50%)"></span> `ISA-95` — Enterprise-control system integration · 17 · `b8595a9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(127 88% 44%)"></span> `GHG-Protocol` — Greenhouse Gas Protocol · 13 · `e5b7f3c6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(155 62% 60%)"></span> `XBRL` — eXtensible Business Reporting Language · 13 · `603bfc46`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(212 77% 44%)"></span> `SFIA` — Skills Framework for the Information Age · 12 · `1b8c7f96`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(280 81% 43%)"></span> `IEEE-754` — Floating-point arithmetic · 7 · `e650ec1d`

### rfc

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(75 64% 48%)"></span> `BCP-47` — Language tags · 66 · `766b2cca`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(29 70% 49%)"></span> `RFC-9562` — UUID (revised — content/event uuid) · 56 · `01855583`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 73% 47%)"></span> `RFC-8785` — JSON Canonicalization Scheme · 23 · `67e3e4b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 87% 54%)"></span> `RFC-4122` — UUID (original) · 8 · `74e8ac88`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 81% 50%)"></span> `RFC-5652` — Cryptographic Message Syntax (CMS) · 6 · `cd206054`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(36 68% 41%)"></span> `RFC-5545` — iCalendar · 5 · `1adc537b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(151 79% 42%)"></span> `RFC-7231` — HTTP/1.1 semantics · 5 · `87973b1c`

### sox

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(241 86% 54%)"></span> `SOX` — Sarbanes-Oxley Act §302/404/906 · 17 · `a6e18810`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(166 65% 49%)"></span> `COSO-2013` — Internal Control — Integrated Framework · 6 · `1e2eb9cb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 89% 54%)"></span> `ISA-500` — Audit Evidence · 2 · `6340aee8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 60% 60%)"></span> `PCAOB-AS-2201` — Integrated Audit of ICFR · 2 · `3efad72e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(71 58% 50%)"></span> `ISA-530` — Audit Sampling · 1 · `01af8f84`

### un

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(198 85% 41%)"></span> `ISO-9735` — UN/EDIFACT syntax rules · 39 · `d0e6f0db`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 72% 47%)"></span> `UN-CEFACT` — UN/CEFACT code lists · 25 · `dede9d51`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 75% 49%)"></span> `UBL-2.1` — Universal Business Language · 24 · `91f2143b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(12 56% 43%)"></span> `GS1-GTIN` — Global Trade Item Number · 6 · `74c424f5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(4 84% 47%)"></span> `WCO-HS` — Harmonized System customs nomenclature · 6 · `735463b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(190 74% 59%)"></span> `UNSPSC` — UN Standard Products & Services Code · 3 · `f40636ed`

### upu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(352 55% 50%)"></span> `UPU-S42` — International postal addressing · 7 · `aa20af84`

### us_gaap

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(301 56% 38%)"></span> `US-GAAP` — FASB Accounting Standards Codification · 20 · `2f956ac0`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 57% 43%)"></span> `ASC-606` — Revenue from Contracts with Customers (US) · 8 · `eb8625c5`

### w3c

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(231 64% 45%)"></span> `schema.org` — Linked-data type vocabulary · 62 · `9cff4f7f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(113 78% 40%)"></span> `ECMA-262` — ECMAScript language specification · 34 · `dbd1c6da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(56 87% 50%)"></span> `ECMA-402` — ECMAScript Internationalization API · 21 · `3008cf9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(142 89% 52%)"></span> `W3C-PROV-O` — Provenance Ontology · 18 · `aab6453e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(162 56% 46%)"></span> `W3C-JSON-LD-1.1` — JSON for Linking Data · 14 · `5c0a6a50`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(213 58% 42%)"></span> `W3C-ActivityPub` — Federated server-to-server protocol · 10 · `df058f64`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(18 84% 42%)"></span> `W3C-VC-2.0` — Verifiable Credentials Data Model · 8 · `44faccc4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(134 72% 38%)"></span> `W3C-DID-1.0` — Decentralized Identifiers · 6 · `23ae3478`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(308 64% 54%)"></span> `Unicode-CLDR` — Common Locale Data Repository · 5 · `8b04db58`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(87 70% 40%)"></span> `JSON-Schema` — JSON Schema · 3 · `85ef557a`

### wcag

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(333 66% 50%)"></span> `W3C-WAI-ARIA-1.2` — Accessible Rich Internet Applications · 49 · `a46dba6c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(254 62% 40%)"></span> `WCAG-2.1` — Web Content Accessibility Guidelines · 31 · `852e7032`

### registered — awaiting citation (16)

Known canonical standards in the registry not yet cited by code — e.g. the upstream permaculture / regenerative-agriculture basis of the agriculture domain. They seed as `proposed` and become cited as the domain grows.

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(207 55% 55%)"></span> `EU-2018-848` — EU Organic Production Regulation
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 55% 55%)"></span> `ZKPO` — BG Corporate Income Tax Act
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(166 64% 51%)"></span> `Demeter-Biodynamic` — Demeter International Biodynamic standard
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(338 64% 56%)"></span> `FSMA-PSR` — FDA FSMA Produce Safety Rule (21 CFR 112)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(239 59% 60%)"></span> `GLOBALG.A.P` — GLOBALG.A.P. Integrated Farm Assurance
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(118 76% 52%)"></span> `IFOAM-Norms` — IFOAM Norms for Organic Production & Processing
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(309 59% 47%)"></span> `Permaculture-Ethics` — Permaculture ethics — earth care · people care · fair share
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(143 64% 44%)"></span> `Permaculture-Principles` — Permaculture design principles (Holmgren's 12)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(145 85% 56%)"></span> `Regenerative-Organic` — Regenerative Organic Certified (ROC)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 59% 41%)"></span> `Savory-EOV` — Savory Ecological Outcome Verification (Land to Market)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(159 80% 53%)"></span> `USDA-AMS-Grade` — USDA AMS fresh-produce grade standards (US No. 1 / Fancy)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(70 69% 40%)"></span> `USDA-GAP` — USDA Harmonized GAP / GHP food-safety audit
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(2 66% 47%)"></span> `USDA-Hardiness-Zones` — USDA Plant Hardiness Zone Map
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(306 85% 43%)"></span> `USDA-NOP` — USDA National Organic Program (7 CFR 205)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 58% 39%)"></span> `Codex-Alimentarius` — Codex Alimentarius (FAO/WHO food standards)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(119 64% 41%)"></span> `FAO-Agroecology` — FAO 10 Elements of Agroecology

<!-- CATALOGUE:END -->
