---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: "vocabulary/price"
coordinate: "vocabulary/price · 1/base · f4e7817d"
contentUuid: "17342036-3edf-5769-8d53-4442c26d5b58"
diamondUuid: "c4de151c-ae26-877f-a3a8-180dfcc4946c"
uuid: "f4e7817d-d5f0-8797-bca3-95dd4b4f2b74"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 68
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "45e5e34d-2a98-85b7-97c8-12583b806803"
  stages:
    - stage: path
      stageUuid: "dafaf8ed-8eda-8175-9705-b55645a91b89"
    - stage: trinity
      stageUuid: "e626fb8d-471a-8c09-b2a7-679e07289013"
    - stage: boundary
      stageUuid: "12d035bc-907c-81ae-a2c4-b8b74552c83f"
    - stage: links
      stageUuid: "c6537360-c0af-8126-b0aa-c513b4b4b191"
    - stage: horo
      stageUuid: "7825c2b6-884c-834b-b01e-2676551616f8"
    - stage: seal
      stageUuid: "563f9593-f8a2-8244-8d80-a01e73ef46fa"
    - stage: uuid
      stageUuid: "7733029b-20ff-82bb-8f40-8d3417cf3fe2"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · [[specification]] · [[component]] · [[type]] · [[enumeration]] · [[unit]] · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · [[valid]] · [[until]] · [[purchase]] · [[limit]] · [[total]]

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
