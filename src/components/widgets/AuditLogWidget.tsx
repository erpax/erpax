import React, { useState, useEffect, useCallback } from 'react';
import { AccountingClient } from '../../sdk/accounting-client';

/**
 * Audit log viewer widget — read-only timeline of administrative actions.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @audit ISO-19011:2018 audit-trail viewer
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.4
 */


interface AuditLogEntry {
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

interface AuditLogWidgetProps {
  client: AccountingClient;
  startDate: string;
  endDate: string;
}

const AuditLogWidget: React.FC<AuditLogWidgetProps> = ({
  client,
  startDate,
  endDate,
}) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadAuditLog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await client.getAuditTrail(startDate, endDate);
      if (response.success && response.data) {
        setLogs(response.data.entries || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit log');
    } finally {
      setLoading(false);
    }
  }, [client, startDate, endDate]);

  useEffect(() => {
    loadAuditLog();
  }, [loadAuditLog]);

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'text-green-700 bg-green-50';
      case 'update':
        return 'text-blue-700 bg-blue-50';
      case 'delete':
        return 'text-red-700 bg-red-50';
      case 'approve':
        return 'text-purple-700 bg-purple-50';
      case 'reject':
        return 'text-orange-700 bg-orange-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType.toLowerCase()) {
      case 'journalentry':
        return '📓';
      case 'salesinvoice':
        return '📄';
      case 'vendorbill':
        return '📋';
      case 'user':
        return '👤';
      default:
        return '📌';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Audit Trail</h2>
        <p className="text-gray-500">Loading audit log...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Audit Trail</h2>
        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Export
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      {logs.length === 0 ? (
        <p className="text-gray-500">No audit log entries found for this period</p>
      ) : (
        <div className="space-y-2">
          {logs.map((entry) => (
            <div key={entry.id} className="border border-gray-200 rounded">
              <button
                onClick={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
                className="w-full text-left p-3 hover:bg-gray-50 flex justify-between items-center"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">
                    {getResourceIcon(entry.resourceType)}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getActionColor(entry.action)}`}>
                        {entry.action.toUpperCase()}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {entry.resourceType}
                      </span>
                      <span className="text-sm text-gray-600">{entry.resourceId}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {entry.userEmail} at{' '}
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-gray-400">
                  {expandedId === entry.id ? '▼' : '▶'}
                </span>
              </button>

              {expandedId === entry.id && entry.changes && (
                <div className="bg-gray-50 border-t p-3 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    {entry.changes.before && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          Before
                        </h4>
                        <pre className="bg-white p-2 rounded border border-gray-200 overflow-x-auto text-gray-600">
                          {JSON.stringify(entry.changes.before, null, 2)}
                        </pre>
                      </div>
                    )}
                    {entry.changes.after && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                          After
                        </h4>
                        <pre className="bg-white p-2 rounded border border-gray-200 overflow-x-auto text-gray-600">
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

      <div className="text-xs text-gray-500 mt-4">
        Showing {logs.length} entries from{' '}
        {new Date(startDate).toLocaleDateString()} to{' '}
        {new Date(endDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default AuditLogWidget;
