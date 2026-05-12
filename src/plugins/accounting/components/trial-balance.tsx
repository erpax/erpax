/**
 * Trial Balance Component — Display GL accounts with their debit/credit balances.
 *
 * Usage: Display all GL accounts and their balances, used for period-end close verification.
 * Shows total debits/credits for reconciliation, highlights imbalances.
 *
 * @standard SAF-T:2.0 reporting
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 */

'use client'

import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface GLAccount {
  accountCode: string
  accountName: string
  accountType: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  balance: number
}

export interface TrialBalanceProps {
  accounts: GLAccount[]
  currency?: string
  showChart?: boolean
}

/**
 * Calculate trial balance totals: sum of debits (assets/expenses) and credits (liabilities/equity/revenue).
 */
const calculateTotals = (accounts: GLAccount[]) => {
  let totalDebits = 0
  let totalCredits = 0

  accounts.forEach((account) => {
    if (['asset', 'expense'].includes(account.accountType)) {
      totalDebits += Math.max(0, account.balance)
    } else {
      totalCredits += Math.max(0, Math.abs(account.balance))
    }
  })

  return {
    totalDebits,
    totalCredits,
    variance: Math.abs(totalDebits - totalCredits),
    isBalanced: Math.abs(totalDebits - totalCredits) < 0.01, // Allow floating point tolerance
  }
}

export const TrialBalance: React.FC<TrialBalanceProps> = ({ accounts, currency = 'USD', showChart = true }) => {
  const totals = useMemo(() => calculateTotals(accounts), [accounts])

  const chartData = useMemo(
    () => [
      {
        name: 'Debits',
        amount: totals.totalDebits,
      },
      {
        name: 'Credits',
        amount: totals.totalCredits,
      },
    ],
    [totals]
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trial Balance</CardTitle>
          <CardDescription>GL Account balances as of period end</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totals.totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">{currency}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totals.totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">{currency}</p>
              </CardContent>
            </Card>

            <Card className={totals.isBalanced ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Balance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totals.isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                  {totals.isBalanced ? '✓ Balanced' : '✗ Imbalanced'}
                </div>
                <p className="text-xs text-muted-foreground">Variance: {totals.variance.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          {showChart && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold mb-4">Debits vs Credits</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => (value as number).toLocaleString()} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Accounts Table */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-4">GL Accounts</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.accountCode}>
                    <TableCell className="font-mono text-sm">{account.accountCode}</TableCell>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell className="capitalize text-xs">{account.accountType}</TableCell>
                    <TableCell className="text-right font-mono">
                      {account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TrialBalance
