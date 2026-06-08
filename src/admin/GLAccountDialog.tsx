/**
 * GL Account Dialog Component
 * Modal for creating or editing GL accounts
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  GLAccount,
  CreateGLAccountRequest,
  UpdateGLAccountRequest,
  AccountType,
  AnalyticType,
  GL_ACCOUNT_RULES,
} from '@/types/gl-account'
import { glAccountService } from '@/gl/account.service'
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
} from '@/ui'

interface GLAccountDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  tenantId: string
  account?: GLAccount
  parentId?: string
  onClose: () => void
  onSave: (account: GLAccount) => void
}

const ACCOUNT_TYPES: AccountType[] = [
  'asset',
  'liability',
  'equity',
  'revenue',
  'cogs',
  'expense',
  'other_income',
  'other_expense',
]

const ANALYTIC_TYPES: AnalyticType[] = [
  'none',
  'cost_center',
  'department',
  'location',
  'customer',
  'project',
]

export default function GLAccountDialog({
  open,
  mode,
  tenantId,
  account,
  parentId,
  onClose,
  onSave,
}: GLAccountDialogProps) {
  const [formData, setFormData] = useState<
    CreateGLAccountRequest & { id?: string; status?: string }
  >({
    code: '',
    name: '',
    type: 'asset',
    normalBalance: 'debit',
    currencyCode: 'EUR',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)

  useEffect(() => {
    if (mode === 'edit' && account) {
      setFormData({
        id: account.id,
        code: account.code,
        name: account.name,
        description: account.description,
        type: account.type,
        normalBalance: account.normalBalance,
        currencyCode: account.currencyCode,
        analyticType: account.analyticType,
        requiresAnalyticDimension: account.requiresAnalyticDimension,
        isTaxable: account.isTaxable,
        taxCode: account.taxCode,
        displayOrder: account.displayOrder,
      })
    } else {
      setFormData({
        code: '',
        name: '',
        type: 'asset',
        normalBalance: 'debit',
        currencyCode: 'EUR',
        parentId,
      })
    }
    setError(null)
    setCodeError(null)
  }, [mode, account, open, parentId])

  const validateCode = async () => {
    if (!formData.code) {
      setCodeError('Account code is required')
      return false
    }

    if (formData.code.length < GL_ACCOUNT_RULES.minCodeLength) {
      setCodeError(`Code must be at least ${GL_ACCOUNT_RULES.minCodeLength} characters`)
      return false
    }

    if (formData.code.length > GL_ACCOUNT_RULES.maxCodeLength) {
      setCodeError(`Code must not exceed ${GL_ACCOUNT_RULES.maxCodeLength} characters`)
      return false
    }

    if (!GL_ACCOUNT_RULES.codePattern.test(formData.code)) {
      setCodeError('Code can only contain numbers, dots, hyphens, and underscores')
      return false
    }

    try {
      const isValid = await glAccountService.validateAccountCode(tenantId, formData.code)
      if (!isValid && mode === 'create') {
        setCodeError('This account code already exists')
        return false
      }
    } catch (_err) {
      // Continue if validation service fails
    }

    setCodeError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!(await validateCode())) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      let savedAccount: GLAccount

      if (mode === 'create') {
        const request: CreateGLAccountRequest = {
          code: formData.code,
          name: formData.name,
          type: formData.type,
          normalBalance: formData.normalBalance,
          currencyCode: formData.currencyCode,
        }

        if (formData.description) request.description = formData.description
        if (parentId) request.parentId = parentId
        if (formData.analyticType) request.analyticType = formData.analyticType
        if (formData.requiresAnalyticDimension !== undefined)
          request.requiresAnalyticDimension = formData.requiresAnalyticDimension
        if (formData.isTaxable !== undefined) request.isTaxable = formData.isTaxable
        if (formData.taxCode) request.taxCode = formData.taxCode
        if (formData.displayOrder !== undefined) request.displayOrder = formData.displayOrder

        savedAccount = await glAccountService.createAccount(tenantId, request)
      } else if (account) {
        const request: UpdateGLAccountRequest = {}

        if (formData.name !== account.name) request.name = formData.name
        if (formData.description !== account.description) request.description = formData.description
        if (formData.normalBalance !== account.normalBalance)
          request.normalBalance = formData.normalBalance
        if (formData.analyticType !== account.analyticType)
          request.analyticType = formData.analyticType
        if (formData.requiresAnalyticDimension !== account.requiresAnalyticDimension)
          request.requiresAnalyticDimension = formData.requiresAnalyticDimension
        if (formData.isTaxable !== account.isTaxable) request.isTaxable = formData.isTaxable
        if (formData.taxCode !== account.taxCode) request.taxCode = formData.taxCode
        if (formData.displayOrder !== account.displayOrder)
          request.displayOrder = formData.displayOrder

        savedAccount = await glAccountService.updateAccount(tenantId, account.id, request)
      } else {
        throw new Error('Invalid state')
      }

      onSave(savedAccount)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create GL Account' : 'Edit GL Account'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Basic Information</h3>
            <div className="space-y-2">
              <Label htmlFor="gl-code">
                Account Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gl-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                onBlur={() => void validateCode()}
                placeholder="e.g., 1000, 1010.01"
                disabled={mode === 'edit'}
                required
                aria-invalid={!!codeError}
              />
              {codeError ? <p className="text-sm text-destructive">{codeError}</p> : null}
              <p className="text-xs text-muted-foreground">
                Unique identifier. {mode === 'edit' ? 'Cannot be changed.' : 'Required.'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gl-name">
                Account Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gl-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Cash on Hand"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gl-description">Description</Label>
              <Textarea
                id="gl-description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                rows={2}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Account Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Account Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(type) =>
                    setFormData({ ...formData, type: type as AccountType })
                  }
                  disabled={mode === 'edit'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Normal Balance <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.normalBalance}
                  onValueChange={(normalBalance) =>
                    setFormData({
                      ...formData,
                      normalBalance: normalBalance as 'debit' | 'credit',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debit">Debit</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gl-currency">
                  Currency <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="gl-currency"
                  value={formData.currencyCode}
                  onChange={(e) => setFormData({ ...formData, currencyCode: e.target.value })}
                  maxLength={3}
                  placeholder="USD"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Analytic Type</Label>
                <Select
                  value={formData.analyticType || 'none'}
                  onValueChange={(analyticType) =>
                    setFormData({
                      ...formData,
                      analyticType: analyticType as AnalyticType,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ANALYTIC_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <Checkbox
                  checked={formData.requiresAnalyticDimension || false}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      requiresAnalyticDimension: checked === true,
                    })
                  }
                />
                <span className="text-sm">Requires Analytic Dimension</span>
              </label>

              <label className="flex items-center gap-3">
                <Checkbox
                  checked={formData.isTaxable || false}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isTaxable: checked === true })
                  }
                />
                <span className="text-sm">Taxable Account</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : mode === 'create' ? 'Create Account' : 'Update Account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
