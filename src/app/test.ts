import { describe, it, expect } from 'vitest'
import { app, isApp } from '@/app'

describe('app — an atom is an app', () => {
  it('app(atom) gives its identity (content-uuid) + API surface (links)', () => {
    const a = app('merge')
    expect(a).toBeDefined()
    expect(a!.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(a!.links).toBeGreaterThanOrEqual(0)
  })
  it('isApp recognizes a real atom, rejects a non-atom', () => {
    expect(isApp('merge')).toBe(true)
    expect(isApp('__nonexistent__')).toBe(false)
  })
})
