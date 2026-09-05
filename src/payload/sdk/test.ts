import { describe, it, expect } from 'vitest'
import { getPayloadSdk } from './index'

describe('payload/sdk — one client per runtime', () => {
  it('returns a fresh instance on the server, so no request inherits another request credentials', () => {
    const a = getPayloadSdk()
    const b = getPayloadSdk()
    expect(a).toBeTruthy()
    expect(a).not.toBe(b)
  })

  it('resolves a base URL rather than requiring one to be configured at the call site', () => {
    expect(typeof (getPayloadSdk() as unknown as { baseURL: string }).baseURL).toBe('string')
  })
})
