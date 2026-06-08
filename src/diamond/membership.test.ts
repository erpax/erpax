import { describe, it, expect } from 'vitest'
import { diamondMembershipViolations, diamondMembershipOk } from '@/diamond/membership'

describe('diamond/membership — stray matter blocks seal', () => {
  it('skill/router has membership violations', () => {
    const v = diamondMembershipViolations('skill/router')
    expect(v.length).toBeGreaterThan(0)
    expect(diamondMembershipOk('skill/router')).toBe(false)
  })

  it('law/folder is membership-pure', () => {
    expect(diamondMembershipOk('law/folder')).toBe(true)
  })
})
