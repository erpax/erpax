/**
 * MCP Consistency Status — live drift-entropy dashboard.
 *
 * Slice FFFFFFFFF-cont (2026-05-11). Polls `/api/mcp/status` every 30s
 * and shows:
 *
 *   - Top-level readiness flag (clean / drift-detected / errors)
 *   - Pass/warn/fail counts across the invariant suite
 *   - Last N applied fixes (proposals) with rationale + auto-apply flag
 *   - Compact trend sparkline (when memories.drift_snapshot history
 *     is available; deferred to a future cut)
 *
 * Renders as a self-contained admin page surfaced via /admin/mcp/status.
 *
 * @standard W3C-WAI-ARIA-1.2 status pattern
 * @standard WCAG 2.1 AA contrast for readiness flag colors
 * @audit Slice KKKKKKKK erpax.consistency.status MCP tool (mirrored)
 */
'use client'

import * as React from 'react'
import { createPollingStore } from './createPollingStore'

interface StatusResponse {
  readonly at: string
  readonly readiness: 'clean' | 'drift-detected' | 'errors'
  readonly suiteSummary?: { fails: number; warns: number; passes: number }
  readonly suiteError?: string
  readonly recentApplies: ReadonlyArray<{
    invariant: string
    severity: 'warn' | 'fail'
    proposedTool: string
    autoApply: boolean
    rationale: string
  }>
}

const POLL_MS = 30_000

// Module-singleton polling store. Polling starts on first mount and
// stops when the last component unmounts (see createPollingStore.ts).
const statusStore = createPollingStore<StatusResponse>('/api/mcp/status', POLL_MS)

export function ConsistencyStatus(): React.JSX.Element {
  // useSyncExternalStore is React 19's canonical pattern for subscribing
  // to mutable external state. setState happens inside the store, not
  // in any effect — no lint rule fires.
  const { data, error, refreshing } = React.useSyncExternalStore(
    statusStore.subscribe,
    statusStore.getSnapshot,
    statusStore.getServerSnapshot,
  )
  const fetchStatus = React.useCallback(() => statusStore.refetch(), [])

  if (error && !data) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-destructive">Status unavailable</h1>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </main>
    )
  }
  if (!data) {
    return (
      <main className="container mx-auto p-6" aria-busy="true">
        <p className="text-sm text-muted-foreground">Loading consistency status…</p>
      </main>
    )
  }

  const readinessTone =
    data.readiness === 'clean'           ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
    : data.readiness === 'drift-detected' ? 'bg-amber-500/15  text-amber-700  border-amber-500/30'
    :                                       'bg-destructive/15 text-destructive border-destructive/30'

  return (
    <main className="container mx-auto p-6" aria-labelledby="status-heading">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 id="status-heading" className="text-3xl font-semibold">Consistency Status</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last sweep: <time dateTime={data.at}>{new Date(data.at).toLocaleString()}</time>
          </p>
        </div>
        <button
          type="button"
          onClick={fetchStatus}
          disabled={refreshing}
          aria-busy={refreshing}
          className="rounded border px-3 py-1.5 text-sm hover:bg-accent transition-colors disabled:opacity-50"
        >
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </header>

      <section
        role="status"
        aria-live="polite"
        className={`rounded-lg border p-4 mb-6 ${readinessTone}`}
      >
        <p className="text-lg font-medium capitalize">{data.readiness.replace('-', ' ')}</p>
        {data.suiteSummary && (
          <p className="text-sm mt-2">
            {data.suiteSummary.passes} pass • {data.suiteSummary.warns} warn • {data.suiteSummary.fails} fail
          </p>
        )}
        {data.suiteError && <p className="text-sm mt-2 font-mono">{data.suiteError}</p>}
      </section>

      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="text-xl font-medium mb-3">
          Recent fixes proposed{' '}
          <span className="text-sm text-muted-foreground">({data.recentApplies.length})</span>
        </h2>
        {data.recentApplies.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent proposals — corpus is at zero drift.</p>
        ) : (
          <ul className="space-y-3">
            {data.recentApplies.map((p, i) => (
              <li
                key={`${p.invariant}-${i}`}
                className="rounded-lg border bg-card text-card-foreground p-3"
              >
                <header className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-mono text-sm">{p.invariant}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        p.severity === 'fail'
                          ? 'text-xs px-2 py-0.5 rounded bg-destructive/15 text-destructive'
                          : 'text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-700'
                      }
                    >
                      {p.severity}
                    </span>
                    {p.autoApply && (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700">
                        auto-applied
                      </span>
                    )}
                  </div>
                </header>
                <p className="text-sm text-muted-foreground">{p.rationale}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  → {p.proposedTool}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ConsistencyStatus
