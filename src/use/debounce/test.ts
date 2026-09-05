// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './index'

afterEach(() => vi.useRealTimers())

describe('use/debounce — the keystroke is not the query', () => {
  it('holds the first value until the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), { initialProps: { v: 'a' } })
    expect(result.current).toBe('a')
    rerender({ v: 'ab' })
    expect(result.current).toBe('a')
    act(() => void vi.advanceTimersByTime(200))
    expect(result.current).toBe('ab')
  })

  it('a change inside the window replaces the pending value rather than queueing it', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), { initialProps: { v: 'a' } })
    rerender({ v: 'ab' })
    act(() => void vi.advanceTimersByTime(150))
    rerender({ v: 'abc' })
    act(() => void vi.advanceTimersByTime(150))
    expect(result.current).toBe('a')
    act(() => void vi.advanceTimersByTime(50))
    expect(result.current).toBe('abc')
  })
})
