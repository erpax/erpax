---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: "vocabulary/price"
coordinate: "vocabulary/price · 8/crest · 85bb2cfc"
contentUuid: "3dff8824-b107-5f55-8ba9-26917cb441a2"
diamondUuid: "511dd25f-d64c-8da0-96cd-eec0b404db60"
uuid: "85bb2cfc-1450-8b3c-a2c3-c8a27d493f04"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 40
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "f668c774-7ea3-88df-a1f8-3f00a7f5a3ec"
  stages:
    - stage: path
      stageUuid: "dafaf8ed-8eda-8175-9705-b55645a91b89"
    - stage: trinity
      stageUuid: "e626fb8d-471a-8c09-b2a7-679e07289013"
    - stage: boundary
      stageUuid: "2495aede-881c-82c2-a46f-26197a45c31b"
    - stage: links
      stageUuid: "ca718b3c-14fb-8dea-908b-beb4fbe09ff0"
    - stage: horo
      stageUuid: "6d9da8df-522b-8964-a89c-1f6a0ff32597"
    - stage: seal
      stageUuid: "47930ed6-2aa9-87a6-a09c-28a0d438c6b0"
    - stage: uuid
      stageUuid: "b7023fee-bf2e-8da8-b0af-807227e28164"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · specification · [[component]] · [[type]] · [[enumeration]] · unit · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · valid · until · [[purchase]] · [[limit]] · total

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
