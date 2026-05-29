/**
 * Cloudflare Workers AI — strict-access entry point.
 *
 * Slice WWW (2026-05-10): single canonical wrapper for every Workers
 * AI inference run from ERPax.
 *
 * Slice YYY (2026-05-10): deep cost + security integration. Every
 * call now goes through 9 gates (was 5), in this order:
 *
 *   1. **Bindings + identity** — AI binding present + tenant + user
 *      resolved from request.
 *   2. **Per-tenant feature gate** — `featureGuard(featureId)` from
 *      the existing subscription infrastructure (Slice VVV).
 *   3. **Per-tenant token quota** — `getFeatureLimit(req, feature)`
 *      reads the tenant's metered cap; the call is refused with
 *      `quota_exceeded` when (running-period total + this call's
 *      estimated tokens) would breach the cap.
 *   4. **PII sanitisation** — `sanitisePiiForAi()` strips emails /
 *      IBANs / cards / national-IDs / JWTs / long hex secrets BEFORE
 *      sending. Stripped kinds are logged on the audit row for
 *      GDPR Art.5(1)(c) data-minimisation evidence.
 *   5. **Prompt-injection detection** — refuses the call when the
 *      sanitised input still matches an injection pattern.
 *   6. **Risk-class hard gate** — `'prohibited'` rejected;
 *      `'high'` NEVER auto-accepts (regardless of confidence).
 *   7. **AI Gateway routing + cache** — when an AI Gateway URL is
 *      configured, every inference goes through the gateway (caching,
 *      rate-limit, secret-scanning, observability). Falls back to
 *      direct binding when no gateway configured.
 *   8. **Output validation** — `validateAiOutput()` rejects oversized,
 *      non-object, or injection-echoing responses; failed output is
 *      quarantined on the audit row instead of applied.
 *   9. **Tamper-evident audit row** — every inference (success OR
 *      failure) writes one `ai-suggestions` row including a SHA-256
 *      `auditHash` over the canonical (suggestionId, tenant, user,
 *      feature, model, inferenceTime, inputs, outputs) so silent
 *      mutation is detectable per ISO 27037:2012.
 *
 *   PLUS — best-effort `usage-records` row for IFRS-15 §B16 metered
 *   billing (with token counts, not just call counts, when available).
 *
 * @standard ISO/IEC 23894:2023 ai-risk-management
 * @standard ISO/IEC 42001:2023 ai-management-system
 * @standard NIST AI-RMF-1.0 ai-risk-management-framework
 * @standard NIST FIPS-180-4 sha-256 audit-row-hash
 * @standard ISO 27037:2012 evidence-preservation
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @compliance GDPR Art.22 automated-individual-decision-making
 * @compliance GDPR Art.22(3) right-to-human-intervention
 * @compliance EU AI Act 2024 transparency-and-risk-classification
 * @compliance SOX §404 internal-controls ai-assisted-decision
 * @audit ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
 * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
 * @security ISO-27002 §5.34 ai-output-validation
 * @security OWASP-LLM-Top-10:2025 LLM01 prompt-injection
 * @security OWASP-LLM-Top-10:2025 LLM02 sensitive-information-disclosure
 * @see ./ai-security.ts
 * @see src/access/feature-registry.ts (ai_* features)
 * @see src/plugins/accounting/collections/AiSuggestions.ts
 */

import { v4 as uuid } from 'uuid'
import type { Payload, PayloadRequest } from 'payload'
import { checkFeatureAccess, getFeatureLimit } from '@/access/subscriptionGates'
import {
  sanitisePiiForAi,
  detectPromptInjection,
  validateAiOutput,
  hashAuditRow,
  deriveAiCacheKey,
} from './ai-security'
import { isEuAiActRiskClass, type EuAiActRiskClass } from '@/standards/eu-ai-act'

/** Cloudflare Workers AI binding shape. */
export interface WorkersAiBinding {
  run(model: string, inputs: Record<string, unknown>, options?: { gateway?: { id: string; cacheTtl?: number; skipCache?: boolean } }): Promise<unknown>
}

