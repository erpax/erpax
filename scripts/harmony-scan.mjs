#!/usr/bin/env node
/**
 * harmony-scan — measure how harmonically the codebase NAMES things in atoms.
 *
 * THE LAW (collapse-to-atoms + harmonic naming ⇒ atoms meet automatically):
 * the atom corpus is the set of norm'd SKILL.md folder leaves — the SAME set the
 * wikiMap (.vitepress/corpus.mts) and the aura gate (aura/scan.mjs) resolve [[links]]
 * against. A code name (collection field / enum value) is HARMONIC when every alpha
 * word it concatenates norms to an existing atom. When a name is harmonic, the atoms
 * in it MEET — by name — the same atoms everywhere else (merge / path-as-address /
 * the norm resolver do the wiring; nothing is hand-referenced).
 *
 * Non-atom words form the MINT QUEUE, frequency-ranked: mint (or collapse-to) these
 * atoms first and the most names become harmonic at once — drive the queue to 0 and
 * the field/enum vocabulary self-wires into the atom graph. This is the code-name
 * twin of `aura` (which gates [[link]] resolution); together they make the whole
 * base one harmonic atom space.
 *
 *   node scripts/harmony-scan.mjs            # collection field + enum names
 *   node scripts/harmony-scan.mjs --json     # machine-readable (for the breath loop)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const norm = (s) => String(s).toLowerCase().replace(/[-_]/g, '')

function walk(dir, pred, out = []) {
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
    if (s.isDirectory()) walk(p, pred, out)
    else if (pred(e, p)) out.push(p)
  }
  return out
}

// 1. the atom corpus — every SKILL.md folder leaf (universal atoms + entity atoms)
const atoms = new Set()
for (const f of walk('src', (e) => e === 'SKILL.md')) atoms.add(norm(basename(dirname(f))))

// connective words (prepositions/articles/auxiliaries) — never atoms, the glue
// between atoms in a name; ignored so the queue shows real mint candidates.
const STOP = new Set([
  'at', 'to', 'by', 'in', 'is', 'of', 'on', 'or', 'and', 'the', 'for', 'an', 'as',
  'be', 'my', 'no', 'do', 'if', 'it', 'are', 'was', 'per', 'via', 'with', 'from',
])

// 2. decompose a name into its alpha word-parts (camelCase / snake / kebab; digits + stopwords dropped)
const wordsOf = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .map((w) => w.replace(/[0-9]+/g, ' ').trim())
    .flatMap((w) => w.split(/\s+/))
    .filter((w) => /^[A-Za-z]{2,}$/.test(w))
    .filter((w) => !STOP.has(w.toLowerCase()))

// 3. scan collection field names + enum values (the "type:'text' first" surface)
const files = walk('src/collections', (e) => e === 'index.ts')
const res = [/\bname:\s*'([A-Za-z][A-Za-z0-9_]*)'/g, /\bvalue:\s*'([A-Za-z][A-Za-z0-9_]*)'/g]
let total = 0
let harmonic = 0
const miss = new Map()
const breaks = []
for (const f of files) {
  const t = readFileSync(f, 'utf8')
  for (const re of res) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(t))) {
      const ws = wordsOf(m[1])
      if (!ws.length) continue
      total++
      const bad = ws.filter((w) => !atoms.has(norm(w)))
      if (bad.length === 0) harmonic++
      else {
        for (const w of bad) miss.set(norm(w), (miss.get(norm(w)) || 0) + 1)
        if (breaks.length < 40) breaks.push({ name: m[1], bad: bad.join('·') })
      }
    }
  }
}

const ratio = total ? harmonic / total : 1
const queue = [...miss.entries()].sort((a, b) => b[1] - a[1]).map(([word, count]) => ({ word, count }))

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ atoms: atoms.size, total, harmonic, ratio, queueSize: queue.length, queue }, null, 2))
} else {
  console.log(`harmony-scan — ${atoms.size} atoms · ${total} names scanned (collection field + enum)`)
  console.log(`harmonic = ${harmonic}/${total}  (ratio ${ratio.toFixed(4)}; ${total - harmonic} non-harmonic names)`)
  console.log(`\nMINT QUEUE — top non-atom words (mint/collapse these first; each meets many names):`)
  for (const { word, count } of queue.slice(0, 30)) console.log(`  ${String(count).padStart(4)} × ${word}`)
  console.log(`\n${queue.length} distinct non-atom words. Drive to 0 ⇒ field/enum names self-wire into the atom graph.`)
}
