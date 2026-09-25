---
name: projection
description: "Use when content, search, locale, version, or CSS colour must agree about what a record IS — they all DRY-derive from ONE content projection through the content-uuid. The uuid singularity realised: project(record) returns identity (uuid), searchable text (multi-search), and a deterministic colour (CSS) from the same bytes; per-locale content gives the per-locale uuid, and a version is the uuid in time."
atomPath: "uuid/projection"
coordinate: "uuid/projection · 5/round · def5f0f3"
contentUuid: "20d1aba7-4153-5a60-b458-974eccca292b"
diamondUuid: "d415fd5e-3ff8-88ca-9216-c6dc9c536e79"
uuid: "def5f0f3-1dfd-8800-90d9-259442b279d8"
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
  computationUuid: "f81fa007-2958-892a-b416-2f49bf0eb0d0"
  stages:
    - stage: path
      stageUuid: "ab1a67b6-5f8b-8120-b6d8-f2186cc21de3"
    - stage: trinity
      stageUuid: "a3a8cded-c9f7-8c2a-98a8-2ffd819ba966"
    - stage: boundary
      stageUuid: "24a06026-a34c-8ffa-afc1-a55e5bf72bc7"
    - stage: links
      stageUuid: "0a9b733b-5d09-8f39-ac71-bc3eda121248"
    - stage: horo
      stageUuid: "bb7629a2-7548-8b54-ae2c-9cb49bfc1715"
    - stage: seal
      stageUuid: "24b0f730-6d39-8814-a4a3-99c1e3954ca0"
    - stage: uuid
      stageUuid: "d285e822-b987-8a73-bb25-235a21e81304"
version: 2
---
# projection — the uuid singularity (content → uuid → search · locale · version · css)

FORM: **everything that needs to know "what a record is" derives from ONE content projection — they never re-declare it.** `projectContent(record)` strips the storage-managed fields ([[identity]]'s `NON_CONTENT_FIELDS`) to the canonical content; from that single source:
- **identity** — `computeContentUuid` hashes it ([[uuid]] / [[identity]]).
- **search** — `searchableText(record)` is its string leaves, so `multi-search` matches the SAME content the uuid hashes; the hand-listed per-collection field map is duplication this removes (search and identity cannot disagree about a record).
- **locale** — `localeContent(record, locale)` collapses each `{en,bg,…}` field to one locale, so a localized record has a per-locale content ⇒ a per-locale uuid ([[localize]] in sync with the uuid).
- **version** — a [[version]] is the content-uuid *in time*; the version chain is a chain of content-uuids (the same content-addressing the audit [[history]] rests on).
- **css** — `uuidColor(uuid)` / `uuidCssVars(uuid)` read the uuid's first bytes as an HSL triple, so a record's COLOUR is its identity — the visual facet of the [[uuid]] multimodal singularity, computed not styled.

### The ink is proven, not chosen

`uuidCssVars` had **no consumer**, and part of the reason is that it was unsafe: it handed a
component a background and left the text colour to a guess. It now carries `--uuid-ink`.

Contrast against white is `1.05/x` and against black is `x/0.05`, where `x` is the luminance plus
WCAG's 0.05 offset — so their **product is 21 for every colour there is**. If both were under 4.5
their product would be under 20.25, and 20.25 < 21. **The better of black and white therefore
always reaches WCAG AA**, on any background whatsoever. `src/verify/lean/Contrast.lean` fixes it in
the kernel over scaled integers, with no reals and no square root; `uuidInk` compares against the
crossover rather than a threshold someone picked.

Measured against the proof: over 20,000 random uuids the worst contrast is **4.583** — √21, the
theorem's floor, to three decimals — and the suite sweeps all **302,400** colours the projection can
emit without finding one below 4.5.

**This also corrects a tempting claim.** The lightness band `38..61` does NOT earn the legibility;
the identity does, and it holds at every lightness. The band is an aesthetic choice, and saying it
guarantees contrast would attribute a property to the wrong constant.

**Honest boundary.** Contrast is one criterion of one guideline. Font size, spacing, motion and
focus order are not in it, a legible pair can still be an unusable interface, and nothing here
speaks for a THIRD colour — which is exactly why the foreground stays black or white rather than
being derived from the uuid as well.

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
