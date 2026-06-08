/**
 * GL Account Detail Dialog
 * Read-only view of full account details
 */

'use client'

import React from 'react'
import { GLAccount } from '@/types/gl-account'
import { Edit2 } from 'lucide-react'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@/ui'

interface GLAccountDetailDialogProps {
  open: boolean
  account: GLAccount
  onClose: () => void
  onEdit: () => void
}

const statusVariant = (status: GLAccount['status']) => {
  switch (status) {
    case 'active':
      return 'secondary' as const
    case 'locked':
      return 'destructive' as const
    default:
      return 'outline' as const
  }
}

export default function GLAccountDetailDialog({
  open,
  account,
  onClose,
  onEdit,
}: GLAccountDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{account.code}</DialogTitle>
          <p className="text-muted-foreground text-sm">{account.name}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={statusVariant(account.status)} className="mt-2 capitalize">
                {account.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p className="mt-2 font-semibold capitalize">{account.type.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Normal Balance</p>
              <p className="mt-2 font-semibold capitalize">{account.normalBalance}</p>
            </div>
          </div>

          {account.description ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="mt-2">{account.description}</p>
            </div>
          ) : null}

          <Separator />

          <div>
            <h3 className="mb-3 font-semibold">Hierarchy</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Level</p>
                <p className="mt-1">{account.level}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Type</p>
                <p className="mt-1">{account.isLeaf ? 'Leaf' : 'Parent'}</p>
              </div>
              {account.parentId ? (
                <div>
                  <p className="font-medium text-muted-foreground">Parent Account</p>
                  <p className="mt-1 font-mono">{account.parentId}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Financial Configuration</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Currency</p>
                <p className="mt-1 font-mono">{account.currencyCode}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Multi-Currency</p>
                <p className="mt-1">{account.allowMultiCurrency ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Allow Postings</p>
                <p className="mt-1">{account.allowPostings ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Requires Approval</p>
                <p className="mt-1">{account.requiresApproval ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {account.analyticType !== 'none' ? (
            <div>
              <h3 className="mb-3 font-semibold">Analytics Configuration</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Analytic Type</p>
                  <p className="mt-1 capitalize">{account.analyticType.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Requires Dimension</p>
                  <p className="mt-1">{account.requiresAnalyticDimension ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ) : null}

          {account.isTaxable ? (
            <div>
              <h3 className="mb-3 font-semibold">Tax Configuration</h3>
              <p className="text-sm font-medium text-muted-foreground">Tax Code</p>
              <p className="mt-1 font-mono">{account.taxCode || 'Not specified'}</p>
            </div>
          ) : null}

          <div>
            <h3 className="mb-3 font-semibold">Control & Audit</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Created</p>
                <p className="mt-1">{new Date(account.createdAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground text-xs">by {account.createdBy}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Updated</p>
                <p className="mt-1">{new Date(account.updatedAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground text-xs">by {account.updatedBy}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Display Order</p>
            <p className="mt-1">{account.displayOrder}</p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={onEdit}>
            <Edit2 className="size-4" />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
