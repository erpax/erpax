---
name: offer
description: "Use when reasoning about offer — An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the in"
atomPath: "vocabulary/offer"
coordinate: "vocabulary/offer · 5/round · 03941ffc"
contentUuid: "bb7f2bce-0852-594b-9f02-98fa02f522d9"
diamondUuid: "002f2348-7980-8a41-bc61-d621e7baaab0"
uuid: "03941ffc-3c87-8691-b82b-080440ee3230"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 47
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "bdad90bf-e9a0-8ec2-93ea-4436db60b4b4"
  stages:
    - stage: path
      stageUuid: "ad782c4e-ca00-85da-909b-350504b6a3f4"
    - stage: trinity
      stageUuid: "16576b79-d925-82f5-9b61-dc1a2c64305d"
    - stage: boundary
      stageUuid: "3f4ce515-5ecd-81d7-8e10-fbf2f1d30dfc"
    - stage: links
      stageUuid: "5f38814e-bc2d-83bd-a621-ec47d1327be8"
    - stage: horo
      stageUuid: "871b507b-9203-8757-b0b1-cea252f3df93"
    - stage: seal
      stageUuid: "b722e646-1077-802b-809d-99172c6a7546"
    - stage: uuid
      stageUuid: "c17927ee-2f7e-87c4-9a13-71d1294d795f"
version: 2
---
# offer

An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book. Note: As the businessFunction property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell. For GTIN-related fields, see Check Digit calculator and validation guide from GS1.

Entangled with — [[aggregate]] · [[catalog]] · lease · [[purchase]] · [[item]] · [[condition]] · shipping · [[details]] · accepted · [[has]] · [[participation]] · sponsorship · [[makes]] · [[count]]

Attested in schema.org — AggregateOffer · Offer · OfferCatalog · OfferForLease · OfferForPurchase · OfferItemCondition · OfferShippingDetails · acceptedOffer · hasOfferCatalog · hasParticipationOffer · hasSponsorshipOffer · makesOffer · offerCount

**Law — [[law]]: an offer carries an explicit businessFunction (sell/lease/repair/dispose); when absent it collapses to the sell identity, so an offer is never function-ambiguous.**

@standard schema.org — the type vocabulary, collided to single words
