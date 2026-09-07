---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 1/base · 5902a219"
contentUuid: "22218471-3b6d-533d-9574-91c29bdff668"
diamondUuid: "5becaa0a-ace6-882b-b79f-96e7db5bf230"
uuid: "5902a219-8e1a-8b8f-ac6e-e6995b8feec1"
horo: 1
typography:
  partition: total
  bondDegree: 29
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "c394f7c9-abb8-8e6c-9914-63590182897e"
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
      stageUuid: "e2d72f3e-8781-8864-ad38-827e83be3a70"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "ee6608b3-4ec9-8f20-876b-33056534f12d"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
