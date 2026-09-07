---
name: translation
description: "Use when porting a translatable message into code — the model (type + defineTranslation) of one content-addressed, per-locale translation entry that the translations collector emits into every folder."
atomPath: translation
coordinate: "translation · 5/round · 9146bfe1"
contentUuid: "b2341a4d-9fe4-55b6-a74c-7488d4746421"
diamondUuid: "2b655436-9c27-826d-9a77-feb4be59916f"
uuid: "9146bfe1-c8c1-8d55-9af3-a3301706d87a"
horo: 5
typography:
  partition: translation
  bondDegree: 54
standards:
  - "BCP-47 language tags"
  - "RFC 9562 §5.8 content-uuid (the messaging-uuid)"
  - "schema.org translationOfWork / workTranslation (collided to one word)"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "ebd2d40f-9035-899b-a8f7-e891629b86b1"
  stages:
    - stage: path
      stageUuid: "048b3559-afd6-848d-b817-f378c3501ff4"
    - stage: trinity
      stageUuid: "0032abf0-bf01-8632-b0c1-0142571d7d86"
    - stage: boundary
      stageUuid: "5ad201f7-9da5-8620-ad98-7bb5d2ca0311"
    - stage: links
      stageUuid: "788ed000-f297-88b6-92cf-3d4ca5e315fa"
    - stage: horo
      stageUuid: "31282541-dd07-8401-9145-15e12a495f33"
    - stage: seal
      stageUuid: "a31c948f-36dd-8053-a1be-56d348dbe35e"
    - stage: uuid
      stageUuid: "915348db-61ef-8bda-9b87-a4f321069f2d"
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
