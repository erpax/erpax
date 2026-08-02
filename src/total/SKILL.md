---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 5/round · 0c6146bb"
contentUuid: "e8c8605a-445b-5191-a44b-d5ac51fa613f"
diamondUuid: "771f07ef-a68b-8fcb-8002-7be2b7a7362c"
uuid: "0c6146bb-073e-8920-9e5c-0c6c8d637f4a"
horo: 5
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "d79aacef-6a70-8088-a24b-29d71e195031"
  stages:
    - stage: path
      stageUuid: "d479f207-d9e1-8a56-89c1-808cfe9600c8"
    - stage: trinity
      stageUuid: "0906d82a-11a2-8a76-91bc-868846d22bfb"
    - stage: boundary
      stageUuid: "27a123d2-d145-8bcb-b1c4-e6e833b827e1"
    - stage: links
      stageUuid: "1d223002-1c91-8246-a8c4-5550d841b582"
    - stage: horo
      stageUuid: "b27d4a2d-44f9-88b4-be1f-80992614143b"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "0927b0c9-3877-8ade-9de6-b193eba0f26e"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
