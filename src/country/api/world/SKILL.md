---
name: world
description: "Use when reasoning about world — Use for non-EU country-authority APIs — AU/BR/CA/CN/GB/HK/IN/JP/MX/NO/NZ/SG/US business registries, tax portals, e-invoicing and VAT/GST validation. The world slice of the country-authority registry."
atomPath: "country/api/world"
coordinate: "country/api/world · 8/crest · 4235f9c9"
contentUuid: "a3c8ad07-d652-5ab3-b012-57cd760c3c55"
diamondUuid: "ece9ea99-f3dd-8641-8c04-54118014ecb0"
uuid: "4235f9c9-ee57-86cf-bf65-0d6219b90c81"
horo: 8
typography:
  partition: country
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "aa4261ad-bc70-8025-b4b0-7b126f1b1703"
  stages:
    - stage: path
      stageUuid: "a464d9d2-04aa-8e00-a3b8-62342b5f22b0"
    - stage: trinity
      stageUuid: "c696f1b9-1aaa-810d-a63d-0b3bab8917e6"
    - stage: boundary
      stageUuid: "013875b2-37d5-87db-82ab-e1f5f7a94751"
    - stage: links
      stageUuid: "0512d071-5c02-8792-815f-acfe6f904c96"
    - stage: horo
      stageUuid: "a92ad649-9625-8f98-82f7-1baaaa32edb1"
    - stage: seal
      stageUuid: "91228c8b-5517-8013-9c94-bb3ed535003e"
    - stage: uuid
      stageUuid: "2b0ee6c0-3512-858c-aa7c-79cc024ec0d2"
version: 2
---
# country/api/world

The **world** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
