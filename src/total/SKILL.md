---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 4/weave · a8d1ab81"
contentUuid: "65f48ee8-c6e6-5398-a7cc-c205a3567bf7"
diamondUuid: "2e6bdab8-9d77-868a-8e3e-c426cfaa94d2"
uuid: "a8d1ab81-f528-8626-994e-70674edca8e6"
horo: 4
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "392eb234-1055-8213-9529-1c4474bbf90e"
  stages:
    - stage: path
      stageUuid: "d479f207-d9e1-8a56-89c1-808cfe9600c8"
    - stage: trinity
      stageUuid: "0906d82a-11a2-8a76-91bc-868846d22bfb"
    - stage: boundary
      stageUuid: "f874063a-8b36-8449-a4c3-ba9ac1d98aad"
    - stage: links
      stageUuid: "8a1aca3a-2b47-858a-ab79-eefa4ccc678c"
    - stage: horo
      stageUuid: "31c651b5-0745-8c9f-8e6e-ffb02e3d9459"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "52871253-2270-844c-a4f2-c2110054f93f"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
