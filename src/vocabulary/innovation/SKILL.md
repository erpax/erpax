---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: "vocabulary/innovation"
coordinate: "vocabulary/innovation · 1/base · 853046fe"
contentUuid: "25cfda9b-456b-5afa-a65a-0b54986f9767"
diamondUuid: "74834332-6702-8907-bcea-c0b01fe6e80f"
uuid: "853046fe-ffe6-8519-9c91-921348ffa47f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "f0477eb5-c98d-8c28-94e1-a393a8b796d6"
  stages:
    - stage: path
      stageUuid: "1f887b8b-7d0f-8f10-af27-1b4f8ad9cad1"
    - stage: trinity
      stageUuid: "dba4d8e3-e530-890d-9b86-7e3ae7d16fe6"
    - stage: boundary
      stageUuid: "0eb9161c-d402-84bd-9fec-e23dda48f91f"
    - stage: links
      stageUuid: "b295210e-68d8-837f-a90d-534ef989f31c"
    - stage: horo
      stageUuid: "f9e7a0f1-f5cb-8916-82d3-defe350113c5"
    - stage: seal
      stageUuid: "3959374e-d257-80f3-bd33-abb1eccca9ac"
    - stage: uuid
      stageUuid: "15c03aea-0eb4-8b31-bf37-b8d6213cd898"
version: 2
---
# innovation — tested ideas, not untested cleverness

**Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:

1. **Reuse** an existing organ — `DiamondModel`, `toAtomPath`, `sealSecret`/`decryptIfUuid`, `gate*` in [[confirm]]
2. **Ship tests first** — vitest proves roundtrip, fail-closed, and wrangler parse before prose
3. **Fail closed** — wrong uuid, missing binding, or drift reddens the [[seal]]

Cloudflare Workers AI is the reference: `ai-binding.test.ts` before SKILL law; `gateCloudflareAi` in confirm:uuid; `ai://` on the cloudflare path surface.

**Law — [[law]]: innovation extends proven patterns with tests — no parallel framework without a green vitest proof.**

@see [[cloudflare]] · [[cloudflare/ai]] · [[diamond]] · [[secret]] · [[confirm]]
