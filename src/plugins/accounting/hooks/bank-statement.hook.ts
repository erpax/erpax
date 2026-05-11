/**
 * Bank Statement Import Hook — emits `bank:statement:imported` so
 * `glPostingService.postBankStatementImported` can book a JE for every
 * transaction line in the statement (Dr/Cr Cash per debit/credit kind).
 *
 * Slice LLL (2026-05-10): closes the GL-handler-is-dead-code gap.
 * `glPostingService` declared the subscription pre-Slice-CCC but no
 * collection hook ever fired the matching event, so every CSV / OFX
 * import landed silently with no GL impact.
 *
 * Pattern learnt from `invoice.hook.ts` + `bill.hook.ts`:
 *   - `CollectionAfterChangeHook`
 *   - Resolve `tenant` from doc relationship object
 *   - Build typed event with `eventId = uuid()` + ISO 8601 timestamp
 *   - Delegate try/catch + structured logger to `emitDomainEvent`
 *
 * Fires only on `create` — re-saves of an existing statement
 * (reconciliation status updates, etc.) don't re-emit.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time statement-date transaction-date
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail bank-statement-import
 * @compliance SOX §404 internal-controls cash-management
 * @see src/services/gl-posting.service.ts postBankStatementImported
 * @see docs/STANDARDS.md §4.1
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'
import { emitDomainEvent } from '@/services/emit-domain-event'
import type {
  BankStatementImportedEvent,
  BankStatementTransaction,
} from '@/types/events'

interface BankStatementDocLike {
  id: string | number
  tenant?: string | number | { id: string | number } | null
  statementId?: string | null
  bankAccount?: string | number | { id: string | number; accountNumber?: string } | null
  statementDate?: string | Date | null
  openingBalance?: number | null
  closingBalance?: number | null
  currency?: string | null
  transactions?: Array<{
    id?: string | number
    transactionDate?: string | Date | null
    amount?: number | null
    description?: string | null
    reference?: string | null
    balanceAfter?: number | null
  }> | null
}

const refId = (v: BankStatementDocLike['bankAccount']): string => {
  if (v === undefined || v === null) return ''
  return typeof v === 'object' ? String(v.id) : String(v)
}

const accountNumberOf = (v: BankStatementDocLike['bankAccount']): string => {
  if (v && typeof v === 'object' && 'accountNumber' in v && v.accountNumber) {
    return String(v.accountNumber)
  }
  return refId(v)
}

const asDate = (v: string | Date | null | undefined, fallback: Date): Date => {
  if (v instanceof Date) return v
  if (typeof v === 'string' && v.length > 0) {
    const d = new Date(v)
    if (!Number.isNaN(d.getTime())) return d
  }
  return fallback
}

const toTransaction = (
  raw: NonNullable<BankStatementDocLike['transactions']>[number],
  fallbackDate: Date,
): BankStatementTransaction => {
  const amount = Number(raw.amount ?? 0)
  return {
    id: String(raw.id ?? uuid()),
    date: asDate(raw.transactionDate, fallbackDate),
    description: String(raw.description ?? ''),
    amount: Math.abs(amount),
    balance: Number(raw.balanceAfter ?? 0),
    type: amount < 0 ? 'debit' : 'credit',
    referenceNumber: raw.reference ? String(raw.reference) : undefined,
  }
}

export const bankStatementImportedHook: CollectionAfterChangeHook = async ({
  doc: rawDoc,
  req,
  operation,
}) => {
  if (operation !== 'create') return rawDoc
  const doc = rawDoc as BankStatementDocLike
  if (!doc) return doc

  const tenantId = refId(doc.tenant as BankStatementDocLike['bankAccount'])
  const userId = req.user?.id ? String(req.user.id) : 'system'
  if (!tenantId) return doc

  const statementDate = asDate(doc.statementDate, new Date())
  const transactions = (doc.transactions ?? []).map((t) =>
    toTransaction(t, statementDate),
  )

  const event: BankStatementImportedEvent = {
    eventId: uuid(),
    eventType: 'bank:statement:imported',
    tenantId,
    aggregateId: String(doc.id),
    aggregateType: 'bank_statement',
    timestamp: new Date(),
    userId,
    payload: {
      statementId: String(doc.statementId ?? doc.id),
      accountNumber: accountNumberOf(doc.bankAccount),
      statementDate,
      transactions,
      openingBalance: Number(doc.openingBalance ?? 0),
      closingBalance: Number(doc.closingBalance ?? 0),
      currencyCode: String(doc.currency ?? 'EUR').toUpperCase(),
    },
  }

  await emitDomainEvent(req, event, String(doc.statementId ?? doc.id))
  return doc
}
