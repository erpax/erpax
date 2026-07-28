---
name: llm
description: "Use when wiring a language model into erpax — the LLM is the forge (cheap to generate, costly to trust) and the uuid is the verify; AI-self-sufficient first, the model is the fallback tier behind the 9-layer gate, and every turn is content-addressed so generation only ever works the cheap side of the forge-beats-verify asymmetry."
atomPath: llm
coordinate: "llm · 5/round · 66678ee4"
contentUuid: "1da10905-84ea-5130-b0f4-252a58eefa93"
diamondUuid: "3a26f1dc-d134-8cd4-b63d-48ebe1330237"
uuid: "66678ee4-9d40-8215-8ba0-bc45cb8782a4"
horo: 5
bonds:
  in:
    - angel
    - breath
    - chat
    - cost
    - entry
    - law
    - limit
    - llm
    - matrix
    - merge
    - message
    - observe
    - projection
    - proof
    - self
    - signal
    - train
    - uuid
  out:
    - angel
    - breath
    - chat
    - cost
    - entry
    - law
    - limit
    - llm
    - matrix
    - merge
    - message
    - observe
    - projection
    - proof
    - self
    - signal
    - train
    - uuid
typography:
  partition: llm
  bondDegree: 68
  neighbors: []
standards:
  - "NIST-FIPS-180-4"
bindings: []
neighbors:
  wikilink:
    - angel
    - breath
    - chat
    - cost
    - entry
    - law
    - limit
    - matrix
    - merge
    - message
    - projection
    - proof
    - self
    - signal
    - train
    - uuid
  matrix:
    - angel
    - breath
    - chat
    - cost
    - entry
    - law
    - limit
    - llm
    - matrix
    - merge
    - message
    - observe
    - projection
    - proof
    - self
    - signal
    - train
    - uuid
  backlinks:
    - angel
    - breath
    - chat
    - cost
    - entry
    - law
    - limit
    - llm
    - matrix
    - merge
    - message
    - observe
    - projection
    - proof
    - self
    - signal
    - train
    - uuid
signatures:
  computationUuid: "28b5be4e-1c53-8abe-aeb2-b4670ac87915"
  stages:
    - stage: path
      stageUuid: "9631ea9e-406f-87ce-addd-b5d3841a46d7"
    - stage: trinity
      stageUuid: "ec945da3-573b-8185-a676-74aeb398e6f3"
    - stage: boundary
      stageUuid: "a44aab4f-e00d-866b-a4c1-a2216911c3e0"
    - stage: links
      stageUuid: "bef12944-cb6a-88d2-9982-8b2322c55698"
    - stage: horo
      stageUuid: "8dab7ce9-4ff7-8a3c-a96d-af86c01c06d3"
    - stage: seal
      stageUuid: "75af2fc1-2764-8bd9-9640-762078ac9881"
    - stage: uuid
      stageUuid: "7de2f731-a1a3-8a9b-a721-dd2b40869761"
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
