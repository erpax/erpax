---
name: flight
description: Use when reasoning about flight — An airline flight.
atomPath: flight
coordinate: flight · 1/base · 28cd09db
contentUuid: "6517b259-676a-5a83-b0be-de875886e90e"
diamondUuid: "de7f9fe6-d907-877e-9767-67defc2d01b0"
uuid: "28cd09db-5ff2-863d-8ce1-230348edb22b"
horo: 1
bonds:
  in:
    - distance
    - duration
    - estimated
    - law
    - number
    - reservation
  out:
    - distance
    - duration
    - estimated
    - law
    - number
    - reservation
typography:
  partition: flight
  bondDegree: 22
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - distance
    - duration
    - estimated
    - law
    - number
    - reservation
  matrix:
    - distance
    - duration
    - estimated
    - law
    - number
    - reservation
  backlinks:
    - distance
    - duration
    - estimated
    - law
    - number
    - reservation
signatures:
  computationUuid: "3bb558ee-06bf-88a5-b0b9-41d4b75ae707"
  stages:
    - stage: path
      stageUuid: "2bde8b75-a45d-8322-9777-651612533686"
    - stage: trinity
      stageUuid: "94d2e8bc-e692-8055-8126-f062b348e3a6"
    - stage: boundary
      stageUuid: "ddb04cd2-6460-88b7-b6c1-78e9f2a8ce50"
    - stage: links
      stageUuid: "a06e5aea-aca6-8fad-8a36-6172c3be795a"
    - stage: horo
      stageUuid: "496c74c8-6611-85fb-bf29-211cf3c2fa87"
    - stage: seal
      stageUuid: "59fbc2ab-846d-8ec6-910d-c4be0846dfde"
    - stage: uuid
      stageUuid: "269af866-7520-8a84-b837-5734fb777a3e"
version: 2
---
# flight

An airline flight.

Entangled with — [[reservation]] · [[estimated]] · [[duration]] · [[distance]] · [[number]]

Attested in schema.org — Flight · FlightReservation · estimatedFlightDuration · flightDistance · flightNumber

**Law — [[law]]: flight is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
