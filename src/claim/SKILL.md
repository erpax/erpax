---
name: claim
description: "Use when reasoning about claim — A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text proper"
atomPath: claim
coordinate: claim · 5/round · 41f6bd70
contentUuid: "b8f18e83-e05b-50b2-8b31-9c838600cc69"
diamondUuid: "27a7c1d9-f667-857a-87fd-adcee5fbb1ca"
uuid: "41f6bd70-4109-8507-861d-3dfbeabecb75"
horo: 5
bonds:
  in:
    - associated
    - interpreted
    - interpreter
    - law
    - review
    - reviewed
  out:
    - associated
    - interpreted
    - interpreter
    - law
    - review
    - reviewed
typography:
  partition: claim
  bondDegree: 23
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - associated
    - interpreted
    - interpreter
    - law
    - review
    - reviewed
  matrix:
    - associated
    - interpreted
    - interpreter
    - law
    - review
    - reviewed
  backlinks:
    - associated
    - interpreted
    - interpreter
    - law
    - review
    - reviewed
signatures:
  computationUuid: "15f1a35e-4c3d-84bb-b95a-a115abc31400"
  stages:
    - stage: path
      stageUuid: "ea207ef1-05c8-82a8-9ac1-c2859691b373"
    - stage: trinity
      stageUuid: "9748039a-2b7b-858c-820e-bea089c1caa6"
    - stage: boundary
      stageUuid: "eebcf1f3-01b8-83c5-acbd-e20c7e7c5bc7"
    - stage: links
      stageUuid: "28b0a10d-cce7-897c-9e2a-8a5434ac23e3"
    - stage: horo
      stageUuid: "cac7bf79-13a8-872b-afd8-0f17c5934f45"
    - stage: seal
      stageUuid: "1f7e0de3-5b54-8c22-8afd-44b32d26dc0c"
    - stage: uuid
      stageUuid: "0740e798-8bce-8c76-996e-f4cf9db623a6"
version: 2
---
# claim

A Claim in Schema.org represents a specific, factually-oriented claim that could be the itemReviewed in a ClaimReview. The content of a claim can be summarized with the text property. Variations on well known claims can have their common identity indicated via sameAs links, and summarized with a name. Ideally, a Claim description includes enough contextual information to minimize the risk of ambiguity or inclarity. In practice, many claims are better understood in the context in which they appear or the interpretations provided by claim reviews. Beyond ClaimReview, the Claim type can be associated with related creative works - for example a ScholarlyArticle or Question might be about some Claim. At this time, Schema.org does not define any types of relationship between claims. This is a natural area for future exploration.

Entangled with — [[review]] · [[associated]] · [[interpreter]] · [[reviewed]] · [[interpreted]]

Attested in schema.org — Claim · ClaimReview · associatedClaimReview · claimInterpreter · claimReviewed · interpretedAsClaim

**Law — [[law]]: claim is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