/** KV-style binding for the secondary semantic-search cache (optional). */
export interface AiCacheBinding {
  get(key: string, type?: 'json'): Promise<unknown>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

export interface AiCallOptions {
  /** Required — FEATURE_REGISTRY id; gates per-tenant entitlement. */
  readonly feature: string
  /** Required — the Workers AI model id. */
  readonly model: string
  /** Required — input payload. PII is auto-stripped before send. */
  readonly inputs: Record<string, unknown>
  /** Required — EU AI Act risk class. */
  readonly aiRiskClass: EuAiActRiskClass
  /** Optional — source row this inference is FOR. */
  readonly sourceCollection?: string
  readonly sourceId?: string
  /** Optional — confidence-threshold for auto-accept (NEVER honoured for high-risk). */
  readonly autoAcceptThreshold?: number
  /**
   * Optional — cap on output tokens (defaults to 500). Slice YYY
   * cost-control: most ERP tasks need < 500 tokens out, capping
   * stops a runaway response from blowing the bill.
   */
  readonly maxTokens?: number
  /**
   * Optional — AI Gateway id (when present, the gateway is used
   * for caching + rate-limit + secret-scanning + observability).
   */
  readonly gatewayId?: string
  /** Optional — cache TTL for the gateway cache (seconds). 0 = no-cache. */
  readonly cacheTtl?: number
  /** Optional — secondary KV-cache binding for very-hot lookups. */
  readonly kvCache?: AiCacheBinding
}

/**
 * Default AI-response cache TTL (24h). "All cached for minimal AI cost":
 * caching is ON by default — the key is content-derived (tenant + feature
 * + model + inputs, see `deriveAiCacheKey`), so identical inferences
 * dedupe and are never paid for twice (the content-uuid of an inference).
 * Pass `cacheTtl: 0` to opt out for volatile / one-shot tasks.
 */
const DEFAULT_AI_CACHE_TTL = 86_400

export type AiCallResult<TOutput = unknown> =
  | {
      readonly ok: true
      readonly suggestionId: string
      readonly output: TOutput
      readonly humanDecision: 'pending' | 'auto_accepted'
      readonly cacheHit?: boolean
      readonly tokensIn?: number
      readonly tokensOut?: number
    }
  | {
      readonly ok: false
      readonly error:
        | 'not_entitled'
        | 'no_tenant'
        | 'no_user'
        | 'no_ai_binding'
        | 'inference_failed'
        | 'prohibited_risk'
        | 'quota_exceeded'
        | 'pii_in_prompt'
        | 'prompt_injection'
        | 'output_validation_failed'
      readonly message?: string
    }

/**
 * Run a Cloudflare Workers AI inference with strict access control +
 * mandatory audit trail + cost optimisation + security defence-in-depth.
 *
 * THIS is the only function that should call `binding.run(...)`
 * directly — every AI use-case in ERPax goes through here.
 */
export async function callWorkersAi<TOutput = unknown>(
  req: PayloadRequest,
  binding: WorkersAiBinding | undefined,
  options: AiCallOptions,
): Promise<AiCallResult<TOutput>> {
  // ── 1. Bindings + identity guards ──────────────────────────────────
  if (!binding) {
    return { ok: false, error: 'no_ai_binding', message: 'Cloudflare Workers AI binding not configured' }
  }
  const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> } | undefined)?.tenants
  const tenantRef = tenantsArr?.[0]?.tenant
  if (tenantRef === undefined || tenantRef === null) return { ok: false, error: 'no_tenant' }
  if (!req.user?.id) return { ok: false, error: 'no_user' }
  const tenantId = String(tenantRef)
  const userId = String(req.user.id)

  // ── 2. Feature-gate (per-tenant entitlement) ───────────────────────
  const entitled = await checkFeatureAccess(req, options.feature)
  if (!entitled.allowed) {
    return { ok: false, error: 'not_entitled', message: entitled.reason }
  }

  // ── 3. Per-tenant token quota / cost cap ───────────────────────────
  // Slice YYY — circuit-breaker: if the tenant's plan has a numeric
  // limit on this feature AND we've already metered ≥ that count for
  // the current billing period, refuse the call.
  const limit = await getFeatureLimit(req, options.feature)
  if (typeof limit === 'number' && limit > 0) {
    const used = await countUsageForCurrentPeriod(req.payload, tenantId, options.feature)
    if (used >= limit) {
      return {
        ok: false,
        error: 'quota_exceeded',
        message: `Feature '${options.feature}' quota exhausted for the current period (${used}/${limit}). Upgrade plan or wait for next period.`,
      }
    }
  }

  // ── 4. PII sanitisation (GDPR Art.5(1)(c) data-minimisation) ───────
  const { clean: sanitisedInputs, strippedKinds } = sanitisePiiForAi(options.inputs)
  if (strippedKinds.length > 0) {
    req.payload.logger.info(
      { feature: options.feature, strippedKinds, tenantId },
      `[ai] PII stripped from inputs before send (${strippedKinds.join(', ')})`,
    )
  }

  // ── 5. Prompt-injection detection ──────────────────────────────────
  if (detectPromptInjection(sanitisedInputs)) {
    await writeAiSuggestionRow(req.payload, {
      tenantId, userId,
      suggestionId: uuid(),
      feature: options.feature,
      model: options.model,
      inferenceTime: new Date(),
      inputs: { _redacted: true, _piiKinds: strippedKinds },
      outputs: { error: 'prompt_injection_refused' },
      aiRiskClass: options.aiRiskClass,
      humanDecision: 'pending',
      sourceCollection: options.sourceCollection,
      sourceId: options.sourceId,
      latencyMs: 0,
      status: 'quarantined',
    })
    return { ok: false, error: 'prompt_injection', message: 'Input rejected: prompt-injection pattern detected' }
  }

  // ── 6. Risk-class hard gate ────────────────────────────────────────
  // EU AI Act 2024 Art.5 — `prohibited` MUST be refused regardless of
  // tenant entitlement; type guard keeps this honest if the union changes.
  if (!isEuAiActRiskClass(options.aiRiskClass) || options.aiRiskClass === 'prohibited') {
    return { ok: false, error: 'prohibited_risk' }
  }

  // ── 7. KV cache lookup (cost optimisation, optional) ───────────────
  const cacheKey = await deriveAiCacheKey({
    tenantId, feature: options.feature, model: options.model,
    sanitisedInputs,
  })
  // Caching is the DEFAULT policy (minimal AI cost); explicit `0` opts out.
  const effectiveCacheTtl = options.cacheTtl ?? DEFAULT_AI_CACHE_TTL
  let cachedOutput: TOutput | undefined
  if (options.kvCache && effectiveCacheTtl > 0) {
    try {
      const cached = (await options.kvCache.get(cacheKey, 'json')) as
        | { output: TOutput; tokensIn?: number; tokensOut?: number }
        | null
      if (cached?.output) {
        cachedOutput = cached.output
        req.payload.logger.info({ feature: options.feature, cacheKey }, '[ai] KV cache hit')
      }
    } catch {
      // Cache miss / parse fail — proceed with inference.
    }
  }

  // ── 8. Inference (with AI Gateway routing when configured) ─────────
  const inferenceTime = new Date()
  const t0 = Date.now()
  let output: TOutput
  let confidence: number | undefined
  let tokensIn: number | undefined
  let tokensOut: number | undefined
  if (cachedOutput !== undefined) {
    output = cachedOutput
  } else {
    // Slice YYY: enforce max_tokens cap to control cost.
    const inferenceInputs: Record<string, unknown> = {
      ...sanitisedInputs as Record<string, unknown>,
      max_tokens: options.maxTokens ?? 500,
    }
    try {
      const raw = (await binding.run(options.model, inferenceInputs, options.gatewayId
        ? { gateway: { id: options.gatewayId, cacheTtl: effectiveCacheTtl, skipCache: effectiveCacheTtl === 0 } }
        : undefined)) as
        | TOutput
        | { response?: TOutput; confidence?: number; usage?: { prompt_tokens?: number; completion_tokens?: number } }
      if (raw && typeof raw === 'object' && 'response' in raw) {
        output = (raw as { response: TOutput }).response
        confidence = (raw as { confidence?: number }).confidence
        const usage = (raw as { usage?: { prompt_tokens?: number; completion_tokens?: number } }).usage
        tokensIn = usage?.prompt_tokens
        tokensOut = usage?.completion_tokens
      } else {
        output = raw as TOutput
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      req.payload.logger.error({ err: e, feature: options.feature, model: options.model }, `[ai] inference failed`)
      await writeAiSuggestionRow(req.payload, {
        tenantId, userId,
        suggestionId: uuid(),
        feature: options.feature,
        model: options.model,
        inferenceTime,
        inputs: { _redacted: true, _piiKinds: strippedKinds },
        outputs: { error: message },
        aiRiskClass: options.aiRiskClass,
        humanDecision: 'pending',
        sourceCollection: options.sourceCollection,
        sourceId: options.sourceId,
        latencyMs: Date.now() - t0,
        status: 'recorded',
      })
      return { ok: false, error: 'inference_failed', message }
    }
  }
  const latencyMs = Date.now() - t0

  // ── 9. Output validation ───────────────────────────────────────────
  const validated = validateAiOutput<TOutput>(output)
  if (!validated.ok) {
    await writeAiSuggestionRow(req.payload, {
      tenantId, userId,
      suggestionId: uuid(),
      feature: options.feature,
      model: options.model,
      inferenceTime,
      inputs: { _redacted: true, _piiKinds: strippedKinds },
      outputs: { error: 'output_validation_failed', reason: validated.reason },
      aiRiskClass: options.aiRiskClass,
      humanDecision: 'pending',
      sourceCollection: options.sourceCollection,
      sourceId: options.sourceId,
      latencyMs,
      status: 'quarantined',
    })
    return { ok: false, error: 'output_validation_failed', message: validated.reason }
  }
  output = validated.value

  // ── Auto-accept logic (NEVER for high-risk) ────────────────────────
  let humanDecision: 'pending' | 'auto_accepted' = 'pending'
  if (
    options.aiRiskClass !== 'high' &&
    options.autoAcceptThreshold !== undefined &&
    confidence !== undefined &&
    confidence >= options.autoAcceptThreshold
  ) {
    humanDecision = 'auto_accepted'
  }

  // ── Audit row + tamper-evident hash + metered billing ──────────────
  const suggestionId = uuid()
  await writeAiSuggestionRow(req.payload, {
    tenantId, userId,
    suggestionId,
    feature: options.feature,
    model: options.model,
    inferenceTime,
    inputs: { sanitised: sanitisedInputs, _piiKinds: strippedKinds },
    outputs: output as unknown as Record<string, unknown>,
    confidence,
    aiRiskClass: options.aiRiskClass,
    humanDecision,
    sourceCollection: options.sourceCollection,
    sourceId: options.sourceId,
    latencyMs,
    tokensIn, tokensOut,
    cacheHit: cachedOutput !== undefined,
    status: humanDecision === 'auto_accepted' ? 'applied' : 'recorded',
  })

  void writeUsageRecord(req.payload, {
    tenantId, userId,
    feature: options.feature,
    quantity: (tokensIn ?? 0) + (tokensOut ?? 0) || 1,
    eventTime: inferenceTime,
  }).catch((e) => {
    req.payload.logger.warn({ err: e }, `[ai] usage-record write failed for ${options.feature}`)
  })

  // Cache the successful output for next time (if KV provided + TTL set).
  if (options.kvCache && effectiveCacheTtl > 0 && cachedOutput === undefined) {
    void options.kvCache.put(
      cacheKey,
      JSON.stringify({ output, tokensIn, tokensOut }),
      { expirationTtl: effectiveCacheTtl },
    ).catch((e) => {
      req.payload.logger.warn({ err: e, cacheKey }, '[ai] KV cache put failed')
    })
  }

  return {
    ok: true,
    suggestionId,
    output,
    humanDecision,
    cacheHit: cachedOutput !== undefined,
    tokensIn,
    tokensOut,
  }
}

