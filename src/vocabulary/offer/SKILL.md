---
name: offer
description: "Use when reasoning about offer — An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the in"
atomPath: "vocabulary/offer"
coordinate: "vocabulary/offer · 8/crest · 9c9511a0"
contentUuid: "5f699a47-c9b4-552a-b060-b634ff90307b"
diamondUuid: "9fa3ff93-bbff-8c39-86a9-f9d9ab0e9172"
uuid: "9c9511a0-3f24-8c40-8c87-6277c0e28d15"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 60
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "af842766-1c22-8889-be28-2bfa28542e54"
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
      stageUuid: "d579dbce-b328-8cad-9162-844faedbf269"
    - stage: seal
      stageUuid: "b722e646-1077-802b-809d-99172c6a7546"
    - stage: uuid
      stageUuid: "5b13564d-da50-839b-badc-21ae7762816b"
version: 2
---
# offer

An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book. Note: As the businessFunction property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell. For GTIN-related fields, see Check Digit calculator and validation guide from GS1.

Entangled with — [[aggregate]] · [[catalog]] · [[lease]] · [[purchase]] · [[item]] · [[condition]] · [[shipping]] · [[details]] · [[accepted]] · [[has]] · [[participation]] · [[sponsorship]] · [[makes]] · [[count]]

Attested in schema.org — AggregateOffer · Offer · OfferCatalog · OfferForLease · OfferForPurchase · OfferItemCondition · OfferShippingDetails · acceptedOffer · hasOfferCatalog · hasParticipationOffer · hasSponsorshipOffer · makesOffer · offerCount

**Law — [[law]]: an offer carries an explicit businessFunction (sell/lease/repair/dispose); when absent it collapses to the sell identity, so an offer is never function-ambiguous.**

@standard schema.org — the type vocabulary, collided to single words
