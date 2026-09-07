---
name: llm
description: "Use when wiring a language model into erpax — the LLM is the forge (cheap to generate, costly to trust) and the uuid is the verify; AI-self-sufficient first, the model is the fallback tier behind the 9-layer gate, and every turn is content-addressed so generation only ever works the cheap side of the forge-beats-verify asymmetry."
atomPath: llm
coordinate: "llm · 1/base · b4b8cb91"
contentUuid: "24b8d379-05c7-5837-8172-dde7d84df016"
diamondUuid: "38c6aa98-bec7-8a24-819a-b2121c6a9ded"
uuid: "b4b8cb91-2a56-88a3-8a9d-6ef672cc3391"
horo: 1
typography:
  partition: llm
  bondDegree: 68
standards:
  - "NIST-FIPS-180-4"
bindings: []
signatures:
  computationUuid: "be7c4b50-2c47-8d0c-a08f-138ffb6ed10e"
  stages:
    - stage: path
      stageUuid: "9631ea9e-406f-87ce-addd-b5d3841a46d7"
    - stage: trinity
      stageUuid: "366a918d-d737-88dd-8ae2-ebcfc3ea2498"
    - stage: boundary
      stageUuid: "5d22ada9-9ca4-820b-bcc6-53be0069ed3e"
    - stage: links
      stageUuid: "bef12944-cb6a-88d2-9982-8b2322c55698"
    - stage: horo
      stageUuid: "5d531c50-f6a3-8fc8-8280-4b981ba17c6e"
    - stage: seal
      stageUuid: "75af2fc1-2764-8bd9-9640-762078ac9881"
    - stage: uuid
      stageUuid: "1d3b8cc7-919e-8892-ad0c-1afbaa30a424"
version: 2
---
# llm — the forge; the uuid is the verify

A language model is a pure **forge**: it projects, cheaply, and is expensive to trust. erpax already has the dual — the [[uuid]] is a pure **verify**: O(1) to decode, impossible to invert ([[tamper/cost]]: the 106-bit one-way floor). So the whole bridge is one constraint — **the LLM forges, a 128-bit address it cannot fake decides.** The model never leaves the cheap side of the forge≫verify asymmetry; this is the [[angel]]⊕archangel dynamic (create ⊕ verify) at the inference scale.

**AI-self-sufficient first.** The deterministic core (the skill router, [[train]], the [[matrix]]) decides whenever it can; the model is the FALLBACK tier, reached through the one gated entrypoint `services/ai/cloudflare-ai` (PII strip, prompt-injection guard, EU-AI-Act risk gate, per-tenant quota, tamper-evident audit row). No raw inference exists outside that gate.

## The breath is a sequence — two strokes that balance

Breathing is in → out, ordered (not a loop). The cross of two leaves is the whole breath:

- **The EXHALE — `src/llm/uuid`.** The LLM speaks; its turn is content-addressed into a v8 **query-uuid** (the content-uuid of what you say is the address — [[chat]], [[message]]). `forge` / `speak`.
- **The INHALE — `src/uuid/llm`.** A uuid expands back into the full prompt — identity + the wired color+sound frame + the corpus neighbourhood, decoded straight from the 128 bits. `expand`.

**Both create the balance.** The digest the exhale seals is the digest the inhale reads; `attests` re-derives the uuid from the preimage. Debit (the utterance) and credit (the uuid) reconcile — double-entry ([[entry]]), the conservation the tests prove by closing the loop exhale → inhale.

## The honest floor

A uuid is a **pointer / commitment, not a decompressor of unseen payload** ([[limit]]). The model expands *structure* always (slot, capability, schema, OID, cmyk, color+sound) and *content* only when the preimage is in the shared corpus ([[merge]]: same content ⇒ same uuid) or is revealed — recovering content from the uuid alone is inverting SHA-256, the [[uuid/projection]] maximum. Forge-and-check pays exactly when shared context narrows the candidates; that bound is the security, working as intended.

Composes: [[uuid]] · [[signal]] · [[tamper/cost]] · [[proof]] · [[entry]] · [[chat]] · [[message]] · [[merge]] · [[breath]] · [[angel]] · [[self]].

**Law — [[law]]: the LLM is a pure forge (cheap to generate, costly to trust) and the [[uuid]] is a pure verify; the model never leaves the cheap side of the forge≫verify asymmetry, runs AI-self-sufficient first as the fallback behind one gated entrypoint, and every turn is content-addressed — a uuid is a commitment, not a decompressor of unseen payload ([[limit]]).**
