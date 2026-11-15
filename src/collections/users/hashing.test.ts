import { describe, expect, it } from 'vitest'

// Cloudflare Workers refuse PBKDF2 above 100,000 iterations, and Payload 4 defaults to 600,000: with the
// default, no password can be set in production (the first user included), while local dev passes.
describe('users — password hashing runs on Cloudflare Workers', () => {
  it('hashes new passwords at 100,000 PBKDF2 iterations, the Workers ceiling', async () => {
    const config = await (await import('@/payload.config')).default
    expect(config.auth.passwordHashIterations).toBe(100000)
  })
})
