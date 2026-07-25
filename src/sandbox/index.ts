/**
 * sandbox — run an untrusted, agent-built tool under a content-addressed grant, with every action
 * policy-evaluated and receipted. erpax encodes capability-scoping + credential-protection +
 * endpoint-allowlisting + audit NATIVELY (content-uuid identity + the receipt), depending on nothing
 * external. The WASM/worker isolation is the runtime boundary; the policy here is pure and tested.
 *
 * @standard NIST SP-800-162 ABAC (capability-scoped authorization)
 * @standard OWASP-ASVS V5 untrusted-input / least-privilege
 * @see ../receipt (the uuid-chained audit) · ./SKILL.md
 */
import { issueReceipt, type Decision, type Receipt } from '@/receipt'
import { bind4 } from '@/merge'

/** What an untrusted tool is permitted to do — the content-addressed grant. */
export interface ToolGrant {
  /** content-uuid of the tool's code (the tool IS its id; recompute, never trust a label). */
  readonly toolUuid: string
  /** the verbs it may use (read/api/execute/write…). */
  readonly capabilities: readonly string[]
  /** the only hosts it may reach (endpoint allowlist). */
  readonly allowedHosts: readonly string[]
  /** the secrets it may touch, BY HANDLE — never the value (the broker injects at the boundary). */
  readonly credentialHandles: readonly string[]
}

/** A single action the tool wants to take. */
export interface ToolAction {
  readonly capability: string
  /** the host it wants to reach (checked against the allowlist), if any. */
  readonly host?: string
  /** the credential handle it wants to use (checked against the grant), if any. */
  readonly credentialHandle?: string
}

export interface Permission {
  readonly allowed: boolean
  readonly reason?: string
}

/** Pure policy: may the tool take this action under its grant? Capability, then allowlist, then credential. */
export function permits(grant: ToolGrant, action: ToolAction): Permission {
  if (!grant.capabilities.includes(action.capability)) {
    return { allowed: false, reason: `capability '${action.capability}' not granted` }
  }
  if (action.host !== undefined && !grant.allowedHosts.includes(action.host)) {
    return { allowed: false, reason: `host '${action.host}' not allowlisted` }
  }
  if (action.credentialHandle !== undefined && !grant.credentialHandles.includes(action.credentialHandle)) {
    return { allowed: false, reason: `credential '${action.credentialHandle}' not granted` }
  }
  return { allowed: true }
}

/**
 * The credential broker: resolve a handle to its secret ONLY if the grant permits it. The untrusted
 * tool names a handle and receives the value at this host boundary — it never holds the secret in
 * its own scope, and an ungranted handle is never resolved (so a leak cannot exceed the grant).
 */
export function brokerCredential(
  grant: ToolGrant,
  handle: string,
  resolve: (handle: string) => string | undefined,
): string | undefined {
  if (!grant.credentialHandles.includes(handle)) return undefined
  return resolve(handle)
}

/** A human-readable label for the decision the receipt records. */
function actionLabel(action: ToolAction): string {
  return [action.capability, action.host, action.credentialHandle].filter(Boolean).join(' ')
}

export interface SandboxEvaluation {
  readonly allowed: boolean
  readonly reason?: string
  readonly decision: Decision
  /** the uuid-chained audit entry for this action (no receipt, no proof). */
  readonly receipt: Receipt
}

/**
 * Evaluate an action AND receipt it in one step: apply the policy, then emit a [[receipt]] recording
 * the decision (allow/block), chained to `head`. An un-receipted action has no proof it was permitted.
 */
export function evaluate(args: {
  grant: ToolGrant
  action: ToolAction
  actor: string
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
}): SandboxEvaluation {
  const verdict = permits(args.grant, args.action)
  const decision: Decision = {
    action: actionLabel(args.action),
    actor: args.actor,
    outcome: verdict.allowed ? 'allow' : 'block',
    tier: 'sandbox',
    capabilities: args.grant.capabilities,
  }
  const receipt = issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
  return { allowed: verdict.allowed, ...(verdict.reason ? { reason: verdict.reason } : {}), decision, receipt }
}

/** An outbound HTTP(S) request the sandboxed tool wants to make — the body is named by its content-uuid, never carried. */
export interface EgressRequest {
  readonly url: string
  readonly method: string
  /** content-uuid of the request body (its id) — the payload is addressed, never held in the grant. */
  readonly bodyUuid: string
  /** the credential handle the request authenticates with, if any (checked against the grant). */
  readonly credentialHandle?: string
}

/** The verdict on an egress attempt: allowed + a 4-key tamper-evident seal of the request cross + its receipt. */
export interface EgressVerdict {
  readonly allowed: boolean
  readonly reason?: string
  /** the 4-key seal — bind4(host ⊕ bodyUuid ⊕ method ⊕ credentialHandle); flip any and it breaks. Present even when blocked (the attempt is sealed). */
  readonly seal: string
  readonly receipt: Receipt
}

/**
 * secureEgress — the ONE guarded door for any outbound HTTP(S) the sandboxed tool makes. Egress is where a
 * compromised tool exfiltrates, so it is refused unless it clears three gates AT ONCE:
 *   1. TRANSPORT — the URL must be `https:` (plaintext egress is refused; encryption in transit is not optional).
 *   2. ALLOWLIST — the host must be in the grant's `allowedHosts` (reuses `permits`, capability `egress`), and the
 *      credential handle must be granted — a leak cannot exceed the grant.
 *   3. SEAL — the request cross (host ⊕ bodyUuid ⊕ method ⊕ credentialHandle) folds to a 4-key `bind4` seal, so
 *      the exact request that left is tamper-evident: flip the host, the body, the method, or the credential and
 *      the seal breaks. The attempt is ALWAYS sealed + receipted, allowed or blocked — a refused exfiltration is
 *      itself auditable.
 *
 * This is the "quantum encryption over any http(s)" door: the 4-key seal is the same fold the chat and the matrix
 * bind use, now on the wire. HONEST BOUNDARY — it proves the request is allowlisted + tamper-EVIDENT, it does not
 * itself encrypt the body (TLS does that; the seal detects tampering, it does not provide confidentiality).
 */
export function secureEgress(args: {
  grant: ToolGrant
  request: EgressRequest
  actor: string
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
}): EgressVerdict {
  const { request: r } = args
  let host = ''
  let httpsOk = false
  try {
    const u = new URL(r.url)
    host = u.host
    httpsOk = u.protocol === 'https:'
  } catch {
    /* malformed URL ⇒ host '' ⇒ blocked below */
  }
  const seal = bind4(host, r.bodyUuid, r.method, r.credentialHandle ?? '')
  const verdict: Permission = !httpsOk
    ? { allowed: false, reason: host === '' ? 'malformed egress URL' : 'egress must be HTTPS (encryption in transit)' }
    : permits(args.grant, { capability: 'egress', host, ...(r.credentialHandle ? { credentialHandle: r.credentialHandle } : {}) })
  const decision: Decision = {
    action: `egress ${r.method} ${host || r.url}`,
    actor: args.actor,
    outcome: verdict.allowed ? 'allow' : 'block',
    tier: 'sandbox',
    capabilities: args.grant.capabilities,
  }
  const receipt = issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
  return { allowed: verdict.allowed, ...(verdict.reason ? { reason: verdict.reason } : {}), seal, receipt }
}
