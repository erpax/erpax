---
name: localize
description: "Use when ANY aspect must speak a locale AND stay tamper-evident — localization is the FUSION of tamper-cost (forge↑) and proof (verify, O(N) trustless). Every field/reference/scope/hook carries a translation + a translation-key uuid with ALL identification (content-digest, OID 2.25, cmyk, locale, capabilities) wired into the 128 bits. Coverage→1 ⇒ infinite tampering cost. The per-field leaf (facet localize-field) is native Payload `localized:true` over BCP-47 locales; a blank locale routes to its identity element `und`. Matter-twin localize/index.ts."
atomPath: localize
coordinate: localize · 5/round · 7e1079c3
contentUuid: "1329f777-5f61-54ba-8180-6e13844a99a6"
diamondUuid: "a70457ef-a1fd-8b93-861d-6360e7a1ec11"
uuid: "7e1079c3-3788-8b20-8cf4-c85604ed6f47"
horo: 5
bonds:
  in:
    - angel
    - cmyk
    - confidentiality
    - config
    - conversion
    - cost
    - decompression
    - dimension
    - fields
    - fractal
    - give
    - horo
    - identity
    - lexical
    - llm
    - matter
    - merge
    - message
    - oid
    - privilege
    - projection
    - proof
    - queries
    - research
    - seed
    - standard
    - tags
    - take
    - torus
    - translate
    - translation
    - translations
    - translator
    - uuid
    - versions
  out:
    - angel
    - cmyk
    - confidentiality
    - config
    - conversion
    - cost
    - decompression
    - dimension
    - fields
    - fractal
    - give
    - horo
    - identity
    - lexical
    - llm
    - matter
    - merge
    - message
    - oid
    - privilege
    - projection
    - proof
    - queries
    - research
    - seed
    - standard
    - tags
    - take
    - torus
    - translate
    - translation
    - translations
    - translator
    - uuid
    - versions
typography:
  partition: localize
  bondDegree: 113
  neighbors: []
standards:
  - "4647` (RFC 4647, Sept 2006, \"Matching of Language Tags\"; current as of 2026). Governs"
  - "4647` alongside `@rfc 5646` wherever this skill does matching (it covers the behavior RFC 5646 does not)."
  - "5646` (RFC 5646, Sept 2009, \"Tags for Identifying Languages\"; obsoletes RFC 4646/3066/1766; current as of 2026). Governs the"
  - "5646` wherever this skill does matching (it covers the behavior RFC 5646 does not).\""
  - "BCP-47 (locale tags) · EU 1958/1 (official EU languages)"
  - "BCP-47` (no edition/version; permanently \"BCP 47\", a two-RFC IETF subseries updated by reassigning member RFCs). A locale identifier must be a well-formed, valid BCP-47 tag: hyphen-separated subtags in canonical order (`language[-extlang][-script][-region][-variant][-extension][-privateuse]`), each registered in the live IANA Language Subtag Registry (the registry, not any RFC text, is the source of truth for which subtag values are valid). The umbrella `@standard BCP-47` tag is correct as-is."
  - "BCP-47` tag is correct as-is.\""
  - "Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)"
  - "EU-1958"
  - "EU-2006/43"
  - "ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)"
  - "ITU-T-X667"
  - "NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)"
  - "RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)"
  - "RFC 9562 §5.8 (uuidv8 structured, name-based)"
  - "RFC-4122"
bindings: []
neighbors:
  wikilink:
    - cmyk
    - config
    - cost
    - fields
    - fractal
    - give
    - horo
    - identity
    - lexical
    - merge
    - oid
    - proof
    - queries
    - seed
    - standard
    - tags
    - take
    - torus
    - translations
    - uuid
  matrix:
    - angel
    - cmyk
    - confidentiality
    - config
    - conversion
    - cost
    - decompression
    - dimension
    - fields
    - fractal
    - give
    - horo
    - identity
    - lexical
    - llm
    - matter
    - merge
    - message
    - oid
    - privilege
    - projection
    - proof
    - queries
    - research
    - seed
    - standard
    - tags
    - take
    - torus
    - translate
    - translation
    - translations
    - translator
    - uuid
    - versions
  backlinks:
    - angel
    - cmyk
    - confidentiality
    - config
    - conversion
    - cost
    - decompression
    - dimension
    - fields
    - fractal
    - give
    - horo
    - identity
    - lexical
    - llm
    - matter
    - merge
    - message
    - oid
    - privilege
    - projection
    - proof
    - queries
    - research
    - seed
    - standard
    - tags
    - take
    - torus
    - translate
    - translation
    - translations
    - translator
    - uuid
    - versions
