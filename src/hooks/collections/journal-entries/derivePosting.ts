/**
 * journal/entries/posting — the ledger posting is derived from the posted journal entry.
 *
 * A ledger posting restates a journal entry: its date, its source, and one line per account with
 * the debit and credit. Every field is already on the entry, so a posting typed by hand is a
 * second copy that can disagree with the first. Here the posting is computed when an entry becomes
 * `posted`, and never otherwise.
 *
 * `postingFor` is pure — the entry in, the posting out. `derivePosting` is the hook: on the
 * transition to `posted` it creates the posting if the entry has none, passing the request so the
 * write joins the entry's transaction where the database has one. A refusal by the posting's own
 * validation (an unresolved fiscal period, an unbalanced entry) is NOT swallowed: an entry that
 * cannot be posted to the ledger has not been posted, and saying otherwise is the silent success
 * this corpus has paid for before.
 *
 * @invariant a posting's totals equal its entry's: Σ debitAmount = debitTotal, Σ creditAmount = creditTotal
 * @invariant one posted entry has exactly one posting — saving it again creates no second one
 * @accounting double-entry bookkeeping — the posting inherits the entry's balance, it cannot break it
 * @see ./SKILL.md
 */
import type { CollectionAfterChangeHook } from 'payload'
import type { GlPosting, JournalEntry } from '@/payload-types'

/**
 * The entry's source, named as the ledger names it. DECLARED, because the two option lists were
 * written separately and no rule derives one from the other: a lease period is posted as the
 * period-end accrual it is, and a bank reconciliation is sourced from the statement it reconciles.
 */
const SOURCE: Record<JournalEntry['sourceType'], GlPosting['sourceType']> = {
  manual: 'manual_entry',
  invoice: 'invoice',
  bill: 'bill',
  payment: 'payment',
  bank_reconciliation: 'bank_statement',
  period_end_adjustment: 'period_end_adjustment',
  tax_calculation: 'tax_calculation',
  currency_adjustment: 'currency_revaluation',
  lease_period: 'period_end_adjustment',
}

const idOf = (v: unknown): string | undefined =>
  typeof v === 'string' ? v : v && typeof v === 'object' && typeof (v as { id?: unknown }).id === 'string' ? (v as { id: string }).id : undefined

/** The posting a journal entry determines. Nothing here is a choice. */
export function postingFor(entry: Pick<JournalEntry, 'id' | 'entryDate' | 'sourceType' | 'sourceId' | 'lines' | 'tenant'>) {
  const tenant = idOf(entry.tenant)
  return {
    postingId: `GLP-${entry.id}`,
    sourceType: SOURCE[entry.sourceType],
    sourceId: entry.sourceId ?? entry.id,
    sourceDate: entry.entryDate,
    journalEntry: entry.id,
    status: 'posted' as const,
    accountsAffected: entry.lines.map((l) => ({
      glAccount: idOf(l.glAccount) ?? '',
      accountNumber: l.accountNumber ?? null,
      accountName: l.accountName ?? null,
      debitAmount: l.debit ?? 0,
      creditAmount: l.credit ?? 0,
      currency: l.currency ?? null,
    })),
    ...(tenant === undefined ? {} : { tenant }),
  }
}

/** After a journal entry is saved: on the transition to `posted`, write its ledger posting once. */
export const derivePosting: CollectionAfterChangeHook<JournalEntry> = async ({ doc, previousDoc, req, context }) => {
  if (context.postingDerived || doc.status !== 'posted' || previousDoc?.status === 'posted') return doc
  const existing = await req.payload.find({
    collection: 'gl-postings',
    where: { journalEntry: { equals: doc.id } },
    depth: 0,
    limit: 1,
    req,
    select: { postingId: true },
  })
  if (existing.docs.length > 0) return doc
  const posting = postingFor(doc)
  // The posting's period check resolves the fiscal calendar from the posting date and the legal
  // entity; neither is stored on the posting. A journal entry does not name its legal entity, so a
  // tenant with exactly one is posted to that one. With none or several the tenant id is passed
  // and the period check refuses the posting — it is never guessed.
  const entities =
    posting.tenant === undefined
      ? { docs: [] }
      : await req.payload.find({ collection: 'legal-entities', where: { tenant: { equals: posting.tenant } }, depth: 0, limit: 2, req, select: {} })
  const entity = entities.docs.length === 1 ? entities.docs[0]!.id : posting.tenant
  await req.payload.create({
    collection: 'gl-postings',
    data: { ...posting, postingDate: doc.entryDate, entity } as typeof posting,
    depth: 0,
    req,
    context: { postingDerived: true },
  })
  return doc
}
