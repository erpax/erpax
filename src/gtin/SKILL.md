---
name: gtin
description: "Use when reasoning about gtin — A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, whi"
atomPath: gtin
coordinate: gtin · 7/descent · 40e7d876
contentUuid: "5613b565-02b5-5861-b026-722c2e13f812"
diamondUuid: "3b893b09-fac3-8336-b627-b56625415b10"
uuid: "40e7d876-78df-8b60-a7c9-dafa4648ebc2"
horo: 7
bonds:
  in:
    - law
    - thing
  out:
    - law
    - thing
typography:
  partition: gtin
  bondDegree: 6
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - law
    - thing
  matrix:
    - law
    - thing
  backlinks:
    - law
    - thing
signatures:
  computationUuid: "2a9f87bf-2cf6-8aa1-b853-2c4167733206"
  stages:
    - stage: path
      stageUuid: "8438ece9-f098-8f1b-ba9b-a448ad85454a"
    - stage: trinity
      stageUuid: "a678f062-69d8-8004-bd0e-d21dd09d4197"
    - stage: boundary
      stageUuid: "cf9f4c93-6f59-8258-9816-bb3ac520e083"
    - stage: links
      stageUuid: "c4416b32-3d80-8b76-9896-0f741bb2f33b"
    - stage: horo
      stageUuid: "7f0ff9ca-7f25-8f51-a77f-f13216021f79"
    - stage: seal
      stageUuid: "b66482c5-66db-837a-ad11-57e67b673c53"
    - stage: uuid
      stageUuid: "1bda7c5e-9719-82cc-818a-2bba0f62edfa"
version: 2
---
# gtin

A Global Trade Item Number (GTIN). GTINs identify trade items, including products and services, using numeric identification codes. A correct gtin value should be a valid GTIN, which means that it should be an all-numeric string of either 8, 12, 13 or 14 digits, or a "GS1 Digital Link" URL based on such a string. The numeric component should also have a valid GS1 check digit and meet the other rules for valid GTINs. See also GS1's GTIN Summary and Wikipedia for more details. Left-padding of the gtin values is not required or encouraged. The gtin property generalizes the earlier gtin8, gtin12, gtin13, and gtin14 properties. The GS1 digital link specifications expresses GTINs as URLs (URIs, IRIs, etc.). Digital Links should be populated into the hasGS1DigitalLink attribute. Note also that this is a definition for how to include GTINs in Schema.org data, and not a definition of GTINs in general - see the GS1 documentation for authoritative details.

Entangled with — [[thing]]

Attested in schema.org — gtin · gtin12 · gtin13 · gtin14 · gtin8

**Law — [[law]]: gtin is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
