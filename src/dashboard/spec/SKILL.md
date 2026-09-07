---
name: spec
description: "Use when reasoning about spec — The corpus grew two widget shapes: one taking props, one fetching its own data over REST."
atomPath: "dashboard/spec"
coordinate: "dashboard/spec · 2/share · fa347ef1"
contentUuid: "3725d9b8-167d-5245-a054-8fe2c1f79cd3"
diamondUuid: "1769bac6-852d-8df1-ad86-9a1525ad010d"
uuid: "fa347ef1-db3e-84d5-879b-f07197e1fe7f"
horo: 2
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
  computationUuid: "6b482129-b4a1-84da-8faf-0f8c3c45304a"
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
      stageUuid: "814f870e-65b7-8282-8ce1-e4350b428611"
    - stage: seal
      stageUuid: "52bcf7f7-5552-8cd1-bb2c-0493c480d74d"
    - stage: uuid
      stageUuid: "5343e32c-939e-840b-8b52-778373ea6e54"
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
