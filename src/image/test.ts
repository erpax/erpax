import { describe, it, expect } from 'vitest'
import { uuidImage, uuidAnimation } from './index'

const A = '335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c'
const B = '1e7ff9dc-0da4-8861-b564-16a8f1fd8b41'

describe('image — the deterministic visual face of a content-uuid', () => {
  it('same uuid ⇒ same image (the visual IS the address, tamper-evident)', () => {
    expect(uuidImage(A)).toBe(uuidImage(A))
    expect(uuidImage(A)).toContain('<svg')
    expect(uuidImage(A, 300)).toContain('viewBox="0 0 300 300"')
  })

  it('different uuids ⇒ different images (the address discriminates)', () => {
    expect(uuidImage(A)).not.toBe(uuidImage(B))
  })

  it('the animation face carries deterministic SMIL motion (no JS)', () => {
    expect(uuidAnimation(A)).toContain('animateTransform')
    expect(uuidAnimation(A)).toBe(uuidAnimation(A)) // deterministic
    expect(uuidAnimation(A)).not.toContain('<script') // pure SMIL, computed field
  })

  it('the static image has no animation; the animation adds it to the same sigil', () => {
    expect(uuidImage(A)).not.toContain('animateTransform')
    // both draw the six 60° petals — the animation is the image plus motion
    const petals = (uuidImage(A).match(/<circle/g) ?? []).length
    expect(petals).toBe(7) // 6 petals + 1 core
  })
})
