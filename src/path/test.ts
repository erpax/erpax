import { dirname } from 'node:path'
import { describe, it, expect } from 'vitest'
import {
  toAtomPath,
  pathsMeet,
  pathsMeetAll,
  atomPathUuid,
  PATH_SURFACES,
  revealPathFromSurroundings,
  canonicalMatrixPath,
  isValidAtomPath,
  urlForAtomPath,
  atomPathFromUrl,
  extendAtomPath,
  ancestorPaths,
  infinitePathFold,
  infinitePathFoldAll,
  followEveryPath,
  followEveryPathAll,
  allMatrixAtomPaths,
  pathWalkCoverage,
  assertEveryPathFollowed,
  recordOnPath,
  canonicalPathLedger,
  assertEverythingOnPathRecorded,
  ledgerFromPathWalk,
  recordPathOnPath,
  mergePathIndices,
  canonicalPathIndex,
  recordOnPathMerged,
  assertPathIndicesMerged,
  countPathIndexGaps,
  MERGED_LEDGER_CHAINS,
} from '@/path'
import { recordedAndImplementedVerdict, assertRecordedAndImplemented } from '@/seal'
import { walkSkills } from '@/aura'
import { coordinateAddress, nodeOf, bidirectionalCrossOf, childrenOf, parentOf, matrixDigest, UUID_MATRIX_NODES } from '@/uuid/matrix'

const ATOM = 'law/folder'

