/**
 * GL Posting Reconciliation Component — Match GL Postings with source documents.
 *
 * Usage: Verify that each GL posting has a corresponding source document (Invoice, Bill, etc.)
 * and that the amounts reconcile. Shows unmatched postings and source documents.
 *
 * @standard SAF-T:2.0 audit-trail
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @audit ISO-19011:2018 internal-audit
 */

'use client'

import React, { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface GLPostingRecord {
  postingId: string
  journalEntryId: string
  sourceType: 'invoice' | 'bill' | 'payment' | 'bank_statement' | 'period_end_adjustment' | string
  sourceId: string
  status: 'pending' | 'posted' | 'reversed' | 'failed'
  totalDebits: number
  totalCredits: number
  postedDate?: string
  isMatched: boolean
  matchedSourceId?: string
}

export interface GLPostingReconciliationProps {
  postings: GLPostingRecord[]
  currency?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'posted':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'reversed':
      return 'bg-gray-100 text-gray-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getMatchColor = (isMatched: boolean) => {
  return isMatched ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

export const GLPostingReconciliation: React.FC<GLPostingReconciliationProps> = ({
  postings,
  currency = 'USD',
}) => {
  const stats = useMemo(() => {
    const total = postings.length
    const posted = postings.filter((p) => p.status === 'posted').length
    const matched = postings.filter((p) => p.isMatched).length
    const unmatched = total - matched

    return {
      total,
      posted,
      matched,
      unmatched,
      matchPercentage: total > 0 ? ((matched / total) * 100).toFixed(1) : '0',
    }
  }, [postings])

  const unmatchedPostings = useMemo(() => postings.filter((p) => !p.isMatched), [postings])

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.posted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Matched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.matched}</div>
            <p className="text-xs text-muted-foreground">{stats.matchPercentage}%</p>
          </CardContent>
        </Card>

        <Card className={stats.unmatched > 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.unmatched > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stats.unmatched}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Reconciliation Status</CardTitle>
          <CardDescription>GL Posting match status with source documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posting ID</TableHead>
                <TableHead>Journal Entry</TableHead>
                <TableHead>Source Type</TableHead>
                <TableHead>Source ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Match Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postings.map((posting) => (
                <TableRow key={posting.postingId}>
                  <TableCell className="font-mono text-sm">{posting.postingId}</TableCell>
                  <TableCell className="font-mono text-sm">{posting.journalEntryId}</TableCell>
                  <TableCell className="capitalize text-xs">{posting.sourceType}</TableCell>
                  <TableCell className="font-mono text-sm">{posting.sourceId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(posting.status)}>{posting.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getMatchColor(posting.isMatched)}>
                      {posting.isMatched ? '✓ Matched' : '✗ Unmatched'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {(posting.totalDebits - posting.totalCredits).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Unmatched Postings Alert */}
      {unmatchedPostings.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Unmatched Postings ({unmatchedPostings.length})</CardTitle>
            <CardDescription>These postings require source document matching for audit trail closure</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Posting ID</TableHead>
                  <TableHead>Source Type</TableHead>
                  <TableHead>Source ID</TableHead>
                  <TableHead className="text-right">Debits</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unmatchedPostings.map((posting) => (
                  <TableRow key={posting.postingId}>
                    <TableCell className="font-mono text-sm">{posting.postingId}</TableCell>
                    <TableCell className="capitalize text-xs">{posting.sourceType}</TableCell>
                    <TableCell className="font-mono text-sm">{posting.sourceId}</TableCell>
                    <TableCell className="text-right font-mono">
                      {posting.totalDebits.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {posting.totalCredits.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GLPostingReconciliation
