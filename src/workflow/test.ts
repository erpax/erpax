import { describe, it, expect } from 'vitest'
import { registerServiceHandler, getServiceHandler } from '@/workflow'

// workflow — the running approval chain (BPMN execution). Service-tasks are the
// non-human nodes: handlers register themselves by name and the workflow resolves
// them by `serviceHandler` reference; an unregistered name falls back to null (no-op).
describe('workflow — service-task handler registry', () => {
  it('returns null for an unregistered handler name (no-op fallback)', () => {
    expect(getServiceHandler('not-registered-' + crypto.randomUUID())).toBeNull()
  })

  it('register then resolve returns the same handler by name', () => {
    const name = 'auto-post-journal-entry-' + crypto.randomUUID()
    const handler = async () => ({ success: true, message: 'posted' })
    registerServiceHandler(name, handler)
    expect(getServiceHandler(name)).toBe(handler)
  })

  it('re-registering a name overwrites the prior handler (last write wins)', () => {
    const name = 'svc-' + crypto.randomUUID()
    const first = async () => ({ success: false })
    const second = async () => ({ success: true })
    registerServiceHandler(name, first)
    registerServiceHandler(name, second)
    expect(getServiceHandler(name)).toBe(second)
  })
})
