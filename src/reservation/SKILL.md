---
name: reservation
description: "Use when reasoning about reservation — Describes a reservation for travel, dining or an event. Some reservations require tickets. Note: This type is for information about actual reservations, e.g. in confirmation emails"
atomPath: reservation
coordinate: reservation · 7/descent · 3b1ba1eb
contentUuid: "b7389345-0ce1-5872-8b07-6de8261cbdfe"
diamondUuid: "ea1ad8dc-bbc6-850d-99e1-45e902f4254c"
uuid: "3b1ba1eb-73b2-8766-81ee-2618269d5262"
horo: 7
bonds:
  in:
    - boat
    - bus
    - car
    - establishment
    - event
    - flight
    - food
    - id
    - law
    - lodging
    - package
    - rental
    - status
    - sub
    - taxi
    - train
    - type
  out:
    - boat
    - bus
    - car
    - establishment
    - event
    - flight
    - food
    - id
    - law
    - lodging
    - package
    - rental
    - status
    - sub
    - taxi
    - train
    - type
typography:
  partition: reservation
  bondDegree: 62
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - boat
    - bus
    - car
    - establishment
    - event
    - flight
    - food
    - id
    - law
    - lodging
    - package
    - rental
    - status
    - sub
    - taxi
    - train
    - type
  matrix:
    - boat
    - bus
    - car
    - establishment
    - event
    - flight
    - food
    - id
    - law
    - lodging
    - package
    - rental
    - status
    - sub
    - taxi
    - train
    - type
  backlinks:
    - boat
    - bus
    - car
    - establishment
    - event
    - flight
    - food
    - id
    - law
    - lodging
    - package
    - rental
    - status
    - sub
    - taxi
    - train
    - type
signatures:
  computationUuid: "6d697daa-9ab5-86f2-beea-0b77cb5a6d8a"
  stages:
    - stage: path
      stageUuid: "0d93d158-6663-8143-a962-a587b5bb1e62"
    - stage: trinity
      stageUuid: "68f497b0-d64f-8619-ab41-efc116d8ceff"
    - stage: boundary
      stageUuid: "6cd60933-39d8-8ec9-8c31-0869f5c94440"
    - stage: links
      stageUuid: "73176a51-4a34-835a-9458-86e6a27c3bbc"
    - stage: horo
      stageUuid: "a0303b02-da46-8c9f-b3d9-54f432b49a31"
    - stage: seal
      stageUuid: "3826dfa0-a569-8c51-be5f-d11d959b4432"
    - stage: uuid
      stageUuid: "7816cc49-ca55-8e50-b6e5-8a604c1c842e"
version: 2
---
# reservation

Describes a reservation for travel, dining or an event. Some reservations require tickets. Note: This type is for information about actual reservations, e.g. in confirmation emails or HTML pages with individual confirmations of reservations. For offers of tickets, restaurant reservations, flights, or rental cars, use Offer.

Entangled with — [[boat]] · [[bus]] · [[event]] · [[flight]] · [[food]] · [[establishment]] · [[lodging]] · [[rental]] · [[car]] · [[package]] · [[status]] · [[type]] · [[taxi]] · [[train]] · [[id]] · [[sub]]

Attested in schema.org — BoatReservation · BusReservation · EventReservation · FlightReservation · FoodEstablishmentReservation · LodgingReservation · RentalCarReservation · Reservation · ReservationPackage · ReservationStatusType · TaxiReservation · TrainReservation · reservationFor · reservationId · reservationStatus · subReservation

**Law — [[law]]: reservation is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
