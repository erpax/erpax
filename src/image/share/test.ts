import { describe, expect, it } from 'vitest'
import { shareFrame, shareImage } from './index'

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