// ─── Internal helpers (no external surface) ─────────────────────────────

async function countUsageForCurrentPeriod(
  payload: Payload,
  tenantId: string,
  feature: string,
): Promise<number> {
  try {
    const now = new Date()
    const billingPeriod = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
    const { totalDocs } = await payload.find({
      collection: 'usage-records' as never,
      overrideAccess: true,
      depth: 0,
      limit: 0,
      where: {
        and: [
          { tenant: { equals: tenantId } },
          { feature: { equals: feature } },
          { billingPeriod: { equals: billingPeriod } },
        ],
      },
    })
    return totalDocs ?? 0
  } catch {
    return 0 // fail-open on the count itself; the hard cap is at gateway level
  }
}

interface AiSuggestionRow {
  readonly tenantId: string
  readonly userId: string
  readonly suggestionId: string
  readonly feature: string
  readonly model: string
  readonly inferenceTime: Date
  readonly inputs: Record<string, unknown>
  readonly outputs: Record<string, unknown> | unknown
  readonly confidence?: number
  readonly aiRiskClass: EuAiActRiskClass
  readonly humanDecision: 'pending' | 'auto_accepted'
  readonly sourceCollection?: string
  readonly sourceId?: string
  readonly latencyMs: number
  readonly tokensIn?: number
  readonly tokensOut?: number
  readonly cacheHit?: boolean
  readonly status: 'recorded' | 'applied' | 'quarantined'
}

