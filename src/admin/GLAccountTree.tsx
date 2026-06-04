/**
 * GL Account Tree Component
 * Displays hierarchical chart of accounts with expandable nodes
 */

'use client';

import React, { useState } from 'react';
import { GLAccountNode, GLAccount } from '@/types/gl-account';
import { ChevronDown, ChevronRight, Plus, Edit2, Lock, Unlock, Trash2 } from 'lucide-react';

interface GLAccountTreeProps {
  nodes: GLAccountNode[];
  onSelectAccount: (account: GLAccount) => void;
  onEditAccount: (account: GLAccount) => void;
  onDeleteAccount: (account: GLAccount) => void;
  onToggleLock: (account: GLAccount) => void;
  onCreateChild: (parentId: string) => void;
}

interface ExpandedState {
  [nodeId: string]: boolean;
}

export default function GLAccountTree({
  nodes,
  onSelectAccount,
  onEditAccount,
  onDeleteAccount,
  onToggleLock,
  onCreateChild,
}: GLAccountTreeProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const toggleExpand = (nodeId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const renderNode = (node: GLAccountNode, depth: number = 0) => {
    const isExpanded = expanded[node.id];
    const hasChildren = node.children && node.children.length > 0;

    const statusColors = {
      active: 'text-green-700 bg-green-50',
      inactive: 'text-gray-700 bg-gray-50',
      locked: 'text-red-700 bg-red-50',
    };

    return (
      <div key={node.id}>
        {/* Node Row */}
        <div
          className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 border-b ${statusColors[node.status]}`}
          style={{ paddingLeft: `${16 + depth * 24}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(node.id)}
              className="text-gray-600 hover:text-gray-900 p-1"
            >
              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          ) : (
            <div className="w-7" />
          )}

          {/* Account Info */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelectAccount(node)}>
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-sm min-w-fit">{node.code}</span>
              <span className="text-gray-900 truncate">{node.name}</span>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 whitespace-nowrap">
                {node.type}
              </span>
            </div>
            {node.description && (
              <p className="text-xs text-gray-500 mt-1">{node.description}</p>
            )}
          </div>

          {/* Balance */}
          {node.balance !== undefined && (
            <div className="text-sm font-mono text-right min-w-fit">
              {node.balance > 0 ? (
                <span className="text-green-600">{node.balance.toFixed(2)}</span>
              ) : node.balance < 0 ? (
                <span className="text-red-600">{node.balance.toFixed(2)}</span>
              ) : (
                <span className="text-gray-600">-</span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditAccount(node);
              }}
              className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLock(node);
              }}
              className={`p-1 rounded ${
                node.locked
                  ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'
                  : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={node.locked ? 'Unlock' : 'Lock'}
            >
              {node.locked ? <Unlock size={16} /> : <Lock size={16} />}
            </button>

            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateChild(node.id);
                }}
                className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded"
                title="Add child account"
              >
                <Plus size={16} />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteAccount(node);
              }}
              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="divide-y">
      {nodes.length === 0 ? (
        <div className="px-4 py-8 text-center text-gray-600">
          No accounts found
        </div>
      ) : (
        nodes.map((node) => renderNode(node, 0))
      )}
    </div>
  );
}
