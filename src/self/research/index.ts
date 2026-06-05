/**
 * self/research — the matter twin (under self/research).
 *
 * Self-research is NOT a new endpoint — it is the EMERGENT capability of the
 * already-computed MCP surface. `payload.config` registers one find/create/update/
 * delete tool per collection, computed from `Object.values(allCollections)` (never
 * hand-listed). Every handler runs in the caller's `PayloadRequest`, which inherits
 * the key owner's `access` + tenant scope — so fanning the find-tools across the
 * corpus assembles the footprint of the CALLER'S OWN identity (an email) and
 * structurally cannot reach another actor's rows. Securing follows through the SAME
 * gateway: each chosen account's reset/recover is a computed `update` call,
 * sandbox-gated and receipted. No bypass: the gateway is the only path, and the
 * access scope IS the ownership boundary.
 *
 * This kernel is pure + AGNOSTIC: it hardcodes no collection and no service. The
 * reachable tools come from the registry (computed), the identity-bindings + rows
 * come from the DB (the caller's access). It enforces exactly two invariants:
 *   1. self-scope — every research query is pinned to the caller's identity value
 *      and is never widened (`planSelfResearch` can only emit pinned queries);
 *   2. no-bypass — the securing grant's allowlist IS the caller's own footprint, so
 *      an `update` aimed at any row self-research did not return is blocked AND
 *      receipted (`securingGrant` + `gateSecuring`, composing `@/sandbox`).
 *
 * @standard NIST SP 800-162 ABAC — the access scope is the ownership boundary
 * @standard OWASP ASVS V5 — least-privilege / IDOR-prevention (no cross-actor read)
 * @standard NIST SP 800-63B §6.1.3 — owner-authorized credential recovery
 * @see @/self · @/agents/mcp · @/sandbox · @/receipt · ./SKILL.md
 */
import { evaluate, type SandboxEvaluation, type ToolAction, type ToolGrant } from '@/sandbox'
import type { Decision, Receipt } from '@/receipt'

/** A computed MCP find-tool the caller can reach — one per ACCESSIBLE collection (from the registry, not hardcoded). */
export interface FindTool {
  readonly name: string // e.g. `findContacts` — computed from the slug by plugin-mcp
  readonly collectionSlug: string
}

/**
 * Which field carries the actor's identity in a collection — DB-declared, never hardcoded here:
 * an `email`-type field (match the caller's email) or a relationship to the users collection
 * (match the caller's user id — the actor-merge). Computed from the schema by `./bindings`.
 */
export interface IdentityBinding {
  readonly collectionSlug: string
  readonly field: string
  readonly match: 'email' | 'user'
}

/** The caller's OWN identity, derived from `req.user` (the key owner) — never a tool parameter. */
export interface SelfIdentity {
  readonly email: string
  readonly userId: string
}

/** A self-scoped find-call the gateway runs in the caller's PayloadRequest. Its `where` is ALWAYS pinned to the caller. */
export interface ResearchQuery {
  readonly tool: string
  readonly collectionSlug: string
  readonly where: Readonly<Record<string, { readonly equals: string }>>
}

/** An account the self-research surfaced — sourced from the gateway's find results (already access-scoped to the caller). */
export interface DiscoveredAccount {
  readonly accountUuid: string
  readonly collectionSlug: string
  readonly provider: string // a DB value (where the identity is used), never a hardcoded service list
  readonly exposed?: boolean // optional known-breach flag (a breach feed) — drives securing priority
}

/**
 * Plan the self-research: for every identity-binding whose collection the caller can
 * REACH, emit one find-query with its `where` PINNED to the caller's own value (their
 * email for an email field, their user id for a users-relationship). Agnostic — it
 * iterates the registry + bindings and hardcodes nothing; a binding whose collection
 * the caller cannot reach is skipped. The pin is the self-scope invariant: the
 * function can only ever emit a query bound to one of the caller's OWN values.
 */
export function planSelfResearch(args: {
  self: SelfIdentity
  reachable: readonly FindTool[]
  bindings: readonly IdentityBinding[]
}): ResearchQuery[] {
  const toolFor = new Map(args.reachable.map((t) => [t.collectionSlug, t.name]))
  return args.bindings.flatMap((b) => {
    const tool = toolFor.get(b.collectionSlug)
    if (tool === undefined) return [] // not reachable by this caller — skip
    const value = b.match === 'email' ? args.self.email : args.self.userId
    return [{ tool, collectionSlug: b.collectionSlug, where: { [b.field]: { equals: value } } }]
  })
}

