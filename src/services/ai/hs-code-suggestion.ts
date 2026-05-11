/**
 * AI HS-Code Suggestion — suggest the WCO Harmonised System code for
 * a customs-declaration line based on goods description + country pair.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_hs_code_suggestion` feature.
 *
 * @standard WCO HS Convention 2022 harmonised-commodity-description-and-coding-system
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @compliance EU UCC §6 customs-declaration
 * @compliance EU AI Act 2024 limited-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from './cloudflare-ai'

export interface HsCodeSuggestionInput {
  readonly customsDeclarationId?: string
  readonly goodsDescription: string
  readonly countryOfOrigin?: string
  readonly countryOfDestination?: string
  /** Material composition hint. */
  readonly materialHint?: string
  /** Intended use hint. */
  readonly intendedUseHint?: string
}

export interface HsCodeSuggestionOutput {
  readonly hsCode: string // 6 / 8 / 10-digit
  readonly hsCodeDescription: string
  readonly confidence: number
  readonly alternatives: ReadonlyArray<{
    readonly hsCode: string
    readonly description: string
    readonly confidence: number
  }>
}

export async function suggestHsCode(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: HsCodeSuggestionInput,
): Promise<AiCallResult<HsCodeSuggestionOutput>> {
  return callWorkersAi<HsCodeSuggestionOutput>(req, binding, {
    feature: 'ai_hs_code_suggestion',
    model: '@cf/meta/llama-3.1-8b-instruct',
    aiRiskClass: 'limited',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Suggest the WCO Harmonised System (HS) code for a goods description.
Output ONLY JSON: { "hsCode": "XXXXXX[XX][XX]", "hsCodeDescription": string, "confidence": 0..1, "alternatives": [{ "hsCode", "description", "confidence" }] }.
Use 6-digit minimum, 8/10-digit when the EU Combined Nomenclature is unambiguous.`,
        },
        {
          role: 'user',
          content: `Goods: "${input.goodsDescription}"
Origin: ${input.countryOfOrigin ?? 'unknown'}
Destination: ${input.countryOfDestination ?? 'unknown'}
Material: ${input.materialHint ?? 'unknown'}
Use: ${input.intendedUseHint ?? 'unknown'}`,
        },
      ],
    },
    sourceCollection: 'customs-declarations',
    sourceId: input.customsDeclarationId,
    // HS-code mistakes can incur customs penalties — never auto-accept.
  })
}
