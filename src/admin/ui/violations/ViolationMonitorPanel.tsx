'use client'

import React, { useMemo, useState } from 'react'

import { useViolationMonitor, type ViolationEvent } from '@/admin/ui'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui'

const severityVariant = (severity: ViolationEvent['severity']): 'default' | 'secondary' | 'destructive' => {
  switch (severity) {
    case 'error':
      return 'destructive'
    case 'warning':
      return 'secondary'
    default:
      return 'default'
  }
}

/** Payload afterDashboard — live violation monitor + improve loop (Sheet + Table). */
const ViolationMonitorPanel: React.FC = () => {
  const {
    snapshot,
    events,
    crossEducationEvents,
    activeCrossEducation,
    lastApplied,
    lastQueued,
    refresh,
    dismissCrossEducation,
  } = useViolationMonitor()
  const [open, setOpen] = useState(false)

  const sourceRows = useMemo(
    () =>
      Object.entries(snapshot.counts.bySource)
        .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
        .slice(0, 10),
    [snapshot.counts.bySource],
  )

  return (
    <div className="space-y-3 violation-monitor-panel">
      <Alert variant={snapshot.ok ? 'default' : 'destructive'}>
        <AlertTitle>Corpus violation monitor</AlertTitle>
        <AlertDescription>
          Live scan across folder law · rules:check · cross-concept education · diamond strays ·
          gap eb · finishedIdeaCrossed (wave-sampled) · import/boundary · path-follow · entanglement.
          Cross violations notify agents in realtime (Sonner + monitor:cross:violation wave).
          Auto-improves safe classes each poll; tenant/invoices/structure queue for human gate.
          Path is the account code; poll interval 30s.
          {snapshot.waveOrdinal != null
            ? ` Wave ${snapshot.waveOrdinal}/7 · ${snapshot.wavePathsSampled} paths sampled.`
            : null}
        </AlertDescription>
      </Alert>

      {(activeCrossEducation ?? crossEducationEvents[0]) ? (
        <Alert variant="destructive" className="cross-education-panel">
          <AlertTitle>Cross education — axis uncrossed</AlertTitle>
          <AlertDescription className="space-y-2">
            <p className="text-sm">
              {(activeCrossEducation ?? crossEducationEvents[0])!.detail}
              {(activeCrossEducation ?? crossEducationEvents[0])!.uncrossedAxes?.length ? (
                <span className="ml-2 font-mono text-xs">
                  axes: {(activeCrossEducation ?? crossEducationEvents[0])!.uncrossedAxes!.join(', ')}
                </span>
              ) : null}
            </p>
            {(activeCrossEducation ?? crossEducationEvents[0])!.crossEducation ? (
              <pre className="max-h-48 overflow-auto rounded border bg-muted/50 p-2 text-xs whitespace-pre-wrap">
                {(activeCrossEducation ?? crossEducationEvents[0])!.crossEducation}
              </pre>
            ) : null}
            <Button type="button" variant="outline" size="sm" onClick={() => dismissCrossEducation()}>
              Dismiss education panel
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={snapshot.ok ? 'default' : 'destructive'}>
          {snapshot.counts.total} violation(s)
        </Badge>
        <Badge variant="outline">fp {snapshot.fingerprint.slice(0, 8)}…</Badge>
        {lastApplied.length > 0 ? (
          <Badge variant="default">{lastApplied.length} improved</Badge>
        ) : null}
        {lastQueued.length > 0 ? (
          <Badge variant="secondary">{lastQueued.length} gated</Badge>
        ) : null}
        {crossEducationEvents.length > 0 ? (
          <Badge variant="destructive">{crossEducationEvents.length} cross</Badge>
        ) : null}
        <Button type="button" variant="outline" size="sm" onClick={() => refresh()}>
          Refresh scan
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="default" size="sm">
              Open live list
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Violation events</SheetTitle>
              <SheetDescription>
                {snapshot.counts.total} total · scanned {snapshot.scannedAt}
              </SheetDescription>
            </SheetHeader>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-xs">{row.source}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs" title={row.accountCode}>
                        {row.accountCode}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-xs" title={row.detail}>
                      {row.detail}
                    </TableCell>
                    <TableCell>
                      <Badge variant={severityVariant(row.severity)}>{row.severity}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SheetContent>
        </Sheet>
      </div>

      {sourceRows.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source axis</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sourceRows.map(([source, count]) => (
              <TableRow key={source}>
                <TableCell>{source}</TableCell>
                <TableCell>{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  )
}

export default ViolationMonitorPanel
