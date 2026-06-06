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

**Law — [[law]]: standards are not folders — they are dissolved across `src/` as `@standard` / `@rfc` banners (the usage truth) and MEET here in one computed scan (curated registry ⊕ live banners → `catalogue.ts`) that BOTH seeds the payload `standards` collection AND renders the index; one scan, two indices, the banners the single source of truth.**

<!-- CATALOGUE:START -->

## Catalogue — 142 standards, 5918 citations

<!-- GENERATED from registry.ts ⊕ @standard banners by scripts/standards-catalogue.ts. Do not edit by hand. -->

The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners. This index is where they meet: each carries its content-uuid (the same `uuid()` projection every row uses — its colour is that uuid made visible), and the same data seeds the payload `standards` collection.

### en

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 78% 43%)"></span> `EN-16931` — Semantic model of the electronic invoice · 105 · `b293e94d`

### etsi

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(260 73% 42%)"></span> `eIDAS` — EU electronic identification & trust services · 20 · `29ccc17c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(77 83% 42%)"></span> `ETSI-EN-319-142` — PAdES PDF advanced electronic signatures · 10 · `3f95cb7c`

### eu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 86% 49%)"></span> `Peppol-BIS-3.0` — Peppol Billing BIS · 29 · `6408ce0b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(313 59% 47%)"></span> `EU-ESRS` — European Sustainability Reporting Standards · 20 · `b2699009`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(65 72% 49%)"></span> `EU-1958` — Official languages of the EU · 10 · `1f3111fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(163 88% 56%)"></span> `NACE` — EU NACE Rev.2 economic-activity classification · 10 · `809b21d2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(296 64% 38%)"></span> `EU-AI-Act` — Regulation (EU) 2024/1689 on AI · 9 · `8af8b878`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(217 61% 51%)"></span> `ESCO` — European Skills/Competences/Occupations · 8 · `cb59fb0d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(147 84% 40%)"></span> `EU-CSRD` — EU Corporate Sustainability Reporting Directive 2022/2464 · 8 · `c843cc1a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(164 64% 54%)"></span> `PSD2` — EU Payment Services Directive 2 (2015/2366) · 8 · `f98c2c28`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(61 76% 47%)"></span> `Berlin-Group-PSD2` — Berlin Group NextGenPSD2 open-banking API · 7 · `0b7d7ee1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(161 64% 39%)"></span> `EU-VAT-Directive` — EU VAT Directive 2006/112/EC · 6 · `604172d9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 69% 45%)"></span> `SEPA` — Single Euro Payments Area schemes · 5 · `553c7767`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(57 66% 54%)"></span> `EU-UCC` — EU Union Customs Code (Regulation 952/2013) · 3 · `96b1dd40`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(207 55% 55%)"></span> `EU-2018-848` — EU Organic Production Regulation · 2 · `7f5fafb9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(189 84% 40%)"></span> `EU-1760-2000` — EU cattle identification & beef labelling (Reg 1760/2000) · 1 · `e32563da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(91 56% 40%)"></span> `EU-EUDR` — EU Deforestation Regulation (2023/1115) · 1 · `be33d31a`

### iec

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(287 80% 39%)"></span> `ISO/IEC-25010` — Systems & software quality models · 99 · `3c2f1991`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 59% 40%)"></span> `ISO/IEC-29119` — Software testing · 36 · `e69bd662`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(25 66% 53%)"></span> `ISO/IEC-23894` — AI risk management · 15 · `bb2197cf`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(272 55% 53%)"></span> `ISO/IEC-12207` — Software life-cycle processes · 9 · `897869e7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(339 56% 40%)"></span> `ISO/IEC-10918` — JPEG image coding · 5 · `4eab24da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(331 67% 50%)"></span> `ISO/IEC-42001` — AI management system · 5 · `a03398fc`

