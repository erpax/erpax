---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: price
coordinate: price · 5/round · 4c3d30a5
contentUuid: "3b13d03e-3f83-5f5d-86c9-7c8b53b6022d"
diamondUuid: "25cf2723-e41a-8683-8d5a-f37a5b3f8d6e"
uuid: "4c3d30a5-51ee-85ee-94cf-89a2a22aaf56"
horo: 5
bonds:
  in:
    - component
    - compound
    - currency
    - enumeration
    - high
    - law
    - limit
    - low
    - max
    - min
    - purchase
    - range
    - specification
    - total
    - type
    - unit
    - until
    - valid
  out:
    - component
    - compound
    - currency
    - enumeration
    - high
    - law
    - limit
    - low
    - max
    - min
    - purchase
    - range
    - specification
    - total
    - type
    - unit
    - until
    - valid
typography:
  partition: price
  bondDegree: 66
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - component
    - compound
    - currency
    - enumeration
    - high
    - law
    - limit
    - low
    - max
    - min
    - purchase
    - range
    - specification
    - total
    - type
    - unit
    - until
    - valid
  matrix:
    - component
    - compound
    - currency
    - enumeration
    - high
    - law
    - limit
    - low
    - max
    - min
    - purchase
    - range
    - specification
    - total
    - type
    - unit
    - until
    - valid
  backlinks:
    - component
    - compound
    - currency
    - enumeration
    - high
    - law
    - limit
    - low
    - max
    - min
    - purchase
    - range
    - specification
    - total
    - type
    - unit
    - until
    - valid
signatures:
  computationUuid: "06f82430-e0b5-89ad-907d-40fff8d225cd"
  stages:
    - stage: path
      stageUuid: "bbc26f59-f50f-899d-975c-53442e7b7e95"
    - stage: trinity
      stageUuid: "89655916-1da5-80df-9290-7180e9f9218b"
    - stage: boundary
      stageUuid: "bb7f06b9-1df0-8346-ac13-607a54a2f531"
    - stage: links
      stageUuid: "131fccd8-e74c-811b-84cd-4bdac8f24d88"
    - stage: horo
      stageUuid: "93ab2fe2-3ff3-83ae-b343-c197f85239d1"
    - stage: seal
      stageUuid: "b15b1c08-56dd-858a-88e0-40a187bb7c8c"
    - stage: uuid
      stageUuid: "c646fad9-0df9-8c7f-872d-667d47f1a34c"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · [[specification]] · [[component]] · [[type]] · [[enumeration]] · [[unit]] · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · [[valid]] · [[until]] · [[purchase]] · [[limit]] · [[total]]

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
