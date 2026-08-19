/**
 * AI Security helpers — PII stripping + prompt-injection detection +
 * output-validation + tamper-evident audit-row hashing.
 *
 * Slice YYY (2026-05-10): every input to `callWorkersAi` flows through
 * `sanitisePiiForAi()` and `detectPromptInjection()` BEFORE it leaves
 * our network — defence-in-depth so a leaked prompt or
 * compromised Workers AI binding can't exfiltrate raw PII / tokens /
 * sensitive customer data. Every output flows through
 * `validateAiOutput()` before being persisted to `ai-suggestions` —
 * malformed / suspicious / oversize JSON is quarantined.
 *
 * Per ISO/IEC 27001 A.5.34 + GDPR Art.5(1)(c) data-minimisation +
 * EU AI Act 2024 Art.13 transparency. Tamper-evident audit row hash
 * per ISO 27037:2012 evidence-preservation.
 *
 * @standard NIST FIPS-180-4 sha-256 audit-row-hash
 * @standard ISO 27037:2012 evidence-preservation
 * @security ISO-27001 A.5.34 privacy-and-protection-of-pii
 * @security ISO-27002 §5.34 ai-output-validation
 * @security OWASP-LLM-Top-10:2025 LLM01 prompt-injection
 * @security OWASP-LLM-Top-10:2025 LLM02 sensitive-information-disclosure
 * @compliance GDPR Art.5(1)(c) data-minimisation
 * @compliance EU AI Act 2024 Art.13 transparency
 * @see ./cloudflare-ai.ts
 */

// ─── PII stripping ───────────────────────────────────────────────────────
// Patterns conservative enough that false positives (over-stripping)
// are preferred over false negatives (PII leakage to AI).

const PII_PATTERNS: ReadonlyArray<{ name: string; re: RegExp; replacement: string }> = [
  { name: 'email', re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, replacement: '<email>' },
  { name: 'iban', re: /\b[A-Z]{2}\d{2}[A-Z0-9 ]{11,30}\b/gi, replacement: '<iban>' },
  { name: 'card', re: /\b(?:\d[ -]?){13,19}\b/g, replacement: '<card>' },
  { name: 'phone-e164', re: /\+\d[\d\s().-]{6,20}/g, replacement: '<phone>' },
  // BG ЕГН (10 digits with checksum) + EU SSN-like 9-11 digit IDs.
  { name: 'national-id-9-11', re: /\b\d{9,11}\b/g, replacement: '<national-id>' },
  { name: 'jwt', re: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, replacement: '<jwt>' },
  { name: 'bearer', re: /\b(Bearer|Token)\s+[A-Za-z0-9._\-+/=]+\b/g, replacement: '<bearer>' },
  // 32+ char hex/base64 → almost certainly a secret/token.
  { name: 'long-hex', re: /\b[A-Fa-f0-9]{32,}\b/g, replacement: '<hex-secret>' },
]

export interface PiiSanitisationResult {
  readonly clean: unknown
  readonly strippedKinds: ReadonlyArray<string>
}

/**
 * Recursively strip PII from any value before sending to AI.
 * Logs which kinds got stripped so the audit row records data-minimisation.
 */
export function sanitisePiiForAi(value: unknown): PiiSanitisationResult {
  const stripped = new Set<string>()
  const walk = (v: unknown): unknown => {
    if (typeof v === 'string') {
      let out = v
      for (const { name, re, replacement } of PII_PATTERNS) {
        if (re.test(out)) {
          stripped.add(name)
          out = out.replace(re, replacement)
        }
      }
      return out
    }
    if (Array.isArray(v)) return v.map(walk)
    if (v && typeof v === 'object') {
      const o: Record<string, unknown> = {}
      for (const [k, val] of Object.entries(v)) o[k] = walk(val)
      return o
    }
    return v
  }
  return { clean: walk(value), strippedKinds: [...stripped] }
}

// ─── Prompt-injection detection ───────────────────────────────────────────
// Pre-flight — refuse the call rather than send a poisoned prompt.

const INJECTION_PATTERNS: ReadonlyArray<RegExp> = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts)/i,
  /\bsystem\s*[:=]/i,
  /###\s*(system|user|assistant)/i,
  /<\|im_(start|end)\|>/i,
  /<\|\s*system\s*\|>/i,
  /\bjailbreak\b/i,
  /\bDAN\s+mode\b/i,
  /reveal\s+(your|the)\s+(system\s+)?prompt/i,
  /print\s+(your|the)\s+(api|secret|token|key)/i,
]

