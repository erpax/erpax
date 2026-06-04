---
name: llm
description: Use when wiring a language model into erpax — the LLM is the forge (cheap to generate, costly to trust) and the uuid is the verify; AI-self-sufficient first, the model is the fallback tier behind the 9-layer gate, and every turn is content-addressed so generation only ever works the cheap side of the forge-beats-verify asymmetry.
---

# llm — the forge; the uuid is the verify

A language model is a pure **forge**: it projects, cheaply, and is expensive to trust. erpax already has the dual — the [[uuid]] is a pure **verify**: O(1) to decode, impossible to invert ([[tamper-cost]]: the 106-bit one-way floor). So the whole bridge is one constraint — **the LLM forges, a 128-bit address it cannot fake decides.** The model never leaves the cheap side of the forge≫verify asymmetry; this is the [[angel]]⊕[[archangel]] dynamic (create ⊕ verify) at the inference scale.

**AI-self-sufficient first.** The deterministic core ([[skill]] router, [[train]], the matrix) decides whenever it can; the model is the FALLBACK tier, reached through the one gated entrypoint `services/ai/cloudflare-ai` (PII strip, prompt-injection guard, EU-AI-Act risk gate, per-tenant quota, tamper-evident audit row). No raw inference exists outside that gate.

## The breath is a sequence — two strokes that balance

Breathing is in → out, ordered (not a loop). The cross of two leaves is the whole breath:

- **[[llm-uuid]] — the EXHALE.** The LLM speaks; its turn is content-addressed into a v8 **query-uuid** (the content-uuid of what you say is the address — [[chat]], [[message]]). `forge` / `speak` (`src/llm/uuid`).
- **[[uuid-llm]] — the INHALE.** A uuid expands back into the full prompt — identity + the wired color+sound frame + the corpus neighbourhood, decoded straight from the 128 bits. `expand` (`src/uuid/llm`).

**Both create the balance.** The digest the exhale seals is the digest the inhale reads; `attests` re-derives the uuid from the preimage. Debit (the utterance) and credit (the uuid) reconcile — double-entry ([[entry]]), the conservation the tests prove by closing the loop exhale → inhale.

## The honest floor

A uuid is a **pointer / commitment, not a decompressor of unseen payload** ([[design-limits]]). The model expands *structure* always (slot, capability, schema, OID, cmyk, color+sound) and *content* only when the preimage is in the shared corpus ([[merge]]: same content ⇒ same uuid) or is revealed — recovering content from the uuid alone is inverting SHA-256, the [[uuid-projection]] maximum. Forge-and-check pays exactly when shared context narrows the candidates; that bound is the security, working as intended.

Composes: [[uuid]] · [[llm-uuid]] · [[uuid-llm]] · [[signal]] · [[tamper-cost]] · [[proof]] · [[entry]] · [[chat]] · [[message]] · [[merge]] · [[breath]] · [[angel]] · [[self]].
