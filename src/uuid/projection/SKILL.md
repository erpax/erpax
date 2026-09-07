---
name: projection
description: "Use when content, search, locale, version, or CSS colour must agree about what a record IS — they all DRY-derive from ONE content projection through the content-uuid. The uuid singularity realised: project(record) returns identity (uuid), searchable text (multi-search), and a deterministic colour (CSS) from the same bytes; per-locale content gives the per-locale uuid, and a version is the uuid in time."
atomPath: "uuid/projection"
coordinate: "uuid/projection · 5/round · f671aeaf"
contentUuid: "20299c7e-4f9a-5620-80d3-467b89397349"
diamondUuid: "7de743c2-e075-87e8-a208-7ae2b10996c1"
uuid: "f671aeaf-4eaf-8c8c-8b3d-6336d8889d4a"
horo: 5
typography:
  partition: uuid
  bondDegree: 57
standards:
  - CSS Color 4 hsl() (the colour facet)
  - "RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)"
  - "RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "36afd8d9-bc7d-8078-92dd-48b61e5b4875"
  stages:
    - stage: path
      stageUuid: "ab1a67b6-5f8b-8120-b6d8-f2186cc21de3"
    - stage: trinity
      stageUuid: "a3a8cded-c9f7-8c2a-98a8-2ffd819ba966"
    - stage: boundary
      stageUuid: "a6c3d320-7082-8bc4-ad94-dc0f3ad71fad"
    - stage: links
      stageUuid: "0a9b733b-5d09-8f39-ac71-bc3eda121248"
    - stage: horo
      stageUuid: "8466e8e5-5095-84f5-b36f-652ece9aa4d3"
    - stage: seal
      stageUuid: "24b0f730-6d39-8814-a4a3-99c1e3954ca0"
    - stage: uuid
      stageUuid: "4c35af41-7845-8ad7-8214-ff27e33c1e66"
version: 2
---
# projection — the uuid singularity (content → uuid → search · locale · version · css)

FORM: **everything that needs to know "what a record is" derives from ONE content projection — they never re-declare it.** `projectContent(record)` strips the storage-managed fields ([[identity]]'s `NON_CONTENT_FIELDS`) to the canonical content; from that single source:
- **identity** — `computeContentUuid` hashes it ([[uuid]] / [[identity]]).
- **search** — `searchableText(record)` is its string leaves, so `multi-search` matches the SAME content the uuid hashes; the hand-listed per-collection field map is duplication this removes (search and identity cannot disagree about a record).
- **locale** — `localeContent(record, locale)` collapses each `{en,bg,…}` field to one locale, so a localized record has a per-locale content ⇒ a per-locale uuid ([[localize]] in sync with the uuid).
- **version** — a [[version]] is the content-uuid *in time*; the version chain is a chain of content-uuids (the same content-addressing the audit [[history]] rests on).
- **css** — `uuidColor(uuid)` / `uuidCssVars(uuid)` read the uuid's first bytes as an HSL triple, so a record's COLOUR is its identity — the visual facet of the [[uuid]] multimodal singularity, computed not styled.

`project(record, tenantId)` returns all of it at once — `{ uuid, searchText, color, cssVars }` — DRY by construction ([[holographic]]: the whole record recoverable from, and expressed through, its uuid). The 128-bit singularity the [[uuid]] atom names: features collapse INTO the uuid, and the uuid radiates them back out — identity, search, language, time, colour — from one projection ([[all]] facets, one source).

Matter-twin: `src/uuid/projection/index.ts` (`projectContent`·`localeContent`·`searchableText`·`contentMatches`·`uuidHsl`·`uuidColor`·`uuidCssVars`·`project`) over `services/integrity` + `index.test.ts`. Composes: [[uuid]] · [[identity]] · [[localize]] · [[version]] · [[merge]] · [[holographic]] · [[all]].

**Law — [[law]]: identity, search, locale, version and colour all DRY-derive from ONE `projectContent(record)` — they can never disagree about what a record IS, because each is a facet the [[uuid]] radiates from the same bytes, never a second declaration ([[holographic]]: the whole recovered from the seed).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)`

- RFC 9562 §5.8 content-addressed uuidv8 (the identity the facets hang on)
- CSS Color 4 hsl() (the colour facet)

## Common mistakes
- A second definition of "a record's content" — search field maps, version diffs, locale lists must all derive from `projectContent`; re-declaring them is the duplication this atom exists to kill.
- Styling by category/status instead of identity — the colour is `uuidColor(uuid)`, deterministic from the content; same content ⇒ same colour everywhere ([[merge]]).
- Hashing a localized record without choosing a locale — decide: the all-locale content (one canonical uuid) or `localeContent` per locale (the per-language facets); keep it consistent so the uuid stays in sync with what is shown.
