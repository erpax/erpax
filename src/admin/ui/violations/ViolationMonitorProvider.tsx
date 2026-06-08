'use client'

import React, { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  isRealtimeEnabled,
  subscribe,
  violationsWatchPath,
} from '@/agent/communication/realtime'
import {
  crossViolationRealtimeEmit,
  isCrossEducationViolation,
  runRealtimeImproveCycle,
  scanViolationsRealtime,
  violationRealtimeEmit,
  type ImproveResult,
  type ViolationEvent,
  type ViolationScanSnapshot,
} from '@/monitor/violations'
import { maxWorkTamperPolicy } from '@/wave'

export interface ViolationMonitorContextValue {
  readonly snapshot: ViolationScanSnapshot
  readonly events: readonly ViolationEvent[]
  readonly crossEducationEvents: readonly ViolationEvent[]
  readonly activeCrossEducation: ViolationEvent | null
  readonly lastApplied: readonly ImproveResult[]
  readonly lastQueued: readonly ViolationEvent[]
  readonly refresh: () => void
  readonly dismissCrossEducation: () => void
}

const DEFAULT_TENANT = 'erpax-corpus'
const DEFAULT_TEAM = 'violation-monitor'
const DEFAULT_SESSION = 'monitor-violations-session'

const emptySnapshot = (): ViolationScanSnapshot => ({
  ok: true,
  scannedAt: new Date(0).toISOString(),
  fingerprint: 'pending',
  events: [],
  counts: { total: 0, bySource: {} },
  waveOrdinal: null,
  wavePathsSampled: 0,
})

const ViolationMonitorContext = createContext<ViolationMonitorContextValue>({
  snapshot: emptySnapshot(),
  events: [],
  crossEducationEvents: [],
  activeCrossEducation: null,
  lastApplied: [],
  lastQueued: [],
  refresh: () => undefined,
  dismissCrossEducation: () => undefined,
})

export interface ViolationMonitorProviderProps {
  readonly children: React.ReactNode
  readonly tenantId?: string
  readonly teamId?: string
  readonly sessionId?: string
  readonly agent?: string
  /** Poll interval for live updates; 0 disables polling. */
  readonly pollMs?: number
  /** When true, new violations toast via Sonner and emit on the wave bus. */
  readonly emitOnChange?: boolean
  /** When true, auto-improve safe violation classes each poll (strict-apply gated). */
  readonly improveOnDetect?: boolean
  /** Max auto-fixes per poll cycle — wave batch cost cap. */
  readonly maxFixesPerCycle?: number
}

