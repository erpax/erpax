/**
 * Signed content uuid: ML-DSA through the crypto door, and its JWS compact form.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard FIPS 204 ML-DSA
 */
import { describe, expect, it } from 'vitest'

import { SIGNATURE, signingKeys } from '@/utilities/crypto'
import type { ContentUuid } from '@/utilities/integrity/content'
import { fromJws, signContentUuid, toJws, verifyContentUuidSignature } from '@/utilities/integrity/signatures'

const A = '0f8e9d4a-6b1c-8e2f-9a3b-4c5d6e7f8091' as ContentUuid<unknown>
const B = '1f8e9d4a-6b1c-8e2f-9a3b-4c5d6e7f8091' as ContentUuid<unknown>

describe('integrity/signatures', () => {
  it('signs with ML-DSA and verifies under the matching public key only', async () => {
    const mine = await signingKeys()
    const theirs = await signingKeys()
    const signed = await signContentUuid({ uuid: A, privateKey: mine.privateKey, kid: 't/k' })
    expect(signed.alg).toBe(SIGNATURE)
    expect(await verifyContentUuidSignature({ signed, publicKey: mine.publicKey })).toBe(true)
    expect(await verifyContentUuidSignature({ signed, publicKey: theirs.publicKey })).toBe(false)
  })

  it('refuses another uuid, a corrupted signature, or another algorithm', async () => {
    const { privateKey, publicKey } = await signingKeys()
    const signed = await signContentUuid({ uuid: A, privateKey, kid: 'k' })
    expect(await verifyContentUuidSignature({ signed: { ...signed, uuid: B }, publicKey })).toBe(false)
    expect(await verifyContentUuidSignature({ signed: { ...signed, sig: `${signed.sig.slice(0, -2)}AA` }, publicKey })).toBe(false)
    expect(await verifyContentUuidSignature({ signed: { ...signed, sig: 'AAAA' }, publicKey })).toBe(false)
    expect(await verifyContentUuidSignature({ signed: { ...signed, alg: 'EdDSA' as never }, publicKey })).toBe(false)
  })

  it('round-trips through the JWS compact form, and refuses a malformed one', async () => {
    const { privateKey, publicKey } = await signingKeys()
    const signed = await signContentUuid({ uuid: A, privateKey, kid: 'tenant-1/k/2026', signedAt: '2026-11-16T00:00:00.000Z' })
    const back = fromJws(toJws(signed))
    expect(back).toEqual(signed)
    expect(await verifyContentUuidSignature({ signed: back, publicKey })).toBe(true)
    expect(() => fromJws('only.two')).toThrow()
    expect(() => fromJws(`${btoa('{}').replace(/=/g, '')}.e30.x`)).toThrow(/alg\/kid/)
  })
})
