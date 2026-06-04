/**
 * llm/uuid — the EXHALE: an LLM turn content-addressed into a uuid.
 *
 * The breath is a sequence (in → out), not a loop. This is the out-stroke: the
 * LLM speaks, and its speech becomes its own address — a v8 content-uuid (slot =
 * query: "the content-uuid of what you say is the address", see `src/uuid` and
 * `src/chat`). No utterance is stored loose; every turn is a verifiable claim.
 * The dual stroke is `src/uuid/llm` (the INHALE — a uuid expanded back into LLM
 * context). The two reconcile (double-entry): the digest the exhale seals is the
 * digest the inhale reads, and `attests` re-derives the uuid from the preimage.
 * That reconciliation IS the balance.
 *
 * The LLM is the FORGE; the uuid is the VERIFY. The model only ever works the
 * cheap side of the forge≫verify asymmetry — it generates a candidate, and a
 * 128-bit address it cannot invert decides (the 106-bit one-way floor, see
 * tamper-cost). `speak` takes the gated completion as an argument so the breath
 * is testable without a live binding; in production that argument is the 9-layer
 * `services/ai/cloudflare-ai` entrypoint (PII strip, injection guard, EU-AI-Act
 * risk gate, quota, tamper-evident audit row).
 *
 * DRY: composes `uuid-format` (encode/decode/verifyStructured) — it mints
 * nothing new, it only routes an utterance through the structured content-uuid.
 *
 * @standard RFC 9562 §5.8 (uuidv8 structured content-uuid)
 * @standard NIST FIPS 180-4 (SHA-256 — the digest binding the utterance)
 * @audit Conservation Law 8 (content-uuid) · 61 (uuid carries its own features)
 * @see ../../uuid/llm (the INHALE — the dual stroke that expands the uuid)
 * @see ../../services/ai/cloudflare-ai (the gated forge `speak` composes in prod)
 */

import {
  encodeStructured,
  decodeStructured,
  verifyStructured,
  SLOT_TAGS,
  type StructuredUuidParts,
} from '@/uuid/format'

/** A role on an LLM turn (OpenAI/Anthropic message convention). */
export type LlmRole = 'system' | 'user' | 'assistant' | 'tool'

/** One LLM turn — prompt or completion. Its content IS addressed, not stored. */
export interface Utterance {
  readonly role: LlmRole
  readonly content: string
  /** the AiModels entry that produced an assistant turn (omitted for prompts). */
  readonly model?: string
}

/** Schema version stamped into utterance uuids (bump on shape change). */
export const UTTERANCE_SCHEMA_VERSION = 1

/** A forged turn — the utterance and the uuid that is its address. */
export interface Forged {
  readonly uuid: string
  readonly utterance: Utterance
  /** the structure decoded straight back out of the minted uuid. */
  readonly parts: StructuredUuidParts
}

/**
 * Content-address an LLM turn: slot = query, digest = SHA-256(tenant, turn).
 * Deterministic — the same utterance under the same tenant ⇒ the same uuid
 * ([[merge]]); any edit ⇒ a different uuid (tamper-evident). Pure, no inference.
 */
export function forge(
  utterance: Utterance,
  tenantId: string,
  opts: { capabilities?: number; schemaVersion?: number } = {},
): Forged {
  const capabilities = opts.capabilities ?? 0
  const schemaVersion = opts.schemaVersion ?? UTTERANCE_SCHEMA_VERSION
  const uuid = encodeStructured({
    slotTag: SLOT_TAGS.query,
    capabilities,
    schemaVersion,
    content: utterance,
    tenantId,
  })
  return { uuid, utterance, parts: decodeStructured(uuid) }
}

/**
 * The verify side of the balance: re-derive the uuid from the preimage and
 * confirm it equals the forged address. True iff the utterance + tenant are
 * exactly what the uuid commits to — proving CONTENT needs the preimage (the
 * uuid alone proves only structure: the honest one-way floor).
 */
export function attests(forged: Forged, tenantId: string): boolean {
  return verifyStructured({
    uuid: forged.uuid,
    slotTag: SLOT_TAGS.query,
    capabilities: forged.parts.capabilities,
    schemaVersion: forged.parts.schemaVersion,
    content: forged.utterance,
    tenantId,
  })
}

/** A gated completion — an LLM turn in, the model's reply out (async, may refuse). */
export type Complete = (prompt: Utterance) => Promise<Utterance>

/**
 * The full out-stroke: run the prompt through the gated completion, then forge
 * the reply into its address. `complete` is injected — in production it is the
 * `services/ai/cloudflare-ai` 9-layer entrypoint; in tests it is a fake. The
 * breath stays a sequence: speak (exhale) then `expand` (inhale) round-trips.
 */
export async function speak(
  prompt: Utterance,
  tenantId: string,
  complete: Complete,
  opts: { capabilities?: number; schemaVersion?: number } = {},
): Promise<Forged> {
  const reply = await complete(prompt)
  return forge(reply, tenantId, opts)
}
