import { describe, expect, it } from 'vitest'

import { corpusProseEntropy, meanProseRatio, proseEntropy } from './prose-entropy'

describe('prose-entropy — references vs plain text (the point-4 metric)', () => {
  it('all plain text ⇒ proseRatio 1 (max entropy, nothing referenced)', () => {
    const e = proseEntropy('just some plain prose with no references at all here')
    expect(e.links).toBe(0)
    expect(e.proseRatio).toBe(1)
  })

  it('reference-dense body ⇒ low proseRatio (toward min entropy)', () => {
    const dense = proseEntropy('[[a]] [[b]] [[c]] [[d]]')
    const prosey = proseEntropy('a long sentence of plain explanatory prose with one [[link]] only here')
    expect(dense.links).toBe(4)
    expect(dense.proseRatio).toBeLessThan(prosey.proseRatio)
  })

  it('strips frontmatter and code fences before measuring', () => {
    const withFm = proseEntropy('---\nname: x\ndescription: y\n---\n[[a]] [[b]]')
    const bare = proseEntropy('[[a]] [[b]]')
    expect(withFm.proseRatio).toBeCloseTo(bare.proseRatio)
  })

  it('empty body ⇒ ratio 0 (defined, never NaN)', () => {
    expect(proseEntropy('').proseRatio).toBe(0)
    expect(proseEntropy('   ').proseRatio).toBe(0)
  })

  it('corpusProseEntropy ranks highest-entropy first (the collapse targets)', () => {
    const ranked = corpusProseEntropy([
      { name: 'prosey', content: 'lots and lots of plain prose here with hardly any references' },
      { name: 'dense', content: '[[a]] [[b]] [[c]]' },
    ])
    expect(ranked[0].name).toBe('prosey')
    expect(meanProseRatio(ranked)).toBeGreaterThan(0)
  })
})
