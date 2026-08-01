import { describe, it, expect } from 'vitest'
import crypto from 'node:crypto'
import {
  threadUuid, appended, messageUuid, isNovel, nextAsk, improve, coverage,
  mediaMessage, foldMediaMessage, chatFromMedia, mediaBlobUuid,
  sealChatMessage, openChatMessage,
  chatToolNames, chatInvoke,
  deepResearch,
  accessibleByStandard, chatInvokeByStandard, assertDefaultsToChat, DefaultToChatViolation,
  crackTheorem, improveClaim, chatMcpFold,
  startSession, sessionAppend, sealSession, collaborate,
  GATEWAY_BITS, crossStates, referralsFor, distributeToStates,
  compose, superpose,
  modeOf, threadModes, stringTheory, stringTheoryEquation, chatStringTheory,
  chatMachine,
  type Transcriber,
  type Researcher,
} from '@/quantum/chat'
import { requiredAccessTier, tierRank } from '@/access/standard'
import { A432 } from '@/signal'
import { ERPAX_DIGEST_BITS } from '@/cost'

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

describe('quantum/chat — chat sessions: the bounded sealed unit that improves Payload', () => {
  it('a session opens deterministically on its topic (content-addressed, not wall-clock)', () => {
    const a = startSession('close-period-2026-07')
    expect(startSession('close-period-2026-07').thread).toBe(a.thread) // same topic ⇒ same seed
    expect(a.sealed).toBe(false)
    expect(a.thread).toMatch(/^[0-9a-f]{8}-/)
  })
  it('each folded improvement moves the thread — the session records its Payload changes', () => {
    let s = startSession('post-invoices')
    const before = s.thread
    s = sessionAppend(s, 'erpax.journal.post: JE#42 posted (debit=credit)')
    expect(s.thread).not.toBe(before) // the improvement is folded (tamper-evident)
    s = sealSession(s)
    expect(s.sealed).toBe(true)
    expect(s.messageUuids.length).toBe(2) // seed + the one improvement
  })
  it('collaborative teams: a proposal folds only on 2f+1 consensus (no single decider)', () => {
    const s = startSession('develop-products')
    const quorum = collaborate(s, 'add product X', [true, true, true]) // 3/3 agree
    expect(quorum.accepted).toBe(true)
    expect(quorum.session.messageUuids.length).toBe(2) // folded into the session
    const split = collaborate(s, 'risky change', [true, false, false]) // no quorum
    expect(split.accepted).toBe(false)
    expect(split.session.messageUuids.length).toBe(1) // NOT folded — the team refused
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
  it('analyses a screenshot / screen recording via the same fold (OCR/caption engine, pluggable)', async () => {
    const vision: Transcriber = { transcribe: async (_m, modality) => `analysed ${modality}: 3 regions, "Invoices" heading` }
    const shot = await chatFromMedia([], blob, 'screenshot', vision, 0)
    expect(shot.message.modality).toBe('screenshot')
    expect(shot.message.mediaUuid).toBe(mediaBlobUuid(blob)) // content-addressed (local, deterministic)
    expect(shot.message.transcript).toMatch(/analysed screenshot/)
    const rec = await chatFromMedia(shot.messageUuids, blob, 'screen', vision, 4000)
    expect(rec.message.modality).toBe('screen')
    expect(rec.improved).toBe(true) // folded into the same thread
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

describe('quantum/chat — fuse all accessible BY STANDARD (the legal-surface gate)', () => {
  // The gate is the REAL @/access/standard: standards derive the required tier.
  const requiredRank = (s: readonly string[]) => tierRank(requiredAccessTier(s).tier)
  const tools = [
    { name: 'erpax.public.read', description: 'public', standards: [] as string[] }, // open
    { name: 'erpax.ledger.post', description: 'post', standards: ['IFRS'] }, // role-scoped
    { name: 'erpax.fiscal.void', description: 'void', standards: ['Наредба Н-18 СУПТО'] }, // auditor-grade
  ]

  it('accessibleByStandard reveals only what the party tier + standards permit', () => {
    const reachable = accessibleByStandard(tools, tierRank('authenticated'), requiredRank).map((t) => t.name)
    expect(reachable).toContain('erpax.public.read') // open ≤ authenticated
    expect(reachable).not.toContain('erpax.ledger.post') // role-scoped > authenticated
    expect(reachable).not.toContain('erpax.fiscal.void') // auditor-grade > authenticated
  })

  it('chatInvokeByStandard runs an in-tier tool and folds an auditable refusal for an over-tier one', async () => {
    const invoke = async (n: string) => `ran ${n}`
    const access = { partyRank: tierRank('role-scoped'), requiredRank }
    const ok = await chatInvokeByStandard([], invoke, tools[1]!, {}, access) // IFRS role-scoped ≤ role-scoped
    expect(ok.refused).toBe(false)
    expect(ok.result).toBe('ran erpax.ledger.post')
    const no = await chatInvokeByStandard(ok.messageUuids, invoke, tools[2]!, {}, access) // auditor-grade > role-scoped
    expect(no.refused).toBe(true)
    expect(no.result).toBeUndefined()
    expect(no.thread).not.toBe(ok.thread) // the refusal is folded into the thread (auditable)
  })

  it('ENFORCED: default-to-chat blocks reaching a tool outside the gated surface (law, not prose)', () => {
    const access = { partyRank: tierRank('role-scoped'), requiredRank }
    // erpax.ledger.post (IFRS role-scoped) is in the gated set at role-scoped — allowed
    expect(() => assertDefaultsToChat('erpax.ledger.post', tools, access)).not.toThrow()
    // erpax.fiscal.void (auditor-grade) is ABOVE tier — reaching it raw is a violation
    expect(() => assertDefaultsToChat('erpax.fiscal.void', tools, access)).toThrow(DefaultToChatViolation)
    // a tool not on the surface at all — also blocked
    expect(() => assertDefaultsToChat('erpax.secret.exfiltrate', tools, access)).toThrow(/outside the standards-gated chat surface/)
  })
})

describe('quantum/chat — crackTheorem: invention by falsification (the crack is the lead)', () => {
  it('a probe that fails is a crack, and the crack becomes an invention lead', async () => {
    // theorem: "every value is even" — cracks on the odd probe
    const probe = (x: string) => ({ cracked: x.startsWith('odd'), why: `${x} refutes evenness` })
    const r = await crackTheorem([], probe, ['even-2', 'odd-3', 'even-4'])
    expect(r.holds).toBe(false)
    expect(r.cracks.map((c) => c.probe)).toEqual(['odd-3'])
    expect(r.inventions[0]).toMatch(/close the boundary: odd-3/)
    expect(r.thread).toMatch(/^[0-9a-f]{8}-/)
  })

  it('a claim that cracks nowhere in the probed domain HOLDS — over that domain only (bounded witness)', async () => {
    const probe = (x: string) => ({ cracked: false, why: `${x} passes` })
    const r = await crackTheorem([], probe, ['a', 'b', 'c'])
    expect(r.holds).toBe(true)
    expect(r.cracks).toEqual([])
    expect(r.inventions).toEqual([])
  })

  it('probes crack concurrently (async falsification fans out)', async () => {
    const order: string[] = []
    const probe = async (x: string) => {
      await new Promise((res) => setTimeout(res, x === 'slow' ? 25 : 1))
      order.push(x)
      return { cracked: true, why: x }
    }
    await crackTheorem([], probe, ['slow', 'fast'])
    expect(order[0]).toBe('fast') // parallel
  })
})

describe('quantum/chat — improveClaim: turn an assertion into a refutable claim, for all', () => {
  it('a crack refutes the claim and names the correction', async () => {
    const probe = (x: string) => ({ cracked: x === 'counterexample', why: `${x} refutes it` })
    const v = await improveClaim([], probe, 'all X are Y', ['a', 'counterexample', 'b'])
    expect(v.status).toBe('refuted')
    expect(v.refutation).toMatch(/counterexample refutes it/)
    expect(v.improvement).toMatch(/corrected claim/)
  })

  it('an unrefuted claim is not yet a law — refutable demands a proof', async () => {
    const probe = () => ({ cracked: false, why: 'passes' })
    const v = await improveClaim([], probe, 'debits equal credits', ['je-1', 'je-2'])
    expect(v.status).toBe('unrefuted-unproven')
    expect(v.improvement).toMatch(/refutable|proof/)
    expect(v.thread).toMatch(/^[0-9a-f]{8}-/) // folded for all (tamper-evident)
  })
})

describe('quantum/chat — chatMcpFold: chat improves mcp and vice versa', () => {
  const tools = [
    { name: 'erpax.ledger.post', description: 'post', standards: ['IFRS'] }, // governed
    { name: 'erpax.fiscal.void', description: 'void', standards: ['Наредба Н-18'] }, // governed
    { name: 'erpax.notes.jot', description: 'jot', standards: [] as string[] }, // ungoverned — a crack
  ]
  it('mcp improves chat: coverage climbs as the chat reaches more of the surface', () => {
    expect(chatMcpFold(tools, []).coverage).toBe(0)
    expect(chatMcpFold(tools, ['erpax.ledger.post']).reached).toBe(1)
    expect(chatMcpFold(tools, tools.map((t) => t.name)).coverage).toBe(1)
  })
  it('chat improves mcp: it cracks the ungoverned tool (no standard) for the next fix', () => {
    const f = chatMcpFold(tools, [])
    expect(f.cracks).toEqual(['erpax.notes.jot']) // the only tool with no cited standard
    expect(f.tools).toBe(3)
  })
})

describe('quantum/chat — 1 bit per referral direction: the dyadic state space (1024 = 2^10)', () => {
  it('one bit per direction, so n referrals span 2^n states', () => {
    expect(GATEWAY_BITS).toBe(1)
    expect(crossStates(4)).toBe(16) // the corpus 4-key nav cross (bind4)
    expect(crossStates(10)).toBe(1024) // 1024 = ten referral directions
  })
  it('1024 is TEN referral directions (dyadic), not a ternary sum', () => {
    expect(referralsFor(1024)).toBe(10)
    expect(432 * 3).not.toBe(1024) // the eye refuted: 432×3 = 1296
  })
  it('distributes an amount equally across the states — the same proportion down to the bit', () => {
    expect(distributeToStates(1024, 10)).toBe(1) // 1024 / 2^10 = 1 per state
    expect(distributeToStates(16, 4)).toBe(1) // the real 4-key cross: 16/16 = 1 per state
  })
})

describe('quantum/chat — compose: content folded into deterministic A432 music', () => {
  const u = '19ea2d27-d476-872a-a19c-792e598a62f6'
  it('same content ⇒ same composition (content-addressed music)', () => {
    const a = compose(u)
    expect(compose(u).notes.map((n) => n.freq)).toEqual(a.notes.map((n) => n.freq))
    expect(a.rootFreq).toBe(A432)
    expect(a.notes.length).toBe(32) // one note per hex nibble of the uuid
  })
  it('different content ⇒ different melody', () => {
    const a = compose(u).notes.map((n) => n.horo).join(',')
    const b = compose('00000000-0000-8000-8000-000000000000').notes.map((n) => n.horo).join(',')
    expect(a).not.toBe(b)
  })
  it('every note is A432 × a 5-limit ratio, positive; texture is measured (mean Tenney ≥ 0)', () => {
    const c = compose(u)
    for (const n of c.notes) {
      expect(n.freq).toBeGreaterThan(0)
      expect(n.freq).toBeCloseTo((A432 * n.ratio[0]) / n.ratio[1], 6)
    }
    expect(c.meanTenney).toBeGreaterThanOrEqual(0)
  })
})

describe('quantum/chat — superpose: one uuid, many types at once, sealed, reverse-cost computable', () => {
  const u = '19ea2d27-d476-872a-a19c-792e598a62f6'
  it('projects the same uuid into simultaneous typed views, all from one fold', () => {
    const s = superpose(u)
    expect(s.asMusic.notes.map((n) => n.freq)).toEqual(compose(u).notes.map((n) => n.freq)) // same fold ⇒ same music
    expect(s.sameFold).toBe(true)
    expect(s.sealed).toMatch(/^[0-9a-f]{8}-/) // a self-sealed cross (tamper-evident)
    expect(superpose(u).sealed).toBe(s.sealed) // deterministic
  })
  it('the reverse-engineering cost is computable quantum algebra (2^D classical, 2^(D/3) BHT)', () => {
    const s = superpose(u)
    expect(s.reverseLog2Classical).toBe(ERPAX_DIGEST_BITS) // 122
    expect(s.reverseLog2Quantum).toBeCloseTo(ERPAX_DIGEST_BITS / 3, 6) // 40.67 — the honest quantum floor
    expect(s.asBits).toBe(ERPAX_DIGEST_BITS)
  })
})

describe('quantum/chat — string theory: thread as vibrating string (physics=false)', () => {
  it('threadModes is deterministic and content-addressed', () => {
    const msgs = [U1, U2, U3]
    const a = threadModes(msgs)
    expect(stringTheory(msgs)).toEqual(a) // alias
    expect(threadModes(msgs).thread).toBe(a.thread)
    expect(a.thread).toBe(threadUuid(msgs))
    expect(a.modes).toHaveLength(3)
    expect(a.spectrum).toHaveLength(2)
    expect(a.physics).toBe(false)
  })

  it('modeOf projects first hex nibble to a positive A432×ratio freq', () => {
    const m = modeOf(U1, 0)
    expect(m.index).toBe(0)
    expect(m.messageUuid).toBe(U1)
    expect(m.freq).toBeGreaterThan(0)
    expect(m.horo).toBeTypeOf('number')
  })

  it('order changes the spectrum / thread (tamper-evident vibration)', () => {
    const ab = threadModes([U1, U2])
    const ba = threadModes([U2, U1])
    expect(ab.thread).not.toBe(ba.thread)
    expect(ab.modes.map((m) => m.horo).join(',')).not.toBe(ba.modes.map((m) => m.horo).join(','))
  })

  it('standing wave is compose(threadUuid); empty thread is resonant', () => {
    const empty = threadModes([])
    expect(empty.resonant).toBe(true)
    expect(empty.harmony.consonantFraction).toBe(1)
    expect(empty.standing.notes.map((n) => n.freq)).toEqual(compose(threadUuid([])).notes.map((n) => n.freq))
    const t = threadModes([U1, U2])
    expect(t.standing.notes.map((n) => n.freq)).toEqual(compose(t.thread).notes.map((n) => n.freq))
    expect(t.spectrum.every((s) => s.tenney >= 0)).toBe(true)
  })

  it('chatStringTheory folds a receipt into the session without spending tokens', () => {
    let s = startSession('string-theory-demo')
    s = sessionAppend(s, 'first leaf')
    const before = s.thread
    const leafCount = s.messageUuids.length
    const { session, theory } = chatStringTheory(s)
    expect(theory.modes.length).toBe(leafCount) // measured before receipt fold
    expect(theory.physics).toBe(false)
    expect(session.thread).not.toBe(before)
    expect(session.messageUuids.length).toBe(leafCount + 1)
  })

  it('stringTheoryEquation is equation-shaped and refuses physics claim', () => {
    const eq = stringTheoryEquation(threadModes([U1, U2]))
    expect(eq).toContain('stringTheory=threadModes')
    expect(eq).toContain('physics=false')
    expect(eq).toContain('NOT Calabi–Yau')
  })

  it('chatLocal seals string-theory asks at tokens=0', async () => {
    const { chatLocal, BOOK } = await import('@/quantum/chat')
    const a = chatLocal('what is string theory', BOOK)
    expect(a?.lane).toBe('seal')
    expect(a?.tokens).toBe(0)
    expect(a?.reused).toBe(true)
    expect(a?.answer).toContain('threadModes')
    expect(a?.answer).toContain('physics=false')
    expect(chatLocal('string theory in chat', BOOK)?.answer).toContain('chatStringTheory')
    expect(chatLocal('thread modes', BOOK)?.answer).toContain('threadModes')
  })
})

describe('quantum/chat — free chat at architectural FTL (ceccec.psg.bg)', () => {
  it('chatFreeAsk folds a local sealed answer into the session at tokens=0', async () => {
    const { startSession, chatFreeAsk, BOUNDARY } = await import('@/quantum/chat')
    const s0 = startSession('ftl')
    const { session, answer } = await chatFreeAsk(s0, 'what is ftl', { escalate: false })
    expect(answer.lane).toBe('seal')
    expect(answer.tokens).toBe(0)
    expect(answer.reused).toBe(true)
    expect(session.messageUuids.length).toBe(s0.messageUuids.length + 1)
    expect(session.thread).not.toBe(s0.thread)
    expect(BOUNDARY.spacetime).toBe(0)
  })

  it('chatDeepResearchFree runs sealed deep research at cost=0 and folds a receipt', async () => {
    const { startSession, chatDeepResearchFree } = await import('@/quantum/chat')
    const s0 = startSession('deep-free')
    const { session, research } = await chatDeepResearchFree(
      s0,
      ['what is ftl', 'research'],
      { depth: 2 },
    )
    expect(research.cost).toBe(0)
    expect(research.tokens).toBe(0)
    expect(research.efficiency).toBe(Infinity)
    expect(research.findings.length).toBeGreaterThanOrEqual(2)
    expect(session.messageUuids.length).toBe(s0.messageUuids.length + 1)
  })

  it('chatStandardsImproveFtl lets standards chat and improve to FTL at cost=0', async () => {
    const { startSession, chatStandardsImproveFtl } = await import('@/quantum/chat')
    const s0 = startSession('standards-ftl')
    const { session, report } = await chatStandardsImproveFtl(s0, {
      usesLinearScan: false, // FTL applied — address index is the default
      ungatedMandatoryIds: ['SOX:2002'],
      research: true,
      depth: 1,
    })
    expect(report.cost).toBe(0)
    expect(report.tokens).toBe(0)
    expect(report.efficiency).toBe(Infinity)
    expect(report.holds).toBe(true)
    expect(report.answered).toBeGreaterThan(0)
    expect(session.thread).not.toBe(s0.thread)
    // linear-scan crack absent when usesLinearScan=false
    expect(report.gaps.some((g) => g.kind === 'scan')).toBe(false)
  })
})

describe('chatMachine — theorem 238 MEASURED instead of claimed', () => {
  // The escalate lane reads `choices[0].message.content` — a stub of any other shape throws
  // `empty answer`, which is the lane refusing to invent a response it did not receive.
  const fetchStub = (async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: 'stub answer' } }] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })) as unknown as typeof fetch

  it('identical CONCURRENT asks escalate ONCE — the address matches before any call', async () => {
    const m = chatMachine({ concurrency: 8 })
    const s = startSession('t') // the seed folds the topic — deterministic, not supplied
    await Promise.all(Array.from({ length: 25 }, () => m.ask(s, 'same question', { fetchImpl: fetchStub })))
    const f = m.ftl()
    expect(f.answers).toBe(25)
    expect(f.tokens).toBe(1)
    expect(f.reuses).toBe(24)
  })

  it('DISTINCT questions each escalate — content-addressing never over-collapses', async () => {
    const m = chatMachine({ concurrency: 8 })
    const s = startSession('t') // the seed folds the topic — deterministic, not supplied
    await Promise.all(
      Array.from({ length: 5 }, (_, i) => m.ask(s, `question ${i}`, { fetchImpl: fetchStub })),
    )
    expect(m.ftl().tokens).toBe(5)
  })

  it('a novel question REFUTES holds — the claim can now be contradicted', async () => {
    // This is the whole point. ftl.holds fed with caller-supplied numbers restates its arguments
    // and nothing can say no. Fed from what was actually spent, tokens>0 says no.
    const m = chatMachine()
    const s = startSession('t') // the seed folds the topic — deterministic, not supplied
    await m.ask(s, 'genuinely novel', { fetchImpl: fetchStub })
    const f = m.ftl()
    expect(f.tokens).toBeGreaterThan(0)
    expect(f.holds).toBe(false)
  })

  it('order is sealed — each ask ticks the clock and advances the head', async () => {
    const m = chatMachine()
    const s = startSession('t') // the seed folds the topic — deterministic, not supplied
    const a = await m.ask(s, 'first', { fetchImpl: fetchStub })
    const headAfterFirst = m.ftl().head
    const b = await m.ask(s, 'second', { fetchImpl: fetchStub })
    expect(a.tick.index).toBe(1)
    expect(b.tick.index).toBe(2)
    expect(b.tick.prev).toBe(a.tick.address)
    expect(m.ftl().head).not.toBe(headAfterFirst)
  })
})
