/**
 * Period-End Checklist Component — Step-by-step verification for period closing.
 *
 * Usage: Provides a structured checklist of verification steps required before closing
 * a financial period. Tracks completion status and provides guidance for each step.
 *
 * @standard SAF-T:2.0 period-closing
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @compliance SOX §404 internal-controls
 */

'use client'

import React, { useState } from 'react'
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface ChecklistItem {
  id: string
  title: string
  description: string
  required: boolean
  completed: boolean
  riskLevel: 'low' | 'medium' | 'high'
  guidance?: string
  dependsOn?: string[] // IDs of items that must be completed first
}

export interface PeriodEndChecklistProps {
  periodName: string
  items: ChecklistItem[]
  onItemChange?: (itemId: string, completed: boolean) => void
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const PeriodEndChecklist: React.FC<PeriodEndChecklistProps> = ({
  periodName,
  items,
  onItemChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const stats = {
    total: items.length,
    completed: items.filter((i) => i.completed).length,
    required: items.filter((i) => i.required).length,
    requiredCompleted: items.filter((i) => i.required && i.completed).length,
  }

  const completionPercentage = stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(0) : '0'
  const isReadyToClose = stats.required === stats.requiredCompleted && stats.total === stats.completed

  const getItemStatus = (item: ChecklistItem) => {
    if (item.completed) return 'completed'
    if (item.dependsOn?.some((depId) => !items.find((i) => i.id === depId)?.completed)) return 'blocked'
    return 'pending'
  }

  const handleItemChange = (itemId: string, completed: boolean) => {
    onItemChange?.(itemId, completed)
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Period-End Closing Checklist</CardTitle>
              <CardDescription>Period: {periodName}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{completionPercentage}%</div>
              <p className="text-sm text-muted-foreground">
                {stats.completed} of {stats.total} items
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-sm text-muted-foreground">Required Items</p>
              <p className="text-2xl font-bold">
                {stats.requiredCompleted}/{stats.required}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Optional Items</p>
              <p className="text-2xl font-bold">
                {stats.completed - stats.requiredCompleted}/{stats.total - stats.required}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ready to Close</p>
              <p className={`text-2xl font-bold ${isReadyToClose ? 'text-green-600' : 'text-red-600'}`}>
                {isReadyToClose ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item) => {
          const status = getItemStatus(item)
          const isDisabled = status === 'blocked'

          return (
            <Card
              key={item.id}
              className={`cursor-pointer transition-colors ${isDisabled ? 'opacity-60' : ''} ${
                item.completed ? 'bg-green-50 border-green-200' : ''
              }`}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <Checkbox
                      checked={item.completed}
                      disabled={isDisabled}
                      onCheckedChange={(checked) => {
                        handleItemChange(item.id, Boolean(checked))
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.title}
                      </span>
                      {item.required && <Badge variant="destructive">Required</Badge>}
                      <Badge className={getRiskColor(item.riskLevel)}>{item.riskLevel.toUpperCase()}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{item.description}</p>

                    {isDisabled && item.dependsOn && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Blocked: Complete{' '}
                          {item.dependsOn
                            .map((depId) => items.find((i) => i.id === depId)?.title)
                            .filter(Boolean)
                            .join(', ')}{' '}
                          first
                        </span>
                      </div>
                    )}

                    {/* Expanded Guidance */}
                    {expandedId === item.id && item.guidance && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                        <p className="font-medium mb-1">Guidance:</p>
                        <p>{item.guidance}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div className="pt-1">
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : status === 'blocked' ? (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant={isReadyToClose ? 'default' : 'outline'}
          disabled={!isReadyToClose}
          className="flex-1"
        >
          {isReadyToClose ? '✓ Period Ready to Close' : 'Period Not Ready'}
        </Button>
        <Button variant="outline">Export Checklist</Button>
      </div>
    </div>
  )
}

export default PeriodEndChecklist
