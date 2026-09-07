---
name: spec
description: "Use when reasoning about spec — The corpus grew two widget shapes: one taking props, one fetching its own data over REST."
atomPath: "dashboard/spec"
coordinate: "dashboard/spec · 1/base · 5efd316a"
contentUuid: "d2eab7f4-17ce-5d61-9d03-02c41cbf1b58"
diamondUuid: "a7e7aa67-1954-8371-837c-960b9e064857"
uuid: "5efd316a-f616-8812-bdc8-550855397494"
horo: 1
typography:
  partition: dashboard
  bondDegree: 47
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
  computationUuid: "148ba4bc-5cdf-81e8-a10b-0824848a23d6"
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
      stageUuid: "3200618a-cb15-82a7-8876-93ce6d10993d"
    - stage: seal
      stageUuid: "52bcf7f7-5552-8cd1-bb2c-0493c480d74d"
    - stage: uuid
      stageUuid: "8b134ca5-e9f7-8ec0-936a-57efa10fc872"
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
