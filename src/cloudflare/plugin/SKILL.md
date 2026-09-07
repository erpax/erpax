---
name: plugin
description: "Use when a plugin needs a narrowed Cloudflare access surface — the typed PluginAccess<K> face plus its helper, so a plugin receives only the bindings it declares."
atomPath: "cloudflare/plugin"
coordinate: "cloudflare/plugin · 4/weave · b445a694"
contentUuid: "2da7828d-659d-563b-adc7-62d202a15068"
diamondUuid: "6f81a833-67d3-8deb-ad56-ce7300c893a8"
uuid: "b445a694-9489-8469-8a5c-c12206be591d"
horo: 4
typography:
  partition: cloudflare
  bondDegree: 47
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "6f7c04a9-92b8-8189-9bc4-99494bdc1904"
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
      stageUuid: "f22b767a-2173-84a3-9a75-2d903d0106d5"
    - stage: seal
      stageUuid: "19e0a7d6-14e4-8a8f-9d67-1300f4aa07a8"
    - stage: uuid
      stageUuid: "bd18cbf5-f13f-86b8-abaf-cda69acf603d"
version: 2
---
# plugin

Every plugin declaring its own access surface instead of importing the full mediator. `access` is the typed `PluginAccess<K>` face — a plugin lists the bindings it needs and receives **only** those, rather than all 16 methods and every CF binding — and `helper` builds it.

Least authority is the point: a plugin that cannot reach a binding cannot misuse it.

Composes: [[cloudflare]] · [[law]].
