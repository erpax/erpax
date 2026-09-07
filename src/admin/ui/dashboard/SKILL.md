---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 4/weave · bc9349aa"
contentUuid: "5cbae5c7-a8aa-5444-9369-7c956463b924"
diamondUuid: "92ea11ff-c5b9-8070-a8b8-6f438d2a5286"
uuid: "bc9349aa-88bf-8248-93f2-cf527d450fa2"
horo: 4
typography:
  partition: admin
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "e382e089-c7dd-8198-96bc-880bc9fa89a5"
  stages:
    - stage: path
      stageUuid: "f0b4ad91-c7c9-8767-a86a-3ef0e9593bae"
    - stage: trinity
      stageUuid: "fe4ab6f6-a7ac-86c4-affa-ca827c6f4dc4"
    - stage: boundary
      stageUuid: "af232206-9a0b-8654-9ce3-748006c1a1ca"
    - stage: links
      stageUuid: "c3745c35-68da-84f0-af3d-f4be84cafdcc"
    - stage: horo
      stageUuid: "888c2e3c-74b5-84ac-b63e-e077a87f528b"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "66d4e87d-5cac-88a0-ba88-0835977c91e2"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
