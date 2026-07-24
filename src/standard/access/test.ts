import { describe, it, expect } from 'vitest'
import { atomPath, requiredAccessTier } from '@/standard/access'
describe('standard/access — reciprocal of access/standard', () => {
  it('re-exports the legal-floor cross and names its path', () => {
    expect(atomPath).toBe('standard/access')
    expect(requiredAccessTier(['SOX:2002']).tier).toBe('auditor-grade')
  })
})
