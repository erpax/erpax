---
name: price
description: "Use when reasoning about price — The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard format"
atomPath: "vocabulary/price"
coordinate: "vocabulary/price · 2/share · 8332e122"
contentUuid: "466ab959-c6ce-5c61-b8da-8a42326d89f5"
diamondUuid: "42a87a21-0c1f-81b3-8c1b-9decc6efe594"
uuid: "8332e122-e4d6-8a5b-9215-1d641ee79d00"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 57
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "07bc341d-d70d-824d-9bb1-b22735d081d7"
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
      stageUuid: "a5630c19-23d2-8d37-bb3f-2432cbb35eed"
    - stage: seal
      stageUuid: "47930ed6-2aa9-87a6-a09c-28a0d438c6b0"
    - stage: uuid
      stageUuid: "4fb715cd-0076-8689-9b25-6a2a434ff4ef"
version: 2
---
# price

The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes. Usage guidelines: * Use the priceCurrency property (with standard formats: ISO 4217 currency format, e.g. "USD"; Ticker symbol for cryptocurrencies, e.g. "BTC"; well known names for Local Exchange Trading Systems (LETS) and other currency types, e.g. "Ithaca HOUR") instead of including ambiguous symbols such as '$' in the value. * Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. * Note that both RDFa and Microdata syntax allow the use of a "content=" attribute for publishing simple machine-readable values alongside more human-friendly formatting. * Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.

Entangled with — [[compound]] · [[specification]] · [[component]] · [[type]] · [[enumeration]] · [[unit]] · [[high]] · [[low]] · [[max]] · [[min]] · [[currency]] · [[range]] · [[valid]] · [[until]] · [[purchase]] · [[limit]] · [[total]]

Attested in schema.org — CompoundPriceSpecification · PriceComponentTypeEnumeration · PriceSpecification · PriceTypeEnumeration · UnitPriceSpecification · highPrice · lowPrice · maxPrice · minPrice · price · priceComponent · priceComponentType · priceCurrency · priceRange · priceSpecification · priceType · priceValidUntil · purchasePriceLimit · totalPrice

**Law — [[law]]: price is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