### ifrs

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(288 55% 38%)"></span> `IFRS-15` — Revenue from Contracts with Customers · 35 · `e0b86948`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(66 76% 47%)"></span> `IAS-1` — Presentation of Financial Statements · 27 · `f0bae7c9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(214 86% 61%)"></span> `IAS-34` — Interim Financial Reporting · 14 · `07deaba7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(302 73% 49%)"></span> `IAS-41` — Agriculture (biological assets) · 14 · `cfe6e453`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 61% 57%)"></span> `IFRS-13` — Fair Value Measurement · 14 · `6296d8d3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(273 67% 59%)"></span> `IFRS-9` — Financial Instruments · 13 · `b3a9bba5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(304 60% 49%)"></span> `IAS-12` — Income Taxes · 9 · `a9f0b4fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(82 79% 51%)"></span> `IFRS-3` — Business Combinations · 9 · `4972186d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(325 82% 41%)"></span> `IFRS-17` — Insurance Contracts · 8 · `5f7d61ab`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(343 58% 60%)"></span> `IFRS-2` — Share-based Payment · 8 · `ec2f6c2e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(186 87% 47%)"></span> `IAS-2` — Inventories · 7 · `53b24399`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(305 60% 52%)"></span> `IAS-40` — Investment Property · 7 · `77516eb6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(213 58% 61%)"></span> `IFRS-5` — Non-current Assets Held for Sale & Discontinued Operations · 7 · `104dd55f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(272 57% 40%)"></span> `IFRS-6` — Exploration for & Evaluation of Mineral Resources · 7 · `8c4848f2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(277 82% 43%)"></span> `IFRS-16` — Leases · 6 · `2e15a7dd`

### iso

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(359 66% 49%)"></span> `ISO-8601-1` — Date and time representation · 242 · `dcc7dde3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(112 57% 38%)"></span> `ISO-4217` — Currency codes · 227 · `2aa02578`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(83 87% 54%)"></span> `ISO-19011` — Auditing management systems · 92 · `85eb43b8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(268 74% 57%)"></span> `ISO-3166-1` — Country codes · 92 · `33acc25b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(215 78% 55%)"></span> `ISO-20022` — Universal financial industry message scheme · 85 · `37af5d59`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(24 66% 46%)"></span> `ISO-27001` — Information security management system · 77 · `55e0dd80`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(26 74% 52%)"></span> `ISO-13616-1` — IBAN — International Bank Account Number · 39 · `7d425926`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(14 80% 58%)"></span> `ISO-27002` — Information security controls · 36 · `2336192c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(41 74% 39%)"></span> `ISO-9362` — BIC — Business Identifier Code (SWIFT) · 28 · `69a1e579`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(11 70% 47%)"></span> `ISO-17442-1` — LEI — Legal Entity Identifier · 18 · `816b5551`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(61 67% 45%)"></span> `ISO-639` — Language codes · 18 · `ad359867`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(3 83% 60%)"></span> `ISO-3166-2` — Country subdivision codes · 15 · `2b9ba8a6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 80% 55%)"></span> `ISO-19005` — PDF/A archival format · 12 · `c97ea5e9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(133 64% 48%)"></span> `ISO-22400-2` — Manufacturing operations KPIs · 12 · `95952c82`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(226 57% 53%)"></span> `ISO-32000` — PDF — Portable Document Format · 11 · `786a489f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(251 80% 55%)"></span> `ISO-37301` — Compliance management systems · 9 · `393bebe9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(5 74% 48%)"></span> `ISO-41001` — Facility management · 9 · `fbbd366a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(159 57% 59%)"></span> `ISO-7064` — Check character systems · 9 · `b8d78e45`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(224 74% 58%)"></span> `ISO-14289-1` — PDF/UA universally accessible PDF · 8 · `dda87cbc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(35 66% 60%)"></span> `ISO-19160-4` — Addressing — components & conceptual model · 8 · `db832e2e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(82 66% 39%)"></span> `ISO-27037` — Digital evidence identification & preservation · 8 · `20aa97f1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(69 58% 44%)"></span> `ISO-55000` — Asset management · 8 · `69bdd54e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(314 80% 59%)"></span> `ISO-6523-1` — Participant identifier scheme · 7 · `a72aa55d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(24 88% 54%)"></span> `ISO-11784` — RFID animal identification (code structure & protocol) · 1 · `fea06728`

### national

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(144 58% 53%)"></span> `Naredba-N-18` — BG fiscal-device & SUPTO ordinance · 280 · `6a08f86f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(156 60% 54%)"></span> `ZDDS` — BG Value Added Tax Act · 3 · `83644ba0`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 55% 55%)"></span> `ZKPO` — BG Corporate Income Tax Act · 1 · `319ed289`

### nist

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(326 65% 58%)"></span> `NIST-INCITS-359-2012` — Role-Based Access Control · 45 · `e67e2dd4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(173 82% 42%)"></span> `NIST-FIPS-180-4` — Secure Hash Standard (SHA-2) · 32 · `6a25a77c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(346 57% 44%)"></span> `OWASP-ASVS` — Application Security Verification Standard · 14 · `b55af77e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 65% 44%)"></span> `NIST-SP-800-162` — Attribute-Based Access Control · 13 · `6610734e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(129 72% 43%)"></span> `NIST-SP-800-92` — Log management · 12 · `20d957c5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(27 85% 48%)"></span> `NIST-SP-800-38D` — AES-GCM authenticated encryption · 11 · `439bcd9a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(228 68% 43%)"></span> `NIST-SP-800-57` — Key management lifecycles · 8 · `03b4df35`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(6 59% 53%)"></span> `NIST-SP-800-108` — Key derivation functions · 6 · `1956d6ff`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(138 75% 54%)"></span> `NIST-AI-RMF` — AI Risk Management Framework · 4 · `268214a0`

