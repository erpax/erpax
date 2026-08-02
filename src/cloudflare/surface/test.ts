import { describe, expect, it } from 'vitest'

import {
  assertBindingSurface,
  declaredBindings,
  readBindings,
  UNDECLARED_READ_CEILING,
  undeclaredReads,
  unreadBindings,
} from './index'

describe('cloudflare/surface — config and code must agree', () => {
  it('THE LIVE STATE: three reads are undeclared, and each makes its caller a no-op', () => {
    // ANALYTICS → sinkAnalytics returns without writing. QUEUE → emitToQueue returns without
    // sending. WORKFLOWS likewise. Silently, every call, in production, since the names diverged.
    expect([...undeclaredReads()]).toEqual(['ANALYTICS', 'QUEUE', 'WORKFLOWS'])
    expect(UNDECLARED_READ_CEILING).toBe(3)
  })

  it('the gate holds at the ceiling and FAILS on a fourth', () => {
    expect(() => assertBindingSurface()).not.toThrow()
    expect(() => assertBindingSurface(process.cwd(), 2)).toThrow(/read but not declared/)
    expect(() => assertBindingSurface(process.cwd(), 2)).toThrow(/silently does nothing/)
  })

  it('the names the code reads are the ones wrangler declares, minus exactly those three', () => {
    const declared = declaredBindings()
    const read = readBindings()
    const bad = new Set(undeclaredReads())
    for (const r of read) if (!bad.has(r)) expect(declared.has(r)).toBe(true)
  })

  it('A COMMENT IS NOT A USE — the false positive that cost rules/confine a wrong measurement', () => {
    // this very file names env.SOMETHING_FAKE in prose; the scan must not see it
    expect(readBindings().has('SOMETHING_FAKE')).toBe(false)
  })

  it('DECLARED-but-unread is information, never a failure', () => {
    // OpenNext reads WORKER_SELF_REFERENCE; the Payload adapter reads D1 and R2; plugins read more.
    // A gate that failed on these would cry wolf, which is what rules/bypass records the cost of.
    const unread = unreadBindings()
    expect(unread.length).toBeGreaterThan(0)
    expect(unread).toContain('WORKER_SELF_REFERENCE')
    expect(() => assertBindingSurface()).not.toThrow() // unaffected by the count above
  })

  it('the declared set is non-trivial — a broken scan must not read as a pass', () => {
    expect(declaredBindings().size).toBeGreaterThan(20)
    expect(readBindings().size).toBeGreaterThan(10)
  })
})
