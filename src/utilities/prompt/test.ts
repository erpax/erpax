import { describe, expect, it, vi } from 'vitest'
import type { PayloadRequest } from 'payload'

import { RESEARCH, gapOf, researchLexicon, researchWord, run, wordsOf, type Lexicon, type Researcher } from '@/utilities/prompt'

const requestFor = (user: unknown = null, docs: unknown[] = []) => {
  const create = vi.fn(async () => ({ id: 'mem-1' }))
  const find = vi.fn(async () => ({ docs }))
  const warn = vi.fn()
  const req = { user, context: {}, payload: { create, find, logger: { warn } } } as unknown as PayloadRequest
  return { req, create, find, warn }
}

/** A lexicon whose words write themselves into the memory, so the order they ran in can be read back. */
interface Trace {
  said: string[]
}
const say =
  (w: string, go = true) =>
  (_req: PayloadRequest, m: Trace) => {
    m.said.push(w)
    if (!go) return false
  }
const lexicon: Lexicon<Trace> = { one: say('one'), two: say('two'), stop: say('stop', false), three: say('three') }
const quiet: Researcher = async () => {}

describe('prompt — a prompt is a program: each word a step, run in order', () => {
  it('reads words in order, lower-cased, keeping inner hyphens and apostrophes', () => {
    expect(wordsOf('Feel, think — emote & AWARE!')).toEqual(['feel', 'think', 'emote', 'aware'])
    expect(wordsOf("don't co-op  ünïcode 42")).toEqual(["don't", 'co-op', 'ünïcode', '42'])
    expect(wordsOf('   ')).toEqual([])
  })

  it('runs known words in order, and a word that returns false halts the program', async () => {
    const { req } = requestFor()
    expect((await run('one two three', lexicon, req, { said: [] }, quiet)).said).toEqual(['one', 'two', 'three'])
    expect((await run('one stop two', lexicon, req, { said: [] }, quiet)).said).toEqual(['one', 'stop'])
  })

  it('exposes the memory as req.context.prompt while it runs, and restores the caller’s after', async () => {
    const { req } = requestFor()
    req.context.prompt = 'outer'
    const seen: unknown[] = []
    await run('look', { look: (r: PayloadRequest, m: Trace) => void seen.push(r.context.prompt === m) }, req, { said: [] }, quiet)
    expect(seen).toEqual([true])
    expect(req.context.prompt).toBe('outer')
  })

  it('researches an unknown word instead of refusing it, and goes on', async () => {
    const { req } = requestFor()
    const research = vi.fn<Researcher>(async () => {})
    expect((await run('one ponder two', lexicon, req, { said: [] }, research)).said).toEqual(['one', 'two'])
    expect(research).toHaveBeenCalledWith('ponder', req, 'one ponder two')
  })

  it('an unknown word inserted anywhere changes nothing the program does (Prompt.unknown_anywhere)', async () => {
    const { req } = requestFor()
    for (const prompt of ['one two three', 'one stop two', 'stop one']) {
      const plain = await run(prompt, lexicon, req, { said: [] }, quiet)
      const words = wordsOf(prompt)
      for (let i = 0; i <= words.length; i++) {
        const padded = [...words.slice(0, i), 'ponder', ...words.slice(i)].join(' ')
        expect(await run(padded, lexicon, req, { said: [] }, quiet)).toEqual(plain)
      }
    }
  })

  it('is a known word, not an inherited property: "constructor" is researched', async () => {
    const { req } = requestFor()
    const research = vi.fn<Researcher>(async () => {})
    await run('constructor', lexicon, req, { said: [] }, research)
    expect(research).toHaveBeenCalledWith('constructor', req, 'constructor')
  })
})

describe('prompt — research: search think emote aware', () => {
  it('is a program of known words only, so research never researches itself', () => {
    for (const w of wordsOf(RESEARCH)) expect(Object.hasOwn(researchLexicon, w)).toBe(true)
  })

  it('asks Payload’s search, and records what it found as an emerging_gap keyed by the word, linked and broadcast', async () => {
    const found = [{ title: 'Pondering', doc: { relationTo: 'pages', value: 'p-1' } }]
    const { req, create, find } = requestFor({ id: 'agent-1', tenants: [{ tenant: 't-1', roles: ['user'] }] }, found)
    await researchWord('ponder', req, 'feel ponder')
    expect(find).toHaveBeenCalledWith(expect.objectContaining({ collection: 'search', where: { title: { like: 'ponder' } }, req }))
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'memories',
        data: expect.objectContaining({
          kind: 'emerging_gap',
          key: 'word:ponder',
          ownerId: 'agent-1',
          tenant: 't-1',
          payload: { word: 'ponder', prompt: 'feel ponder', found: [{ title: 'Pondering', collection: 'pages', id: 'p-1' }] },
          relatedTo: [{ collection: 'pages', docId: 'p-1', edgeKind: 'refers' }],
        }),
      }),
    )
    expect(create).toHaveBeenCalledWith(expect.objectContaining({ collection: 'chat', data: expect.objectContaining({ event: 'gap:recorded', aggregateId: 'mem-1' }) }))
  })

  it('records a word nothing names yet, and says so', async () => {
    const { req, create } = requestFor()
    await researchWord('zyx', req, 'zyx')
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ key: 'word:zyx', relatedTo: [], rationale: expect.stringContaining('no document names it yet') }) }),
    )
  })

  it('logs a failed research and never throws into the program', async () => {
    const { req, find, warn, create } = requestFor()
    find.mockRejectedValueOnce(new Error('search is down'))
    await expect(researchWord('ponder', req, 'ponder')).resolves.toBeUndefined()
    expect(warn).toHaveBeenCalled()
    expect(create).not.toHaveBeenCalled()
  })

  it('owns a gap by the caller, and leaves the tenant out when there is none', () => {
    const { req } = requestFor(null)
    const gap = gapOf(req, { key: 'k', title: 't', payload: {}, rationale: 'r' })
    expect(gap).toMatchObject({ ownerId: 'anonymous', ownerType: 'agent', kind: 'emerging_gap', key: 'k' })
    expect('tenant' in gap).toBe(false)
  })
})
