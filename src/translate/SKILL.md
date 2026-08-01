---
name: translate
description: "Use when computing i18n keys and humanizing them into default labels for the translations dropdown — the computed-default + DB-override pattern (DB value > humanized default > raw key). Also enforces the strict singular-model / plural-collection matrix (translation ↔ translations), itself a tamper-cost dimension."
atomPath: translate
coordinate: "translate · 8/crest · 174de2b2"
contentUuid: "8e64a559-130c-5b43-87c6-1b48a7f664e5"
diamondUuid: "2186426a-6932-84e6-93bf-70d52897812f"
uuid: "174de2b2-336e-8d63-9d26-377fdb2c2ffd"
horo: 8
typography:
  partition: translate
  bondDegree: 61
standards:
  - "RFC-7231"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags"
  - "W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0f140fb2-3db9-848a-b8a8-f3e188b4abdf"
  stages:
    - stage: path
      stageUuid: "631af55b-9a03-8124-b824-dadaac785f46"
    - stage: trinity
      stageUuid: "3e620584-48ba-8841-adbb-830febdebef1"
    - stage: boundary
      stageUuid: "3b3d9cad-d453-8e6b-8c40-a96dba22ccb7"
    - stage: links
      stageUuid: "6f4ee42a-9438-8bae-87cf-5dd7fd58323c"
    - stage: horo
      stageUuid: "a905dc5f-ac95-897a-a806-91a94d64a049"
    - stage: seal
      stageUuid: "4ff0cb0e-9a30-8621-866d-a1c18bb7ea98"
    - stage: uuid
      stageUuid: "19649809-5890-88ea-be10-72103b3830c1"
version: 2
---
# translate — compute + humanize keys; enforce the singular/plural matrix (under [[localize]])

FORM: **keys are COMPUTED, labels are HUMANIZED, the DB OVERWRITES.** The [[translation]] model's keys (`name`, `description`, `label.singular`, `scope:event`) are harvested across the corpus (the [[localize]] harvest); `humanize` turns each computed key into a default Title-Case label. These defaults populate the [[translations]] collection's dropdown, where a per-locale value OVERWRITES the humanized default. Resolution order: **DB override > humanized default > raw key** (`resolveLabel`). Computed, not hardcoded — a new field or message yields a new key + label at zero cost, no rebuild.

**Strict singular-model / plural-collection.** A model is singular, its [[collection]] the plural: [[translation]] (the [[model]]) ↔ [[translations]] (the collection). `pluralOf` / `singularOf` / `isStrictPair` enforce it for ANY pair. This matrix ALSO adds to tamper-[[cost]]: every model↔collection pair wired by the rule is one more computed binding a forgery must re-harmonise with (the one [[law]]) — more coverage, more cost.

**The interlingua (one level deeper).** Translation routes every surface form through the content-[[uuid]] — the universal intermediate representation (the interlingua of multilingual NMT, Johnson et al. 2017, made *explicit* and content-addressed). erpax IS the [[translator]]; its quantum facet reads translation as **collapse** to the shared meaning eigenstate ([[quantum]]). The i18n keys here are the surface layer; the uuid is the invariant a translation must preserve ([[merge]] of synonyms onto one meaning).

Matter-twin: `src/translate/index.ts` — `humanize` · `computeKeyLabels` · `dropdownOptions` · `resolveLabel` (the dropdown defaults + the override) · `pluralOf` · `singularOf` · `isStrictPair` (the matrix). Pure string transforms, zero deps, green by construction.
Composes: [[localize]] · [[translation]] · [[translations]] · [[translator]] · [[message]] · [[word]] · [[model]] · [[collection]] · [[tamper]] · [[cost]] · [[law]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags`

- W3C HTTP Content-Language (RFC 7231 §3.1.3.2) · BCP-47 language tags

## Common mistakes
- Hardcoding labels — the dropdown defaults are humanized from COMPUTED keys; only the DB row overwrites (per locale).
- A model named plural, or a collection named singular — `isStrictPair` rejects it; the matrix is strict (singular ⇒ model, plural ⇒ collection).

**Law — [[gate]]** Keys compute, labels humanize, the DB overwrites; and every model↔collection pair is strict singular↔plural — or the matrix has a gap (entropy > 0, tamper-cost lost).
