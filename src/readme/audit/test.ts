import { describe, it, expect } from 'vitest'
import { redundantLines, readmeRedundancy, assertReadmeFolded, readmeSeo, assertReadmeSeo } from './index'

describe('readme/audit — the two shapes it was built on', () => {
  it('catches a ranked list naming one thing twice — the live horo-ring defect', () => {
    const line = '| 9 | unity | 17 | `identity` · `whole` · `hooks` · `zeropoint` · `signal` · `whole` |'
    const f = redundantLines(line)
    expect(f).toHaveLength(1)
    expect(f[0]!.kind).toBe('item')
    expect(f[0]!.value).toBe('whole')
    expect(f[0]!.line).toBe(1)
  })

  it('catches a list stating one fragment N times — the live `## payload` defect', () => {
    const line =
      '`@payloadcms/next 4.0.0-internal.38b7f1d` · `@payloadcms/ui 4.0.0-internal.38b7f1d` · ' +
      '`payload 4.0.0-internal.38b7f1d`'
    const f = redundantLines(line)
    expect(f.map((x) => x.kind)).toContain('echo')
    expect(f.find((x) => x.kind === 'echo')!.value).toBe('4.0.0-internal.38b7f1d')
  })

  it('reports the 1-indexed line, so a reader goes straight to it', () => {
    const md = ['a', 'b', '`x 1.0.0-internal.aaaa` · `y 1.0.0-internal.aaaa` · `z 1.0.0-internal.aaaa`'].join('\n')
    expect(redundantLines(md)[0]!.line).toBe(3)
  })
})

/**
 * Every refusal here is a false positive this gate produced against the live README before it was
 * narrowed. A gate whose noise floor sits above its signal is one nobody reads, and this corpus
 * has retired four instruments for exactly that.
 */
describe('readme/audit — what it must NOT flag', () => {
  it('a `·` inside a table CELL is not a list — the digit and its own reverse coincide', () => {
    expect(redundantLines('| 0 | `1` | 0° | `8` | 9 | `1` | C (Do) · 256 Hz | C `#00aeef` |')).toEqual([])
  })

  it('free prose is never judged — repetition is how a definition is stated', () => {
    expect(
      redundantLines('Whether every problem VERIFIABLE in polynomial time is also SOLVABLE in polynomial time'),
    ).toEqual([])
    expect(redundantLines('- `pnpm preview` — `opennextjs-cloudflare build && opennextjs-cloudflare preview`')).toEqual(
      [],
    )
    expect(redundantLines('**[`https://github.com/erpax/erpax`](https://github.com/erpax/erpax)** → orientation')).toEqual(
      [],
    )
  })

  it('a two-item list is a rhyme, not a restatement — echo needs three', () => {
    expect(redundantLines('`a 1.0.0-internal.38b7f1d` · `b 1.0.0-internal.38b7f1d`')).toEqual([])
  })

  it("a table's alignment row repeats by construction", () => {
    expect(redundantLines('| ----: | ------- | ----: | ---------------- |')).toEqual([])
  })

  it('a list of distinct addresses passes — which is what the facet fix produces', () => {
    expect(redundantLines('| 1 | base | 589 | `law` · `action` · `entropy` · `type` · `angel` |')).toEqual([])
  })
})

describe('readme/audit — the live face', () => {
  it('the root README restates nothing, and zero is a theorem rather than a ratchet', () => {
    expect(readmeRedundancy()).toEqual([])
    expect(() => assertReadmeFolded()).not.toThrow()
  })

  it('and the assert names the generator, because the README is never edited by hand', () => {
    // A ceiling of -1 forces the throw on a clean tree, so the message itself is proved.
    expect(() => assertReadmeFolded(process.cwd(), -1)).toThrow(/src\/readme\/compute\.ts/)
  })
})

/**
 * The consolidation: the README is audited by the SITE's functions, not by a second copy.
 */
describe('readme/audit — one SEO derivation, two faces', () => {
  it('the root README passes the same audit every site page passes', () => {
    const a = readmeSeo()
    expect(a.issues.filter((i) => i.severity === 'major')).toEqual([])
    expect(a.ok).toBe(true)
    expect(() => assertReadmeSeo()).not.toThrow()
  })

  it('keywords are derived, never typed — so improving the derivation improves both faces', () => {
    // A major issue means no keywords at all: the page is not addressable by a crawler.
    expect(readmeSeo().issues.map((i) => i.check)).not.toContain('keywords-empty')
  })
})
