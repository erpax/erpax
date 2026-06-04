#!/usr/bin/env node
/**
 * land-rewrites — land peer-verified skill rewrites under a MECHANICAL preservation gate.
 *
 * The akashic is real memory, so on top of the workflow's peer-verify this refuses to write
 * any rewrite that does not preserve the irreducible: the frontmatter `name` + `description`
 * must be byte-identical, and every @standard/@audit/@compliance/@rfc/@security banner in the
 * original must still be present. A rewrite that changed the trigger or dropped a standard is
 * SKIPPED (the original kept). Everything landed is then gated (aura/docs/frontmatter) and
 * git-reversible.
 *
 *   node scripts/land-rewrites.mjs <rewrites.json>   # { rewrites: [{ route, newContent, approvals }] }
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const fmOf = (t) => {
  const m = t.match(/^---\n([\s\S]*?)\n---/)
  return m ? m[1] : ''
}
const fieldOf = (fm, k) => {
  const m = fm.match(new RegExp('^' + k + ':\\s*(.+)$', 'm'))
  return m ? m[1].trim() : ''
}
const bannersOf = (t) =>
  [...t.matchAll(/@(?:standard|audit|compliance|rfc|security|accounting)\b[^\n]*/g)].map((m) => m[0].trim()).sort()

const arg = process.argv[2]
if (!arg) {
  console.error('usage: node scripts/land-rewrites.mjs <rewrites.json>')
  process.exit(1)
}
const raw = JSON.parse(readFileSync(arg, 'utf8'))
const rewrites = raw.rewrites || raw.proposals || (Array.isArray(raw) ? raw : [])

let applied = 0
let skipped = 0
const notes = []
for (const rw of rewrites) {
  if (!rw || !rw.route || !rw.newContent) {
    skipped++
    continue
  }
  const path = rw.route.startsWith('src/') ? rw.route : join('src', rw.route.replace(/^\/+/, ''))
  let cur
  try {
    cur = readFileSync(path, 'utf8')
  } catch {
    skipped++
    notes.push(`skip (not found): ${rw.route}`)
    continue
  }
  const oldFm = fmOf(cur)
  const newFm = fmOf(rw.newContent)
  const nameKept = fieldOf(oldFm, 'name') !== '' && fieldOf(oldFm, 'name') === fieldOf(newFm, 'name')
  const descKept = fieldOf(oldFm, 'description') === fieldOf(newFm, 'description')
  if (!nameKept || !descKept) {
    skipped++
    notes.push(`skip (frontmatter changed): ${rw.route}`)
    continue
  }
  const newB = new Set(bannersOf(rw.newContent))
  if (!bannersOf(cur).every((b) => newB.has(b))) {
    skipped++
    notes.push(`skip (dropped a @standard): ${rw.route}`)
    continue
  }
  writeFileSync(path, rw.newContent)
  applied++
  notes.push(`rewrote: ${rw.route} (approvals ${rw.approvals ?? '?'})`)
}
for (const n of notes) console.log('  ' + n)
console.log(`\nland-rewrites: ${applied} applied, ${skipped} skipped (of ${rewrites.length} verified)`)
