import React, { useState } from 'react'
import type { DashboardContext, LocalApiSource, WidgetSpec } from '@/dashboard/spec'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/ui'

/**
 * Audit log viewer widget — read-only timeline of administrative actions.
 *
 * PURE WIDGET (the dashboard/spec contract): it receives an already-resolved,
 * typed `AuditLogData` view-model and renders it; it NEVER fetches. The previous
 * shape self-fetched via the REST `AccountingClient.getAuditTrail` (a browser
 * Bearer token + a hardcoded `localhost` baseUrl — the corpus violation). The
 * data now flows from the `audit-events` collection through the `auditLogSource`
 * localApi DataSource below, resolved SERVER-side by `resolveDashboard` (under the
 * actor's request, `overrideAccess:false`), and projected into this view-model.
 * It is a LIVE candidate — compose it with `live: true` (see `auditLogWidget`).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @audit ISO-19011:2018 audit-trail viewer
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls
 * @see src/dashboard/spec/index.ts  (WIDGETS ARE PURE — the DataSource/resolver framework)
 * @see src/audit/events/index.ts    (the audit-events collection — the source of record)
 */

/** One administrative action in the audit timeline (the render-time projection). */
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changes?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
  };
  ipAddress?: string;
}

/** The resolved view-model this pure widget renders. */
export interface AuditLogData {
  entries: AuditLogEntry[];
  startDate: string;
  endDate: string;
}

/** Shape of the audit-events rows the projection reads (only the fields it uses). */
interface AuditEventDoc {
  id: string | number;
  timestamp?: string;
  createdAt?: string;
  operation?: string;
  eventType?: string;
  collectionSlug?: string;
  documentId?: string;
  user?: unknown;
  changeSummary?: { before?: Record<string, unknown>; after?: Record<string, unknown> } | null;
}

/** Resolve the (possibly-populated) `user` relationship to an email + id pair. */
function projectActor(user: unknown): { userId: string; userEmail: string } {
  if (user && typeof user === 'object') {
    const u = user as { id?: unknown; email?: unknown };
    return {
      userId: u.id != null ? String(u.id) : '',
      userEmail: typeof u.email === 'string' ? u.email : '',
    };
  }
  return { userId: user != null ? String(user) : '', userEmail: '' };
}

/** Project one `audit-events` row into the widget's `AuditLogEntry`. */
function projectAuditEvent(doc: AuditEventDoc): AuditLogEntry {
  const { userId, userEmail } = projectActor(doc.user);
  return {
    id: String(doc.id),
    timestamp: doc.timestamp ?? doc.createdAt ?? '',
    userId,
    userEmail,
    action: doc.operation ?? doc.eventType ?? 'update',
    resourceType: doc.collectionSlug ?? '',
    resourceId: doc.documentId ?? '',
    changes: doc.changeSummary ?? undefined,
  };
}

/**
 * The localApi DataSource backing the audit widget — reads the durable
 * `audit-events` collection (the SOX §404 / ISO 19011 evidence trail) via the
 * Payload Local API for the context's tenant + as-of window, newest first, and
 * projects each row into the pure view-model. Runs in the actor's request so
 * tenant scope + the access cross apply (`overrideAccess:false`).
 */
export const auditLogSource: LocalApiSource<AuditLogData> = {
  kind: 'localApi',
  load: async (ctx: DashboardContext): Promise<AuditLogData> => {
    const startDate = ctx.periodStart.toISOString();
    const endDate = ctx.asOfDate.toISOString();
    const { docs } = await ctx.payload.find({
      collection: 'audit-events',
      where: {
        and: [
          { tenant: { equals: ctx.tenantId } },
          { timestamp: { greater_than_equal: startDate } },
          { timestamp: { less_than_equal: endDate } },
        ],
      },
      sort: '-timestamp',
      depth: 1,
      limit: 200,
      req: ctx.req,
      overrideAccess: false,
    });
    return {
      entries: (docs as unknown as AuditEventDoc[]).map(projectAuditEvent),
      startDate,
      endDate,
    };
  },
};

const AuditLogWidget: React.FC<{ data: AuditLogData | null }> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const logs = data?.entries ?? [];
  const startDate = data?.startDate ?? '';
  const endDate = data?.endDate ?? '';

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'text-success bg-green-50';
      case 'update':
        return 'text-blue-700 bg-blue-50';
      case 'delete':
        return 'text-error bg-red-50';
      case 'approve':
        return 'text-purple-700 bg-purple-50';
      case 'reject':
        return 'text-orange-700 bg-orange-50';
      default:
        return 'text-gray-700 bg-muted';
    }
  };

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType.toLowerCase()) {
      case 'journal-entries':
      case 'journalentry':
        return '📓';
      case 'invoices':
      case 'salesinvoice':
        return '📄';
      case 'vendorbill':
        return '📋';
      case 'users':
      case 'user':
        return '👤';
      default:
        return '📌';
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Audit Trail</CardTitle>
        <Button type="button" size="sm">
          Export
        </Button>
      </CardHeader>
      <CardContent>

      {logs.length === 0 ? (
        <p className="text-muted-foreground">No audit log entries found for this period</p>
      ) : (
        <div className="space-y-2">
          {logs.map((entry) => (
            <div key={entry.id} className="border border-border rounded">
              <button
                onClick={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
                className="w-full text-left p-3 hover:bg-muted flex justify-between items-center"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">
                    {getResourceIcon(entry.resourceType)}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getActionColor(entry.action)}>
                        {entry.action.toUpperCase()}
                      </Badge>
                      <span className="font-semibold text-gray-900">
                        {entry.resourceType}
                      </span>
                      <span className="text-sm text-muted-foreground">{entry.resourceId}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {entry.userEmail} at{' '}
                      {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : '—'}
                    </div>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  {expandedId === entry.id ? '▼' : '▶'}
                </span>
              </button>

              {expandedId === entry.id && entry.changes && (
                <div className="bg-muted border-t p-3 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    {entry.changes.before && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          Before
                        </h4>
                        <pre className="bg-white p-2 rounded border border-border overflow-x-auto text-muted-foreground">
                          {JSON.stringify(entry.changes.before, null, 2)}
                        </pre>
                      </div>
                    )}
                    {entry.changes.after && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          After
                        </h4>
                        <pre className="bg-white p-2 rounded border border-border overflow-x-auto text-muted-foreground">
                          {JSON.stringify(entry.changes.after, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

        <p className="text-muted-foreground mt-4 text-xs">
          Showing {logs.length} entries
          {startDate && endDate ? (
            <>
              {' '}
              from {new Date(startDate).toLocaleDateString()} to{' '}
              {new Date(endDate).toLocaleDateString()}
            </>
          ) : null}
        </p>

      </CardContent>
    </Card>
  )
}

export default AuditLogWidget;

/** Composable spec: audit-overlay widget, LIVE (re-requests the loader each tick). */
export const auditLogWidget: WidgetSpec<AuditLogData> = {
  id: 'audit-log',
  Component: AuditLogWidget,
  source: auditLogSource,
  minCapability: 'audit',
  title: 'Audit Trail',
  live: true,
  lane: 'tailwind',
};
