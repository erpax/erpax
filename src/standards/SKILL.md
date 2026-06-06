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

## Catalogue — 220 standards, 12588 citations

<!-- GENERATED from registry.ts ⊕ @standard banners by scripts/standards-catalogue.ts. Do not edit by hand. -->

The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners. This index is where they meet: each carries its content-uuid (the same `uuid()` projection every row uses — its colour is that uuid made visible), and the same data seeds the payload `standards` collection.

### aicpa

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(193 72% 44%)"></span> `SOC-2` — SOC 2 — Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy), SSAE 18 / AT-C 105 & 205 · 2 · `255134ae`

### coso

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(35 64% 45%)"></span> `COSO-ERM-2017` — Enterprise Risk Management — Integrating with Strategy and Performance (2017) · 123 · `82eb9507`

### eidas

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(57 76% 54%)"></span> `EU-910/2014` — Regulation (EU) No 910/2014 (eIDAS) — electronic identification and trust services for electronic transactions in the internal market, repealing Directive 1999/93/EC · 48 · `cc213858`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(189 70% 41%)"></span> `EU-2024/1183` — Regulation (EU) 2024/1183 (eIDAS 2.0) — amending Regulation (EU) No 910/2014 as regards establishing the European Digital Identity Framework (EUDI Wallet) · 41 · `416d78f3`

### en

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 78% 43%)"></span> `EN-16931` — Semantic model of the electronic invoice · 111 · `b293e94d`

### etsi

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(260 73% 42%)"></span> `eIDAS` — EU electronic identification & trust services · 21 · `29ccc17c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(77 83% 42%)"></span> `ETSI-EN-319-142` — PAdES PDF advanced electronic signatures · 11 · `3f95cb7c`

### eu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 86% 49%)"></span> `Peppol-BIS-3.0` — Peppol Billing BIS · 33 · `6408ce0b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(313 59% 47%)"></span> `EU-ESRS` — European Sustainability Reporting Standards · 20 · `b2699009`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(65 72% 49%)"></span> `EU-1958` — Official languages of the EU · 10 · `1f3111fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(163 88% 56%)"></span> `NACE` — EU NACE Rev.2 economic-activity classification · 10 · `809b21d2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(296 64% 38%)"></span> `EU-AI-Act` — Regulation (EU) 2024/1689 on AI · 9 · `8af8b878`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(217 61% 51%)"></span> `ESCO` — European Skills/Competences/Occupations · 8 · `cb59fb0d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(147 84% 40%)"></span> `EU-CSRD` — EU Corporate Sustainability Reporting Directive 2022/2464 · 8 · `c843cc1a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(164 64% 54%)"></span> `PSD2` — EU Payment Services Directive 2 (2015/2366) · 8 · `f98c2c28`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(61 76% 47%)"></span> `Berlin-Group-PSD2` — Berlin Group NextGenPSD2 open-banking API · 7 · `0b7d7ee1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(161 64% 39%)"></span> `EU-VAT-Directive` — EU VAT Directive 2006/112/EC · 7 · `604172d9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(57 66% 54%)"></span> `EU-UCC` — EU Union Customs Code (Regulation 952/2013) · 5 · `96b1dd40`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 69% 45%)"></span> `SEPA` — Single Euro Payments Area schemes · 5 · `553c7767`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(207 55% 55%)"></span> `EU-2018-848` — EU Organic Production Regulation · 2 · `7f5fafb9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(189 84% 40%)"></span> `EU-1760-2000` — EU cattle identification & beef labelling (Reg 1760/2000) · 1 · `e32563da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(91 56% 40%)"></span> `EU-EUDR` — EU Deforestation Regulation (2023/1115) · 1 · `be33d31a`

