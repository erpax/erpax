---
name: address
description: Use when reasoning about address — Physical address of the item.
atomPath: address
coordinate: address · 8/crest · 31b63bb1
contentUuid: "188bdea6-4f2e-54a9-94ee-78973c4ce22f"
diamondUuid: "f41cabec-c0d4-88f6-992b-16fc1eb75de7"
uuid: "31b63bb1-0f2b-8fc0-9804-527f3505ca24"
horo: 8
bonds:
  in:
    - billing
    - country
    - delivery
    - extended
    - law
    - legal
    - locality
    - origin
    - postal
    - region
    - service
    - street
    - validation
  out:
    - billing
    - country
    - delivery
    - extended
    - law
    - legal
    - locality
    - origin
    - postal
    - region
    - service
    - street
    - validation
typography:
  partition: address
  bondDegree: 50
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-Taxonomy-2020/852"
  - "ISO-19160-4"
  - "ISO-3166-1"
  - "UPU-S42"
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - billing
    - country
    - delivery
    - extended
    - law
    - legal
    - locality
    - origin
    - postal
    - region
    - service
    - street
  matrix:
    - billing
    - country
    - delivery
    - extended
    - law
    - legal
    - locality
    - origin
    - postal
    - region
    - service
    - street
    - validation
  backlinks:
    - billing
    - country
    - delivery
    - extended
    - law
    - legal
    - locality
    - origin
    - postal
    - region
    - service
    - street
    - validation
signatures:
  computationUuid: "d44a0c73-2e6d-848d-b287-4c3c008babce"
  stages:
    - stage: path
      stageUuid: "51c72db3-5231-882c-abd3-5c06874b9a72"
    - stage: trinity
      stageUuid: "561ca3c6-7fd4-81bf-bba6-15b26ed6be24"
    - stage: boundary
      stageUuid: "29e2cea9-7f54-8e1f-a1e5-72e7842bc191"
    - stage: links
      stageUuid: "bf70b2b6-8b38-8735-8dcb-2963a21fe3a7"
    - stage: horo
      stageUuid: "da6ac662-6ce0-86ac-8b48-6f6d4da70a91"
    - stage: seal
      stageUuid: "e09076f7-9550-84be-82ce-a57275ccfae3"
    - stage: uuid
      stageUuid: "a0651188-e042-8f59-8cd2-c08125ad8867"
version: 2
---
# address

Physical address of the item.

Entangled with — [[postal]] · [[country]] · [[locality]] · [[region]] · [[billing]] · [[delivery]] · [[extended]] · [[legal]] · [[origin]] · [[service]] · [[street]]

Attested in schema.org — PostalAddress · address · addressCountry · addressLocality · addressRegion · billingAddress · deliveryAddress · extendedAddress · legalAddress · originAddress · servicePostalAddress · streetAddress

**Law — [[law]]: address is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
