'use server'

/**
 * dashboard/actions — the WRITE half of the dashboard, as Next.js Server Actions.
 *
 * THE DATA-FLOW FIX (the corpus violation this corrects): the create modals
 * (CreateInvoiceModal / CreateBillModal / CreateJournalEntryModal) previously
 * POSTed to `/api/accounting/*` through the REST `AccountingClient` — a hardcoded
 * `localhost` baseUrl + a Bearer token + an `x-tenant-id` header in the BROWSER.
 * The corpus forbids that raw env/REST client; writes must flow through the
 * Payload Local API (the Worker's D1 binding), under the actor's own access.
 *
 * These `'use server'` actions are the sanctioned replacement — the WRITE twin of
 * the READ path in `src/dashboard/index.tsx`. Each one:
 *   (a) resolves the actor from the incoming request auth — `getPayload` →
 *       `payload.auth({ headers })` → `createLocalReq({ user }, payload)` (the
 *       SAME pattern the trusted `/api/subscriptions/create` route uses), so the
 *       create runs inside the actor's request and the access cross + tenant
 *       scope apply at the data layer (`overrideAccess: false`);
 *   (b) maps the modal's flat form fields onto the REAL Payload collection fields
 *       (journal-entries / invoices), resolving by lookup where the form gives a
 *       human handle (an `accountCode` string → a `gl-accounts` id; a party NAME →
 *       an `addresses` id) and auto-populating the rest via the collections' own
 *       hooks (tenant, totals, status);
 *   (c) returns a small `{ success, message, id? }` result the modal surfaces via
 *       its existing `onSuccess(message)` / error state. No view-model crosses the
 *       boundary — the widgets stay PURE (they never call these).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes monetary-amount
 * @standard ISO-8601-1:2019 date-time entry-date invoice-date
 * @standard NIST INCITS-359 role-based-access-control
 * @accounting IFRS double-entry-bookkeeping
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail user-action-traceability
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/dashboard/index.tsx                       (the READ twin — same auth/payload pattern)
 * @see src/app/(api)/api/subscriptions/create/route.ts (the canonical req-building pattern)
 * @see src/dashboard/spec/index.ts                   (WIDGETS ARE PURE — why writes live here, not in widgets)
 */

import config from '@payload-config'
import { createLocalReq, getPayload } from 'payload'
import type { Payload, PayloadRequest } from 'payload'
import { headers as nextHeaders } from 'next/headers'
import { tenantIdFromRelation } from '@/tenant'

/** The uniform result every write action returns; the modal maps it to onSuccess / setError. */
export interface ActionResult {
  readonly success: boolean
  readonly message: string
  /** The created document id on success (for callers that want to navigate to it). */
  readonly id?: string
}

/** A single journal line as the modal sends it (amounts already in integer cents). */
export interface JournalEntryLineInput {
  readonly accountCode: string
  readonly debit?: number
  readonly credit?: number
  readonly description?: string
}

export interface JournalEntryInput {
  readonly transactionDate: string
  readonly description: string
  readonly lines: readonly JournalEntryLineInput[]
}

export interface SalesInvoiceInput {
  readonly invoiceNumber: string
  readonly customerName: string
  readonly invoiceDate: string
  readonly dueDate: string
  /** Total amount in integer cents. */
  readonly amount: number
}

export interface VendorBillInput {
  readonly billNumber: string
  readonly vendorName: string
  readonly billDate: string
  readonly dueDate: string
  /** Total amount in integer cents. */
  readonly amount: number
}

// ─── The actor request (the WRITE twin of the read path's req) ───────────────

interface ActorScope {
  readonly payload: Payload
  readonly req: PayloadRequest
  readonly tenantId: string
}

/**
 * Resolve the acting user from the inbound request headers and build a scoped
 * Local API request — exactly the trusted-endpoint pattern in
 * `/api/subscriptions/create`. Throws a plain Error (the caller turns it into a
 * failed ActionResult) when there is no authenticated app user / tenant.
 */
