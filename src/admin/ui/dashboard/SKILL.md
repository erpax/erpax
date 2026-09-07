---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 8/crest · 01a4734a"
contentUuid: "a9cc3874-8745-5ad3-aa06-e8c1f2521d42"
diamondUuid: "9d962988-b379-854d-b2a8-671ca05c4271"
uuid: "01a4734a-9059-8839-a14c-6ba2a4c972c2"
horo: 8
typography:
  partition: admin
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "2ed23ce1-4b22-898f-b1f5-2fe3869f1898"
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
      stageUuid: "29407a88-50a0-8625-9df5-5bcb7a850a58"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "cf34672f-cbee-8de9-ac9f-e343674f24b5"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
