---
name: gtin
description: "Use when reasoning about gtin — A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, whi"
atomPath: "vocabulary/gtin"
coordinate: "vocabulary/gtin · 8/crest · f82d7588"
contentUuid: "c104abab-796e-55d0-88a3-453b8b99886b"
diamondUuid: "253819ce-a31e-8008-aecc-afded616c8d9"
uuid: "f82d7588-da46-8369-9bdf-aac9a7f299a6"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 6
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "7fcf27c4-1674-8c2a-8aea-b205e8312bfe"
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
      stageUuid: "7e19333a-f566-8efe-a627-d036027fd976"
    - stage: seal
      stageUuid: "5274ca5e-8a17-86e8-b802-01b6193f2814"
    - stage: uuid
      stageUuid: "7e25d5b0-17ca-87d1-b03d-3fc4ad011972"
version: 2
---
# gtin

A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a valid GS1 check digit and meet the other rules for valid GTINs. See also GS1's GTIN Summary and Wikipedia for more details. Left-padding of the gtin values is not required or encouraged. The gtin property generalizes the earlier gtin8, gtin12, gtin13, and gtin14 properties. The GS1 digital link specifications expresses GTINs as URLs (URIs, IRIs, etc.). Digital Links should be populated into the hasGS1DigitalLink attribute. Note also that this is a definition for how to include GTINs in Schema.org data, and not a definition of GTINs in general - see the GS1 documentation for authoritative details.

Entangled with — [[thing]]

Attested in schema.org — gtin · gtin12 · gtin13 · gtin14 · gtin8

**Law — [[law]]: gtin is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
