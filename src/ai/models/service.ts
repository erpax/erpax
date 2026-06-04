/**
 * Workers AI model registry — the single place erpax names the models it
 * may fall back to.
 *
 * erpax is **AI-self-sufficient first**: the deterministic, standards-
 * encoded core (the double-entry ledger, validation, the rule engines,
 * the content-uuid identity) decides whenever it can. External AI is a
 * **fallback** — invoked only when the task is genuinely non-deterministic
 * (OCR, document classification, semantic search, complex reasoning) — and
 * **strictly to the law and the standards**: every such call goes through
 * `callWorkersAi`, which enforces the EU AI Act risk class, the per-tenant
 * `featureGuard`, and audit logging. This registry is the model side of
 * the same cascade as the country→regional→international→universal
 * jurisdiction fallback (see the `identity` skill) and the matter↔antimatter
 * hooks↔fallbacks duality (see `sequence`): self before fallback, fallback
 * before nothing, nothing is ever undefined.
 *
 * One id per capability (DRY) — a model swap is one edit, not a grep.
 *
 * @standard EU AI Act 2024 risk-classification + transparency
 * @compliance GDPR data-residency (Cloudflare EU PoPs for EU tenants)
 * @see ./cloudflare-ai.ts (`callWorkersAi` — the single gated entrypoint)
 */
export const AI_MODELS = {
  /** General reasoning / extraction — 8B, fast, cheap. The default fallback. */
  reasoning: '@cf/meta/llama-3.1-8b-instruct',
  /**
   * Deep reasoning — math / coding / complex audit logic. DeepSeek-R1
   * distilled into Qwen-32B: open-weights, Cloudflare-hosted (≈ o1-mini),
   * EU-residency-controllable. The heavier fallback, used only when the
   * deterministic core AND the 8B model are insufficient.
   */
  reasoningDeep: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
  /** Vision — invoice OCR, document classification (multimodal). */
  vision: '@cf/meta/llama-3.2-11b-vision-instruct',
  /** Text embeddings — semantic search, dedup, Vectorize (the content-uuid of meaning). */
  embed: '@cf/baai/bge-base-en-v1.5',
  /** PDF / image text extraction — small multimodal. */
  pdfVision: '@cf/unum/uform-gen2-qwen-500m',
} as const

export type AiModelId = (typeof AI_MODELS)[keyof typeof AI_MODELS]
