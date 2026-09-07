---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: "vocabulary/price"
coordinate: "vocabulary/price · 4/weave · ae2256f6"
contentUuid: "4ad77c74-39b6-5df7-9448-a543b62d987b"
diamondUuid: "d317bfd3-b5ab-819e-871b-31f0faa206e6"
uuid: "ae2256f6-cfed-86d6-b851-6e659a133b7a"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 57
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "416252b3-21b8-80df-b234-dee90e300c48"
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
      stageUuid: "f7bcfaae-7a61-8752-9d0b-6cae1ff1a693"
    - stage: seal
      stageUuid: "47930ed6-2aa9-87a6-a09c-28a0d438c6b0"
    - stage: uuid
      stageUuid: "67eddd87-0fc2-8fce-81dc-c96c52231960"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · [[specification]] · [[component]] · [[type]] · [[enumeration]] · [[unit]] · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · [[valid]] · [[until]] · [[purchase]] · [[limit]] · [[total]]

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
