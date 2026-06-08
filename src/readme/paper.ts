/**
 * readme/paper — every MD and TS file IS a scientific paper; all merge in the root README.
 *
 * MD papers: abstract · methods · results · references · content-uuid (SKILL.md · README.md · LLM.md).
 * TS papers: hypothesis/exports · methods/impl · results/behavior · proof via paired test.ts.
 * `mergeCorpusPapers` folds the live tree with the folder [[gravity]] gate (sealed atoms only
 * contribute references to the union).
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { toUuid } from '@/uuid/matrix'
import { parseTsImports } from '@/quantum/boundary'
import { parseMethodExports } from '@/method'

export type PaperMedium = 'md' | 'ts'
export type MdPaperKind = 'SKILL' | 'README' | 'LLM' | 'ROOT'
export type TsPaperKind = 'index' | 'test' | 'seed' | 'tsx' | 'other'

/** One extracted paper — MD or TS — from a single file path. */
export interface ScientificPaper {
  readonly path: string
  readonly medium: PaperMedium
  readonly kind: MdPaperKind | TsPaperKind
  readonly title: string
  readonly abstract: string
  readonly methods: string
  readonly results: string
  readonly references: readonly string[]
  readonly uuid: string | null
  readonly proof: boolean
  readonly gravity: boolean
}

/** Rollup counts for one medium (md or ts). */
export interface PaperRollup {
  readonly total: number
  readonly byKind: Readonly<Record<string, number>>
  readonly withAbstract: number
  readonly withMethods: number
  readonly withResults: number
  readonly withReferences: number
  readonly withUuid: number
  readonly withProof: number
  readonly gravityHeld: number
}

/** Merged synthesis of every MD + TS paper in the corpus. */
export interface MergedCorpusPapers {
  readonly md: PaperRollup
  readonly ts: PaperRollup
  readonly total: number
  readonly distinctReferences: readonly string[]
  readonly gravityHeld: number
}

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/
const LAW_RE = /\*\*Law\s+—\s*\[\[law\]\]:\s*(.+?)\*\*/g
const BANNER_RE = /@(?:standard|audit|see|compliance|rfc)\s+([^\n*]+)/g
const ATTESTED_RE = /^Attested in\s+(.+)$/m
const CONTENT_UUID_RE = /content-uuid\s+`([0-9a-f-]{36})`/i
const FM_FIELD = (fm: string, key: string): string | null => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim()
  if (!m) return null
  if ((m.startsWith('"') && m.endsWith('"')) || (m.startsWith("'") && m.endsWith("'"))) {
    return m.slice(1, -1)
  }
  return m
}

