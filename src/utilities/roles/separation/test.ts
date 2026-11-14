import { describe, expect, it } from 'vitest'

import { accountConflicts, conflictMessage, partyConflicts } from '@/utilities/roles/separation'

describe('separation of duties', () => {
  it('account roles: the registry exclusions are enforced in either direction', () => {
    expect(accountConflicts(['admin', 'auditor'])).toEqual([['admin', 'auditor']])
    expect(accountConflicts(['auditor', 'admin'])).toEqual([['auditor', 'admin']])
    expect(accountConflicts(['accountant', 'auditor', 'user'])).toEqual([['accountant', 'auditor']])
  })
  it('account roles: compatible roles and unknown roles raise nothing', () => {
    expect(accountConflicts(['admin', 'user'])).toEqual([])
    expect(accountConflicts(['nonsense', 'other'])).toEqual([])
    expect(accountConflicts([])).toEqual([])
  })
  it('a conflict is reported once, not once per direction', () => {
    expect(accountConflicts(['admin', 'auditor', 'customer'])).toHaveLength(3)
  })
  it('party roles: the maker is not the checker on one document', () => {
    expect(partyConflicts(['requester', 'approver'])).toEqual([['requester', 'approver']])
    expect(partyConflicts(['requester'])).toEqual([])
    expect(partyConflicts(['buyer', 'seller'])).toEqual([])
  })
  it('names the pairs in the refusal', () => {
    expect(conflictMessage([['requester', 'approver']])).toContain('"requester" and "approver"')
  })
})
