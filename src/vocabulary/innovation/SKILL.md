---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: "vocabulary/innovation"
coordinate: "vocabulary/innovation · 4/weave · 008bc00a"
contentUuid: "4d963455-3a5b-5378-9eb7-7ca64d086ef6"
diamondUuid: "dc45e17e-6288-8994-bc8e-f298e3a13fdc"
uuid: "008bc00a-6e84-8928-b64b-31b0633af7ae"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "561eb98a-9c8b-8b54-8bab-f2a244e21e93"
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
      stageUuid: "f4a95d6e-01f9-8ede-a4a9-a5d420cc636a"
    - stage: seal
      stageUuid: "b9e4b6ce-c52f-843a-9fe0-0219096f0d1d"
    - stage: uuid
      stageUuid: "505997d2-14b5-8e2e-8cdc-615ff45f9961"
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
