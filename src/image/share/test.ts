import { describe, expect, it } from 'vitest'
import { coilCrosses } from '@/quantum/coil'
import { coilImage, shareFrame, shareImage } from './index'

const { width: SHARE_WIDTH, height: SHARE_HEIGHT } = shareFrame()

const uuid = '335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c'

describe('image/share — the Open Graph image, pure and animated', () => {
  it('is 1200×630, carries the SEO title and description escaped, and animates with SMIL only', () => {
    const svg = shareImage({ title: 'Trial <balance> & "ledger"', description: 'Every debit meets its credit', uuid, site: 'erpax' })
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain(`width="${SHARE_WIDTH}" height="${SHARE_HEIGHT}"`)
    expect(svg).toContain('Trial &lt;balance&gt; &amp; &quot;ledger&quot;')
    expect(svg).not.toContain('<balance>')
    expect(svg).toContain('Every debit meets its credit')
    expect(svg).toContain('ERPAX')
    expect(svg).toContain('animateTransform')
    expect(svg).not.toMatch(/<script/i)
  })

  it('same uuid ⇒ same picture; a different uuid ⇒ a different sigil', () => {
    const a = shareImage({ title: 't', uuid })
    expect(shareImage({ title: 't', uuid })).toBe(a)
    expect(shareImage({ title: 't', uuid: '00000000-0000-8000-8000-000000000000' })).not.toBe(a)
  })

  it('wraps a long title to three lines and clips, never overflowing the frame', () => {
    const svg = shareImage({ title: 'word '.repeat(80).trim(), uuid })
    const lines = svg.match(/font-size="60"/g) ?? []
    expect(lines.length).toBe(3)
    expect(svg).toContain('…')
  })
})

describe('image/share — the coil drawn and turning', () => {
  const sets = new Map<string, ReadonlySet<string>>([
    ['copy', new Set(['x', 'y'])],
    ['cycle', new Set(['y'])],
    ['concentration', new Set(['q'])],
    ['mirror', new Set(['x'])],
  ])
  const rosetta = ['copy', 'cycle', 'concentration', 'mirror']

  it('every internal node rotates, nested — a trinity inside the root turns the other way', () => {
    const svg = coilImage(rosetta, coilCrosses(sets, rosetta))
    const spins = svg.match(/<animateTransform[^>]*>/g) ?? []
    expect(spins.length).toBe(2) // root (coil + axis) and the one trinity inside it
    expect(spins[0]).toContain('from="0')
    expect(spins[1]).toContain('from="360') // odd depth turns backward
    expect(svg.indexOf('</g></g>')).toBeGreaterThan(0) // the inner group closes inside the outer
  })

  it('draws every law as a coin and every forward cross as an edge, dashed where the cross holds at zero', () => {
    const svg = coilImage(rosetta, coilCrosses(sets, rosetta))
    for (const law of rosetta) expect(svg).toContain(`>${law}</text>`)
    const lines = svg.match(/<line [^>]*>/g) ?? []
    expect(lines.length).toBeGreaterThanOrEqual(3 + 2) // trinity: 3 forward edges · root: 2 (coil↔axis both ways)
    expect(lines.some((l) => l.includes('stroke-dasharray'))).toBe(true) // concentration meets nothing: a theorem edge
  })
})
