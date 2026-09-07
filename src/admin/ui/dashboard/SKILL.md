---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 4/weave · 141af225"
contentUuid: "00e87c3c-6c80-536d-9dac-1a4b0f495911"
diamondUuid: "3c14c2ca-b5f1-8a69-8740-3aaa49e732bc"
uuid: "141af225-c9b5-840e-9062-faed726a39d5"
horo: 4
typography:
  partition: admin
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "1cb0cd03-2943-8ca4-a7e9-3e93b7f974a6"
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
      stageUuid: "3a6e6078-5d4a-80d8-9a5e-971b0a02a6cb"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "2be22e06-fa3b-8667-96b9-91c5d3343711"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
