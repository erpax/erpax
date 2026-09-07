---
name: world
description: "Use when reasoning about world — Use for non-EU country-authority APIs — AU/BR/CA/CN/GB/HK/IN/JP/MX/NO/NZ/SG/US business registries, tax portals, e-invoicing and VAT/GST validation. The world slice of the country-authority registry."
atomPath: "country/api/world"
coordinate: "country/api/world · 8/crest · 465f3729"
contentUuid: "a23619b3-fac6-5c58-89f6-80ae00f732fe"
diamondUuid: "5fef1c45-e06a-8ab5-9a0a-11f30c09953b"
uuid: "465f3729-7acd-840a-beae-eaabbcf2a29c"
horo: 8
typography:
  partition: country
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "f865133d-0e85-8b6b-a712-44fc9a6767dc"
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
      stageUuid: "2eee1d14-532b-8480-b408-5a466f8b09bf"
    - stage: seal
      stageUuid: "91228c8b-5517-8013-9c94-bb3ed535003e"
    - stage: uuid
      stageUuid: "e1bd53d9-5cb9-8031-bcf0-7785888c4fa6"
version: 2
---
# country/api/world

The **world** slice of the country-authority API registry — reference entries
(registries · e-invoicing · VAT/VIES · payroll · banking rails) split from the hub
so its index.ts stays a thin barrel ([[rules]]/concentration). Pure data; the
parent [[country]]/api owns the lookup functions.

Composes: [[country]].