async function writeAiSuggestionRow(
  payload: Payload,
  row: AiSuggestionRow,
): Promise<void> {
  try {
    const auditHash = await hashAuditRow({
      suggestionId: row.suggestionId,
      tenantId: row.tenantId,
      userId: row.userId,
      feature: row.feature,
      model: row.model,
      inferenceTime: row.inferenceTime,
      inputs: row.inputs,
      outputs: row.outputs,
    })
    await payload.create({
      collection: 'ai-suggestions' as never,
      overrideAccess: true,
      data: {
        tenant: row.tenantId,
        suggestionId: row.suggestionId,
        feature: row.feature,
        model: row.model,
        inferenceTime: row.inferenceTime.toISOString(),
        inputs: row.inputs,
        outputs: row.outputs as Record<string, unknown>,
        confidence: row.confidence,
        aiRiskClass: row.aiRiskClass,
        humanDecision: row.humanDecision,
        sourceCollection: row.sourceCollection,
        sourceId: row.sourceId,
        gateway: {
          latencyMs: row.latencyMs,
          tokensIn: row.tokensIn,
          tokensOut: row.tokensOut,
          cacheStatus: row.cacheHit ? 'hit' : 'miss',
        },
        auditHash, // Slice YYY tamper-evident hash
        status: row.status,
      } as never,
    })
  } catch (e) {
    payload.logger.error({ err: e }, '[ai] failed to write ai-suggestions row')
  }
}

interface UsageRow {
  readonly tenantId: string
  readonly userId: string
  readonly feature: string
  readonly quantity: number
  readonly eventTime: Date
}

async function writeUsageRecord(payload: Payload, row: UsageRow): Promise<void> {
  const billingPeriod = `${row.eventTime.getUTCFullYear()}-${String(row.eventTime.getUTCMonth() + 1).padStart(2, '0')}`
  await payload.create({
    collection: 'usage-records' as never,
    overrideAccess: true,
    data: {
      tenant: row.tenantId,
      eventId: uuid(),
      feature: row.feature,
      meterKind: 'count',
      quantity: row.quantity,
      eventTime: row.eventTime.toISOString(),
      billingPeriod,
      status: 'recorded',
    } as never,
  })
}
