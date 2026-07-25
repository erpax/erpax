import { describe, it, expect } from 'vitest'
import crypto from 'node:crypto'
import {
  threadUuid, appended, messageUuid, isNovel, nextAsk, improve, coverage,
  mediaMessage, foldMediaMessage, chatFromMedia, mediaBlobUuid,
  sealChatMessage, openChatMessage,
  chatToolNames, chatInvoke,
  deepResearch,
  type Transcriber,
  type Researcher,
} from '@/quantum/chat'

// message-uuids ARE content-uuids (hex uuid format), as merge requires.
const U1 = '11111111-1111-8111-8111-111111111111'
const U2 = '22222222-2222-8222-8222-222222222222'
const U3 = '33333333-3333-8333-8333-333333333333'

describe('quantum/chat — the thread is a merkle chain of message-uuids', () => {
  it('threadUuid is deterministic for the same message sequence', () => {
    expect(threadUuid([U1, U2, U3])).toBe(threadUuid([U1, U2, U3]))
    expect(threadUuid([])).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('order matters + appending changes the thread-uuid (tamper-evident history)', () => {
    expect(threadUuid([U1, U2])).not.toBe(threadUuid([U2, U1]))
    expect(appended([U1, U2], U3)).toBe(true)
  })
})

describe('quantum/chat — ask and improve (the elicitation loop)', () => {
  const questions = ['what?', 'how much?', 'when?']

  it('ASK returns the next uncovered question, then undefined once all are covered', () => {
    let thread: readonly string[] = []
    expect(nextAsk(thread, questions)).toBe('what?')
    thread = improve(thread, 'what?').messageUuids
    expect(nextAsk(thread, questions)).toBe('how much?')
    for (const q of questions) thread = improve(thread, q).messageUuids
    expect(nextAsk(thread, questions)).toBeUndefined() // nothing left to improve
  })

  it('IMPROVE grows coverage on a novel answer, not on a repeat; history still folds', () => {
    const first = improve([], 'what?')
    expect(first.improved).toBe(true)
    expect(isNovel(first.messageUuids, 'what?')).toBe(false)
    const repeat = improve(first.messageUuids, 'what?')
    expect(repeat.improved).toBe(false) // no new coverage
    expect(repeat.thread).not.toBe(first.thread) // but the chain still moved (tamper-evident)
  })

  it('coverage climbs 0 → 1 as the chat covers the space', () => {
    expect(coverage([], questions)).toBe(0)
    const covered = questions.map(messageUuid)
    expect(coverage(covered, questions)).toBe(1)
    expect(coverage([messageUuid('what?')], questions)).toBeCloseTo(1 / 3, 6)
  })
})

describe('quantum/chat — voice & video fold into the thread as one path', () => {
  const blob = new Uint8Array([1, 2, 3, 4])
  it('a media message content-addresses the blob and carries its transcript', () => {
    const m = mediaMessage('voice', blob, 'hello there', 1200)
    expect(m.modality).toBe('voice')
    expect(m.mediaUuid).toBe(mediaBlobUuid(blob)) // tamper-evident blob address
    expect(m.transcript).toBe('hello there')
  })
  it('folding a media message enters its transcript into the thread (novel ⇒ improved)', () => {
    const m = mediaMessage('video', blob, 'the caption', 3000)
    const r = foldMediaMessage([], m)
    expect(r.improved).toBe(true)
    expect(isNovel(r.messageUuids, 'the caption')).toBe(false) // now covered
  })
  it('chatFromMedia runs capture→transcribe→fold with a pluggable engine', async () => {
    const engine: Transcriber = { transcribe: async () => 'transcribed words' }
    const r = await chatFromMedia([], blob, 'voice', engine, 500)
    expect(r.message.transcript).toBe('transcribed words')
    expect(r.improved).toBe(true)
  })
})

describe('quantum/chat — crypto: room-keyed confidentiality (reuses secret v2)', () => {
  const sealKey = crypto.randomBytes(32)
  const room = { room: 'tenant-a', kind: 'chat' }
  it('a message round-trips only for a party that proves the room descriptor', () => {
    const blob = sealChatMessage('secret message', room, { sealKey })
    expect(blob.v).toBe(2) // full-256-digest bound
    expect(openChatMessage(blob, room, { sealKey })).toBe('secret message')
  })
  it('a wrong room fails closed (no decrypt)', () => {
    const blob = sealChatMessage('secret message', room, { sealKey })
    expect(() => openChatMessage(blob, { room: 'tenant-b', kind: 'chat' }, { sealKey })).toThrow()
  })
})

describe('quantum/chat — all quantum reachable by REACH, not copy (the tool bridge)', () => {
  const tools = [
    { name: 'erpax.invoices.create', description: 'create an invoice' },
    { name: 'erpax.entropy.freeEnergy', description: 'compute free energy' },
  ]
  it('chatToolNames lists the reachable tool space (for nextAsk discovery)', () => {
    expect(chatToolNames(tools)).toEqual(['erpax.invoices.create', 'erpax.entropy.freeEnergy'])
  })
  it('chatInvoke runs a tool via the injected client and folds its result into the thread', async () => {
    const invoke = async (name: string, args: Record<string, unknown>) => `ran ${name}(${JSON.stringify(args)})`
    const r = await chatInvoke([], invoke, 'erpax.invoices.create', { total: 100 })
    expect(r.result).toBe('ran erpax.invoices.create({"total":100})')
    expect(r.improved).toBe(true) // the tool result entered the thread
    expect(isNovel(r.messageUuids, 'erpax.invoices.create: ran erpax.invoices.create({"total":100})')).toBe(false)
  })
})

describe('quantum/chat — deepResearch (parallel & branching, not linear-manual)', () => {
  it('fans a frontier out concurrently and folds every finding into the thread', async () => {
    const researcher: Researcher = async (q) => ({ evidence: `ans:${q}` })
    const r = await deepResearch([], ['a', 'b', 'c'], researcher, { depth: 1 })
    expect(r.findings.map((f) => f.question).sort()).toEqual(['a', 'b', 'c'])
    expect(r.coverage).toBe(1)
    expect(r.depthReached).toBe(1)
    expect(r.thread).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('expands follow-ups to the depth budget (breadth × depth)', async () => {
    const researcher: Researcher = async (q) =>
      q === 'root' ? { evidence: 'e', followUps: ['child1', 'child2'] } : { evidence: 'leaf' }
    const r = await deepResearch([], ['root'], researcher, { depth: 2 })
    expect(r.findings.map((f) => f.question).sort()).toEqual(['child1', 'child2', 'root'])
    expect(r.depthReached).toBe(2)
  })

  it('is concurrent: a slow sub-question does not block a fast sibling (Promise.all fan-out)', async () => {
    const order: string[] = []
    const researcher: Researcher = async (q) => {
      await new Promise((res) => setTimeout(res, q === 'slow' ? 25 : 1))
      order.push(q)
      return { evidence: q }
    }
    await deepResearch([], ['slow', 'fast'], researcher, { depth: 1 })
    expect(order[0]).toBe('fast') // finished first despite being asked second — genuinely parallel
  })
})
