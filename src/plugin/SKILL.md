---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a diamond — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: "plugin · 2/share · 975d42b0"
contentUuid: "4f0fbacb-872a-5239-9f29-ccb52c3a5932"
diamondUuid: "8b7e944f-e1eb-8bd1-b9c4-dca91dfc2ca1"
uuid: "975d42b0-6ead-86db-b31c-c01a53bbfafa"
horo: 2
typography:
  partition: plugin
  bondDegree: 47
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - "services/WORKER_SELF_REFERENCE"
signatures:
  computationUuid: "dd03ae68-8f87-848a-8a77-98a9e9837c2f"
  stages:
    - stage: path
      stageUuid: "6759ee9d-26e8-8a92-8233-cd3bf0079ee4"
    - stage: trinity
      stageUuid: "cabba6b5-28a2-8a1a-aa8d-e731e6effc1d"
    - stage: boundary
      stageUuid: "5ad7516a-3b13-842d-955e-4dadbaed6666"
    - stage: links
      stageUuid: "0259dd05-348e-8c3a-a1c1-4dcc49974cda"
    - stage: horo
      stageUuid: "55e7a81f-c641-831c-94ba-fe97b5f69835"
    - stage: seal
      stageUuid: "43b86f87-1106-8e2a-a706-dd1cf130f989"
    - stage: uuid
      stageUuid: "ccd315f3-1ce8-8f50-bbd2-5e086012cf7d"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
