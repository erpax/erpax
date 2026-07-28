/**
 * quantum/ftl/purify — chat waves cover src: scan prose names → develop RENAME.
 * src is too large to hand-edit; waves discover entanglements and feed themselves.
 *
 *   tsx src/quantum/ftl/purify.ts
 *
 * @see ./map · ./index · ../../wave/feed · ../../quantum/chat
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { foldToRoot, merge } from '@/merge'
import { feedWavesIntoThemselves, type WaveFeedReport } from '@/wave/feed'
import { RENAME, PROSE, TOKENS, type Token } from './map'
import { researcher, CORPUS, type Seal, boundary, type Boundary } from './index'

export const atomPath = 'quantum/ftl/purify' as const

export interface ProseHit {
  readonly file: string
  readonly name: string
  readonly to: string
  readonly line: number
}

export interface PurifyWave {
  readonly domain: 'purify'
  readonly develop: string
  readonly questions: readonly string[]
  readonly hit: ProseHit
}

const SKIP_DIR = new Set(['node_modules', '.git', 'dist', '.next', 'translations'])

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|md)$/.test(name) && !name.endsWith('.d.ts')) out.push(p)
  }
  return out
}

/** Keys of RENAME sorted longest-first (apply / match order). */
export const RENAME_KEYS = Object.keys(RENAME).sort((a, b) => b.length - a.length)

/**
 * Scan src for prose-laden identifiers that RENAME knows how to fold.
 * Pure discovery — no write. Chat waves develop the landings.
 */
export function scanProseNames(opts: {
  readonly root?: string
  readonly limit?: number
} = {}): readonly ProseHit[] {
  const root = opts.root ?? join(process.cwd(), 'src')
  const files = walk(root)
  const hits: ProseHit[] = []
  const keyRe = new RegExp(`\\b(${RENAME_KEYS.map(escapeRe).join('|')})\\b`, 'g')

  for (const file of files) {
    // Do not purify the map / purify atom itself (they DEFINE the old→new table)
    const rel = relative(process.cwd(), file).replace(/\\/g, '/')
    if (rel === 'src/quantum/ftl/map.ts' || rel === 'src/quantum/ftl/purify.ts' || rel === 'src/quantum/ftl/test.ts') continue

    const text = readFileSync(file, 'utf8')
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      keyRe.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = keyRe.exec(line)) != null) {
        const name = m[1]!
        hits.push({
          file: rel,
          name,
          to: RENAME[name as keyof typeof RENAME],
          line: i + 1,
        })
        if (opts.limit != null && hits.length >= opts.limit) return hits
      }
    }
  }
  return hits
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Hits whose name still contains a PROSE syllable (strict fuel). */
export function proseFuel(hits: readonly ProseHit[]): readonly ProseHit[] {
  return hits.filter((h) => PROSE.some((p) => h.name.includes(p)))
}

export function wavesFromHits(hits: readonly ProseHit[]): readonly PurifyWave[] {
  return hits.map((hit) => ({
    domain: 'purify' as const,
    develop: `${hit.file}:${hit.line} ${hit.name}→${hit.to}`,
    questions: [
      `rename ${hit.name} to ${hit.to} in ${hit.file}`,
      `does ${hit.to} map to a Token fold?`,
    ],
    hit,
  }))
}

export function asksFromHits(hits: readonly ProseHit[], limit = 12): readonly string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const h of hits) {
    const q = `how to rename ${h.name} → ${h.to} (${h.file}:${h.line})`
    if (seen.has(q)) continue
    seen.add(q)
    out.push(q)
    if (out.length >= limit) break
  }
  if (out.length === 0) {
    out.push('what remains to purify in src name tokens')
  }
  return out
}

/** Grow sealed corpus from rename findings (tokens=0 research fuel). */
export function growPurifyCorpus(
  findings: readonly { readonly question: string; readonly evidence: string }[],
  corpus: Seal[] = [...CORPUS],
): { readonly grown: number; readonly corpus: Seal[] } {
  let grown = 0
  for (const f of findings) {
    const id = `purify:${f.question.slice(0, 48)}`
    if (corpus.some((s) => s.id === id)) continue
    corpus.push({
      id,
      text: f.evidence.slice(0, 240),
      followUps: ['what remains to purify in src name tokens', 'boundary'],
    })
    grown++
  }
  return { grown, corpus }
}

