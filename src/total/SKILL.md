---
name: total
description: "Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency."
atomPath: total
coordinate: "total · 4/weave · 25119417"
contentUuid: "06b54f25-8c10-59ae-b70e-5380f1c20431"
diamondUuid: "fcfb986d-8616-85da-b0d4-6a2268f23e43"
uuid: "25119417-f28a-8d53-b530-e6dddc3de39d"
horo: 4
typography:
  partition: total
  bondDegree: 39
standards:
  - "ISO-4217`"
bindings: []
signatures:
  computationUuid: "b15c943c-b73f-878d-bf2e-f49b0c289f07"
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
      stageUuid: "8fb705f1-9696-83d7-8f5d-8ce3ee380421"
    - stage: seal
      stageUuid: "8e20ba61-e635-8474-af6f-f98d9d8d1a87"
    - stage: uuid
      stageUuid: "bbbc4fd8-7675-863e-91ee-6d93789810c0"
version: 2
---
# total

Use when summing a dimension — line total, invoice total, account total, cumulative amount. A computed or captured aggregate; often read-only (computed from detail lines or GL balance). Carries amount + currency.

Composes: [[amount]] · [[currency]] · [[field]] · [[calculate]] · [[measure]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-4217`

- ISO-4217:2015
