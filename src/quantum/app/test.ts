import { describe, it, expect } from 'vitest'
import { isQuantumApp, quantumApps, everyFolderIsQuantumApp } from '@/quantum/app'
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'

// THE PROOF the corpus is built to make true: every folder is a quantum app.
describe('quantum/app — every atom IS a quantum app (proof over the whole corpus)', () => {
  it('THE PROOF: every folder is a quantum app — it carries a content-uuid identity', () => {
    expect(everyFolderIsQuantumApp()).toBe(true)
    expect(quantumApps()).toBe(N.length) // all of them, no exception
  })
  it('isQuantumApp recognizes a real atom and rejects a non-atom', () => {
    expect(isQuantumApp('merge')).toBe(true)
    expect(isQuantumApp('quantum')).toBe(true)
    expect(isQuantumApp('__nonexistent__')).toBe(false)
  })
})
