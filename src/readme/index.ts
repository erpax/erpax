/**
 * readme — the repository README, COMPUTED.
 *
 * The README is not hand-maintained prose; it is a render target, the same as a
 * vitepress page (the SKILL.md corpus) or the standards catalogue. Every FACT in
 * it — the collection count, the atom / SKILL.md / index.ts / test.ts metrics, the
 * tech-stack versions, the whole script table, the gate steps, the Cloudflare
 * bindings + cron triggers, the standards count, the plugin pipeline, the core-atom
 * blurbs — is DERIVED at generation time from the live sources of truth:
 *
 *   package.json            → name · description · version · license · scripts · versions
 *   src/collections/index.ts→ the registered-collection count (the @/collections barrel)
 *   the src/ tree (fs scan) → top-level atoms · SKILL.md · index.ts · test.ts counts
 *   src/payload.config.ts   → the composed plugin pipeline + admin UI locales
 *   wrangler.jsonc          → the Cloudflare bindings + cron triggers
 *   src/standards/catalogue.ts → the governing-standards count
 *   <core-atom>/SKILL.md    → the core-concept blurbs (the antimatter, read live)
 *
 * The only fixed English is the section skeleton and a few honest framing sentences
 * (as in scripts/standards-catalogue.ts, which prints fixed headers over computed
 * rows). No timestamps, stable sorts, side-effect-free — so the output is
 * byte-deterministic and `--verify` can gate it. The README therefore CANNOT drift:
 * change a collection, a script, a binding, a standard, an atom — and the gate
 * (pnpm readme:check) fails until the README is regenerated (pnpm readme).
 *
 *   pnpm readme           write README.md from the live tree
 *   pnpm readme:check     verify README.md is fresh (gate; exits 1 if stale)
 *
 * @standard ISO/IEC-25010:2023 §5.4 reusability (one scan → the README)
 * @standard ISO-19011:2018 §6.4 audit-evidence (every number traces to a source)
 * @audit the README is content-addressed to its sources — readme:check is the trail
 */
import { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..')
const SRC = join(ROOT, 'src')
const README = join(ROOT, 'README.md')
const VERIFY = process.argv.includes('--verify')

const read = (p: string): string => readFileSync(p, 'utf8')
const readJson = (p: string): Record<string, unknown> => JSON.parse(read(p)) as Record<string, unknown>

/** A backtick char, so README markdown code spans never fight the TS template quoting. */
const BT = String.fromCharCode(96)
const code = (s: string): string => BT + s + BT
const fence = (lines: string[]): string => [BT.repeat(3) + 'bash', ...lines, BT.repeat(3)].join('\n')

// ─────────────────────────────────────────────────────────────────────────────
// derive — every figure below is read from a real source, never asserted
// ─────────────────────────────────────────────────────────────────────────────

const pkg = readJson(join(ROOT, 'package.json'))
const scripts = (pkg.scripts ?? {}) as Record<string, string>
const deps = (pkg.dependencies ?? {}) as Record<string, string>
const devDeps = (pkg.devDependencies ?? {}) as Record<string, string>
const engines = (pkg.engines ?? {}) as Record<string, string>
const dep = (name: string): string => deps[name] ?? devDeps[name] ?? '—'

/** Walk src/, skipping symlinks (the .claude → src / src/skills → . loops) and dotdirs. */
interface TreeMetrics {
  depth1: number
  skill: number
  index: number
  test: number
  hyphenated: number
}
function scanTree(): TreeMetrics {
  let depth1 = 0
  let skill = 0
  let index = 0
  let test = 0
  let hyphenated = 0
  const walk = (dir: string, depth: number): void => {
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
      if (depth === 0) {
        depth1++
        if (name.includes('-')) hyphenated++
      }
      if (existsSync(join(full, 'SKILL.md'))) skill++
      if (existsSync(join(full, 'index.ts'))) index++
      if (existsSync(join(full, 'test.ts'))) test++
      walk(full, depth + 1)
    }
  }
  walk(SRC, 0)
  return { depth1, skill, index, test, hyphenated }
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

/** The composed plugin pipeline (top-level calls in payload.config.ts `plugins: [ … ]`, in order). */
function pluginPipeline(): string[] {
  const cfg = read(join(SRC, 'payload.config.ts'))
  const start = cfg.indexOf('plugins: [')
  if (start < 0) return []
  const end = cfg.indexOf('\n  ],', start)
  const region = cfg.slice(start, end < 0 ? undefined : end)
  return [...region.matchAll(/^ {4}(\w+)\(/gm)].map((m) => m[1]!)
}

/** Official Payload packages this app composes (from package.json deps). */
function payloadPackages(): string[] {
  return Object.keys(deps)
    .filter((k) => k.startsWith('@payloadcms/'))
    .map((k) => k.replace('@payloadcms/', ''))
    .sort()
}

/** Admin UI locales (keys of payload.config.ts `supportedLanguages: { … }`). */
function localeCount(): number {
  const cfg = read(join(SRC, 'payload.config.ts'))
  const block = cfg.match(/supportedLanguages:\s*\{([\s\S]*?)\}\s*as Record/)
  if (!block) return 0
  return [...block[1]!.matchAll(/^\s+[a-z]{2}(?::\s*\w+)?,\s*$/gm)].length
}

/** Cloudflare bindings + cron triggers + the binding-kind sections present, from wrangler.jsonc. */
function cloudflare(): { bindings: string[]; crons: string[]; kinds: string[] } {
  const w = read(join(ROOT, 'wrangler.jsonc'))
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
  return v
}

/** A core atom's name + first-sentence blurb, read live from its SKILL.md (null if absent). */
function atomBlurb(slug: string): { name: string; desc: string } | null {
  const p = join(SRC, slug, 'SKILL.md')
  if (!existsSync(p)) return null
  const fm = read(p).match(/^---\n([\s\S]*?)\n---/)
  if (!fm) return null
  const raw = fmValue(fm[1]!, 'description').replace(/\s+/g, ' ').trim()
  if (!raw) return null
  let desc = raw.split('. ')[0]!.replace(/\.$/, '') + '.'
  if (desc.length > 200) desc = desc.slice(0, 197).trimEnd() + '…'
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
// build — fixed skeleton, computed substance
// ─────────────────────────────────────────────────────────────────────────────

function build(): string {
  const t = scanTree()
  const collections = countCollections()
  const standards = standardsCount()
  const pipeline = pluginPipeline()
  const locales = localeCount()
  const cf = cloudflare()
  const name = String(pkg.name ?? 'erpax')
  const version = String(pkg.version ?? '0.0.0')
  const license = String(pkg.license ?? 'UNLICENSED')

  const L: string[] = []
  const p = (...lines: string[]): void => {
    L.push(...lines)
  }

  // banner — invisible on GitHub; the contract that this file is generated
  p(
    '<!-- GENERATED by src/readme — the README is COMPUTED, not hand-written. Do not edit by hand. -->',
    '<!-- Every figure is derived from: package.json · src/collections · the src/ tree · src/payload.config.ts · wrangler.jsonc · src/standards/catalogue.ts -->',
    '<!-- Regenerate: pnpm readme   ·   verify (gate): pnpm readme:check -->',
    '',
  )

  // title + tagline (fixed editorial framing — the only prose, kept honest + minimal)
  p(
    `# ${name} — multi-tenant ERP & double-entry accounting on Payload CMS + Cloudflare`,
    '',
    `> ${String(pkg.description ?? '')}`,
    '',
    'erpax is **two true things at once**: a working multi-tenant **ERP / double-entry accounting** platform on Payload CMS v4 (serverless on Cloudflare — D1 + R2 + Workers via OpenNext), and a **content-addressed skill corpus** where every concept is a one-word folder under `src/`. You can run it as a plain ERP and ignore the experiment. It was ported from two ~20-year-old Rails/ActiveAdmin production systems (`ceccec/erpax` + `ceccec/etrima`).',
    '',
    '> **This README is generated.** It is a render target like any other — run `pnpm readme` and every number below is recomputed from the live tree, so it cannot drift. Edit `src/readme`, never `README.md`.',
    '',
  )

  // by the numbers — 100% computed
  p(
    '## By the numbers',
    '',
    'Computed from the live tree by `src/readme` — never asserted, never rounded.',
    '',
    '| Metric | Value |',
    '| --- | --- |',
    `| Collections registered (the \`@/collections\` barrel) | **${collections}** |`,
    `| Top-level \`src/<word>\` atom folders | **${t.depth1}** |`,
    `| Concept atoms (\`SKILL.md\` files) | **${t.skill}** |`,
    `| Data atoms (\`index.ts\` files) | **${t.index}** |`,
    `| Colocated proofs (\`test.ts\` files) | **${t.test}** |`,
    `| Governing standards catalogued | **${standards}** |`,
    `| Payload plugins composed | **${pipeline.length}** |`,
    `| Admin UI locales | **${locales}** |`,
    `| Cloudflare bindings | **${cf.bindings.length}** |`,
    '',
  )

  // what it is (fixed, short)
  p(
    '## What it is',
    '',
    '- **Multi-tenant ERP** — general ledger, multi-currency invoicing, payments, bank reconciliation, tax, inventory, manufacturing, commerce, agriculture, statutory reporting.',
    '- **Double-entry as an invariant** — `Σdebit = Σcredit` is enforced as a Payload `beforeChange` precondition; an unbalanced write is rejected at validation time, not flagged after.',
    '- **Content-addressed identity** — object identity is an [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) v8 UUID derived from content: same content ⇒ same id ⇒ safe dedup / merge / federation, misalignment detectable.',
    '- **Standards bound to code** — `@standard` JSDoc banners name the governing standard each file implements; a gate verifies them and a generator compiles them into a queryable catalogue that seeds both the data and the docs.',
    '- **Serverless** — Cloudflare D1 (SQLite), R2 (objects), Workers AI, Queues, Durable Objects, via OpenNext. D1 is free-tier eligible for small/test deployments.',
    '',
  )

  // tech stack — computed from package.json
  const stack: Array<[string, string]> = [
    ['Backend / CMS', `Payload \`${dep('payload')}\``],
    ['Front end', `Next.js \`${dep('next')}\`, React \`${dep('react')}\``],
    ['Language', `TypeScript \`${dep('typescript')}\``],
    ['Database', `Cloudflare D1 (SQLite) — \`@payloadcms/db-d1-sqlite\` \`${dep('@payloadcms/db-d1-sqlite')}\``],
    ['Object storage', `Cloudflare R2 — \`@payloadcms/storage-r2\` \`${dep('@payloadcms/storage-r2')}\``],
    ['Deploy', `\`@opennextjs/cloudflare\` \`${dep('@opennextjs/cloudflare')}\` + Wrangler \`${dep('wrangler')}\``],
    ['Tests', `Vitest \`${dep('vitest')}\` (integration), Playwright \`${dep('@playwright/test')}\` (e2e)`],
    ['Docs', `VitePress \`${dep('vitepress')}\``],
    ['Runtime', `Node \`${engines.node ?? '—'}\`, pnpm \`${engines.pnpm ?? '—'}\``],
  ]
  p('## Tech stack', '', '| Layer | Choice |', '| --- | --- |')
  for (const [layer, choice] of stack) p(`| ${layer} | ${choice} |`)
  p(
    '',
    '> Payload is pinned to a `4.0.0-internal` build — do not assume public-release semver. The production build uses **webpack** (`next build --webpack`) so OpenNext can resolve package names. **Vitest runs single-threaded on purpose** (D1/SQLite lock contention). Tests are colocated as `src/**/*.test.ts`.',
    '',
  )

  // quick start (fixed commands; presence is real because they're in scripts)
  p(
    '## Quick start',
    '',
    fence([
      'pnpm install        # install dependencies',
      'pnpm setup          # generate PAYLOAD_SECRET, prompt for Cloudflare bindings, write .env.local',
      'pnpm dev            # local Payload admin + Next.js on http://localhost:3000',
    ]),
    '',
    'The only strictly required secret is `PAYLOAD_SECRET` (32-byte hex, e.g. `openssl rand -hex 32`); `pnpm setup` generates it. `CLOUDFLARE_ENV` + `NEXT_PUBLIC_SERVER_URL` are needed for deploys. See [`.env.example`](.env.example).',
    '',
  )

  // scripts — fully computed, grouped by namespace
  p('## Scripts', '', `All ${Object.keys(scripts).length} npm scripts, grouped — computed from `, '`package.json`.', '')
  const groups = new Map<string, string[]>()
  for (const key of Object.keys(scripts)) {
    const g = key.split(':')[0]!
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g)!.push(key)
  }
  p('| Command | Runs |', '| --- | --- |')
  for (const g of [...groups.keys()].sort()) {
    for (const key of groups.get(g)!) {
      p(`| ${code('pnpm ' + key)} | ${code(clean(scripts[key]!))} |`)
    }
  }
  p('')

  // the gate — computed by parsing the `check` chain
  p('## The gate', '', 'One command decides whether a change is acceptable:', '', fence(['pnpm check']), '')
  const checkCmd = scripts.check ?? ''
  const steps = checkCmd
    .split('&&')
    .map((s) => s.trim())
    .filter(Boolean)
  if (steps.length) {
    p('It runs, in order, and exits non-zero on the **first** failure:', '')
    let i = 0
    for (const step of steps) {
      i++
      const m = step.match(/pnpm run (\S+)/)
      const note = m && scripts[m[1]!] ? ` — ${code(clean(scripts[m[1]!]!))}` : ''
      p(`${i}. ${code(step)}${note}`)
    }
    p('', 'Exit 0 only when all pass. A separate pre-push gate adds further checks.', '')
  }

  // architecture — computed plugin pipeline + computed core atoms + honest note
  p('## Architecture', '')
  if (pipeline.length) {
    p(
      `### Plugin pipeline (${pipeline.length}, in composition order)`,
      '',
      'Payload plugins are pure functions `(config) => config`. erpax composes them, in this order, in `src/payload.config.ts`:',
      '',
      pipeline.map((n) => code(n)).join(' → '),
      '',
      `Built on the official Payload packages: ${payloadPackages().map(code).join(', ')}.`,
      '',
    )
  }
  const coreSlugs = [
    'law',
    'atom',
    'trinity',
    'uuid',
    'identity',
    'merge',
    'sequence',
    'entry',
    'balance',
    'access',
    'tenants',
    'standards',
    'collapse',
    'horo',
    'payload',
    'vitepress',
  ]
  const blurbs = coreSlugs.map((s) => ({ slug: s, b: atomBlurb(s) })).filter((x) => x.b)
  if (blurbs.length) {
    p(
      '### Core atoms',
      '',
      'The spine of the corpus — each is a one-word folder; its full prose is its `SKILL.md` (read live here):',
      '',
    )
    for (const { slug, b } of blurbs) p(`- **[${b!.name}](src/${slug}/SKILL.md)** — ${b!.desc}`)
    p('')
  }
  p(
    '### What is real vs an ordering principle',
    '',
    'An honest split, kept visible rather than oversold:',
    '',
    '- **Real, load-bearing engineering** — the content-UUID identity, the double-entry `beforeChange` invariant, the `@standard` banner gate + catalogue, multi-tenant row-level scoping, the self-documenting "trinity" (`index.ts` + `SKILL.md` + generated `payload-types` fused into one VitePress page), and this computed README.',
    '- **Aesthetic ordering principle** — the "horo" ring `{1,2,4,8,7,5,9}` and Rodin/digital-root framing are a real, tested *state algebra* (see `src/horo`), but the A432 / musical / numerological narrative around it is a naming convention, not an engineering claim.',
    '- **A direction of travel, not a finished state** — "collapse" toward a dense core is a goal; ' +
      `**${collections}** collections exist today.`,
    '',
  )

  // cloudflare — computed bindings + crons
  p(
    '## Cloudflare',
    '',
    `Deployed as a Worker (\`worker.ts\`) via OpenNext. Binding kinds in [\`wrangler.jsonc\`](wrangler.jsonc): ${cf.kinds.map(code).join(', ')}.`,
    '',
    `**${cf.bindings.length} bindings:** ${cf.bindings.map(code).join(', ')}.`,
    '',
  )
  if (cf.crons.length) {
    p(`**Cron triggers:** ${cf.crons.map((c) => code(c)).join(', ')} (Payload job sweep + BG/БНБ daily rates sync).`, '')
  }
  p(
    fence(['pnpm deploy        # migrate D1 → PRAGMA optimize → opennext build + deploy', 'pnpm preview       # local Cloudflare preview']),
    '',
  )

  // standards
  p(
    '## Standards',
    '',
    `**${standards}** governing standards (IFRS, US-GAAP, ISO, RFC, NIST, GDPR, EN-16931, SAF-T, Bulgarian Наредба Н-18, …) are declared as \`@standard\` banners across \`src/\`, verified by \`pnpm standards\`, and compiled into a queryable catalogue (\`src/standards/catalogue.ts\`) that seeds both the Payload data and the docs site. Compliance is by construction, not post-hoc audit.`,
    '',
  )

  // contributing
  p(
    '## Contributing',
    '',
    'erpax grows by accretion of atoms, with the gate keeping the whole green.',
    '',
    '1. **Write the atom** — create/edit `src/<word>/SKILL.md` (frontmatter `name` + `description`; prose with `[[wikilinks]]`). If it backs data, add `index.ts` (a `CollectionConfig` with `@standard` banners where a standard applies) and a colocated `test.ts`.',
    '2. **Wire the corpus** — `pnpm atoms:catalogue`, `pnpm aura:scan` (a dead `[[link]]` is a prompt to mint the atom it points at), `pnpm corpus:generate`.',
    '3. **Confirm + regenerate** — `pnpm confirm` (per-edit) and `pnpm readme` if you touched anything the README counts.',
    '4. **Pass the gate** — `pnpm check` must exit 0 and `pnpm docs:build` must succeed.',
    '',
    'House rules: **DRY, no backward-compat** (delete dead code; the DB + migrations are disposable, regenerated from config) and **name by generic data type, in one word** (`sales`, not `supto-sales`; regulatory refs live in `@standard` banners).',
    '',
  )

  // documentation
  p(
    '## Documentation',
    '',
    'The `SKILL.md` corpus is served as a VitePress site — `pnpm docs:dev`. Reference docs:',
    '',
    '- [`docs/ARCHITECTURE_MAP.md`](docs/ARCHITECTURE_MAP.md) — layered architecture + collection map',
    '- [`docs/BUSINESS_CHAINS.md`](docs/BUSINESS_CHAINS.md) — end-to-end business workflows',
    '- [`docs/STANDARDS.md`](docs/STANDARDS.md) — standards taxonomy + the `@standard` banner grammar',
    '- Entry points into the corpus: [`src/SKILL.md`](src/SKILL.md), [`src/readme/SKILL.md`](src/readme/SKILL.md), [`src/atom/SKILL.md`](src/atom/SKILL.md), [`src/uuid/SKILL.md`](src/uuid/SKILL.md)',
    '',
  )

  // project facts + license — computed
  p(
    '## Project facts',
    '',
    `- **Name:** ${name} · **Version:** ${version} · **License:** ${license}`,
    `- **Scope:** ${collections} Payload collections · ${t.skill} \`SKILL.md\` atoms · ${standards} standards · ${pipeline.length} plugins · ${locales} locales`,
    '- **Upstream:** ported from `ceccec/erpax` + `ceccec/etrima` (Rails / ActiveAdmin)',
    '',
    '## License',
    '',
    `${license}.`,
    '',
    '---',
    '',
    '<sub>Generated by [`src/readme/index.ts`](src/readme/index.ts). Do not edit `README.md` by hand — run `pnpm readme`.</sub>',
    '',
  )

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
  const t = scanTree()
  console.log(
    `readme: wrote README.md — ${countCollections()} collections · ${t.skill} SKILL.md · ${standardsCount()} standards · ${pluginPipeline().length} plugins · ${localeCount()} locales.`,
  )
}
