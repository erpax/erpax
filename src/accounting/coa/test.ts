import { describe, it, expect } from 'vitest'
import {
  accountCodeOf,
  accountCoordinateOf,
  balanceByPath,
  ENTROPY_CONTRA_PATH,
  postEntry,
  postGapOnPath,
  postSealOnPath,
  SEAL_CONTRA_PATH,
  entropyLinesToPathEntry,
} from './index'
import { ebToMilliEb } from '../corpus'

describe('accounting/coa — path is the account code', () => {
  it('accountCodeOf normalizes full path — homonyms are distinct', () => {
    expect(accountCodeOf('agents/accounting')).toBe('agents/accounting')
    expect(accountCodeOf('accounting')).toBe('accounting')
    expect(accountCodeOf('agents/accounting')).not.toBe(accountCodeOf('accounting'))
    expect(accountCodeOf('src/quantum/emr')).toBe('quantum/emr')
    expect(accountCodeOf('/law/folder/')).toBe('law/folder')
    expect(accountCodeOf('computer')).not.toBe(accountCodeOf('computational'))
    expect(accountCodeOf('body')).not.toBe(accountCodeOf('boat'))
  })

  it('parent path ≠ child path as distinct accounts', () => {
    expect(accountCodeOf('quantum')).not.toBe(accountCodeOf('quantum/emr'))
    expect(accountCodeOf('law')).not.toBe(accountCodeOf('law/folder'))
  })

  it('accountCoordinateOf pairs path with matrix bind', () => {
    const coord = accountCoordinateOf('readme')
    expect(coord).toContain('readme')
    expect(coord).toMatch(/·/)
  })

  it('postEntry keys lines by normalized path with eb units', () => {
    const line = postEntry('card', ebToMilliEb(1.5), 0)
    expect(line.accountCode).toBe('card')
    expect(line.debit).toBe(1500)
    expect(line.description).toBe('eb')
  })

  it('postGapOnPath debits folder path · credits entropy contra — balanced pair', () => {
    const pair = postGapOnPath('card', 2)
    expect(pair).toHaveLength(2)
    expect(pair[0]!.accountCode).toBe('card')
    expect(pair[0]!.debit).toBe(2000)
    expect(pair[1]!.accountCode).toBe(ENTROPY_CONTRA_PATH)
    expect(pair[1]!.credit).toBe(2000)
    expect(pair[0]!.debit).toBe(pair[1]!.credit)
  })

  it('postSealOnPath debits seal contra · credits folder path — balanced pair', () => {
    const pair = postSealOnPath('seal', 1)
    expect(pair[0]!.accountCode).toBe(SEAL_CONTRA_PATH)
    expect(pair[1]!.accountCode).toBe('seal')
    expect(pair[0]!.debit).toBe(pair[1]!.credit)
  })

  it('entropyLinesToPathEntry balances per path across gap ∪ seal', () => {
    const entry = entropyLinesToPathEntry(
      'card',
      [{ comparable: 1.585 }],
      [{ comparable: 1 }],
    )
    expect(entry.balanced).toBe(true)
    expect(entry.totalDebits).toBe(entry.totalCredits)
    const byPath = balanceByPath(entry)
    expect(byPath['card']).toBe(ebToMilliEb(0.585))
    expect(byPath[ENTROPY_CONTRA_PATH]).toBe(-ebToMilliEb(1.585))
    expect(byPath[SEAL_CONTRA_PATH]).toBe(ebToMilliEb(1))
  })
})
