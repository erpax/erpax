---
name: plugin
description: "Use when a plugin needs a narrowed Cloudflare access surface — the typed PluginAccess<K> face plus its helper, so a plugin receives only the bindings it declares."
atomPath: "cloudflare/plugin"
coordinate: "cloudflare/plugin · 8/crest · 409da21e"
contentUuid: "b9e390d9-b8e0-5f0c-9f9f-91de26695db0"
diamondUuid: "914046fa-0d28-8809-a1c1-9534a51b208c"
uuid: "409da21e-04f5-8892-842f-22eb9cae5f4c"
horo: 8
typography:
  partition: cloudflare
  bondDegree: 47
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "9bb069fc-93ea-8e28-8fa6-da5549a0d51d"
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
      stageUuid: "0d3197b9-236d-8f68-92d6-be978c825c38"
    - stage: seal
      stageUuid: "19e0a7d6-14e4-8a8f-9d67-1300f4aa07a8"
    - stage: uuid
      stageUuid: "49eb16fe-0148-89da-893a-dd68f76eaa1d"
version: 2
---
# plugin

Every plugin declaring its own access surface instead of importing the full mediator. `access` is the typed `PluginAccess<K>` face — a plugin lists the bindings it needs and receives **only** those, rather than all 16 methods and every CF binding — and `helper` builds it.

Least authority is the point: a plugin that cannot reach a binding cannot misuse it.

Composes: [[cloudflare]] · [[law]].