### eu-directive

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(262 74% 57%)"></span> `EU-2019/1152` — Transparent and Predictable Working Conditions Directive (EU) 2019/1152 · 258 · `9a4ee58b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(275 66% 45%)"></span> `EU-2019/1937` — Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Whistleblower Directive) · 258 · `c5f3ba4f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(73 61% 53%)"></span> `EU-2019/2161` — Modernisation (Omnibus) Directive (Directive (EU) 2019/2161) · 258 · `0a214c87`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(11 87% 51%)"></span> `EU-2019/770` — Digital Content and Digital Services Directive (Directive (EU) 2019/770) · 258 · `4223200d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(222 83% 47%)"></span> `EU-2019/771` — Sale of Goods Directive (Directive (EU) 2019/771) · 258 · `8ee63f69`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(158 67% 61%)"></span> `EU-2015/849` — Directive (EU) 2015/849 (4th Anti-Money-Laundering Directive, AMLD4) on the prevention of the use of the financial system for the purposes of money laundering or terrorist financing · 230 · `34a6bbef`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(359 79% 44%)"></span> `EU-2017/1132` — Directive (EU) 2017/1132 relating to certain aspects of company law (codification) · 123 · `63d75e4e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(295 64% 38%)"></span> `EU-2017/828` — Directive (EU) 2017/828 (SRD II) amending Directive 2007/36/EC as regards the encouragement of long-term shareholder engagement · 123 · `f46f2c78`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(273 81% 48%)"></span> `EU-2002/58` — ePrivacy Directive (Directive 2002/58/EC) — privacy and electronic communications (as amended by Directive 2009/136/EC) · 105 · `9081a6ca`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(169 78% 47%)"></span> `EU-2022/2555` — Directive (EU) 2022/2555 (NIS2) — measures for a high common level of cybersecurity across the Union · 105 · `59418099`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 72% 59%)"></span> `EU-2018/1673` — Directive (EU) 2018/1673 (6th Anti-Money-Laundering Directive, AMLD6) on combating money laundering by criminal law · 104 · `02a334a5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(236 72% 50%)"></span> `EU-2018/843` — Directive (EU) 2018/843 (5th Anti-Money-Laundering Directive, AMLD5) amending Directive (EU) 2015/849 · 104 · `2c847acc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(313 87% 40%)"></span> `EU-2018/957` — Revised Posting of Workers Directive — Directive (EU) 2018/957 amending Directive 96/71/EC · 104 · `0b118902`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(88 83% 50%)"></span> `EU-2014/55` — Directive 2014/55/EU of 16 April 2014 on electronic invoicing in public procurement (the legal mandate for EN 16931 in B2G) · 48 · `1b10859c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(323 66% 51%)"></span> `EU-CSDDD-2024/1760` — Corporate Sustainability Due Diligence Directive (EU) 2024/1760 · 41 · `246bba9d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(217 78% 55%)"></span> `EU-2000/31` — Directive 2000/31/EC on electronic commerce (e-Commerce Directive) · 24 · `cb593ad1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(119 84% 59%)"></span> `EU-2011/83` — Consumer Rights Directive (Directive 2011/83/EU) · 20 · `ef87efa5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(226 73% 57%)"></span> `EU-2006/43` — Directive 2006/43/EC on statutory audits of annual accounts and consolidated accounts (as amended by Directive 2014/56/EU) · 14 · `4a029e73`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(47 55% 61%)"></span> `EU-2003/88/EC` — Working Time Directive — Directive 2003/88/EC concerning certain aspects of the organisation of working time · 10 · `b42f23a7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(302 58% 39%)"></span> `EU-2005/29` — Unfair Commercial Practices Directive (Directive 2005/29/EC) · 6 · `83f66cf1`

### eu-regulation

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(323 86% 40%)"></span> `EU-2019/1150` — Platform-to-Business Regulation — P2B (Regulation (EU) 2019/1150) · 258 · `48fb65aa`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(255 73% 40%)"></span> `EU-Intrastat-Reg-2019/2152` — Regulation (EU) 2019/2152 of the European Parliament and of the Council of 27 November 2019 on European business statistics (Intrastat intra-EU trade reporting) · 258 · `393f35aa`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(146 72% 55%)"></span> `EU-2015/847` — Regulation (EU) 2015/847 on information accompanying transfers of funds and repealing Regulation (EC) No 1781/2006 (Wire Transfer Regulation) · 230 · `2252c071`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(0 82% 46%)"></span> `EU-Taxonomy-2020/852` — Regulation (EU) 2020/852 on the establishment of a framework to facilitate sustainable investment (Taxonomy Regulation) · 166 · `97e08408`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(22 59% 42%)"></span> `EU-2023/1113` — Regulation (EU) 2023/1113 on information accompanying transfers of funds and certain crypto-assets and amending Directive (EU) 2015/849 (recast Transfer of Funds / crypto Travel Rule) · 163 · `925627ac`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(40 88% 49%)"></span> `EU-2023/2854` — Regulation (EU) 2023/2854 — Data Act, on harmonised rules on fair access to and use of data · 163 · `04602153`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 78% 48%)"></span> `EU-2023/956-CBAM` — Carbon Border Adjustment Mechanism — Regulation (EU) 2023/956 · 163 · `a893e96a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(293 69% 43%)"></span> `EU-2023/988` — General Product Safety Regulation — GPSR (Regulation (EU) 2023/988) · 163 · `271d5465`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(276 61% 52%)"></span> `EU-2023/988-GPSR` — General Product Safety Regulation — Regulation (EU) 2023/988 · 163 · `270c0686`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(256 62% 58%)"></span> `EU-2022/1925` — Regulation (EU) 2022/1925 — Digital Markets Act (DMA) · 105 · `1348d974`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(56 58% 46%)"></span> `EU-2022/2065` — Regulation (EU) 2022/2065 — Digital Services Act (DSA) · 105 · `88a00338`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(181 60% 54%)"></span> `EU-2022/2554` — Regulation (EU) 2022/2554 (DORA) on digital operational resilience for the financial sector · 105 · `be8d4b88`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(205 75% 58%)"></span> `EU-2022/868` — Regulation (EU) 2022/868 — Data Governance Act (DGA), on European data governance and amending Regulation (EU) 2018/1724 · 105 · `c5ada0d4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 75% 61%)"></span> `EU-2018/302` — Geo-blocking Regulation (Regulation (EU) 2018/302) · 104 · `04081417`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(108 56% 53%)"></span> `EU-2018/389-SCA-RTS` — Commission Delegated Regulation (EU) 2018/389 of 27 November 2017 — regulatory technical standards for strong customer authentication and common and secure open standards of communication (SCA-RTS) · 104 · `498c47b7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(140 64% 45%)"></span> `EU-537/2014` — Regulation (EU) No 537/2014 on specific requirements regarding statutory audit of public-interest entities · 48 · `dd542c7f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(238 65% 44%)"></span> `EU-2024/1620` — Regulation (EU) 2024/1620 establishing the Authority for Anti-Money Laundering and Countering the Financing of Terrorism (AMLA) · 41 · `716edcde`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(343 77% 59%)"></span> `EU-2024/1624` — Regulation (EU) 2024/1624 — the single EU AML/CFT Rulebook (AMLR) · 41 · `1aa7a215`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(276 68% 45%)"></span> `GDPR` — Regulation (EU) 2016/679 (General Data Protection Regulation) — incl. Art. 22 Automated individual decision-making, including profiling · 39 · `cb947667`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(194 55% 42%)"></span> `EU-VAT-Implementing-Reg-282/2011` — Council Implementing Regulation (EU) No 282/2011 of 15 March 2011 laying down implementing measures for Directive 2006/112/EC on the common system of value added tax (recast) · 20 · `cf7a4634`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(274 83% 54%)"></span> `EU-765/2008` — Accreditation and market surveillance / CE marking — Regulation (EC) No 765/2008 · 9 · `0112cb10`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(77 73% 55%)"></span> `EU-Admin-Coop-Reg-904/2010` — Council Regulation (EU) No 904/2010 of 7 October 2010 on administrative cooperation and combating fraud in the field of value added tax (recast) — VIES legal basis · 3 · `3b5dc1a1`