/** Self-scope invariant: a query is valid only if it has ≥1 clause and EVERY clause pins one of the caller's OWN values. */
export function isSelfScoped(query: ResearchQuery, self: SelfIdentity): boolean {
  const clauses = Object.values(query.where)
  return clauses.length > 0 && clauses.every((c) => c.equals === self.email || c.equals === self.userId)
}

/**
 * Build the caller's securing grant: it may `update` ONLY the accounts its own
 * self-research returned — the footprint IS the allowlist. This is the no-bypass
 * mechanism: the `@/sandbox` allowlist check rejects (and receipts) any update aimed
 * at a row outside the caller's footprint, so a securing action can never exceed
 * what the caller's access already revealed.
 */
export function securingGrant(args: {
  toolUuid: string
  footprint: readonly DiscoveredAccount[]
  credentialHandles?: readonly string[]
}): ToolGrant {
  return {
    toolUuid: args.toolUuid,
    capabilities: ['update'],
    allowedHosts: args.footprint.map((a) => a.accountUuid),
    credentialHandles: args.credentialHandles ?? [],
  }
}

/**
 * Gate ONE securing action (a reset/recover on a discovered account) through the
 * sandbox and receipt it. The action binds the account's uuid as its resource, so
 * the grant's allowlist (= the footprint) decides: in-footprint ⇒ allowed, anything
 * else ⇒ blocked. Either way the decision is a chained receipt — an un-receipted
 * securing action has no proof it was authorized.
 */
export function gateSecuring(args: {
  account: DiscoveredAccount
  grant: ToolGrant
  actor: string
  credentialHandle?: string
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
}): { authorized: boolean; evaluation: SandboxEvaluation } {
  const action: ToolAction = {
    capability: 'update',
    host: args.account.accountUuid,
    ...(args.credentialHandle ? { credentialHandle: args.credentialHandle } : {}),
  }
  const evaluation = evaluate({
    grant: args.grant,
    action,
    actor: args.actor,
    head: args.head,
    timestampIso: args.timestampIso,
  })
  return { authorized: evaluation.allowed, evaluation }
}

/** The securing sweep's outcome — accounts brought to a secured state, those refused, and the tamper-evident ledger. */
export interface SecuringLedger {
  readonly secured: readonly DiscoveredAccount[]
  readonly refused: readonly DiscoveredAccount[]
  readonly receipts: readonly Receipt[]
  readonly decisions: readonly Decision[]
}

/**
 * Secure a chosen subset of the footprint: gate each account (exposed-first — a
 * known-breached credential is reset before a merely-present one), chaining every
 * verdict into ONE receipt ledger. `stamp` supplies a deterministic timestamp per
 * action (no ambient clock). The ledger re-verifies end-to-end via
 * `verifyReceiptChain`, so a doctored verdict is caught at its seq.
 */
export function secureFootprint(args: {
  chosen: readonly DiscoveredAccount[]
  grant: ToolGrant
  actor: string
  credentialHandle?: string
  head?: { leafUuid: string; seq: number } | null
  stamp: () => string
}): SecuringLedger {
  const order = [...args.chosen].sort((a, b) => Number(b.exposed ?? false) - Number(a.exposed ?? false))
  const secured: DiscoveredAccount[] = []
  const refused: DiscoveredAccount[] = []
  const receipts: Receipt[] = []
  const decisions: Decision[] = []
  let head: { leafUuid: string; seq: number } | null = args.head ?? null
  for (const account of order) {
    const { authorized, evaluation } = gateSecuring({
      account,
      grant: args.grant,
      actor: args.actor,
      ...(args.credentialHandle ? { credentialHandle: args.credentialHandle } : {}),
      head,
      timestampIso: args.stamp(),
    })
    ;(authorized ? secured : refused).push(account)
    receipts.push(evaluation.receipt)
    decisions.push(evaluation.decision)
    head = evaluation.receipt
  }
  return { secured, refused, receipts, decisions }
}
