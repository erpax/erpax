---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 2/share · e4aa3ae8"
contentUuid: "9650a8e6-fce4-5d70-9905-a6f2b8860c52"
diamondUuid: "9d6eec18-5d1a-896e-994d-6d4e33606d43"
uuid: "e4aa3ae8-a237-8c21-be6c-5fea85519806"
horo: 2
typography:
  partition: admin
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "a183db04-bff0-856f-8063-b5fab33af685"
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
      stageUuid: "c9f8998d-0af6-8a02-a922-eede78c40189"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "74403108-987c-8bd1-aa60-7a3b39d43a19"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