### gdpr

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(156 84% 50%)"></span> `EU-2018/1725` — Regulation (EU) 2018/1725 — protection of natural persons with regard to the processing of personal data by the Union institutions, bodies, offices and agencies and on the free movement of such data · 104 · `0d44a96c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(314 60% 59%)"></span> `EU-2016/679` — Regulation (EU) 2016/679 — General Data Protection Regulation (GDPR), on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, repealing Directive 95/46/EC · 26 · `48f2055d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(222 65% 49%)"></span> `GDPR-Art-32` — Regulation (EU) 2016/679 Article 32 — Security of processing · 1 · `b376733b`

### icc

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(194 62% 54%)"></span> `INCOTERMS-2020` — ICC Incoterms 2020 rules (ICC publication No 723E) · 10 · `fc7a2ae8`

### iec

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(287 80% 39%)"></span> `ISO/IEC-25010` — Systems & software quality models · 103 · `3c2f1991`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(355 59% 40%)"></span> `ISO/IEC-29119` — Software testing · 37 · `e69bd662`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(25 66% 53%)"></span> `ISO/IEC-23894` — AI risk management · 15 · `bb2197cf`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(272 55% 53%)"></span> `ISO/IEC-12207` — Software life-cycle processes · 9 · `897869e7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(339 56% 40%)"></span> `ISO/IEC-10918` — JPEG image coding · 5 · `4eab24da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(331 67% 50%)"></span> `ISO/IEC-42001` — AI management system · 5 · `a03398fc`

