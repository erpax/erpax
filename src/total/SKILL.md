---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 1/base · c0a2029a"
contentUuid: "e4deebef-55a9-5c5d-be72-35da71e1ac04"
diamondUuid: "f41fd5b5-b7c9-8192-ba7d-cd12bc2c534c"
uuid: "c0a2029a-8f71-88c2-8213-33275bcd69be"
horo: 1
typography:
  partition: total
  bondDegree: 29
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "df1b81ba-2b05-873e-8f0d-cc9523a4c560"
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
      stageUuid: "47e318d7-94ae-86d6-9eb1-c23fd7f79bcb"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "37357010-4604-86e1-861b-85f5adeca3b3"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
