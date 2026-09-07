---
name: offer
description: "Use when reasoning about offer — An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the in"
atomPath: "vocabulary/offer"
coordinate: "vocabulary/offer · 4/weave · b384b1bd"
contentUuid: "2b0b9991-fe18-5dd7-b9f2-f8069ff7128a"
diamondUuid: "82d96872-4a88-8fcc-90dc-ab90c0bc37c4"
uuid: "b384b1bd-02c3-8340-a644-abfdcd255653"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 60
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "50e7bf49-b2ab-8621-9bd0-ff7986551672"
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
      stageUuid: "e5683787-03d3-8bf2-9d63-e7a1defceb13"
    - stage: seal
      stageUuid: "b722e646-1077-802b-809d-99172c6a7546"
    - stage: uuid
      stageUuid: "468ff625-fccb-8a79-b811-69f76deb4871"
version: 2
---
# offer

An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book. Note: As the businessFunction property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell. For GTIN-related fields, see Check Digit calculator and validation guide from GS1.

Entangled with — [[aggregate]] · [[catalog]] · [[lease]] · [[purchase]] · [[item]] · [[condition]] · [[shipping]] · [[details]] · [[accepted]] · [[has]] · [[participation]] · [[sponsorship]] · [[makes]] · [[count]]

Attested in schema.org — AggregateOffer · Offer · OfferCatalog · OfferForLease · OfferForPurchase · OfferItemCondition · OfferShippingDetails · acceptedOffer · hasOfferCatalog · hasParticipationOffer · hasSponsorshipOffer · makesOffer · offerCount

**Law — [[law]]: an offer carries an explicit businessFunction (sell/lease/repair/dispose); when absent it collapses to the sell identity, so an offer is never function-ambiguous.**

@standard schema.org — the type vocabulary, collided to single words
