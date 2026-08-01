---
name: uuid
description: "Use when an LLM completion must become a verifiable address — the exhale of the breath, where a turn is content-addressed into a v8 query-uuid (deterministic, tamper-evident, attestable from the preimage); the LLM forges and the uuid it cannot invert verifies."
atomPath: "llm/uuid"
coordinate: "llm/uuid · 5/round · fec8b21f"
contentUuid: "dd9b3096-945a-53a1-b098-75d54caf8600"
diamondUuid: "495380a2-65b2-884c-82cb-6703493aa757"
uuid: "fec8b21f-bce6-8bd9-b1c4-994eb48f9dc4"
horo: 5
typography:
  partition: llm
  bondDegree: 748
standards:
  - "NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)"
  - "NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)`"
  - "NIST-FIPS-180-4"
  - "RFC 9562 §5.8 (uuidv8 structured content-uuid)"
  - "RFC 9562 §5.8 (uuidv8 structured content-uuid)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2fd755c0-b9fe-8491-b746-4278c7c53140"
  stages:
    - stage: path
      stageUuid: "56665a2c-ec8e-88c8-bfe0-8211e4fe89c8"
    - stage: trinity
      stageUuid: "4e271909-5b9f-8233-8725-7796297ad92c"
    - stage: boundary
      stageUuid: "c4afb82a-05dc-8b0f-8218-945a35ec2210"
    - stage: links
      stageUuid: "eabcf4ae-b0cc-8dfb-bf9f-48549ec4ab98"
    - stage: horo
      stageUuid: "deff9c38-8836-8a76-8eb4-3b541eb7e2af"
    - stage: seal
      stageUuid: "46ee4e89-6af6-81ea-909b-4358fbe2eae8"
    - stage: uuid
      stageUuid: "e272b27e-c154-8ff9-8430-dec36db907c8"
version: 2
---
# llm/uuid — the EXHALE: the LLM speaks, its speech becomes its address

The out-stroke of the [[breath]]. An LLM turn — prompt or completion — is routed through the structured content-uuid and comes out as its own **query-uuid**: the content-uuid of what you say IS the address ([[chat]], [[message]], [[uuid]]). No utterance is stored loose; every turn is a verifiable claim.

- **`forge(utterance, tenantId)`** — slot = `query`, digest = SHA-256(tenant, turn). Deterministic ([[merge]]: same turn ⇒ same uuid); any edit ⇒ a different uuid (tamper-evident). Pure, no inference.
- **`speak(prompt, tenantId, complete)`** — the gated completion is **injected**, so the breath is testable without a binding; in production `complete` is the `services/ai/cloudflare-ai` 9-layer entrypoint.
- **`attests(forged, tenantId)`** — the verify side: re-derive the uuid from the preimage. Proving CONTENT needs the preimage; the uuid alone proves only structure — the honest one-way floor ([[tamper/cost]]).

**The LLM is the forge; the uuid is the verify** ([[angel]]⊕archangel). The model only generates a candidate; a 128-bit address it cannot invert decides. The dual stroke is the INHALE (`src/uuid/llm`) — and the two **balance**: the digest forged here is the digest expanded there ([[entry]], double-entry).

Matter: `src/llm/uuid/index.ts` (composes [[uuid]] encode/decode/verifyStructured — mints nothing new). Composes: [[llm]] · [[uuid]] · [[chat]] · [[message]] · [[merge]] · [[tamper/cost]] · [[entry]] · [[breath]].

**Law — [[law]]: the EXHALE of the [[breath]] — an [[llm]] turn is content-addressed into a query-[[uuid]] (the [[merge]] law: same turn ⇒ same uuid, any edit ⇒ tamper-evident); the LLM forges, the uuid it cannot invert verifies, and the digest sealed here is the digest the inhale expands ([[entry]], double-entry).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 (uuidv8 structured content-uuid)`
- `@standard NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)`
