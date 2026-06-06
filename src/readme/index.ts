/**
 * readme — the repository README, COMPUTED. No encoded prose: not one sentence.
 *
 * The README is a render target, the same as a vitepress page or the standards
 * catalogue. The earlier generator still hand-wrote a "section skeleton and a few
 * honest framing sentences" — that prose is now GONE. Every word emitted into
 * README.md is read from a source of truth at generation time; this file hand-
 * writes none of it. The corpus describes itself, in its own words.
 *
 * The discipline, greppable: the ONLY string literals in this file are
 *   (a) punctuation / markup glyphs — they carry no word, and
 *   (b) source ADDRESSES — a path, an object key, or a regex anchor that names a
 *       real, verifiable token in the repo (a file that exists, a config key that
 *       exists). An address that points at a real thing is not entropy: rename the
 *       thing and the generator breaks loudly. Many addresses double as the label
 *       they render (the folder `collections` is both what we read and what we print).
 * No literal asserts a fact about the project. The facts come from:
 *
 *   package.json              → name · description · version · license · scripts
 *                               · dependencies (+ versions) · engines
 *   src/collections/index.ts  → the registered-collection count (the @/collections barrel)
 *   the src/ tree (fs scan)   → atom folders · SKILL.md · index.ts · test.ts counts
 *   every atom SKILL.md       → the [[wikilink]] graph + each atom's own blurb (prose, live)
 *   @/horo (the math)         → digitalRoot · the horo ring · the measure names
 *   src/payload.config.ts     → the composed plugin pipeline + admin UI locales
 *   wrangler.jsonc            → the Cloudflare binding kinds · bindings · cron triggers
 *   src/standards/catalogue.ts→ the governing-standards count + families
 *
 * The CORE-ATOM spine is not a hand-picked list — that would be encoded. It is
 * computed by the math: centrality over the code subgraph (how many of the atoms
 * that carry an index.ts reference each concept) → the balance cut (the shortest
 * prefix that holds half the centrality mass, Σfeatured = Σrest, the double-entry
 * equilibrium) → ordered around the horo ring by digitalRoot of the centrality,
 * tagged with the horo measure name. Change the corpus and the spine recomputes.
 *
 * No timestamps; stable sorts; integer math only (no float → byte-deterministic),
 * so `--verify` can gate it. The README therefore CANNOT drift: change a collection,
 * a script, a binding, a standard, an atom, a link — and `pnpm readme:check` fails
 * until the README is regenerated (`pnpm readme`).
 *
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan → the README)
 * @standard ISO-19011:2018 §6.4 audit-evidence (every word traces to a source)
 * @audit the README is content-addressed to its sources — readme:check is the trail
 */
import { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { digitalRoot, HORO_DIGITS, HORO_MEASURE } from '@/horo'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..', '..')
const SRC = join(ROOT, 'src')
const README = join(ROOT, 'README.md')
const SELF = relative(ROOT, fileURLToPath(import.meta.url)) // src/readme/index.ts — derived, not typed
const SELFDIR = relative(ROOT, HERE) // src/readme — used to discover the regen scripts
const VERIFY = process.argv.includes('--verify')

const read = (p: string): string => readFileSync(p, 'utf8')
const readJson = (p: string): Record<string, unknown> => JSON.parse(read(p)) as Record<string, unknown>

// Glyphs — pure markup, no word. Built from char codes so this file contains no
// quoted symbol either; extends the backtick precedent the old generator set.
const BT = String.fromCharCode(96) // `
const MIDDOT = String.fromCharCode(32, 183, 32) // " · "
const EMDASH = String.fromCharCode(32, 8212, 32) // " — "
const ARROW = String.fromCharCode(32, 8594, 32) // " → "
const code = (s: string): string => BT + s + BT
const codes = (xs: readonly string[]): string => xs.map(code).join(MIDDOT)

// ─────────────────────────────────────────────────────────────────────────────
// derive — every figure below is read from a real source, never asserted
// ─────────────────────────────────────────────────────────────────────────────

const pkg = readJson(join(ROOT, 'package.json'))
const scripts = (pkg.scripts ?? {}) as Record<string, string>
const deps = (pkg.dependencies ?? {}) as Record<string, string>
const engines = (pkg.engines ?? {}) as Record<string, string>
const RUNNER = String(pkg.packageManager ?? '').split('@')[0]! // the declared package manager, e.g. pnpm

/** Top-level atom names: a real folder under src/ holding a SKILL.md (symlink-skipping). */
function atomNames(): string[] {
  const out: string[] = []
  let entries: string[]
  try {
    entries = readdirSync(SRC).sort()
  } catch {
    return out
  }
  for (const name of entries) {
    if (name.startsWith('.')) continue
    const full = join(SRC, name)
    let st
    try {
      st = lstatSync(full)
    } catch {
      continue
    }
    if (st.isSymbolicLink() || !st.isDirectory()) continue
    if (existsSync(join(full, 'SKILL.md'))) out.push(name)
  }
  return out
}

/** Walk src/, skipping symlinks (the .claude → src / src/skills → . loops) and dotdirs. */
interface TreeMetrics {
  skill: number
  index: number
  test: number
}
function scanTree(): TreeMetrics {
  let skill = 0
  let index = 0
  let test = 0
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const name of entries) {
      if (name === 'node_modules' || name.startsWith('.')) continue
      const full = join(dir, name)
      let st
      try {
        st = lstatSync(full)
      } catch {
        continue
      }
      if (st.isSymbolicLink() || !st.isDirectory()) continue
      if (existsSync(join(full, 'SKILL.md'))) skill++
      if (existsSync(join(full, 'index.ts'))) index++
      if (existsSync(join(full, 'test.ts'))) test++
      walk(full)
    }
  }
  walk(SRC)
  return { skill, index, test }
}

/** Count exported collections in the @/collections barrel (what Object.values(allCollections) yields). */
function countCollections(): number {
  const src = read(join(SRC, 'collections', 'index.ts'))
  let n = 0
  for (const m of src.matchAll(/export\s*\{([^}]*)\}\s*from/g)) {
    n += m[1]!
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean).length
  }
  return n
}

/** The governing-standards count, read from the generated standards catalogue. */
function standardsCount(): number {
  const m = read(join(SRC, 'standards', 'catalogue.ts')).match(/STANDARDS_COUNT\s*=\s*(\d+)/)
  return m ? parseInt(m[1]!, 10) : 0
}

