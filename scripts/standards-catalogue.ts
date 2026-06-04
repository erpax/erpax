/**
 * standards-catalogue — the ONE shared, uuid-native index where the dissolved
 * standards vocabulary meets.
 *
 * Standards are not folders; they are everywhere, dissolved across src/ as
 * `@standard` / `@rfc` banners (the usage truth). This generator JOINS the
 * curated spine (src/standards/registry.ts — the facts) to a live scan of those
 * banners, projects each standard to its canonical content-uuid (the SAME
 * `uuid()` projection every row/atom uses — RFC 8785 JCS ∥ SHA-256 → uuidv8,
 * RFC 9562 §5.8) and its colour (`uuidColor`, the multi-modal projection), and
 * emits ONE catalogue consumed by BOTH frontends:
 *
 *   - payload  → src/standards/seed.ts upserts one collection row per standard,
 *                its `liveContentUuid` taken from here (federation identity).
 *   - vitepress→ src/standards/SKILL.md gets a generated index section between
 *                <!-- CATALOGUE:START --> / <!-- CATALOGUE:END -->, each standard
 *                shown with its uuid colour swatch.
 *
 * Curated facts ⊕ fs-derived usage ⊕ content-uuid identity. The catalogue is a
 * CACHE; the registry + banners are the truth. Run via tsx (resolves @/):
 *   pnpm standards:catalogue          ·          verify: pnpm standards (--verify)
 *
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan, two consumers, one uuid)
 * @standard ISO-19011:2018 §6.4 audit-evidence (citations are the audit trail)
 * @rfc 9562 content-uuid (each standard is content-addressed)
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { STANDARDS_REGISTRY, type RegisteredStandard } from '@/standards/registry'
import { uuid } from '@/integrity/content-uuid'
import { uuidColor } from '@/uuid/projection'

const ROOT = new URL('..', import.meta.url).pathname
const CATALOGUE_TS = ROOT + 'src/standards/catalogue.ts'
const SKILL_MD = ROOT + 'src/standards/SKILL.md'

interface Module {
  path: string
  section: string
}
interface Entry {
  id: string
  family: string
  title: string
  /** Canonical content-uuid — uuid({ id, family, title }); the federation identity. */
  uuid: string
  /** The uuid projected to colour (hsl) — the multi-modal signature. */
  color: string
  count: number
  modules: Module[]
}

// --- scan the dissolved vocabulary: every @standard / @rfc banner in src/ ---
function scan(): { path: string; value: string }[] {
  let raw = ''
  try {
    raw = execSync(
      String.raw`rg -n --no-heading -o '@(standard|rfc)\s+[A-Za-z0-9][^*\n]+' src -g '!*.test.ts' -g '!**/catalogue.ts' -g '!**/registry.ts'`,
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
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
  return hits
}

function sectionOf(value: string): string {
  const m = value.match(/§[^\s,)]+|Art\.[^\s,)]+|BG-\d+|Annex\s+\w+/i)
  return m ? m[0] : ''
}

// Build the citation matcher: explicit `match`, else FAMILY[- ]?NUMBER, else the
// longest digit run, else the id.
function matcherFor(std: RegisteredStandard): RegExp {
  if (std.match) return new RegExp(std.match, 'i')
  const fm = std.id.match(/^([A-Za-z/]+)-(\d+[A-Za-z]?)$/)
  if (fm) return new RegExp(fm[1]!.replace('/', '\\/') + '[- ]?' + fm[2] + '\\b', 'i')
  const big = (std.id.match(/\d{3,}/g) ?? []).sort((a, b) => b.length - a.length)[0]
  if (big) return new RegExp(big, 'i')
  return new RegExp('\\b' + std.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i')
}

function build(): { entries: Entry[]; totalHits: number; matched: number } {
  const hits = scan()
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
  const entries: Entry[] = [...acc.values()]
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

// --- emit the shared catalogue TS (payload + vitepress both import facts) ---
function emitCatalogue(entries: Entry[]): void {
  const body = `/**
 * GENERATED by scripts/standards-catalogue.ts — do not edit by hand.
 *
 * The ONE shared, uuid-native index: the curated registry
 * (src/standards/registry.ts) joined to the live @standard / @rfc banners
 * dissolved across src/, each standard projected to its content-uuid + colour.
 * Consumed by BOTH frontends — the payload seed (src/standards/seed.ts) and the
 * vitepress page (src/standards/SKILL.md). Logic meets here. Regenerate:
 *   pnpm standards:catalogue     ·     verify: pnpm standards
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
  writeFileSync(CATALOGUE_TS, body)
}

// --- inject the rendered index into the vitepress-served SKILL.md page ---
function emitSkillSection(entries: Entry[]): void {
  if (!existsSync(SKILL_MD)) return
  const START = '<!-- CATALOGUE:START -->'
  const END = '<!-- CATALOGUE:END -->'
  const cited = entries.filter((e) => e.count > 0)
  const byFam = new Map<string, Entry[]>()
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
    '<!-- GENERATED from registry.ts ⊕ @standard banners by scripts/standards-catalogue.ts. Do not edit by hand. -->',
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
  let md = readFileSync(SKILL_MD, 'utf8')
  md =
    md.includes(START) && md.includes(END)
      ? md.replace(new RegExp(START + '[\\s\\S]*?' + END), block)
      : md.replace(/\n*$/, '') + '\n\n' + block + '\n'
  writeFileSync(SKILL_MD, md)
}

const { entries, totalHits, matched } = build()
const cited = entries.filter((e) => e.count > 0)
const uncited = entries.filter((e) => e.count === 0)

if (process.argv.includes('--verify')) {
  const fresh = JSON.stringify(entries)
  const cur = existsSync(CATALOGUE_TS)
    ? (readFileSync(CATALOGUE_TS, 'utf8').match(/STANDARDS_CATALOGUE[^=]*=\s*([\s\S]*?)\s*as const/)?.[1] ?? '')
    : ''
  let curN = 'STALE'
  try {
    curN = JSON.stringify(JSON.parse(cur))
  } catch {
    /* stale */
  }
  if (curN !== fresh) {
    console.error('ERROR: src/standards/catalogue.ts is stale. Run: pnpm standards:catalogue')
    process.exit(1)
  }
  console.log(`OK — catalogue fresh (${cited.length} cited standards, uuid-native).`)
} else {
  emitCatalogue(entries)
  emitSkillSection(entries)
  console.log('Wrote catalogue.ts + SKILL.md index (uuid-native).')
  console.log(`  registry: ${entries.length} · cited: ${cited.length} · uncited: ${uncited.length}`)
  console.log(
    `  banners: ${totalHits} scanned, ${matched} matched (${((100 * matched) / Math.max(1, totalHits)).toFixed(0)}% coverage)`,
  )
  if (uncited.length) console.log(`  uncited registry rows: ${uncited.map((e) => e.id).join(', ')}`)
}
