/**
 * self/research — green by construction: these tests ARE the proof that "any actor
 * can research its OWN footprint and secure it, with no bypass of the gateway"
 * resolves the way the SKILL claims. The caller's reachable find-tools are the
 * computed MCP surface; the identity-bindings are computed from the schema; the
 * access scope is the ownership boundary; every securing verdict is a uuid-chained
 * receipt. @see ./index.ts, ./bindings.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'
import type { CollectionConfig } from 'payload'
import { verifyReceiptChain } from '@/receipt'
import { computeIdentityBindings } from '@/self/research/bindings'
import {
  planSelfResearch,
  isSelfScoped,
  securingGrant,
  gateSecuring,
  secureFootprint,
  type FindTool,
  type IdentityBinding,
  type SelfIdentity,
  type DiscoveredAccount,
} from '@/self/research'

let clock = 0
const stamp = (): string => {
  clock += 1
  return `2026-06-05T00:00:${String(clock).padStart(2, '0')}.000Z`
}

const SELF: SelfIdentity = { email: 'owner@example.com', userId: 'user-self-1' }

// The COMPUTED MCP surface this caller's key can reach — one find-tool per accessible
// collection (in reality Object.values(allCollections); here a representative sample).
const reachable: FindTool[] = [
  { name: 'findContacts', collectionSlug: 'contacts' },
  { name: 'findOrders', collectionSlug: 'orders' },
  { name: 'findMessages', collectionSlug: 'messages' }, // reachable but NOT identity-bound
]
// Which field binds the actor's identity per collection — computed from the schema, agnostic.
const bindings: IdentityBinding[] = [
  { collectionSlug: 'contacts', field: 'email', match: 'email' }, // pins the caller's email
  { collectionSlug: 'orders', field: 'customer', match: 'user' }, // pins the caller's user id (actor-merge)
  { collectionSlug: 'invoices', field: 'billTo', match: 'email' }, // bound but NOT reachable by this key
]

describe('self/research — self-scoped footprint + no-bypass securing', () => {
  it('planSelfResearch fans the COMPUTED find-surface, pinning every query to one of the caller OWN values (self-scope)', () => {
    const plan = planSelfResearch({ self: SELF, reachable, bindings })
    // a query per reachable ∩ identity-bound collection; `messages` (unbound) and `invoices` (unreachable) drop out
    expect(plan.map((q) => q.collectionSlug)).toEqual(['contacts', 'orders'])
    // EVERY query is pinned to one of the caller's own values — the kernel cannot emit a cross-actor query
    expect(plan.every((q) => isSelfScoped(q, SELF))).toBe(true)
    // email-field binds the email; users-relationship binds the user id
    expect(plan.find((q) => q.collectionSlug === 'contacts')?.where).toEqual({ email: { equals: SELF.email } })
    expect(plan.find((q) => q.collectionSlug === 'orders')?.where).toEqual({ customer: { equals: SELF.userId } })
  })

  it('the footprint IS the allowlist — a securing update on a row self-research never returned is blocked + receipted (no bypass)', () => {
    const footprint: DiscoveredAccount[] = [
      { accountUuid: 'acct-mine-1', collectionSlug: 'contacts', provider: 'newsletter.example' },
    ]
    const grant = securingGrant({ toolUuid: 'sha256:self-secure', footprint })

    // mine: in-footprint ⇒ authorized, receipt allow
    const mine = gateSecuring({ account: footprint[0], grant, actor: SELF.email, head: null, timestampIso: stamp() })
    expect(mine.authorized).toBe(true)
    expect(mine.evaluation.decision.outcome).toBe('allow')

    // foreign: a row belonging to someone else (never in MY footprint) ⇒ blocked, receipt block
    const foreign: DiscoveredAccount = {
      accountUuid: 'acct-someone-else',
      collectionSlug: 'contacts',
      provider: 'bank.example',
    }
    const blocked = gateSecuring({
      account: foreign,
      grant,
      actor: SELF.email,
      head: mine.evaluation.receipt,
      timestampIso: stamp(),
    })
    expect(blocked.authorized).toBe(false)
    expect(blocked.evaluation.decision.outcome).toBe('block')
    expect(blocked.evaluation.reason).toContain('acct-someone-else')
  })

  it('secureFootprint sweeps exposed-first and emits a verifiable receipt chain; a doctored verdict is caught at its seq', async () => {
    const footprint: DiscoveredAccount[] = [
      { accountUuid: 'a-present', collectionSlug: 'contacts', provider: 'forum.example' },
      { accountUuid: 'a-breached', collectionSlug: 'orders', provider: 'shop.example', exposed: true },
    ]
    const grant = securingGrant({ toolUuid: 'sha256:self-secure', footprint })
    const ledger = secureFootprint({ chosen: footprint, grant, actor: SELF.email, stamp })

    // exposed-first: the breached account is secured before the merely-present one
    expect(ledger.secured.map((a) => a.accountUuid)).toEqual(['a-breached', 'a-present'])
    expect(ledger.refused).toHaveLength(0)

    const intact = await verifyReceiptChain(ledger.receipts, ledger.decisions)
    expect(intact.ok).toBe(true)

    // doctoring the first verdict breaks the chain exactly at its seq
    const forged = ledger.decisions.map((d, i) => (i === 0 ? { ...d, outcome: 'block' as const } : d))
    const broken = await verifyReceiptChain(ledger.receipts, forged)
    expect(broken.ok).toBe(false)
    expect(broken.brokenAtSeq).toBe(0)
  })
})

describe('self/research bindings — identity-bindings COMPUTED from the schema (hardcoded nowhere)', () => {
  // a fake config covering: email field, users-relationship, a non-identity relationship,
  // an email nested in a presentational row, and an auth collection (injected email).
  const collections = [
    { slug: 'contacts', fields: [{ name: 'email', type: 'email' }] },
    { slug: 'orders', fields: [{ name: 'customer', type: 'relationship', relationTo: 'users' }] },
    { slug: 'posts', fields: [{ name: 'author', type: 'relationship', relationTo: 'authors' }] }, // NOT users
    { slug: 'profiles', fields: [{ type: 'row', fields: [{ name: 'contactEmail', type: 'email' }] }] },
    { slug: 'users', auth: {}, fields: [] }, // auth ⇒ injected email
  ] as unknown as CollectionConfig[]

  it('binds email fields, users-relationships, nested email, and auth collections — and nothing else', () => {
    const reg = computeIdentityBindings(collections)
    expect(reg).toContainEqual({ collectionSlug: 'contacts', field: 'email', match: 'email' })
    expect(reg).toContainEqual({ collectionSlug: 'orders', field: 'customer', match: 'user' })
    expect(reg).toContainEqual({ collectionSlug: 'profiles', field: 'contactEmail', match: 'email' })
    expect(reg).toContainEqual({ collectionSlug: 'users', field: 'email', match: 'email' })
    // a relationship to a non-users collection is NOT an identity binding
    expect(reg.some((b) => b.collectionSlug === 'posts')).toBe(false)
  })
})
