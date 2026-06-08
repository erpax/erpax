---
name: movement
description: Use when modelling one movement — the singular model of the movements collection (the plural store); a recorded transfer of stock or value between locations.
atomPath: movement
coordinate: movement · 7/descent · 2084d813
contentUuid: "21b40eba-8bf1-5289-9d8b-1d64511a343e"
diamondUuid: "7c4b689d-c777-86c9-9b19-e45601f1d89f"
uuid: "2084d813-fdab-82ba-a57f-bbc852868038"
horo: 7
bonds:
  in:
    - balance
    - inventory
    - movements
  out:
    - balance
    - inventory
    - movements
typography:
  partition: movement
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - inventory
    - movements
  matrix:
    - balance
    - inventory
    - movements
  backlinks:
    - balance
    - inventory
    - movements
signatures:
  computationUuid: "b2579ec0-678b-8496-b298-ac679b52deeb"
  stages:
    - stage: path
      stageUuid: "57bfdc3e-2757-8d0a-b837-77f5a5540e5d"
    - stage: trinity
      stageUuid: "a70c1316-abf8-8926-aca4-27985b3316eb"
    - stage: boundary
      stageUuid: "6e6a73f5-6e55-8c62-bd26-f670d9b0f005"
    - stage: links
      stageUuid: "6cf4c63d-c8fc-8697-809a-840b64c254c1"
    - stage: horo
      stageUuid: "8fe20c77-6690-855d-acea-7b7203b5be50"
    - stage: seal
      stageUuid: "58c2c8ae-8889-803d-827b-1e509c0c438f"
    - stage: uuid
      stageUuid: "e6ff4a85-c76b-838e-88ec-50a85b7f3972"
version: 2
---
# movement — the model of one [[movements]] row

A recorded transfer of stock or value between locations. The singular model whose plural store is the [[movements]] collection ([[balance]]: every collection has its model).

Composes [[movements]] · [[inventory]] · [[balance]].
