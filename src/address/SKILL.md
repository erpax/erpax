---
name: address
description: Use when reasoning about address — Physical address of the item.
atomPath: address
coordinate: "address · 5/round · 69f97fc1"
contentUuid: "bc929c47-f86a-530b-8455-69ef54c7668f"
diamondUuid: "98e450ef-ccde-89aa-8373-1485e0db1497"
uuid: "69f97fc1-a8df-8ece-a70e-f81a4bc457c5"
horo: 5
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
  - schema.org
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
  computationUuid: "bb387715-23db-8baf-a84e-695bfec01cf0"
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
      stageUuid: "037dedf0-2de2-8542-996a-437cb43839f1"
    - stage: seal
      stageUuid: "405199e1-be11-8ded-b269-b7b0c784b888"
    - stage: uuid
      stageUuid: "a5054288-7603-833c-a55e-d29679ab2d0d"
version: 2
---
# address

Physical address of the item.

Entangled with — [[postal]] · [[country]] · [[locality]] · [[region]] · [[billing]] · [[delivery]] · [[extended]] · [[legal]] · [[origin]] · [[service]] · [[street]]

Attested in schema.org — PostalAddress · address · addressCountry · addressLocality · addressRegion · billingAddress · deliveryAddress · extendedAddress · legalAddress · originAddress · servicePostalAddress · streetAddress

**Law — [[law]]: address is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
