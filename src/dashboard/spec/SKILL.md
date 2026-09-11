---
name: spec
description: "Use when reasoning about spec — The corpus grew two widget shapes: one taking props, one fetching its own data over REST."
atomPath: "dashboard/spec"
coordinate: "dashboard/spec · 8/crest · 63b2f9ec"
contentUuid: "aff482dc-4b89-5f1b-aec2-c4dbe5f62af5"
diamondUuid: "2f0732df-14d9-83d9-9f83-26e5c11401e8"
uuid: "63b2f9ec-188a-83ac-9130-895be82a6f22"
horo: 8
typography:
  partition: dashboard
  bondDegree: 49
standards:
  - "ISO-27002"
  - "ISO-27002 §5.15 access-control + §5.3 segregation-of-duties"
  - "ISO/IEC-27002:2022"
  - MCP
  - "MCP 0.6 tools/list + tools/call (the mcp DataSource)"
  - "NIST INCITS-359 role-based-access-control"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "25c8752a-ebc5-8bbe-9d7f-d4833c0873c3"
  stages:
    - stage: path
      stageUuid: "f7bce593-f824-8b0f-bafc-52a67ea70dfe"
    - stage: trinity
      stageUuid: "0cd3d075-25bb-8729-afe3-703273a46b9a"
    - stage: boundary
      stageUuid: "cb91eec5-b253-8de0-9cda-6d000880cf85"
    - stage: links
      stageUuid: "b976ac0b-2698-80f5-9d7f-d9e64f288d3a"
    - stage: horo
      stageUuid: "89b746c6-221a-83db-a023-b64f6386ef5a"
    - stage: seal
      stageUuid: "52bcf7f7-5552-8cd1-bb2c-0493c480d74d"
    - stage: uuid
      stageUuid: "5a884a2c-a6f5-8df7-b0f1-10f271c62665"
version: 2
---
# dashboard/spec — a widget is pure, so the page decides what it costs to render

The corpus grew two widget shapes: one taking props, one fetching its own data over REST. The
second makes a dashboard's cost invisible — every widget opens its own request, and nothing
can see the total.

One rule collapses them: **widgets are pure**. A `WidgetSpec` declares its `DataSource`
(`LocalApiSource`, `ServiceSource`, `McpSource`) and receives already-resolved data. The
`DashboardSpec` composes them, `widgetVisible` decides what this `DashboardContext` may see,
and the fetching happens once, where it can be counted.

Composes: [[law]].
