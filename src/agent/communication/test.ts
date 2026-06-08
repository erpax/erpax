import { describe, it, expect, beforeEach, vi } from 'vitest'
import { send, relay, sameMessage } from '@/agent/communication'
import {
  REALTIME_DEFAULT,
  __resetRealtimeForTests,
  bindWatchRealtime,
  isRealtimeEnabled,
  publish,
  realtimeChannelFor,
  realtimeDoctorLine,
  subscribe,
  violationsWatchPath,
} from './realtime'
import { __resetDirectionBusForTests } from '@/quantum/entanglement/direction-bus'
import { resetCrossViolationStream } from '@/monitor/violations/stream'

describe('agent/communication/realtime — unified push facade', () => {
  beforeEach(() => {
    __resetRealtimeForTests()
    __resetDirectionBusForTests()
    resetCrossViolationStream()
    delete process.env.ERPAX_REALTIME
  })

  it('REALTIME_DEFAULT is true', () => {
    expect(REALTIME_DEFAULT).toBe(true)
    expect(isRealtimeEnabled()).toBe(true)
  })

  it('publish notifies subscriber synchronously in the same tick', () => {
    const path = violationsWatchPath()
    let received: unknown = null
    subscribe(path, (e) => {
      received = e.payload
    })
    const payload = { reason: 'scan-tick' }
    publish(path, { kind: 'scan', payload })
    expect(received).toEqual(payload)
  })

  it('watch signal fires on publish without waiting poll interval', () => {
    vi.useFakeTimers()
    const path = violationsWatchPath()
    let ticks = 0
    bindWatchRealtime({
      paths: [path],
      onSignal: () => {
        ticks++
      },
      pollMs: 60_000,
    })
    expect(ticks).toBe(0)
    publish(path, { kind: 'scan', payload: { n: 1 } })
    expect(ticks).toBe(1)
    vi.advanceTimersByTime(59_999)
    expect(ticks).toBe(1)
    vi.useRealTimers()
  })

  it('realtimeChannelFor tracks subscribers and last event age', () => {
    const ch = realtimeChannelFor('agent/test-channel')
    ch.subscribe(() => undefined)
    ch.publish({ kind: 'generic', payload: { n: 1 } })
    expect(ch.subscriberCount()).toBe(1)
    expect(ch.lastEventAgeMs()).toBeLessThanOrEqual(5)
  })

  it('realtimeDoctorLine reports channel count', () => {
    publish(violationsWatchPath(), { kind: 'scan', payload: {} })
    expect(realtimeDoctorLine()).toMatch(/realtime channels 1 · last event/)
  })
})

describe('agent/communication — agent-to-agent transfer (content preserved)', () => {
  it('send binds from/to/uuid', () => {
    const m = send('a', 'b', 'u1')
    expect(m).toEqual({ from: 'a', to: 'b', uuid: 'u1' })
  })
  it('relay preserves the content-uuid (no-cloning), re-routing the recipient', () => {
    const m = send('a', 'b', 'u1')
    const r = relay(m, 'c')
    expect(sameMessage(m, r)).toBe(true)
    expect(r.to).toBe('c')
  })
})
