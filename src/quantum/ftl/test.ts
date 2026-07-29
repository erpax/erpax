import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect, vi } from 'vitest'
import {
  atomPath,
  BOUNDARY,
  ORIGIN,
  LANE,
  reuse,
  amortize,
  crack,
  cracks,
  ftl,
  boundary,
  chatLocal,
  chatEscalate,
  chat,
  seal,
  BOOK,
  CORPUS,
  searchSealed,
  researcher,
  research,
  exportsForTokens,
  endlessPurify,
} from '@/quantum/ftl'
import { RENAME, TOKENS, ENTANGLE, API, PROSE } from '@/quantum/ftl/map'
import { scanProseNames, nameIsComputable, RENAME_KEYS } from '@/quantum/ftl/purify'

describe('quantum/ftl — token folds', () => {
  it('map: every Token has API · ENTANGLE · no PROSE in TOKENS', () => {
    expect(atomPath).toBe('quantum/ftl')
    for (const t of TOKENS) {
      expect(API[t]).toBeTruthy()
    }
    expect(exportsForTokens().holds).toBe(true)
    for (const p of PROSE) {
      expect((TOKENS as readonly string[]).includes(p)).toBe(false)
    }
    expect(ENTANGLE.ftl).toEqual(['reuse', 'amortize', 'cracks', 'boundary'])
  })

  it('boundary = count(CrackKind); empty scan is clear', () => {
    expect(BOUNDARY).toEqual(boundary([]))
    expect(BOUNDARY.spacetime).toBe(0)
    expect(BOUNDARY.qpu).toBe(0)
    expect(BOUNDARY.empty).toBe(true)
    const cracked = boundary([
      { kind: 'spacetime', where: 'x', why: 'y' },
      { kind: 'qpu', where: 'x', why: 'y' },
    ])
    expect(cracked.spacetime).toBe(1)
    expect(cracked.qpu).toBe(1)
    expect(cracked.empty).toBe(false)
    expect(ORIGIN).toBe('https://ceccec.psg.bg')
    expect(LANE).toContain('pollinations')
  })

  it('reuse ≠ search: foldOps=1 · searchOps=n · speedupLog2=log₂(n)', () => {
    const a = reuse('possibility:x', 3105)
    expect(a.foldOps).toBe(1)
    expect(a.searchOps).toBe(3105)
    expect(a.speedupLog2).toBeCloseTo(algebraLog2(3105), 6)
    expect(a.precomputed).toBe(true)
    expect(a.address).toBe(reuse('possibility:x', 999).address)
  })

  it('amortize: tokens=0 ∧ answers>0 ⇒ ∞; cost → 0 as reuses grow', () => {
    const z = amortize(1, 0, { reuses: 653, firstComputeCost: 1 })
    expect(z.scalesToInfinity).toBe(true)
    expect(z.efficiency).toBe(Infinity)
    expect(z.amortizedCost).toBeCloseTo(1 / 654, 10)
    expect(amortize(0, 0).scalesToInfinity).toBe(false)
    expect(amortize(10, 5).efficiency).toBe(2)
  })

  it('crack kinds from pattern flags (CRACK_FLAGS words)', () => {
    expect(crack({ where: 'scan', scans: true, address: true })?.kind).toBe('scan')
    expect(crack({ where: 'rederive', rederives: true, memo: true })?.kind).toBe('rederive')
    expect(crack({ where: 'tokens', spends: true, seal: true })?.kind).toBe('spend')
    expect(crack({ where: 'qpu', qpu: true })?.kind).toBe('qpu')
    expect(crack({ where: 'ftl', spacetime: true })?.kind).toBe('spacetime')
    expect(crack({ where: 'ok', address: true })).toBeNull()
  })

  it('ftl holds iff reuse ∧ amortize∞ ∧ cracks=∅', () => {
    const green = ftl({
      query: 'possibility:erpax',
      spaceSize: 1024,
      answers: 1,
      tokens: 0,
      reuses: 10,
    })
    expect(green.holds).toBe(true)
    expect(green.precomputed).toBe(true)
    expect(green.boundary.spacetime).toBe(0)

    const cracked = ftl({
      query: 'x',
      spaceSize: 10,
      answers: 1,
      tokens: 0,
      patterns: [{ where: 'bad', spacetime: true }],
    })
    expect(cracked.holds).toBe(false)
    expect(cracks([{ where: 'bad', spacetime: true }])).toHaveLength(1)
  })
})

