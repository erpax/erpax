'use client'

import React, { useMemo } from 'react'

import { tableColumns, useViolationMonitor, type ViolationEvent } from '@/admin/ui'
import { Banner, Button, Collapsible, Gutter, Pill, Table, type PillProps } from '@payloadcms/ui'

const severityStyle = (severity: ViolationEvent['severity']): PillProps['pillStyle'] =>
  severity === 'error' ? 'error' : severity === 'warning' ? 'warning' : 'light'

/** Payload afterDashboard — live violation monitor, built from the admin panel's own components. */
const ViolationMonitorPanel: React.FC = () => {
  const { snapshot, events, crossEducationEvents, activeCrossEducation, lastApplied, lastQueued, refresh, dismissCrossEducation } =
    useViolationMonitor()
  const education = activeCrossEducation ?? crossEducationEvents[0]

  const sources = useMemo(
    () =>
      Object.entries(snapshot.counts.bySource)
        .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
        .slice(0, 10)
        .map(([source, count]) => ({ source, count: count ?? 0 })),
    [snapshot.counts.bySource],
  )
  const rows = events.map((row) => ({
    source: row.source,
    accountCode: (
      <Pill pillStyle="light-gray" size="small">
        <code>{row.accountCode}</code>
      </Pill>
    ),
    detail: row.detail,
    severity: <Pill pillStyle={severityStyle(row.severity)} size="small">{row.severity}</Pill>,
  }))

  return (
    <Gutter>
      <Banner type={snapshot.ok ? 'success' : 'error'}>
        Corpus violation monitor — {snapshot.counts.total} violation(s), scanned {snapshot.scannedAt}. Safe classes are
        improved on each poll; tenant, invoice and structure changes wait for a person.
        {snapshot.waveOrdinal != null ? ` Wave ${snapshot.waveOrdinal}/7 · ${snapshot.wavePathsSampled} paths sampled.` : null}
      </Banner>

      {education ? (
        <Collapsible
          actions={<Button buttonStyle="secondary" margin={false} onClick={() => dismissCrossEducation()} size="small">Dismiss</Button>}
          collapsibleStyle="error"
          header="Cross education — axis uncrossed"
        >
          <p>
            {education.detail}
            {education.uncrossedAxes?.length ? <code> axes: {education.uncrossedAxes.join(', ')}</code> : null}
          </p>
          {education.crossEducation ? <pre>{education.crossEducation}</pre> : null}
        </Collapsible>
      ) : null}

      <div>
        <Pill pillStyle={snapshot.ok ? 'success' : 'error'}>{snapshot.counts.total} violation(s)</Pill>{' '}
        <Pill pillStyle="light-gray">fp {snapshot.fingerprint.slice(0, 8)}…</Pill>{' '}
        {lastApplied.length > 0 ? <Pill pillStyle="success">{lastApplied.length} improved</Pill> : null}{' '}
        {lastQueued.length > 0 ? <Pill pillStyle="warning">{lastQueued.length} gated</Pill> : null}{' '}
        {crossEducationEvents.length > 0 ? <Pill pillStyle="error">{crossEducationEvents.length} cross</Pill> : null}{' '}
        <Button buttonStyle="secondary" onClick={() => refresh()} size="small">Refresh scan</Button>
      </div>

      {sources.length > 0 ? (
        <Table appearance="condensed" columns={tableColumns({ source: 'Source axis', count: 'Count' }, sources)} data={sources} />
      ) : null}

      {rows.length > 0 ? (
        <Collapsible header={`Violation events — ${rows.length}`} initCollapsed>
          <Table
            appearance="condensed"
            columns={tableColumns({ source: 'Source', accountCode: 'Account', detail: 'Detail', severity: 'Severity' }, rows)}
            data={rows}
          />
        </Collapsible>
      ) : null}
    </Gutter>
  )
}

export default ViolationMonitorPanel
