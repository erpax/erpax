/**
 * AI Audit-Trail Summarisation — generate a natural-language SOX §404
 * walk-through summary from a span of `audit-events` rows.
 *
 * Slice XXX (2026-05-10): wraps `callWorkersAi` for the
 * `ai_audit_summarisation` feature. The summary is stored on the
 * `ai-suggestions` row; a SOX auditor accepts it as evidence text
 * for the formal walk-through workpaper.
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @audit ISO 19011:2018 §6.4.6 audit-evidence
 * @compliance SOX §404 internal-controls walk-through-narration
 * @compliance EU AI Act 2024 limited-risk
 * @see ./cloudflare-ai.ts
 */

import type { PayloadRequest } from 'payload'
import { callWorkersAi, type WorkersAiBinding, type AiCallResult } from '@/ai/cloudflare-ai'

export interface AuditSummarisationInput {
  readonly periodStart: string // ISO 8601
  readonly periodEnd: string
  readonly scope: 'cash' | 'ar' | 'ap' | 'gl' | 'inventory' | 'payroll' | 'all'
  readonly auditEvents: ReadonlyArray<{
    readonly timestamp: string
    readonly eventType: string
    readonly collection: string
    readonly operation: string
    readonly userId?: string
    readonly previousStatus?: string
    readonly nextStatus?: string
  }>
}

export interface AuditSummarisationOutput {
  readonly title: string
  readonly summary: string // markdown, suitable for SOX walk-through workpaper
  readonly keyTransitions: ReadonlyArray<string>
  readonly recommendedFollowUps: ReadonlyArray<string>
}

export async function summariseAuditTrail(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  input: AuditSummarisationInput,
): Promise<AiCallResult<AuditSummarisationOutput>> {
  return callWorkersAi<AuditSummarisationOutput>(req, binding, {
    feature: 'ai_audit_summarisation',
    model: '@cf/meta/llama-3.1-8b-instruct',
    aiRiskClass: 'limited',
    inputs: {
      messages: [
        {
          role: 'system',
          content: `Summarise an audit-event log for a SOX §404 walk-through workpaper.
Output ONLY JSON: { "title": string, "summary": markdown-string, "keyTransitions": [string], "recommendedFollowUps": [string] }.
Be factual; cite specific event timestamps + types; no speculation.`,
        },
        {
          role: 'user',
          content: `Period: ${input.periodStart} → ${input.periodEnd}
Scope: ${input.scope}
Events (${input.auditEvents.length}):
${JSON.stringify(input.auditEvents.slice(0, 200), null, 2)}`,
        },
      ],
    },
    sourceCollection: 'audit-events',
    // Auditor decides whether the summary text is good enough for the
    // workpaper — never auto-accept.
  })
}
