import { describe, expect, it } from 'vitest'

import { safely, safelySync, valueOf } from './index'

describe('safely — the fallback axis: graceful degradation, never throws', () => {
  it('ok path returns the value', async () => {
    const r = await safely(() => 42, 0)
    expect(r).toEqual({ ok: true, value: 42 })
    expect(valueOf(r)).toBe(42)
  })

  it('a throwing op returns a typed error + fallback (never throws)', async () => {
    const r = await safely(() => {
      throw new Error('boom')
    }, -1)
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.error).toBe('boom')
      expect(r.fallback).toBe(-1)
    }
    expect(valueOf(r)).toBe(-1) // the identity element on failure — every state defined
  })

  it('awaits a rejected promise without throwing', async () => {
    const r = await safely(async () => {
      throw new Error('async-boom')
    }, 7)
    expect(valueOf(r)).toBe(7)
  })

  it('safelySync mirrors it synchronously', () => {
    expect(valueOf(safelySync(() => 'ok', 'fb'))).toBe('ok')
    expect(
      valueOf(
        safelySync(() => {
          throw 'x'
        }, 'fb'),
      ),
    ).toBe('fb')
  })

  it('onError maps the failure message', async () => {
    const r = await safely(
      () => {
        throw new Error('raw')
      },
      0,
      () => 'mapped',
    )
    if (!r.ok) expect(r.error).toBe('mapped')
  })
})
