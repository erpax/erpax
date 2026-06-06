import { describe, it, expect } from 'vitest'
import { append, since, advance } from '@/realtime'

describe('realtime — append-only log + cursor (the live tail)', () => {
  it('append is immutable', () => {
    const a: number[] = []
    const b = append(a, 1)
    expect(a).toEqual([])
    expect(b).toEqual([1])
  })
  it('since returns only events after the cursor (the live tail)', () => {
    let log = append(append([] as number[], 1), 2)
    const cursor = advance(log) // 2
    log = append(log, 3)
    expect(since(log, cursor)).toEqual([3])
  })
  it('advance equals the log length (consumes everything)', () => {
    const log = [1, 2, 3]
    expect(advance(log)).toBe(3)
    expect(since(log, advance(log))).toEqual([])
  })
})
