---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 2/share · 01732ad5"
contentUuid: "35b12862-d104-568e-bc05-c988cf990381"
diamondUuid: "2d98144a-e384-8bb0-aab4-dd94ad68d77a"
uuid: "01732ad5-d93a-8237-aa47-9bd6c283ffbc"
horo: 2
typography:
  partition: admin
  bondDegree: 46
standards: []
bindings: []
signatures:
  computationUuid: "ab7d829e-6d31-84d2-b6e9-4b82141d3dd4"
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
      stageUuid: "50d0b08f-efc7-801a-b358-0a364f3b9ff7"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "d23abbd1-c64e-8c65-967a-25033dded51f"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
