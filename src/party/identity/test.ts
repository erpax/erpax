import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { partyUuid, isSameParty, rolesOf, atomPath } from './index'

const acme = { country: 'BG', taxId: '123456789' }

describe('party/identity — a party is what it IS, not what it is to you', () => {
  it('names its path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).leaf)
  })

  /**
   * THE ERP SOLUTION. rules/collapse measured customers ⊂ vendors, differing by exactly `bank`. They are one
   * party in two states — so the same company in both lists must be ONE address. Not matched: COLLIDED.
   */
  it('the same company as CUSTOMER and as VENDOR folds to ONE address', () => {
    const asCustomer = partyUuid(acme)
    const asVendor = partyUuid(acme)
    expect(asVendor).toBe(asCustomer) // the duplicate cannot exist, rather than being found
    expect(asCustomer).toHaveLength(36)
  })

  it('the role is NOT in the address — a customer who becomes a supplier is the same legal person', () => {
    expect(isSameParty(acme, { ...acme })).toBe(true)
    // there is no role parameter to pass: the type makes the mistake unrepresentable
  })

  // A tax id is unique only WITHIN its jurisdiction. Folding without the country merges two real companies.
  it('the jurisdiction is part of the identity — BG123 and DE123 are DIFFERENT companies', () => {
    expect(partyUuid({ country: 'BG', taxId: '123' })).not.toBe(partyUuid({ country: 'DE', taxId: '123' }))
  })

  it('normalises formatting, not identity — spacing and case are noise', () => {
    expect(partyUuid({ country: 'bg', taxId: '12 34-56' })).toBe(partyUuid({ country: 'BG', taxId: '123456' }))
  })

  // Names change: rebrands, translations, "Ltd" vs "OOD". An address that moves when a company renames is a
  // label, not an identity — every invoice pointing at the old fold would orphan.
  it('the NAME is not identity — it is not an input at all', () => {
    const withName = { ...acme, name: 'Acme OOD' } as never
    expect(partyUuid(withName)).toBe(partyUuid(acme)) // a rename cannot move the address
  })

  // A silent merge of two parties is worse than a duplicate — so it refuses rather than folding on a name.
  it('REFUSES a party with no tax registration — it is not foldable', () => {
    expect(() => partyUuid({ country: 'BG', taxId: '' })).toThrow(/not foldable/)
    expect(() => partyUuid({ country: '', taxId: '123' })).toThrow(/country \+ taxId/)
  })

  // The superposition, measured: one entity, both states.
  it('rolesOf collapses the two books — one party HOLDS roles, it is not typed by one', () => {
    const roles = rolesOf([
      { identity: acme, role: 'customer' },
      { identity: acme, role: 'vendor' }, // the same company, the other book
      { identity: { country: 'DE', taxId: '999' }, role: 'vendor' },
    ])
    expect(roles.size).toBe(2) // three records, TWO parties
    expect([...roles.get(partyUuid(acme))!].sort()).toEqual(['customer', 'vendor'])
  })
})
