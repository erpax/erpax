/**
 * NIST INCITS 359 RBAC conventions tests — Unix rwx ↔ triplet round-trip.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard POSIX-1.2017 §1.6.1.1 file-mode-bits
 * @standard NIST INCITS-359-2012 role-based-access-control vocabulary-layer
 * @security ISO-27002 §5.15 access-control
 * @see src/standards/nist-incits-359/conventions.ts
 */

import { describe, it, expect } from 'vitest'

import { permissionStringToTriplet, permissionTripletToString } from '@/nist/incits/359/conventions'

describe('permission conventions (unix analogy)', () => {
  it('round-trips triplet to string like chmod notation', () => {
    expect(
      permissionTripletToString({
        owner: 7,
        group: 5,
        other: 4,
      }),
    ).toBe('rwxr-xr--')
  })

  it('parses rwxr-x--- back to digits', () => {
    expect(permissionStringToTriplet('rwxr-x---')).toEqual({
      owner: 7,
      group: 5,
      other: 0,
    })
  })
})
