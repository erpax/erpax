---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a diamond — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: "plugin · 4/weave · 73fe4e4d"
contentUuid: "531ee9e4-5f44-5cd4-80a5-a42fc7c1462d"
diamondUuid: "ded3ab07-9853-82bb-b343-f0fd042146f8"
uuid: "73fe4e4d-3e2c-8bc0-9158-5d3f0a568810"
horo: 4
typography:
  partition: plugin
  bondDegree: 47
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - "services/WORKER_SELF_REFERENCE"
signatures:
  computationUuid: "b6fbe240-2c55-8e99-a560-491c94b557c6"
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
      stageUuid: "bde7b9c9-60d3-8c4a-aebd-b0bcf5b85690"
    - stage: seal
      stageUuid: "43b86f87-1106-8e2a-a706-dd1cf130f989"
    - stage: uuid
      stageUuid: "fd4b6ec7-1953-8e0f-b841-ec1d7e0400ae"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