export interface PurifyReport {
  readonly hits: readonly ProseHit[]
  readonly waves: readonly PurifyWave[]
  readonly feed: WaveFeedReport<PurifyWave>
  readonly boundary: Boundary
  readonly tokens: 0
  readonly cost: 0
  readonly holds: boolean
}

/**
 * Endless purify: scan → research asks → waves → feed into themselves.
 * Finite per call via maxGenerations; covers src by chat waves, not hand edits.
 */
export async function endlessPurify(opts: {
  readonly root?: string
  readonly maxGenerations?: number
  readonly scanLimit?: number
  readonly stopped?: boolean
} = {}): Promise<PurifyReport> {
  const hits = scanProseNames({ root: opts.root, limit: opts.scanLimit })
  const seedAsks = asksFromHits(hits)
  let corpus: Seal[] = [
    ...CORPUS,
    {
      id: 'purify-law',
      text: 'purify: scanProseNames → RENAME → chat waves; each Token word has an API; PROSE syllables die',
      followUps: ['what remains to purify in src name tokens', ...TOKENS.slice(0, 4)],
    },
  ]

  const feed = await feedWavesIntoThemselves<PurifyWave>({
    seedAsks,
    maxGenerations: opts.maxGenerations ?? 3,
    stopped: opts.stopped,
    research: async (asks) => {
      const r = researcher(corpus)
      const findings = await Promise.all(
        asks.map(async (q) => {
          const a = await r.ask(q)
          return { question: q, evidence: a.evidence }
        }),
      )
      return { findings, followUps: asksFromHits(hits, 8) }
    },
    wavesFrom: (research) => {
      const keyed = hits.filter((h) =>
        research.findings.some(
          (f) => f.question.includes(h.name) || f.evidence.includes(h.name) || f.question.includes(h.to),
        ),
      )
      const use = keyed.length > 0 ? keyed : hits.slice(0, 8)
      if (use.length > 0) return wavesFromHits(use)
      // corpus clean — still emit a seal wave so the feed has matter
      return [
        {
          domain: 'purify' as const,
          develop: 'src clean: no RENAME residual',
          questions: ['what remains to purify in src name tokens'],
          hit: {
            file: 'src/quantum/ftl/map.ts',
            name: 'RENAME',
            to: 'TOKENS',
            line: 1,
          },
        },
      ]
    },
    develop: (waves) => waves.map((w) => w.develop),
    growCorpus: (findings) => {
      const g = growPurifyCorpus(findings, corpus)
      corpus = g.corpus as Seal[]
      return g.grown
    },
  })

  const b = boundary([])
  return {
    hits,
    waves: wavesFromHits(hits.slice(0, 32)),
    feed,
    boundary: b,
    tokens: 0,
    cost: 0,
    holds: b.empty && feed.cost === 0,
  }
}

export function tokenWords(name: string): readonly string[] {
  return name.split(/(?=[A-Z])|[-_]/).filter(Boolean).map((w) => w.toLowerCase())
}

/** True iff every camel/snake syllable is a Token or CrackKind leaf. */
export function nameIsComputable(name: string, extra: readonly string[] = []): boolean {
  const allow = new Set<string>([...TOKENS, 'scan', 'rederive', 'spend', 'qpu', 'spacetime', 'ops', 'log', ...extra])
  return tokenWords(name).every((w) => allow.has(w as Token) || allow.has(w))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void endlessPurify({ maxGenerations: 2, scanLimit: 200 }).then((r) => {
    console.log('quantum/ftl/purify — chat waves cover src')
    console.log(
      `  hits=${r.hits.length} fed=${r.feed.fed} gens=${r.feed.generations.length} developed=${r.feed.totalDeveloped} cost=${r.cost}`,
    )
    console.log(`  seal=${foldToRoot([merge('hits', String(r.hits.length)), merge('dev', String(r.feed.totalDeveloped))])}`)
    for (const h of r.hits.slice(0, 12)) console.log(`    · ${h.file}:${h.line} ${h.name}→${h.to}`)
  })
}
