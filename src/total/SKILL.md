---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 2/share · 6a19a8c4"
contentUuid: "4d69a626-0865-59dd-b2c7-72329fa34740"
diamondUuid: "a4a04f63-c711-833a-af54-e886ca77b2ec"
uuid: "6a19a8c4-4544-83cb-9e61-60cd545e6425"
horo: 2
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "1b623219-cc35-81ce-924c-768dfa8808f3"
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
      stageUuid: "c0c01051-ab09-8de1-bfe8-ed0a0bcf2928"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "771ef563-c9b1-8e43-aacc-bcb63d19a13d"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