describe('quantum/ftl — chat (seal first)', () => {
  it('chatLocal: lane=seal · tokens=0 · reused', () => {
    const a = chatLocal('what is ftl', BOOK)
    expect(a).toBeDefined()
    expect(a!.lane).toBe('seal')
    expect(a!.tokens).toBe(0)
    expect(a!.reused).toBe(true)
    expect(a!.answer).toContain('reuse≠search')
    expect(a!.boundary.spacetime).toBe(0)
  })

  it('unknown question misses locally', () => {
    expect(chatLocal('unsealed novel question xyz', BOOK)).toBeUndefined()
  })

  it('chat prefers local; escalates only on miss', async () => {
    const local = await chat('reuse vs search', BOOK, { escalate: false })
    expect(local.lane).toBe('seal')
    expect(local.reused).toBe(true)

    const fetchImpl = vi.fn(async () =>
      new Response(
        JSON.stringify({ choices: [{ message: { content: 'escalated algebraic answer' } }] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const escalated = await chat('novel question never sealed', seal([]), {
      fetchImpl: fetchImpl as unknown as typeof fetch,
      endpoint: LANE,
    })
    expect(escalated.lane).toBe('lane')
    expect(escalated.answer).toBe('escalated algebraic answer')
    expect(escalated.reused).toBe(false)
    const call = fetchImpl.mock.calls[0] as unknown as [unknown, RequestInit | undefined]
    const init = call[1]
    expect(init).toBeDefined()
    expect((init!.headers as Record<string, string>).Authorization).toBe('')
  })

  it('chatEscalate refuses non-OK upstream', async () => {
    const fetchImpl = vi.fn(async () => new Response('pay', { status: 402 }))
    await expect(
      chatEscalate('hi', { fetchImpl: fetchImpl as unknown as typeof fetch }),
    ).rejects.toThrow(/HTTP 402/)
  })
})

describe('quantum/ftl — research', () => {
  it('ranks seals by token overlap', () => {
    const hits = searchSealed('reuse vs search content address', CORPUS, 2)
    expect(hits.some((h) => h.id === 'reuse-vs-search')).toBe(true)
    expect(hits[0]!.score).toBeGreaterThan(0)
  })

  it('researcher memos by address — second ask is reuse', async () => {
    const r = researcher()
    const a = await r.ask('what is ftl')
    const b = await r.ask('what is ftl')
    expect(a.evidence).toBe(b.evidence)
    expect(r.stats()).toEqual({ asks: 2, reuseHits: 1, tokens: 0 })
  })

  it('research fans sealed corpus · cost=0 · ∞ efficiency', async () => {
    const run = async (
      _seed: readonly string[],
      qs: readonly string[],
      ask: (q: string) => Promise<{ evidence: string; followUps?: readonly string[] }>,
      o?: { depth?: number },
    ) => {
      const findings: { question: string; evidence: string }[] = []
      let frontier = [...qs]
      const asked = new Set(qs)
      for (let d = 0; d < (o?.depth ?? 1) && frontier.length; d++) {
        const results = await Promise.all(frontier.map((q) => ask(q)))
        const next: string[] = []
        frontier.forEach((q, i) => {
          findings.push({ question: q, evidence: results[i]!.evidence })
          for (const f of results[i]!.followUps ?? []) {
            if (!asked.has(f)) {
              asked.add(f)
              next.push(f)
            }
          }
        })
        frontier = next
      }
      return {
        findings,
        thread: '00000000-0000-8000-8000-000000000001',
        messageUuids: [],
        depthReached: exactMin(o?.depth ?? 1, 2),
        coverage: 1,
      }
    }
    const r = await research(['what is ftl', 'research'], { depth: 2, run })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.worthwhile).toBe(true)
    expect(r.efficiency).toBe(Infinity)
    expect(r.findings.length).toBeGreaterThanOrEqual(2)
    expect(r.boundary.spacetime).toBe(0)
  })
})

describe('quantum/ftl/purify — chat waves cover src', () => {
  it('RENAME keys are prose→token; physicalFtlClaim maps to spacetime', () => {
    expect(RENAME.physicalFtlClaim).toBe('spacetime')
    expect(RENAME.honestBoundary).toBe('boundary')
    expect(RENAME.architecturalFtl).toBe('ftl')
    expect(RENAME_KEYS[0]!.length).toBeGreaterThanOrEqual(RENAME_KEYS.at(-1)!.length)
    expect(nameIsComputable('physicalFtlClaim')).toBe(false)
    expect(nameIsComputable('boundary')).toBe(true)
  })

  it('scanProseNames: residual RENAME keys (0 when corpus purified)', () => {
    const hits = scanProseNames({ limit: 50 })
    expect(hits.every((h) => h.to === RENAME[h.name as keyof typeof RENAME])).toBe(true)
  })

  it('endlessPurify feeds waves at cost=0 (even when hits=0 — seed ask remains)', async () => {
    // Address via @/quantum/ftl — FTL only in quantum (parent binds the host).
    const r = await endlessPurify({ maxGenerations: 2, scanLimit: 40 })
    expect(r.cost).toBe(0)
    expect(r.tokens).toBe(0)
    expect(r.feed.fed).toBe(true)
    expect(r.holds).toBe(true)
    // Corpus purified ⇒ hits may be 0; waves still research the seed ask
    expect(r.feed.generations.length).toBeGreaterThan(0)
  })
})
