/**
 * Law 22 — AI-decision audit (EU AI Act Annex IV-grade).
 *
 * Slice ZZZZZ. Every AI/LLM-touched value records the model version,
 * canonicalized prompt hash, parameters, seed, latency, and (when
 * applicable) human-review decision. This is the technical-
 * documentation requirement for high-risk AI systems under the
 * EU AI Act 2024/1689 Article 13 + Annex IV.
 *
 * @standard EU AI Act 2024/1689 Art. 13 + Annex IV (technical documentation)
 * @standard ISO/IEC 23894:2023 AI risk management
 * @standard NIST AI RMF 1.0 (2023)
 */

import { createHash } from 'node:crypto'
import { jcsCanonicalize } from '@/services/integrity'
import type { AiProvenance } from './types'

/**
 * Build an AiProvenance record. The promptHash is SHA-256 over the
 * JCS-canonicalized prompt structure so identical prompts hash
 * identically across runtimes.
 */
export function recordAiInvocation(args: {
  modelVersion: string
  modelProvider: AiProvenance['modelProvider']
  prompt: string | Record<string, unknown>
  parameters: Record<string, unknown>
  seed?: number
  inputTokens: number
  outputTokens: number
  inferenceLatencyMs: number
  humanReview?: AiProvenance['humanReview']
}): AiProvenance {
  const promptCanonical = typeof args.prompt === 'string'
    ? args.prompt
    : jcsCanonicalize(args.prompt)
  const promptHash = createHash('sha256').update(promptCanonical, 'utf8').digest('hex')
  return {
    modelVersion: args.modelVersion,
    modelProvider: args.modelProvider,
    promptHash,
    parameters: args.parameters,
    seed: args.seed,
    inputTokens: args.inputTokens,
    outputTokens: args.outputTokens,
    inferenceLatencyMs: args.inferenceLatencyMs,
    invokedAt: new Date().toISOString(),
    humanReview: args.humanReview,
  }
}

/** True when the AI provenance carries everything Annex IV demands. */
export function isAnnexIvCompliant(p: AiProvenance): { ok: true } | { ok: false; missing: string[] } {
  const missing: string[] = []
  if (!p.modelVersion) missing.push('modelVersion')
  if (!p.promptHash) missing.push('promptHash')
  if (!p.parameters) missing.push('parameters')
  if (typeof p.inputTokens !== 'number') missing.push('inputTokens')
  if (typeof p.outputTokens !== 'number') missing.push('outputTokens')
  if (typeof p.inferenceLatencyMs !== 'number') missing.push('inferenceLatencyMs')
  return missing.length === 0 ? { ok: true } : { ok: false, missing }
}
