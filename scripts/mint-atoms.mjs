#!/usr/bin/env node
/**
 * mint-atoms — the `mint` atom: land proposed missing atoms as SKILL.md nodes.
 *
 * Input: a JSON file `{ proposals: [{ atom, name, description, links, standards,
 * dimension }] }` (the vocabulary/competition workflows' output). For each:
 *   - skip if the atom already exists (content-addressed: one atom per norm'd name);
 *   - write src/<dir>/<atom>/SKILL.md — field/enum dims under src/fields/, the rest
 *     top-level src/<atom> — a lean node (frontmatter + lead + Composes + Standards);
 *   - link ONLY to atoms that RESOLVE (existing corpus OR a sibling minted this run);
 *     dead links are dropped so the aura/docs gates stay green by construction.
 * Idempotent: never overwrites an existing SKILL.md. Re-runnable: `pnpm mint:atoms`.
 *
 *   node scripts/mint-atoms.mjs <proposals.json>
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const norm = (s) => String(s).toLowerCase().replace(/[-_]/g, '')
const slug = (s) =>
  String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const e of entries) {
    const p = join(dir, e)
    let s
    try {
      s = statSync(p)
    } catch {
      continue
    }
    if (s.isDirectory()) walk(p, out)
    else if (e === 'SKILL.md') out.push(p)
  }
  return out
}

const arg = process.argv[2]
if (!arg) {
  console.error('usage: node scripts/mint-atoms.mjs <proposals.json>')
  process.exit(1)
}

// existing atom corpus: norm -> clean leaf
const corpus = new Map()
for (const f of walk('src')) {
  const leaf = basename(dirname(f))
  corpus.set(norm(leaf), leaf)
}

const raw = JSON.parse(readFileSync(arg, 'utf8'))
const proposals = Array.isArray(raw) ? raw : raw.proposals || []

const FIELD_DIMS = new Set(['field', 'enum'])
// register every proposed atom up front so intra-batch links resolve
const minting = new Set(proposals.filter((p) => p && p.atom).map((p) => norm(p.atom)))

let minted = 0
let skipped = 0
let droppedLinks = 0
for (const p of proposals) {
  if (!p || !p.atom || !p.name || !p.description) {
    skipped++
    continue
  }
  const a = slug(p.atom)
  const n = norm(a)
  if (!a || corpus.has(n)) {
    skipped++
    continue
  }
  const dir = FIELD_DIMS.has(p.dimension) ? join('src', 'fields', a) : join('src', a)
  if (existsSync(join(dir, 'SKILL.md'))) {
    skipped++
    continue
  }
  const rawLinks = Array.isArray(p.links) ? p.links : []
  const links = rawLinks
    .map(slug)
    .filter((l) => l && (corpus.has(norm(l)) || (minting.has(norm(l)) && norm(l) !== n)))
    .map((l) => corpus.get(norm(l)) || l)
  droppedLinks += rawLinks.length - links.length
  const desc = String(p.description).replace(/\s+/g, ' ').trim()
  const composes = links.length ? `\n\nComposes: ${[...new Set(links)].map((l) => `[[${l}]]`).join(' · ')}.` : ''
  const stds = Array.isArray(p.standards) ? p.standards.filter(Boolean) : []
  const standards = stds.length ? `\n\n## Standards\n${stds.map((s) => `- ${s}`).join('\n')}` : ''
  const md = `---\nname: ${a}\ndescription: ${JSON.stringify(desc)}\n---\n\n# ${a}\n\n${desc}${composes}${standards}\n`
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'SKILL.md'), md)
  corpus.set(n, a)
  minted++
  console.log(`  minted ${join(dir, 'SKILL.md')}  (${links.length} links${standards ? ' +standards' : ''})`)
}

console.log(`\nmint-atoms: ${minted} minted · ${skipped} skipped (existing/invalid) · ${droppedLinks} dead links dropped (of ${proposals.length} proposals)`)
