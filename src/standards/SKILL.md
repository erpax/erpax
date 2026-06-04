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

## Catalogue — 102 standards, 2175 citations

<!-- GENERATED from registry.ts ⊕ @standard banners by scripts/standards-catalogue.mjs. Do not edit by hand. -->

The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners. This index is where they meet (the same data seeds the payload `standards` collection).

### en

- `EN-16931` — Semantic model of the electronic invoice · 95

### etsi

- `eIDAS` — EU electronic identification & trust services · 13
- `ETSI-EN-319-142` — PAdES PDF advanced electronic signatures · 9

### eu

- `Peppol-BIS-3.0` — Peppol Billing BIS · 26
- `EU-ESRS` — European Sustainability Reporting Standards · 16
- `ESCO` — European Skills/Competences/Occupations · 6
- `EU-1958` — Official languages of the EU · 6
- `EU-AI-Act` — Regulation (EU) 2024/1689 on AI · 4
- `SEPA` — Single Euro Payments Area schemes · 2

### iec

- `ISO/IEC-25010` — Systems & software quality models · 93
- `ISO/IEC-29119` — Software testing · 26
- `ISO/IEC-23894` — AI risk management · 14
- `ISO/IEC-12207` — Software life-cycle processes · 8
- `ISO/IEC-10918` — JPEG image coding · 4
- `ISO/IEC-42001` — AI management system · 4

### ifrs

- `IFRS-15` — Revenue from Contracts with Customers · 22
- `IAS-1` — Presentation of Financial Statements · 12
- `IAS-34` — Interim Financial Reporting · 11
- `IFRS-13` — Fair Value Measurement · 10
- `IAS-12` — Income Taxes · 7
- `IAS-40` — Investment Property · 6
- `IFRS-17` — Insurance Contracts · 6
- `IFRS-9` — Financial Instruments · 6
- `IFRS-16` — Leases · 3
- `IAS-2` — Inventories · 2

### iso

- `ISO-8601-1` — Date and time representation · 210
- `ISO-4217` — Currency codes · 199
- `ISO-3166-1` — Country codes · 81
- `ISO-20022` — Universal financial industry message scheme · 79
- `ISO-19011` — Auditing management systems · 51
- `ISO-27001` — Information security management system · 39
- `ISO-13616-1` — IBAN — International Bank Account Number · 32
- `ISO-9362` — BIC — Business Identifier Code (SWIFT) · 22
- `ISO-27002` — Information security controls · 21
- `ISO-17442-1` — LEI — Legal Entity Identifier · 12
- `ISO-19005` — PDF/A archival format · 11
- `ISO-3166-2` — Country subdivision codes · 11
- `ISO-32000` — PDF — Portable Document Format · 10
- `ISO-22400-2` — Manufacturing operations KPIs · 9
- `ISO-7064` — Check character systems · 8
- `ISO-14289-1` — PDF/UA universally accessible PDF · 7
- `ISO-19160-4` — Addressing — components & conceptual model · 7
- `ISO-27037` — Digital evidence identification & preservation · 6
- `ISO-37301` — Compliance management systems · 6
- `ISO-41001` — Facility management · 6
- `ISO-55000` — Asset management · 5
- `ISO-6523-1` — Participant identifier scheme · 5
- `ISO-639` — Language codes · 1

### national

- `Naredba-N-18` — BG fiscal-device & SUPTO ordinance · 33
- `ZDDS` — BG Value Added Tax Act · 2

### nist

- `NIST-INCITS-359-2012` — Role-Based Access Control · 43
- `NIST-FIPS-180-4` — Secure Hash Standard (SHA-2) · 29
- `OWASP-ASVS` — Application Security Verification Standard · 11
- `NIST-SP-800-38D` — AES-GCM authenticated encryption · 10
- `NIST-SP-800-92` — Log management · 10
- `NIST-SP-800-162` — Attribute-Based Access Control · 8
- `NIST-SP-800-57` — Key management lifecycles · 7
- `NIST-SP-800-108` — Key derivation functions · 5
- `NIST-AI-RMF` — AI Risk Management Framework · 3

### oecd

- `SAF-T` — OECD Standard Audit File for Tax · 61
- `OECD-Transfer-Pricing` — Transfer Pricing Guidelines · 12
- `BEPS` — Base Erosion and Profit Shifting · 6
- `OECD-Pillar-Two` — GloBE global minimum tax · 5

### other

- `MCP` — Model Context Protocol · 25
- `ISA-95` — Enterprise-control system integration · 17
- `GHG-Protocol` — Greenhouse Gas Protocol · 13
- `XBRL` — eXtensible Business Reporting Language · 13
- `SFIA` — Skills Framework for the Information Age · 12
- `IEEE-754` — Floating-point arithmetic · 7

### rfc

- `BCP-47` — Language tags · 66
- `RFC-9562` — UUID (revised — content/event uuid) · 55
- `RFC-8785` — JSON Canonicalization Scheme · 23
- `RFC-4122` — UUID (original) · 8
- `RFC-5652` — Cryptographic Message Syntax (CMS) · 6
- `RFC-5545` — iCalendar · 5
- `RFC-7231` — HTTP/1.1 semantics · 5

### sox

- `SOX` — Sarbanes-Oxley Act §302/404/906 · 17
- `COSO-2013` — Internal Control — Integrated Framework · 6
- `ISA-500` — Audit Evidence · 2
- `PCAOB-AS-2201` — Integrated Audit of ICFR · 2
- `ISA-530` — Audit Sampling · 1

### un

- `ISO-9735` — UN/EDIFACT syntax rules · 39
- `UN-CEFACT` — UN/CEFACT code lists · 25
- `UBL-2.1` — Universal Business Language · 23
- `GS1-GTIN` — Global Trade Item Number · 6
- `WCO-HS` — Harmonized System customs nomenclature · 6
- `UNSPSC` — UN Standard Products & Services Code · 3

### upu

- `UPU-S42` — International postal addressing · 7

### us_gaap

- `US-GAAP` — FASB Accounting Standards Codification · 20
- `ASC-606` — Revenue from Contracts with Customers (US) · 8

### w3c

- `schema.org` — Linked-data type vocabulary · 62
- `ECMA-262` — ECMAScript language specification · 34
- `ECMA-402` — ECMAScript Internationalization API · 21
- `W3C-PROV-O` — Provenance Ontology · 18
- `W3C-JSON-LD-1.1` — JSON for Linking Data · 14
- `W3C-ActivityPub` — Federated server-to-server protocol · 10
- `W3C-VC-2.0` — Verifiable Credentials Data Model · 8
- `W3C-DID-1.0` — Decentralized Identifiers · 6
- `Unicode-CLDR` — Common Locale Data Repository · 5
- `JSON-Schema` — JSON Schema · 3

### wcag

- `W3C-WAI-ARIA-1.2` — Accessible Rich Internet Applications · 49
- `WCAG-2.1` — Web Content Accessibility Guidelines · 31

<!-- CATALOGUE:END -->
