'use client'

import {
  formatJournalLineEb,
  loadCorpusDashboardShell,
  loadCorpusEntropyRollup,
  tableColumns,
  type CorpusDashboardMetrics,
} from '@/admin/ui'
import { adminBootShell } from '@/quantum/ftl/admin'
import { Banner, Collapsible, Gutter, Pill, Table } from '@payloadcms/ui'
import React, { useEffect, useMemo, useState } from 'react'

const boot = adminBootShell({ reuses: 1 })

/** Admin afterDashboard — corpus entropy/seal rollup (eb units), built from the admin panel's own components. */
const CorpusEntropyDashboard: React.FC = () => {
  const shell = useMemo(() => loadCorpusDashboardShell(), [])
  const [metrics, setMetrics] = useState<CorpusDashboardMetrics | null>(null)

  useEffect(() => {
    let cancelled = false
    // The shell paints first; the corpus walk is deferred past idle.
    const id = window.setTimeout(() => {
      const rollup = loadCorpusEntropyRollup()
      if (!cancelled) setMetrics(rollup)
    }, boot.idleDeferMs)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [])

  const reciprocity = `${metrics?.reciprocityPct ?? shell.reciprocityPct}%`
  const summary = metrics
    ? [
        { metric: 'Gap mass', value: `${metrics.totalGapEb} eb` },
        { metric: 'Seal mass', value: `${metrics.totalSealEb} eb` },
        { metric: 'Net residual', value: `${metrics.netEntropyEb} eb` },
        { metric: 'Seal/gap ratio', value: String(metrics.sealGapRatio) },
        { metric: 'Folders sealed', value: `${metrics.sealedFolders} sealed · ${metrics.unsealedFolders} unsealed` },
        { metric: 'Matrix reciprocity', value: reciprocity },
      ]
    : [{ metric: 'Matrix reciprocity', value: reciprocity }]
  const sectors = (metrics?.bySector ?? []).slice(0, 8).map((row) => ({ ...row }))
  const paths = (metrics?.pathSamples ?? []).map((row) => ({
    accountCode: (
      <Pill pillStyle="light-gray" size="small">
        <code>{row.accountCode}</code>
      </Pill>
    ),
    gap: `${row.totalGapEb} eb`,
    seal: `${row.totalSealEb} eb`,
    net: `${row.netEntropyEb} eb`,
    balanced: <Pill pillStyle={row.isBalanced ? 'success' : 'warning'} size="small">{row.isBalanced ? 'balanced' : 'open'}</Pill>,
  }))

  return (
    <Gutter>
      <Banner type={metrics ? 'default' : 'info'}>
        Corpus entropy rollup — seal and gap mass across the corpus tree. A path is its account code; the unit is eb
        (entropy-bit).{metrics ? null : ' Loading…'}
      </Banner>

      <Table appearance="condensed" columns={tableColumns({ metric: 'Metric', value: 'Value' }, summary)} data={summary} />

      {sectors.length > 0 ? (
        <Collapsible header="By partition" initCollapsed>
          <Table
            appearance="condensed"
            columns={tableColumns({ partition: 'Partition', folders: 'Folders', gapEb: 'Gap eb', sealEb: 'Seal eb', netEb: 'Net eb' }, sectors)}
            data={sectors}
          />
        </Collapsible>
      ) : null}

      {paths.length > 0 ? (
        <Collapsible header="Path accounts">
          <Table
            appearance="condensed"
            columns={tableColumns({ accountCode: 'Account code', gap: 'Gap', seal: 'Seal', net: 'Net', balanced: 'Balanced' }, paths)}
            data={paths}
          />
        </Collapsible>
      ) : null}

      {(metrics?.pathSamples ?? []).map((sample) => {
        const lines = sample.lines.map((line) => ({
          lineNumber: line.lineNumber,
          accountCode: <code>{line.accountCode}</code>,
          debit: formatJournalLineEb(line.debit),
          credit: formatJournalLineEb(line.credit),
          currency: line.currency,
        }))
        return lines.length > 0 ? (
          <Collapsible header={`Journal lines — ${sample.accountCode}`} initCollapsed key={sample.accountCode}>
            <Table
              appearance="condensed"
              columns={tableColumns({ lineNumber: '#', accountCode: 'Account code', debit: 'Debit', credit: 'Credit', currency: 'Currency' }, lines)}
              data={lines}
            />
          </Collapsible>
        ) : null
      })}
    </Gutter>
  )
}

export default CorpusEntropyDashboard