### ifrs

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(288 55% 38%)"></span> `IFRS-15` — Revenue from Contracts with Customers · 35 · `e0b86948`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(66 76% 47%)"></span> `IAS-1` — Presentation of Financial Statements · 26 · `f0bae7c9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(214 86% 61%)"></span> `IAS-34` — Interim Financial Reporting · 14 · `07deaba7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(302 73% 49%)"></span> `IAS-41` — Agriculture (biological assets) · 14 · `cfe6e453`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 61% 57%)"></span> `IFRS-13` — Fair Value Measurement · 14 · `6296d8d3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(273 67% 59%)"></span> `IFRS-9` — Financial Instruments · 13 · `b3a9bba5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(304 60% 49%)"></span> `IAS-12` — Income Taxes · 9 · `a9f0b4fb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(82 79% 51%)"></span> `IFRS-3` — Business Combinations · 9 · `4972186d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(325 82% 41%)"></span> `IFRS-17` — Insurance Contracts · 8 · `5f7d61ab`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(186 87% 47%)"></span> `IAS-2` — Inventories · 7 · `53b24399`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(305 60% 52%)"></span> `IAS-40` — Investment Property · 7 · `77516eb6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(343 58% 60%)"></span> `IFRS-2` — Share-based Payment · 7 · `ec2f6c2e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(213 58% 61%)"></span> `IFRS-5` — Non-current Assets Held for Sale & Discontinued Operations · 7 · `104dd55f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(272 57% 40%)"></span> `IFRS-6` — Exploration for & Evaluation of Mineral Resources · 7 · `8c4848f2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(277 82% 43%)"></span> `IFRS-16` — Leases · 6 · `2e15a7dd`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(11 59% 46%)"></span> `IAS-7` — Statement of Cash Flows · 4 · `f4bb0480`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(343 61% 44%)"></span> `IAS-8` — Accounting Policies, Changes in Accounting Estimates and Errors · 4 · `f76f92c6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(156 59% 40%)"></span> `IFRS-18` — Presentation and Disclosure in Financial Statements · 2 · `e73cd6c2`

### ilo

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(93 73% 47%)"></span> `ILO-C001` — Hours of Work (Industry) Convention, 1919 (No. 1) · 124 · `27bd9e21`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(68 85% 53%)"></span> `ILO-C100` — Equal Remuneration Convention, 1951 (No. 100) · 30 · `8ce464e7`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(140 79% 44%)"></span> `ILO-C105` — Abolition of Forced Labour Convention, 1957 (No. 105) · 19 · `2ef4814e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(25 61% 58%)"></span> `ILO-C111` — Discrimination (Employment and Occupation) Convention, 1958 (No. 111) · 12 · `20714cd4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(279 86% 41%)"></span> `ILO-C138` — Minimum Age Convention, 1973 (No. 138) · 11 · `810fceab`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(57 75% 41%)"></span> `ILO-C087` — Freedom of Association and Protection of the Right to Organise Convention, 1948 (No. 87) · 8 · `0b797d03`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(83 64% 52%)"></span> `ILO-C182` — Worst Forms of Child Labour Convention, 1999 (No. 182) · 7 · `4adbb8b6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(123 57% 58%)"></span> `ILO-C029` — Forced Labour Convention, 1930 (No. 29) · 6 · `cc636b2c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(340 71% 39%)"></span> `ILO-C098` — Right to Organise and Collective Bargaining Convention, 1949 (No. 98) · 4 · `15049c91`

