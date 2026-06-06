import { describe, it, expect } from 'vitest'
import { cross as drCross } from '@/development/research'
import { cross as rdCross } from '@/research/development'
import { entangle } from '@/entanglement'

// "Do the math": the bidirectional cross X/Y ⊕ Y/X is ONE binding (order-free entanglement).
describe('development/research ⊕ research/development — the symmetric R&D cross', () => {
  it('X/Y equals Y/X — the cross is one entangled binding', () => {
    expect(drCross()).toBe(rdCross())
    expect(drCross()).toBe(entangle('research', 'development'))
  })
  it('the cross binding is a content-uuid', () => {
    expect(drCross()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
