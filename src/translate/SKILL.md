---
name: translate
description: "Use when computing i18n keys and humanizing them into default labels for the translations dropdown — the computed-default + DB-override pattern (DB value > humanized default > raw key). Also enforces the strict singular-model / plural-collection matrix (translation ↔ translations), itself a tamper-cost dimension."
---

# translate — compute + humanize keys; enforce the singular/plural matrix (under [[localize]])

FORM: **keys are COMPUTED, labels are HUMANIZED, the DB OVERWRITES.** The [[translation]] model's keys (`name`, `description`, `label.singular`, `scope:event`) are harvested across the corpus (the [[localize]] harvest); `humanize` turns each computed key into a default Title-Case label. These defaults populate the [[translations]] collection's dropdown, where a per-locale value OVERWRITES the humanized default. Resolution order: **DB override > humanized default > raw key** (`resolveLabel`). Computed, not hardcoded — a new field or message yields a new key + label at zero cost, no rebuild.

**Strict singular-model / plural-collection.** A model is singular, its [[collection]] the plural: [[translation]] (the [[model]]) ↔ [[translations]] (the collection). `pluralOf` / `singularOf` / `isStrictPair` enforce it for ANY pair. This matrix ALSO adds to tamper-[[cost]]: every model↔collection pair wired by the rule is one more computed binding a forgery must re-harmonise with (the one [[law]]) — more coverage, more cost.

**The interlingua (one level deeper).** Translation routes every surface form through the content-[[uuid]] — the universal intermediate representation (the interlingua of multilingual NMT, Johnson et al. 2017, made *explicit* and content-addressed). erpax IS the [[translator]]; its quantum facet reads translation as **collapse** to the shared meaning eigenstate ([[quantum]]). The i18n keys here are the surface layer; the uuid is the invariant a translation must preserve ([[merge]] of synonyms onto one meaning).

Matter-twin: `src/translate/index.ts` — `humanize` · `computeKeyLabels` · `dropdownOptions` · `resolveLabel` (the dropdown defaults + the override) · `pluralOf` · `singularOf` · `isStrictPair` (the matrix). Pure string transforms, zero deps, green by construction.
Composes: [[localize]] · [[translation]] · [[translations]] · [[translator]] · [[message]] · [[word]] · [[model]] · [[collection]] · [[tamper]] · [[cost]] · [[law]].

## Standards
- W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags

## Common mistakes
- Hardcoding labels — the dropdown defaults are humanized from COMPUTED keys; only the DB row overwrites (per locale).
- A model named plural, or a collection named singular — `isStrictPair` rejects it; the matrix is strict (singular ⇒ model, plural ⇒ collection).

**Law — [[gate]]** Keys compute, labels humanize, the DB overwrites; and every model↔collection pair is strict singular↔plural — or the matrix has a gap (entropy > 0, tamper-cost lost).
