// quantum/ftl facade — barrel re-export constants and metrics
export {
  atomPath,
  ORIGIN,
  LANE,
  PROXY,
  BOUNDARY,
  type Boundary,
  PHYSICAL_FTL_DEFAULTS,
} from './constants'

export {
  reuse,
  amortize,
  type Reuse,
  type Amortize,
} from './metrics'

export {
  type Crack,
  boundary,
  crack,
  cracks,
  type CrackPattern,
} from './crack'

/**
 * quantum/ftl — reuse · amortize · crack · boundary · seal · chat · research.
 * Each name-token is a fold (see ./map). Combinations compose tools, not prose.
 *
 *   tsx src/quantum/ftl/index.ts
 *
 * @see ./map · ../computer · ../chat · ./SKILL.md
 */
import { CRACK_FLAGS } from './map'
// A re-export NAMES nothing at runtime: `export { BOUNDARY } from './constants'`
// serves consumers, but this module's own scope stays empty — so chatLocal hit
// `ReferenceError: BOUNDARY is not defined` with zero type errors (the facade split
// turned the definitions into re-exports while this file kept calling them).
// Import what this file USES, alongside what it re-exports.
import { type Boundary, PHYSICAL_FTL_DEFAULTS } from './constants'
import { type Amortize, amortize, type Reuse, reuse } from './metrics'
import { boundary, type Crack, crack, type CrackPattern, cracks } from './crack'

export { TOKENS, ENTANGLE, API, CRACK_FLAGS, type Token, type CrackKind, type Seal } from './map'

export interface Ftl {
  readonly holds: boolean
  readonly reuse: Reuse
  readonly amortize: Amortize
  readonly cracks: readonly Crack[]
  readonly boundary: Boundary
  readonly precomputed: boolean
}

/** ftl ⇔ reuse ∧ amortize∞ ∧ cracks=∅. boundary=boundary(cracks). */
export function ftl(args: {
  readonly query: string
  readonly spaceSize: number
  readonly answers: number
  readonly tokens: number
  readonly reuses?: number
  readonly patterns?: readonly CrackPattern[]
}): Ftl {
  const r = reuse(args.query, args.spaceSize)
  const a = amortize(args.answers, args.tokens, { reuses: args.reuses })
  const cs = cracks(args.patterns ?? [])
  const precomputed = r.precomputed && r.foldOps === 1
  return {
    holds: precomputed && a.scalesToInfinity && cs.length === 0,
    reuse: r,
    amortize: a,
    cracks: cs,
    boundary: boundary(cs),
    precomputed,
  }
}

export interface FtlReportArgs {
  readonly query?: string
  readonly spaceSize?: number
  readonly answers?: number
  readonly tokens?: number
  readonly reuses?: number
  readonly patterns?: readonly CrackPattern[]
}

import type { FtlReport } from './verdict'
// the token map below checks these are live functions, so the hub needs the VALUES too
import { BOOK, chat, chatEscalate, chatLocal, CORPUS, research, researcher, seal } from './book'

export { withFtl } from './verdict'
export type { FtlHolds, FtlBroken, FtlReport } from './verdict'

export function ftlReport(args: FtlReportArgs = {}): FtlReport {
  const v = ftl({
    query: args.query ?? PHYSICAL_FTL_DEFAULTS.query,
    spaceSize: args.spaceSize ?? PHYSICAL_FTL_DEFAULTS.spaceSize,
    answers: args.answers ?? PHYSICAL_FTL_DEFAULTS.answers,
    tokens: args.tokens ?? PHYSICAL_FTL_DEFAULTS.tokens,
    reuses: args.reuses ?? PHYSICAL_FTL_DEFAULTS.reuses,
    patterns: args.patterns,
  })
  if (v.holds) return { holds: true, ftl: v }
  const c = v.cracks[0]
  const why = c
    ? `${c.kind}@${c.where}: ${c.why}`
    : !v.amortize.scalesToInfinity
      ? `amortize not ∞ (tokens=${v.amortize.tokens} answers=${v.amortize.answers})`
      : !v.precomputed
        ? 'reuse/precompute failed (foldOps≠1)'
        : 'ftl.holds=false'
  return { holds: false, ftl: v, why }
}

