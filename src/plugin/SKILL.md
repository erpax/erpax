---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a diamond — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: "plugin · 7/descent · 070e134c"
contentUuid: "2f3abc33-b0e4-5c6d-8b1b-841a97c070af"
diamondUuid: "cfd28a31-744b-8e66-8366-77c8b3900b54"
uuid: "070e134c-9848-822c-a964-91c2f67e972d"
horo: 7
typography:
  partition: plugin
  bondDegree: 43
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - "services/WORKER_SELF_REFERENCE"
signatures:
  computationUuid: "afe4e93f-cc4b-83f3-8783-bb9f2c5fdd8f"
  stages:
    - stage: path
      stageUuid: "6759ee9d-26e8-8a92-8233-cd3bf0079ee4"
    - stage: trinity
      stageUuid: "cabba6b5-28a2-8a1a-aa8d-e731e6effc1d"
    - stage: boundary
      stageUuid: "5ad7516a-3b13-842d-955e-4dadbaed6666"
    - stage: links
      stageUuid: "62bd3028-7cdc-82cc-9544-58ccd665d514"
    - stage: horo
      stageUuid: "945a07a2-cd44-83c2-b60a-0eb9a17486eb"
    - stage: seal
      stageUuid: "43b86f87-1106-8e2a-a706-dd1cf130f989"
    - stage: uuid
      stageUuid: "ee0ced27-55ce-82d6-813f-3524543f95ed"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · worker · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
