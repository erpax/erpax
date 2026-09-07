---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: "vocabulary/innovation"
coordinate: "vocabulary/innovation · 1/base · 2b4ec92e"
contentUuid: "e7ef822e-7125-5a1d-bba2-70d0e4b3cd65"
diamondUuid: "5b41fc89-cb73-89aa-9e91-94ad7a57c27d"
uuid: "2b4ec92e-8969-8703-8107-e4baaf10b0ff"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "4877d288-e5d2-8f3b-a3c4-9f6b9eddfe62"
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
      stageUuid: "de86f5d7-160b-8254-a0c1-cb696aa9bfb8"
    - stage: seal
      stageUuid: "3959374e-d257-80f3-bd33-abb1eccca9ac"
    - stage: uuid
      stageUuid: "a125c3e8-a5cd-831c-a81a-f11439f7ebe2"
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
