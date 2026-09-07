---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 4/weave · 231fafdf"
contentUuid: "36bc00e6-2b50-59de-9ce1-295de969f8e2"
diamondUuid: "7c9d5dec-4c43-85a9-b7b7-94ff69beafe5"
uuid: "231fafdf-08ac-8a3f-8ce3-3a66da6868c4"
horo: 4
typography:
  partition: total
  bondDegree: 29
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "b1992763-a0e1-887c-81ab-38b55e5a5f81"
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
      stageUuid: "9a0f1282-d58a-857a-b8ae-908b58ecf724"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "10a48dea-7c3d-8664-895e-559444a0f5ad"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
