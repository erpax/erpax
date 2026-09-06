import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { listAtomPaths } from '@/readme/compute'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
import { assertComplete, reconcile } from '@/publish/complete'

const set = (...m: string[]): ReadonlySet<string> => new Set(m)

describe('publish/complete — a count is not a census', () => {
  it('reports the union as a floor and names what each source misses', () => {
    const c = reconcile(new Map([['a', set('x', 'y')], ['b', set('y', 'z')]]))
    expect(c.union).toEqual(['x', 'y', 'z'])
    expect(c.bySource.find((s) => s.source === 'a')!.missing).toEqual(['z'])
    expect(c.bySource.find((s) => s.source === 'b')!.unique).toEqual(['z'])
    expect(c.complete).toEqual([])
  })

  // The CERN case, exactly. A record filter dropped 55,821 and returned 82,385 — precisely the
  // REST API's reported total. An independent source agreeing TO THE DIGIT read as confirmation
  // that the broken filter was right. Equal totals over unequal sets is the one signature that
  // looks like corroboration and is its opposite.
  it('catches equal COUNTS over unequal MEMBERS — the signature that looks like agreement', () => {
    const c = reconcile(new Map([['api', set('a', 'b', 'c')], ['sitemap', set('a', 'b', 'd')]]))
    expect(c.agreeingCountsDifferentMembers).toEqual([['api', 'sitemap']])
    expect(() => assertComplete(c, [])).toThrow(/agree on COUNT but not on MEMBERS/)
  })

  it('equal counts AND equal members is genuine agreement, not a trap', () => {
    const c = reconcile(new Map([['a', set('x', 'y')], ['b', set('y', 'x')]]))
    expect(c.agreeingCountsDifferentMembers).toEqual([])
    expect([...c.complete].sort()).toEqual(['a', 'b'])
  })

  it('only REQUIRED sources must be complete — a filtered view may legitimately be a subset', () => {
    const c = reconcile(new Map([['full', set('a', 'b')], ['stub', set('a')]]))
    expect(() => assertComplete(c, ['full'])).not.toThrow()
    expect(() => assertComplete(c, ['full', 'stub'])).toThrow(/stub holds 1 of 2/)
  })

  // The live case this was built for. Earlier today the uuid matrix held 3,466 atoms against a
  // corpus of 3,474: eight atoms outside the fold, every one of them unsealed, diagnosed only by
  // comparing a clean atom against a broken one field by field. This check would have named it.
  it('replays the matrix gap this session actually had', () => {
    const corpus = set('a', 'b', 'c', 'd')
    const staleMatrix = set('a', 'b') // the eight that were missing
    const c = reconcile(new Map([['filesystem', corpus], ['uuid-matrix', staleMatrix]]))
    expect(c.bySource.find((s) => s.source === 'uuid-matrix')!.missing).toEqual(['c', 'd'])
    expect(() => assertComplete(c, ['filesystem', 'uuid-matrix'])).toThrow(/uuid-matrix holds 2 of 4/)
  })

  it('the live corpus: three independent listings agree on members, not merely on totals', () => {
    const fs = new Set<string>()
    const walk = (d: string): void => {
      for (const e of readdirSync(d, { withFileTypes: true })) {
        if (e.name.startsWith('.') || e.name === 'node_modules') continue
        const p = join(d, e.name)
        if (e.isDirectory()) walk(p)
        else if (e.name === 'SKILL.md') fs.add(relative(join(process.cwd(), 'src'), join(p, '..')))
      }
    }
    walk(join(process.cwd(), 'src'))
    const c = reconcile(
      new Map([
        ['filesystem-skill-walk', fs],
        ['readme-listAtomPaths', new Set(listAtomPaths())],
        ['uuid-matrix-nodes', new Set(UUID_MATRIX_NODES.map((n) => n.path).filter((p): p is string => Boolean(p)))],
      ]),
    )
    expect(c.agreeingCountsDifferentMembers).toEqual([])
    expect(() => assertComplete(c, ['filesystem-skill-walk', 'readme-listAtomPaths', 'uuid-matrix-nodes'])).not.toThrow()
  })
})