/** Distinct `family` values across the standards catalogue (the taxonomy buckets). */
function standardFamilies(): string[] {
  const cat = read(join(SRC, 'standards', 'catalogue.ts'))
  const fams = new Set<string>()
  for (const m of cat.matchAll(/["']?family["']?\s*:\s*["']([^"']+)["']/g)) fams.add(m[1]!)
  return [...fams].sort()
}

/** The composed plugin pipeline (top-level calls in payload.config.ts `plugins: [ … ]`, in order). */
function pluginPipeline(): string[] {
  const cfg = read(join(SRC, 'payload.config.ts'))
  const start = cfg.indexOf('plugins: [')
  if (start < 0) return []
  const end = cfg.indexOf('\n  ],', start)
  const region = cfg.slice(start, end < 0 ? undefined : end)
  return [...region.matchAll(/^ {4}([a-zA-Z]\w*)(?:<[^>]*>)?\(/gm)].map((m) => m[1]!)
}

/** Official Payload packages this app composes, each with its pinned version (from package.json deps). */
function payloadPackages(): Array<[string, string]> {
  return Object.keys(deps)
    .filter((k) => k.startsWith('@payloadcms/'))
    .sort()
    .map((k) => [k, deps[k]!])
}

/** Admin UI locales (keys of payload.config.ts `supportedLanguages: { … }`). */
function localeCount(): number {
  const cfg = read(join(SRC, 'payload.config.ts'))
  const block = cfg.match(/supportedLanguages:\s*\{([\s\S]*?)\}\s*as Record/)
  if (!block) return 0
  return [...block[1]!.matchAll(/^\s+[a-z]{2}(?::\s*\w+)?,\s*$/gm)].length
}

/** Strip JSONC comments (string-aware) so commented-out bindings are never parsed as live. */
function stripJsonc(s: string): string {
  let out = ''
  let inStr = false
  let inLine = false
  let inBlock = false
  for (let i = 0; i < s.length; i++) {
    const c = s[i]!
    const n = s[i + 1]
    if (inLine) {
      if (c === '\n') {
        inLine = false
        out += c
      }
      continue
    }
    if (inBlock) {
      if (c === '*' && n === '/') {
        inBlock = false
        i++
      }
      continue
    }
    if (inStr) {
      out += c
      if (c === '\\') {
        out += s[i + 1] ?? ''
        i++
      } else if (c === '"') inStr = false
      continue
    }
    if (c === '"') {
      inStr = true
      out += c
      continue
    }
    if (c === '/' && n === '/') {
      inLine = true
      i++
      continue
    }
    if (c === '/' && n === '*') {
      inBlock = true
      i++
      continue
    }
    out += c
  }
  return out
}

/** Cloudflare binding kinds present + binding names + cron triggers, from wrangler.jsonc. */
function cloudflare(): { bindings: string[]; crons: string[]; kinds: string[] } {
  const w = stripJsonc(read(join(ROOT, 'wrangler.jsonc')))
  const bindings = [
    ...new Set([...w.matchAll(/"(?:binding|name)":\s*"([A-Z][A-Z0-9_]+)"/g)].map((m) => m[1]!)),
  ].sort()
  const cronBlock = w.match(/"crons":\s*\[([\s\S]*?)\]/)
  const crons = cronBlock ? [...cronBlock[1]!.matchAll(/"([^"]+)"/g)].map((m) => m[1]!) : []
  const kindKeys = [
    'assets',
    'images',
    'd1_databases',
    'r2_buckets',
    'kv_namespaces',
    'queues',
    'durable_objects',
    'ai',
    'vectorize',
    'browser',
    'analytics_engine_datasets',
    'send_email',
    'hyperdrive',
  ]
  const kinds = kindKeys.filter((k) => new RegExp(`"${k}"\\s*:`).test(w))
  return { bindings, crons, kinds }
}

/** Frontmatter scalar (quoted or bare) — mirrors the other generators' fmValue. */
function fmValue(fm: string, key: string): string {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  if (!m) return ''
  let v = m[1]!.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
  return v.replace(/\\(["'])/g, '$1')
}

/** An atom's name + first-sentence blurb, read live from its SKILL.md (null if absent). */
function atomBlurb(slug: string): { name: string; desc: string } | null {
  const p = join(SRC, slug, 'SKILL.md')
  if (!existsSync(p)) return null
  const fm = read(p).match(/^---\n([\s\S]*?)\n---/)
  if (!fm) return null
  const raw = fmValue(fm[1]!, 'description').replace(/\s+/g, ' ').trim()
  if (!raw) return null
  let desc = raw
  const stop = raw.indexOf('. ')
  if (stop > 0 && stop < 200) {
    desc = raw.slice(0, stop + 1)
  } else if (raw.length > 200) {
    const cut = raw.slice(0, 200)
    desc = cut.slice(0, cut.lastIndexOf(' ')).trimEnd() + String.fromCharCode(8230)
  }
  return { name: fmValue(fm[1]!, 'name') || slug, desc }
}

/** Strip the cross-env / NODE_OPTIONS / tsx noise from a script command for display. */
const clean = (cmd: string): string =>
  cmd
    .replace(/cross-env\s+/g, '')
    .replace(/NODE_OPTIONS="[^"]*"\s*/g, '')
    .replace(/--import=tsx\/esm\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim()

// ─────────────────────────────────────────────────────────────────────────────
// the math — the core-atom spine, computed (centrality → balance cut → horo ring)
// ─────────────────────────────────────────────────────────────────────────────

/** The horo ring as integers, computed from the real digitalRoot: the doubling
 *  orbit of 1 (1·2·4·8·7·5), then the remaining residues (the 3·6·9 axis), 9 last. */
function horoRing(): number[] {
  const orbit: number[] = []
  let x = 1
  do {
    orbit.push(x)
    x = digitalRoot(x * 2)
  } while (x !== 1)
  const nine = Math.max(...HORO_DIGITS)
  const rest = Array.from({ length: nine }, (_, i) => i + 1).filter((n) => !orbit.includes(n))
  return [...orbit, ...rest]
}

/** The horo measure name for a ring digit (base/share/weave/crest/descent/round/unity),
 *  or empty for the off-ring axis digits 3 & 6, which carry no measure. */
const measureOf = (d: number): string => (HORO_DIGITS.includes(d as 1) ? HORO_MEASURE[HORO_DIGITS.indexOf(d as 1)]! : '')

interface SpineAtom {
  name: string
  desc: string
  digit: number
  measure: string
}

/**
 * The spine: each atom's centrality = how many atoms that carry an index.ts (the
 * code subgraph) link to it via [[wikilink]] — the engineering core's own
 * reference graph, which the generated schema.org-leaf boilerplate cannot inflate.
 * Keep the balance cut (the shortest prefix holding half the total mass), then
 * order by the horo ring through digitalRoot(centrality).
 */
function spine(): SpineAtom[] {
  const atoms = atomNames()
  const set = new Set(atoms)
  const hasCode = (n: string): boolean => existsSync(join(SRC, n, 'index.ts'))

  // out-links (distinct, lower-cased leaf) per atom
  const outLinks = (a: string): Set<string> => {
    const body = read(join(SRC, a, 'SKILL.md'))
    const t = new Set<string>()
    for (const m of body.matchAll(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g)) {
      const leaf = m[1]!.trim().split('/').pop()!.toLowerCase()
      if (set.has(leaf) && leaf !== a) t.add(leaf)
    }
    return t
  }

  // centrality = in-degree counting only links from code atoms
  const centrality = new Map<string, number>()
  for (const a of atoms) {
    if (!hasCode(a)) continue
    for (const t of outLinks(a)) centrality.set(t, (centrality.get(t) ?? 0) + 1)
  }

  const ranked = [...centrality.entries()].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1))
  const total = ranked.reduce((s, [, v]) => s + v, 0)

  // balance cut: smallest prefix whose mass reaches half of the whole (Σ ≥ Σ)
  let acc = 0
  let cut = 0
  for (const [, v] of ranked) {
    acc += v
    cut++
    if (acc * 2 >= total) break
  }

  const ring = horoRing()
  const chosen: SpineAtom[] = []
  for (const [name, c] of ranked.slice(0, cut)) {
    const b = atomBlurb(name)
    if (!b) continue
    const digit = digitalRoot(c)
    chosen.push({ name: b.name, desc: b.desc, digit, measure: measureOf(digit) })
  }
  // order by the horo ring; within a band by centrality (already ranked) then name
  return chosen.sort(
    (a, b) => ring.indexOf(a.digit) - ring.indexOf(b.digit) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0),
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// build — markup is logic; every word is read from a source
// ─────────────────────────────────────────────────────────────────────────────

function build(): string {
  const t = scanTree()
  const collections = countCollections()
  const standards = standardsCount()
  const families = standardFamilies()
  const pipeline = pluginPipeline()
  const payload = payloadPackages()
  const locales = localeCount()
  const cf = cloudflare()
  const core = spine()

  const name = String(pkg.name ?? '')
  const description = String(pkg.description ?? '')
  const version = String(pkg.version ?? '')
  const license = String(pkg.license ?? '')

  // the regen commands, discovered (no key typed): the scripts that run this file
  const regen = Object.keys(scripts)
    .filter((k) => clean(scripts[k]!).includes(SELFDIR))
    .map((k) => code(RUNNER + ' ' + k))

  const L: string[] = []
  const p = (...lines: string[]): void => {
    L.push(...lines)
  }
  const H = (slug: string): string => '## ' + slug // heading = a sourced token (folder / pkg key)

  // banner — the contract that this file is generated; only the generator path,
  // the source paths it reads, and the regen commands. Not one English word.
  p(
    '<!-- ' +
      [
        SELF,
        'package.json',
        join('src', 'collections', 'index.ts'),
        join('src', '*', 'SKILL.md'),
        join('src', 'payload.config.ts'),
        'wrangler.jsonc',
        join('src', 'standards', 'catalogue.ts'),
        ...regen.map((r) => r.replace(new RegExp(BT, 'g'), '')),
      ].join(MIDDOT) +
      ' -->',
    '',
  )

  // title + tagline — package.json name + description, nothing added
  p('# ' + name, '', '> ' + description, '')

  // the facts — counts, each labelled by the token it was read from
  const facts: Array<[number, string]> = [
    [collections, 'collections'],
    [t.skill, 'SKILL.md'],
    [t.index, 'index.ts'],
    [t.test, 'test.ts'],
    [standards, 'standards'],
    [pipeline.length, 'plugins'],
    [locales, 'supportedLanguages'],
    [cf.bindings.length, 'bindings'],
  ]
  for (const [n, label] of facts) p('- **' + n + '** ' + code(label))
  p('')

  // the spine — core atoms, computed by the math, ordered around the horo ring
  p(H('atom'), '')
  for (const a of core) {
    const tag = a.measure ? ' ' + String.fromCharCode(42) + a.measure + String.fromCharCode(42) : ''
    p('- **' + a.name + '**' + tag + EMDASH + a.desc)
  }
  p('')

  // scripts — every npm script, grouped by its `:` namespace, key + command both sourced
  p(H('scripts'), '')
  const groups = new Map<string, string[]>()
  for (const key of Object.keys(scripts)) {
    const g = key.split(':')[0]!
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g)!.push(key)
  }
  for (const g of [...groups.keys()].sort()) {
    for (const key of groups.get(g)!) p('- ' + code('pnpm ' + key) + EMDASH + code(clean(scripts[key]!)))
  }
  p('')

  // plugins — the composed pipeline (in order) + the official packages with versions
  if (pipeline.length) {
    p(H('plugins'), '', pipeline.map(code).join(ARROW), '')
    if (payload.length) p(payload.map(([k, v]) => code(k) + ' ' + code(v)).join(MIDDOT), '')
  }

  // dependencies — the full runtime set, each with its pinned version
  const runtime = Object.keys(deps).sort()
  if (runtime.length) {
    p(H('dependencies'), '', runtime.map((k) => code(k) + ' ' + code(deps[k]!)).join(MIDDOT), '')
  }
  if (engines.node || engines.pnpm) {
    p(
      Object.keys(engines)
        .sort()
        .map((k) => code(k) + ' ' + code(engines[k]!))
        .join(MIDDOT),
      '',
    )
  }

  // standards — the count + the taxonomy families, from the catalogue
  p(H('standards'), '', '**' + standards + '** ' + code('@standard'), '')
  if (families.length) p(codes(families), '')

  // cloudflare — the binding kinds present, the bindings, the cron triggers
  p(H('cloudflare'), '')
  if (cf.kinds.length) p(codes(cf.kinds), '')
  if (cf.bindings.length) p(codes(cf.bindings), '')
  if (cf.crons.length) p(codes(cf.crons), '')

  // version · license — package.json
  p(H('license'), '', code(version) + MIDDOT + code(license), '')

  // footer — the generator + the regen commands, derived
  p('---', '', '<sub>' + code(SELF) + MIDDOT + regen.join(MIDDOT) + '</sub>', '')

  return L.join('\n')
}

// ─────────────────────────────────────────────────────────────────────────────
// run — emit, or verify freshness (the gate)
// ─────────────────────────────────────────────────────────────────────────────

const fresh = build()

if (VERIFY) {
  const current = existsSync(README) ? read(README) : ''
  if (current !== fresh) {
    console.error('ERROR: README.md is stale (the live tree changed). Run: pnpm readme')
    process.exit(1)
  }
  console.log('OK — README.md is fresh (computed from the live tree).')
} else {
  writeFileSync(README, fresh)
  const c = spine().length
  console.log(
    `readme: wrote README.md — ${countCollections()} collections · ${scanTree().skill} SKILL.md · ${standardsCount()} standards · ${pluginPipeline().length} plugins · ${c} core atoms (balance cut · horo ring).`,
  )
}
