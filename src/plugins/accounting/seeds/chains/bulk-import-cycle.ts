/**
 * Bulk import cycle — canonical seed (Slice XXXX rewrite).
 *
 * File enqueued → per-row processed → failures land in transaction-failures
 * → reprocess loop until clean. Demonstrates the IIII bulk-ops contract
 * + SOX §404 TOM-FAIL-01 retry/disposition trail.
 *
 * XXXX (2026-05-10): rewritten against the REAL TransactionFailures
 * schema (sourceType / sourceCollection / sourceId / reason / statusCode /
 * errorPayload / retryCount / maxRetries / nextRetryAt / lastRetryAt /
 * resolvedBy / resolution). The envelope/row relationship is captured in
 * `errorPayload.envelope` rather than a separate FK column — keeps the
 * forensic trail complete without inventing a column the schema doesn't have.
 *
 * @standard rfc-4180 csv
 * @standard SOX §404 TOM-FAIL-01 retry-and-disposition
 * @standard ISO 19011:2018 §6.4.6
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)

const enqueue: ChainStepImpl = async (payload, ctx, state) => {
  // Track the envelope as a parent TransactionFailures row with statusCode='0'
  // (ENV) and reason='envelope_enqueued'. Subsequent row-failures reference
  // its `reference` via errorPayload.envelopeRef.
  const envRef = `BULK-OP-${ts()}`
  const op = await payload.create({
    collection: 'transaction-failures',
    data: {
      tenant: ctx.tenantId,
      reference: envRef,
      transactionDate: new Date().toISOString(),
      sourceType: 'other',
      sourceCollection: 'invoices',
      reason: 'envelope_enqueued',
      statusCode: '0',
      errorPayload: { format: 'csv', rowCount: 3, source: 'chain-test.csv', envelope: true },
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.envelopeId = op.id
  state.envelopeRef = envRef
  return 'bulk:enqueued'
}

const processRows: ChainStepImpl = async (payload, ctx, state) => {
  // Simulate 3 rows: 2 succeed silently (no failure row), 1 fails (creates a TF row).
  const failure = await payload.create({
    collection: 'transaction-failures',
    data: {
      tenant: ctx.tenantId,
      reference: `BULK-FAIL-${ts()}`,
      transactionDate: new Date().toISOString(),
      sourceType: 'einvoice_submission',
      sourceCollection: 'invoices',
      reason: 'Invalid totalAmount: not a number',
      statusCode: '422',
      errorPayload: {
        envelopeRef: state.envelopeRef,
        envelopeId: state.envelopeId,
        rowIndex: 2,
        row: { invoiceNumber: 'INV-bad-amount', totalAmount: 'NaN' },
      },
      retryCount: 0,
      maxRetries: 5,
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.failureId = failure.id
  return 'bulk:processed'
}

const reprocess: ChainStepImpl = async (payload, ctx, state) => {
  // Operator fixes the row + re-runs it; mark the failure as resolved.
  await payload.update({
    collection: 'transaction-failures',
    id: state.failureId as string,
    data: {
      status: 'resolved',
      retryCount: 1,
      lastRetryAt: new Date().toISOString(),
      resolvedBy: ctx.userId,
      resolution: 'Operator corrected totalAmount and re-ran row',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'bulk:reprocessed'
}

export const bulkImportCycleImpls: ChainImpls = [enqueue, processRows, reprocess]