/**
 * ftlHolds — substrate FTL as a computed boolean on QPU=CPU/GPU.
 * true = holds (no quantumise tip). false = feed-scanner tips quantumisation.
 */
// The boolean wrapper is gone with the name it carried. It unwrapped `.holds` and its only caller
// was its own test — un-folded by [[rules]]/unfolded. The name asserted a substrate claim that
// CrackKind `spacetime` already defines as a break setting holds=false, so it named the one
// condition that falsifies the predicate. Read `ftlReport(args).holds`. There is no time and no
// distance in this atom: it cannot express a velocity, and on the evidence it never did.

// Every name the book offers, listed — a barrel must not quietly stop offering one
// ([[rules]]/face), and `export *` on a hub is the edge that widens a consumer.
export {
  BOOK,
  CORPUS,
  chat,
  chatEscalate,
  chatLocal,
  research,
  researcher,
  seal,
  sealScore,
  searchSealed,
} from './book'
export type {
  Chat,
  ChatLane,
  Research,
  ResearchHit,
  SealBook,
} from './book'

/** Map tokens → live exports (fractal check). */
export function exportsForTokens(mod: Record<string, unknown> = {}): {
  readonly missing: readonly string[]
  readonly holds: boolean
} {
  const api = {
    reuse,
    amortize,
    crack,
    cracks,
    boundary,
    seal,
    chat,
    chatLocal,
    chatEscalate,
    research,
    researcher,
    ftl,
    ...mod,
  }
  const missing = [...new Set(Object.values(
    { address: 'reuse', reuse: 'reuse', search: 'reuse', amortize: 'amortize', crack: 'crack', cracks: 'cracks', boundary: 'boundary', seal: 'seal', chat: 'chat', chatLocal: 'chatLocal', chatEscalate: 'chatEscalate', research: 'research', researcher: 'researcher', memo: 'researcher', token: 'amortize', fold: 'reuse', ftl: 'ftl' },
  ))].filter((name) => typeof (api as Record<string, unknown>)[name] !== 'function')
  return { missing, holds: missing.length === 0 }
}

void CRACK_FLAGS

/**
 * Parent binds purify — FTL is only achieved in quantum: the leaf never climbs;
 * the host injects researcher·CORPUS·boundary (inversion). Callers address
 * `@/quantum/ftl.endlessPurify` (dynamic import of the leaf — no static cycle).
 * scanProseNames / Purify* types stay on `@/quantum/ftl/purify` (the leaf).
 */
export async function endlessPurify(
  opts: {
    readonly root?: string
    readonly maxGenerations?: number
    readonly scanLimit?: number
    readonly stopped?: boolean
  } = {},
): Promise<import('./purify').PurifyReport> {
  const { endlessPurify: run } = await import('./purify')
  return run({
    host: { researcher, corpus: CORPUS, boundary },
    ...opts,
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const v = ftl({ query: 'possibility:erpax', spaceSize: 3105, answers: 1, tokens: 0, reuses: 653 })
  const p = ftlReport({ reuses: 653 })
  console.log('quantum/ftl')
  console.log(`  holds=${v.holds} · ftlHolds=${p.holds} · speedupLog2=${v.reuse.speedupLog2.toFixed(2)} · eff=${v.amortize.efficiency}`)
  console.log(`  boundary: spacetime=${v.boundary.spacetime} · qpu=${v.boundary.qpu} · empty=${v.boundary.empty}`)
  const local = chatLocal('what is ftl', BOOK)
  console.log(`  chatLocal: lane=${local?.lane} · tokens=${local?.tokens}`)
  console.log(`  map holds=${exportsForTokens().holds}`)
  void import('./admin').then(({ adminBootShell }) => {
    const boot = adminBootShell({ reuses: 100 })
    console.log(`  adminBoot: holds=${boot.ftl.holds} · defer=${boot.deferHeavyProviders} · addr=${boot.address.slice(0, 8)}`)
  })
}

/** @index-cross.foldback child=quantum/ftl parent=quantum — this cross folds back into its parent. */
