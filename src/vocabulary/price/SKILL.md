---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: "vocabulary/price"
coordinate: "vocabulary/price · 1/base · 664ee584"
contentUuid: "8355d5dc-efc0-50fa-a0fa-a0032e3bcd2b"
diamondUuid: "69e4a12b-2d6d-8992-8898-411462516838"
uuid: "664ee584-72cc-8a28-bd20-18f605a5d19d"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 57
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "ba258e7f-587a-8cdc-86a4-01eeb252daad"
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
      stageUuid: "08439cd2-a54b-835b-a7be-4a531249a86b"
    - stage: seal
      stageUuid: "47930ed6-2aa9-87a6-a09c-28a0d438c6b0"
    - stage: uuid
      stageUuid: "a2177d5e-cdcf-8b8d-8442-2f9b1a0cda55"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · [[specification]] · [[component]] · [[type]] · [[enumeration]] · [[unit]] · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · [[valid]] · [[until]] · [[purchase]] · [[limit]] · [[total]]

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
