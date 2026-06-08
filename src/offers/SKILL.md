---
name: offers
description: "Use when reasoning about offers — An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use businessFunction to"
atomPath: offers
coordinate: offers · 5/round · 009dd2b1
contentUuid: "329febb8-714d-5fa1-a0cc-5e8bb71e737e"
diamondUuid: "e551715e-3ed5-88b4-a060-d7f4cafbfa5d"
uuid: "009dd2b1-077e-8a46-b0dc-cc3c477fe4f8"
horo: 5
bonds:
  in:
    - law
    - mail
    - prescription
  out:
    - law
    - mail
    - prescription
typography:
  partition: offers
  bondDegree: 11
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - law
    - mail
    - prescription
  matrix:
    - law
    - mail
    - prescription
  backlinks:
    - law
    - mail
    - prescription
signatures:
  computationUuid: "5c1cca2f-a3ab-81dd-8197-e04c0af718bd"
  stages:
    - stage: path
      stageUuid: "f1e0d763-88d0-8ec2-abe3-fa36c61e3607"
    - stage: trinity
      stageUuid: "dfbec193-4dbf-89c4-9dbd-a34784be12b3"
    - stage: boundary
      stageUuid: "6ef24e15-e154-8fcf-a3b1-9e6309c13435"
    - stage: links
      stageUuid: "73e5573b-45c2-816c-9729-02a8752b153a"
    - stage: horo
      stageUuid: "8f15c012-6c36-862f-af2a-7329ff6be420"
    - stage: seal
      stageUuid: "9f927117-ee12-8fa9-9b17-c769232e65e0"
    - stage: uuid
      stageUuid: "fc2d5ea1-24d1-8326-9355-83cdcc7e0dce"
version: 2
---
# offers

An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event. Use businessFunction to indicate the kind of transaction offered, i.e. sell, lease, etc. This property can also be used to describe a Demand. While this property is listed as expected on a number of common types, it can be used in others. In that case, using a second type, such as Product or a subtype of Product, can clarify the nature of the offer.

Entangled with — [[prescription]] · [[mail]]

Attested in schema.org — offers · offersPrescriptionByMail

**Law — [[law]]: offers is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
