---
name: plugin
description: "Use when a plugin needs a narrowed Cloudflare access surface — the typed PluginAccess<K> face plus its helper, so a plugin receives only the bindings it declares."
atomPath: "cloudflare/plugin"
coordinate: "cloudflare/plugin · 1/base · 78b24cf5"
contentUuid: "f88658aa-fce4-520c-b041-f98094aa45c1"
diamondUuid: "efe4aab1-e363-8cab-af81-cac182bdb62e"
uuid: "78b24cf5-3f28-8cb1-a04e-7468013b2b92"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 47
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "fae02677-5579-880b-bf10-b7b6e288d860"
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
      stageUuid: "1362f9b9-ea9c-88c5-a470-f6f31126d5ff"
    - stage: seal
      stageUuid: "19e0a7d6-14e4-8a8f-9d67-1300f4aa07a8"
    - stage: uuid
      stageUuid: "b9f2f7da-f14a-8a6e-b5f5-6fb693c6e221"
version: 2
---
# plugin

Every plugin declaring its own access surface instead of importing the full mediator. `access` is the typed `PluginAccess<K>` face — a plugin lists the bindings it needs and receives **only** those, rather than all 16 methods and every CF binding — and `helper` builds it.

Least authority is the point: a plugin that cannot reach a binding cannot misuse it.

Composes: [[cloudflare]] · [[law]].
