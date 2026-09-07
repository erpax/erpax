---
name: spec
description: "Use when reasoning about spec — The corpus grew two widget shapes: one taking props, one fetching its own data over REST."
atomPath: "dashboard/spec"
coordinate: "dashboard/spec · 5/round · 7123ec93"
contentUuid: "77f4e813-fdfd-5c75-b18d-5f6792315b5a"
diamondUuid: "f60c228a-9934-8503-bdea-a3322390ee45"
uuid: "7123ec93-88ee-816b-8cf7-4b2d72a480b1"
horo: 5
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
  computationUuid: "57fa9284-533f-88f8-86bf-50c59d029f89"
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
      stageUuid: "53d97818-2128-830c-95a7-ed9737855be7"
    - stage: seal
      stageUuid: "52bcf7f7-5552-8cd1-bb2c-0493c480d74d"
    - stage: uuid
      stageUuid: "16f5bbf9-9d37-8dd7-a1be-399e818d8a86"
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
