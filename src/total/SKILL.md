---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 4/weave · 73a65d3e"
contentUuid: "7d6e130d-1856-57e7-8501-1f56db1fd4bb"
diamondUuid: "eb2b228d-4ec7-88b8-acc3-3c8a2b6bf899"
uuid: "73a65d3e-5ccc-8bf6-96a3-c16843cec585"
horo: 4
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "81f518f2-54ca-8a6b-921f-2f0363bb263c"
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
      stageUuid: "01f375c7-7086-8b9c-94d9-b71ddbdd14c8"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "ab4b7aec-ae87-8ab5-84ee-4a16e0968a64"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