### oecd

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(342 61% 61%)"></span> `SAF-T` — OECD Standard Audit File for Tax · 67 · `3c66b577`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(192 85% 45%)"></span> `OECD-Transfer-Pricing` — Transfer Pricing Guidelines · 16 · `d3b0647f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(13 84% 42%)"></span> `BEPS` — Base Erosion and Profit Shifting · 10 · `a1c51ddc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(117 68% 61%)"></span> `OECD-Pillar-Two` — GloBE global minimum tax · 7 · `d635bcd7`

### other

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 59% 47%)"></span> `MCP` — Model Context Protocol · 31 · `bbe40439`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(33 75% 50%)"></span> `ISA-95` — Enterprise-control system integration · 20 · `b8595a9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(127 88% 44%)"></span> `GHG-Protocol` — Greenhouse Gas Protocol · 18 · `e5b7f3c6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(280 81% 43%)"></span> `IEEE-754` — Floating-point arithmetic · 17 · `e650ec1d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(155 62% 60%)"></span> `XBRL` — eXtensible Business Reporting Language · 17 · `603bfc46`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(212 77% 44%)"></span> `SFIA` — Skills Framework for the Information Age · 14 · `1b8c7f96`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(81 84% 45%)"></span> `ITU-T-X667` — ITU-T X.667 / ISO-IEC 9834-8 — UUID generation · 5 · `dfe9631f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(334 58% 53%)"></span> `PCI-DSS` — Payment Card Industry Data Security Standard · 5 · `f5fe4927`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(217 63% 60%)"></span> `SWIFT-MT` — SWIFT MT financial messages · 5 · `86714ed6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(306 85% 43%)"></span> `USDA-NOP` — USDA National Organic Program (7 CFR 205) · 4 · `0ddacdad`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(166 64% 51%)"></span> `Demeter-Biodynamic` — Demeter International Biodynamic standard · 2 · `65e6fe55`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(72 64% 41%)"></span> `FSC` — Forest Stewardship Council certification · 2 · `4260db1b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(239 59% 60%)"></span> `GLOBALG.A.P` — GLOBALG.A.P. Integrated Farm Assurance · 2 · `efff6dee`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(8 74% 53%)"></span> `PEFC` — Programme for the Endorsement of Forest Certification · 2 · `36e0c287`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(309 59% 47%)"></span> `Permaculture-Ethics` — Permaculture ethics — earth care · people care · fair share · 2 · `d42590f9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(143 64% 44%)"></span> `Permaculture-Principles` — Permaculture design principles (Holmgren's 12) · 2 · `2c277206`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(145 85% 56%)"></span> `Regenerative-Organic` — Regenerative Organic Certified (ROC) · 2 · `4f51875a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(70 69% 40%)"></span> `USDA-GAP` — USDA Harmonized GAP / GHP food-safety audit · 2 · `3e26e0c2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(218 86% 53%)"></span> `ASC` — Aquaculture Stewardship Council standard · 1 · `a2921f3f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(223 63% 57%)"></span> `BAP` — Best Aquaculture Practices (GSA) · 1 · `7f6f4e43`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(338 64% 56%)"></span> `FSMA-PSR` — FDA FSMA Produce Safety Rule (21 CFR 112) · 1 · `f49adb42`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(118 76% 52%)"></span> `IFOAM-Norms` — IFOAM Norms for Organic Production & Processing · 1 · `3fbec46e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 59% 41%)"></span> `Savory-EOV` — Savory Ecological Outcome Verification (Land to Market) · 1 · `7fc86dab`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(159 80% 53%)"></span> `USDA-AMS-Grade` — USDA AMS fresh-produce grade standards (US No. 1 / Fancy) · 1 · `81ff193f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(2 66% 47%)"></span> `USDA-Hardiness-Zones` — USDA Plant Hardiness Zone Map · 1 · `44eabac9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(27 64% 48%)"></span> `WOAH-Codes` — WOAH (OIE) Terrestrial & Aquatic Animal Health Codes · 1 · `5fbbfe3a`