async function actorScope(): Promise<ActorScope> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await nextHeaders() })

  // An API-key principal carries no email/tenant; only an app User may drive these writes.
  if (!user || !('email' in user)) {
    throw new Error('Unauthorized — sign in to record accounting documents.')
  }

  const tenantId = tenantIdFromRelation(user.tenants?.[0]?.tenant)
  if (!tenantId) {
    throw new Error('No tenant associated with your account.')
  }

  const req = await createLocalReq({ user }, payload)
  return { payload, req, tenantId }
}

/** Narrow any thrown value to a user-facing message. */
function asMessage(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback
}

// ─── Field-mapping lookups (human handle → Payload relationship id) ──────────

/**
 * Resolve a chart-of-accounts CODE (the string the journal-entry modal collects)
 * to the `gl-accounts` document id the `lines[].glAccount` relationship requires.
 * Runs in the actor's request so tenant scope applies. Returns null when no
 * account with that number exists in the tenant.
 */
async function findGlAccountId(
  { payload, req, tenantId }: ActorScope,
  accountCode: string,
): Promise<string | null> {
  const { docs } = await payload.find({
    collection: 'gl-accounts',
    where: { and: [{ tenant: { equals: tenantId } }, { accountNumber: { equals: accountCode } }] },
    limit: 1,
    depth: 0,
    req,
    overrideAccess: false,
  })
  // Relationship fields in the generated types accept `string | <Doc>`; ids are
  // serialized as strings there even though the DB id is numeric.
  return docs.length ? String(docs[0].id) : null
}

/**
 * Find — or create — an `addresses` row for a party NAME (the only party handle
 * the invoice/bill modals collect). The `invoices.parties.seller`/`buyer`
 * relationships are REQUIRED, so a name-only form cannot post an invoice without
 * an address id; this resolves the named party to a real row (matched on
 * `company` within the tenant) so the create type-checks and persists.
 *
 * MAPPING STUB (noted in the task): the modals capture ONE party name, but an
 * invoice is a two-party document. Until the modals collect both sides (or the
 * tenant's own legal entity is wired as the implicit counterparty), the resolved
 * named-party address is used for the party the modal is about; the caller fills
 * the opposite side with the same address as a minimal, clearly-flagged stub.
 */
async function findOrCreateAddressByName(
  { payload, req, tenantId }: ActorScope,
  name: string,
): Promise<string> {
  const existing = await payload.find({
    collection: 'addresses',
    where: { and: [{ tenant: { equals: tenantId } }, { company: { equals: name } }] },
    limit: 1,
    depth: 0,
    req,
    overrideAccess: false,
  })
  // Relationship fields in the generated types accept `string | <Doc>`; ids are
  // serialized as strings there even though the DB id is numeric.
  if (existing.docs.length) return String(existing.docs[0].id)

  const created = await payload.create({
    collection: 'addresses',
    data: {
      tenant: tenantId,
      company: name,
      // `country` is the only required scalar on addresses; default to BG (the
      // app's native fiscal locale). Refine when the modals collect an address.
      country: 'BG',
    },
    req,
    overrideAccess: false,
  })
  return String(created.id)
}

// ─── The three write actions (replacing AccountingClient.createX) ────────────

/**
 * Record a manual journal entry (the double-entry GL write). Maps the modal's
 * `lines[].accountCode` strings to `gl-accounts` ids; the collection's own hooks
 * compute `debitTotal`/`creditTotal`/`isBalanced` and enforce the balance
 * invariant, so this action only supplies the raw debit/credit cents.
 */