const fmStandards = (fm: string): string[] => {
  const block = fm.match(/^standards:\s*\n((?:\s+-\s+.+\n?)+)/m)?.[1] ?? ''
  return [...block.matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1]!.trim().replace(/^["']|["']$/g, ''))
}

const sectionOf = (body: string, heading: string): string => {
  const lines = body.split('\n')
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`)
  if (start < 0) return ''
  const out: string[] = []
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i]!.startsWith('## ')) break
    out.push(lines[i]!)
  }
  return out.join('\n').trim()
}

const firstParagraph = (body: string): string => {
  const stripped = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^#{1,6}\s+.+$/gm, '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .trim()
  const para = stripped.split(/\n\n+/).find((p) => p.trim().length > 20)
  return para?.replace(/\s+/g, ' ').trim() ?? ''
}

const fileBanner = (text: string): string => {
  const m = text.match(/^\/\*\*([\s\S]*?)\*\//)
  return m?.[1]?.replace(/^\s*\*\s?/gm, '').trim() ?? ''
}

const bannerRefs = (text: string): string[] => {
  const refs: string[] = []
  for (const m of text.matchAll(BANNER_RE)) refs.push(m[1]!.trim())
  return refs
}

const lawLine = (text: string): string | null => {
  let last: string | null = null
  for (const m of text.matchAll(LAW_RE)) last = m[1]!.trim()
  return last
}

const tsKindOf = (file: string): TsPaperKind => {
  const base = basename(file)
  if (base === 'index.ts') return 'index'
  if (base === 'index.tsx') return 'tsx'
  if (base === 'test.ts' || base === 'test.tsx') return 'test'
  if (base === 'seed.ts') return 'seed'
  return 'other'
}

const mdKindOf = (relPath: string): MdPaperKind => {
  if (relPath === 'README.md') return 'ROOT'
  const base = basename(relPath)
  if (base === 'SKILL.md') return 'SKILL'
  if (base === 'LLM.md') return 'LLM'
  return 'README'
}

const stableStringify = (value: unknown): string => {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']'
  const obj = value as Record<string, unknown>
  const keys = Object.keys(obj).sort()
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}'
}

/** Content-uuid of canonical paper bytes — same extraction ⇒ same address. */
export function paperUuid(paper: ScientificPaper): string {
  const { gravity: _g, ...payload } = paper
  return toUuid(Buffer.from(stableStringify(payload), 'utf8'))
}

const emptyRollup = (): PaperRollup => ({
  total: 0,
  byKind: {},
  withAbstract: 0,
  withMethods: 0,
  withResults: 0,
  withReferences: 0,
  withUuid: 0,
  withProof: 0,
  gravityHeld: 0,
})

/** Empty merge — for pure render tests without a corpus scan. */
export function emptyMergedPapers(): MergedCorpusPapers {
  return { md: emptyRollup(), ts: emptyRollup(), total: 0, distinctReferences: [], gravityHeld: 0 }
}

const rollup = (papers: readonly ScientificPaper[]): PaperRollup => {
  const byKind: Record<string, number> = {}
  let withAbstract = 0
  let withMethods = 0
  let withResults = 0
  let withReferences = 0
  let withUuid = 0
  let withProof = 0
  let gravityHeld = 0
  for (const p of papers) {
    byKind[p.kind] = (byKind[p.kind] ?? 0) + 1
    if (p.abstract) withAbstract++
    if (p.methods) withMethods++
    if (p.results) withResults++
    if (p.references.length > 0) withReferences++
    if (p.uuid) withUuid++
    if (p.proof) withProof++
    if (p.gravity) gravityHeld++
  }
  return {
    total: papers.length,
    byKind,
    withAbstract,
    withMethods,
    withResults,
    withReferences,
    withUuid,
    withProof,
    gravityHeld,
  }
}

/** Fold MD + TS papers into one corpus synthesis — pure, deterministic. */
export function mergeCorpusPapers(papers: readonly ScientificPaper[]): MergedCorpusPapers {
  const md = papers.filter((p) => p.medium === 'md')
  const ts = papers.filter((p) => p.medium === 'ts')
  const refs = new Set<string>()
  for (const p of papers) {
    if (p.gravity) for (const r of p.references) refs.add(r)
  }
  return {
    md: rollup(md),
    ts: rollup(ts),
    total: papers.length,
    distinctReferences: [...refs].sort(),
    gravityHeld: papers.filter((p) => p.gravity).length,
  }
}

/** Extract a scientific paper from markdown text — pure. */
export function scientificPaperOf(
  text: string,
  relPath: string,
  gravity = false,
): ScientificPaper {
  const kind = mdKindOf(relPath)
  const fm = text.match(FRONTMATTER)?.[1] ?? ''
  const body = text.replace(FRONTMATTER, '')
  const refs = new Set<string>()

  for (const s of fmStandards(fm)) refs.add(s)
  for (const r of bannerRefs(text)) refs.add(r)
  const attested = body.match(ATTESTED_RE)?.[1]?.trim()
  if (attested) refs.add(attested)
  const seeLine = text.match(/^@see\s+(.+)$/m)?.[1]?.trim()
  if (seeLine) for (const part of seeLine.split('·')) refs.add(part.trim())

  const title =
    FM_FIELD(fm, 'name') ??
    body.match(/^#\s+(.+)$/m)?.[1]?.trim() ??
    basename(relPath, '.md')

  let abstract = ''
  let methods = ''
  let results = ''
  let uuid: string | null = FM_FIELD(fm, 'contentUuid')
  const law = lawLine(body)

  if (kind === 'SKILL') {
    abstract = FM_FIELD(fm, 'description') ?? firstParagraph(body)
    methods = sectionOf(body, 'Usage') || fileBanner(text) || bannerRefs(text).join(' · ')
    results = law ?? ''
  } else if (kind === 'LLM') {
    abstract = body.split('\n').slice(1, 4).join(' ').trim()
    methods = text.match(/<!-- GENERATED[\s\S]*?-->/)?.[0]?.replace(/<!--|-->|-->/g, '').trim() ?? ''
    results = body.match(/^law\s+(.+)$/m)?.[1]?.trim() ?? law ?? ''
  } else {
    abstract = body.match(/^>\s+(.+)$/m)?.[1]?.trim() ?? firstParagraph(body)
    methods =
      text.match(/<!-- GENERATED[\s\S]*?-->/)?.[0]?.replace(/<!--|-->|-->/g, '').trim() ??
      'derived from live tree'
    const balance = body.match(/\[\[balance\]\]\s+`(\d)`/)?.[1]
    const seal = body.match(/\[\[seal\]\]\s+`(\d)`/)?.[1]
    results = [law, balance !== undefined ? `balance ${balance}` : '', seal !== undefined ? `seal ${seal}` : '']
      .filter(Boolean)
      .join(' · ')
  }

  if (!uuid) uuid = text.match(CONTENT_UUID_RE)?.[1] ?? null

  return {
    path: relPath,
    medium: 'md',
    kind,
    title,
    abstract,
    methods,
    results,
    references: [...refs].sort(),
    uuid,
    proof: Boolean(law),
    gravity,
  }
}

export interface TsPaperContext {
  readonly hasTest?: boolean
  readonly hasIndex?: boolean
}

/** Extract a scientific paper from TypeScript source — pure. */
export function scientificPaperOfTs(
  text: string,
  relPath: string,
  gravity = false,
  ctx: TsPaperContext = {},
): ScientificPaper {
  const kind = tsKindOf(relPath)
  const banner = fileBanner(text)
  const exports = parseMethodExports(text)
  const imports = parseTsImports(text)
  const refs = bannerRefs(text)
  const title = basename(relPath)

  const abstract =
    exports.length > 0
      ? `exports: ${exports.slice(0, 12).join(' · ')}${exports.length > 12 ? ' …' : ''}`
      : firstParagraph(banner) || basename(relPath, '.ts')

  const methods =
    imports.length > 0
      ? `imports: ${imports.slice(0, 8).join(' · ')}${imports.length > 8 ? ' …' : ''}`
      : banner.split('\n').slice(0, 3).join(' ').trim()

  let results = ''
  if (kind === 'test') {
    const blocks = (text.match(/\b(describe|it)\s*\(/g) ?? []).length
    results = `${blocks} test blocks`
  } else if (exports.length > 0) {
    results = `${exports.length} exported symbol${exports.length === 1 ? '' : 's'}`
  } else {
    results = 'implementation (no public exports)'
  }

  let proof = false
  if (kind === 'test') proof = ctx.hasIndex ?? false
  else if (kind === 'index' || kind === 'tsx') proof = ctx.hasTest ?? false
  else if (kind === 'seed') proof = false

  return {
    path: relPath,
    medium: 'ts',
    kind,
    title,
    abstract,
    methods,
    results,
    references: refs.sort(),
    uuid: null,
    proof,
    gravity,
  }
}

/** Render the merged-papers section for the root README — pure. */
export function renderMergedPapersSection(merged: MergedCorpusPapers): string {
  const L: string[] = [
    '## the corpus — merged papers',
    '',
    'Every MD file (`SKILL.md` · `README.md` · `LLM.md`) and every TS file (`index.ts` · `test.ts` · …)',
    'IS a standalone scientific paper. This section merges the whole corpus here — computed, never hand-maintained.',
    '',
    '### abstract (rollup)',
    '',
    `- **${merged.total}** papers · MD **${merged.md.total}** · TS **${merged.ts.total}**`,
    `- **${merged.gravityHeld}** gravity-held (sealed atoms) · **${merged.distinctReferences.length}** distinct references in the union`,
    `- MD with law **${merged.md.withProof}** · TS with paired proof **${merged.ts.withProof}**`,
    '',
    '### methods',
    '',
    '`scientificPaperOf` extracts MD papers (abstract · methods · results · references · content-uuid);',
    '`scientificPaperOfTs` extracts TS papers (hypothesis/exports · methods/imports · results/behavior · proof via paired `test.ts`);',
    '`mergeCorpusPapers` folds both media with the folder [[gravity]] gate — only sealed atoms contribute references.',
    '',
    '### results',
    '',
    '| medium | kind | total | abstract | methods | results | references | uuid | proof | gravity |',
    '| ------ | ---- | ----: | -------: | ------: | ------: | ---------: | ---: | ----: | ------: |',
  ]

  const kindRows = (medium: PaperMedium, rollup: PaperRollup): void => {
    const kinds = Object.keys(rollup.byKind).sort()
    for (const k of kinds) {
      const n = rollup.byKind[k]!
      L.push(
        `| ${medium} | ${k} | ${n} | — | — | — | — | — | — | — |`,
      )
    }
    L.push(
      `| **${medium}** | **Σ** | **${rollup.total}** | **${rollup.withAbstract}** | **${rollup.withMethods}** | **${rollup.withResults}** | **${rollup.withReferences}** | **${rollup.withUuid}** | **${rollup.withProof}** | **${rollup.gravityHeld}** |`,
    )
  }
  kindRows('md', merged.md)
  kindRows('ts', merged.ts)

  L.push(
    '',
    '### references',
    '',
    `**${merged.distinctReferences.length}** distinct citations across gravity-held papers`,
    '(frontmatter `standards:` · `@standard` · `@see` · `Attested in` · file banners).',
    '',
  )
  return L.join('\n')
}

/** Collect every MD + TS paper under `src/` plus root README — impure (reads fs). */
export function collectCorpusPapers(
  cwd: string,
  sealedByAtom: ReadonlyMap<string, boolean>,
  atomPaths: readonly string[],
  opts?: { readonly skipRootReadme?: boolean },
): ScientificPaper[] {
  const papers: ScientificPaper[] = []
  const rootReadme = join(cwd, 'README.md')
  if (!opts?.skipRootReadme && existsSync(rootReadme)) {
    papers.push(scientificPaperOf(readFileSync(rootReadme, 'utf8'), 'README.md', true))
  }

  for (const atomPath of atomPaths) {
    const dir = join(cwd, 'src', atomPath)
    const gravity = sealedByAtom.get(atomPath) ?? false
    const hasTest = existsSync(join(dir, 'test.ts')) || existsSync(join(dir, 'test.tsx'))
    const hasIndex = existsSync(join(dir, 'index.ts')) || existsSync(join(dir, 'index.tsx'))
    const tsCtx: TsPaperContext = { hasTest, hasIndex }

    for (const md of ['SKILL.md', 'README.md', 'LLM.md'] as const) {
      const p = join(dir, md)
      if (!existsSync(p)) continue
      papers.push(scientificPaperOf(readFileSync(p, 'utf8'), `src/${atomPath}/${md}`, gravity))
    }

    for (const ts of ['index.ts', 'index.tsx', 'test.ts', 'test.tsx', 'seed.ts'] as const) {
      const p = join(dir, ts)
      if (!existsSync(p)) continue
      papers.push(scientificPaperOfTs(readFileSync(p, 'utf8'), `src/${atomPath}/${ts}`, gravity, tsCtx))
    }
  }

  return papers.sort((a, b) => a.path.localeCompare(b.path))
}
