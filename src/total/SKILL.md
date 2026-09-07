---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 1/base · 17022e6a"
contentUuid: "6f9118c5-1eee-5889-8a83-5fbbecb7cc41"
diamondUuid: "2ed0d960-3162-83cc-84aa-67132162100a"
uuid: "17022e6a-54d9-8905-8b89-967a356d9389"
horo: 1
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "72d60f2d-f5dc-8c9d-8b35-8bd07bc1ae6d"
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
      stageUuid: "88d44a50-d2a8-8ba9-8033-406e64ea0bb8"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "cc28b394-b4c8-812b-b96b-bb17088eaa2c"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
