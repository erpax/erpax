import { describe, expect, it } from 'vitest'

import { adminFieldVisibleForWrite } from './index'

describe('admin/ui/visibility — computed access conditions', () => {
  it('internal context sees write fields', () => {
    expect(adminFieldVisibleForWrite({}, {}, {})).toBe(true)
  })

  it('read-only role hides write-gated fields', () => {
    expect(
      adminFieldVisibleForWrite(
        {},
        {},
        { user: { tenant: 't1', roles: ['viewer'] } },
      ),
    ).toBe(false)
  })

  it('accountant role sees write-gated fields', () => {
    expect(
      adminFieldVisibleForWrite(
        {},
        {},
        { user: { tenant: 't1', roles: ['accountant'] } },
      ),
    ).toBe(true)
  })
})