### iso

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(359 66% 49%)"></span> `ISO-8601-1` — Date and time representation · 242 · `dcc7dde3`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(112 57% 38%)"></span> `ISO-4217` — Currency codes · 228 · `2aa02578`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(83 87% 54%)"></span> `ISO-19011` — Auditing management systems · 97 · `85eb43b8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(268 74% 57%)"></span> `ISO-3166-1` — Country codes · 92 · `33acc25b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(215 78% 55%)"></span> `ISO-20022` — Universal financial industry message scheme · 88 · `37af5d59`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(24 66% 46%)"></span> `ISO-27001` — Information security management system · 76 · `55e0dd80`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(292 63% 53%)"></span> `ISO/IEC-27001:2022` — Information security, cybersecurity and privacy protection — Information security management systems — Requirements · 76 · `25b44e57`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(26 74% 52%)"></span> `ISO-13616-1` — IBAN — International Bank Account Number · 42 · `7d425926`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(14 80% 58%)"></span> `ISO-27002` — Information security controls · 36 · `2336192c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(56 72% 42%)"></span> `ISO/IEC-27002:2022` — Information security, cybersecurity and privacy protection — Information security controls · 36 · `a4c07aac`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(41 74% 39%)"></span> `ISO-9362` — BIC — Business Identifier Code (SWIFT) · 31 · `69a1e579`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(11 70% 47%)"></span> `ISO-17442-1` — LEI — Legal Entity Identifier · 18 · `816b5551`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(61 67% 45%)"></span> `ISO-639` — Language codes · 18 · `ad359867`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(349 85% 40%)"></span> `ISO/IEC-27001` — ISO/IEC 27001:2022 — Information security, cybersecurity and privacy protection — Information security management systems — Requirements · 17 · `a74d641a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(3 83% 60%)"></span> `ISO-3166-2` — Country subdivision codes · 15 · `2b9ba8a6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 80% 55%)"></span> `ISO-19005` — PDF/A archival format · 14 · `c97ea5e9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(133 64% 48%)"></span> `ISO-22400-2` — Manufacturing operations KPIs · 12 · `95952c82`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(226 57% 53%)"></span> `ISO-32000` — PDF — Portable Document Format · 11 · `786a489f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(159 57% 59%)"></span> `ISO-7064` — Check character systems · 11 · `b8d78e45`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(224 74% 58%)"></span> `ISO-14289-1` — PDF/UA universally accessible PDF · 10 · `dda87cbc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(87 89% 59%)"></span> `ISO-9001` — ISO 9001:2015 — Quality management systems: requirements · 10 · `bb5f8b75`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(251 80% 55%)"></span> `ISO-37301` — Compliance management systems · 9 · `393bebe9`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(5 74% 48%)"></span> `ISO-41001` — Facility management · 9 · `fbbd366a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(35 66% 60%)"></span> `ISO-19160-4` — Addressing — components & conceptual model · 8 · `db832e2e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(69 58% 44%)"></span> `ISO-55000` — Asset management · 8 · `69bdd54e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(82 66% 39%)"></span> `ISO-27037` — Digital evidence identification & preservation · 7 · `20aa97f1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(314 80% 59%)"></span> `ISO-6523-1` — Participant identifier scheme · 7 · `a72aa55d`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(168 62% 39%)"></span> `ISO-14064-1` — ISO 14064-1:2018 — Greenhouse gases — Part 1: Specification with guidance at the organization level for quantification and reporting of greenhouse gas emissions and removals · 6 · `bfe84d19`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(58 89% 59%)"></span> `ISO-37000` — ISO 37000:2021 — Governance of organizations — Guidance · 6 · `c51a22bd`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(262 60% 42%)"></span> `ISO/IEC/IEEE-29119` — ISO/IEC/IEEE 29119 — Software and systems engineering — Software testing (multi-part; Part 1 General concepts, 29119-1:2022) · 6 · `ce562864`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(71 70% 41%)"></span> `ISO/IEC-27002` — ISO/IEC 27002:2022 — Information security, cybersecurity and privacy protection — Information security controls · 3 · `f65fbe33`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(297 82% 45%)"></span> `ISO-22301:2019` — Security and resilience — Business continuity management systems — Requirements · 2 · `97a1a77f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(24 88% 54%)"></span> `ISO-11784` — RFID animal identification (code structure & protocol) · 1 · `fea06728`

### national

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(144 58% 53%)"></span> `Naredba-N-18` — BG fiscal-device & SUPTO ordinance · 314 · `6a08f86f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(156 60% 54%)"></span> `ZDDS` — BG Value Added Tax Act · 3 · `83644ba0`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(102 55% 55%)"></span> `ZKPO` — BG Corporate Income Tax Act · 1 · `319ed289`

### nist

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(157 78% 44%)"></span> `NIST-SP-800-63` — Digital Identity Guidelines (identity proofing, authentication & federation assurance levels) · 74 · `46ed5dc6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(326 65% 58%)"></span> `NIST-INCITS-359-2012` — Role-Based Access Control · 45 · `e67e2dd4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(173 82% 42%)"></span> `NIST-FIPS-180-4` — Secure Hash Standard (SHA-2) · 31 · `6a25a77c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(346 57% 44%)"></span> `OWASP-ASVS` — Application Security Verification Standard · 14 · `b55af77e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 65% 44%)"></span> `NIST-SP-800-162` — Attribute-Based Access Control · 13 · `6610734e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(27 85% 48%)"></span> `NIST-SP-800-38D` — AES-GCM authenticated encryption · 11 · `439bcd9a`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(129 72% 43%)"></span> `NIST-SP-800-92` — Log management · 11 · `20d957c5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(228 68% 43%)"></span> `NIST-SP-800-57` — Key management lifecycles · 8 · `03b4df35`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(6 59% 53%)"></span> `NIST-SP-800-108` — Key derivation functions · 5 · `1956d6ff`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(138 75% 54%)"></span> `NIST-AI-RMF` — AI Risk Management Framework · 4 · `268214a0`

