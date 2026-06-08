'use client'

import {
  formatJournalLineEb,
  loadCorpusDashboardShell,
  loadCorpusEntropyRollup,
  type CorpusDashboardMetrics,
} from '@/admin/ui'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui'
import React, { useEffect, useMemo, useState } from 'react'

/** Admin afterDashboard — corpus entropy/seal rollup (eb units). */
const CorpusEntropyDashboard: React.FC = () => {
  const shell = useMemo(() => loadCorpusDashboardShell(), [])
  const [rollup, setRollup] = useState<CorpusDashboardMetrics | null>(null)
  const [loadingRollup, setLoadingRollup] = useState(true)
  const [showSectors, setShowSectors] = useState(false)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      const metrics = loadCorpusEntropyRollup()
      if (!cancelled) {
        setRollup(metrics)
        setLoadingRollup(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const metrics = rollup
  const reciprocityPct = metrics?.reciprocityPct ?? shell.reciprocityPct
  const pathSamples = metrics?.pathSamples ?? []

  const summaryCards = metrics
    ? [
        { label: 'Gap mass', value: `${metrics.totalGapEb} eb` },
        { label: 'Seal mass', value: `${metrics.totalSealEb} eb` },
        { label: 'Net residual', value: `${metrics.netEntropyEb} eb` },
        { label: 'Seal/gap ratio', value: metrics.sealGapRatio },
        {
          label: 'Folders sealed',
          value: `${metrics.sealedFolders} sealed · ${metrics.unsealedFolders} unsealed`,
        },
        { label: 'Matrix reciprocity', value: `${reciprocityPct}%` },
      ]
    : [{ label: 'Matrix reciprocity', value: `${reciprocityPct}%` }]

  return (
    <div className="space-y-4 corpus-entropy-dashboard">
      <Alert>
        <AlertTitle>Corpus entropy rollup</AlertTitle>
        <AlertDescription>
          Live seal/gap mass across the fractal corpus tree. Path is the account code; currency is
          eb (entropy-bit) on journal-entries via erpaxSelfAccount.
          {loadingRollup ? ' Loading corpus rollup…' : null}
        </AlertDescription>
      </Alert>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-normal">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <strong className="text-lg">{card.value}</strong>
            </CardContent>
          </Card>
        ))}
        {loadingRollup
          ? ['Gap mass', 'Seal mass', 'Net residual', 'Seal/gap ratio', 'Folders sealed'].map(
              (label) => (
                <Card key={label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-muted-foreground text-sm font-normal">
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-muted-foreground text-sm">…</span>
                  </CardContent>
                </Card>
              ),
            )
          : null}
      </div>

      {metrics && metrics.bySector.length > 0 ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">By partition</CardTitle>
            {!showSectors ? (
              <Button type="button" variant="outline" size="sm" onClick={() => setShowSectors(true)}>
                Show partitions
              </Button>
            ) : null}
          </CardHeader>
          {showSectors ? (
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partition</TableHead>
                    <TableHead>Folders</TableHead>
                    <TableHead>Gap eb</TableHead>
                    <TableHead>Seal eb</TableHead>
                    <TableHead>Net eb</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.bySector.slice(0, 8).map((row) => (
                    <TableRow key={row.partition}>
                      <TableCell>{row.partition}</TableCell>
                      <TableCell>{row.folders}</TableCell>
                      <TableCell>{row.gapEb}</TableCell>
                      <TableCell>{row.sealEb}</TableCell>
                      <TableCell>{row.netEb}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          ) : null}
        </Card>
      ) : null}

      {pathSamples.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Path accounts (erpaxSelfAccount)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account code</TableHead>
                  <TableHead>Gap eb</TableHead>
                  <TableHead>Seal eb</TableHead>
                  <TableHead>Net eb</TableHead>
                  <TableHead>Balanced</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pathSamples.map((row) => (
                  <TableRow key={row.accountCode}>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono" title={row.accountCode}>
                        {row.accountCode}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.totalGapEb} eb</TableCell>
                    <TableCell>{row.totalSealEb} eb</TableCell>
                    <TableCell>{row.netEntropyEb} eb</TableCell>
                    <TableCell>{row.isBalanced ? '1' : '0'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : loadingRollup ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Path accounts (erpaxSelfAccount)</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-muted-foreground text-sm">Loading path samples…</span>
          </CardContent>
        </Card>
      ) : null}

      {pathSamples.map((sample) =>
        sample.lines.length > 0 ? (
          <Card key={`lines-${sample.accountCode}`}>
            <CardHeader>
              <CardTitle className="text-base">
                Journal lines — <span className="font-mono">{sample.accountCode}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Account code</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Currency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sample.lines.map((line) => (
                    <TableRow key={`${sample.accountCode}-${line.lineNumber}`}>
                      <TableCell>{line.lineNumber}</TableCell>
                      <TableCell className="font-mono text-xs">{line.accountCode}</TableCell>
                      <TableCell>{formatJournalLineEb(line.debit)}</TableCell>
                      <TableCell>{formatJournalLineEb(line.credit)}</TableCell>
                      <TableCell>{line.currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : null,
      )}
    </div>
  )
}

export default CorpusEntropyDashboard
