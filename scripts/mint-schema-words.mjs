// Encode all of schema.org as single-word atoms — the wave engine.
// Reads the full schema.org vocabulary, collides every term's camelCase tokens to single words,
// diffs against the atoms already on disk, and mints the MISSING ones as gate-clean SKILL.md atoms.
// Computed, deterministic, re-runnable (re-run as schema.org grows = the endless wave). DRY: a word
// that already exists (anywhere in the tree) is never re-minted; identical words collide to one atom.
//
//   node scripts/mint-schema-words.mjs            # mint all missing
//   node scripts/mint-schema-words.mjs --limit 50 # one wave of 50 (then re-run for the next)
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const SRC = 'src'
const limitArg = process.argv.indexOf('--limit')
const LIMIT = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : Infinity

const vocab = JSON.parse(readFileSync('src/sti/vocabulary/schemaorg.jsonld', 'utf8'))
const graph = vocab['@graph'] ?? []

const terms = []
for (const n of graph) {
  const id = String(n['@id'] ?? '')
  const m = id.match(/[:/]([A-Za-z][A-Za-z0-9]*)$/)
  if (m) terms.push(m[1])
}

const tokenize = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/\s+/).map((w) => w.toLowerCase()).filter(Boolean)
const STOP = new Set(['of', 'by', 'at', 'in', 'to', 'for', 'the', 'and', 'or', 'is', 'as', 'on', 'with', 'from', 'this', 'that', 'id', 'url', 'no', 'an', 'a'])

// word -> sorted set of schema.org terms that contain it (the provenance)
const wordTerms = new Map()
for (const t of terms) {
  for (const w of tokenize(t)) {
    if (w.length <= 2 || STOP.has(w) || !/^[a-z][a-z0-9]*$/.test(w)) continue
    if (!wordTerms.has(w)) wordTerms.set(w, new Set())
    wordTerms.get(w).add(t)
  }
}

// every atom leaf-name already on disk (top-level OR nested) — never re-mint
const existing = new Set()
const walk = (d) => {
  for (const e of readdirSync(d)) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const p = join(d, e)
    const st = statSync(p)
    if (st.isDirectory()) walk(p)
    else if (e === 'SKILL.md') existing.add(basename(dirname(p)))
  }
}
walk(SRC)

const missing = [...wordTerms.keys()].filter((w) => !existing.has(w)).sort()
let minted = 0
for (const w of missing) {
  if (minted >= LIMIT) break
  const dir = join(SRC, w)
  if (existsSync(join(dir, 'SKILL.md'))) continue
  const all = [...wordTerms.get(w)].sort()
  const shown = all.slice(0, 12).join(' · ') + (all.length > 12 ? ' · …' : '')
  const desc =
    `Use when reasoning about ${w} as a schema.org vocabulary word — the single word collided from the schema.org terms that contain it, content-addressed into the corpus.`
  const body = `---
name: ${w}
description: ${desc}
---

# ${w}

A schema.org vocabulary word, collided from the schema.org compounds that contain it — ${shown} ([[sti]] · [[collapse]] · [[merge]]).

**Law — [[law]]: ${w} is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
`
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'SKILL.md'), body)
  minted++
}
console.log('minted ' + minted + ' schema.org word-atoms (of ' + missing.length + ' missing) · existing atoms ' + existing.size)
