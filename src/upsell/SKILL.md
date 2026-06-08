---
name: upsell
description: "Use when recommending higher-value or complementary products — opportunity detection, recommendation engine, success metrics."
atomPath: upsell
coordinate: upsell · 8/crest · c3a86886
contentUuid: "e2a08edb-7382-54d3-b477-81e3ba8964ce"
diamondUuid: "9b7e4500-b592-80fe-8c5c-29f6836291ec"
uuid: "c3a86886-b713-8874-b531-3d65a08f8c6f"
horo: 8
bonds:
  in:
    - campaign
    - customers
    - forecast
    - items
    - orders
    - segment
  out:
    - campaign
    - customers
    - forecast
    - items
    - orders
    - segment
typography:
  partition: upsell
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - campaign
    - customers
    - forecast
    - items
    - orders
    - segment
  matrix:
    - campaign
    - customers
    - forecast
    - items
    - orders
    - segment
  backlinks:
    - campaign
    - customers
    - forecast
    - items
    - orders
    - segment
signatures:
  computationUuid: "9f4de71e-1a2d-8935-80e9-8d4b8642199d"
  stages:
    - stage: path
      stageUuid: "b36d76fa-f52d-8781-b7f6-8273fe3b9521"
    - stage: trinity
      stageUuid: "095cbc95-a514-8d0d-9f8f-1a033a4fe203"
    - stage: boundary
      stageUuid: "8adacfee-fd7c-8b11-aaf7-61ee2012753c"
    - stage: links
      stageUuid: "d96ac48f-35a4-86d3-8f6a-c0a2b4769008"
    - stage: horo
      stageUuid: "17a51084-9f43-8dfb-b2af-7758625115be"
    - stage: seal
      stageUuid: "bcf09ee8-c7e5-8a29-88c8-f0696bced460"
    - stage: uuid
      stageUuid: "8df16fae-9cef-8b0e-afbf-2365976340a5"
version: 2
---
# upsell

Use when recommending higher-value or complementary products — opportunity detection, recommendation engine, success metrics.

Composes: [[Customers]] · [[Items]] · [[customers/sales/orders]] · [[segment]] · [[forecast]] · [[campaign]].

## Standards
- CRM-generic