### rfc

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(75 64% 48%)"></span> `BCP-47` — Language tags · 78 · `766b2cca`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(29 70% 49%)"></span> `RFC-9562` — UUID (revised — content/event uuid) · 76 · `01855583`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 73% 47%)"></span> `RFC-8785` — JSON Canonicalization Scheme · 24 · `67e3e4b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 87% 54%)"></span> `RFC-4122` — UUID (original) · 10 · `74e8ac88`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(36 68% 41%)"></span> `RFC-5545` — iCalendar · 10 · `1adc537b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(151 79% 42%)"></span> `RFC-7231` — HTTP/1.1 semantics · 9 · `87973b1c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 81% 50%)"></span> `RFC-5652` — Cryptographic Message Syntax (CMS) · 7 · `cd206054`

### sox

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(241 86% 54%)"></span> `SOX` — Sarbanes-Oxley Act §302/404/906 · 51 · `a6e18810`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(166 65% 49%)"></span> `COSO-2013` — Internal Control — Integrated Framework · 11 · `1e2eb9cb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 89% 54%)"></span> `ISA-500` — Audit Evidence · 4 · `6340aee8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 60% 60%)"></span> `PCAOB-AS-2201` — Integrated Audit of ICFR · 4 · `3efad72e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(71 58% 50%)"></span> `ISA-530` — Audit Sampling · 2 · `01af8f84`

### un

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 75% 49%)"></span> `UBL-2.1` — Universal Business Language · 275 · `91f2143b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(12 56% 43%)"></span> `GS1-GTIN` — Global Trade Item Number · 256 · `74c424f5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(198 85% 41%)"></span> `ISO-9735` — UN/EDIFACT syntax rules · 44 · `d0e6f0db`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 72% 47%)"></span> `UN-CEFACT` — UN/CEFACT code lists · 30 · `dede9d51`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(4 84% 47%)"></span> `WCO-HS` — Harmonized System customs nomenclature · 9 · `735463b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(190 74% 59%)"></span> `UNSPSC` — UN Standard Products & Services Code · 5 · `f40636ed`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(160 73% 51%)"></span> `Codex-Honey` — Codex honey standard / EU Honey Directive 2001/110 · 2 · `d228e455`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(119 64% 41%)"></span> `FAO-Agroecology` — FAO 10 Elements of Agroecology · 2 · `4997b833`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 58% 39%)"></span> `Codex-Alimentarius` — Codex Alimentarius (FAO/WHO food standards) · 1 · `261ef849`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 67% 59%)"></span> `FAO-CCRF` — FAO Code of Conduct for Responsible Fisheries · 1 · `b26bbb5d`

### upu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(352 55% 50%)"></span> `UPU-S42` — International postal addressing · 9 · `aa20af84`

### us_gaap

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(301 56% 38%)"></span> `US-GAAP` — FASB Accounting Standards Codification · 44 · `2f956ac0`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 57% 43%)"></span> `ASC-606` — Revenue from Contracts with Customers (US) · 16 · `eb8625c5`

### w3c

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(231 64% 45%)"></span> `schema.org` — Linked-data type vocabulary · 1848 · `9cff4f7f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(142 89% 52%)"></span> `W3C-PROV-O` — Provenance Ontology · 266 · `aab6453e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(113 78% 40%)"></span> `ECMA-262` — ECMAScript language specification · 35 · `dbd1c6da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(56 87% 50%)"></span> `ECMA-402` — ECMAScript Internationalization API · 26 · `3008cf9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(162 56% 46%)"></span> `W3C-JSON-LD-1.1` — JSON for Linking Data · 16 · `5c0a6a50`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(213 58% 42%)"></span> `W3C-ActivityPub` — Federated server-to-server protocol · 13 · `df058f64`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(18 84% 42%)"></span> `W3C-VC-2.0` — Verifiable Credentials Data Model · 9 · `44faccc4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(134 72% 38%)"></span> `W3C-DID-1.0` — Decentralized Identifiers · 7 · `23ae3478`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(308 64% 54%)"></span> `Unicode-CLDR` — Common Locale Data Repository · 6 · `8b04db58`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(87 70% 40%)"></span> `JSON-Schema` — JSON Schema · 4 · `85ef557a`

### wcag

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(333 66% 50%)"></span> `W3C-WAI-ARIA-1.2` — Accessible Rich Internet Applications · 298 · `a46dba6c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(254 62% 40%)"></span> `WCAG-2.1` — Web Content Accessibility Guidelines · 34 · `852e7032`

<!-- CATALOGUE:END -->
