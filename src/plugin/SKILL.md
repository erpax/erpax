---
name: plugin
description: "Use when modelling one plugin — the singular model of the plugins collection (the plural store); a self-contained module that extends the platform. AND when naming the host-extension deployment face of a [[diamond]] — Payload plugins, Cursor hooks, VitePress plugins, MCP extensions."
atomPath: plugin
coordinate: plugin · 2/share · cd0df911
contentUuid: "99985eba-58b5-51fb-a904-2f7da982fd5c"
diamondUuid: "3bd878db-0ed2-80e9-a701-c3096e5fe428"
uuid: "cd0df911-c364-819b-9851-af856bab763b"
horo: 2
bonds:
  in:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
  out:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
typography:
  partition: plugin
  bondDegree: 38
  neighbors:
    - diamond
standards:
  - "W3C-JSON-LD-1.1"
bindings:
  - services/WORKER_SELF_REFERENCE
neighbors:
  wikilink:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
  matrix:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
  backlinks:
    - balance
    - diamond
    - hooks
    - law
    - payload
    - platform
    - plugin
    - plugins
    - pwa
    - vitepress
    - worker
signatures:
  computationUuid: "ac96cc6c-3d08-8887-b412-360ee30cfa7a"
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
      stageUuid: "593d4a10-2c2a-84d4-8d4f-f7f90f9538a0"
    - stage: seal
      stageUuid: "051b408f-be54-898a-854e-322f375707a1"
    - stage: uuid
      stageUuid: "89679a95-f6fe-8b4c-8f7d-73d629c90a8d"
version: 2
---
# plugin — the model of one [[plugins]] row

A self-contained module that extends the platform. The singular model whose plural store is the [[plugins]] collection ([[balance]]: every collection has its model).

Composes [[plugins]] · [[platform]] · [[balance]].

## Deployment face — every [[diamond]] can plug into a host
Alongside the platform row model, **plugin** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[pwa]]). The **plugin face** extends a host that already runs: [[payload]] plugin (dimensional registry, multi-tenant middleware), Cursor [[hooks]], [[vitepress]] plugin, MCP server extension. Example: the dimensional [[plugin]] registry + multi-tenant [[payload]] config. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: plugin is the singular model whose plural store is the [[plugins]] collection — every collection [[balance]]s against its one model.**

**Law — [[law]]: the plugin deployment face is the host-extension of a [[diamond]] — Payload plugin, Cursor hook, VitePress plugin, or MCP extension that plugs into a runtime already running.**
