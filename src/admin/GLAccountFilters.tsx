/**
 * GL Account Filters Component
 * Scope-based filtering like Ruby ERPAX scopes
 *
 * Three filter groups, one mechanism. This file held the same 53-node arrow body twice
 * ([[rules]]/copy) and a THIRD hand-written copy the 40-node floor could not see, because the
 * `View` group inlined its two buttons instead of mapping a list. Only the title and the option
 * list ever differed, and both closures (`scope`, `onScopeChange`) were identical in all three —
 * so the difference is passed in rather than the body repeated.
 */

'use client'

import React from 'react'
import { AccountScope } from '@/types/gl/account'
import { Search } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/ui'

interface GLAccountFiltersProps {
  scope: AccountScope
  onScopeChange: (scope: AccountScope) => void
  searchText: string
  onSearchChange: (text: string) => void
}

interface ScopeOption {
  readonly id: AccountScope
  readonly label: string
}

/** The filter groups, as data. A new group is a row here, never another copy of the block. */
const SCOPE_GROUPS: ReadonlyArray<{ readonly title: string; readonly options: readonly ScopeOption[] }> = [
  {
    title: 'Status',
    options: [
      { id: 'all', label: 'All Accounts' },
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' },
      { id: 'locked', label: 'Locked' },
    ],
  },
  {
    title: 'Account Type',
    options: [
      { id: 'assets', label: 'Assets' },
      { id: 'liabilities', label: 'Liabilities' },
      { id: 'equity', label: 'Equity' },
      { id: 'revenues', label: 'Revenues' },
      { id: 'expenses', label: 'Expenses' },
    ],
  },
  {
    title: 'View',
    options: [
      { id: 'leaf_only', label: 'Leaf Accounts Only' },
      { id: 'with_analytics', label: 'With Analytics' },
    ],
  },
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

        {SCOPE_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-sm font-medium">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((s) => (
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
        ))}
      </CardContent>
    </Card>
  )
}
