---
name: uuid
description: "Use when an LLM completion must become a verifiable address — the exhale of the breath, where a turn is content-addressed into a v8 query-uuid (deterministic, tamper-evident, attestable from the preimage); the LLM forges and the uuid it cannot invert verifies."
atomPath: "llm/uuid"
coordinate: "llm/uuid · 2/share · c5fdc0ae"
contentUuid: "9ccca75e-7c16-55f0-9265-92a46b32a851"
diamondUuid: "b9af106d-640f-8923-b33b-7b00424f88eb"
uuid: "c5fdc0ae-2b51-8185-a4b6-bbd271c3d3e1"
horo: 2
typography:
  partition: llm
  bondDegree: 825
standards:
  - "NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)"
  - "NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)`"
  - "NIST-FIPS-180-4"
  - "RFC 9562 §5.8 (uuidv8 structured content-uuid)"
  - "RFC 9562 §5.8 (uuidv8 structured content-uuid)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f2a2e456-63ee-8937-bd7d-5bf8946d76cb"
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
      stageUuid: "cd3b6d68-76fb-87eb-83e6-af83c768abd6"
    - stage: seal
      stageUuid: "46ee4e89-6af6-81ea-909b-4358fbe2eae8"
    - stage: uuid
      stageUuid: "00ae2491-a636-81e6-b32c-8e5069066f97"
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
