import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { atomPath, requiredAccessTier } from '@/standard/access'
describe('standard/access — reciprocal of access/standard', () => {
  it('re-exports the legal-floor cross and names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(requiredAccessTier(['SOX:2002']).tier).toBe('auditor-grade')
  })
})