### oauth

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(14 73% 56%)"></span> `RFC-6749` — The OAuth 2.0 Authorization Framework · 2 · `ef1ec1a2`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(53 67% 54%)"></span> `RFC-6750` — The OAuth 2.0 Authorization Framework: Bearer Token Usage · 1 · `d5f5bb28`

### oecd

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(342 61% 61%)"></span> `SAF-T` — OECD Standard Audit File for Tax · 70 · `3c66b577`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(192 85% 45%)"></span> `OECD-Transfer-Pricing` — Transfer Pricing Guidelines · 17 · `d3b0647f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(13 84% 42%)"></span> `BEPS` — Base Erosion and Profit Shifting · 11 · `a1c51ddc`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(117 68% 61%)"></span> `OECD-Pillar-Two` — GloBE global minimum tax · 8 · `d635bcd7`

### other

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(220 59% 47%)"></span> `MCP` — Model Context Protocol · 32 · `bbe40439`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(33 75% 50%)"></span> `ISA-95` — Enterprise-control system integration · 20 · `b8595a9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(127 88% 44%)"></span> `GHG-Protocol` — Greenhouse Gas Protocol · 18 · `e5b7f3c6`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(280 81% 43%)"></span> `IEEE-754` — Floating-point arithmetic · 18 · `e650ec1d`
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

### pcaob

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 58% 48%)"></span> `PCAOB-AS-1105` — AS 1105: Audit Evidence · 2 · `2cd0499a`

### rfc

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(29 70% 49%)"></span> `RFC-9562` — UUID (revised — content/event uuid) · 125 · `01855583`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(75 64% 48%)"></span> `BCP-47` — Language tags · 78 · `766b2cca`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 73% 47%)"></span> `RFC-8785` — JSON Canonicalization Scheme · 24 · `67e3e4b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(48 87% 54%)"></span> `RFC-4122` — UUID (original) · 10 · `74e8ac88`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(36 68% 41%)"></span> `RFC-5545` — iCalendar · 10 · `1adc537b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(151 79% 42%)"></span> `RFC-7231` — HTTP/1.1 semantics · 9 · `87973b1c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(312 81% 50%)"></span> `RFC-5652` — Cryptographic Message Syntax (CMS) · 7 · `cd206054`

### sox

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(241 86% 54%)"></span> `SOX` — Sarbanes-Oxley Act §302/404/906 · 50 · `a6e18810`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(166 65% 49%)"></span> `COSO-2013` — Internal Control — Integrated Framework · 11 · `1e2eb9cb`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(208 89% 54%)"></span> `ISA-500` — Audit Evidence · 4 · `6340aee8`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 60% 60%)"></span> `PCAOB-AS-2201` — Integrated Audit of ICFR · 4 · `3efad72e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(71 58% 50%)"></span> `ISA-530` — Audit Sampling · 2 · `01af8f84`

### treaty

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(30 84% 48%)"></span> `CoE-108+` — Council of Europe Convention 108+ (CETS No. 108, as modernised by the 2018 amending Protocol CETS No. 223) for the Protection of Individuals with regard to Automatic Processing of Personal Data · 19 · `b2b6efe2`

### un

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(282 75% 49%)"></span> `UBL-2.1` — Universal Business Language · 323 · `91f2143b`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(12 56% 43%)"></span> `GS1-GTIN` — Global Trade Item Number · 290 · `74c424f5`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(198 85% 41%)"></span> `ISO-9735` — UN/EDIFACT syntax rules · 46 · `d0e6f0db`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 72% 47%)"></span> `UN-CEFACT` — UN/CEFACT code lists · 33 · `dede9d51`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(4 84% 47%)"></span> `WCO-HS` — Harmonized System customs nomenclature · 11 · `735463b1`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(190 74% 59%)"></span> `UNSPSC` — UN Standard Products & Services Code · 5 · `f40636ed`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(160 73% 51%)"></span> `Codex-Honey` — Codex honey standard / EU Honey Directive 2001/110 · 2 · `d228e455`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(119 64% 41%)"></span> `FAO-Agroecology` — FAO 10 Elements of Agroecology · 2 · `4997b833`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(38 58% 39%)"></span> `Codex-Alimentarius` — Codex Alimentarius (FAO/WHO food standards) · 1 · `261ef849`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(315 67% 59%)"></span> `FAO-CCRF` — FAO Code of Conduct for Responsible Fisheries · 1 · `b26bbb5d`

