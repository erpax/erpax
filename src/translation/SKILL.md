---
name: translation
description: "Use when porting a translatable message into code — the model (type + defineTranslation) of one content-addressed, per-locale translation entry that the translations collector emits into every folder."
atomPath: translation
coordinate: "translation · 7/descent · 1d769f9e"
contentUuid: "c757cb4a-6590-551b-93c1-f86fc71154b9"
diamondUuid: "521c1703-395f-8d61-bb1a-3465b9973faa"
uuid: "1d769f9e-6ea2-8481-a237-140075757c50"
horo: 7
typography:
  partition: translation
  bondDegree: 52
standards:
  - "BCP-47 language tags"
  - "RFC 9562 §5.8 content-uuid (the messaging-uuid)"
  - "schema.org translationOfWork / workTranslation (collided to one word)"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "5ea23115-1251-89e0-b161-ab4e93e0693b"
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
      stageUuid: "ed48c3d4-bce6-8aa4-9568-c2a132a71441"
    - stage: seal
      stageUuid: "a31c948f-36dd-8053-a1be-56d348dbe35e"
    - stage: uuid
      stageUuid: "84008ede-4928-8486-9648-951452d8ab2e"
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