describe('path — all surfaces merge at one canonical atom path', () => {
  it('exports every merged surface', () => {
    expect(PATH_SURFACES).toEqual(['fs', 'url', 'github', 'mcp', 'api', 'http', 'cloudflare'])
  })

  it('fs paths normalize to atom/subatom (no src/, no index.ts)', () => {
    expect(toAtomPath('src/law/folder/index.ts', 'fs')).toBe(ATOM)
    expect(toAtomPath('law/folder/index.ts', 'fs')).toBe(ATOM)
    expect(toAtomPath('src/law/folder/', 'fs')).toBe(ATOM)
    expect(toAtomPath('law/folder', 'fs')).toBe(ATOM)
  })

  it('url paths normalize to the same atom path', () => {
    expect(toAtomPath('/law/folder/SKILL', 'url')).toBe(ATOM)
    expect(toAtomPath('law/folder/SKILL', 'url')).toBe(ATOM)
    expect(toAtomPath('/law/folder', 'url')).toBe(ATOM)
  })

  it('github repo paths and blob URLs normalize to the same atom path', () => {
    expect(toAtomPath('erpax/erpax/src/law/folder/index.ts', 'github')).toBe(ATOM)
    expect(
      toAtomPath('https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'github'),
    ).toBe(ATOM)
    expect(
      toAtomPath(
        'https://raw.githubusercontent.com/erpax/erpax/main/src/law/folder/index.ts',
        'github',
      ),
    ).toBe(ATOM)
  })

  it('mcp resource URIs normalize to the same atom path', () => {
    expect(toAtomPath('erpax://law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('erpax://corpus/law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('erpax://atoms/law/folder', 'mcp')).toBe(ATOM)
    expect(toAtomPath('mcp://localhost:3000/resources/law/folder', 'mcp')).toBe(ATOM)
  })

  it('api routes normalize to the same atom path', () => {
    expect(toAtomPath('/api/corpus/law/folder', 'api')).toBe(ATOM)
    expect(toAtomPath('/api/atoms/law/folder', 'api')).toBe(ATOM)
    expect(toAtomPath('https://tenant.example/api/corpus/law/folder', 'api')).toBe(ATOM)
  })

  it('cloudflare surfaces — r2, d1, ai, workers.dev, wrangler binding URIs', () => {
    expect(toAtomPath(`r2://erpax/t:tenant/${ATOM}/report.pdf`, 'cloudflare')).toBe(ATOM)
    expect(toAtomPath(`d1://erpax/t:tenant/${ATOM}`, 'cloudflare')).toBe(ATOM)
    expect(toAtomPath(`ai://agent/research`, 'cloudflare')).toBe('agent/research')
    expect(toAtomPath(`ai://@cf/meta/llama-3.1-8b-instruct`, 'cloudflare')).toBe(
      'meta/llama-3.1-8b-instruct',
    )
    expect(toAtomPath(`https://erpax.workers.dev/api/corpus/${ATOM}`, 'cloudflare')).toBe(ATOM)
    expect(toAtomPath(`wrangler://binding/D1`, 'cloudflare')).toBe('D1')
    expect(
      pathsMeet(`src/${ATOM}/index.ts`, `r2://erpax/${ATOM}/x.pdf`, 'fs', 'cloudflare'),
    ).toBe(true)
  })

  it('http URLs auto-detect github, api, and docs routes', () => {
    expect(
      toAtomPath('https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'http'),
    ).toBe(ATOM)
    expect(toAtomPath('https://tenant.example/api/corpus/law/folder', 'http')).toBe(ATOM)
    expect(toAtomPath('https://docs.erpax.dev/law/folder/SKILL', 'http')).toBe(ATOM)
  })

  it('pathsMeet — fs + url + github + mcp + api, one atom', () => {
    expect(
      pathsMeetAll(
        ['src/law/folder/index.ts', 'fs'],
        ['/law/folder/SKILL', 'url'],
        [
          'https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md',
          'github',
        ],
        ['erpax://law/folder', 'mcp'],
        ['/api/corpus/law/folder', 'api'],
      ),
    ).toBe(true)
  })

  it('pathsMeet fails closed on different atoms', () => {
    expect(pathsMeet('src/law/folder/index.ts', '/aura/SKILL', 'fs', 'url')).toBe(false)
    expect(pathsMeet('erpax://law/folder', 'erpax://aura', 'mcp', 'mcp')).toBe(false)
    expect(pathsMeet('/api/corpus/law/folder', '/api/corpus/aura', 'api', 'api')).toBe(false)
  })

  it('edge cases — trailing slash, backslashes, query strings', () => {
    expect(toAtomPath('src\\law\\folder\\', 'fs')).toBe(ATOM)
    expect(toAtomPath('/law/folder/SKILL?foo=bar', 'url')).toBe(ATOM)
    expect(toAtomPath('erpax://law/folder?read=1', 'mcp')).toBe(ATOM)
  })

  it('root atom (single segment)', () => {
    expect(toAtomPath('src/aura/index.ts', 'fs')).toBe('aura')
    expect(toAtomPath('/aura/SKILL', 'url')).toBe('aura')
    expect(toAtomPath('erpax://aura', 'mcp')).toBe('aura')
    expect(pathsMeet('src/aura/index.ts', 'erpax://aura', 'fs', 'mcp')).toBe(true)
  })

  it('revealPathFromSurroundings — folder chain reveals law/folder from index.ts', () => {
    expect(revealPathFromSurroundings({ file: 'src/law/folder/index.ts', surface: 'fs' })).toBe(ATOM)
    expect(revealPathFromSurroundings({ import: '@/law/folder' })).toBe(ATOM)
    expect(revealPathFromSurroundings({ file: 'law/folder/test.ts', surface: 'fs' })).toBe(ATOM)
  })

  it('revealPathFromSurroundings — parent + matrix disambiguates cross-named paths', () => {
    expect(revealPathFromSurroundings({ input: 'invariant', parent: 'architecture' })).toBe(
      'architecture/invariant',
    )
    expect(revealPathFromSurroundings({
        input: 'invariant',
        backlinks: ['architecture'],
      }),
    ).toBe('architecture/invariant')
    expect(nodeOf('law/folder')?.path).toBe('law/folder')
    expect(nodeOf('agents/mcp/tool')?.path).toBe('agents/mcp/tool')
    expect(nodeOf('architecture/invariant')?.path).toBe('architecture/invariant')
    expect(coordinateAddress('architecture/invariant')).toMatch(
      /^architecture\/invariant · \d\/\w+ · [0-9a-f]{8}$/,
    )
  })

  it('toAtomPath wires surroundings for leaf-only disambiguation', () => {
    expect(toAtomPath('invariant', 'fs', { parent: 'architecture' })).toBe('architecture/invariant')
    expect(toAtomPath('src/law/folder/index.ts', 'fs')).toBe(ATOM)
  })

  it('canonicalMatrixPath and isValidAtomPath gate revealed segments', () => {
    expect(canonicalMatrixPath('architecture/invariant')).toBe('architecture/invariant')
    expect(isValidAtomPath('law/folder')).toBe(true)
    expect(isValidAtomPath('trading-apis')).toBe(false)
  })

  it('urlForAtomPath ↔ atomPathFromUrl — serverless URL ≡ fs path bijection', () => {
    const atom = 'memory/session'
    expect(atomPathFromUrl('/memory/session')).toBe(atom)
    expect(urlForAtomPath(atom)).toBe('/memory/session')
    expect(atomPathFromUrl(urlForAtomPath(atom))).toBe(atom)
    expect(urlForAtomPath(atomPathFromUrl('/memory/session'))).toBe('/memory/session')
    expect(pathsMeet(`src/${atom}/index.ts`, urlForAtomPath(atom), 'fs', 'url')).toBe(true)
  })

  it('url bijection — trailing slash and /SKILL docs route fold to same atom', () => {
    expect(atomPathFromUrl('/memory/session/')).toBe('memory/session')
    expect(atomPathFromUrl('/memory/session/SKILL')).toBe('memory/session')
    expect(urlForAtomPath('memory/session/')).toBe('/memory/session')
    expect(urlForAtomPath('/memory/session')).toBe('/memory/session')
  })

  it('revealPathFromSurroundings — url surface reveals path from docs route', () => {
    expect(revealPathFromSurroundings({ input: '/memory/session', surface: 'url' })).toBe(
      'memory/session',
    )
    expect(revealPathFromSurroundings({ file: '/memory/session/SKILL', surface: 'url' })).toBe(
      'memory/session',
    )
  })

  it('atomPathUuid entangles all surfaces at content-uuid scale', () => {
    const surfaces: [string, Parameters<typeof atomPathUuid>[1]][] = [
      ['src/law/folder/index.ts', 'fs'],
      ['/law/folder/SKILL', 'url'],
      ['https://github.com/erpax/erpax/blob/main/src/law/folder/SKILL.md', 'github'],
      ['erpax://law/folder', 'mcp'],
      ['/api/corpus/law/folder', 'api'],
      ['https://docs.erpax.dev/law/folder/SKILL', 'http'],
    ]
    const uuids = surfaces.map(([p, s]) => atomPathUuid(p, s))
    expect(new Set(uuids).size).toBe(1)
    expect(uuids[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})

describe('path — infinite path fold (bidirectional fractal extension)', () => {
  it('extendAtomPath composes one generic word segment', () => {
    expect(extendAtomPath('law', 'folder')).toBe('law/folder')
    expect(extendAtomPath('law/folder', 'nested')).toBe('law/folder/nested')
    expect(extendAtomPath('', 'aura')).toBe('aura')
    expect(extendAtomPath('law', 'bad-name')).toBeNull()
  })

  it('ancestorPaths folds upward through every prefix', () => {
    expect(ancestorPaths('law/folder')).toEqual(['law', 'law/folder'])
    expect(ancestorPaths('agents/mcp/tool')).toEqual(['agents', 'agents/mcp', 'agents/mcp/tool'])
  })

  it('infinitePathFold — ancestors first, then matrix descendants without depth cap', () => {
    const folded = infinitePathFoldAll('law/folder')
    expect(folded).toContain('law')
    expect(folded).toContain('law/folder')
    expect(folded[0]).toBe('law')
  })

  it('bidirectionalCrossOf reads parent↔child on law/folder and agents/mcp/tool', () => {
    const law = bidirectionalCrossOf('law/folder')
    expect(law?.path).toBe('law/folder')
    expect(law?.parent?.path).toBe('law')
    expect(childrenOf('law').some((c) => c.path === 'law/folder')).toBe(true)
    expect(parentOf('law/folder')?.path).toBe('law')

    const tool = bidirectionalCrossOf('agents/mcp/tool')
    expect(tool?.path).toBe('agents/mcp/tool')
    expect(tool?.parent?.path).toBe('agents/mcp')
    expect(childrenOf('agents/mcp').some((c) => c.path === 'agents/mcp/tool')).toBe(true)
  })

  const COMPUTER_PARTS = [
    'processor',
    'memory',
    'storage',
    'screen',
    'network',
    'component',
    'hardware',
    'software',
  ] as const

  const BODY_ORGANS = ['heart', 'lung', 'blood', 'nerve', 'artery', 'vein', 'brain', 'skin'] as const
  const BODY_ANATOMY = ['head', 'arm', 'leg', 'hand', 'foot', 'abdomen', 'anatomy'] as const

  it('childrenOf + infinitePathFold — computer parts fold bidirectionally from parent', () => {
    const childPaths = childrenOf('computer')
      .map((c) => c.path)
      .sort()
    expect(childPaths).toEqual(COMPUTER_PARTS.map((p) => `computer/${p}`).sort())
    for (const part of COMPUTER_PARTS) {
      const path = `computer/${part}`
      expect(parentOf(path)?.path).toBe('computer')
      expect(bidirectionalCrossOf(path)?.parent?.path).toBe('computer')
    }
    const folded = infinitePathFoldAll('computer')
    expect(folded).toContain('computer')
    expect([...infinitePathFold('computer')][0]).toBe('computer')
    for (const part of COMPUTER_PARTS) expect(folded).toContain(`computer/${part}`)
  })

  it('childrenOf + infinitePathFold — body organs and anatomy pivots fold from parent', () => {
    const childPaths = childrenOf('body')
      .map((c) => c.path)
      .sort()
    const expected = [...BODY_ORGANS, ...BODY_ANATOMY].map((p) => `body/${p}`).sort()
    expect(childPaths).toEqual(expected)
    for (const part of [...BODY_ORGANS, ...BODY_ANATOMY]) {
      const path = `body/${part}`
      expect(parentOf(path)?.path).toBe('body')
      expect(bidirectionalCrossOf(path)?.parent?.path).toBe('body')
    }
    const folded = infinitePathFoldAll('body')
    expect(folded).toContain('body')
    expect([...infinitePathFold('body')][0]).toBe('body')
    for (const part of [...BODY_ORGANS, ...BODY_ANATOMY]) expect(folded).toContain(`body/${part}`)
  })
})

describe('path — follow every path (full lattice coverage)', () => {
  const SRC = 'src'
  const skillPaths = () =>
    walkSkills(SRC).map((sk) => dirname(sk).replace(new RegExp(`^${SRC}/`), ''))

  it('followEveryPath visits every matrix path exactly once', () => {
    const walked = [...followEveryPath()]
    const matrixPaths = allMatrixAtomPaths()
    expect(walked.length).toBe(matrixPaths.length)
    expect(new Set(walked).size).toBe(matrixPaths.length)
    expect(walked.length).toBe(matrixDigest().nodes)
    expect(walked.length).toBe(UUID_MATRIX_NODES.length)
    expect(walked.length).toBeGreaterThan(3000)
  })

  it('pathWalkCoverage — full walk yields 100% matrix coverage', () => {
    const visited = new Set(followEveryPath())
    const cov = pathWalkCoverage(visited)
    expect(cov.coverage).toBe(1)
    expect(cov.missing).toEqual([])
    expect(cov.visited).toBe(cov.total)
  })

  it('assertEveryPathFollowed gates partial walks fail-closed', () => {
    const full = new Set(followEveryPath())
    expect(assertEveryPathFollowed(full).followed).toBe(true)
    const partial = new Set([...full].slice(0, 10))
    const gate = assertEveryPathFollowed(partial)
    expect(gate.followed).toBe(false)
    expect(gate.coverage).toBeLessThan(1)
    expect(gate.missing.length).toBeGreaterThan(0)
  })

  it('homonym paths stay distinct in the lattice walk', () => {
    const walked = new Set(followEveryPathAll())
    expect(walked.has('tool')).toBe(true)
    expect(walked.has('agents/mcp/tool')).toBe(true)
    expect(nodeOf('tool')?.path).toBe('tool')
    expect(nodeOf('agents/mcp/tool')?.path).toBe('agents/mcp/tool')
    expect(nodeOf('tool')?.uuid).not.toBe(nodeOf('agents/mcp/tool')?.uuid)
    expect(walked.has('computer')).toBe(true)
    expect(walked.has('computational')).toBe(true)
    expect(nodeOf('computer')?.uuid).not.toBe(nodeOf('computational')?.uuid)
    expect(walked.has('body')).toBe(true)
    expect(walked.has('boat')).toBe(true)
    expect(nodeOf('body')?.uuid).not.toBe(nodeOf('boat')?.uuid)
  })

  it('infinitePathFold round-trip — matrix-resolved local fold ⊆ global lattice walk', () => {
    const global = new Set(followEveryPath())
    const missing: string[] = []
    for (const root of ['law/folder', 'agents/mcp/tool', 'architecture/invariant', 'computer/memory']) {
      for (const p of infinitePathFoldAll(root)) {
        const canonical = nodeOf(p)?.path ?? p
        if (nodeOf(p) && !global.has(canonical)) missing.push(`${root}: ${p} → ${canonical}`)
      }
    }
    expect(missing, missing.join('\n')).toEqual([])
  })

  it('assertEveryPathFollowed against SKILL.md paths — matrix covers folded skills', () => {
    const visited = new Set(followEveryPath())
    const required = skillPaths()
    const gate = assertEveryPathFollowed(visited, required)
    expect(gate.total).toBeGreaterThan(3000)
    expect(gate.coverage).toBeGreaterThanOrEqual(0.99)
  })
})

describe('path — canonical ledger (recorded on every step)', () => {
  const AT = '2026-06-08T12:00:00.000Z'

  it('recordOnPath — deterministic entryUuid (content-addressed)', () => {
    const a = recordOnPath('law/folder', { kind: 'visit' }, AT, null, 0)
    const b = recordOnPath('law/folder', { kind: 'visit' }, AT, null, 0)
    expect(a.entryUuid).toBe(b.entryUuid)
    expect(a.entryUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(a.atomPath).toBe('law/folder')
    expect(a.prevEntryUuid).toBeNull()
  })

  it('multi-segment path — law, law/folder each recorded', () => {
    const segments = ancestorPaths('law/folder')
    const ledger = segments.map((p, i) =>
      recordOnPath(p, { kind: 'ancestor', depth: i }, AT, i > 0 ? 'prev' : null, i),
    )
    const visited = new Set(segments)
    const gate = assertEverythingOnPathRecorded(visited, ledger)
    expect(gate.recorded).toBe(true)
    expect(gate.missing).toEqual([])
    expect(canonicalPathLedger(ledger).map((e) => e.atomPath)).toEqual(['law', 'law/folder'])
  })

  it('homonyms — tool and agents/mcp/tool get distinct entry uuids', () => {
    const tool = recordOnPath('tool', { kind: 'visit' }, AT, null, 0)
    const agentTool = recordOnPath('agents/mcp/tool', { kind: 'visit' }, AT, null, 1)
    expect(tool.entryUuid).not.toBe(agentTool.entryUuid)
    expect(tool.atomPath).toBe('tool')
    expect(agentTool.atomPath).toBe('agents/mcp/tool')
  })

  it('homonyms — computer and computational stay distinct in lattice + ledger', () => {
    const computer = recordOnPath('computer', { kind: 'visit' }, AT, null, 0)
    const computational = recordOnPath('computational', { kind: 'visit' }, AT, null, 1)
    expect(nodeOf('computer')?.path).toBe('computer')
    expect(nodeOf('computational')?.path).toBe('computational')
    expect(nodeOf('computer')?.uuid).not.toBe(nodeOf('computational')?.uuid)
    expect(computer.entryUuid).not.toBe(computational.entryUuid)
    expect(computer.atomPath).toBe('computer')
    expect(computational.atomPath).toBe('computational')
  })

  it('homonyms — body and boat stay distinct in lattice + ledger', () => {
    const body = recordOnPath('body', { kind: 'visit' }, AT, null, 0)
    const boat = recordOnPath('boat', { kind: 'visit' }, AT, null, 1)
    expect(nodeOf('body')?.path).toBe('body')
    expect(nodeOf('boat')?.path).toBe('boat')
    expect(nodeOf('body')?.uuid).not.toBe(nodeOf('boat')?.uuid)
    expect(body.entryUuid).not.toBe(boat.entryUuid)
    expect(body.atomPath).toBe('body')
    expect(boat.atomPath).toBe('boat')
  })

  it('ledgerFromPathWalk + followEveryPath — sample subtree 100% coverage', () => {
    const sample = ['law', 'law/folder', 'agents', 'agents/mcp', 'agents/mcp/tool'] as const
    const walked = sample.filter((p) => nodeOf(p))
    const ledger = ledgerFromPathWalk(walked, AT)
    const visited = new Set(walked)
    const walkGate = assertEveryPathFollowed(visited, [...walked])
    const recordGate = assertEverythingOnPathRecorded(visited, ledger)
    expect(walkGate.followed).toBe(true)
    expect(recordGate.recorded).toBe(true)
    expect(recordGate.coverage).toBe(1)
  })

  it('ledgerFromPathWalk — merged ancestor chain for nested index barrels', () => {
    const walked = ['accounting/coa'] as const
    const ledger = ledgerFromPathWalk(walked, AT)
    expect(ledger.map((e) => e.atomPath)).toEqual(['accounting', 'accounting/coa'])
    const gate = assertEverythingOnPathRecorded(new Set(walked), ledger)
    expect(gate.recorded).toBe(true)
  })

  it('recordedAndImplementedVerdict — path atom recorded + implemented + proven', () => {
    const ledger = [recordPathOnPath({ kind: 'self' }, AT)]
    const v = recordedAndImplementedVerdict('path', { ledger })
    expect(v.recorded).toBe(true)
    expect(v.implemented).toBe(true)
    expect(v.proven).toBe(true)
    expect(v.complete).toBe(true)
  })

  it(
    'record+implement round-trip — session paths batch gate',
    () => {
      const touched = new Set(['readings', 'quantum/emr', 'medical/device', 'path'])
      const ledger = [...touched].map((p, i) => recordOnPath(p, { kind: 'session' }, AT, null, i))
      const batch = assertRecordedAndImplemented(touched, ledger)
      expect(batch.complete).toBe(true)
      expect(batch.incomplete).toEqual([])
    },
    180_000,
  )

  it('hub registry — all index.ts atoms ledger-eligible', async () => {
    const { ATOM_LEDGER_PATHS, recordAtomOnPath } = await import('./hub')
    expect(ATOM_LEDGER_PATHS.length).toBeGreaterThan(800)
    const entry = recordAtomOnPath('path', { kind: 'hub.test' }, AT)
    expect(entry.atomPath).toBe('path')
    expect(entry.entryUuid).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('implementation without record — fail-closed', () => {
    const v = recordedAndImplementedVerdict('path', { ledger: [] })
    expect(v.implemented).toBe(true)
    expect(v.recorded).toBe(false)
    expect(v.complete).toBe(false)
  })
})

describe('path — merged path indices (path-in-path)', () => {
  const AT = '2026-06-08T12:00:00.000Z'

  it('canonicalPathIndex — law/folder is a single index bearer', () => {
    const m = canonicalPathIndex('law/folder')
    expect(m.ledgerChain).toEqual(['law/folder'])
    expect(m.parentPath).toBeNull()
  })

  it('canonicalPathIndex — accounting/coa merges accounting parent', () => {
    const m = canonicalPathIndex('accounting/coa')
    expect(m.ledgerChain).toEqual(['accounting', 'accounting/coa'])
    expect(m.parentPath).toBe('accounting')
    expect(MERGED_LEDGER_CHAINS['accounting/coa']).toEqual(m.ledgerChain)
  })

  it('canonicalPathIndex — body/heart merges body parent', () => {
    const m = canonicalPathIndex('body/heart')
    expect(m.ledgerChain).toEqual(['body', 'body/heart'])
    expect(m.parentPath).toBe('body')
  })

  it('mergePathIndices — parent exports compose with child matter chain', () => {
    const m = mergePathIndices('accounting', 'accounting/coa')
    expect(m.ledgerChain).toEqual(['accounting', 'accounting/coa'])
    expect(m.childPath).toBe('accounting/coa')
  })

  it('recordOnPathMerged — full prefix chain recorded (law/folder · accounting/coa · body/heart)', () => {
    for (const p of ['law/folder', 'accounting/coa', 'body/heart'] as const) {
      const chain = canonicalPathIndex(p).ledgerChain
      const entries = recordOnPathMerged(p, { kind: 'visit' }, AT, null, 0)
      expect(entries.map((e) => e.atomPath)).toEqual(chain)
      const gate = assertEverythingOnPathRecorded(new Set(chain), entries)
      expect(gate.recorded, `${p}: ${gate.missing.join(', ')}`).toBe(true)
      expect(gate.missing).toEqual([])
    }
  })

  it('recordAtomOnPath hub — nested path records merged chain', async () => {
    const { recordAtomOnPath } = await import('./hub')
    const hubLeaf = recordAtomOnPath('body/heart', { kind: 'hub' }, AT)
    expect(hubLeaf.atomPath).toBe('body/heart')
    const chain = canonicalPathIndex('body/heart').ledgerChain
    const gate = assertEverythingOnPathRecorded(new Set(chain), recordOnPathMerged('body/heart', { kind: 'hub' }, AT))
    expect(gate.recorded).toBe(true)
    expect(chain).toEqual(['body', 'body/heart'])
  })

  it('assertPathIndicesMerged — zero unmerged segments across registry', () => {
    const verdict = assertPathIndicesMerged()
    expect(verdict.merged).toBe(true)
    expect(verdict.gaps).toEqual([])
    expect(verdict.checked).toBeGreaterThan(300)
    expect(countPathIndexGaps()).toBe(0)
  })
})
