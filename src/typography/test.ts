import { describe, it, expect } from 'vitest'
import {
  FEATURES,
  featuresUsed,
  coverage,
  pageForm,
  formViolations,
  typographyGuardian,
  TYPOGRAPHY_BASELINE,
  buildIndex,
  buildAnalysisTypographyGraph,
  atomTypographyContext,
  ANALYSIS_ORGANS,
  partitionByFolder,
  partitionRoot,
  titleOf,
  headingsOf,
  linksOf,
  termsOf,
  type SkillPage,
} from '@/typography'

const clean = (name: string, body = '# h\n\nlinks [[atom]] and [[seal]].\n'): SkillPage => ({
  path: name,
  text: `---\nname: ${name}\ndescription: a clean atom\n---\n\n${body}`,
})

describe('typography — the vitepress feature-set a page renders with', () => {
  it('detects the features a markdown sample uses', () => {
    const md = '# h\n\n**b** and `c` and [l](x)\n\n- item\n'
    const used = featuresUsed(md)
    expect(used).toContain('heading')
    expect(used).toContain('bold')
    expect(used).toContain('code')
    expect(used).toContain('link')
    expect(used).toContain('list')
  })
  it('coverage is the fraction of the feature-set used (0..1)', () => {
    expect(coverage('')).toBe(0)
    const full = '# h\n**b** *i* `c`\n```\nx\n```\n[l](x)\n- a\n| a | b |\n> q\n::: tip\n:::\n$x$\n'
    expect(coverage(full)).toBe(1)
    expect(featuresUsed(full).length).toBe(FEATURES.length)
  })
})

describe('typography — the form of one page', () => {
  it('reads frontmatter / name / description / heading facts', () => {
    const f = pageForm(clean('atom').text)
    expect(f).toEqual({ frontmatter: true, named: true, described: true, heading: true })
  })
  it('extracts title, headings, links (normalized leaf), terms', () => {
    const text = clean('atom', '# Title\n\n## Sub\n\nbody word [[law/folder]] and [[Seal]].\n').text
    expect(titleOf(text)).toBe('Title')
    expect(headingsOf(text)).toEqual(['Title', 'Sub'])
    expect(linksOf(text)).toEqual(['folder', 'seal']) // last leaf, normalized + sorted
    expect(termsOf(text)).toContain('body')
    expect(termsOf(text)).toContain('word')
  })
  it('does not read links out of code spans/blocks', () => {
    const text = clean('atom', '# h\n\n`[[notreal]]` and\n```\n[[alsofake]]\n```\nreal [[atom]]\n').text
    expect(linksOf(text)).toEqual(['atom'])
  })
})

describe('typography — the GUARDIAN (a baseline ratchet, reusing @/guardian + @/seal)', () => {
  const all = (_: string) => true
  it('a typographically pure corpus has zero form violations', () => {
    const v = formViolations([clean('atom'), clean('seal')], all)
    expect(v).toEqual([])
  })
  it('flags missing frontmatter, missing heading, and dead links', () => {
    const noFm: SkillPage = { path: 'a', text: '# h\n\nbody\n' }
    const noHeading: SkillPage = { path: 'b', text: '---\nname: b\ndescription: d\n---\n\nbody\n' }
    const dead: SkillPage = { path: 'c', text: '---\nname: c\ndescription: d\n---\n\n# h\n[[ghost]]\n' }
    const v = formViolations([noFm, noHeading, dead], (leaf) => leaf !== 'ghost')
    const byPath = Object.fromEntries(v.map((x) => [x.path, x.reasons]))
    expect(byPath.a).toContain('no-frontmatter')
    expect(byPath.b).toContain('no-heading')
    expect(byPath.c).toContain('dead-link:ghost')
  })
  it('SEALS when violations hold at/below the baseline (fail-closed ratchet)', () => {
    expect(typographyGuardian(0, 0).sealed).toBe(true)
    expect(typographyGuardian(5, 5).sealed).toBe(true)
    expect(typographyGuardian(3, 5).sealed).toBe(true) // improved (still sealed)
  })
  it('UNSEALS on ANY regression above the baseline', () => {
    expect(typographyGuardian(1, 0).sealed).toBe(false)
    expect(typographyGuardian(6, 5).sealed).toBe(false)
  })
  it('the committed baseline is a finite, non-negative ceiling', () => {
    expect(Number.isFinite(TYPOGRAPHY_BASELINE)).toBe(true)
    expect(TYPOGRAPHY_BASELINE).toBeGreaterThanOrEqual(0)
  })
})

