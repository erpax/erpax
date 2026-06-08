---
name: innovation
description: "Use when reasoning about innovation — **Innovation is driven by tested and proven ideas.** A new wire (Cloudflare AI bindings, path surfaces, seal gates) must:"
atomPath: innovation
coordinate: innovation · 8/crest · 80b3ccd2
contentUuid: "e3b672b7-725b-5920-a11b-3a2fa3c54314"
diamondUuid: "81d9a04b-6182-8727-bc54-4554a5bb98c2"
uuid: "80b3ccd2-e200-8922-8718-02bd7b477e0f"
horo: 8
bonds:
  in:
    - ai
    - cloudflare
    - confirm
    - diamond
    - law
    - seal
    - secret
  out:
    - ai
    - cloudflare
    - confirm
    - diamond
    - law
    - seal
    - secret
typography:
  partition: innovation
  bondDegree: 26
  neighbors:
    - cloudflare
    - diamond
    - secret
standards: []
bindings: []
neighbors:
  wikilink:
    - ai
    - cloudflare
    - confirm
    - diamond
    - law
    - seal
    - secret
  matrix:
    - ai
    - cloudflare
    - confirm
    - diamond
    - law
    - seal
    - secret
  backlinks:
    - ai
    - cloudflare
    - confirm
    - diamond
    - law
    - seal
    - secret
signatures:
  computationUuid: "3a07aa52-7ced-8603-8b1e-7ddaeb438507"
  stages:
    - stage: path
      stageUuid: "5e410f7f-730b-8b71-a71e-8d28ba51eeee"
    - stage: trinity
      stageUuid: "0e2ee812-eb9a-85c0-b31b-f8e6e2cc8689"
    - stage: boundary
      stageUuid: "abe48642-ad21-8f23-ad42-d203dbefe4e0"
    - stage: links
      stageUuid: "bad47e8d-2769-8cba-a875-706ec9eb6d1d"
    - stage: horo
      stageUuid: "27b79868-3841-8096-8340-bdfed451de8e"
    - stage: seal
      stageUuid: "16242053-f07c-8615-a86c-a86452328239"
    - stage: uuid
      stageUuid: "d60a9bb2-bb12-8e25-97f8-31f4448578d2"
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
