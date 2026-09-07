---
name: claim
description: "Use when reasoning about claim — A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text proper"
atomPath: "vocabulary/claim"
coordinate: "vocabulary/claim · 4/weave · 6b226368"
contentUuid: "6279b634-2ead-5d77-a54f-ec2925667a4d"
diamondUuid: "011293d1-80f6-8268-b3f8-bd79c3a25a8d"
uuid: "6b226368-38ad-8d75-bec5-3145ab33cbd7"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 42
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "981a3a24-9d59-80d2-a5cb-c4d671fb6ac1"
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
      stageUuid: "dd4c8c63-a5e1-8355-b557-f1fe1303a62b"
    - stage: seal
      stageUuid: "ab312b43-cfb3-8b1f-a141-2c0e61614bb8"
    - stage: uuid
      stageUuid: "17f97633-1bfe-8c40-a8fb-52c34cecf213"
version: 2
---
# claim

A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text property. Variations on well known claims can have their common identity indicated via sameAs links, and summarized with a name. Ideally, a Claim description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews. Beyond ClaimReview, the Claim type can be associated with related creative works - for example a ScholarlyArticle or Question might be about some Claim. At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.

Entangled with — [[review]] · [[associated]] · [[interpreter]] · [[reviewed]] · [[interpreted]]

Attested in schema.org — Claim · ClaimReview · associatedClaimReview · claimInterpreter · claimReviewed · interpretedAsClaim

**Law — [[law]]: claim is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
