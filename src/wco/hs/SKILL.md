---
name: "hs"
description: "Use when implementing or referencing WCO Harmonised System."
---

# WCO Harmonised System

World Customs Organisation HS Convention. Globally standardised goods classification — 6-digit harmonised root + national extension (8 in EU CN, 10 in US HTS).

## Scope

- 21 sections × 99 chapters as a structural index.
- Structure validator (`isValidHsCodeStructure`) — confirms 6–10 digit shape, NOT existence.
- `hsChapter(code)` + `sectionForChapter(chapter)` lookups.

## Out of scope

- Full per-heading / subheading dictionary (~5 600 subheadings, ~12 000 with national extensions) — too large for in-repo. Consume via WCO HS Database API or per-jurisdiction Customs API when needed.
- Tariff rates per code — those live with each customs jurisdiction's tariff schedule.
- Section-specific rules of interpretation (HSI 1-6) — apply at classification time, not in the registry.

## Citations

- WCO Harmonised System Convention (1988, latest revision 2022)
- EU Combined Nomenclature — Council Regulation (EEC) 2658/87 + annual updates
- US Harmonized Tariff Schedule (USITC)
- INCOTERMS 2020 (companion when crossing customs)
- EU UCC 952/2013 (companion for EU import/export procedures)

**Law — [[law]]: the Harmonised System is the global goods classification — a 6-digit harmonised root plus national extension (8 EU CN, 10 US HTS); the registry validates structure and indexes sections/chapters, never the full per-heading dictionary.**
