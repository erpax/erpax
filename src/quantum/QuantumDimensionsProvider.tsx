'use client'

import React, { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  buildDimensionSnapshot,
  dimensionRealtimeEmit,
  type DimensionAxisState,
  type DimensionRealtimeEmitResult,
  type DimensionSnapshot,
  type QuantumProjectionDimension,
} from '@/quantum/dimension-realtime'

export interface QuantumDimensionsContextValue {
  readonly snapshot: DimensionSnapshot
  readonly refresh: () => void
  readonly emitDimensionChange: (
    dimension: QuantumProjectionDimension,
    priorSeal: string,
    nextSeal: string,
    r?: number,
  ) => DimensionRealtimeEmitResult
}

const DEFAULT_TENANT = 'erpax-corpus'
const DEFAULT_TEAM = 'quantum-dimensions'
const DEFAULT_SESSION = '0896eab2-dimension-session'

const fallbackSnapshot = (): DimensionSnapshot => ({
  ok: false,
  axes: [],
  fingerprint: 'pending',
  borrowedEb: 0,
})

const QuantumDimensionsContext = createContext<QuantumDimensionsContextValue>({
  snapshot: fallbackSnapshot(),
  refresh: () => undefined,
  emitDimensionChange: () => {
    throw new Error('QuantumDimensionsProvider missing')
  },
})

export interface QuantumDimensionsProviderProps {
  readonly children: React.ReactNode
  readonly tenantId?: string
  readonly teamId?: string
  readonly sessionId?: string
  readonly agent?: string
  /** Poll interval for live updates; 0 disables polling. */
  readonly pollMs?: number
  /** When true, seal transitions toast via Sonner and emit on the wave bus. */
  readonly emitOnChange?: boolean
}

export const QuantumDimensionsProvider: React.FC<QuantumDimensionsProviderProps> = ({
  children,
  tenantId = DEFAULT_TENANT,
  teamId = DEFAULT_TEAM,
  sessionId = DEFAULT_SESSION,
  agent = 'quantum-dimensions-ui',
  pollMs = 0,
  emitOnChange = true,
}) => {
  const [snapshot, setSnapshot] = useState<DimensionSnapshot>(() => buildDimensionSnapshot())
  const priorSeals = useRef<Readonly<Record<string, string>>>({})

  const refresh = useCallback(() => {
    const next = buildDimensionSnapshot()
    setSnapshot((prev) => {
      if (emitOnChange) {
        for (const axis of next.axes) {
          const prior = priorSeals.current[axis.dimension]
          if (prior && prior !== axis.seal) {
            const result = dimensionRealtimeEmit({
              scopeTenantId: tenantId,
              tenantId,
              teamId,
              sessionId,
              agent,
              dimension: axis.dimension,
              priorSeal: prior,
              nextSeal: axis.seal,
            })
            toast(result.toast.title, { description: result.toast.description })
          }
          priorSeals.current[axis.dimension] = axis.seal
        }
      } else {
        for (const axis of next.axes) {
          priorSeals.current[axis.dimension] = axis.seal
        }
      }
      return next.fingerprint !== prev.fingerprint ? next : prev
    })
  }, [agent, emitOnChange, sessionId, teamId, tenantId])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!pollMs || pollMs <= 0) return
    const id = window.setInterval(refresh, pollMs)
    return () => window.clearInterval(id)
  }, [pollMs, refresh])

  const emitDimensionChange = useCallback(
    (
      dimension: QuantumProjectionDimension,
      priorSeal: string,
      nextSeal: string,
      r = 0,
    ): DimensionRealtimeEmitResult => {
      const result = dimensionRealtimeEmit({
        scopeTenantId: tenantId,
        tenantId,
        teamId,
        sessionId,
        agent,
        dimension,
        priorSeal,
        nextSeal,
        r,
        receipt: { actor: agent, head: null, timestampIso: new Date().toISOString() },
      })
      toast(result.toast.title, { description: result.toast.description })
      priorSeals.current[dimension] = nextSeal
      refresh()
      return result
    },
    [agent, refresh, sessionId, teamId, tenantId],
  )

  const value = useMemo(
    () => ({ snapshot, refresh, emitDimensionChange }),
    [snapshot, refresh, emitDimensionChange],
  )

  return <QuantumDimensionsContext value={value}>{children}</QuantumDimensionsContext>
}

export const useQuantumDimensions = (): QuantumDimensionsContextValue => use(QuantumDimensionsContext)

export type { DimensionAxisState, DimensionSnapshot, QuantumProjectionDimension }
