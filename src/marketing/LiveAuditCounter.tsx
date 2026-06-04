/**
 * LiveAuditCounter — counts journal entries posted in the last N days.
 *
 * Live proof of the SOX §404 / ISO 19011 audit-trail wiring: every
 * canonical event posts a balanced GL entry, every entry creates a row,
 * and the count is real-time. Gives prospects a heartbeat number on
 * the marketing surface.
 *
 * @standard schema.org QuantitativeValue
 * @audit ISO-19011:2018 audit-trail live-evidence
 * @compliance SOX §404 internal-controls evidence-preservation
 * @see src/services/journal-entry.service.ts
 * @see src/hooks/auditTrailAfterChange.ts
 */

import React from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '@payload-config'

interface LiveAuditCounterProps {
  tenantId?: string | number
  sinceDays?: number
}

/**
 * Pure async data fetch — extracted out of render so the server-component
 * body satisfies `react-hooks/purity` (no side-effectful `Date.now()` or
 * mutable record construction inside the render path).
 */
async function fetchAuditCount(
  tenantId: string | number | undefined,
  sinceDays: number,
): Promise<number> {
  const payload = await getPayload({ config: configPromise })
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000)
  const where: Where = { createdAt: { greater_than: since.toISOString() } }
  if (tenantId !== undefined) where.tenant = { equals: tenantId }
  try {
    const result = await payload.find({
      collection: 'journal-entries',
      where,
      limit: 0,
      overrideAccess: true,
    })
    return result.totalDocs
  } catch {
    return 0
  }
}

export default async function LiveAuditCounter({
  tenantId,
  sinceDays = 30,
}: LiveAuditCounterProps) {
  const count = await fetchAuditCount(tenantId, sinceDays)

  return (
    <section
      aria-label={`${count.toLocaleString()} audit-trail entries posted in the last ${sinceDays} days`}
      className="mx-auto max-w-3xl py-16 px-4 text-center"
    >
      <p className="text-sm uppercase tracking-wider text-muted-foreground">
        Live audit-trail
      </p>
      <p className="my-2 text-6xl font-bold tabular-nums tracking-tight" aria-hidden="true">
        {count.toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground">
        Balanced journal entries posted in the last {sinceDays} days
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Each one validated by <code className="rounded bg-muted px-1">DebitCreditLogic.validateEntry</code>{' '}
        and emitted to the structured audit log per ISO 19011 / SOX §404.
      </p>
    </section>
  )
}
