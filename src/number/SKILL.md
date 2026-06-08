---
name: number
description: "Use when a document needs a human-readable sequential number — invoice/order/protocol numbering per scope. The NumberConcern/InvoiceNumberingConcern field + sequence hook; the number is the human handle, the content-uuid the machine identity."
atomPath: number
coordinate: number · 2/share · 20b44f82
contentUuid: "a282ed92-e8be-587e-b9a5-b42f018d45b1"
diamondUuid: "0b619f29-c930-85c2-bedb-0d2d4db8bf47"
uuid: "20b44f82-07ae-85dc-ab29-e9393c44a49a"
horo: 2
bonds:
  in:
    - accommodation
    - accounting
    - additional
    - airbags
    - available
    - axles
    - bathrooms
    - bedrooms
    - beds
    - box
    - bus
    - catalog
    - clip
    - commerce
    - confirmation
    - credits
    - doors
    - episode
    - episodes
    - fax
    - fields
    - flight
    - forward
    - full
    - gears
    - global
    - guests
    - hooks
    - id
    - identification
    - identity
    - issue
    - item
    - loan
    - location
    - measure
    - membership
    - number
    - office
    - order
    - partial
    - passenger
    - players
    - post
    - previous
    - rate
    - report
    - rooms
    - science
    - seasons
    - seat
    - serial
    - service
    - sms
    - stage
    - supto
    - tracking
    - transaction
    - units
    - utility
    - vehicle
    - volume
    - zeropoint
  out:
    - accommodation
    - accounting
    - additional
    - airbags
    - available
    - axles
    - bathrooms
    - bedrooms
    - beds
    - box
    - bus
    - catalog
    - clip
    - commerce
    - confirmation
    - credits
    - doors
    - episode
    - episodes
    - fax
    - fields
    - flight
    - forward
    - full
    - gears
    - global
    - guests
    - hooks
    - id
    - identification
    - identity
    - issue
    - item
    - loan
    - location
    - measure
    - membership
    - number
    - office
    - order
    - partial
    - passenger
    - players
    - post
    - previous
    - rate
    - report
    - rooms
    - science
    - seasons
    - seat
    - serial
    - service
    - sms
    - stage
    - supto
    - tracking
    - transaction
    - units
    - utility
    - vehicle
    - volume
    - zeropoint
typography:
  partition: number
  bondDegree: 205
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - commerce
    - fields
    - hooks
    - identity
  matrix:
    - accommodation
    - accounting
    - additional
    - airbags
    - available
    - axles
    - bathrooms
    - bedrooms
    - beds
    - box
    - bus
    - catalog
    - clip
    - commerce
    - confirmation
    - credits
    - doors
    - episode
    - episodes
    - fax
    - fields
    - flight
    - forward
    - full
    - gears
    - global
    - guests
    - hooks
    - id
    - identification
    - identity
    - issue
    - item
    - loan
    - location
    - measure
    - membership
    - number
    - office
    - order
    - partial
    - passenger
    - players
    - post
    - previous
    - rate
    - report
    - rooms
    - science
    - seasons
    - seat
    - serial
    - service
    - sms
    - stage
    - supto
    - tracking
    - transaction
    - units
    - utility
    - vehicle
    - volume
    - zeropoint
  backlinks:
    - accommodation
    - accounting
    - additional
    - airbags
    - available
    - axles
    - bathrooms
    - bedrooms
    - beds
    - box
    - bus
    - catalog
    - clip
    - commerce
    - confirmation
    - credits
    - doors
    - episode
    - episodes
    - fax
    - fields
    - flight
    - forward
    - full
    - gears
    - global
    - guests
    - hooks
    - id
    - identification
    - identity
    - issue
    - item
    - loan
    - location
    - measure
    - membership
    - number
    - office
    - order
    - partial
    - passenger
    - players
    - post
    - previous
    - rate
    - report
    - rooms
    - science
    - seasons
    - seat
    - serial
    - service
    - sms
    - stage
    - supto
    - tracking
    - transaction
    - units
    - utility
    - vehicle
    - volume
    - zeropoint
signatures:
  computationUuid: "7ccd4646-28c7-8064-acce-ddb51e26957a"
  stages:
    - stage: path
      stageUuid: "eb995746-0c96-8ee0-8110-e312ea4d22cb"
    - stage: trinity
      stageUuid: "84658df2-b43b-8b54-9bf3-9296a21ec451"
    - stage: boundary
      stageUuid: "0e1eae93-84af-8195-8760-acf90c066368"
    - stage: links
      stageUuid: "e4920aa0-e819-8223-931b-2fcdb319e234"
    - stage: horo
      stageUuid: "0649137c-a9de-830b-a3e8-6981a2edd8c2"
    - stage: seal
      stageUuid: "eb924dd5-f42f-8eda-bb10-73a93576e33c"
    - stage: uuid
      stageUuid: "c95fa142-e4f0-8213-84ba-f8c57a420299"
version: 2
---
# number — the human document handle (the uuid stays the machine identity)

`number` is the document-numbering atom (Rails `NumberConcern`/`InvoiceNumberingConcern`): a [[fields]] text field (position **1**) + a beforeChange sequence [[hooks]] (position **6**). Law: a `number` generated by a **per-scope sequence** (per seller, per buyer, per protocol/type — preserve the scope the concern declared), assigned in a beforeChange; absent → falls back to the id. The `number` is the *human* handle for a document; the content-`uuid` ([[identity]]) is the *machine* identity — never conflate them (the uuid is content-derived and federates; the number is sequential and tenant-local).

Composes: [[hooks]] (the sequence generator), [[accounting]]/[[commerce]] (invoice/order/protocol numbering), [[identity]].

## Common mistakes
- Relating documents by `number` — relate by id/uuid; `number` is for humans.
- A single global sequence where the concern scoped per seller/buyer — keep the scope.
