import { describe, it, expect } from 'vitest'
import { LifoStack } from '@/computer/stack'

describe('computer/stack — LIFO', () => {
  it('pops in reverse push order', () => {
    const s = new LifoStack<number>()
    s.push(1)
    s.push(2)
    s.push(3)
    expect(s.pop()).toBe(3)
    expect(s.pop()).toBe(2)
    expect(s.peek()).toBe(1)
    expect(s.pop()).toBe(1)
  })

  it('isEmpty when drained', () => {
    const s = new LifoStack<string>()
    expect(s.isEmpty()).toBe(true)
    s.push('frame')
    expect(s.isEmpty()).toBe(false)
    s.pop()
    expect(s.isEmpty()).toBe(true)
  })

  it('toArray snapshots bottom-to-top', () => {
    const s = new LifoStack<number>()
    s.push(100)
    s.push(200)
    expect(s.toArray()).toEqual([100, 200])
    expect(s.size).toBe(2)
  })
})
