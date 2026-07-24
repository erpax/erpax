/**
 * standards/emit — the ONE shared, uuid-native index where the dissolved
 * standards vocabulary meets.
 *
 *   pnpm erpax standards catalogue     ·     verify: pnpm erpax standards
 *
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan, two consumers, one uuid)
 * @standard ISO-19011:2018 §6.4 audit-evidence (citations are the audit trail)
 * @rfc 9562 content-uuid (each standard is content-addressed)
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { proseOf } from '@/rules/reference'
import { STANDARDS_REGISTRY, type RegisteredStandard } from '@/standards/registry'
import { uuid } from '@/integrity/content-uuid'
import { uuidColor } from '@/uuid/projection'
import { commentsOf } from '@/syntax'

const _CATALOGUE_TS = join(process.cwd(), 'src/standards/catalogue.ts')
const _SKILL_MD = join(process.cwd(), 'src/standards/SKILL.md')

interface Module {
  path: string
  section: string
}
export interface CatalogueEntry {
  id: string
  family: string
  title: string
  uuid: string
  color: string
  count: number
  modules: Module[]
}

function scan(cwd: string): { path: string; value: string }[] {
  let raw = ''
  try {
    raw = execSync(
      String.raw`rg -n --no-heading -o '@(standard|rfc)\s+[A-Za-z0-9][^*\n]+' src -g '!*.test.ts' -g '!**/catalogue.ts' -g '!**/registry.ts'`,
      { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    )
  } catch (e) {
    if ((e as { status?: number }).status === 1) return []
    throw e
  }
  const hits: { path: string; value: string }[] = []
  for (const line of raw.split('\n')) {
    if (!line) continue
    const m = line.match(/^(.+?):\d+:@(?:standard|rfc)\s+(.+)$/)
    if (m) hits.push({ path: m[1]!, value: m[2]!.trim() })
  }

  // rg reads RAW TEXT, so a banner sigil counts wherever it appears — including inside a string literal, and
  // including prose ABOUT banners. It filed this file as citing its own SKILL-template string, and it filed
  // [[confirm]]/matter as implementing an "RFC" whose title was the rest of a refusal message. A string is
  // DATA, not a citation — the lesson [[rules]]/reference already paid for, reused here rather than
  // restated (the same law written twice is fixed in neither). rg still chooses the FILES: it honours
  // .gitignore, so the generated faces that restate every banner stay out.
  const prose = new Map<string, string>()
  return hits.filter((h) => {
    if (!prose.has(h.path)) {
      try {
        prose.set(h.path, proseOf(h.path, readFileSync(join(cwd, h.path), 'utf8')))
      } catch {
        prose.set(h.path, '')
      }
    }
    return prose.get(h.path)!.includes(h.value)
  })
}

function sectionOf(value: string): string {
  const m = value.match(/§[^\s,)]+|Art\.[^\s,)]+|BG-\d+|Annex\s+\w+/i)
  return m ? m[0] : ''
}