describe('typography — the self-computing navigational + search INDEX', () => {
  const pages = [clean('seal'), clean('atom'), clean('diamond')]

  it('is DETERMINISTIC: same content ⇒ byte-identical index + stable root', () => {
    const a = buildIndex(pages)
    const b = buildIndex(pages)
    expect(b).toEqual(a)
    expect(b.root).toBe(a.root)
  })
  it('is ORDER-INDEPENDENT: shuffling the input does not change the index', () => {
    const a = buildIndex(pages)
    const b = buildIndex([...pages].reverse())
    expect(b.root).toBe(a.root)
    expect(b.entries.map((e) => e.path)).toEqual(a.entries.map((e) => e.path)) // sorted by path
  })
  it('each entry is content-addressed (a v8 content-uuid of the SKILL.md bytes)', () => {
    const idx = buildIndex(pages)
    for (const e of idx.entries) expect(e.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(idx.atoms).toBe(pages.length)
  })
  it('is TAMPER-EVIDENT: changing any one atom flips the whole-index root', () => {
    const base = buildIndex(pages)
    const tampered = buildIndex([clean('seal', '# h\n\nTAMPERED body [[atom]]\n'), clean('atom'), clean('diamond')])
    expect(tampered.root).not.toBe(base.root)
  })
  it('carries the navigational lattice (headings) and search terms per atom', () => {
    const idx = buildIndex([clean('atom', '# Atom\n\n## Uses\n\nirreducible unit [[seal]]\n')])
    const e = idx.entries[0]!
    expect(e.title).toBe('Atom')
    expect(e.headings).toEqual(['Atom', 'Uses'])
    expect(e.links).toEqual(['seal'])
    expect(e.terms).toContain('irreducible')
  })
})

describe('typography — analysis ⊕ quantum unified graph', () => {
  const pages = [
    clean('analytics', '# a\n\n[[purity]] · [[aura]]\n'),
    clean('purity', '# p\n\n[[seal]]\n'),
    clean('aura', '# u\n\n[[diamond]]\n'),
  ]

  it('buildAnalysisTypographyGraph is DETERMINISTIC', () => {
    const a = buildAnalysisTypographyGraph(pages)
    const b = buildAnalysisTypographyGraph(pages)
    expect(b).toEqual(a)
    expect(b.root).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('wires analysis organs as first-class vertices', () => {
    const g = buildAnalysisTypographyGraph(pages)
    for (const o of ANALYSIS_ORGANS) expect(g.vertices).toContain(o)
    expect(g.analysisCount).toBeGreaterThan(0)
    expect(g.wikilinkCount).toBeGreaterThan(0)
  })

  it('atomTypographyContext frames partition and neighbors', () => {
    const g = buildAnalysisTypographyGraph(pages, {
      analytics: { diamondImpurities: 1 },
    })
    const ctx = atomTypographyContext(g, 'analytics', 1, 2)
    expect(ctx.partition).toBe('analytics')
    expect(ctx.bondDegree).toBeGreaterThan(0)
    expect(ctx.analysisNeighbors.some((n) => n.includes('purity') || n.includes('diamond'))).toBe(true)
  })
})

describe('typography — split in folders (min memory / max tamper-cost)', () => {
  it('partitions entries by their top folder segment', () => {
    const pages = [
      { path: 'law/folder', text: clean('folder').text },
      { path: 'law/governing', text: clean('governing').text },
      { path: 'atom', text: clean('atom').text },
    ]
    const parts = partitionByFolder(buildIndex(pages), 1)
    expect(Object.keys(parts).sort()).toEqual(['atom', 'law'])
    expect(parts.law!.map((e) => e.path).sort()).toEqual(['law/folder', 'law/governing'])
  })
  it('each folder partition has its own content-address (sub-root)', () => {
    const idx = buildIndex([clean('atom'), clean('seal')])
    const parts = partitionByFolder(idx, 1)
    const roots = Object.values(parts).map(partitionRoot)
    expect(new Set(roots).size).toBe(roots.length) // distinct content ⇒ distinct sub-roots
    for (const r of roots) expect(r).toMatch(/^[0-9a-f-]{36}$/)
  })
})
