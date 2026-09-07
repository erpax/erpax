---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a diamond — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: "plugin · 8/crest · 8554db15"
contentUuid: "5ddc3b90-0f99-541a-9a08-89a635c0ba30"
diamondUuid: "d8166e7e-22f9-8f9e-a39f-e5b283332e2a"
uuid: "8554db15-29d6-8f5d-a05d-568ef8171c09"
horo: 8
typography:
  partition: plugin
  bondDegree: 47
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - "services/WORKER_SELF_REFERENCE"
signatures:
  computationUuid: "91b2ccf6-7219-8d81-af1c-40590b338de8"
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
      stageUuid: "3c5b8cee-99ab-84bf-9276-7618e56bb076"
    - stage: seal
      stageUuid: "43b86f87-1106-8e2a-a706-dd1cf130f989"
    - stage: uuid
      stageUuid: "57fae90a-74d6-835f-807f-74cb79228f2c"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
