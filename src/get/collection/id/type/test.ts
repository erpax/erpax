import { describe, expect, it } from 'vitest'
import { atomAddress } from '@/atom/address'
import { getCollectionIDType } from './index'

/** A payload stand-in: only the two fields this lookup reads. */
const payloadWith = (customIDType: 'number' | 'text' | undefined, defaultIDType: 'number' | 'text') =>
  ({ collections: { posts: { customIDType } }, db: { defaultIDType } }) as never

describe('get/collection/id/type', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('get/collection/id/type')
  })

  it("prefers the COLLECTION's own override", () => {
    expect(getCollectionIDType({ collectionSlug: 'posts' as never, payload: payloadWith('text', 'number') })).toBe('text')
  })

  it("falls back to the ADAPTER's default when the collection declares none", () => {
    expect(getCollectionIDType({ collectionSlug: 'posts' as never, payload: payloadWith(undefined, 'number') })).toBe('number')
  })

  it('falls back for a collection the config does not hold at all', () => {
    // The failure this prevents: assuming `number`, building a query against a text id, and getting
    // an empty result that reads as "not found" with no error anywhere.
    expect(getCollectionIDType({ collectionSlug: 'absent' as never, payload: payloadWith(undefined, 'text') })).toBe('text')
  })
})
