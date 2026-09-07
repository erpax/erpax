---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: "vocabulary/innovation"
coordinate: "vocabulary/innovation · 1/base · f6cbd54d"
contentUuid: "b050a520-2c34-5d22-95c6-73c84dfe66ac"
diamondUuid: "8fdc72cd-5c16-8b30-8786-b2a868334eca"
uuid: "f6cbd54d-23c8-8f9e-a603-9e463cb7f584"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "6be30e4b-6468-87d1-9bcc-da24c312e3d6"
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
      stageUuid: "7dd78e79-17ab-8b42-926f-cd60c8174e65"
    - stage: seal
      stageUuid: "3959374e-d257-80f3-bd33-abb1eccca9ac"
    - stage: uuid
      stageUuid: "8425847d-35d6-8af7-a7cd-073efb1b44b0"
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
