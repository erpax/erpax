/**
 * Batch Actions Bar Component
 * Displays batch action options when hosts are selected
 * Similar to Ruby ERPAX batch actions UI
 */

'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface BatchActionsBarProps {
  selectedCount: number;
  onAction: (action: string) => Promise<void>;
  loading: boolean;
}

export default function BatchActionsBar({
  selectedCount,
  onAction,
  loading,
}: BatchActionsBarProps) {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);

  const actions = [
    { id: 'activate', label: 'Activate', color: 'green' },
    { id: 'suspend', label: 'Suspend', color: 'yellow' },
    { id: 'resetStatus', label: 'Reset Status', color: 'blue' },
    { id: 'enableSSL', label: 'Enable SSL', color: 'blue' },
    { id: 'disableSSL', label: 'Disable SSL', color: 'gray' },
  ];

  const handleActionClick = async (actionId: string) => {
    setSelectedAction(actionId);
    try {
      await onAction(actionId);
    } finally {
      setSelectedAction(null);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-blue-900">
        <AlertCircle size={20} />
        <span className="font-medium">
          {selectedCount} host{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            disabled={loading || selectedAction !== null}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white transition
              ${
                action.color === 'green'
                  ? 'bg-green-600 hover:bg-green-700'
                  : action.color === 'yellow'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : action.color === 'blue'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-600 hover:bg-gray-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {selectedAction === action.id ? 'Processing...' : action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
