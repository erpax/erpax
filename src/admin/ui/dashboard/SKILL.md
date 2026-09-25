---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 1/base · 8c0b3652"
contentUuid: "484fa572-9bb9-5652-a834-91f91e988a64"
diamondUuid: "35fa6c11-827b-89c2-ba98-fc49e8c93b21"
uuid: "8c0b3652-9cc2-8cfc-b4b6-b738f3365756"
horo: 1
typography:
  partition: admin
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "863e7837-ed22-85c9-b455-7ff0d6c3b532"
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
      stageUuid: "1ef5de11-bb98-8cd8-bded-e3477b1819f0"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "781d215c-5a4c-86e8-b9b3-409302a77442"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
