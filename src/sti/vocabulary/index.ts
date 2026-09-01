/**
 * schema.org → single-word atoms, entangled (collide the vocabulary with itself).
 *
 * A concatenated multiword folder (`creativework`) is multiword disguised as one — a
 * lie/violation. So COLLIDE schema.org with itself: split every label at its word
 * boundaries (the [[harmony]] camelCase split) into TRUE single words; the unique words
 * are the atoms; a compound is the ENTANGLEMENT of its word-atoms; the same word across
 * terms MERGES. No `schema` prefix — the atom is the bare word; schema.org is a cited
 * @standard, never a name.
 *
 * The body render lives in ONE place — `schemaCollision` in [[readme]]/compute — so this
 * emit CLI and the byte-for-byte regenerability gate (`schemaCollisionRegenerable`) can
 * never drift apart. This script only walks the tree for merge-safety and writes the seed;
 * `schemaCollision(cwd).bodyOf(word)` is the canonical body.
 *
 *   tsx src/sti/vocabulary/index.ts          # stats (dry)
 *   tsx src/sti/vocabulary/index.ts --emit   # mint the single-word atoms
 *
 * @standard schema.org (the universal type vocabulary, collided to single words)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { schemaCollision } from '@/readme'

const SRC = join(process.cwd(), 'src')
const EMIT = process.argv.includes('--emit')
const MINE = 'collided out of schema.org'
const MINE_VOCAB = 'collided from the schema.org compounds'
const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const yamlSafe = (s: string): string => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').slice(0, 200)

// ── foreign (no overwrite) + reserved (symlinks) — merge-safe ──
const foreign = new Set<string>()
const walk = (dir: string): void => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name === 'SKILL.md') {
      const t = readFileSync(p, 'utf8')
      if (!t.includes(MINE) && !t.includes(MINE_VOCAB)) foreign.add(norm(basename(dirname(p))))
    }
  }
}
walk(SRC)
const reserved = new Set<string>()
for (const e of readdirSync(SRC, { withFileTypes: true })) if (e.isSymbolicLink()) reserved.add(norm(e.name))

// ── the ONE collision source; the seed frontmatter derives its description from the body ──
const collision = schemaCollision(process.cwd())
const descOf = (word: string, body: string): string => {
  const line = body.split('\n').find((l) => l.trim() !== '' && !l.startsWith('#'))
  return `Use when reasoning about ${word} as a schema.org vocabulary word — ${yamlSafe(line?.replace(/\s*\(\[\[.*$/, '').trim() ?? word)}`
}
const render = (word: string): string => {
  const body = collision.bodyOf(word) ?? ''
  return ['---', `name: ${word}`, `description: "${descOf(word, body)}"`, '---', '', body].join('\n')
}

// ── emit / report ──
let minted = 0
let skipped = 0
for (const word of collision.words) {
  if (foreign.has(word) || reserved.has(word)) {
    skipped++
    continue
  }
  if (EMIT) {
    mkdirSync(join(SRC, word), { recursive: true })
    writeFileSync(join(SRC, word, 'SKILL.md'), render(word))
  }
  minted++
}
console.log('schema.org → single-word atoms (collided with itself)')
console.log(`  distinct single words ${collision.words.size}`)
console.log(`  ${EMIT ? 'MINTED' : 'would mint'} ${minted} · skipped ${skipped} foreign/reserved (merge-safe)`)
if (!EMIT) console.log('  (dry — pass --emit)')

/** @index-cross.foldback child=sti/vocabulary parent=sti — this cross folds back into its parent. */
