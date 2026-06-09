import { describe, it, expect } from 'vitest'
import { packageApprovalMatrix, readInstalledPackages, PAYLOAD_NODE_OPTIONS } from './approval'

describe('apply/approval — package matrix', () => {
  it('readInstalledPackages is sorted from package.json', () => {
    const pkgs = readInstalledPackages()
    expect(pkgs.length).toBeGreaterThan(50)
    expect(pkgs).toContain('payload')
    expect([...pkgs].sort((a, b) => a.localeCompare(b))).toEqual(pkgs)
  })

  it('matrix rows have package · step · command · approved shape', () => {
    const { rows } = packageApprovalMatrix({ execute: false })
    for (const row of rows) {
      expect(row.package).toBeTypeOf('string')
      expect(row.step).toBeTypeOf('string')
      expect(row.approved === null || typeof row.approved === 'boolean').toBe(true)
    }
  })

  it('payload step is generate-types first', () => {
    const payload = packageApprovalMatrix({ execute: false }).rows.find((r) => r.package === 'payload')
    expect(payload?.step).toBe('payload:approval')
    expect(PAYLOAD_NODE_OPTIONS).toContain('tsx/esm')
  })

  it('@payloadcms/* skip — covered by payload', () => {
    const row = packageApprovalMatrix({ execute: false }).rows.find((r) => r.package === '@payloadcms/ui')
    expect(row?.skipReason).toMatch(/payload/i)
  })

  it('unknown packages skip without crash', () => {
    const row = packageApprovalMatrix({ execute: false }).rows.find((r) => r.package === 'clsx')
    expect(row?.skipReason).toMatch(/no provable verify/i)
  })

  it('vitest skipped by default without --smoke', () => {
    const row = packageApprovalMatrix({ execute: false, smoke: false }).rows.find((r) => r.package === 'vitest')
    expect(row?.skipReason).toMatch(/smoke/i)
  })
})
