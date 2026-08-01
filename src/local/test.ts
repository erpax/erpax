import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertLocalFirst, downgraded, isPlanner, isPrimary, localFirst, pointersOf, quotable, type Rendering, type Source } from './index'

/** The real one: read remotely, quoted as verbatim, with the clone sitting on disk. */
const CECCEC_LOCAL = `${process.env.HOME}/github/ceccec/ceccec.github.io/README.md`

describe('local — a remote read returns a rendering; a local read returns bytes', () => {
  it('only bytes are primary — a rendering is never evidence about its source', () => {
    expect(isPrimary({ name: 'x', kind: 'local' })).toBe(true)
    expect(isPrimary({ name: 'x', kind: 'remote-bytes' })).toBe(true)
    expect(isPrimary({ name: 'x', kind: 'rendering' })).toBe(false) // the WebFetch case
    expect(quotable([{ name: 'a', kind: 'rendering' }, { name: 'b', kind: 'local' }]).map((s) => s.name)).toEqual(['b'])
  })

  it('localFirst resolves to LOCAL whenever the copy exists — the discipline in one call', () => {
    const here = localFirst('erpax README', 'README.md')
    expect(here.kind).toBe('local')
    // nothing on disk ⇒ it stays a rendering, and is therefore not quotable
    const away = localFirst('some page', 'does/not/exist.md')
    expect(away.kind).toBe('rendering')
    expect(isPrimary(away)).toBe(false)
  })

  it('the ceccec case: a local clone existed, so reading it remotely was a DOWNGRADE', () => {
    const asRead: Source = { name: 'ceccec README', kind: 'rendering', localPath: CECCEC_LOCAL }
    const bad = downgraded([asRead])
    // the clone is on this machine; if it is, the downgrade is detected — that is the whole point
    if (bad.length > 0) {
      expect(bad[0]!.name).toBe('ceccec README')
      expect(() => assertLocalFirst([asRead], 0)).toThrow(/read remotely with a local copy present/)
    }
    // and resolving it local-first would have returned bytes instead
    expect(localFirst('ceccec README', CECCEC_LOCAL).kind).toBe(
      bad.length > 0 ? 'local' : 'rendering',
    )
  })

  it('a genuinely remote-only source is NOT a downgrade — the rule is narrow', () => {
    const remoteOnly: Source = { name: 'a page with no clone', kind: 'rendering' }
    expect(downgraded([remoteOnly])).toEqual([])
    expect(() => assertLocalFirst([remoteOnly], 0)).not.toThrow()
  })

  it('assertLocalFirst fails CLOSED past the ceiling', () => {
    const two: Source[] = [
      { name: 'one', kind: 'rendering', localPath: 'README.md' },
      { name: 'two', kind: 'remote-bytes', localPath: 'package.json' },
    ]
    expect(downgraded(two)).toHaveLength(2) // remote-bytes is still a downgrade if it is HERE
    expect(() => assertLocalFirst(two, 1)).toThrow(/2 source\(s\)/)
    expect(() => assertLocalFirst(two, 2)).not.toThrow()
  })
})

describe('local — judged by the constitution', () => {
  const change: Change = {
    atom: 'local',
    dualities: [
      { builds: 'localFirst', breaks: 'a missing local copy stays a rendering, and is not quotable' },
      { builds: 'downgraded', breaks: 'a genuinely remote-only source is not flagged' },
      { builds: 'assertLocalFirst', breaks: 'fails closed past the ceiling' },
    ],
    anchors: ['ISO-19011:2018 §6.4', 'ISO/IEC 25010:2023 §5.5'],
    claims: [
      {
        text: 'a local read is always better than a remote one',
        boundary:
          'only where a local copy EXISTS and is current — a stale clone is bytes that no longer match ' +
          'the source, which this does not detect; and some sources are genuinely remote-only, where ' +
          'the rule says nothing at all',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'local⊕remote', ring: [1, 1] },
    ],
    served: [{ result: 'the downgrade list', recompute: 'src/local/index.ts' }],
    postings: [
      { debit: 'source/rendering', credit: 'source/bytes', amount: 1 },
      { debit: 'source/bytes', credit: 'source/rendering', amount: 1 },
    ],
    edges: [
      { from: 'local', to: 'grounded' },
      { from: 'grounded', to: 'local' },
    ],
    quantities: [{ name: 'measured downgrades this session', value: 1, derivation: 'src/agent/receipt/seed.ts' }],
    keepers: [],
    seed: ['src/local/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})

describe('local — a search AI is a query planner, not a source', () => {
  const cited: Rendering = {
    name: 'search-engine AI answer',
    kind: 'rendering',
    pointers: ['https://api.crossref.org/works/10.1000/x', 'not-a-url', 'https://api.crossref.org/works/10.1000/x', ' https://arxiv.org/abs/2401.00001 '],
  }
  const uncited: Rendering = { name: 'confident answer, no citations', kind: 'rendering', pointers: [] }

  it('the POINTERS are usable — deduplicated, trimmed, non-addresses dropped', () => {
    expect(pointersOf(cited)).toEqual(['https://api.crossref.org/works/10.1000/x', 'https://arxiv.org/abs/2401.00001'])
  })

  it('but citations do NOT launder the prose — it is still not primary', () => {
    expect(isPrimary(cited)).toBe(false)
    expect(quotable([cited])).toEqual([]) // permanently unquotable, cited or not
  })

  it('an answer that cites NOTHING is worth nothing — that is what unfalsifiable means', () => {
    expect(pointersOf(uncited)).toEqual([])
    expect(isPlanner(uncited)).toBe(false)
    expect(isPlanner(cited)).toBe(true)
  })

  it('local bytes are not a planner — they are the destination, not the map', () => {
    expect(isPlanner({ name: 'x', kind: 'local' })).toBe(false)
    expect(isPlanner({ name: 'x', kind: 'remote-bytes' })).toBe(false)
  })
})
