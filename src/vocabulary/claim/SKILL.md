---
name: claim
description: "Use when reasoning about claim — A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text proper"
atomPath: "vocabulary/claim"
coordinate: "vocabulary/claim · 5/round · bafcdb8c"
contentUuid: "08a7a213-9bc1-5dfc-bf56-855fd59a34fc"
diamondUuid: "f526ae32-a17b-8949-9cf6-61e7c35c5821"
uuid: "bafcdb8c-3341-8b52-bccb-041a758a1564"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 42
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "d0c8f6d9-71b7-8cf6-b4ec-15d96d71aac7"
  stages:
    - stage: path
      stageUuid: "59a6fb6b-fc59-8264-b9c8-65421b75765e"
    - stage: trinity
      stageUuid: "d1e9c45e-e2f1-891b-ade0-390526fc82e6"
    - stage: boundary
      stageUuid: "7ae1d47e-9fb3-8257-ba3f-a260dfeea215"
    - stage: links
      stageUuid: "d9af3594-2c29-8560-8f06-b52803778ed2"
    - stage: horo
      stageUuid: "1fd4dd15-047b-80b3-ac09-46158712e4a9"
    - stage: seal
      stageUuid: "ab312b43-cfb3-8b1f-a141-2c0e61614bb8"
    - stage: uuid
      stageUuid: "912d9afd-4ff0-8dc6-bfda-fe652692df87"
version: 2
---
# claim

A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text property. Variations on well known claims can have their common identity indicated via sameAs links, and summarized with a name. Ideally, a Claim description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews. Beyond ClaimReview, the Claim type can be associated with related creative works - for example a ScholarlyArticle or Question might be about some Claim. At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.

Entangled with — [[review]] · [[associated]] · [[interpreter]] · [[reviewed]] · [[interpreted]]

Attested in schema.org — Claim · ClaimReview · associatedClaimReview · claimInterpreter · claimReviewed · interpretedAsClaim

**Law — [[law]]: claim is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