### upu

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(352 55% 50%)"></span> `UPU-S42` — International postal addressing · 9 · `aa20af84`

### us-gaap

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(237 67% 60%)"></span> `ASC-842` — Leases (Topic 842) · 1 · `bbf5522e`

### us-law

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(317 59% 39%)"></span> `US-CTA-2021` — US Corporate Transparency Act 2021 (31 U.S.C. §5336) — beneficial ownership information reporting requirements · 27 · `c34d4a31`

### us_gaap

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(301 56% 38%)"></span> `US-GAAP` — FASB Accounting Standards Codification · 44 · `2f956ac0`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(174 57% 43%)"></span> `ASC-606` — Revenue from Contracts with Customers (US) · 16 · `eb8625c5`

### w3c

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(231 64% 45%)"></span> `schema.org` — Linked-data type vocabulary · 2347 · `9cff4f7f`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(142 89% 52%)"></span> `W3C-PROV-O` — Provenance Ontology · 302 · `aab6453e`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(113 78% 40%)"></span> `ECMA-262` — ECMAScript language specification · 33 · `dbd1c6da`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(56 87% 50%)"></span> `ECMA-402` — ECMAScript Internationalization API · 26 · `3008cf9c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(162 56% 46%)"></span> `W3C-JSON-LD-1.1` — JSON for Linking Data · 17 · `5c0a6a50`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(213 58% 42%)"></span> `W3C-ActivityPub` — Federated server-to-server protocol · 13 · `df058f64`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(18 84% 42%)"></span> `W3C-VC-2.0` — Verifiable Credentials Data Model · 9 · `44faccc4`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(134 72% 38%)"></span> `W3C-DID-1.0` — Decentralized Identifiers · 7 · `23ae3478`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(308 64% 54%)"></span> `Unicode-CLDR` — Common Locale Data Repository · 6 · `8b04db58`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(87 70% 40%)"></span> `JSON-Schema` — JSON Schema · 4 · `85ef557a`

### wcag

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(333 66% 50%)"></span> `W3C-WAI-ARIA-1.2` — Accessible Rich Internet Applications · 340 · `a46dba6c`
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(254 62% 40%)"></span> `WCAG-2.1` — Web Content Accessibility Guidelines · 34 · `852e7032`

### registered — awaiting citation (40)

Known canonical standards in the registry not yet cited by code — e.g. the upstream permaculture / regenerative-agriculture basis of the agriculture domain. They seed as `proposed` and become cited as the domain grows.

- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(63 55% 51%)"></span> `EUDI-ARF` — European Digital Identity Wallet Architecture and Reference Framework (ARF)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(107 57% 46%)"></span> `EMV-3DS` — EMV 3-D Secure (3DS) Protocol and Core Functions Specification
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(264 62% 45%)"></span> `EMVCo-Card-Specs` — EMV Integrated Circuit Card Specifications for Payment Systems (Books 1-4)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(271 87% 41%)"></span> `EU-96/71/EC` — Posting of Workers Directive — Directive 96/71/EC concerning the posting of workers in the framework of the provision of services
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(187 76% 54%)"></span> `EU-DAC` — Council Directive 2011/16/EU on administrative cooperation in the field of taxation (DAC; incl. DAC-4 CbCR Directive (EU) 2016/881 & DAC-7 platforms Directive (EU) 2021/514)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(309 68% 55%)"></span> `EU-ESEF` — European Single Electronic Format (Commission Delegated Regulation (EU) 2019/815, Inline XBRL)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(114 63% 51%)"></span> `FATF-R.10` — FATF Recommendation 10 — Customer Due Diligence (CDD)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(71 69% 54%)"></span> `FATF-R.12` — FATF Recommendation 12 — Politically Exposed Persons (PEPs)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(46 89% 61%)"></span> `FATF-R.16` — FATF Recommendation 16 — Wire Transfers (the 'Travel Rule')
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(237 60% 38%)"></span> `FATF-Recommendations` — FATF International Standards on Combating Money Laundering and the Financing of Terrorism & Proliferation (40 Recommendations)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(177 76% 41%)"></span> `GRI-Standards` — GRI Sustainability Reporting Standards (Global Reporting Initiative)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(227 72% 41%)"></span> `GS1-EPCIS-2.0` — GS1 EPCIS 2.0 — EPC Information Services / Core Business Vocabulary, supply-chain event visibility (EPCIS = ISO/IEC 19987:2024; CBV = ISO/IEC 19988:2024)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(316 59% 40%)"></span> `IFRS-S2` — IFRS S2 Climate-related Disclosures (ISSB)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(30 66% 43%)"></span> `IFRS-S1` — General Requirements for Disclosure of Sustainability-related Financial Information
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(9 70% 58%)"></span> `Wolfsberg-AML-Principles` — Wolfsberg Group Anti-Money-Laundering Principles (private banking / correspondent banking due diligence)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(198 86% 50%)"></span> `IPCC-GHG-Guidelines` — 2006 IPCC Guidelines for National Greenhouse Gas Inventories (with the 2019 Refinement) — emission-factor basis
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(142 69% 55%)"></span> `ISO-14001` — ISO 14001:2015 — Environmental management systems — Requirements with guidance for use
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(223 67% 56%)"></span> `ISO-14068-1` — ISO 14068-1:2023 — Climate change management — Transition to net zero — Part 1: Carbon neutrality
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(266 74% 45%)"></span> `ISO-28000` — ISO 28000:2022 — Security and resilience: Security management systems — Requirements (supply chain security)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(302 79% 58%)"></span> `ISO-30414` — ISO 30414:2018 — Human resource management — Guidelines for internal and external human capital reporting
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(116 82% 51%)"></span> `ISO/IEC-27017:2015` — Information technology — Security techniques — Code of practice for information security controls based on ISO/IEC 27002 for cloud services
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(200 69% 39%)"></span> `ISO/IEC-27018:2019` — Information technology — Security techniques — Code of practice for protection of personally identifiable information (PII) in public clouds acting as PII processors
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(54 71% 54%)"></span> `ISO/IEC-27701` — ISO/IEC 27701 — Privacy Information Management System (PIMS); the 2019 edition is the extension to ISO/IEC 27001 and ISO/IEC 27002 for privacy information management
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(28 61% 40%)"></span> `ISO/IEC-27701:2019` — Information technology — Security techniques — Extension to ISO/IEC 27001 and ISO/IEC 27002 for privacy information management — Requirements and guidelines
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(224 86% 58%)"></span> `ISO/IEC-29115` — Information technology — Security techniques — Entity authentication assurance framework
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(78 68% 49%)"></span> `ISO/IEC-42005` — ISO/IEC 42005:2025 — Information technology — Artificial intelligence (AI) — AI system impact assessment
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(278 59% 53%)"></span> `ISO/IEC-TR-24028` — ISO/IEC TR 24028:2020 — Information technology — Artificial intelligence — Overview of trustworthiness in artificial intelligence
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(154 66% 45%)"></span> `RFC-7519` — JSON Web Token (JWT)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(3 86% 59%)"></span> `NIST-CSF-2.0` — NIST Cybersecurity Framework (CSF) 2.0 (Govern, Identify, Protect, Detect, Respond, Recover)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(261 83% 45%)"></span> `RFC-7636` — Proof Key for Code Exchange by OAuth Public Clients (PKCE)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(198 66% 50%)"></span> `RFC-8414` — OAuth 2.0 Authorization Server Metadata
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(280 71% 42%)"></span> `RFC-9700` — Best Current Practice for OAuth 2.0 Security
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(279 66% 39%)"></span> `OECD-G20-Corporate-Governance` — G20/OECD Principles of Corporate Governance 2023
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(341 75% 50%)"></span> `OIDC-Core-1.0` — OpenID Connect Core 1.0
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(238 61% 61%)"></span> `OWASP-ASVS-4.0` — OWASP Application Security Verification Standard (ASVS) 4.0
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(41 83% 48%)"></span> `SEC-Rule-10A-3` — SEC Rule 10A-3 — Listed Company Audit Committees (Exchange Act §10A(m))
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(59 76% 38%)"></span> `CoE-AI-Convention` — Council of Europe Framework Convention on Artificial Intelligence and human rights, democracy and the rule of law (CETS No. 225, 2024)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(251 72% 43%)"></span> `UN-CEFACT-CII-D16B` — UN/CEFACT Cross Industry Invoice (CII) XML, schema release D16B (SCRDM - CII); the second EN 16931 syntax binding
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(70 69% 58%)"></span> `CCPA-CPRA` — California Consumer Privacy Act of 2018, as amended by the California Privacy Rights Act of 2020 (Cal. Civ. Code §1798.100 et seq.)
- <span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:hsl(149 89% 47%)"></span> `XBRL-2.1` — Extensible Business Reporting Language (XBRL) 2.1

<!-- CATALOGUE:END -->
