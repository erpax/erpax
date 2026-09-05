import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { listAtomPaths } from '@/readme/compute'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
/**
 * publish/complete — a count is not a census. Compare MEMBERS, never totals.
 *
 * @see ./SKILL.md
 */

export interface SourceReport {
  readonly source: string
  readonly held: number
  /** Members the union has and this source does not. */
  readonly missing: readonly string[]
  /** Members only this source has — evidence the others are short. */
  readonly unique: readonly string[]
}

export interface Completeness {
  /** Every member any source knows. The floor on the truth, never the truth itself. */
  readonly union: readonly string[]
  readonly bySource: readonly SourceReport[]
  /** Sources holding every member of the union. */
  readonly complete: readonly string[]
  /**
   * Pairs whose COUNTS agree while their MEMBERS do not — the trap.
   *
   * A sibling's record filter dropped 55,821 CERN records and returned exactly 82,385, which is
   * precisely what the REST API reports as its total. An independent source agreeing to the digit
   * read as confirmation that the broken filter was right. Equal totals over unequal sets is the
   * one signature that looks like corroboration and is the opposite.
   */
  readonly agreeingCountsDifferentMembers: readonly (readonly [string, string])[]
}

/**
 * Reconcile independent listings of the same population.
 *
 * The union is a FLOOR — it is what somebody saw, never what exists. A source absent from every
 * listing is invisible here by construction, and no reconciliation can fix that.
 */
export function reconcile(sources: ReadonlyMap<string, ReadonlySet<string>>): Completeness {
  const union = [...new Set([...sources.values()].flatMap((s) => [...s]))].sort()
  const bySource = [...sources].map(([source, held]) => ({
    source,
    held: held.size,
    missing: union.filter((m) => !held.has(m)),
    unique: [...held].filter((m) => [...sources].every(([o, s]) => o === source || !s.has(m))).sort(),
  }))
  const names = [...sources.keys()]
  const trap: [string, string][] = []
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const [a, b] = [sources.get(names[i]!)!, sources.get(names[j]!)!]
      if (a.size !== b.size) continue
      if ([...a].every((m) => b.has(m))) continue // same size AND same members: genuine agreement
      trap.push([names[i]!, names[j]!])
    }
  }
  return {
    union,
    bySource,
    complete: bySource.filter((s) => s.missing.length === 0).map((s) => s.source),
    agreeingCountsDifferentMembers: trap,
  }
}

/**
 * Fails closed when a source is short of the union, or when two sources agree by count only.
 *
 * `required` names the sources that must be complete. A source not named may legitimately be a
 * subset — a stub index, a filtered view — and demanding completeness of it would make the gate
 * noise. What is never allowed is a NAMED source reporting a total while missing members.
 */
export function assertComplete(c: Completeness, required: readonly string[]): void {
  const short = c.bySource.filter((s) => required.includes(s.source) && s.missing.length > 0)
  const trap = c.agreeingCountsDifferentMembers
  if (short.length === 0 && trap.length === 0) return
  const lines = [
    ...short.map((s) => `  ${s.source} holds ${s.held} of ${c.union.length} — missing ${s.missing.length}: ${s.missing.slice(0, 4).join(', ')}${s.missing.length > 4 ? ' …' : ''}`),
    ...trap.map(([a, b]) => `  ${a} and ${b} agree on COUNT but not on MEMBERS — equal totals over unequal sets is not corroboration`),
  ]
  throw new Error(`✖ publish/complete — ${short.length + trap.length} completeness failure(s):\n${lines.join('\n')}`)
}

/**
 * The corpus's own three listings of "what atoms exist", reconciled.
 *
 * Filesystem walk, the readme generator's own enumeration, and the uuid matrix. They are
 * independent — different code, different inputs — which is what makes their agreement mean
 * something and their disagreement locate a fault.
 */
export function atomListingGaps(cwd: string = process.cwd()): number {
  const fs = new Set<string>()
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'SKILL.md') fs.add(relative(join(cwd, 'src'), join(p, '..')))
    }
  }
  walk(join(cwd, 'src'))
  const c = reconcile(
    new Map([
      ['filesystem-skill-walk', fs],
      ['readme-listAtomPaths', new Set(listAtomPaths(cwd))],
      ['uuid-matrix-nodes', new Set(UUID_MATRIX_NODES.map((n) => n.path).filter((p): p is string => Boolean(p)))],
    ]),
  )
  return c.bySource.reduce((n, s) => n + s.missing.length, 0) + c.agreeingCountsDifferentMembers.length
}