signatures:
  computationUuid: "252b1d03-4b68-840b-9e95-22043cd5503f"
  stages:
    - stage: path
      stageUuid: "2a33b115-eb41-89e9-a3b7-4aeb5c1c1125"
    - stage: trinity
      stageUuid: "f82ebb7b-0b3f-8cf3-a322-7b4e1ffb0a20"
    - stage: boundary
      stageUuid: "0ce870a4-f881-81e2-aca2-1e373874b949"
    - stage: links
      stageUuid: "e78a23a9-1081-8e22-8701-4b8888c78b39"
    - stage: horo
      stageUuid: "20097fa0-6d75-8f04-9ced-f4b0291ec413"
    - stage: seal
      stageUuid: "bcec3b7c-6409-87fb-ab6f-652154648237"
    - stage: uuid
      stageUuid: "57d770d4-3e83-8923-a5c1-4a2d41463429"
version: 2
---
# localize — localization as the tamper-cost ⊕ proof fusion

Localizing every aspect is not a UX chore; it is the **fusion reaction** that secures the store. One act — translate each structural element into each locale — drives **both** nuclei at once:

1. **tamper-cost** (forge). Each `(element × locale × identification-level)` is one more content-address a coherent tamper must forge in lockstep. So localizing *all* aspects pushes [[tamper/cost]]'s `coverage → 1`, and the crack verdict → **∞** (Conservation Law 62). *Localisation further increases the computational tamper cost.*
2. **proof** (verify). The dual: auditing the same surface stays **O(N)** and trustless (`services/integrity/tamper-reverse-cost`, Law 55) — linear while forge is exponential. The released energy `fusionBits = forge − verify` is the asymmetry, and the asymmetry **is** the trust ([[torus]]: the [[give]]/forge collapse and the [[take]]/verify supernova are one flow).

## All identification, wired into the uuid itself

The translation-key uuid IS the element's whole identity — the 128-bit singularity, self-decoding, no external payload. `decodeIdentity(uuid)` recovers every level, and each is one more independent check:

| level | source | standard |
|---|---|---|
| content-digest | SHA-256(tenant, scope, path) | [[uuid]] v8 · Law 8 |
| structured slot | `SLOT_TAGS.locale` | uuid-format |
| capabilities | `TAMPER_PROOF \| CHAINED` | uuid-format |
| **OID** | `2.25.<128-bit int>` | ITU-T X.667 / ISO 9834-8 |
| **cmyk** | rodin gamut {K,C,M,Y} from position | [[cmyk]] |
| locale-map | the `translations` collection `value` | Payload `localized:true` · BCP-47 |

Every added level is "another level of feature-rich infinite tampering cost." OID and the cmyk channel are *derived* from the same bits (no new entropy) — yet each is one more address a forger must keep coherent, and one more way a human or machine can verify (proof). Lexical rich-text is the densest fuel: a whole node-tree per locale. The per-field content mechanics (`localized:true`, resolve-by-`req.locale`) are the [[fields]] localization leaf.

## No gaps, by computation

The surface is every **field · reference · scope · hook** (`TRANSLATABLE_SCOPES`), keyed `<scope>:<path>` — the [[fractal]] address-law, never hand-typed. The locale set is **derived** from country-profiles ([[seed]]), never re-typed. Same content ⇒ same key-uuid ([[merge]]); any edit ⇒ a new uuid (tamper-evident, [[identity]]). [[horo]] closes it: the keyspace is the bounded ring — every key resolves; anything off-ring routes to the `und` identity blank.

