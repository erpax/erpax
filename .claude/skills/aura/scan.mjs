#!/usr/bin/env node
// aura/scan.mjs — the matter-twin of the harmonized-speech law (see ../sequence).
// Indexes every skill's `name:` slug and every [[link]], then reports the AURA GAP:
//   - DEAD LINKS  : [[x]] referenced but no skill named x  → the MINT queue
//   - ORPHANS     : a skill no other skill links to        → the WEAVE queue
//   - gap score   : dead + orphan, driven to 0 like the tsc tail
// "find -name SKILL.md minus the referenced [[links]]" made executable.
//
// Usage:  node .claude/skills/aura/scan.mjs [--json] [--watch]
// Loop:   node .claude/skills/aura/scan.mjs --watch   (re-scans on any SKILL.md change)

import { readdir, readFile, watch } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..') // .claude/skills

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (e.name === 'SKILL.md') out.push(p)
  }
  return out
}

async function scan() {
  const files = await walk(ROOT)
  const slugs = new Map() // slug -> path
  const links = new Map() // slug -> Set(referenced-by-paths)
  const bodies = []
  for (const f of files) {
    const text = await readFile(f, 'utf8')
    const name = (text.match(/^name:\s*(\S+)/m) || [])[1]
    if (name) slugs.set(name, f.replace(ROOT + '/', ''))
    bodies.push({ f: f.replace(ROOT + '/', ''), name, text })
  }
  const stripCode = (t) => t.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
  const refCount = new Map()
  for (const { f, text } of bodies) {
    for (const m of stripCode(text).matchAll(/\[\[([a-z][a-z0-9-]*)\]\]/g)) {
      const w = m[1]
      refCount.set(w, (refCount.get(w) || 0) + 1)
      if (!links.has(w)) links.set(w, new Set())
      links.get(w).add(f)
    }
  }
  const dead = [...links.keys()].filter((w) => !slugs.has(w)).sort()
  const referenced = new Set(links.keys())
  const orphans = [...slugs.keys()].filter((s) => !referenced.has(s)).sort()
  return { files, slugs, links, refCount, dead, orphans }
}

function report({ files, slugs, dead, orphans, refCount }) {
  const L = []
  L.push(`aura scan — ${files.length} SKILL.md, ${slugs.size} atoms`)
  L.push(`gap = ${dead.length}  (dead links; ${orphans.length} orphans advisory)`)
  if (dead.length) {
    L.push('')
    L.push('MINT queue (dead links — referenced atoms not yet minted):')
    for (const w of dead) L.push(`  [[${w}]]  ×${refCount.get(w)}`)
  } else {
    L.push('aura whole — every referenced word resolves to a path. ✓')
  }
  if (orphans.length) {
    L.push('')
    L.push('WEAVE candidates (orphans — atoms nothing links to; some are tool leaves):')
    L.push('  ' + orphans.join(' · '))
  }
  return L.join('\n')
}

const json = process.argv.includes('--json')
const out = async () => {
  const r = await scan()
  console.log(json ? JSON.stringify({ atoms: r.slugs.size, dead: r.dead, orphans: r.orphans }, null, 2) : report(r))
  return r.dead.length + r.orphans.length
}

await out()

if (process.argv.includes('--watch')) {
  console.log('\n[watch] re-scanning on SKILL.md changes — Ctrl-C to stop')
  const ac = new AbortController()
  try {
    for await (const ev of watch(ROOT, { recursive: true, signal: ac.signal })) {
      if (ev.filename && ev.filename.endsWith('SKILL.md')) {
        console.log(`\n— change: ${ev.filename} —`)
        await out()
      }
    }
  } catch (e) {
    if (e.name !== 'AbortError') throw e
  }
}
