---
name: gtin
description: "Use when reasoning about gtin — A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, whi"
atomPath: "vocabulary/gtin"
coordinate: "vocabulary/gtin · 8/crest · 5677c954"
contentUuid: "972dcd78-3fd1-5b10-afa4-16cedb321390"
diamondUuid: "b03da690-d2a1-8b06-9677-8b1ac7bd6a82"
uuid: "5677c954-5c0f-8cb1-8aae-6d093e079606"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 6
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "89a5beee-eccd-8b36-ba57-a2d7bec916e5"
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
      stageUuid: "c2068226-1c7c-8b76-a032-c1f3149d77b2"
    - stage: seal
      stageUuid: "abf32211-4910-8bbc-a29c-0ef0c39e5c9b"
    - stage: uuid
      stageUuid: "a0400d99-fac9-8a9f-9bac-0ba5216402b3"
version: 2
---
# gtin

A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a valid GS1 check digit and meet the other rules for valid GTINs. See also GS1's GTIN Summary and Wikipedia for more details. Left-padding of the gtin values is not required or encouraged. The gtin property generalizes the earlier gtin8, gtin12, gtin13, and gtin14 properties. The GS1 digital link specifications expresses GTINs as URLs (URIs, IRIs, etc.). Digital Links should be populated into the hasGS1DigitalLink attribute. Note also that this is a definition for how to include GTINs in Schema.org data, and not a definition of GTINs in general - see the GS1 documentation for authoritative details.

Entangled with — [[thing]]

Attested in schema.org — gtin · gtin12 · gtin13 · gtin14 · gtin8

**Law — [[law]]: gtin is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
