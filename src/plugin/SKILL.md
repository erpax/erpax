---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a [[diamond]] — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: "plugin · 4/weave · 4a0f52d1"
contentUuid: "cb29c734-0430-57bf-b0b8-53c1e0455a95"
diamondUuid: "210402cc-18cb-84dc-b724-29a908525b87"
uuid: "4a0f52d1-c16c-8f3f-8c57-ceb4ca777baa"
horo: 4
typography:
  partition: plugin
  bondDegree: 43
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - "services/WORKER_SELF_REFERENCE"
signatures:
  computationUuid: "a3eb3773-169c-8368-aff7-c10a8831f505"
  stages:
    - stage: path
      stageUuid: "6759ee9d-26e8-8a92-8233-cd3bf0079ee4"
    - stage: trinity
      stageUuid: "cabba6b5-28a2-8a1a-aa8d-e731e6effc1d"
    - stage: boundary
      stageUuid: "5ad7516a-3b13-842d-955e-4dadbaed6666"
    - stage: links
      stageUuid: "b4b06795-c089-8207-bcc4-564080b9de30"
    - stage: horo
      stageUuid: "aaf97c98-f8d8-82e8-bca5-f6d25a181f2d"
    - stage: seal
      stageUuid: "43b86f87-1106-8e2a-a706-dd1cf130f989"
    - stage: uuid
      stageUuid: "2d7ce4be-37a6-84e3-a79e-a077102ea051"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
