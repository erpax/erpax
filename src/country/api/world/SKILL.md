---
name: world
description: "Use when reasoning about world — Use for non-EU country-authority APIs — AU/BR/CA/CN/GB/HK/IN/JP/MX/NO/NZ/SG/US business registries, tax portals, e-invoicing and VAT/GST validation. The world slice of the country-authority registry."
atomPath: "country/api/world"
coordinate: "country/api/world · 5/round · 2d42fd23"
contentUuid: "23b94999-6b40-5523-ab20-31cf591c4499"
diamondUuid: "947b7767-739a-8cce-a2d6-0947a9e8a080"
uuid: "2d42fd23-6fc1-86e9-aa8e-63e28060d7cd"
horo: 5
typography:
  partition: country
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "b6fd9cb5-0de1-8ba3-b404-950458a5cfd8"
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
      stageUuid: "c8722de9-95e4-8627-bf73-c8e0e4317458"
    - stage: seal
      stageUuid: "91228c8b-5517-8013-9c94-bb3ed535003e"
    - stage: uuid
      stageUuid: "85d60bd2-2e15-8a82-8540-85f9f804be49"
version: 2
---
# country/api/world

The **world** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