export async function createJournalEntryAction(input: JournalEntryInput): Promise<ActionResult> {
  try {
    const scope = await actorScope()

    // Resolve every line's account code up front; a missing code is a clear,
    // actionable error rather than a relationship-constraint failure deep in create.
    const lines: Array<{
      lineNumber: number
      glAccount: string
      description?: string
      debit?: number
      credit?: number
    }> = []
    for (let i = 0; i < input.lines.length; i++) {
      const line = input.lines[i]
      const glAccount = await findGlAccountId(scope, line.accountCode)
      if (glAccount == null) {
        return { success: false, message: `Unknown account code "${line.accountCode}".` }
      }
      lines.push({
        lineNumber: i + 1,
        glAccount,
        description: line.description,
        debit: line.debit,
        credit: line.credit,
      })
    }

    const created = await scope.payload.create({
      collection: 'journal-entries',
      data: {
        // entryNumber is required + unique; the modal does not collect one, so we
        // mint a deterministic-ish manual reference. (A numbering service can
        // replace this without touching the modal.)
        entryNumber: `JE-${Date.now()}`,
        entryDate: input.transactionDate,
        description: input.description,
        sourceType: 'manual',
        lines,
      },
      req: scope.req,
      overrideAccess: false,
    })

    return { success: true, message: 'Journal entry created successfully', id: String(created.id) }
  } catch (err) {
    return { success: false, message: asMessage(err, 'Failed to create journal entry') }
  }
}

/**
 * Record a sales invoice (`invoices` with `invoiceType: 'invoice'`). The modal's
 * `customerName` resolves to the BUYER address; the SELLER is stubbed to the same
 * address until the form captures both parties (see findOrCreateAddressByName).
 * Amount is in cents; it lands on both the required line/total fields.
 */
export async function createSalesInvoiceAction(input: SalesInvoiceInput): Promise<ActionResult> {
  try {
    const scope = await actorScope()
    const buyer = await findOrCreateAddressByName(scope, input.customerName)

    const created = await scope.payload.create({
      collection: 'invoices',
      data: {
        number: input.invoiceNumber,
        status: 'issued',
        typeStatus: { invoiceType: 'invoice' },
        // STUB: one-party form → seller reuses the buyer address until the modal
        // collects the selling legal entity.
        parties: { seller: buyer, buyer },
        dates: { date: input.invoiceDate, dueAt: input.dueDate },
        amounts: { itemTotal: input.amount, totalAmount: input.amount, totalDue: input.amount },
        billingTax: { currencyCode: 'EUR' },
      },
      req: scope.req,
      overrideAccess: false,
    })

    return {
      success: true,
      message: `Invoice ${input.invoiceNumber} created successfully`,
      id: String(created.id),
    }
  } catch (err) {
    return { success: false, message: asMessage(err, 'Failed to create invoice') }
  }
}

/**
 * Record a vendor bill (`invoices` with `invoiceType: 'bill'`). The modal's
 * `vendorName` resolves to the SELLER address; the BUYER (us) is stubbed to the
 * same address until the form captures our own legal entity.
 */
export async function createVendorBillAction(input: VendorBillInput): Promise<ActionResult> {
  try {
    const scope = await actorScope()
    const seller = await findOrCreateAddressByName(scope, input.vendorName)

    const created = await scope.payload.create({
      collection: 'invoices',
      data: {
        number: input.billNumber,
        status: 'issued',
        typeStatus: { invoiceType: 'bill' },
        // STUB: one-party form → buyer reuses the seller address until the modal
        // collects our own legal entity.
        parties: { seller, buyer: seller },
        dates: { date: input.billDate, dueAt: input.dueDate },
        amounts: { itemTotal: input.amount, totalAmount: input.amount, totalDue: input.amount },
        billingTax: { currencyCode: 'EUR' },
      },
      req: scope.req,
      overrideAccess: false,
    })

    return {
      success: true,
      message: `Bill ${input.billNumber} created successfully`,
      id: String(created.id),
    }
  } catch (err) {
    return { success: false, message: asMessage(err, 'Failed to create bill') }
  }
}
