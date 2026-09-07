---
name: gtin
description: "Use when reasoning about gtin — A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, whi"
atomPath: "vocabulary/gtin"
coordinate: "vocabulary/gtin · 5/round · ef65e115"
contentUuid: "902ab7cb-dd56-5844-be4e-09029324ce71"
diamondUuid: "98517242-9f95-8c8c-a40a-69e695198994"
uuid: "ef65e115-2a34-8dd8-8924-2af1c7ce6552"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 6
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "c29550a0-fc81-8fd7-97c1-ca004d1557ce"
  stages:
    - stage: path
      stageUuid: "a7908915-0ff1-88e6-8a21-f02f42e9e25f"
    - stage: trinity
      stageUuid: "a7d1b5d5-bc5e-851f-acdb-62414df98e26"
    - stage: boundary
      stageUuid: "e5efccc1-7de4-8f97-b974-2ce5b9340767"
    - stage: links
      stageUuid: "118b17c2-0efa-8ff8-a291-77c675414c96"
    - stage: horo
      stageUuid: "e53f52f8-41db-80be-91eb-0c78d55a18a2"
    - stage: seal
      stageUuid: "abf32211-4910-8bbc-a29c-0ef0c39e5c9b"
    - stage: uuid
      stageUuid: "7ec5386f-3961-819e-b777-61849771f46e"
version: 2
---
# gtin

A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a valid GS1 check digit and meet the other rules for valid GTINs. See also GS1's GTIN Summary and Wikipedia for more details. Left-padding of the gtin values is not required or encouraged. The gtin property generalizes the earlier gtin8, gtin12, gtin13, and gtin14 properties. The GS1 digital link specifications expresses GTINs as URLs (URIs, IRIs, etc.). Digital Links should be populated into the hasGS1DigitalLink attribute. Note also that this is a definition for how to include GTINs in Schema.org data, and not a definition of GTINs in general - see the GS1 documentation for authoritative details.

Entangled with — [[thing]]

Attested in schema.org — gtin · gtin12 · gtin13 · gtin14 · gtin8

**Law — [[law]]: gtin is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