export const ViolationMonitorProvider: React.FC<ViolationMonitorProviderProps> = ({
  children,
  tenantId = DEFAULT_TENANT,
  teamId = DEFAULT_TEAM,
  sessionId = DEFAULT_SESSION,
  agent = 'violation-monitor-ui',
  pollMs = 30_000,
  emitOnChange = true,
  improveOnDetect = true,
  maxFixesPerCycle = maxWorkTamperPolicy().maxFixesPerCycle,
}) => {
  const [snapshot, setSnapshot] = useState<ViolationScanSnapshot>(() => scanViolationsRealtime())
  const [lastApplied, setLastApplied] = useState<readonly ImproveResult[]>([])
  const [lastQueued, setLastQueued] = useState<readonly ViolationEvent[]>([])
  const [activeCrossEducation, setActiveCrossEducation] = useState<ViolationEvent | null>(null)
  const knownIds = useRef<ReadonlySet<string>>(new Set())
  const priorFingerprint = useRef<string>('pending')

  const dismissCrossEducation = useCallback(() => setActiveCrossEducation(null), [])

  const refresh = useCallback(() => {
    const next = scanViolationsRealtime({ waveSample: true, maxEvents: 500 })
    const fresh = next.events.filter((e) => !knownIds.current.has(e.id))

    const crossFresh = fresh.filter(
      (e) => e.source === 'cross-concept' || isCrossEducationViolation(e.source),
    )

    if (emitOnChange && fresh.length > 0 && priorFingerprint.current !== 'pending') {
      const result = violationRealtimeEmit({
        scopeTenantId: tenantId,
        tenantId,
        teamId,
        sessionId,
        agent,
        priorFingerprint: priorFingerprint.current,
        snapshot: next,
        newViolations: fresh,
        receipt: { actor: agent, head: null, timestampIso: new Date().toISOString() },
      })
      toast(result.toast.title, { description: result.toast.description })
    }

    if (emitOnChange && crossFresh.length > 0 && priorFingerprint.current !== 'pending') {
      const primary =
        crossFresh.find((e) => e.source === 'cross-concept') ??
        crossFresh.find((e) => e.crossEducation) ??
        crossFresh[0]!
      setActiveCrossEducation(primary)
      const crossResult = crossViolationRealtimeEmit({
        scopeTenantId: tenantId,
        tenantId,
        teamId,
        sessionId: `${sessionId}-cross`,
        agent: `${agent}-cross`,
        violation: primary,
        receipt: { actor: agent, head: null, timestampIso: new Date().toISOString() },
      })
      toast(crossResult.toast.title, {
        description: crossResult.toast.description,
        duration: 12_000,
      })
    }

    if (improveOnDetect && fresh.length > 0 && priorFingerprint.current !== 'pending') {
      const cycle = runRealtimeImproveCycle({
        snapshot: next,
        violations: fresh,
        maxFixes: maxFixesPerCycle,
        tenantId,
        teamId,
        sessionId: `${sessionId}-improve`,
        actor: `${agent}-improve`,
        emitWave: emitOnChange,
      })
      setLastApplied(cycle.applied.filter((r) => r.applied))
      setLastQueued(cycle.queued)
      const fixed = cycle.applied.filter((r) => r.applied)
      if (fixed.length > 0) {
        toast(cycle.toast.title, { description: cycle.toast.description })
        setSnapshot(cycle.snapshot)
        knownIds.current = new Set(cycle.snapshot.events.map((e) => e.id))
        priorFingerprint.current = cycle.snapshot.fingerprint
        return
      }
      if (cycle.queued.length > 0 && priorFingerprint.current !== 'pending') {
        toast('Violations queued', {
          description: `${cycle.queued.length} await human gate (tenant/invoices/structure)`,
        })
      }
    }

    knownIds.current = new Set(next.events.map((e) => e.id))
    priorFingerprint.current = next.fingerprint
    setSnapshot((prev) => (next.fingerprint !== prev.fingerprint ? next : prev))
  }, [agent, emitOnChange, improveOnDetect, maxFixesPerCycle, sessionId, teamId, tenantId])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!isRealtimeEnabled()) return
    return subscribe(violationsWatchPath(), () => refresh())
  }, [refresh])

  useEffect(() => {
    if (!pollMs || pollMs <= 0) return
    const interval = isRealtimeEnabled() ? pollMs * 6 : pollMs
    const id = window.setInterval(refresh, interval)
    return () => window.clearInterval(id)
  }, [pollMs, refresh])

  const crossEducationEvents = useMemo(
    () =>
      snapshot.events.filter(
        (e) => e.source === 'cross-concept' || isCrossEducationViolation(e.source),
      ),
    [snapshot.events],
  )

  const value = useMemo(
    () => ({
      snapshot,
      events: snapshot.events,
      crossEducationEvents,
      activeCrossEducation,
      lastApplied,
      lastQueued,
      refresh,
      dismissCrossEducation,
    }),
    [
      snapshot,
      crossEducationEvents,
      activeCrossEducation,
      lastApplied,
      lastQueued,
      refresh,
      dismissCrossEducation,
    ],
  )

  return <ViolationMonitorContext value={value}>{children}</ViolationMonitorContext>
}

export const useViolationMonitor = (): ViolationMonitorContextValue => use(ViolationMonitorContext)

export type { ViolationEvent, ViolationScanSnapshot, ImproveResult }
