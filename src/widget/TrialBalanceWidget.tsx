/**
 * TrialBalanceWidget — pre-statement debit/credit symmetry evidence.
 */

import React from 'react'
import { formatCurrency } from '@/dashboard'
import type { TrialBalanceData } from '@/analytics'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui'

interface TrialBalanceWidgetProps {
  data: TrialBalanceData | null
}

const TrialBalanceWidget: React.FC<TrialBalanceWidgetProps> = ({ data }) => {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trial Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={data.isBalanced ? 'border-success/50' : 'border-error/50'}>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Trial Balance</CardTitle>
        <Badge variant={data.isBalanced ? 'secondary' : 'destructive'}>
          {data.isBalanced ? 'Balanced' : 'Unbalanced'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.accounts.map((account) => (
                <TableRow key={account.accountCode}>
                  <TableCell>
                    <div className="font-medium">{account.accountCode}</div>
                    <div className="text-muted-foreground text-xs">{account.accountName}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    {account.debitBalance ? formatCurrency(account.debitBalance) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {account.creditBalance ? formatCurrency(account.creditBalance) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>TOTALS</TableCell>
                <TableCell className="text-right">{formatCurrency(data.totalDebits)}</TableCell>
                <TableCell className="text-right">{formatCurrency(data.totalCredits)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <p className="text-muted-foreground mt-3 text-xs">
          As of {new Date(data.asOfDate).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}

export default TrialBalanceWidget
