---
name: dashboard
description: "Use when reasoning about dashboard — Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored ones, so the dashboard cannot disagree with the gate — it is the same…"
atomPath: "admin/ui/dashboard"
coordinate: "admin/ui/dashboard · 1/base · 8c0b3652"
contentUuid: "5766a411-7f3a-58f6-b179-396dbd13ceb4"
diamondUuid: "7d0f1d5d-f4fc-8a15-931b-e4e814d546e1"
uuid: "8c0b3652-9cc2-8cfc-b4b6-b738f3365756"
horo: 1
typography:
  partition: admin
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "606bda43-75d2-8fe4-b0f7-18e13b58493a"
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
      stageUuid: "4e605e39-4640-8eaa-bf1c-b67ce00bbfb0"
    - stage: seal
      stageUuid: "1966c36d-bb9c-8544-9d95-bf9c8d67c12c"
    - stage: uuid
      stageUuid: "da622a0d-7984-87fc-9165-5aa09a7958a5"
version: 2
---
# admin/ui/dashboard — the corpus's own state, shown to the person administering it

Two panels: the quantum view and the entropy rollup. Both read computed figures rather than stored
ones, so the dashboard cannot disagree with the gate — it is the same measurement, rendered.

The rollup is cached with an explicit TTL, because folding the whole corpus on every render would
make the admin page the most expensive thing in the system.

Composes: [[law]].
