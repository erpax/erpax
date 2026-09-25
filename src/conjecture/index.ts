/**
 * conjecture — the forward dual of [[think]]/refute: a claim formulated BEFORE it is
 * met, transformed from a law already held, ranked by what its answer would teach.
 *
 * @standard Popper — a proposition that forbids nothing explains nothing
 * @see ./SKILL.md — ../think — ../rules/refutable
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { algebraLog2, exactMax } from '@/algebra'
import { alreadyRefuted } from '@/think'

export const atomPath = 'conjecture' as const

/** The operations that produce a conjecture from a law already held. DECLARED. See SKILL.md. */
export const TRANSFORMS = Object.freeze({
  /** Flip the claim's polarity — gave [[rules]]/slack. */
  involution: 'flip the polarity of the claim',
  dual: 'exchange the two sides of the relation',
  generalise: 'assert the law on every surface it does not yet reach',
  transpose: 'carry the law to a domain that shares its shape',
  compose: 'conjoin two laws and claim what follows',
} as const)

export type Transform = keyof typeof TRANSFORMS

/** A claim from a law already held, with what would decide it. */
export interface Conjecture {
  readonly claim: string
  /** Its parent law — a conjecture with no parent is a forgery. */
  readonly from: string
  readonly transform: Transform
  /** The command that would return a verdict. EMPTY = nothing here can decide it. */
  readonly decidedBy: string
  readonly priorFor: number
  readonly priorAgainst: number
  readonly costSeconds: number
}

/** A conjecture scored. */
export interface ScoredConjecture extends Conjecture {
  readonly surpriseBits: number
  readonly prior: number
  readonly decidable: boolean
  readonly refuted: boolean
  /** surprise ÷ cost, gated. Zero is a refusal, not a small number. */
  readonly worth: number
}

/** Laplace's rule of succession: `(for + 1) ÷ (for + against + 2)`. See SKILL.md. */
export function prior(priorFor: number, priorAgainst: number): number {
  return (priorFor + 1) / (priorFor + priorAgainst + 2)
}

/** Shannon surprise `−log₂ p` — which REWARDS the impossible-looking claim. See SKILL.md. */
export function surpriseBits(priorFor: number, priorAgainst: number): number {
  return -algebraLog2(prior(priorFor, priorAgainst))
}

/** `surprise ÷ cost`, gated: undecidable and already-refuted are both ZERO. See SKILL.md. */
export function score(c: Conjecture, cwd: string = process.cwd()): ScoredConjecture {
  const decidable = c.decidedBy.trim() !== ''
  const refuted = alreadyRefuted(c.claim, cwd) !== undefined
  const bits = surpriseBits(c.priorFor, c.priorAgainst)
  return {
    ...c,
    prior: prior(c.priorFor, c.priorAgainst),
    surpriseBits: bits,
    decidable,
    refuted,
    worth: decidable && !refuted ? bits / exactMax(c.costSeconds, 1) : 0,
  }
}

/** Most worth first, ties to the cheaper test. A zero is KEPT, never filtered. See SKILL.md. */
export function rank(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture[] {
  return cs
    .map((c) => score(c, cwd))
    .sort((a, b) => b.worth - a.worth || a.costSeconds - b.costSeconds || a.claim.localeCompare(b.claim))
}

/** The autonomy lever: the highest-worth decidable claim, or nothing — never an invented one. */
export function next(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture | undefined {
  return rank(cs, cwd).find((c) => c.worth > 0)
}

/** What a conjecture is missing before it can be tested at all. */
export interface Undecided {
  readonly claim: string
  readonly needs: string
}

/** The claims nothing can decide — each one a gate that does not exist yet. */
export function undecided(cs: readonly Conjecture[]): Undecided[] {
  return cs
    .filter((c) => c.decidedBy.trim() === '')
    .map((c) => ({ claim: c.claim, needs: `an instrument that can return a verdict on "${c.claim}"` }))
}

/** A pair of laws and how conspicuously they have never been drawn together. */
export interface Cross {
  readonly a: string
  readonly b: string
  /** SKILLs naming each law. */
  readonly citedA: number
  readonly citedB: number
  /** SKILLs naming both. */
  readonly together: number
  /** Laplace-smoothed −PMI: high when both are common and they never meet. */
  readonly bits: number
}

/**
 * Every cross between the laws, ranked by the surprise of its ABSENCE. See SKILL.md.
 *
 * A cross is not authored, it is enumerated — C(n,2) of them exist the moment the laws do.
 */
export function crosses(cwd: string = process.cwd()): Cross[] {
  const dir = join(cwd, 'src', 'rules')
  if (!existsSync(dir)) return []
  const laws = readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(dir, e.name, 'SKILL.md')))
    .map((e) => e.name)
    .sort()

  const docs: Array<Set<string>> = []
  const walk = (d: string): void => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name === 'SKILL.md') {
        const t = readFileSync(p, 'utf8')
        const named = new Set(laws.filter((l) => t.includes(`[[rules]]/${l}`) || t.includes(`[[rules/${l}]]`)))
        // an atom's own SKILL never wikilinks itself, so a cross DRAWN inside one of its two
        // atoms was invisible — the measure said `never together` about the page that joined them
        const own = /[\\/]rules[\\/]([^\\/]+)[\\/]SKILL\.md$/.exec(p)?.[1]
        if (own !== undefined && laws.includes(own)) named.add(own)
        if (named.size > 0) docs.push(named)
      }
    }
  }
  walk(join(cwd, 'src'))

  const n = docs.length
  const cited = new Map(laws.map((l) => [l, docs.filter((d) => d.has(l)).length]))
  const out: Cross[] = []
  for (let i = 0; i < laws.length; i++) {
    for (let j = i + 1; j < laws.length; j++) {
      const a = laws[i] as string
      const b = laws[j] as string
      const ca = cited.get(a) ?? 0
      const cb = cited.get(b) ?? 0
      const together = docs.filter((d) => d.has(a) && d.has(b)).length
      const pa = (ca + 1) / (n + 2)
      const pb = (cb + 1) / (n + 2)
      const pab = (together + 1) / (n + 2)
      out.push({ a, b, citedA: ca, citedB: cb, together, bits: -algebraLog2(pab / (pa * pb)) })
    }
  }
  return out.sort((x, y) => y.bits - x.bits || x.a.localeCompare(y.a) || x.b.localeCompare(y.b))
}

/**
 * The undrawn crosses, as conjectures — formulated on the spot, decided by nobody yet.
 *
 * `decidedBy` is empty BY CONSTRUCTION: a cross names a SITE where a law could live, not
 * the law. Enumeration hands over the pair and its surprise; the sentence is still someone's
 * to write, and until it exists nothing can say no. So every one of these scores zero and
 * surfaces through `undecided()` as a missing instrument — which is the honest shape, and
 * the reason combinatorial generation cannot flood the queue with work to act on.
 */
export function crossConjectures(cwd: string = process.cwd()): Conjecture[] {
  return crosses(cwd)
    .filter((c) => c.together === 0)
    .map((c) => ({
      claim: `a law lives at rules/${c.a} × rules/${c.b}`,
      from: `rules/${c.a} · rules/${c.b}`,
      transform: 'compose' as Transform,
      decidedBy: '',
      priorFor: c.together,
      priorAgainst: exactMax(c.citedA, c.citedB),
      costSeconds: 0,
    }))
}
