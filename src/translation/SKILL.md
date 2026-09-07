---
name: translation
description: "Use when porting a translatable message into code — the model (type + defineTranslation) of one content-addressed, per-locale translation entry that the translations collector emits into every folder."
atomPath: translation
coordinate: "translation · 7/descent · 62f3b718"
contentUuid: "0becc673-de92-52e7-8b59-a7656e762a48"
diamondUuid: "4a44dfeb-ff7a-8e3a-8c51-411f7c181009"
uuid: "62f3b718-eaff-853b-a89a-be46d9980c5c"
horo: 7
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
  computationUuid: "3fb0ac06-d341-809a-acb4-d506426592b3"
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
      stageUuid: "8ca115c4-bfa9-8bd7-bd0e-a1ce8af77e82"
    - stage: seal
      stageUuid: "a31c948f-36dd-8053-a1be-56d348dbe35e"
    - stage: uuid
      stageUuid: "65b79725-fc55-8f24-91e0-bd5aea0cc649"
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
