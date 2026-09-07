---
name: plugin
description: "Use when a plugin needs a narrowed Cloudflare access surface — the typed PluginAccess<K> face plus its helper, so a plugin receives only the bindings it declares."
atomPath: "cloudflare/plugin"
coordinate: "cloudflare/plugin · 7/descent · 14aa2b9c"
contentUuid: "30719a2d-71a9-5c39-be14-5bc8a7724ca6"
diamondUuid: "073e7b2e-6a82-8e0a-941c-4faed129daeb"
uuid: "14aa2b9c-e242-8aad-9b47-70eb0db6ea80"
horo: 7
typography:
  partition: cloudflare
  bondDegree: 47
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "700ca94a-f041-8ed3-a5c8-fe1022962214"
  stages:
    - stage: path
      stageUuid: "4e348906-8276-8c5c-bf0c-1d683508e818"
    - stage: trinity
      stageUuid: "249b9ca2-4da6-8b4e-8f66-1b3736f57b50"
    - stage: boundary
      stageUuid: "9ebae28d-5aed-86ac-862a-54d06953e112"
    - stage: links
      stageUuid: "fba0e86e-693e-8068-9835-048ef84fd2d5"
    - stage: horo
      stageUuid: "db4284c7-2bec-8852-bddb-06a6a8575aff"
    - stage: seal
      stageUuid: "19e0a7d6-14e4-8a8f-9d67-1300f4aa07a8"
    - stage: uuid
      stageUuid: "525327d2-76ec-84e5-afa8-ff643ec18c21"
version: 2
---
# plugin

Every plugin declaring its own access surface instead of importing the full mediator. `access` is the typed `PluginAccess<K>` face — a plugin lists the bindings it needs and receives **only** those, rather than all 16 methods and every CF binding — and `helper` builds it.

Least authority is the point: a plugin that cannot reach a binding cannot misuse it.

Composes: [[cloudflare]] · [[law]].