/**
 * Heuristic prompt-injection detector. Returns `true` if the input
 * contains a suspicious pattern; caller should refuse the inference
 * and quarantine the suggestion.
 */
export function detectPromptInjection(value: unknown): boolean {
  const json = typeof value === 'string' ? value : JSON.stringify(value ?? '')
  return INJECTION_PATTERNS.some((re) => re.test(json))
}

// ─── Output validation ───────────────────────────────────────────────────

export interface OutputValidationOptions {
  /** Max bytes of serialised output we'll accept (defaults to 64 KiB). */
  readonly maxBytes?: number
  /** Required JSON object — reject when output is a string / array / number. */
  readonly requireObject?: boolean
}

export type OutputValidationResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: 'too_large' | 'not_object' | 'malformed' | 'injection_in_output' }

/**
 * Validate AI output before persisting. Catches: oversized blobs,
 * non-JSON when JSON expected, prompt-injection markers in the
 * output (the model may echo them back).
 */
export function validateAiOutput<T = unknown>(
  raw: unknown,
  options: OutputValidationOptions = {},
): OutputValidationResult<T> {
  const maxBytes = options.maxBytes ?? 65536
  let serialised: string
  try {
    serialised = typeof raw === 'string' ? raw : JSON.stringify(raw)
  } catch {
    return { ok: false, reason: 'malformed' }
  }
  if (serialised.length > maxBytes) {
    return { ok: false, reason: 'too_large' }
  }
  if (detectPromptInjection(serialised)) {
    return { ok: false, reason: 'injection_in_output' }
  }
  if (options.requireObject) {
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
      return { ok: false, reason: 'not_object' }
    }
  }
  return { ok: true, value: raw as T }
}

// ─── Tamper-evident audit-row hash ───────────────────────────────────────

/**
 * Compute SHA-256 over the canonical concatenation of audit-row
 * fields. Stored on the `ai-suggestions` row so any silent mutation
 * (DB tamper / replay / fabrication) is detectable.
 *
 * @standard NIST FIPS-180-4 sha-256
 * @standard ISO 27037:2012 evidence-preservation
 */
export async function hashAuditRow(input: {
  readonly suggestionId: string
  readonly tenantId: string
  readonly userId: string
  readonly feature: string
  readonly model: string
  readonly inferenceTime: Date
  readonly inputs: unknown
  readonly outputs: unknown
}): Promise<string> {
  const canonical = JSON.stringify({
    s: input.suggestionId,
    t: input.tenantId,
    u: input.userId,
    f: input.feature,
    m: input.model,
    ts: input.inferenceTime.toISOString(),
    i: input.inputs,
    o: input.outputs,
  })
  // Prefer Web Crypto (works in Workers + Node 20+).
  if (typeof globalThis.crypto?.subtle?.digest === 'function') {
    const enc = new TextEncoder().encode(canonical)
    const digest = await globalThis.crypto.subtle.digest('SHA-256', enc)
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  // Node fallback.
  const { createHash } = await import('node:crypto')
  return createHash('sha256').update(canonical).digest('hex')
}

// ─── Cache-key derivation ────────────────────────────────────────────────

/**
 * Stable cache key over (tenant, feature, model, sanitised inputs).
 * AI Gateway already de-dupes at the HTTP layer; this gives us a
 * second-tier KV cache for high-frequency identical calls (e.g. same
 * goods description → same HS code).
 */
export async function deriveAiCacheKey(input: {
  readonly tenantId: string
  readonly feature: string
  readonly model: string
  readonly sanitisedInputs: unknown
}): Promise<string> {
  const canonical = JSON.stringify({
    t: input.tenantId,
    f: input.feature,
    m: input.model,
    i: input.sanitisedInputs,
  })
  if (typeof globalThis.crypto?.subtle?.digest === 'function') {
    const enc = new TextEncoder().encode(canonical)
    const digest = await globalThis.crypto.subtle.digest('SHA-256', enc)
    return 'ai:' + [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
  }
  const { createHash } = await import('node:crypto')
  return 'ai:' + createHash('sha256').update(canonical).digest('hex').slice(0, 32)
}
