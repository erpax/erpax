---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 5/round · 86e5aef5"
contentUuid: "f2233f0e-111f-5d25-885f-d0783487c665"
diamondUuid: "90096192-0ef0-8948-ba6e-d08a17fd5d4c"
uuid: "86e5aef5-ca98-84d1-b021-14d0705efc99"
horo: 5
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "c0850414-6490-86f4-8118-e13d5703bd7f"
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
      stageUuid: "cdd02b77-17ec-8e94-a72d-f30171150b1c"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "feea689d-d2b8-8032-a006-e00891f082a2"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
