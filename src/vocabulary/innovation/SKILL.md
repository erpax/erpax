---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: "vocabulary/innovation"
coordinate: "vocabulary/innovation · 1/base · 377671ca"
contentUuid: "d60a642c-8369-5b65-9d57-f6321bd73e4d"
diamondUuid: "a43df394-864c-804e-baef-872f07c3e895"
uuid: "377671ca-c137-8b66-8d7d-72248033b4ae"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "5e167536-734b-856d-8a7e-958a2dea6591"
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
      stageUuid: "4c43944b-a6b5-8774-b55c-f208f1d9c986"
    - stage: seal
      stageUuid: "3959374e-d257-80f3-bd33-abb1eccca9ac"
    - stage: uuid
      stageUuid: "0cb889b7-0317-88a6-b76c-0561d8f04c1d"
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
