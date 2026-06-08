---
name: offer
description: "Use when reasoning about offer — An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the in"
atomPath: offer
coordinate: offer · 5/round · 0d1a7919
contentUuid: "596d0f0f-d459-5d24-ab67-a5b4bb34a020"
diamondUuid: "5f809d72-ead3-80dd-b478-ec02acbeb439"
uuid: "0d1a7919-868a-8f40-a605-ae0be9ae2412"
horo: 5
bonds:
  in:
    - accepted
    - aggregate
    - catalog
    - condition
    - count
    - details
    - has
    - item
    - law
    - lease
    - makes
    - participation
    - purchase
    - shipping
    - sponsorship
  out:
    - accepted
    - aggregate
    - catalog
    - condition
    - count
    - details
    - has
    - item
    - law
    - lease
    - makes
    - participation
    - purchase
    - shipping
    - sponsorship
typography:
  partition: offer
  bondDegree: 58
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - accepted
    - aggregate
    - catalog
    - condition
    - count
    - details
    - has
    - item
    - law
    - lease
    - makes
    - participation
    - purchase
    - shipping
    - sponsorship
  matrix:
    - accepted
    - aggregate
    - catalog
    - condition
    - count
    - details
    - has
    - item
    - law
    - lease
    - makes
    - participation
    - purchase
    - shipping
    - sponsorship
  backlinks:
    - accepted
    - aggregate
    - catalog
    - condition
    - count
    - details
    - has
    - item
    - law
    - lease
    - makes
    - participation
    - purchase
    - shipping
    - sponsorship
signatures:
  computationUuid: "e4e4e97d-ad26-836f-a079-8e46e36a97fe"
  stages:
    - stage: path
      stageUuid: "52101e79-ab2d-8fca-a0b9-b8d2420e027b"
    - stage: trinity
      stageUuid: "b5fd8d09-e37d-85f8-b2fe-de0044a2d2c4"
    - stage: boundary
      stageUuid: "17c01623-1ee6-8fb1-b9e1-cc023c2e8d67"
    - stage: links
      stageUuid: "11870827-a811-8108-a9bb-9481954eb492"
    - stage: horo
      stageUuid: "349088a5-814c-807f-8045-227a5fb7359c"
    - stage: seal
      stageUuid: "b9e8e571-eecd-8555-81b2-5b3617746c73"
    - stage: uuid
      stageUuid: "41250fd3-5db0-89d6-bb39-9524e325491f"
version: 2
---
# offer

An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book. Note: As the businessFunction property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell. For GTIN-related fields, see Check Digit calculator and validation guide from GS1.

Entangled with — [[aggregate]] · [[catalog]] · [[lease]] · [[purchase]] · [[item]] · [[condition]] · [[shipping]] · [[details]] · [[accepted]] · [[has]] · [[participation]] · [[sponsorship]] · [[makes]] · [[count]]

Attested in schema.org — AggregateOffer · Offer · OfferCatalog · OfferForLease · OfferForPurchase · OfferItemCondition · OfferShippingDetails · acceptedOffer · hasOfferCatalog · hasParticipationOffer · hasSponsorshipOffer · makesOffer · offerCount

**Law — [[law]]: an offer carries an explicit businessFunction (sell/lease/repair/dispose); when absent it collapses to the sell identity, so an offer is never function-ambiguous.**

@standard schema.org — the type vocabulary, collided to single words
