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
