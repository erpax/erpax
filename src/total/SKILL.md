---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 5/round · cbd5e866"
contentUuid: "5d968d59-6dce-5e11-a8f5-1f7803e45bdf"
diamondUuid: "bd5f8404-b97b-8fd3-bf62-9b51b0f934d3"
uuid: "cbd5e866-9684-8bd0-878b-4f57ecab45c8"
horo: 5
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "022e115e-9de4-87cf-b34a-58dac254d05c"
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
      stageUuid: "7630623c-37f0-8d4a-8d8b-06926619a253"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "df9616ba-f59c-8796-badd-7e09a4701851"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
