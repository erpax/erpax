---
name: plugin
description: "Use when a plugin needs a narrowed Cloudflare access surface — the typed PluginAccess<K> face plus its helper, so a plugin receives only the bindings it declares."
atomPath: "cloudflare/plugin"
coordinate: "cloudflare/plugin · 1/base · fd137818"
contentUuid: "74147c69-b781-5edf-99c9-48e7eb7eccda"
diamondUuid: "2b0f2f1c-fd25-828a-9904-5bde70088f45"
uuid: "fd137818-1fe1-8de9-a2dd-70fc9b8018de"
horo: 1
typography:
  partition: cloudflare
  bondDegree: 43
standards:
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
bindings: []
signatures:
  computationUuid: "26b2b3a3-fb46-8efd-b7a4-702fd7ca9c42"
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
      stageUuid: "88f7f483-7ad0-8084-bd24-22d80dbe6653"
    - stage: seal
      stageUuid: "60af4bc1-f64c-8cc0-9658-217c4508e936"
    - stage: uuid
      stageUuid: "398c5deb-4cf9-8bc0-b451-79c509440307"
version: 2
---
# plugin

Every plugin declaring its own access surface instead of importing the full mediator. `access` is the typed `PluginAccess<K>` face — a plugin lists the bindings it needs and receives **only** those, rather than all 16 methods and every CF binding — and `helper` builds it.

Least authority is the point: a plugin that cannot reach a binding cannot misuse it.

Composes: [[cloudflare]] · [[law]].
