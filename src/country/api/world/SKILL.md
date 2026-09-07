---
name: world
description: "Use when reasoning about world — Use for non-EU country-authority APIs — AU/BR/CA/CN/GB/HK/IN/JP/MX/NO/NZ/SG/US business registries, tax portals, e-invoicing and VAT/GST validation. The world slice of the country-authority registry."
atomPath: "country/api/world"
coordinate: "country/api/world · 7/descent · 157aae40"
contentUuid: "fe3e9877-5ca2-5a3c-9c3a-e4921d89b7e3"
diamondUuid: "35bbea8f-af91-8bf2-8870-05c1c3fe4bf9"
uuid: "157aae40-64a4-8cad-b1a2-9954d26ad058"
horo: 7
typography:
  partition: country
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "be106173-bfff-86e6-90fa-5caa832fcdef"
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
      stageUuid: "042ce778-0f28-879d-b466-49dce20c6ceb"
    - stage: seal
      stageUuid: "91228c8b-5517-8013-9c94-bb3ed535003e"
    - stage: uuid
      stageUuid: "d3e0f4f9-c1d6-8dbe-a187-9031cf8bbd06"
version: 2
---
# country/api/world

The **world** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
