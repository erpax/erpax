/**
 * QuickActionsWidget — admin shortcut tile for common accounting workflows.
 */

import React, { useState } from 'react'
import {
  CreateInvoiceModal,
  CreateBillModal,
  CreateJournalEntryModal,
} from '@/modal'
import { Alert, AlertDescription, Button, Card, CardContent, CardHeader, CardTitle } from '@/ui'

interface QuickActionsWidgetProps {
  userRole: 'admin' | 'accountant'
}

const QuickActionsWidget: React.FC<QuickActionsWidgetProps> = ({ userRole: _userRole }) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showBillModal, setShowBillModal] = useState(false)
  const [showJournalEntryModal, setShowJournalEntryModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage ? (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid grid-cols-4 gap-4">
          <ActionButton
            icon="📄"
            label="Create Invoice"
            onClick={() => setShowInvoiceModal(true)}
            description="Record customer sale"
          />
          <ActionButton
            icon="📋"
            label="Create Bill"
            onClick={() => setShowBillModal(true)}
            description="Record vendor purchase"
          />
          <ActionButton
            icon="📓"
            label="Journal Entry"
            onClick={() => setShowJournalEntryModal(true)}
            description="Manual GL entry"
          />
          <ActionButton
            icon="🏦"
            label="Bank Reconciliation"
            onClick={() => alert('Bank reconciliation not yet implemented')}
            description="Match GL to bank"
            disabled
          />
        </div>

        {showInvoiceModal ? (
          <CreateInvoiceModal
            onClose={() => setShowInvoiceModal(false)}
            onSuccess={(msg: string) => {
              handleSuccess(msg)
              setShowInvoiceModal(false)
            }}
          />
        ) : null}

        {showBillModal ? (
          <CreateBillModal
            onClose={() => setShowBillModal(false)}
            onSuccess={(msg: string) => {
              handleSuccess(msg)
              setShowBillModal(false)
            }}
          />
        ) : null}

        {showJournalEntryModal ? (
          <CreateJournalEntryModal
            onClose={() => setShowJournalEntryModal(false)}
            onSuccess={(msg: string) => {
              handleSuccess(msg)
              setShowJournalEntryModal(false)
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

interface ActionButtonProps {
  icon: string
  label: string
  description: string
  onClick: () => void
  disabled?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  disabled,
}) => (
  <Button
    type="button"
    variant="outline"
    disabled={disabled}
    onClick={onClick}
    className="flex h-auto flex-col items-start gap-1 p-4 text-left"
  >
    <span className="text-3xl">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
    <span className="text-muted-foreground text-xs">{description}</span>
  </Button>
)

export default QuickActionsWidget
