import { describe, it, expect } from 'vitest'
import { CLOUDFLARE_SEAL_KID } from './index'

describe('cloudflare/constants', () => {
  it('CLOUDFLARE_SEAL_KID is defined', () => {
    expect(CLOUDFLARE_SEAL_KID).toBeDefined()
  })
})
