/**
 * GL Account Filters Component
 * Scope-based filtering like Ruby ERPAX scopes
 */

'use client'

import React from 'react'
import { AccountScope } from '@/types/gl-account'
import { Search } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/ui'

interface GLAccountFiltersProps {
  scope: AccountScope
  onScopeChange: (scope: AccountScope) => void
  searchText: string
  onSearchChange: (text: string) => void
}

const SCOPES: { id: AccountScope; label: string }[] = [
  { id: 'all', label: 'All Accounts' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'locked', label: 'Locked' },
]

const TYPE_SCOPES: { id: AccountScope; label: string }[] = [
  { id: 'assets', label: 'Assets' },
  { id: 'liabilities', label: 'Liabilities' },
  { id: 'equity', label: 'Equity' },
  { id: 'revenues', label: 'Revenues' },
  { id: 'expenses', label: 'Expenses' },
]

export default function GLAccountFilters({
  scope,
  onScopeChange,
  searchText,
  onSearchChange,
}: GLAccountFiltersProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-[18px]" />
          <Input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by code or name..."
            className="pl-10"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Status</p>
          <div className="flex flex-wrap gap-2">
            {SCOPES.map((s) => (
              <Button
                key={s.id}
                type="button"
                size="sm"
                variant={scope === s.id ? 'default' : 'outline'}
                onClick={() => onScopeChange(s.id)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Account Type</p>
          <div className="flex flex-wrap gap-2">
            {TYPE_SCOPES.map((s) => (
              <Button
                key={s.id}
                type="button"
                size="sm"
                variant={scope === s.id ? 'default' : 'outline'}
                onClick={() => onScopeChange(s.id)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">View</p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={scope === 'leaf_only' ? 'default' : 'outline'}
              onClick={() => onScopeChange('leaf_only')}
            >
              Leaf Accounts Only
            </Button>
            <Button
              type="button"
              size="sm"
              variant={scope === 'with_analytics' ? 'default' : 'outline'}
              onClick={() => onScopeChange('with_analytics')}
            >
              With Analytics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
