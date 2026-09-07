---
name: world
description: "Use when reasoning about world — Use for non-EU country-authority APIs — AU/BR/CA/CN/GB/HK/IN/JP/MX/NO/NZ/SG/US business registries, tax portals, e-invoicing and VAT/GST validation. The world slice of the country-authority registry."
atomPath: "country/api/world"
coordinate: "country/api/world · 5/round · 1fc285db"
contentUuid: "d7c1bc1a-67c0-5442-a81a-f4f1b498125f"
diamondUuid: "b7344693-690f-8c4e-bd95-5fab9414266a"
uuid: "1fc285db-cea8-8fc3-ad4e-3af8c12a0e46"
horo: 5
typography:
  partition: country
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "cff0e5b1-7612-8f1b-a019-f99aa4479d66"
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
      stageUuid: "9e8ce3bf-e639-88a2-b7a6-b3aa981f6c80"
    - stage: seal
      stageUuid: "91228c8b-5517-8013-9c94-bb3ed535003e"
    - stage: uuid
      stageUuid: "cc32609d-a70b-8426-8be4-a8372ed202d1"
version: 2
---
# country/api/world

The **world** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
