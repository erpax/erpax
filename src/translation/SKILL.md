---
name: translation
description: "Use when porting a translatable message into code — the model (type + defineTranslation) of one content-addressed, per-locale translation entry that the translations collector emits into every folder."
atomPath: translation
coordinate: translation · 2/share · d8039f29
contentUuid: "dcbf1d48-ace0-5d35-844b-0351166e9674"
diamondUuid: "a7469607-0d41-8b7b-8d0a-09b39ba420a2"
uuid: "d8039f29-4603-87d8-b683-a32c4532229f"
horo: 2
bonds:
  in:
    - catalogue
    - collapse
    - collect
    - law
    - literature
    - localize
    - merge
    - message
    - topography
    - translate
    - translations
    - translator
    - word
    - work
  out:
    - catalogue
    - collapse
    - collect
    - law
    - literature
    - localize
    - merge
    - message
    - topography
    - translate
    - translations
    - translator
    - word
    - work
typography:
  partition: translation
  bondDegree: 42
  neighbors: []
standards:
  - "BCP-47 language tags"
  - "RFC 9562 §5.8 content-uuid (the messaging-uuid)"
  - schema.org translationOfWork / workTranslation (collided to one word)
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - collapse
    - law
    - localize
    - merge
    - message
    - translations
    - word
  matrix:
    - catalogue
    - collapse
    - collect
    - law
    - literature
    - localize
    - merge
    - message
    - topography
    - translate
    - translations
    - translator
    - word
    - work
  backlinks:
    - catalogue
    - collapse
    - collect
    - law
    - literature
    - localize
    - merge
    - message
    - topography
    - translate
    - translations
    - translator
    - word
    - work
signatures:
  computationUuid: "f6fc1c70-a712-8763-bfc0-b44a414aa078"
  stages:
    - stage: path
      stageUuid: "048b3559-afd6-848d-b817-f378c3501ff4"
    - stage: trinity
      stageUuid: "0032abf0-bf01-8632-b0c1-0142571d7d86"
    - stage: boundary
      stageUuid: "dde87424-028c-89fa-ae89-491e632567d8"
    - stage: links
      stageUuid: "788ed000-f297-88b6-92cf-3d4ca5e315fa"
    - stage: horo
      stageUuid: "17ecfbf4-406f-8b32-8010-ae51df46bcf1"
    - stage: seal
      stageUuid: "3b6a20da-32fc-878c-9bc4-b2fb2f74309d"
    - stage: uuid
      stageUuid: "8f4ff452-a836-8c61-9030-28932f9917c9"
version: 2
---
# translation

The MODEL of the [[translations]] collection — strict singular-model / plural-collection.

A **translation** is one translatable message ported from a `SKILL.md` into code: "whatever the SKILL.md says, computationally ported". It is content-addressed by its **messaging-uuid** (the fold of its word-atom uuids — [[message]]) and split into its **words** (every word is an atom — [[word]]); its `values` hold the per-locale forms ([[localize]] · the supported locales), `en` the source.

Per-folder `translations.ts` files are **massless projections** — pure data, `import type` only. The gravity (the compute) lives here (`index.ts`: the `Translation` type + `defineTranslation`) and in [[translations]] (the collector). Flatten · DRY · keep the gravity ([[merge]] · [[collapse]]).

Attested in schema.org — translationOfWork · workTranslation

**Law — [[law]]: translation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard BCP-47 language tags
@standard RFC 9562 §5.8 content-uuid (the messaging-uuid)
@standard schema.org — the type vocabulary, collided to single words
