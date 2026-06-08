import { describe, it, expect } from 'vitest'
import { FifoQueue } from '@/computer/queue'

describe('computer/queue — FIFO', () => {
  it('dequeues in enqueue order', () => {
    const q = new FifoQueue<number>()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    expect(q.dequeue()).toBe(1)
    expect(q.dequeue()).toBe(2)
    expect(q.peek()).toBe(3)
    expect(q.dequeue()).toBe(3)
  })

  it('isEmpty when drained', () => {
    const q = new FifoQueue<string>()
    expect(q.isEmpty()).toBe(true)
    q.enqueue('a')
    expect(q.isEmpty()).toBe(false)
    q.dequeue()
    expect(q.isEmpty()).toBe(true)
  })

  it('toArray snapshots current order without mutation', () => {
    const q = new FifoQueue<number>()
    q.enqueue(10)
    q.enqueue(20)
    expect(q.toArray()).toEqual([10, 20])
    expect(q.size).toBe(2)
  })
})
