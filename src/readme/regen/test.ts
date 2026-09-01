import { describe, it, expect } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expandRegenScopes } from './index'
import {
  corpusFoldRoot,
  readCorpusFoldReceipt,
  sealCorpusFold,
  atomBasisScan,
  rosettaMath,
  corpusHealth,
  foldPlan,
  standardsDimensions,
  proseDecode,
  schemaCollision,
  schemaCollisionRegenerable,
} from '../compute'

describe('readme/regen — focused face regen', () => {
  it('expands a known atom scope', () => {
    const paths = expandRegenScopes(['readme'])
    expect(paths).toContain('readme')
  })
})

describe('readme — corpus quantum fold (content IS the key)', () => {
  const scratch = (): string => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
    mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 1\n')
    return cwd
  }

  it('same tree ⇒ same root · changed input ⇒ different key', () => {
    const cwd = scratch()
    try {
      const a = corpusFoldRoot(cwd)
      expect(corpusFoldRoot(cwd)).toBe(a)
      writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const one = 2\n')
      expect(corpusFoldRoot(cwd)).not.toBe(a)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('seal → read round-trips · absent receipt is null', () => {
    const cwd = scratch()
    try {
      expect(readCorpusFoldReceipt(cwd)).toBeNull()
      const root = corpusFoldRoot(cwd)
      sealCorpusFold(root, 1, cwd)
      expect(readCorpusFoldReceipt(cwd)?.root).toBe(root)
      expect(readCorpusFoldReceipt(cwd)?.faces).toBe(1)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — atom basis scan (generators vs rosetta combinations)', () => {
  it('classifies vocab-only, barrel, compose, and own-logic atoms', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-basis-'))
    const atom = (name: string, index?: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `# ${name}`)
      if (index !== undefined) writeFileSync(join(cwd, 'src', name, 'index.ts'), index)
    }
    try {
      atom('prose')                                            // vocab-only (no index) — combination
      atom('barrel', `export { x } from '../child'\n`)          // barrel — combination
      atom('wire', `import { a } from '@/a'\nconsole.log(a)\n`)   // compose-no-logic (no own def) — combination
      atom('gen', `export function real(n: number) { return n * 2 }\n`) // own logic — basis
      const b = atomBasisScan(cwd)
      expect(b.atoms).toBe(4)
      expect(b.basis).toBe(1)
      expect(b.combinations).toBe(3)
      expect(b.vocabOnly).toBe(1)
      expect(b.barrelOnly).toBe(1)
      expect(b.combinationShare).toBeCloseTo(0.75)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — rosetta math (is basis+fold the most efficient AND infinite representation?)', () => {
  it('EFFICIENT: stores only the basis; compression = atoms/basis; strictly compresses the derivable', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-rosetta-'))
    const atom = (name: string, index?: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `# ${name}`)
      if (index !== undefined) writeFileSync(join(cwd, 'src', name, 'index.ts'), index)
    }
    try {
      atom('genA', `export function a(n: number) { return n * 2 }\n`) // basis
      atom('genB', `export function b(n: number) { return n + 1 }\n`) // basis
      atom('vocab') // combination (vocab-only)
      atom('barrel', `export { x } from '../child'\n`) // combination (barrel)
      const r = rosettaMath(cwd)
      expect(r.atoms).toBe(4)
      expect(r.basis).toBe(2)
      expect(r.combinations).toBe(2)
      expect(r.compression).toBe(2) // 4 atoms / 2 generators
      expect(r.storedRosetta).toBe(2) // stores only the basis (the floor)
      expect(r.storedNaive).toBe(4)
      expect(r.savings).toBeCloseTo(0.5)
      expect(r.optimalForDerivable).toBe(true) // basis < atoms — real compression
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('INFINITE: a finite basis generates unboundedly via the fold — messages = basis^k · Catalan(k−1)', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-rosetta-inf-'))
    const atom = (name: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'index.ts'), `export function ${name}(n: number) { return n }\n`)
    }
    try {
      atom('genA')
      atom('genB') // basis = 2
      const r = rosettaMath(cwd, 4)
      // basis=2: k=1→2·C(0)=2 · k=2→4·C(1)=4 · k=3→8·C(2)=16 · k=4→16·C(3)=80
      expect(r.generative.map((g) => g.messages)).toEqual([2, 4, 16, 80])
      expect(r.infinite).toBe(true) // tail grows without bound
      expect(r.growthRatio).toBeGreaterThan(1) // 80/16 = 5 → the growth never stops
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('SPEED: corpusHealth is READ not re-derived — sealed against the fold root, second call is cached', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-health-'))
    mkdirSync(join(cwd, 'src', 'gen'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'gen', 'index.ts'), `export function g(n: number) { return n }\n`)
    try {
      const first = corpusHealth(cwd)
      expect(first.cached).toBe(false) // cold — computed and sealed
      const second = corpusHealth(cwd)
      expect(second.cached).toBe(true) // warm — read from the seal, no re-analysis
      expect(second.root).toBe(first.root) // same fold root ⇒ same answer, answered within
      expect(second.basis).toBe(first.basis)
      // change the corpus → the root moves → it recomputes (never a stale read)
      writeFileSync(join(cwd, 'src', 'gen', 'index.ts'), `export function g(n: number) { return n * 2 }\n`)
      expect(corpusHealth(cwd).cached).toBe(false)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — fold plan (safe foldable families)', () => {
  it('finds ≥2-member enum and compound families, ignores singletons and referenced', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-'))
    const atom = (name: string, skill = `# ${name}`) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), skill)
    }
    try {
      // parents + components
      atom('rate'); atom('it'); atom('social'); atom('sport')
      // enum family: rate10, rate25 (rate ⊕ code)
      atom('rate10'); atom('rate25')
      // compound family: itsocial, itsport (it ⊕ atom)
      atom('itsocial'); atom('itsport')
      // singleton (only one member) — not a family
      atom('rate99')  // rate ⊕ 99 but rate already has 10,25 → joins rate enum (3 members)
      const fams = foldPlan(cwd)
      const rate = fams.find((f) => f.parent === 'rate')
      const it = fams.find((f) => f.parent === 'it')
      expect(rate?.kind).toBe('enum')
      expect(rate?.members.length).toBe(3) // rate10, rate25, rate99
      expect(it?.kind).toBe('compound')
      expect([...(it?.members ?? [])].sort()).toEqual(['itsocial', 'itsport'])
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('rejects English-affix compound families — un⊕ is real words, not a namespace', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-fold-affix-'))
    const atom = (name: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `# ${name}`)
    }
    try {
      // affix parent `un` + ≥2 compound members that ARE real words (un⊕employment, un⊕official)
      atom('un'); atom('employment'); atom('official')
      atom('unemployment'); atom('unofficial')
      // contrast: a legitimate namespace family (it⊕ country-org code) must still fold
      atom('it'); atom('social'); atom('sport'); atom('itsocial'); atom('itsport')
      const fams = foldPlan(cwd)
      expect(fams.find((f) => f.parent === 'un')).toBeUndefined()
      expect(fams.find((f) => f.parent === 'it')?.kind).toBe('compound')
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — 7-dimensional standards invariant', () => {
  it('buckets atoms by horo ray and flags off-ring + the met-in-all invariant', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-7dim-'))
    const atom = (name: string, horo: number | null, std?: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      const fm = horo === null ? '' : `\nhoro: ${horo}`
      const body = std ? `\n@standard ${std}` : ''
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `---\nname: ${name}${fm}\n---\n# ${name}${body}`)
    }
    try {
      atom('a', 1, 'ISO-9001')      // base, has standard
      atom('b', 2)                   // share, no standard
      atom('c', 3)                   // off-ring (axis 3)
      atom('d', null)                // off-ring (no horo)
      const sd = standardsDimensions(cwd)
      expect(sd.offRing).toBe(2)     // c (axis 3 not in ring map) + d (no horo)
      expect(sd.dimensions.find((x) => x.ray === 'base')?.withStandard).toBe(1)
      expect(sd.dimensions.find((x) => x.ray === 'share')?.withStandard).toBe(0)
      expect(sd.metInAll).toBe(false) // only base has a standard
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('readme — prose decode (schema-collision boilerplate vs unique matter)', () => {
  it('folds pure schema-collision templates, keeps curated matter and rdfs-comment atoms', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-prose-'))
    const atom = (name: string, body: string) => {
      mkdirSync(join(cwd, 'src', name), { recursive: true })
      writeFileSync(join(cwd, 'src', name, 'SKILL.md'), `---\nname: ${name}\n---\n${body}`)
    }
    const collisionLaw = (n: string) =>
      `**Law — [[law]]: ${n} is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**`
    const stdLine = '@standard schema.org — the type vocabulary, collided to single words'
    try {
      // a fixture jsonld so the collision generator has a real source to regenerate FROM:
      // SeaBodyOfWater (a class → `sea` component word) + PaymentDeclined (an enum value → `declined`
      // vocabulary word). The gate PROVES regenerability; it does not assert it.
      mkdirSync(join(cwd, 'src', 'sti', 'vocabulary'), { recursive: true })
      writeFileSync(
        join(cwd, 'src', 'sti', 'vocabulary', 'schemaorg.jsonld'),
        JSON.stringify({
          '@graph': [
            { '@id': 'schema:SeaBodyOfWater', '@type': 'rdfs:Class' },
            { '@id': 'schema:PaymentDeclined', '@type': 'schema:PaymentStatusType' },
          ],
        }),
      )
      // pure schema-collision boilerplate — bodies emitted BY the generator (round-trip proof)
      const gen = schemaCollision(cwd)
      atom('sea', gen.bodyOf('sea')!.trimEnd())
      atom('declined', gen.bodyOf('declined')!.trimEnd())
      // unique curated law + ## Standards section — KEEP
      atom(
        'tenure',
        `# tenure\n\nUse when tracking employment duration, anniversaries, or vesting schedules.\n\nComposes: [[employees]] · [[time]].\n\n## Standards\n- IFRS-2 vesting schedules`,
      )
      // schema.org rdfs:comment description (templated law+banner but a non-template body line) — conservatively KEPT
      atom(
        'rxcui',
        `# rxcui\n\nThe RxCUI drug identifier from RXNORM.\n\nEntangled with — [[thing]]\n\nAttested in schema.org — rxcui\n\n${collisionLaw('rxcui')}\n\n${stdLine}`,
      )
      // the generator reproduces the exact committed shapes
      expect(gen.bodyOf('sea')).toContain('component word, collided out of schema.org compounds — fused from SeaBodyOfWater')
      expect(gen.bodyOf('sea')).toContain('Entangled with — [[body]] · [[water]]')
      expect(gen.bodyOf('declined')).toContain('vocabulary word, collided from the schema.org compounds that contain it — PaymentDeclined')
      const pd = proseDecode(cwd)
      expect(pd.vocabOnly).toBe(4)
      expect(pd.boilerplate).toBe(2) // sea + declined
      expect(pd.regenerable).toBe(2) // both round-trip byte-for-byte — PROVEN foldable
      expect(pd.unique).toBe(2) // tenure (curated) + rxcui (rdfs comment, conservatively kept)
      expect([...pd.candidates].sort()).toEqual(['declined', 'sea'])
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  it('proves ≥10 committed boilerplate atoms regenerate byte-for-byte from the real schema.org source', () => {
    const cwd = process.cwd()
    // skip only if the real corpus is absent (isolated CI checkout) — never silently pass on drift
    if (!existsSync(join(cwd, 'src', 'sti', 'vocabulary', 'schemaorg.jsonld'))) return
    // Scan the collision vocabulary (315 boilerplate atoms regenerate corpus-wide) instead of a
    // fragile hardcoded sample: individual atoms drift to `unique` as they gain curated prose
    // (correctly KEEP, not regenerable), so a fixed list rots. Early-exit once the ≥10 claim holds.
    let proven = 0
    for (const w of [...schemaCollision(cwd).words]) {
      const p = join(cwd, 'src', w, 'SKILL.md')
      if (existsSync(p) && schemaCollisionRegenerable(w, readFileSync(p, 'utf8'), cwd)) {
        if (++proven >= 12) break
      }
    }
    expect(proven).toBeGreaterThanOrEqual(10)
  })
})