function matcherFor(std: RegisteredStandard): RegExp {
  if (std.match) return new RegExp(std.match, 'i')
  const fm = std.id.match(/^([A-Za-z/]+)-(\d+[A-Za-z]?)$/)
  if (fm) return new RegExp(fm[1]!.replace('/', '\\/') + '[- ]?' + fm[2] + '\\b', 'i')
  const big = (std.id.match(/\d{3,}/g) ?? []).sort((a, b) => b.length - a.length)[0]
  if (big) return new RegExp(big, 'i')
  return new RegExp('\\b' + std.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i')
}

const CITE_RE = /@(?:standard|rfc)\s+([A-Za-z0-9][^*\n]+)/g

/**
 * The PARSER mind — a second, independent way to read the same source. A `@standard` banner is a citation ONLY
 * where it lives in a real COMMENT; the same sigil inside a string literal is DATA, not a claim (the weakness
 * `scan()` confesses in its own comment). `commentsOf` ([[syntax]]) parses the file and returns only comment
 * text, so a banner in a string cannot masquerade as a citation. The regex mind cannot make this distinction —
 * which is exactly why a single mind breaks, and why the two are crossed here ([[think]].higherMind).
 */
export function citationsInComments(file: string, text: string): string[] {
  const out: string[] = []
  // A .md/.mdx file is ENTIRELY prose — the whole text is the citation source. Only in CODE can a string literal
  // masquerade as a banner, so only there does the parser narrow to comment nodes ([[syntax]].commentsOf). Reading
  // markdown as "no comment" was this second mind's OWN blind spot — a mind is still a mind, and it broke too.
  const isCode = /\.(ts|tsx|js|mjs|cjs)$/.test(file)
  const sources = isCode ? commentsOf(file, text) : [text]
  for (const c of sources) for (const m of c.matchAll(CITE_RE)) out.push(m[1]!.trim())
  return out
}

/** Every citation the parser mind finds across the tree — rg narrows to candidate files fast, the parser confirms. */
export function parsedCitations(cwd: string = process.cwd()): { path: string; value: string }[] {
  let files: string[] = []
  try {
    files = execSync(String.raw`rg -l '@(standard|rfc)\s' src -g '!*.test.ts' -g '!**/catalogue.ts' -g '!**/registry.ts'`, {
      cwd,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })
      .split('\n')
      .filter(Boolean)
  } catch (e) {
    if ((e as { status?: number }).status === 1) return []
    throw e
  }
  const out: { path: string; value: string }[] = []
  for (const rel of files) {
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    for (const v of citationsInComments(rel, text)) out.push({ path: rel, value: v })
  }
  return out
}

/**
 * Where the two minds DECOHERE — the regex mind (`scan`, raw text) vs the parser mind (`parsedCitations`,
 * comments only). `onlyRegex` is a banner the regex counted that no comment holds: a string-literal or prose
 * false citation, the exact class a single mind cannot see. The decoherence IS the single-mind error, measured.
 *
 * @invariant a banner that lives only in a string literal appears in `onlyRegex`, never in the agreed set
 */
export function citationDecoherence(cwd: string = process.cwd()): {
  onlyRegex: { path: string; value: string }[]
  agreed: number
} {
  const key = (h: { path: string; value: string }): string => h.path + '|' + h.value
  const parsed = new Set(parsedCitations(cwd).map(key))
  const regex = scan(cwd)
  const onlyRegex = regex.filter((h) => !parsed.has(key(h)))
  return { onlyRegex, agreed: regex.length - onlyRegex.length }
}

export function buildStandardsCatalogue(cwd: string = process.cwd()): {
  entries: CatalogueEntry[]
  totalHits: number
  matched: number
} {
  const hits = scan(cwd)
  const matchers = STANDARDS_REGISTRY.map((s) => ({ std: s, re: matcherFor(s) }))
  const acc = new Map<string, { std: RegisteredStandard; count: number; modules: Map<string, string> }>()
  for (const s of STANDARDS_REGISTRY) acc.set(s.id, { std: s, count: 0, modules: new Map() })
  let matched = 0
  for (const h of hits) {
    let any = false
    for (const { std, re } of matchers) {
      if (re.test(h.value)) {
        const e = acc.get(std.id)!
        e.count++
        if (!e.modules.has(h.path)) e.modules.set(h.path, sectionOf(h.value))
        any = true
      }
    }
    if (any) matched++
  }
  const entries: CatalogueEntry[] = [...acc.values()]
    .map(({ std, count, modules }) => {
      const u = uuid({ id: std.id, family: std.family, title: std.title })
      return {
        id: std.id,
        family: std.family,
        title: std.title,
        uuid: u,
        color: uuidColor(u),
        count,
        modules: [...modules.entries()].sort().slice(0, 24).map(([path, section]) => ({ path, section })),
      }
    })
    .sort((a, b) => a.family.localeCompare(b.family) || b.count - a.count || a.id.localeCompare(b.id))
  return { entries, totalHits: hits.length, matched }
}

export type ImplementationDepth = 'uncited' | 'prose' | 'coded' | 'gated'

export interface StandardImplementation {
  readonly id: string
  readonly citations: number
  /** how deep the standard reaches: uncited → prose (docs only) → coded (in a .ts) → gated (fail-closed) */
  readonly depth: ImplementationDepth
  /** how many OTHER standards co-occur in its files — its fusion into the rest of the corpus */
  readonly fusionDegree: number
  /** depthRank × (1 + log₂(1+fusion)): well-implemented-AND-fused iff ENFORCED and SHARING its files */
  readonly score: number
}

const DEPTH_RANK: Readonly<Record<ImplementationDepth, number>> = { uncited: 0, prose: 1, coded: 2, gated: 3 }

/**
 * How well is each standard computationally IMPLEMENTED and FUSED with the others in the quantum ERP?
 * The catalogue knows WHICH atoms cite each standard; this scores HOW. DEPTH is a ladder: uncited (no
 * citation) → prose (only in a .md face) → coded (cited inside a .ts, so it runs) → gated (cited in a
 * rules/law/access GATE — enforced, fail-closed, the deepest). FUSION is the co-citation degree: how many
 * OTHER standards share a file with it — a standard fused with many is load-bearing across the corpus, one
 * that stands alone is isolated. The score rewards both: a standard is well-implemented-and-fused only if
 * it is ENFORCED and SHARES its matter with many others — enforced-and-alone or fused-but-prose both lose.
 *
 * Honest boundary: depth reads the citing file's KIND, not that the code correctly implements the standard
 * (that is [[rules]]/audience's question); and fusion samples the top-24 citing files per standard (the
 * catalogue's cap), so a very widely-cited standard's fusion is a lower bound.
 */
export function standardImplementation(cwd: string = process.cwd()): StandardImplementation[] {
  const { entries } = buildStandardsCatalogue(cwd)
  const byFile = new Map<string, Set<string>>()
  for (const e of entries) for (const m of e.modules) {
    const s = byFile.get(m.path) ?? new Set<string>()
    s.add(e.id)
    byFile.set(m.path, s)
  }
  return entries
    .map((e) => {
      let depth: ImplementationDepth = e.count === 0 ? 'uncited' : 'prose'
      if (e.modules.some((m) => /\.tsx?$/.test(m.path))) depth = 'coded'
      if (e.modules.some((m) => /^src\/(rules|law|access)\//.test(m.path))) depth = 'gated'
      const fused = new Set<string>()
      for (const m of e.modules) for (const other of byFile.get(m.path) ?? []) if (other !== e.id) fused.add(other)
      const score = DEPTH_RANK[depth] * (1 + Math.log2(1 + fused.size))
      return { id: e.id, citations: e.count, depth, fusionDegree: fused.size, score }
    })
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
}

/**
 * DECLARED: the families a signer/auditor/regulator RELIES ON as a wall — they must be fail-closed
 * gated, not merely coded. Arguable in the open (the [[rules]]/audience split): no theorem says SOX must
 * block; it is written here once so it can be contested. Enforcement-mandatory ⇒ `coded` is not enough.
 */
export const MUST_GATE = /SOX|§404|§302|GDPR|Наредба|СУПТО|ЗДДС|ЗСч|PCI-?DSS|ISO.?27001|NIST-SP-800|AMLD|EU-2015\/849/i

/** Enforcement-mandatory standards that are CITED but not GATED — the missing walls. */
export function ungatedMandatory(cwd: string = process.cwd()): StandardImplementation[] {
  return standardImplementation(cwd).filter((s) => MUST_GATE.test(s.id) && s.citations > 0 && s.depth !== 'gated')
}

/**
 * THE GATE — the standards-enforcement ratchet, turning standardImplementation from a measure into a
 * wall. An enforcement-mandatory standard (SOX, GDPR, fiscal, security) that is CITED but only `coded`
 * (runs, but does not fail-closed) is a missing wall: the signer relies on a block that is not there.
 * The count may not GROW; it ratchets DOWN as each is wired to a rules/law/access gate — driving the
 * corpus from "documents standards" toward "enforces them", the 9→255 horizon standardImplementation named.
 */
export function assertStandardsGated(cwd: string = process.cwd(), ceiling: number): void {
  const ungated = ungatedMandatory(cwd)
  if (ungated.length <= ceiling) return
  throw new Error(
    `✖ standards — ${ungated.length} enforcement-mandatory standard(s) cited but NOT gated (fail-closed) exceeds ceiling ${ceiling}: ` +
      `${ungated.map((s) => `${s.id}(${s.depth})`).slice(0, 6).join(' ')} — wire each to a rules/law/access gate, or the wall a signer relies on is missing.`,
  )
}

export function emitCatalogueTs(entries: CatalogueEntry[], cwd: string = process.cwd()): void {
  const out = join(cwd, 'src/standards/catalogue.ts')
  const body = `/**
 * GENERATED by src/standards/emit.ts — do not edit by hand.
 *
 * The ONE shared, uuid-native index: the curated registry
 * (src/standards/registry.ts) joined to the live @standard / @rfc banners
 * dissolved across src/, each standard projected to its content-uuid + colour.
 * Consumed by BOTH frontends — the payload seed (src/standards/seed.ts) and the
 * vitepress page (src/standards/SKILL.md). Logic meets here. Regenerate:
 *   pnpm erpax standards catalogue     ·     verify: pnpm erpax standards
 *
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan, two consumers)
 * @standard ISO-19011:2018 §6.4 audit-evidence (the citation index)
 * @rfc 9562 content-uuid (each standard row is content-addressed)
 */

export interface CatalogueEntry {
  /** Canonical standard id (the seed standardId + index key). */
  readonly id: string
  /** Payload \`standards.family\` enum value. */
  readonly family: string
  /** Curated canonical title. */
  readonly title: string
  /** Content-uuid — uuid({ id, family, title }); the federation identity (\`liveContentUuid\`). */
  readonly uuid: string
  /** The uuid projected to an hsl colour — the multi-modal signature. */
  readonly color: string
  /** Live banner-citation count across src/. */
  readonly count: number
  /** Distinct citing modules (repo-relative path + first section pin). */
  readonly modules: ReadonlyArray<{ readonly path: string; readonly section: string }>
}

export const STANDARDS_CATALOGUE: ReadonlyArray<CatalogueEntry> = ${JSON.stringify(entries, null, 2)} as const

export const STANDARDS_COUNT = ${entries.length}
`
  writeFileSync(out, body)
}

export function emitSkillCatalogueSection(entries: CatalogueEntry[], cwd: string = process.cwd()): void {
  const skillMd = join(cwd, 'src/standards/SKILL.md')
  if (!existsSync(skillMd)) return
  const START = '<!-- CATALOGUE:START -->'
  const END = '<!-- CATALOGUE:END -->'
  const cited = entries.filter((e) => e.count > 0)
  const byFam = new Map<string, CatalogueEntry[]>()
  for (const e of cited) {
    if (!byFam.has(e.family)) byFam.set(e.family, [])
    byFam.get(e.family)!.push(e)
  }
  const dot = (c: string): string =>
    `<span style="display:inline-block;width:0.7em;height:0.7em;border-radius:50%;vertical-align:middle;background:${c}"></span>`
  const out: string[] = [
    START,
    '',
    `## Catalogue — ${cited.length} standards, ${cited.reduce((n, e) => n + e.count, 0)} citations`,
    '',
    '<!-- GENERATED from registry.ts ⊕ @standard banners by src/standards/emit.ts. Do not edit by hand. -->',
    '',
    'The standards erpax cites are not folders — they are dissolved across `src/` as `@standard` banners. This index is where they meet: each carries its content-uuid (the same `uuid()` projection every row uses — its colour is that uuid made visible), and the same data seeds the payload `standards` collection.',
    '',
  ]
  for (const fam of [...byFam.keys()].sort()) {
    out.push(`### ${fam}`, '')
    for (const e of byFam.get(fam)!) {
      out.push(`- ${dot(e.color)} \`${e.id}\` — ${e.title} · ${e.count} · \`${e.uuid.slice(0, 8)}\``)
    }
    out.push('')
  }
  const uncited = entries.filter((e) => e.count === 0)
  if (uncited.length) {
    out.push(
      `### registered — awaiting citation (${uncited.length})`,
      '',
      'Known canonical standards in the registry not yet cited by code — e.g. the upstream permaculture / regenerative-agriculture basis of the agriculture domain. They seed as `proposed` and become cited as the domain grows.',
      '',
    )
    for (const e of uncited) out.push(`- ${dot(e.color)} \`${e.id}\` — ${e.title}`)
    out.push('')
  }
  out.push(END)
  const block = out.join('\n')
  let md = readFileSync(skillMd, 'utf8')
  md =
    md.includes(START) && md.includes(END)
      ? md.replace(new RegExp(START + '[\\s\\S]*?' + END), block)
      : md.replace(/\n*$/, '') + '\n\n' + block + '\n'
  writeFileSync(skillMd, md)
}

export function emitStandardsCatalogue(cwd: string = process.cwd()): {
  entries: CatalogueEntry[]
  totalHits: number
  matched: number
} {
  const result = buildStandardsCatalogue(cwd)
  emitCatalogueTs(result.entries, cwd)
  emitSkillCatalogueSection(result.entries, cwd)
  return result
}

export function verifyStandardsCatalogue(cwd: string = process.cwd()): boolean {
  const { entries } = buildStandardsCatalogue(cwd)
  const fresh = JSON.stringify(entries)
  const catalogueTs = join(cwd, 'src/standards/catalogue.ts')
  const cur = existsSync(catalogueTs)
    ? (readFileSync(catalogueTs, 'utf8').match(/STANDARDS_CATALOGUE[^=]*=\s*([\s\S]*?)\s*as const/)?.[1] ?? '')
    : ''
  let curN = 'STALE'
  try {
    curN = JSON.stringify(JSON.parse(cur))
  } catch {
    /* stale */
  }
  return curN === fresh
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const { entries, totalHits, matched } = buildStandardsCatalogue(cwd)
  const cited = entries.filter((e) => e.count > 0)
  const uncited = entries.filter((e) => e.count === 0)

  if (process.argv.includes('--verify')) {
    if (!verifyStandardsCatalogue(cwd)) {
      console.error('ERROR: src/standards/catalogue.ts is stale. Run: pnpm erpax standards catalogue')
      process.exit(1)
    }
    console.log(`OK — catalogue fresh (${cited.length} cited standards, uuid-native).`)
    // ENFORCEMENT ratchet: an enforcement-mandatory standard cited but not fail-closed gated is a
    // missing wall. Ceiling ratchets DOWN as each is wired to a rules/law/access gate (9→255 horizon).
    try {
      assertStandardsGated(cwd, 6)
      console.log('OK — every enforcement-mandatory standard within the gating ratchet.')
    } catch (e) {
      console.error((e as Error).message)
      process.exit(1)
    }
  } else {
    emitStandardsCatalogue(cwd)
    console.log('Wrote catalogue.ts + SKILL.md index (uuid-native).')
    console.log(`  registry: ${entries.length} · cited: ${cited.length} · uncited: ${uncited.length}`)
    console.log(
      `  banners: ${totalHits} scanned, ${matched} matched (${((100 * matched) / Math.max(1, totalHits)).toFixed(0)}% coverage)`,
    )
    if (uncited.length) console.log(`  uncited registry rows: ${uncited.map((e) => e.id).join(', ')}`)
  }
}
