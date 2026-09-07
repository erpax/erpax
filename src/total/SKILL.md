---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 8/crest · d6ecf3a7"
contentUuid: "029adf83-1121-581d-8059-2b36efb27c55"
diamondUuid: "c7136131-15c6-862f-8104-ad2d95b379c4"
uuid: "d6ecf3a7-c3b9-8a96-a0be-cfcec85c312f"
horo: 8
typography:
  partition: total
  bondDegree: 29
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "c7a332f3-8cc9-890a-8346-993487b72553"
  stages:
    - stage: path
      stageUuid: "d479f207-d9e1-8a56-89c1-808cfe9600c8"
    - stage: trinity
      stageUuid: "0906d82a-11a2-8a76-91bc-868846d22bfb"
    - stage: boundary
      stageUuid: "e3102cdf-d185-887c-860d-4f96a74f29d8"
    - stage: links
      stageUuid: "52f3334f-fd27-8888-97e8-c5f19c33fc03"
    - stage: horo
      stageUuid: "60110e02-42ee-8400-8acc-025434a0e2f3"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "560757df-0830-8a81-a045-38bc982ea0e6"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
