---
name: spec
description: "Use when reasoning about spec — The corpus grew two widget shapes: one taking props, one fetching its own data over REST."
atomPath: "dashboard/spec"
coordinate: "dashboard/spec · 7/descent · 93eae84e"
contentUuid: "4ed06d82-43a7-5681-83a9-4bde6a2c2aca"
diamondUuid: "de8a2211-3361-8327-a395-70ddfbfb2289"
uuid: "93eae84e-7691-8296-a769-7bf72e6746e1"
horo: 7
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
  computationUuid: "1e5c3bf9-6c63-8b7f-a887-c23e36880082"
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
      stageUuid: "06ecae4e-0a54-8284-b9bc-b37fb9070f85"
    - stage: seal
      stageUuid: "52bcf7f7-5552-8cd1-bb2c-0493c480d74d"
    - stage: uuid
      stageUuid: "e86790ed-c498-840d-bc80-5c55c70212b6"
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
