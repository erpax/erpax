---
name: claim
description: "Use when reasoning about claim — A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text proper"
atomPath: "vocabulary/claim"
coordinate: "vocabulary/claim · 4/weave · 6b368de9"
contentUuid: "f956d47c-ce2b-5194-a5f3-d25eb7946c8f"
diamondUuid: "1bb751bb-f1eb-8121-a8c5-612c6144e927"
uuid: "6b368de9-292f-81bc-8c18-3be1519b5e9c"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 15
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "16151701-1960-8795-ab43-41ca5cedeca8"
  stages:
    - stage: path
      stageUuid: "59a6fb6b-fc59-8264-b9c8-65421b75765e"
    - stage: trinity
      stageUuid: "d1e9c45e-e2f1-891b-ade0-390526fc82e6"
    - stage: boundary
      stageUuid: "0b78ab6a-cc41-842b-9d80-cbb086076a82"
    - stage: links
      stageUuid: "57d6a004-97f0-8668-b6ea-0f74c1918021"
    - stage: horo
      stageUuid: "90caad4b-eacb-8db9-a917-ef637eac45df"
    - stage: seal
      stageUuid: "ab312b43-cfb3-8b1f-a141-2c0e61614bb8"
    - stage: uuid
      stageUuid: "86650e96-4320-8451-af5b-781004b44779"
version: 2
---
# claim

A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text property. Variations on well known claims can have their common identity indicated via sameAs links, and summarized with a name. Ideally, a Claim description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews. Beyond ClaimReview, the Claim type can be associated with related creative works - for example a ScholarlyArticle or Question might be about some Claim. At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.

Entangled with — [[review]] · [[associated]] · [[interpreter]] · reviewed · [[interpreted]]

Attested in schema.org — Claim · ClaimReview · associatedClaimReview · claimInterpreter · claimReviewed · interpretedAsClaim

**Law — [[law]]: claim is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
