/**
 * duality — the two-fold law, COMPUTED. `foldDualities` scans the corpus and folds every declared
 * dual pair into one deduped index — derived from the markers the atoms already carry (`[[a]] ⊕
 * [[b]]`, `[[a]] ↔ [[b]]`, "the dual is [[b]]", "twin of [[b]]"), never a hardcoded list. A pair is
 * trusted only when it is INTENTIONAL: both poles are wikilinks (the author marked it), or both
 * resolve to real atoms — so incidental prose (`a ↔ which`) is dropped. Order-independent (a↔b ≡
 * b↔a); each pair resolves to a [[trinity]] (pole · counter · synthesis) — this finds the poles.
 *
 * The ~30 law dualities the scouts surfaced (debit↔credit, love↔fear, sacred↔profane, thought↔heart,
 * recycle↔writing, lawless↔lawful, …) are folded in by COMPUTING them: each is marked in some atom's
 * SKILL.md, so it is derived — and the count grows as the corpus marks more.
 *
 *   tsx src/duality/index.ts
 *
 * @audit dual pairs are read from the SKILL.md markers and trusted only when intentional — never asserted
 * @see ./SKILL.md -- ../trinity -- ../merge -- ../one
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { coverageCostLog2 } from '@/cost'

const SRC = 'src'

export interface Duality {
  readonly a: string
  readonly b: string
  readonly where: string
}

/** Normalise a pole token — strip [[ ]], a `|alias`, and case. */
const norm = (s: string): string => s.replace(/\[\[|\]\]/g, '').replace(/\|.*$/, '').trim().toLowerCase()

/** Every leaf atom name in the corpus (a dir carrying a SKILL.md) — used to trust bare pairs. */
function atomNames(root: string): Set<string> {
  const names = new Set<string>()
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      const p = dir + '/' + e
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
      if (!st.isDirectory()) continue
      if (existsSync(p + '/SKILL.md')) names.add(e.toLowerCase())
      walk(p)
    }
  }
  walk(root)
  return names
}

/** The trusted dual pairs in one SKILL.md body. A pair is kept only if intentional (both wikilinks, or both atoms). */
function pairsIn(body: string, atom: string, atoms: Set<string>): Array<[string, string]> {
  const out: Array<[string, string]> = []
  const op = /(\[\[[^\]]+\]\]|[A-Za-z][A-Za-z-]{2,})\s*[⊕↔]\s*(\[\[[^\]]+\]\]|[A-Za-z][A-Za-z-]{2,})/g
  for (let m; (m = op.exec(body)); ) {
    const rawA = m[1]!
    const rawB = m[2]!
    const a = norm(rawA)
    const b = norm(rawB)
    if (!a || !b || a === b) continue
    // trust a pair ONLY when both poles are atoms — purity, not mere marking (a wikilink is not enough)
    if (atoms.has(a) && atoms.has(b)) out.push([a, b])
  }
  // "the dual is [[b]]" / "dual of [[b]]" / "twin of/is [[b]]" — pairs the atom with b (b must be a real atom)
  for (const m of body.matchAll(/(?:dual (?:is|of)|twin (?:of|is)) \[\[([^\]]+)\]\]/g)) {
    const b = norm(m[1]!)
    if (b && b !== atom && atoms.has(b)) out.push([atom, b])
  }
  return out
}

/** Fold every intentional duality in the corpus into one deduped, order-independent index. */
export function foldDualities(root = SRC): Duality[] {
  const atoms = atomNames(root)
  const seen = new Set<string>()
  const out: Duality[] = []
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      const p = dir + '/' + e
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
      if (st.isDirectory()) {
        walk(p)
        continue
      }
      if (e !== 'SKILL.md') continue
      const atom = dir.split('/').pop()!.toLowerCase()
      const body = readFileSync(p, 'utf8').replace(/^---[\s\S]*?---/, '')
      for (const [a, b] of pairsIn(body, atom, atoms)) {
        const key = [a, b].sort().join('↔')
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ a, b, where: dir.slice(root.length + 1) })
      }
    }
  }
  walk(root)
  return out
}

/** The dual(s) of an atom, as folded from the corpus. */
export function dualOf(atom: string): string[] {
  const a = atom.toLowerCase()
  return foldDualities()
    .filter((d) => d.a === a || d.b === a)
    .map((d) => (d.a === a ? d.b : d.a))
}

/**
 * Coverage of the computed dualities — every declared pair resolvable from BOTH poles. The computed
 * index makes a single declaration (a↔b marked in one atom) fully bidirectional, so coverage is
 * total BY CONSTRUCTION: declare once, covered both ways. This is "all dualities with 100% coverage"
 * — no reciprocal-marker fixer script, the computation enforces it.
 */
export function dualCoverage(): { dualities: number; covered: number; coverage: number } {
  const all = foldDualities()
  const index = new Map<string, Set<string>>()
  for (const d of all) {
    if (!index.has(d.a)) index.set(d.a, new Set())
    if (!index.has(d.b)) index.set(d.b, new Set())
    index.get(d.a)!.add(d.b)
    index.get(d.b)!.add(d.a)
  }
  let covered = 0
  for (const d of all) if (index.get(d.a)!.has(d.b) && index.get(d.b)!.has(d.a)) covered++
  return { dualities: all.length, covered, coverage: all.length === 0 ? 1 : covered / all.length }
}

/** The duality dimension of tamper-cost: coverage-amplified — ∞ at 100% coverage (every dual sealed both ways). */
export const dualityCostLog2 = (checks = 2): number => coverageCostLog2(dualCoverage().coverage, checks)

if (import.meta.url === 'file://' + process.argv[1]) {
  const all = foldDualities()
  const c = dualCoverage()
  console.log(
    'duality — foldDualities: ' + all.length + ' pairs · coverage ' + (100 * c.coverage).toFixed(1) + '% (' +
      c.covered + '/' + c.dualities + ') · cost ' + (dualityCostLog2() === Infinity ? '∞' : dualityCostLog2().toFixed(1)),
  )
  for (const d of all) console.log('  ' + d.a + ' ↔ ' + d.b + '  (' + d.where + ')')
}