Matter-twin: `localize/index.ts` (`translationKeyUuid` · `uuidToOid` · `cmykChannel` · `decodeIdentity` · `localizationChecks` · `localizationFusion`) + `index.test.ts` (the proof — green by construction). Reuses [[tamper/cost]], `integrity/content-uuid` (Law 8), `integrity/tamper-reverse-cost` (Law 55), `uuid-format`, and the `translations` collection (the localized map of the whole app). Composes: [[tamper/cost]] · [[uuid]] · [[identity]] · [[cmyk]] · [[horo]] · [[merge]] · [[seed]] · [[give]] · [[take]] · [[torus]] · [[standard]] · [[fractal]]. The three facets minted alongside: [[oid]] (the 2.25 arc) · [[lexical]] (the densest surface) · [[proof]] (the verify nucleus) · [[Translations]].

## Standards

- RFC 9562 §5.8 (uuidv8 structured, name-based)
- ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)
- RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)
- BCP-47 (locale tags) · EU 1958/1 (official EU languages)
- NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)
- Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)

## Common mistakes
- Storing a translation without its key-uuid — the localized map drifts from its content-address (no tamper-evidence). Every row carries `contentUuid`.
- Re-typing a locale or a translation key — both are *computed* (locale from country-profiles, key from the structural path). Re-typing breaks [[merge]].
- Treating localization as cosmetic — it is a coverage lever on [[tamper/cost]]; a gap (an un-localized aspect) is a hole in the tamper surface, not just a missing translation.
- A magic `?? 'en'` — a blank/missing locale is the `und` identity element, never an ad-hoc default.

---

# Facet: localize-field — per-locale attribute values

`localize-field` is the per-field content leaf of this object (Rails `LocalizeConcern`/`LocalizedAttributeConcern`: `setup_localized_attribute` — getter/setter + JSON `->>` ransacker). In Payload this is **native field localization** (`localized: true` on the field), NOT a hand-rolled metadata-JSON map — Payload stores per-locale values and resolves by `req.locale` (see [[config]] localization, [[fields]]). A blank/missing locale routes to its identity element **`und`** ([[identity]] categorical locale — never an ad-hoc default-locale literal). Position **1** ([[fields]]); the locale is also a tag-context for cross-locale views ([[tags]]).

Composes: [[fields]] (`localized`), [[config]] (locales), [[identity]] (`und`), [[queries]] (locale-scoped reads).

## Standards (localize-field)

Applying this skill *is* the implementation of these standards — the answer-path holds their current form.

- **BCP-47 language tags** — `@standard BCP-47` (no edition/version; permanently "BCP 47", a two-RFC IETF subseries updated by reassigning member RFCs). A locale identifier must be a well-formed, valid BCP-47 tag: hyphen-separated subtags in canonical order (`language[-extlang][-script][-region][-variant][-extension][-privateuse]`), each registered in the live IANA Language Subtag Registry (the registry, not any RFC text, is the source of truth for which subtag values are valid). The umbrella `@standard BCP-47` tag is correct as-is.
  - **Tag formation** — `@rfc 5646` (RFC 5646, Sept 2009, "Tags for Identifying Languages"; obsoletes RFC 4646/3066/1766; current as of 2026). Governs the *structure* of a tag — how subtags compose into a canonical identifier. This is the correct and only citation needed for emitting/accepting tag shape.
  - **Tag matching/selection** — `@rfc 4647` (RFC 4647, Sept 2006, "Matching of Language Tags"; current as of 2026). Governs *resolution* — `fallbackLocale` in `config.localization`, hreflang variant selection, and the locale cascade in `locale-utils.ts` must follow RFC 4647's lookup/filtering algorithms, not naive string equality. Cite `@rfc 4647` alongside `@rfc 5646` wherever this skill does matching (it covers the behavior RFC 5646 does not).

## Common mistakes (localize-field)
- Hand-rolling a `metadata.{locale: value}` JSON map — use Payload's `localized: true`.
- A magic default locale (`?? 'en'`) — blanks route to `und`.
- Resolving locales by string equality — use RFC 4647 lookup/filtering for fallback, hreflang, and the locale cascade.
- Hardcoding a locale allow-list as if the RFC defined the values — subtag validity is anchored to the live IANA Language Subtag Registry.
