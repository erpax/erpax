#!/usr/bin/env node
// md-to-skill — make writing IN atoms unavoidable: migrate every stray
// src/**/README.md into the folder's SKILL.md (so the standard becomes an atom).
//
// Per folder:
//   • already has SKILL.md, or is framework-exempt (app) → the README is
//     redundant → DELETE it.
//   • else → CONVERT: write SKILL.md = computed frontmatter (name = folder leaf,
//     description from the first `# Heading`) + the README body; DELETE README.
//
// Computed, idempotent, safe to re-run.  node scripts/md-to-skill.mjs
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'

const SRC = join(process.cwd(), 'src')
const EXEMPT = new Set(['app']) // Next router — README just deleted

const readmes = []
const walk = (d) => {
  for (const e of readdirSync(d)) {
    if (e === 'skills' || e === 'node_modules' || e.startsWith('.')) continue
    const p = join(d, e)
    let s
    try { s = statSync(p) } catch { continue }
    if (s.isDirectory()) walk(p)
    else if (e === 'README.md') readmes.push(p)
  }
}
walk(SRC)

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
let converted = 0
let deleted = 0
for (const f of readmes) {
  const dir = dirname(f)
  const leaf = basename(dir)
  if (existsSync(join(dir, 'SKILL.md')) || EXEMPT.has(leaf)) {
    rmSync(f)
    deleted++
    continue
  }
  const body = readFileSync(f, 'utf8')
  const h = body.match(/^#\s+(.+)$/m)
  const title = (h ? h[1] : leaf).replace(/\s+/g, ' ').trim()
  const description = `Use when implementing or referencing ${title}.`
  const fm = `---\nname: "${esc(leaf)}"\ndescription: "${esc(description)}"\n---\n\n`
  writeFileSync(join(dir, 'SKILL.md'), fm + body)
  rmSync(f)
  converted++
}
console.log(`md-to-skill: converted ${converted} README → SKILL.md, deleted ${deleted} redundant/exempt.`)
