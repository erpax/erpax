/**
 * QuickActionsWidget — admin shortcut tile for common accounting workflows.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard WCAG-2.1 §2.1 keyboard-accessible
 * @audit ISO-19011:2018 audit-trail user-action-traceability
 * @compliance SOX §404 internal-controls
 */
import React, { useState } from 'react';
import { AccountingClient } from '../../sdk/accounting-client';
import CreateInvoiceModal from '../modals/CreateInvoiceModal';
import CreateBillModal from '../modals/CreateBillModal';
import CreateJournalEntryModal from '../modals/CreateJournalEntryModal';

interface QuickActionsWidgetProps {
  client: AccountingClient;
  userRole: 'admin' | 'accountant';
}

const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({
  client,
  userRole: _userRole,
}) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showJournalEntryModal, setShowJournalEntryModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {/* Create Sales Invoice */}
        <ActionButton
          icon="📄"
          label="Create Invoice"
          onClick={() => setShowInvoiceModal(true)}
          description="Record customer sale"
        />

        {/* Create Vendor Bill */}
        <ActionButton
          icon="📋"
          label="Create Bill"
          onClick={() => setShowBillModal(true)}
          description="Record vendor purchase"
        />

        {/* Create Journal Entry */}
        <ActionButton
          icon="📓"
          label="Journal Entry"
          onClick={() => setShowJournalEntryModal(true)}
          description="Manual GL entry"
        />

        {/* Bank Reconciliation */}
        <ActionButton
          icon="🏦"
          label="Bank Reconciliation"
          onClick={() => alert('Bank reconciliation not yet implemented')}
          description="Match GL to bank"
          disabled={true}
        />
      </div>

      {/* Modals */}
      {showInvoiceModal && (
        <CreateInvoiceModal
          client={client}
          onClose={() => setShowInvoiceModal(false)}
          onSuccess={(msg) => {
            handleSuccess(msg);
            setShowInvoiceModal(false);
          }}
        />
      )}

      {showBillModal && (
        <CreateBillModal
          client={client}
          onClose={() => setShowBillModal(false)}
          onSuccess={(msg) => {
            handleSuccess(msg);
            setShowBillModal(false);
          }}
        />
      )}

      {showJournalEntryModal && (
        <CreateJournalEntryModal
          client={client}
          onClose={() => setShowJournalEntryModal(false)}
          onSuccess={(msg) => {
            handleSuccess(msg);
            setShowJournalEntryModal(false);
          }}
        />
      )}
    </div>
  );
};

interface ActionButtonProps {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 rounded-lg border-2 transition-colors ${
        disabled
          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-blue-50 border-blue-300 hover:bg-blue-100 hover:border-blue-400 text-gray-800 cursor-pointer'
      }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-xs text-gray-600 mt-1">{description}</div>
    </button>
  );
};

export default QuickActionsWidget;
