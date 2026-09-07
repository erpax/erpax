---
name: offer
description: "Use when reasoning about offer — An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the in"
atomPath: "vocabulary/offer"
coordinate: "vocabulary/offer · 7/descent · ea7c6c73"
contentUuid: "6fdb1dc9-24f0-5ccc-9441-6bb9f7c06b6d"
diamondUuid: "6852797c-faf9-84c0-8c40-e4d949f47acc"
uuid: "ea7c6c73-4c62-87e5-ba5f-369cc96db260"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 60
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "9e0bc2c3-a511-8574-b917-dee931f59e35"
  stages:
    - stage: path
      stageUuid: "ad782c4e-ca00-85da-909b-350504b6a3f4"
    - stage: trinity
      stageUuid: "16576b79-d925-82f5-9b61-dc1a2c64305d"
    - stage: boundary
      stageUuid: "44aefb47-9355-8636-b2da-c8d483ec9936"
    - stage: links
      stageUuid: "1e1a0b3f-83e0-8aa3-91cc-2c4b0601e072"
    - stage: horo
      stageUuid: "2d5e23d8-ef41-862c-9398-ffbc69dded83"
    - stage: seal
      stageUuid: "b722e646-1077-802b-809d-99172c6a7546"
    - stage: uuid
      stageUuid: "b5631210-b8e4-81e6-a520-2c526a82d153"
version: 2
---
# offer

An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book. Note: As the businessFunction property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell. For GTIN-related fields, see Check Digit calculator and validation guide from GS1.

Entangled with — [[aggregate]] · [[catalog]] · [[lease]] · [[purchase]] · [[item]] · [[condition]] · [[shipping]] · [[details]] · [[accepted]] · [[has]] · [[participation]] · [[sponsorship]] · [[makes]] · [[count]]

Attested in schema.org — AggregateOffer · Offer · OfferCatalog · OfferForLease · OfferForPurchase · OfferItemCondition · OfferShippingDetails · acceptedOffer · hasOfferCatalog · hasParticipationOffer · hasSponsorshipOffer · makesOffer · offerCount

**Law — [[law]]: an offer carries an explicit businessFunction (sell/lease/repair/dispose); when absent it collapses to the sell identity, so an offer is never function-ambiguous.**

@standard schema.org — the type vocabulary, collided to single words
