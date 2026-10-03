import { describe, expect, it } from 'vitest'
import { askDoor, buildPublicTools, crossAsk, decideWord, doors, probeDoors, type Door, type Fetch } from './index'

const door = (name: string, shape: Door['shape'] = 'openai'): Door => ({ name, url: `https://${name}.test/v1`, model: 'm', shape })
const fake =
  (by: Record<string, { status: number; body: string }>): Fetch =>
  async (url) => {
    const host = new URL(url).hostname.split('.')[0]!
    const r = by[host] ?? { status: 0, body: '' }
    if (r.status === 0) throw new Error('ECONNREFUSED')
    return { status: r.status, text: async () => r.body }
  }
const openai = (content: string) => JSON.stringify({ choices: [{ message: { role: 'assistant', content } }] })

describe('ai/public — keyless doors, probed not believed', () => {
  it('a 2xx is open, 401 is keyed, 402 is limited, no answer is down — and the text is read only from an open door', async () => {
    const f = fake({ a: { status: 200, body: openai(' pong ') }, b: { status: 401, body: '{"error":"missing API key"}' }, c: { status: 402, body: '' }, d: { status: 0, body: '' } })
    const answers = await probeDoors(f, [door('a'), door('b'), door('c'), door('d')])
    expect(answers.map((x) => [x.door, x.verdict, x.text])).toEqual([
      ['a', 'open', 'pong'],
      ['b', 'keyed', null],
      ['c', 'limited', null],
      ['d', 'down', null],
    ])
  })

  it('a text door GETs the prompt in the path and reads the body as the answer', async () => {
    let seen = ''
    const f: Fetch = async (url) => {
      seen = url
      return { status: 200, text: async () => 'pong\n' }
    }
    const a = await askDoor(door('t', 'text'), [{ role: 'user', content: 'say pong' }], f)
    expect(a).toMatchObject({ verdict: 'open', text: 'pong' })
    expect(seen).toBe('https://t.test/v1say%20pong')
  })

  it('crossAsk: two open doors agreeing is a theorem, disagreeing is a finding, one open door has no dual (null)', async () => {
    const q = [{ role: 'user' as const, content: 'q' }]
    expect((await crossAsk(q, fake({ a: { status: 200, body: openai('Yes.') }, b: { status: 200, body: openai('yes') } }), [door('a'), door('b')])).agree).toBe(true)
    expect((await crossAsk(q, fake({ a: { status: 200, body: openai('yes') }, b: { status: 200, body: openai('no') } }), [door('a'), door('b')])).agree).toBe(false)
    const one = await crossAsk(q, fake({ a: { status: 200, body: openai('yes') }, b: { status: 401, body: '' } }), [door('a'), door('b')])
    expect(one.open).toBe(1)
    expect(one.agree).toBeNull()
  })

  it('decideWord takes the first open door that answers one lowercase word, and refuses when none does', async () => {
    const f = fake({ a: { status: 401, body: '' }, b: { status: 200, body: openai('Context.') }, c: { status: 200, body: openai('two words') } })
    expect(await decideWord('name it', f, [door('a'), door('b'), door('c')])).toMatchObject({ word: 'context', door: 'b' })
    expect(await decideWord('name it', f, [door('a'), door('c')])).toMatchObject({ word: null, door: null })
  })

  it('the family is a trinity — doors (measure) · cross (involute) · decide (act) — and the declared doors are the ones probed', () => {
    expect(buildPublicTools().map((t) => [t.name, t.role])).toEqual([
      ['erpax.public.doors', 'measure'],
      ['erpax.public.cross', 'involute'],
      ['erpax.public.decide', 'act'],
    ])
    expect(doors().map((d) => d.name)).toContain('pollinations')
    expect(new Set(doors().map((d) => d.name)).size).toBe(doors().length)
  })

  it('LIVE: every declared door answers a status, and none is reported open unless it gave text — a keyed door says keyed', async () => {
    const answers = await probeDoors()
    expect(answers).toHaveLength(doors().length)
    for (const a of answers) {
      expect(['open', 'keyed', 'limited', 'down']).toContain(a.verdict)
      if (a.verdict === 'open') expect(a.text).toBeTruthy()
      else expect(a.text).toBeNull()
    }
  }, 90_000)
})
