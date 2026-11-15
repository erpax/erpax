import crypto from 'node:crypto'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PBKDF2_ROUND_CAP, stretch } from '@/utilities/crypto'

// Cloudflare Workers refuse a PBKDF2 call above 100,000 iterations. erpax hashes at 600,000 by patching
// Payload's hashing to chain rounds of at most 100,000 (patches/payload@4.0.0-beta.9.patch), the
// construction @/utilities/crypto `stretch` defines. Payload does not export the function, so the
// patched module is loaded by its path.
const payloadHashing = async () =>
  (await import(pathToFileURL(join(process.cwd(), 'node_modules/payload/dist/auth/strategies/local/generatePasswordSaltHash.js')).href)) as {
    pbkdf2Promisified: (args: { iterations: number; keyLength: number; password: string; salt: string }) => Promise<Buffer>
  }

describe('users — password hashing at 600,000 iterations, in rounds Cloudflare Workers accept', () => {
  afterEach(() => vi.restoreAllMocks())

  it('configures 600,000 iterations', async () => {
    const config = await (await import('@/payload.config')).default
    expect(config.auth.passwordHashIterations).toBe(600000)
  })

  it("stores exactly what crypto's stretch computes, and no PBKDF2 call exceeds the cap", async () => {
    const counts: number[] = []
    const original = crypto.pbkdf2
    vi.spyOn(crypto, 'pbkdf2').mockImplementation(((password: never, salt: never, iterations: number, keyLength: never, digest: never, done: never) => {
      counts.push(iterations)
      return original(password, salt, iterations, keyLength, digest, done)
    }) as never)
    const salt = 'ab'.repeat(32)
    const args = { iterations: 600000, keyLength: 32, password: 'correct horse battery staple', salt }
    const stored = await (await payloadHashing()).pbkdf2Promisified(args)
    expect(counts.length).toBeGreaterThan(1)
    expect(Math.max(...counts)).toBeLessThanOrEqual(PBKDF2_ROUND_CAP)
    expect(counts.reduce((a, b) => a + b, 0)).toBe(600000)
    expect(stored.equals(await stretch(args))).toBe(true)
  })
})
